import {
  NextResponse,
} from "next/server";

import {
  getCPSolution,
} from "@/lib/problem";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { slug } =
      await context.params;

    if (!slug) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Problem slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    const solutionHtml =
      await getCPSolution(slug);

    if (
      !solutionHtml
    ) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Solution not found for this problem.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        solutionHtml,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "CP solution route failed:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error:
          "Could not load the solution.",
      },
      {
        status: 500,
      }
    );
  }
}