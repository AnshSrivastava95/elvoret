import { NextResponse } from "next/server";

const JUDGE0_URL = process.env.JUDGE0_URL;

export async function POST(request: Request) {
  try {
    if (!JUDGE0_URL) {
      return NextResponse.json(
        {
          error:
            "Code execution service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await request.json();

    const {
      source_code,
      language_id,
      stdin,
    } = body;

    if (!source_code) {
      return NextResponse.json(
        {
          error: "Source code is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!language_id) {
      return NextResponse.json(
        {
          error: "Language is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       Create submission
    ===================================================== */

    const submissionResponse = await fetch(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          source_code,
          language_id,
          stdin: stdin || "",
        }),
      }
    );

    if (!submissionResponse.ok) {
      const errorText =
        await submissionResponse.text();

      console.error(
        "Judge0 submission error:",
        errorText
      );

      return NextResponse.json(
        {
          error:
            "Code execution service failed.",
        },
        {
          status: 502,
        }
      );
    }

    const result =
      await submissionResponse.json();

    /* =====================================================
       Translate Judge0 result
    ===================================================== */

    let status = "Unknown";

    if (result.status?.id === 3) {
      status = "Accepted";
    } else if (result.status?.description) {
      status = result.status.description;
    }

    return NextResponse.json({
      status,

      output:
        result.stdout ||
        result.message ||
        "",

      error:
        result.stderr ||
        result.compile_output ||
        "",

      time: result.time,

      memory: result.memory,
    });

  } catch (error) {
    console.error(
      "Code execution error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while executing the code.",
      },
      {
        status: 500,
      }
    );
  }
}