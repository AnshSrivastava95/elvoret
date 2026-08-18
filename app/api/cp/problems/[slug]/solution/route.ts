import { NextRequest, NextResponse } from "next/server";

import {
  getCPProblem,
  getCPReferenceCode,
} from "@/lib/problem";

/* =========================================================
   ENVIRONMENT
   ========================================================= */

const EXECUTOR_URL =
  process.env.EXECUTOR_URL;

const EXECUTOR_SECRET =
  process.env.EXECUTOR_SECRET;

/* =========================================================
   TYPES
   ========================================================= */

type ExecutionMode =
  | "run"
  | "submit";

/* =========================================================
   POST
   ========================================================= */

export async function POST(
  request: NextRequest
) {
  try {

    /* =====================================================
       ENVIRONMENT
       ===================================================== */

    if (
      !EXECUTOR_URL ||
      !EXECUTOR_SECRET
    ) {

      console.error(
        "Executor environment variables are missing."
      );

      return NextResponse.json(
        {
          error:
            "Executor is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       REQUEST
       ===================================================== */

    const body =
      await request.json();

    const slug =
      typeof body.slug ===
      "string"
        ? body.slug.trim()
        : "";

    const code =
      typeof body.code ===
      "string"
        ? body.code
        : "";

    const mode: ExecutionMode =
      body.mode === "submit"
        ? "submit"
        : "run";

    /* =====================================================
       VALIDATION
       ===================================================== */

    if (!slug) {

      return NextResponse.json(
        {
          error:
            "Problem slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!code.trim()) {

      return NextResponse.json(
        {
          error:
            "Code is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       LOAD PROBLEM
       ===================================================== */

    const problem =
      await getCPProblem(
        slug
      );

    if (!problem) {

      return NextResponse.json(
        {
          error:
            "Problem not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================================
       LANGUAGE
       ===================================================== */

    const language =
      problem.language ||
      "cpp";

    if (
      language.toLowerCase() !==
      "cpp"
    ) {

      return NextResponse.json(
        {
          error:
            "Only C++ execution is currently supported.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       TIME LIMIT
       ===================================================== */

    /*
     * MDX:
     *
     * timeLimit: 2
     *
     * becomes:
     *
     * 2000 ms
     */

    const timeLimitSeconds =
      Number(
        problem.timeLimit ??
          2
      );

    const safeTimeLimitSeconds =
      Number.isFinite(
        timeLimitSeconds
      )
        ? Math.max(
            0.1,
            timeLimitSeconds
          )
        : 2;

    const timeLimitMs =
      Math.floor(
        safeTimeLimitSeconds *
          1000
      );

    /* =====================================================
       BASE EXECUTOR PAYLOAD
       ===================================================== */

    const executorPayload: Record<
      string,
      unknown
    > = {

      language:
        "cpp",

      code,

      timeLimitMs,
    };

    /* =====================================================
       RUN MODE
       ===================================================== */

    /*
     * RUN is deliberately lightweight.
     *
     * It uses the visible examples only.
     *
     * This gives the learner quick feedback without
     * running the full hidden judge.
     */

    if (
      mode === "run"
    ) {

      if (
        problem.examples.length ===
        0
      ) {

        return NextResponse.json(
          {
            error:
              "This problem has no example test cases to run.",
          },
          {
            status: 400,
          }
        );
      }

      executorPayload.tests =
        problem.examples.map(
          (
            example
          ) => ({
            input:
              example.input,

            expectedOutput:
              example.output,
          })
        );

    }

    /* =====================================================
       SUBMIT MODE
       ===================================================== */

    if (
      mode === "submit"
    ) {

      /*
       * A real submission needs an official
       * reference solution.
       */

      const referenceCode =
        await getCPReferenceCode(
          slug
        );

      if (
        !referenceCode
      ) {

        return NextResponse.json(
          {
            error:
              "This problem does not have a valid reference solution.",
          },
          {
            status: 500,
          }
        );
      }

      executorPayload.referenceCode =
        referenceCode;

      /*
       * Generated hidden tests.
       *
       * The executor creates the actual test inputs
       * and runs the reference solution to calculate
       * the expected outputs.
       */

      if (
        problem.generator
      ) {

        executorPayload.generator =
          problem.generator;

      }

      /*
       * Fallback:
       *
       * If a problem doesn't yet have a generator,
       * submit against the visible examples.
       *
       * This lets older problems continue working
       * while you gradually add generators.
       */

      else if (
        problem.examples.length >
        0
      ) {

        executorPayload.tests =
          problem.examples.map(
            (
              example
            ) => ({
              input:
                example.input,

              expectedOutput:
                example.output,
            })
          );

      } else {

        return NextResponse.json(
          {
            error:
              "This problem has neither a test generator nor example test cases.",
          },
          {
            status: 500,
          }
        );
      }
    }

    /* =====================================================
       CALL RENDER EXECUTOR
       ===================================================== */

    const response =
      await fetch(
        `${EXECUTOR_URL}/execute`,
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${EXECUTOR_SECRET}`,
          },

          body:
            JSON.stringify(
              executorPayload
            ),

          cache:
            "no-store",
        }
      );

    /* =====================================================
       EXECUTOR RESPONSE
       ===================================================== */

    let data: unknown;

    try {

      data =
        await response.json();

    } catch {

      console.error(
        "Executor returned invalid JSON."
      );

      return NextResponse.json(
        {
          error:
            "The execution engine returned an invalid response.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * Forward the executor's actual HTTP status.
     *
     * 200:
     *   Accepted
     *
     * 422:
     *   Wrong Answer
     *   TLE
     *   Runtime Error
     *   etc.
     *
     * 4xx/5xx:
     *   request/system failure
     */

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      }
    );

  } catch (error) {

    console.error(
      "Executor request failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Could not connect to the execution engine.",
      },
      {
        status: 502,
      }
    );
  }
}