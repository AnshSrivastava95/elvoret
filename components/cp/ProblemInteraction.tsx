"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  CheckCircle2,
  Lightbulb,
  Lock,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface ProblemInteractionProps {
  slug: string;
  hints: string[];
}

interface SolutionResponse {
  ok?: boolean;
  solutionHtml?: string;
  error?: string;
}

export default function ProblemInteraction({
  slug,
  hints,
}: ProblemInteractionProps) {
  const [
    revealedHints,
    setRevealedHints,
  ] = useState(0);

  const [
    solutionHtml,
    setSolutionHtml,
  ] = useState<string | null>(null);

  const [
    solutionLoading,
    setSolutionLoading,
  ] = useState(false);

  const [
    solutionError,
    setSolutionError,
  ] = useState<string | null>(null);

  /* =======================================================
     HINTS
     ======================================================= */

  const revealNextHint = () => {
    if (
      revealedHints >= hints.length
    ) {
      return;
    }

    setRevealedHints(
      (current) => current + 1
    );
  };

  const allHintsRevealed =
    hints.length === 0 ||
    revealedHints >= hints.length;

  /* =======================================================
     LOAD SOLUTION
     ======================================================= */

  useEffect(() => {
    if (!allHintsRevealed) {
      return;
    }

    let cancelled = false;

    async function loadSolution() {
      setSolutionLoading(true);
      setSolutionError(null);

      try {
        /*
         * IMPORTANT:
         *
         * Your existing route lives at:
         *
         * /api/cp/problems/[slug]/solution
         *
         * so the browser must request that exact path.
         */
        const response = await fetch(
          `/api/cp/problems/${encodeURIComponent(
            slug
          )}/solution`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        let data: SolutionResponse;

        try {
          data = await response.json();
        } catch {
          throw new Error(
            "The solution response was invalid."
          );
        }

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Could not load the solution."
          );
        }

        if (
          !data.solutionHtml
        ) {
          throw new Error(
            "This problem does not have a solution yet."
          );
        }

        if (!cancelled) {
          setSolutionHtml(
            data.solutionHtml
          );
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load solution:",
          error
        );

        setSolutionError(
          error instanceof Error
            ? error.message
            : "Could not load the solution."
        );
      } finally {
        if (!cancelled) {
          setSolutionLoading(false);
        }
      }
    }

    loadSolution();

    return () => {
      cancelled = true;
    };
  }, [
    slug,
    allHintsRevealed,
  ]);

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <>
      {/* =====================================================
          HINT SECTION
      ===================================================== */}

      <section className="cp-section">
        <div
          className="
            rounded-2xl
            border
            border-purple-100
            bg-purple-50/40
            p-6
            sm:p-8
          "
        >
          {/* Header */}

          <div className="flex items-start gap-4">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-purple-100
                text-purple-700
              "
            >
              <Lightbulb size={19} />
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-purple-700
                "
              >
                Elvoret Approach
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-gray-950
                "
              >
                Stuck? Use a hint.
              </h2>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-gray-600
                "
              >
                Try the problem yourself first.
                If you get stuck, reveal the hints
                one at a time. After all three hints,
                you can reveal the complete answer.
              </p>
            </div>
          </div>

          {/* Hints */}

          <div className="mt-7 space-y-3">
            {hints.map(
              (hint, index) => {
                const isRevealed =
                  index < revealedHints;

                const isNext =
                  index === revealedHints;

                return (
                  <div
                    key={index}
                    className={`
                      overflow-hidden
                      rounded-xl
                      border
                      transition-all
                      ${
                        isRevealed
                          ? "border-purple-200 bg-white"
                          : "border-gray-200 bg-white"
                      }
                    `}
                  >
                    <button
                      type="button"
                      disabled={!isNext}
                      onClick={
                        revealNextHint
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        px-4
                        py-4
                        text-left
                        ${
                          isNext
                            ? "cursor-pointer hover:bg-purple-50/50"
                            : "cursor-default"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {isRevealed ? (
                          <CheckCircle2
                            size={18}
                            className="text-purple-600"
                          />
                        ) : (
                          <Lock
                            size={17}
                            className="text-gray-400"
                          />
                        )}

                        <span
                          className="
                            text-sm
                            font-bold
                            text-gray-900
                          "
                        >
                          Hint {index + 1}
                        </span>
                      </div>

                      {isNext && (
                        <span
                          className="
                            text-xs
                            font-bold
                            text-purple-700
                          "
                        >
                          Reveal
                        </span>
                      )}
                    </button>

                    {isRevealed && (
                      <div
                        className="
                          border-t
                          border-gray-100
                          px-4
                          py-4
                        "
                      >
                        <p
                          className="
                            text-sm
                            leading-7
                            text-gray-600
                          "
                        >
                          {hint}
                        </p>
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>

          {/* All hints revealed */}

          {allHintsRevealed &&
            hints.length > 0 && (
              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-purple-200
                  bg-purple-50
                  p-4
                "
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="
                      mt-0.5
                      shrink-0
                      text-purple-700
                    "
                  />

                  <div>
                    <p
                      className="
                        text-sm
                        font-bold
                        text-gray-900
                      "
                    >
                      You've revealed all{" "}
                      {hints.length} hints.
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-6
                        text-gray-600
                      "
                    >
                      The complete answer and
                      explanation are now available
                      below.
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </section>

      {/* =====================================================
          SOLUTION
      ===================================================== */}

      {allHintsRevealed && (
        <section
          className="
            mt-16
            border-t
            border-gray-100
            pt-14
          "
        >
          {/* Solution header */}

          <div
            className="
              mb-10
              rounded-2xl
              border
              border-purple-200
              bg-purple-50
              p-6
              sm:p-8
            "
          >
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.12em]
                text-purple-700
              "
            >
              SOLUTION REVEALED
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-extrabold
                text-gray-950
              "
            >
              Now understand why it works.
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-gray-600
              "
            >
              Don't just copy the solution.
              Follow the reasoning that led to it.
            </p>
          </div>

          {/* Loading */}

          {solutionLoading && (
            <div
              className="
                flex
                items-center
                justify-center
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-6
                py-12
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  font-medium
                  text-gray-500
                "
              >
                <Loader2
                  size={18}
                  className="
                    animate-spin
                    text-purple-600
                  "
                />

                Loading solution...
              </div>
            </div>
          )}

          {/* Error */}

          {!solutionLoading &&
            solutionError && (
              <div
                className="
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  p-5
                "
              >
                <div className="flex items-start gap-3">
                  <AlertCircle
                    size={19}
                    className="
                      mt-0.5
                      shrink-0
                      text-red-600
                    "
                  />

                  <div>
                    <p
                      className="
                        text-sm
                        font-bold
                        text-red-900
                      "
                    >
                      Solution couldn't be loaded
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-6
                        text-red-700
                      "
                    >
                      {solutionError}
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Solution */}

          {!solutionLoading &&
            !solutionError &&
            solutionHtml && (
              <div
                className="
                  prose
                  prose-gray
                  max-w-none

                  prose-headings:font-extrabold
                  prose-headings:tracking-tight
                  prose-headings:text-gray-950

                  prose-h1:text-3xl
                  prose-h1:leading-tight

                  prose-h2:mt-14
                  prose-h2:text-2xl
                  prose-h2:leading-tight

                  prose-h3:mt-8
                  prose-h3:text-xl
                  prose-h3:text-gray-900

                  prose-p:text-gray-600
                  prose-p:leading-8

                  prose-strong:text-gray-900

                  prose-code:rounded-md
                  prose-code:bg-gray-100
                  prose-code:px-1.5
                  prose-code:py-0.5
                  prose-code:text-purple-700
                  prose-code:before:content-none
                  prose-code:after:content-none

                  prose-pre:my-8
                  prose-pre:overflow-x-auto
                  prose-pre:rounded-2xl
                  prose-pre:border
                  prose-pre:border-gray-800
                  prose-pre:bg-gray-950
                  prose-pre:p-0
                  prose-pre:shadow-lg

                  [&_.hljs]:!bg-transparent
                  [&_.hljs]:!p-6
                  [&_.hljs]:!text-gray-100

                  [&_pre_code]:!bg-transparent
                  [&_pre_code]:!px-0
                  [&_pre_code]:!py-0
                  [&_pre_code]:!text-gray-100
                  [&_pre_code]:!text-[14px]
                  [&_pre_code]:!leading-7

                  prose-li:text-gray-600
                  prose-li:leading-7

                  prose-a:text-purple-700
                "
                dangerouslySetInnerHTML={{
                  __html:
                    solutionHtml,
                }}
              />
            )}
        </section>
      )}
    </>
  );
}