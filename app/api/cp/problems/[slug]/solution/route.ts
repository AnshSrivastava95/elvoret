import { NextResponse } from "next/server";
import { getCPSolution } from "@/lib/problem";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  const { slug } = await context.params;

  const solutionHtml =
    await getCPSolution(slug);

  if (!solutionHtml) {
    return NextResponse.json(
      {
        error: "Solution not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    solutionHtml,
  });
}