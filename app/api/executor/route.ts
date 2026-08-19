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
       BODY
       ===================================================== */

    const body =
      await request.json();

    const mode: ExecutionMode =
      body.mode ===
      "submit"
        ? "submit"
        : body.mode ===
          "playground"
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

    if (
      mode ===
      "playground"
    ) {

      if (
        language !==
        "cpp"
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

      const executorPayload = {
        language:
          "cpp",

        code,

        input:
          typeof body.input ===
          "string"
            ? body.input
            : "",

        timeLimitMs:
          10_000,
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

      const data =
        await parseExecutorResponse(
          response
        );

      return NextResponse.json(
        data.body,
        {
          status:
            data.status,
        }
      );
    }

    /* =====================================================
       CP SLUG
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
       LOAD PROBLEM
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

    const rawTimeLimit =
      Number(
        problem.timeLimit ??
          2
      );

    const timeLimitSeconds =
      Number.isFinite(
        rawTimeLimit
      )
        ? Math.max(
            0.1,
            rawTimeLimit
          )
        : 2;

    const timeLimitMs =
      Math.floor(
        timeLimitSeconds *
          1000
      );

    /* =====================================================
       TARGET COMPLEXITY
       ===================================================== */

    const targetComplexity =
      problem.complexity
        ? {
            time:
              problem.complexity
                .time,

            space:
              problem.complexity
                .space,
          }
        : undefined;

    /* =====================================================
       BASE PAYLOAD
       ===================================================== */

    const executorPayload:
      Record<
        string,
        unknown
      > = {

      language:
        "cpp",

      code,

      timeLimitMs,

      targetComplexity,
    };

    /* =====================================================
       RUN
       ===================================================== */

    if (
      mode ===
      "run"
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
       SUBMIT
       ===================================================== */

    if (
      mode ===
      "submit"
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
              "This problem has no test generator or example test cases.",
          },
          {
            status: 500,
          }
        );
      }
    }

    /* =====================================================
       RENDER EXECUTOR
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

    const data =
      await parseExecutorResponse(
        response
      );

    return NextResponse.json(
      data.body,
      {
        status:
          data.status,
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

/* =========================================================
   RESPONSE PARSER
   ========================================================= */

async function parseExecutorResponse(
  response: Response
): Promise<{
  status: number;
  body: unknown;
}> {

  try {

    return {
      status:
        response.status,

      body:
        await response.json(),
    };

  } catch {

    return {
      status:
        502,

      body: {
        error:
          "The execution engine returned invalid JSON.",
      },
    };
  }
}