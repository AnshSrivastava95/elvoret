import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import {
  spawn,
  type ChildProcess,
} from "child_process";

import type {
  ExecuteRequest,
  ExecuteResponse,
  ExecuteTestCase,
  TestCaseResult,
} from "./types";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const WORK_ROOT =
  "/tmp/elvoret-executor";

const MAX_CODE_SIZE =
  100_000;

const MAX_INPUT_SIZE =
  1_000_000;

const MAX_OUTPUT_SIZE =
  1_000_000;

const MAX_TEST_CASES =
  100;

const DEFAULT_TIME_LIMIT_MS =
  2_000;

const MAX_TIME_LIMIT_MS =
  10_000;

/*
 * Small infrastructure/startup allowance.
 */
const EXECUTION_BUFFER_MS =
  500;

/* =========================================================
   TYPES
   ========================================================= */

interface ProcessOptions {
  cwd: string;

  timeoutMs?: number;

  stdin: string;

  maxOutputBytes: number;
}

interface ProcessResult {
  stdout: string;

  stderr: string;

  exitCode: number | null;

  executionTimeMs: number;

  timedOut: boolean;

  outputLimitExceeded: boolean;
}

/* =========================================================
   HELPERS
   ========================================================= */

function createJobId(): string {
  return crypto.randomUUID();
}

function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(
    Math.max(
      value,
      min
    ),
    max
  );
}

async function ensureWorkRoot(): Promise<void> {
  await fs.mkdir(
    WORK_ROOT,
    {
      recursive: true,
    }
  );
}

/* =========================================================
   OUTPUT NORMALIZATION
   ========================================================= */

function normalizeOutput(
  output: string
): string {
  return output
    .trim()
    .split(/\s+/)
    .join(" ");
}

function outputsMatch(
  actual: string,
  expected: string
): boolean {
  return (
    normalizeOutput(actual) ===
    normalizeOutput(expected)
  );
}

/* =========================================================
   TEST CASE NORMALIZATION
   ========================================================= */

function getTestCases(
  request: ExecuteRequest
): ExecuteTestCase[] {

  /*
   * Preferred API:
   *
   * tests: [...]
   */
  if (
    Array.isArray(
      request.tests
    )
  ) {

    return request.tests
      .slice(
        0,
        MAX_TEST_CASES
      )
      .map(
        (test) => ({
          input:
            typeof test.input ===
            "string"
              ? test.input
              : "",

          expectedOutput:
            typeof test.expectedOutput ===
            "string"
              ? test.expectedOutput
              : "",
        })
      );
  }

  /*
   * Backward-compatible single test.
   */
  return [
    {
      input:
        typeof request.input ===
        "string"
          ? request.input
          : "",

      expectedOutput:
        typeof request.expectedOutput ===
        "string"
          ? request.expectedOutput
          : "",
    },
  ];
}

/* =========================================================
   EXECUTE C++
   ========================================================= */

