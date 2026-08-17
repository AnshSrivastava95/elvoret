"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  Lock,
} from "lucide-react";

interface HintPanelProps {
  hints: string[];
  onAllHintsRevealed?: () => void;
}

export default function HintPanel({
  hints,
  onAllHintsRevealed,
}: HintPanelProps) {
  const [revealed, setRevealed] = useState(0);

  const revealNext = () => {
    if (revealed >= hints.length) return;

    const next = revealed + 1;

    setRevealed(next);

    if (next === hints.length) {
      onAllHintsRevealed?.();
    }
  };

  return (
    <div className="mt-7 space-y-3">
      {hints.map((hint, index) => {
        const isRevealed = index < revealed;
        const isNext = index === revealed;

        return (
          <div
            key={index}
            className={`overflow-hidden rounded-xl border transition-all ${
              isRevealed
                ? "border-purple-200 bg-white"
                : "border-gray-200 bg-white"
            }`}
          >
            <button
              type="button"
              onClick={isNext ? revealNext : undefined}
              disabled={!isNext}
              className={`flex w-full items-center justify-between px-4 py-4 text-left ${
                isNext
                  ? "cursor-pointer hover:bg-purple-50/50"
                  : "cursor-default"
              }`}
            >
              <div className="flex items-center gap-3">
                {isRevealed ? (
                  <CheckCircle2
                    size={18}
                    className="text-purple-600"
                  />
                ) : (
                  <Lock size={17} className="text-gray-400" />
                )}

                <span className="text-sm font-bold text-gray-900">
                  Hint {index + 1}
                </span>
              </div>

              {isNext && (
                <span className="flex items-center gap-1 text-xs font-bold text-purple-700">
                  Reveal
                  <ChevronDown size={15} />
                </span>
              )}
            </button>

            {isRevealed && (
              <div className="border-t border-gray-100 px-4 py-4">
                <p className="text-sm leading-7 text-gray-600">
                  {hint}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {revealed === hints.length && hints.length > 0 && (
        <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb
              size={18}
              className="mt-0.5 shrink-0 text-purple-700"
            />

            <div>
              <p className="text-sm font-bold text-gray-900">
                You've used all 3 hints.
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Still stuck? You can now reveal the complete answer and
                explanation below.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}