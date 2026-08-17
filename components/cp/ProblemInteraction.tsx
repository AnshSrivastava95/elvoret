"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Lightbulb,
  Lock,
} from "lucide-react";

import SolutionReveal from "./SolutionReveal";

interface ProblemInteractionProps {
  slug: string;
  hints: string[];
}

export default function ProblemInteraction({
  slug,
  hints,
}: ProblemInteractionProps) {

  const [revealedHints, setRevealedHints] = useState(0);

  const revealNextHint = () => {
    if (revealedHints >= hints.length) {
      return;
    }

    setRevealedHints((current) => current + 1);
  };

  const allHintsRevealed =
    hints.length === 0 ||
    revealedHints >= hints.length;

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
                Try the problem yourself first. If you get stuck,
                reveal the hints one at a time. After all three
                hints, you can reveal the complete answer.
              </p>

            </div>

          </div>

          {/* Hints */}

          <div className="mt-7 space-y-3">

            {hints.map((hint, index) => {

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
                    onClick={revealNextHint}
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
            })}

          </div>

          {/* All hints message */}

          {allHintsRevealed && hints.length > 0 && (
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
                    You've revealed all three hints.
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      leading-6
                      text-gray-600
                    "
                  >
                    Still stuck? You can now reveal the
                    complete answer and explanation.
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

      <SolutionReveal
        slug={slug}
        unlocked={allHintsRevealed}
      />

    </>
  );
}