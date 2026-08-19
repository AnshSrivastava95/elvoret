"use client";

import { useState } from "react";

import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock3,
  AlertTriangle,
  Code2,
  Terminal,
  Loader2,
} from "lucide-react";

/* =========================================================
   TYPES
   ========================================================= */

interface Example {
  input: string;
  output: string;
}

interface TestResult {
  testNumber: number;

  status: string;

  input?: string;

  expectedOutput?: string;

  stdout?: string;

  stderr?: string;

  executionTimeMs?: number;

  exitCode?: number | null;
}

interface ComplexityEstimate {
  time: string;

  space: string;

  confidence:
    | "low"
    | "medium"
    | "high";

  notes: string[];
}

interface ComplexityInfo {
  estimated: ComplexityEstimate;

  target?: {
    time?: string;
    space?: string;
  };

  timeMatchesTarget?: boolean;

  spaceMatchesTarget?: boolean;
}

interface ExecutorResponse {
  ok: boolean;

  status?: string;

  stdout?: string;

  stderr?: string;

  executionTimeMs?: number;

  exitCode?: number | null;

  failedTest?: number;

  expectedOutput?: string;

  testResults?: TestResult[];

  error?: string;

  complexity?: ComplexityInfo;
}

interface CodingWorkspaceProps {
  slug: string;

  language: string;

  starterCode: string;

  examples: Example[];
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function CodingWorkspace({
  slug,
  language,
  starterCode,
  examples,
}: CodingWorkspaceProps) {

  const [code, setCode] =
    useState(
      starterCode
    );

  const [running, setRunning] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [result, setResult] =
    useState<ExecutorResponse | null>(
      null
    );

  const [error, setError] =
    useState<string | null>(
      null
    );

  /* =======================================================
     RESET
     ======================================================= */

  const resetCode =
    () => {

      setCode(
        starterCode
      );

      setResult(
        null
      );

      setError(
        null
      );
    };

  /* =======================================================
     EXECUTE
     ======================================================= */

  const execute =
    async (
      mode:
        | "run"
        | "submit"
    ) => {

      if (
        running ||
        submitting
      ) {
        return;
      }

      setResult(
        null
      );

      setError(
        null
      );

      if (
        mode ===
        "run"
      ) {
        setRunning(
          true
        );
      } else {
        setSubmitting(
          true
        );
      }

      try {

        const response =
          await fetch(
            "/api/executor",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  slug,

                  code,

                  language:
                    language.toLowerCase(),

                  mode,
                }),
            }
          );

        let data:
          ExecutorResponse;

        try {

          data =
            await response.json();

        } catch {

          throw new Error(
            "The executor returned an invalid response."
          );
        }

        /*
         * 422 represents legitimate judge results.
         */
        if (
          !response.ok &&
          response.status !==
            422
        ) {

          throw new Error(
            data.error ||
            "The execution request failed."
          );
        }

