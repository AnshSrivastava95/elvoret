import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  Sparkles,
} from "lucide-react";

import { getCPProblem } from "@/lib/problem";
import ProblemInteraction from "@/components/cp/ProblemInteraction";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CPProblemPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const problem = await getCPProblem(slug);

  if (!problem) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-950">
            Problem not found
          </h1>

          <Link
            href="/cp"
            className="mt-4 inline-flex text-sm font-semibold text-purple-700"
          >
            ← Back to problems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">

          <Link
            href="/cp"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              transition-colors
              hover:text-purple-700
            "
          >
            <ArrowLeft size={16} />
            Back to Problems
          </Link>

        </div>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

        {/* ===================================================
            PROBLEM HEADER
        =================================================== */}

        <header className="max-w-4xl">

          <div className="flex flex-wrap items-center gap-3">

            <span
              className="
                rounded-full
                bg-purple-100
                px-3
                py-1.5
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-purple-700
              "
            >
              {problem.difficulty}
            </span>

            {problem.source && (
              <span className="text-sm text-gray-500">
                {problem.source}
                {problem.sourceId
                  ? ` #${problem.sourceId}`
                  : ""}
              </span>
            )}

          </div>

          <h1
            className="
              mt-5
              text-4xl
              font-extrabold
              tracking-tight
              text-gray-950
              sm:text-5xl
            "
          >
            {problem.title}
          </h1>

          {problem.description && (
            <p
              className="
                mt-5
                max-w-3xl
                text-lg
                leading-8
                text-gray-600
              "
            >
              {problem.description}
            </p>
          )}

          {problem.topics.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">

              {problem.topics.map((topic) => (
                <span
                  key={topic}
                  className="
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-gray-600
                  "
                >
                  {topic}
                </span>
              ))}

            </div>
          )}

        </header>

        {/* ===================================================
            CONTENT GRID
        =================================================== */}

        <div
          className="
            mt-12
            grid
            gap-12
            lg:grid-cols-[minmax(0,1fr)_300px]
          "
        >

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="min-w-0">

            {/* =================================================
                PROBLEM
            ================================================= */}

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
                    bg-purple-50
                    text-purple-700
                  "
                >
                  <Code2 size={19} />
                </div>

                <h2 className="text-2xl font-bold text-gray-950">
                  Problem
                </h2>

              </div>

              <div
                className="cp-content"
                dangerouslySetInnerHTML={{
                  __html: problem.problemHtml,
                }}
              />

            </section>

            {/* =================================================
                EXAMPLES
            ================================================= */}

            {problem.examples.length > 0 && (
              <section className="cp-section">

                <h2 className="mb-6 text-2xl font-bold text-gray-950">
                  Examples
                </h2>

                <div className="space-y-5">

                  {problem.examples.map(
                    (example, index) => (

                      <div
                        key={index}
                        className="
                          overflow-hidden
                          rounded-2xl
                          border
                          border-gray-200
                          bg-white
                        "
                      >

                        <div
                          className="
                            border-b
                            border-gray-200
                            bg-gray-50
                            px-5
                            py-3.5
                          "
                        >
                          <span className="text-sm font-bold text-gray-900">
                            Example {index + 1}
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2">

                          <div className="p-5 md:border-r md:border-gray-200">

                            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                              Input
                            </p>

                            <pre className="cp-example">
                              {example.input}
                            </pre>

                          </div>

                          <div className="border-t border-gray-200 p-5 md:border-t-0">

                            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                              Output
                            </p>

                            <pre className="cp-example">
                              {example.output}
                            </pre>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </section>
            )}

            {/* =================================================
                EDITOR
            ================================================= */}

            <CodingWorkspace
              starterCode={problem.starterCode}
              language={problem.language}
            />

            {/* =================================================
                HINTS + LOCKED SOLUTION
            ================================================= */}

            <ProblemInteraction
              slug={slug}
              hints={problem.hints}
            />

          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-8 space-y-5">

              <div
                className="
                  rounded-2xl
                  border
                  border-purple-100
                  bg-purple-50/50
                  p-6
                "
              >

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-purple-700">
                  <Sparkles size={14} />
                  Elvoret Approach
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-950">
                  Try before you look.
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Solve first. Use hints only when you're
                  genuinely stuck. The complete reasoning
                  becomes available after all three hints.
                </p>

              </div>

              {problem.pattern && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                    Pattern
                  </p>

                  <p className="mt-4 font-bold text-gray-950">
                    {problem.pattern}
                  </p>

                </div>
              )}

              {problem.complexity && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                    Complexity
                  </p>

                  <div className="mt-5 space-y-4">

                    {problem.complexity.time && (
                      <div className="flex items-center justify-between">

                        <span className="text-sm text-gray-500">
                          Time
                        </span>

                        <span className="rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-bold text-gray-800">
                          {problem.complexity.time}
                        </span>

                      </div>
                    )}

                    {problem.complexity.space && (
                      <div className="flex items-center justify-between">

                        <span className="text-sm text-gray-500">
                          Space
                        </span>

                        <span className="rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-bold text-gray-800">
                          {problem.complexity.space}
                        </span>

                      </div>
                    )}

                  </div>

                </div>
              )}

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}


/* =========================================================
   CODING WORKSPACE
========================================================= */

function CodingWorkspace({
  starterCode,
  language,
}: {
  starterCode: string;
  language: string;
}) {

  return (
    <section className="cp-section">

      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-purple-50
              text-purple-700
            "
          >
            <Code2 size={19} />
          </div>

          <h2 className="text-2xl font-bold text-gray-950">
            Your Solution
          </h2>

        </div>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Write your solution here. You can run and submit it
          once the evaluation engine is connected.
        </p>

      </div>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#252b3a]
          bg-[#0b0f19]
          shadow-[0_15px_40px_rgba(15,23,42,0.12)]
        "
      >

        {/* Editor top bar */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#252b3a]
            bg-[#111827]
            px-4
            py-3
          "
        >

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

          </div>

          <span
            className="
              rounded-md
              border
              border-gray-700
              bg-gray-800
              px-3
              py-1
              font-mono
              text-[11px]
              font-semibold
              text-gray-300
            "
          >
            {language.toUpperCase()}
          </span>

        </div>

        {/* Code area */}

        <textarea
          defaultValue={starterCode}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          className="
            block
            min-h-[420px]
            w-full
            resize-y
            border-0
            bg-[#0b0f19]
            px-6
            py-6
            font-mono
            text-[14px]
            leading-7
            text-gray-100
            outline-none
            placeholder:text-gray-600
            focus:ring-0
          "
          aria-label="Code editor"
        />

        {/* Bottom bar */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-[#252b3a]
            bg-[#111827]
            px-4
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <span className="text-xs text-gray-500">
            C++ • Evaluation coming soon
          </span>

          <div className="flex gap-2">

            <button
              type="button"
              className="
                rounded-lg
                border
                border-gray-700
                px-4
                py-2
                text-xs
                font-bold
                text-gray-300
                transition
                hover:bg-gray-800
              "
            >
              Run
            </button>

            <button
              type="button"
              className="
                rounded-lg
                bg-purple-600
                px-5
                py-2
                text-xs
                font-bold
                text-white
                transition
                hover:bg-purple-700
              "
            >
              Submit
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}