import {
  NextRequest,
  NextResponse,
} from "next/server";

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
  | "submit"
  | "playground";

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

    const mode: ExecutionMode =
      body.mode === "submit"
        ? "submit"
        : body.mode === "playground"
          ? "playground"
          : "run";

    const code =
      typeof body.code ===
      "string"
        ? body.code
        : "";

    const language =
      typeof body.language ===
      "string"
        ? body.language.toLowerCase()
        : "cpp";

    /* =====================================================
       CODE VALIDATION
       ===================================================== */

    if (
      !code.trim()
    ) {

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
       PLAYGROUND
       ===================================================== */

    /*
     * Playground does not have:
     *
     * - slug
     * - MDX problem
     * - reference solution
     * - hidden tests
     *
     * It simply compiles and executes the supplied
     * program with the supplied stdin.
     */

    if (
      mode ===
      "playground"
    ) {

      /*
       * Current Render executor only supports C++.
       */
      if (
        language !== "cpp"
      ) {

        return NextResponse.json(
          {
            error:
              "The Render executor currently supports C++ only.",
          },
          {
            status: 400,
          }
        );
      }

      const timeLimitMs =
        10_000;

      const executorPayload = {
        language:
          "cpp",

        code,

        input:
          typeof body.input ===
          "string"
            ? body.input
            : "",

        timeLimitMs,
      };

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

      let data: unknown;

      try {

        data =
          await response.json();

      } catch {

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

      return NextResponse.json(
        data,
        {
          status:
            response.status,
        }
      );
    }

    /* =====================================================
       CP MODE REQUIRES SLUG
       ===================================================== */

    const slug =
      typeof body.slug ===
      "string"
        ? body.slug.trim()
        : "";

    if (
      !slug
    ) {

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

    /* =====================================================
       LOAD CP PROBLEM
       ===================================================== */

    const problem =
      await getCPProblem(
        slug
      );

    if (
      !problem
    ) {

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

    if (
      problem.language
        .toLowerCase() !==
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
       BASE PAYLOAD
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
              "This problem has no example test cases.",
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

      if (
        problem.generator
      ) {

        executorPayload.generator =
          problem.generator;

      } else if (
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
              "This problem has no test generator or examples.",
          },
          {
            status: 500,
          }
        );
      }
    }

    /* =====================================================
       CALL RENDER
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

    let data: unknown;

    try {

      data =
        await response.json();

    } catch {

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