import { NextRequest, NextResponse } from "next/server";

const EXECUTOR_URL = process.env.EXECUTOR_URL;
const EXECUTOR_SECRET = process.env.EXECUTOR_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!EXECUTOR_URL || !EXECUTOR_SECRET) {
      console.error("Executor environment variables are missing.");

      return NextResponse.json(
        {
          error: "Executor is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const response = await fetch(`${EXECUTOR_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EXECUTOR_SECRET}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Executor request failed:", error);

    return NextResponse.json(
      {
        error: "Could not connect to executor.",
      },
      { status: 502 }
    );
  }
}