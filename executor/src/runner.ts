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
} from "./types";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const WORK_ROOT =
  "/tmp/elvoret-executor";

/*
 * Maximum source-code size accepted.
 */
const MAX_CODE_SIZE =
  100_000;

/*
 * Maximum input size accepted.
 */
const MAX_INPUT_SIZE =
  1_000_000;

/*
 * Maximum combined stdout/stderr size.
 *
 * This prevents programs such as:
 *
 * while (true) cout << "x";
 *
 * from filling the executor's memory/disk.
 */
const MAX_OUTPUT_SIZE =
  1_000_000;

/*
 * Default execution time for submitted programs.
 */
const DEFAULT_TIME_LIMIT_MS =
  2_000;

/*
 * Maximum execution time that the API
 * will allow a submitted program to request.
 */
const MAX_TIME_LIMIT_MS =
  10_000;

/* =========================================================
   TYPES
   ========================================================= */

interface ProcessOptions {
  cwd: string;

  /*
   * Optional.
   *
   * Compilation does not use a timeout.
   * User-program execution does.
   */
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

/**
 * Create a unique ID for each execution.
 */
function createJobId(): string {
  return crypto.randomUUID();
}

/**
 * Keep values inside a safe range.
 */
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

/**
 * Make sure the executor workspace exists.
 */
async function ensureWorkRoot(): Promise<void> {
  await fs.mkdir(
    WORK_ROOT,
    {
      recursive: true,
    }
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
     VALIDATE INPUT
     ======================================================= */

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

  /*
   * Memory limits are accepted by the API contract,
   * but are not enforced yet.
   *
   * Proper memory isolation will be added when
   * we harden the sandbox.
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
       WRITE SOURCE FILE
       ===================================================== */

    await fs.writeFile(
      sourcePath,
      request.code,
      "utf8"
    );

    /* =====================================================
       COMPILE
       ===================================================== */

    /*
     * IMPORTANT:
     *
     * There is deliberately NO timeoutMs here.
     *
     * The compile phase is separate from the
     * problem's execution time limit.
     */
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

          stdin: "",

          maxOutputBytes:
            MAX_OUTPUT_SIZE,
        }
      );

    /* =====================================================
       COMPILATION TIMEOUT
       ===================================================== */

    /*
     * This should normally never happen now because
     * compilation has no timeout.
     *
     * Kept for compatibility with the ProcessResult type.
     */
    if (
      compileResult.timedOut
    ) {
      return {
        ok: false,

        status:
          "TIME_LIMIT_EXCEEDED",

        stdout:
          compileResult.stdout,

        stderr:
          compileResult.stderr,

        executionTimeMs:
          compileResult.executionTimeMs,

        exitCode:
          null,
      };
    }

    /* =====================================================
       COMPILER OUTPUT TOO LARGE
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
      };
    }

    /* =====================================================
       COMPILATION FAILED
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
      };
    }

    /* =====================================================
       EXECUTE COMPILED PROGRAM
       ===================================================== */

    const executionResult =
      await runProcess(
        executablePath,
        [],
        {
          cwd:
            jobDirectory,

          /*
           * This is the actual problem
           * execution time limit.
           */
          timeoutMs:
            timeLimitMs,

          stdin:
            input,

          maxOutputBytes:
            MAX_OUTPUT_SIZE,
        }
      );

    /* =====================================================
       TIME LIMIT EXCEEDED
       ===================================================== */

    if (
      executionResult.timedOut
    ) {
      return {
        ok: false,

        status:
          "TIME_LIMIT_EXCEEDED",

        stdout:
          executionResult.stdout,

        stderr:
          executionResult.stderr,

        executionTimeMs:
          executionResult.executionTimeMs,

        exitCode:
          null,
      };
    }

    /* =====================================================
       OUTPUT LIMIT EXCEEDED
       ===================================================== */

    if (
      executionResult.outputLimitExceeded
    ) {
      return {
        ok: false,

        status:
          "OUTPUT_LIMIT_EXCEEDED",

        stdout:
          executionResult.stdout,

        stderr:
          executionResult.stderr,

        executionTimeMs:
          executionResult.executionTimeMs,

        exitCode:
          executionResult.exitCode,
      };
    }

    /* =====================================================
       RUNTIME ERROR
       ===================================================== */

    if (
      executionResult.exitCode !==
      0
    ) {
      return {
        ok: false,

        status:
          "RUNTIME_ERROR",

        stdout:
          executionResult.stdout,

        stderr:
          executionResult.stderr,

        executionTimeMs:
          executionResult.executionTimeMs,

        exitCode:
          executionResult.exitCode,
      };
    }

    /* =====================================================
       ACCEPTED EXECUTION
       ===================================================== */

    return {
      ok: true,

      status:
        "ACCEPTED",

      stdout:
        executionResult.stdout,

      stderr:
        executionResult.stderr,

      executionTimeMs:
        executionResult.executionTimeMs,

      exitCode:
        executionResult.exitCode,
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

/**
 * Spawn a process and capture:
 *
 * - stdout
 * - stderr
 * - exit code
 * - execution time
 * - optional timeout
 * - output limit
 *
 * NOTE:
 *
 * This is still the initial execution implementation.
 * It is NOT yet the final security sandbox for arbitrary
 * public submissions.
 */
function runProcess(
  command: string,
  args: string[],
  options: ProcessOptions
): Promise<ProcessResult> {

  return new Promise(
    (resolve) => {

      /* ===================================================
         START TIME
         =================================================== */

      const start =
        process.hrtime.bigint();

      /* ===================================================
         STATE
         =================================================== */

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

      /*
       * Explicit ChildProcess cast prevents the
       * Node type-overload issue that previously
       * turned `child` into `never`.
       */

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

            /*
             * Keep the existing environment while
             * overriding only what we need.
             */
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
         OPTIONAL TIMEOUT
         =================================================== */

      let timeout:
        ReturnType<
          typeof setTimeout
        > | undefined;

      /*
       * Compilation passes no timeoutMs.
       *
       * Student execution passes timeoutMs.
       */
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