        setResult(
          data
        );

      } catch (
        requestError
      ) {

        console.error(
          "Executor request failed:",
          requestError
        );

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Could not connect to the execution engine."
        );

      } finally {

        setRunning(
          false
        );

        setSubmitting(
          false
        );
      }
    };

  /* =======================================================
     STATE
     ======================================================= */

  const status =
    result?.status;

  const testResults =
    result?.testResults ??
    [];

  const passedTests =
    testResults.filter(
      (
        test
      ) =>
        test.status ===
        "ACCEPTED"
    ).length;

  const totalTests =
    testResults.length;

  /* =======================================================
     VERDICT
     ======================================================= */

  const renderVerdict =
    () => {

      if (
        error
      ) {

        return (
          <VerdictCard
            type="error"
            icon={
              <AlertTriangle
                size={22}
              />
            }
            title="Execution failed"
            description={
              error
            }
          />
        );
      }

      if (
        !result
      ) {
        return null;
      }

      if (
        status ===
        "ACCEPTED"
      ) {

        return (
          <VerdictCard
            type="success"
            icon={
              <CheckCircle2
                size={22}
              />
            }
            title="Accepted"
            description={
              totalTests > 0
                ? `All ${totalTests} test cases passed.`
                : "Your code executed successfully."
            }
            runtime={
              result.executionTimeMs
            }
          />
        );
      }

      if (
        status ===
        "WRONG_ANSWER"
      ) {

        return (
          <VerdictCard
            type="error"
            icon={
              <XCircle
                size={22}
              />
            }
            title="Wrong Answer"
            description={
              result.failedTest
                ? `Failed on test case ${result.failedTest}.`
                : "The output did not match the expected output."
            }
            runtime={
              result.executionTimeMs
            }
          />
        );
      }

      if (
        status ===
        "TIME_LIMIT_EXCEEDED"
      ) {

        return (
          <VerdictCard
            type="warning"
            icon={
              <Clock3
                size={22}
              />
            }
            title="Time Limit Exceeded"
            description={
              result.failedTest
                ? `Time limit exceeded on test case ${result.failedTest}.`
                : "Your program took too long to execute."
            }
            runtime={
              result.executionTimeMs
            }
          />
        );
      }

      if (
        status ===
        "COMPILATION_ERROR"
      ) {

        return (
          <VerdictCard
            type="error"
            icon={
              <XCircle
                size={22}
              />
            }
            title="Compilation Error"
            description={
              result.stderr ||
              "Your code could not be compiled."
            }
          />
        );
      }

      if (
        status ===
        "RUNTIME_ERROR"
      ) {

        return (
          <VerdictCard
            type="error"
            icon={
              <AlertTriangle
                size={22}
              />
            }
            title="Runtime Error"
            description={
              result.stderr ||
              "Your program terminated unexpectedly."
            }
            runtime={
              result.executionTimeMs
            }
          />
        );
      }

      if (
        status ===
        "OUTPUT_LIMIT_EXCEEDED"
      ) {

        return (
          <VerdictCard
            type="warning"
            icon={
              <AlertTriangle
                size={22}
              />
            }
            title="Output Limit Exceeded"
            description={
              "Your program produced too much output."
            }
            runtime={
              result.executionTimeMs
            }
          />
        );
      }

      return (
        <VerdictCard
          type="error"
          icon={
            <AlertTriangle
              size={22}
            />
          }
          title="Execution Error"
          description={
            result.error ||
            "Something went wrong while executing your code."
          }
        />
      );
    };

  /* =======================================================
     COMPLEXITY
     ======================================================= */

  const renderComplexity =
    () => {

      if (
        !result?.complexity
      ) {
        return null;
      }

      const complexity =
        result.complexity;

      const estimated =
        complexity.estimated;

      return (
        <div
          className="
            mt-4
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
          "
        >

          {/* Header */}

          <div
            className="
              border-b
              border-gray-100
              bg-gray-50/80
              px-5
              py-4
            "
          >

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.12em]
                text-gray-400
              "
            >
              COMPLEXITY ANALYSIS
            </p>

            <div
              className="
                mt-1
                flex
                flex-col
                gap-1
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <p
                className="
                  text-sm
                  font-bold
                  text-gray-900
                "
              >
                Your estimated complexity
              </p>

              <span
                className="
                  w-fit
                  rounded-full
                  bg-purple-50
                  px-2.5
                  py-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-purple-700
                "
              >
                {estimated.confidence} confidence
              </span>

            </div>

          </div>

          {/* Complexity values */}

          <div
            className="
              grid
              sm:grid-cols-2
            "
          >

            {/* Time */}

            <div
              className="
                border-b
                border-gray-100
                p-5
                sm:border-b-0
                sm:border-r
              "
            >

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-gray-400
                "
              >
                TIME COMPLEXITY
              </p>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >

                <span
                  className="
                    font-mono
                    text-xl
                    font-extrabold
                    text-gray-950
                  "
                >
                  {
                    estimated.time
                  }
                </span>

                {typeof complexity.timeMatchesTarget ===
                  "boolean" && (
                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      ${
                        complexity.timeMatchesTarget
                          ? "bg-purple-100 text-purple-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {
                      complexity.timeMatchesTarget
                        ? "Matches target"
                        : "Above target"
                    }
                  </span>
                )}

              </div>

              {complexity.target?.time && (
                <p
                  className="
                    mt-2
                    text-xs
                    text-gray-500
                  "
                >
                  Target:{" "}
                  <span
                    className="
                      font-mono
                      font-semibold
                      text-gray-700
                    "
                  >
                    {
                      complexity.target.time
                    }
                  </span>
                </p>
              )}

            </div>

            {/* Space */}

            <div
              className="
                p-5
              "
            >

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-gray-400
                "
              >
                SPACE COMPLEXITY
              </p>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >

                <span
                  className="
                    font-mono
                    text-xl
                    font-extrabold
                    text-gray-950
                  "
                >
                  {
                    estimated.space
                  }
                </span>

                {typeof complexity.spaceMatchesTarget ===
                  "boolean" && (
                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      ${
                        complexity.spaceMatchesTarget
                          ? "bg-purple-100 text-purple-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {
                      complexity.spaceMatchesTarget
                        ? "Matches target"
                        : "Above target"
                    }
                  </span>
                )}

              </div>

              {complexity.target?.space && (
                <p
                  className="
                    mt-2
                    text-xs
                    text-gray-500
                  "
                >
                  Target:{" "}
                  <span
                    className="
                      font-mono
                      font-semibold
                      text-gray-700
                    "
                  >
                    {
                      complexity.target.space
                    }
                  </span>
                </p>
              )}

            </div>

          </div>

          {/* Disclaimer */}

          <div
            className="
              border-t
              border-gray-100
              px-5
              py-3
            "
          >

            <p
              className="
                text-[11px]
                leading-5
                text-gray-400
              "
            >
              Complexity is estimated using static
              analysis of your submitted code. It is
              not a formal proof of Big-O complexity.
            </p>

          </div>

        </div>
      );
    };

  /* =======================================================
     TEST RESULTS
     ======================================================= */

  const renderTestResults =
    () => {

      if (
        totalTests ===
        0
      ) {
        return null;
      }

      return (
        <div
          className="
            mt-4
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
          "
        >

          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-gray-100
              bg-gray-50/80
              px-5
              py-4
            "
          >

            <div>

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-gray-400
                "
              >
                TEST RESULTS
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-bold
                  text-gray-900
                "
              >
                {passedTests} /{" "}
                {totalTests} passed
              </p>

            </div>

            <span
              className="
                rounded-full
                bg-white
                px-3
                py-1.5
                text-xs
                font-semibold
                text-gray-500
                shadow-sm
              "
            >
              {totalTests} test
              {
                totalTests === 1
                  ? ""
                  : "s"
              }
            </span>

          </div>

          {/* Progress */}

          <div
            className="
              px-5
              pt-4
            "
          >

            <div
              className="
                h-2
                overflow-hidden
                rounded-full
                bg-gray-100
              "
            >

              <div
                className="
                  h-full
                  rounded-full
                  bg-purple-600
                  transition-all
                  duration-500
                "
                style={{
                  width:
                    `${
                      totalTests > 0
                        ? (
                            passedTests /
                            totalTests
                          ) *
                          100
                        : 0
                    }%`,
                }}
              />

            </div>

          </div>

          {/* Rows */}

          <div
            className="
              mt-2
              divide-y
              divide-gray-100
            "
          >

            {testResults.map(
              (
                test
              ) => {

                const passed =
                  test.status ===
                  "ACCEPTED";

                return (
                  <div
                    key={
                      test.testNumber
                    }
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      px-5
                      py-4
                    "
                  >

                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                      "
                    >

                      <div
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          ${
                            passed
                              ? "bg-purple-100 text-purple-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >

                        {passed ? (
                          <CheckCircle2
                            size={15}
                          />
                        ) : (
                          <XCircle
                            size={15}
                          />
                        )}

                      </div>

                      <div>

                        <p
                          className="
                            text-sm
                            font-bold
                            text-gray-900
                          "
                        >
                          Test case{" "}
                          {
                            test.testNumber
                          }
                        </p>

                        <p
                          className={`
                            mt-0.5
                            text-xs
                            font-medium
                            ${
                              passed
                                ? "text-purple-600"
                                : "text-red-600"
                            }
                          `}
                        >
                          {passed
                            ? "Passed"
                            : test.status
                                .replace(
                                  /_/g,
                                  " "
                                )
                                .toLowerCase()}
                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                      "
                    >

                      {typeof test.executionTimeMs ===
                        "number" && (
                        <span
                          className="
                            rounded-full
                            bg-gray-50
                            px-2.5
                            py-1
                            font-mono
                            text-[11px]
                            font-semibold
                            text-gray-500
                          "
                        >
                          {
                            test.executionTimeMs.toFixed(
                              0
                            )
                          }{" "}
                          ms
                        </span>
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>
      );
    };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <section className="mt-14">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          mb-5
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-purple-50
                text-purple-700
              "
            >
              <Code2
                size={17}
              />
            </div>

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.14em]
                text-purple-700
              "
            >
              YOUR SOLUTION
            </p>

          </div>

          <h2
            className="
              mt-3
              text-2xl
              font-extrabold
              tracking-tight
              text-gray-950
            "
          >
            Try it yourself
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-gray-500
            "
          >
            Run against the examples first.
            Submit when you're confident.
          </p>

        </div>

        <button
          type="button"
          onClick={
            resetCode
          }
          disabled={
            running ||
            submitting
          }
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            px-3.5
            py-2.5
            text-xs
            font-semibold
            text-gray-600
            shadow-sm
            transition
            hover:border-gray-300
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          <RotateCcw
            size={14}
          />

          Reset

        </button>

      </div>

      {/* =====================================================
          EDITOR
      ===================================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#252b3a]
          bg-[#0b0f19]
          shadow-[0_20px_50px_rgba(15,23,42,0.12)]
        "
      >

        {/* Header */}

        <div
          className="
            flex
            h-12
            items-center
            justify-between
            border-b
            border-[#202736]
            bg-[#111827]
            px-4
            sm:px-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                items-center
                gap-1.5
              "
            >

              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-[#ef4444]
                "
              />

              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-[#f59e0b]
                "
              />

              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-[#22c55e]
                "
              />

            </div>

            <div
              className="
                h-4
                w-px
                bg-gray-700
              "
            />

            <span
              className="
                text-xs
                font-medium
                text-gray-400
              "
            >
              solution.
              {
                language.toLowerCase() ===
                "cpp"
                  ? "cpp"
                  : "txt"
              }
            </span>

          </div>

          <span
            className="
              rounded-md
              border
              border-gray-700
              bg-gray-800
              px-2.5
              py-1
              font-mono
              text-[10px]
              font-bold
              tracking-wider
              text-gray-300
            "
          >
            {
              language.toUpperCase()
            }
          </span>

        </div>

        {/* Code editor */}

        <div
          className="
            relative
            bg-[#0b0f19]
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              right-5
              top-4
              z-10
              hidden
              items-center
              gap-2
              text-[10px]
              font-medium
              uppercase
              tracking-wider
              text-gray-600
              sm:flex
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-gray-700
              "
            />

            Editing

          </div>

          <textarea
            value={
              code
            }
            onChange={(
              event
            ) => {

              setCode(
                event.target.value
              );

              setResult(
                null
              );

              setError(
                null
              );
            }}
            spellCheck={
              false
            }
            autoCorrect="off"
            autoCapitalize="off"
            className="
              block
              min-h-[420px]
              w-full
              resize-y
              border-0
              bg-transparent
              px-5
              py-6
              font-mono
              text-[13px]
              leading-7
              text-gray-100
              outline-none
              placeholder:text-gray-700
              focus:ring-0
              sm:px-6
            "
            aria-label="Code editor"
          />

        </div>

        {/* Footer */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-[#202736]
            bg-[#111827]
            px-4
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Terminal
              size={14}
              className="text-gray-600"
            />

            <p
              className="
                text-[11px]
                text-gray-500
              "
            >
              {running
                ? "Running against examples..."
                : submitting
                  ? "Running hidden tests..."
                  : "Ready to run"}
            </p>

          </div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            {/* Run */}

            <button
              type="button"
              onClick={() =>
                execute(
                  "run"
                )
              }
              disabled={
                running ||
                submitting
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-gray-700
                bg-transparent
                px-4
                py-2
                text-xs
                font-bold
                text-gray-300
                transition
                hover:border-gray-600
                hover:bg-gray-800
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {running ? (
                <Loader2
                  size={14}
                  className="animate-spin"
                />
              ) : (
                <Play
                  size={14}
                />
              )}

              {running
                ? "Running..."
                : "Run"}

            </button>

            {/* Submit */}

            <button
              type="button"
              onClick={() =>
                execute(
                  "submit"
                )
              }
              disabled={
                running ||
                submitting
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-purple-600
                px-5
                py-2
                text-xs
                font-bold
                text-white
                shadow-sm
                shadow-purple-900/20
                transition
                hover:bg-purple-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {submitting ? (
                <Loader2
                  size={14}
                  className="animate-spin"
                />
              ) : (
                <Send
                  size={14}
                />
              )}

              {
                submitting
                  ? "Submitting..."
                  : "Submit"
              }

            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          RESULTS
      ===================================================== */}

      {
        renderVerdict()
      }

      {
        renderComplexity()
      }

      {
        renderTestResults()
      }

      {/* =====================================================
          EXAMPLES
      ===================================================== */}

      {examples.length >
        0 && (
        <div
          className="
            mt-10
          "
        >

          <div
            className="
              mb-4
            "
          >

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.12em]
                text-gray-400
              "
            >
              TEST CASES
            </p>

            <h3
              className="
                mt-1
                text-xl
                font-extrabold
                tracking-tight
                text-gray-950
              "
            >
              Check your thinking
            </h3>

          </div>

          <div
            className="
              grid
              gap-4
              md:grid-cols-2
            "
          >

            {examples.map(
              (
                example,
                index
              ) => (

                <div
                  key={
                    index
                  }
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    transition
                    hover:border-gray-300
                    hover:shadow-sm
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-gray-100
                      bg-gray-50/80
                      px-4
                      py-3
                    "
                  >

                    <span
                      className="
                        text-xs
                        font-bold
                        text-gray-700
                      "
                    >
                      Example{" "}
                      {index + 1}
                    </span>

                    <span
                      className="
                        rounded-md
                        bg-white
                        px-2
                        py-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-gray-400
                        shadow-sm
                      "
                    >
                      Test Case
                    </span>

                  </div>

                  <div
                    className="
                      grid
                      divide-y
                      divide-gray-100
                      md:grid-cols-2
                      md:divide-x
                      md:divide-y-0
                    "
                  >

                    <div
                      className="
                        p-4
                      "
                    >

                      <p
                        className="
                          mb-2
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.12em]
                          text-gray-400
                        "
                      >
                        Input
                      </p>

                      <pre
                        className="
                          overflow-x-auto
                          rounded-xl
                          border
                          border-gray-800
                          bg-[#0b0f19]
                          p-3.5
                          font-mono
                          text-xs
                          leading-6
                          text-gray-200
                        "
                      >
                        {
                          example.input
                        }
                      </pre>

                    </div>

                    <div
                      className="
                        p-4
                      "
                    >

                      <p
                        className="
                          mb-2
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.12em]
                          text-gray-400
                        "
                      >
                        Expected Output
                      </p>

                      <pre
                        className="
                          overflow-x-auto
                          rounded-xl
                          border
                          border-gray-800
                          bg-[#0b0f19]
                          p-3.5
                          font-mono
                          text-xs
                          leading-6
                          text-gray-200
                        "
                      >
                        {
                          example.output
                        }
                      </pre>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>
      )}

    </section>
  );
}

/* =========================================================
   VERDICT CARD
   ========================================================= */

function VerdictCard({
  type,
  icon,
  title,
  description,
  runtime,
}: {
  type:
    | "success"
    | "error"
    | "warning";

  icon: React.ReactNode;

  title: string;

  description: string;

  runtime?: number;
}) {

  const styles = {
    success: {
      wrapper:
        "border-purple-200 bg-purple-50/70",

      title:
        "text-purple-950",

      description:
        "text-purple-700",

      icon:
        "bg-purple-100 text-purple-700",
    },

    error: {
      wrapper:
        "border-red-200 bg-red-50/70",

      title:
        "text-red-950",

      description:
        "text-red-700",

      icon:
        "bg-red-100 text-red-700",
    },

    warning: {
      wrapper:
        "border-amber-200 bg-amber-50/70",

      title:
        "text-amber-950",

      description:
        "text-amber-700",

      icon:
        "bg-amber-100 text-amber-700",
    },
  }[type];

  return (
    <div
      className={`
        mt-4
        overflow-hidden
        rounded-2xl
        border
        ${styles.wrapper}
      `}
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          p-5
          sm:p-6
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          <div
            className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              ${styles.icon}
            `}
          >
            {
              icon
            }
          </div>

          <div>

            <h3
              className={`
                text-lg
                font-extrabold
                ${styles.title}
              `}
            >
              {
                title
              }
            </h3>

            <p
              className={`
                mt-1
                text-sm
                leading-6
                ${styles.description}
              `}
            >
              {
                description
              }
            </p>

          </div>

        </div>

        {typeof runtime ===
          "number" && (
          <span
            className="
              shrink-0
              rounded-full
              bg-white/70
              px-3
              py-1.5
              text-xs
              font-bold
              text-gray-600
            "
          >
            {
              runtime.toFixed(
                0
              )
            }{" "}
            ms
          </span>
        )}

      </div>

    </div>
  );
}