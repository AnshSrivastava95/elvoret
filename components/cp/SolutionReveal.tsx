"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
} from "lucide-react";

interface SolutionRevealProps {
  slug: string;
  unlocked: boolean;
}

export default function SolutionReveal({
  slug,
  unlocked,
}: SolutionRevealProps) {

  const [loading, setLoading] =
    useState(false);

  const [solution, setSolution] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  async function revealSolution() {

    if (
      !unlocked ||
      loading ||
      solution
    ) {
      return;
    }

    try {

      setLoading(true);
      setError(null);

      const response =
        await fetch(
          `/api/cp/problems/${encodeURIComponent(slug)}/solution`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

      if (!response.ok) {
        throw new Error(
          "Unable to load the solution."
        );
      }

      const data =
        await response.json();

      if (!data.solutionHtml) {
        throw new Error(
          "The solution is empty."
        );
      }

      setSolution(
        data.solutionHtml
      );

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  }

  /* =======================================================
     SOLUTION IS NOW VISIBLE
  ======================================================= */

  if (solution) {

    return (
      <section className="cp-section">

        <div className="mb-6 flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-green-50
              text-green-600
            "
          >
            <CheckCircle2 size={19} />
          </div>

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.12em] text-green-600">
              Solution Revealed
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-950">
              The reasoning behind the solution
            </h2>

          </div>

        </div>

        <article
          className="cp-content"
          dangerouslySetInnerHTML={{
            __html: solution,
          }}
        />

      </section>
    );
  }

  /* =======================================================
     LOCKED
  ======================================================= */

  return (
    <section className="cp-section">

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          p-8
          text-center
          sm:p-10
        "
      >

        <div
          className={`
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            ${
              unlocked
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-200 text-gray-400"
            }
          `}
        >
          <Lock size={20} />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-950">
          Answer & Explanation
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
          {unlocked
            ? "You've revealed all three hints. You can now see the complete solution and reasoning."
            : "The solution stays hidden until you reveal all three hints."}
        </p>

        <button
          type="button"
          disabled={!unlocked || loading}
          onClick={revealSolution}
          className={`
            mt-7
            inline-flex
            items-center
            gap-2
            rounded-xl
            px-6
            py-3.5
            text-sm
            font-bold
            transition-all
            ${
              unlocked
                ? "bg-purple-700 text-white shadow-lg shadow-purple-200 hover:bg-purple-800"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }
          `}
        >

          {loading ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />

              Loading solution...
            </>
          ) : (
            <>
              {unlocked
                ? "Reveal Answer & Explanation"
                : "Reveal All 3 Hints First"}

              <ArrowRight size={17} />
            </>
          )}

        </button>

        {error && (
          <p className="mt-4 text-sm font-semibold text-red-600">
            {error}
          </p>
        )}

      </div>

    </section>
  );
}