export async function executeCpp(
  request: ExecuteRequest
): Promise<ExecuteResponse> {

  await ensureWorkRoot();

  /* =======================================================
     VALIDATE CODE
     ======================================================= */

  if (
    typeof request.code !==
    "string"
  ) {

    return {
      ok: false,
      status: "SYSTEM_ERROR",
      stdout: "",
      stderr: "",
      executionTimeMs: 0,
      exitCode: null,
      error:
        "Invalid code payload.",
    };
  }

  if (
    request.code.length >
    MAX_CODE_SIZE
  ) {

    return {
      ok: false,
      status: "SYSTEM_ERROR",
      stdout: "",
      stderr: "",
      executionTimeMs: 0,
      exitCode: null,
      error:
        "Source code is too large.",
    };
  }

  /* =======================================================
     TEST CASES
     ======================================================= */

  const tests =
    getTestCases(
      request
    );

  if (
    tests.length === 0
  ) {

    return {
      ok: false,
      status: "SYSTEM_ERROR",
      stdout: "",
      stderr: "",
      executionTimeMs: 0,
      exitCode: null,
      error:
        "At least one test case is required.",
    };
  }

  for (
    const test of tests
  ) {

    if (
      test.input.length >
      MAX_INPUT_SIZE
    ) {

      return {
        ok: false,
        status: "SYSTEM_ERROR",
        stdout: "",
        stderr: "",
        executionTimeMs: 0,
        exitCode: null,
        error:
          "Test input is too large.",
      };
    }
  }

  /* =======================================================
     EXECUTION LIMIT
     ======================================================= */

  const timeLimitMs =
    clamp(
      Number(
        request.timeLimitMs ??
          DEFAULT_TIME_LIMIT_MS
      ),
      100,
      MAX_TIME_LIMIT_MS
    );

  const executionTimeoutMs =
    timeLimitMs +
    EXECUTION_BUFFER_MS;

  /*
   * Reserved for proper memory isolation later.
   */
  const memoryLimitMb =
    request.memoryLimitMb;

  void memoryLimitMb;

  /* =======================================================
     JOB FILES
     ======================================================= */

  const jobId =
    createJobId();

  const jobDirectory =
    path.join(
      WORK_ROOT,
      jobId
    );

  const sourcePath =
    path.join(
      jobDirectory,
      "main.cpp"
    );

  const executablePath =
    path.join(
      jobDirectory,
      "main"
    );

  try {

    /* =====================================================
       CREATE WORKSPACE
       ===================================================== */

    await fs.mkdir(
      jobDirectory,
      {
        recursive: true,
      }
    );

    /* =====================================================
       WRITE SOURCE
       ===================================================== */

    await fs.writeFile(
      sourcePath,
      request.code,
      "utf8"
    );

    /* =====================================================
       COMPILE ONCE
       ===================================================== */

    const compileResult =
      await runProcess(
        "g++",
        [
          sourcePath,
          "-std=c++17",
          "-O2",
          "-pipe",
          "-o",
          executablePath,
        ],
        {
          cwd:
            jobDirectory,

          /*
           * No compilation timeout.
           */
          stdin: "",

          maxOutputBytes:
            MAX_OUTPUT_SIZE,
        }
      );

    /* =====================================================
       COMPILER OUTPUT LIMIT
       ===================================================== */

    if (
      compileResult.outputLimitExceeded
    ) {

      return {
        ok: false,

        status:
          "OUTPUT_LIMIT_EXCEEDED",

        stdout:
          compileResult.stdout,

        stderr:
          compileResult.stderr,

        executionTimeMs:
          compileResult.executionTimeMs,

        exitCode:
          compileResult.exitCode,

        testResults: [],
      };
    }

    /* =====================================================
       COMPILATION ERROR
       ===================================================== */

    if (
      compileResult.exitCode !==
      0
    ) {

      return {
        ok: false,

        status:
          "COMPILATION_ERROR",

        stdout:
          compileResult.stdout,

        stderr:
          compileResult.stderr,

        executionTimeMs:
          compileResult.executionTimeMs,

        exitCode:
          compileResult.exitCode,

        testResults: [],
      };
    }

    /* =====================================================
       RUN TEST CASES
       ===================================================== */

    const testResults:
      TestCaseResult[] = [];

    let totalExecutionTimeMs =
      0;

    for (
      let index = 0;
      index < tests.length;
      index++
    ) {

      const test =
        tests[index];

      const testNumber =
        index + 1;

      const executionResult =
        await runProcess(
          executablePath,
          [],
          {
            cwd:
              jobDirectory,

            timeoutMs:
              executionTimeoutMs,

            stdin:
              test.input,

            maxOutputBytes:
              MAX_OUTPUT_SIZE,
          }
        );

      totalExecutionTimeMs +=
        executionResult.executionTimeMs;

      /* ===================================================
         TIME LIMIT
         =================================================== */

      if (
        executionResult.timedOut
      ) {

        const result:
          TestCaseResult = {
          testNumber,

          status:
            "TIME_LIMIT_EXCEEDED",

          input:
            test.input,

          expectedOutput:
            test.expectedOutput,

          stdout:
            executionResult.stdout,

          stderr:
            executionResult.stderr,

          executionTimeMs:
            executionResult.executionTimeMs,

          exitCode:
            null,
        };

        testResults.push(
          result
        );

        return {
          ok: false,

          status:
            "TIME_LIMIT_EXCEEDED",

          stdout:
            executionResult.stdout,

          stderr:
            executionResult.stderr,

          executionTimeMs:
            totalExecutionTimeMs,

          exitCode:
            null,

          testResults,

          failedTest:
            testNumber,

          expectedOutput:
            test.expectedOutput,
        };
      }

      /* ===================================================
         OUTPUT LIMIT
         =================================================== */

      if (
        executionResult.outputLimitExceeded
      ) {

        const result:
          TestCaseResult = {
          testNumber,

          status:
            "OUTPUT_LIMIT_EXCEEDED",

          input:
            test.input,

          expectedOutput:
            test.expectedOutput,

          stdout:
            executionResult.stdout,

          stderr:
            executionResult.stderr,

          executionTimeMs:
            executionResult.executionTimeMs,

          exitCode:
            executionResult.exitCode,
        };

        testResults.push(
          result
        );

        return {
          ok: false,

          status:
            "OUTPUT_LIMIT_EXCEEDED",

          stdout:
            executionResult.stdout,

          stderr:
            executionResult.stderr,

          executionTimeMs:
            totalExecutionTimeMs,

          exitCode:
            executionResult.exitCode,

          testResults,

          failedTest:
            testNumber,

          expectedOutput:
            test.expectedOutput,
        };
      }

      /* ===================================================
         RUNTIME ERROR
         =================================================== */

      if (
        executionResult.exitCode !==
        0
      ) {

        const result:
          TestCaseResult = {
          testNumber,

          status:
            "RUNTIME_ERROR",

          input:
            test.input,

          expectedOutput:
            test.expectedOutput,

          stdout:
            executionResult.stdout,

          stderr:
            executionResult.stderr,

          executionTimeMs:
            executionResult.executionTimeMs,

          exitCode:
            executionResult.exitCode,
        };

        testResults.push(
          result
        );

        return {
          ok: false,

          status:
            "RUNTIME_ERROR",

          stdout:
            executionResult.stdout,

          stderr:
            executionResult.stderr,

          executionTimeMs:
            totalExecutionTimeMs,

          exitCode:
            executionResult.exitCode,

          testResults,

          failedTest:
            testNumber,

          expectedOutput:
            test.expectedOutput,
        };
      }

      /* ===================================================
         OUTPUT COMPARISON
         =================================================== */

      const matches =
        outputsMatch(
          executionResult.stdout,
          test.expectedOutput
        );

      /*
       * TEMPORARY DEBUG LOG.
       *
       * We will remove this after the multi-test
       * behavior is verified.
       */
      console.log(
        "JUDGE_RESULT",
        JSON.stringify({
          testNumber,

          actual:
            executionResult.stdout,

          expected:
            test.expectedOutput,

          normalizedActual:
            normalizeOutput(
              executionResult.stdout
            ),

          normalizedExpected:
            normalizeOutput(
              test.expectedOutput
            ),

          matches,
        })
      );

      if (!matches) {

        const result:
          TestCaseResult = {
          testNumber,

          status:
            "WRONG_ANSWER",

          input:
            test.input,

          expectedOutput:
            test.expectedOutput,

          stdout:
            executionResult.stdout,

          stderr:
            executionResult.stderr,

          executionTimeMs:
            executionResult.executionTimeMs,

          exitCode:
            executionResult.exitCode,
        };

        testResults.push(
          result
        );

        return {
          ok: false,

          status:
            "WRONG_ANSWER",

          stdout:
            executionResult.stdout,

          stderr:
            executionResult.stderr,

          executionTimeMs:
            totalExecutionTimeMs,

          exitCode:
            executionResult.exitCode,

          testResults,

          failedTest:
            testNumber,

          expectedOutput:
            test.expectedOutput,
        };
      }

      /* ===================================================
         TEST PASSED
         =================================================== */

      testResults.push({
        testNumber,

        status:
          "ACCEPTED",

        input:
          test.input,

        expectedOutput:
          test.expectedOutput,

        stdout:
          executionResult.stdout,

        stderr:
          executionResult.stderr,

        executionTimeMs:
          executionResult.executionTimeMs,

        exitCode:
          executionResult.exitCode,
      });
    }

    /* =====================================================
       ALL TESTS PASSED
       ===================================================== */

    return {
      ok: true,

      status:
        "ACCEPTED",

      stdout:
        testResults[
          testResults.length - 1
        ]?.stdout ?? "",

      stderr: "",

      executionTimeMs:
        totalExecutionTimeMs,

      exitCode: 0,

      testResults,
    };

  } catch (error) {

    console.error(
      `Execution failed for ${jobId}:`,
      error
    );

    return {
      ok: false,

      status:
        "SYSTEM_ERROR",

      stdout: "",

      stderr: "",

      executionTimeMs: 0,

      exitCode: null,

      error:
        error instanceof Error
          ? error.message
          : "Unknown execution error.",
    };

  } finally {

    /* =====================================================
       CLEANUP
       ===================================================== */

    try {

      await fs.rm(
        jobDirectory,
        {
          recursive: true,

          force: true,
        }
      );

    } catch (cleanupError) {

      console.error(
        `Failed to clean up job ${jobId}:`,
        cleanupError
      );
    }
  }
}

