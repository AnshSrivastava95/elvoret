"use client";

import { useState } from "react";

import HintSection from "@/components/cp/HintSection";
import CodingWorkspace from "@/components/cp/CodingWorkspace";

interface Example {
  input: string;
  output: string;
}

interface ProblemLearningFlowProps {
  contentHtml: string;
  solutionHtml: string;

  hints: string[];

  language: string;
  starterCode: string;

  examples: Example[];
}

export default function ProblemLearningFlow({
  contentHtml,
  solutionHtml,
  hints,
  language,
  starterCode,
  examples,
}: ProblemLearningFlowProps) {
  const [showAnswer, setShowAnswer] =
    useState(false);

  return (
    <div>

      {/* ================================================= */}
      {/* Public Problem */}
      {/* ================================================= */}

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

          prose-h2:mt-12
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
          prose-a:no-underline
          hover:prose-a:underline
        "
        dangerouslySetInnerHTML={{
          __html: contentHtml,
        }}
      />

      {/* ================================================= */}
      {/* Coding Workspace */}
      {/* ================================================= */}

      <CodingWorkspace
        language={language}
        starterCode={starterCode}
        examples={examples}
      />

      {/* ================================================= */}
      {/* Hints */}
      {/* ================================================= */}

      {!showAnswer && (
        <HintSection
          hints={hints}
          onRevealAnswer={() =>
            setShowAnswer(true)
          }
        />
      )}

      {/* ================================================= */}
      {/* Solution */}
      {/* ================================================= */}

      {showAnswer && (
        <section className="mt-16 border-t border-gray-100 pt-14">

          <div className="mb-10 rounded-2xl border border-purple-200 bg-purple-50 p-6">

            <p className="text-xs font-bold uppercase tracking-[0.12em] text-purple-700">
              SOLUTION REVEALED
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
              Now understand why it works.
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Don't just copy the solution. Follow the reasoning
              that led to it.
            </p>

          </div>

          <div
            className="
              prose
              prose-gray
              max-w-none

              prose-headings:font-extrabold
              prose-headings:tracking-tight
              prose-headings:text-gray-950

              prose-h2:mt-14
              prose-h2:text-2xl

              prose-h3:mt-8
              prose-h3:text-xl

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
            "
            dangerouslySetInnerHTML={{
              __html: solutionHtml,
            }}
          />

        </section>
      )}

    </div>
  );
}