import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import {
  spawn,
  type ChildProcess,
} from "child_process";

import {
  generateTests,
} from "./testgenerator.js";

import type {
  ExecuteRequest,
  ExecuteResponse,
  ExecuteTestCase,
  GeneratedTestCase,
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
    normalizeOutput(
      actual
    ) ===
    normalizeOutput(
      expected
    )
  );
}

/* =========================================================
   TEST CASE HELPERS
   ========================================================= */

function getManualTests(
  request: ExecuteRequest
): ExecuteTestCase[] {

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
   * Backward compatibility.
   */
  if (
    typeof request.expectedOutput ===
    "string"
  ) {

    return [
      {
        input:
          typeof request.input ===
          "string"
            ? request.input
            : "",

        expectedOutput:
          request.expectedOutput,
      },
    ];
  }

  return [];
}

/* =========================================================
   GENERATED TESTS
   ========================================================= */

function buildGeneratedTests(
  request: ExecuteRequest
): GeneratedTestCase[] {

  if (
    !request.generator
  ) {
    return [];
  }

  return generateTests(
    request.generator
  )
    .slice(
      0,
      MAX_TEST_CASES
    );
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

      status:
        "SYSTEM_ERROR",

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

      status:
        "SYSTEM_ERROR",

      stdout: "",

      stderr: "",

      executionTimeMs: 0,

      exitCode: null,

      error:
        "Source code is too large.",
    };
  }

  /* =======================================================
     LIMIT
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
   * Memory is reserved for the sandbox layer.
   */
  const memoryLimitMb =
    request.memoryLimitMb;

  void memoryLimitMb;

  /* =======================================================
     JOB DIRECTORY
     ======================================================= */

  const jobId =
    createJobId();

  const jobDirectory =
    path.join(
      WORK_ROOT,
      jobId
    );

  const studentSourcePath =
    path.join(
      jobDirectory,
      "student.cpp"
    );

  const studentExecutablePath =
    path.join(
      jobDirectory,
      "student"
    );

  const referenceSourcePath =
    path.join(
      jobDirectory,
      "reference.cpp"
    );

  const referenceExecutablePath =
    path.join(
      jobDirectory,
      "reference"
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
       WRITE STUDENT SOURCE
       ===================================================== */

    await fs.writeFile(
      studentSourcePath,
      request.code,
      "utf8"
    );

    /* =====================================================
       DETERMINE TEST MODE
       ===================================================== */

    const hasGeneratedTests =
      Boolean(
        request.generator
      );

    const hasManualTests =
      Array.isArray(
        request.tests
      );

    const hasLegacySingleTest =
      !hasManualTests &&
      !hasGeneratedTests &&
      typeof request.expectedOutput ===
        "string";

    /*
     * If no expected output/tests/generator exist,
     * we're doing raw execution only.
     */
    const isRawRun =
      !hasGeneratedTests &&
      !hasManualTests &&
      !hasLegacySingleTest;

    /* =====================================================
       COMPILE STUDENT
       ===================================================== */

    const studentCompileResult =
      await runProcess(
        "g++",
        [
          studentSourcePath,
          "-std=c++17",
          "-O2",
          "-pipe",
          "-o",
          studentExecutablePath,
        ],
        {
          cwd:
            jobDirectory,

          /*
           * Compilation deliberately has
           * no timeout at this stage.
           */
          stdin: "",

          maxOutputBytes:
            MAX_OUTPUT_SIZE,
        }
      );

    /* =====================================================
       STUDENT COMPILE ERROR
       ===================================================== */

    if (
      studentCompileResult.outputLimitExceeded
    ) {

      return {
        ok: false,

        status:
          "OUTPUT_LIMIT_EXCEEDED",

        stdout:
          studentCompileResult.stdout,

        stderr:
          studentCompileResult.stderr,

        executionTimeMs:
          studentCompileResult.executionTimeMs,

        exitCode:
          studentCompileResult.exitCode,
      };
    }

    if (
      studentCompileResult.exitCode !==
      0
    ) {

      return {
        ok: false,

        status:
          "COMPILATION_ERROR",

        stdout:
          studentCompileResult.stdout,

        stderr:
          studentCompileResult.stderr,

        executionTimeMs:
          studentCompileResult.executionTimeMs,

        exitCode:
          studentCompileResult.exitCode,
      };
    }

    /* =====================================================
       RAW RUN MODE
       ===================================================== */

    if (
      isRawRun
    ) {

      const input =
        typeof request.input ===
        "string"
          ? request.input
          : "";

      if (
        input.length >
        MAX_INPUT_SIZE
      ) {

        return {
          ok: false,

          status:
            "SYSTEM_ERROR",

          stdout: "",

          stderr: "",

          executionTimeMs: 0,

          exitCode: null,

          error:
            "Input is too large.",
        };
      }

      const executionResult =
        await runProcess(
          studentExecutablePath,
          [],
          {
            cwd:
              jobDirectory,

            timeoutMs:
              executionTimeoutMs,

            stdin:
              input,

            maxOutputBytes:
              MAX_OUTPUT_SIZE,
          }
        );

      return buildRawExecutionResponse(
        executionResult
      );
    }

    /* =====================================================
       BUILD TEST CASES
       ===================================================== */

    let tests:
      ExecuteTestCase[] = [];

    if (
      hasGeneratedTests
    ) {

      /*
       * Generated tests initially contain only input.
       * Expected outputs are produced by the
       * reference solution below.
       */
      const generated =
        buildGeneratedTests(
          request
        );

      if (
        generated.length === 0
      ) {

        return {
          ok: false,

          status:
            "INVALID_TEST_SUITE",

          stdout: "",

          stderr: "",

          executionTimeMs: 0,

          exitCode: null,

          error:
            "Test generator produced no tests.",
        };
      }

      /*
       * If we're generating tests, a reference
       * solution is mandatory.
       */
      if (
        typeof request.referenceCode !==
        "string" ||
        request.referenceCode.trim()
          .length === 0
      ) {

        return {
          ok: false,

          status:
            "INVALID_TEST_SUITE",

          stdout: "",

          stderr: "",

          executionTimeMs: 0,

          exitCode: null,

          error:
            "referenceCode is required when using a test generator.",
        };
      }

      if (
        request.referenceCode.length >
        MAX_CODE_SIZE
      ) {

        return {
          ok: false,

          status:
            "INVALID_TEST_SUITE",

          stdout: "",

          stderr: "",

          executionTimeMs: 0,

          exitCode: null,

          error:
            "Reference solution is too large.",
        };
      }

      /* ===================================================
         WRITE REFERENCE
         =================================================== */

      await fs.writeFile(
        referenceSourcePath,
        request.referenceCode,
        "utf8"
      );

      /* ===================================================
         COMPILE REFERENCE
         =================================================== */

      const referenceCompileResult =
        await runProcess(
          "g++",
          [
            referenceSourcePath,
            "-std=c++17",
            "-O2",
            "-pipe",
            "-o",
            referenceExecutablePath,
          ],
          {
            cwd:
              jobDirectory,

            /*
             * No compilation timeout yet.
             */
            stdin: "",

            maxOutputBytes:
              MAX_OUTPUT_SIZE,
          }
        );

      /* ===================================================
         REFERENCE COMPILATION FAILED
         =================================================== */

      if (
        referenceCompileResult.exitCode !==
        0
      ) {

        return {
          ok: false,

          status:
            "INVALID_TEST_SUITE",

          stdout: "",

          stderr:
            referenceCompileResult.stderr,

          executionTimeMs:
            referenceCompileResult.executionTimeMs,

          exitCode:
            referenceCompileResult.exitCode,

          error:
            "Reference solution failed to compile.",
        };
      }

      /* ===================================================
         GENERATE EXPECTED OUTPUTS
         =================================================== */

      for (
        const generatedTest of
          generated
      ) {

        if (
          generatedTest.input
            .length >
          MAX_INPUT_SIZE
        ) {

          return {
            ok: false,

            status:
              "INVALID_TEST_SUITE",

            stdout: "",

            stderr: "",

            executionTimeMs: 0,

            exitCode: null,

            error:
              "Generated test input is too large.",
          };
        }

        const referenceResult =
          await runProcess(
            referenceExecutablePath,
            [],
            {
              cwd:
                jobDirectory,

              /*
               * Reference execution gets the same
               * problem limit plus buffer.
               */
              timeoutMs:
                executionTimeoutMs,

              stdin:
                generatedTest.input,

              maxOutputBytes:
                MAX_OUTPUT_SIZE,
            }
          );

        if (
          referenceResult.timedOut
        ) {

          return {
            ok: false,

            status:
              "INVALID_TEST_SUITE",

            stdout: "",

            stderr:
              referenceResult.stderr,

            executionTimeMs:
              referenceResult.executionTimeMs,

            exitCode: null,

            error:
              "Reference solution exceeded the execution limit.",
          };
        }

        if (
          referenceResult.outputLimitExceeded
        ) {

          return {
            ok: false,

            status:
              "INVALID_TEST_SUITE",

            stdout: "",

            stderr:
              referenceResult.stderr,

            executionTimeMs:
              referenceResult.executionTimeMs,

            exitCode:
              referenceResult.exitCode,

            error:
              "Reference solution produced too much output.",
          };
        }

        if (
          referenceResult.exitCode !==
          0
        ) {

          return {
            ok: false,

            status:
              "INVALID_TEST_SUITE",

            stdout:
              referenceResult.stdout,

            stderr:
              referenceResult.stderr,

            executionTimeMs:
              referenceResult.executionTimeMs,

            exitCode:
              referenceResult.exitCode,

            error:
              "Reference solution failed while generating expected output.",
          };
        }

        tests.push({
          input:
            generatedTest.input,

          expectedOutput:
            referenceResult.stdout,
        });
      }

    } else {

      /*
       * Manual tests.
       */
      tests =
        getManualTests(
          request
        );
    }

    if (
      tests.length === 0
    ) {

      return {
        ok: false,

        status:
          "INVALID_TEST_SUITE",

        stdout: "",

        stderr: "",

        executionTimeMs: 0,

        exitCode: null,

        error:
          "No test cases were supplied.",
      };
    }

    /* =====================================================
       RUN STUDENT AGAINST TESTS
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
          studentExecutablePath,
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
         TLE
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
        };
      }

      /* ===================================================
         WRONG ANSWER
         =================================================== */

      const matches =
        outputsMatch(
          executionResult.stdout,
          test.expectedOutput
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
         PASSED
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
        testResults.reduce(
          (
            total,
            result
          ) =>
            total +
            result.executionTimeMs,
          0
        ),

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
   RAW EXECUTION RESPONSE
   ========================================================= */

function buildRawExecutionResponse(
  result: ProcessResult
): ExecuteResponse {

  if (
    result.timedOut
  ) {

    return {
      ok: false,

      status:
        "TIME_LIMIT_EXCEEDED",

      stdout:
        result.stdout,

      stderr:
        result.stderr,

      executionTimeMs:
        result.executionTimeMs,

      exitCode:
        null,
    };
  }

  if (
    result.outputLimitExceeded
  ) {

    return {
      ok: false,

      status:
        "OUTPUT_LIMIT_EXCEEDED",

      stdout:
        result.stdout,

      stderr:
        result.stderr,

      executionTimeMs:
        result.executionTimeMs,

      exitCode:
        result.exitCode,
    };
  }

  if (
    result.exitCode !== 0
  ) {

    return {
      ok: false,

      status:
        "RUNTIME_ERROR",

      stdout:
        result.stdout,

      stderr:
        result.stderr,

      executionTimeMs:
        result.executionTimeMs,

      exitCode:
        result.exitCode,
    };
  }

  return {
    ok: true,

    status:
      "ACCEPTED",

    stdout:
      result.stdout,

    stderr:
      result.stderr,

    executionTimeMs:
      result.executionTimeMs,

    exitCode:
      result.exitCode,
  };
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

      let timedOut = false;

      let outputLimitExceeded =
        false;

      let finished = false;

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

          finished = true;

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

              timedOut = true;

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

          finish(
            code
          );
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

          finish(
            null
          );
        }
      );
    }
  );
}