/* =========================================================
   PROCESS RUNNER
   ========================================================= */

function runProcess(
  command: string,
  args: string[],
  options: ProcessOptions
): Promise<ProcessResult> {

  return new Promise(
    (resolve) => {

      const start =
        process.hrtime.bigint();

      let stdout = "";

      let stderr = "";

      let timedOut =
        false;

      let outputLimitExceeded =
        false;

      let finished =
        false;

      /* ===================================================
         SPAWN
         =================================================== */

      const child =
        spawn(
          command,
          args,
          {
            cwd:
              options.cwd,

            stdio: [
              "pipe",
              "pipe",
              "pipe",
            ],

            env: {
              ...process.env,

              PATH:
                "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",

              HOME:
                options.cwd,

              LANG:
                "C.UTF-8",
            },
          }
        ) as ChildProcess;

      /* ===================================================
         FINISH
         =================================================== */

      const finish =
        (
          exitCode:
            number | null
        ): void => {

          if (finished) {
            return;
          }

          finished =
            true;

          const end =
            process.hrtime.bigint();

          const executionTimeMs =
            Number(
              end - start
            ) / 1_000_000;

          resolve({
            stdout,

            stderr,

            exitCode,

            executionTimeMs,

            timedOut,

            outputLimitExceeded,
          });
        };

      /* ===================================================
         TIMEOUT
         =================================================== */

      let timeout:
        ReturnType<
          typeof setTimeout
        > | undefined;

      if (
        options.timeoutMs !==
        undefined
      ) {

        timeout =
          setTimeout(
            () => {

              if (finished) {
                return;
              }

              timedOut =
                true;

              child.kill(
                "SIGKILL"
              );

            },
            options.timeoutMs
          );
      }

      /* ===================================================
         STDIN
         =================================================== */

      if (
        child.stdin
      ) {

        child.stdin.write(
          options.stdin
        );

        child.stdin.end();
      }

      /* ===================================================
         STDOUT
         =================================================== */

      if (
        child.stdout
      ) {

        child.stdout.on(
          "data",
          (
            chunk:
              Buffer | string
          ) => {

            if (finished) {
              return;
            }

            stdout +=
              chunk.toString();

            if (
              Buffer.byteLength(
                stdout,
                "utf8"
              ) >
              options.maxOutputBytes
            ) {

              outputLimitExceeded =
                true;

              child.kill(
                "SIGKILL"
              );
            }
          }
        );
      }

      /* ===================================================
         STDERR
         =================================================== */

      if (
        child.stderr
      ) {

        child.stderr.on(
          "data",
          (
            chunk:
              Buffer | string
          ) => {

            if (finished) {
              return;
            }

            stderr +=
              chunk.toString();

            if (
              Buffer.byteLength(
                stderr,
                "utf8"
              ) >
              options.maxOutputBytes
            ) {

              outputLimitExceeded =
                true;

              child.kill(
                "SIGKILL"
              );
            }
          }
        );
      }

      /* ===================================================
         CLOSE
         =================================================== */

      child.on(
        "close",
        (
          code:
            number | null
        ) => {

          if (
            timeout
          ) {

            clearTimeout(
              timeout
            );
          }

          finish(code);
        }
      );

      /* ===================================================
         ERROR
         =================================================== */

      child.on(
        "error",
        (
          error:
            Error
        ) => {

          if (
            timeout
          ) {

            clearTimeout(
              timeout
            );
          }

          stderr +=
            error.message;

          finish(null);
        }
      );
    }
  );
}