"use client";

import { useState } from "react";
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  Code2,
  Terminal,
} from "lucide-react";

interface Example {
  input: string;
  output: string;
}

interface CodingWorkspaceProps {
  language: string;
  starterCode: string;
  examples: Example[];
}

export default function CodingWorkspace({
  language,
  starterCode,
  examples,
}: CodingWorkspaceProps) {
  const [code, setCode] = useState(starterCode);
  const [submitted, setSubmitted] = useState(false);
  const [running, setRunning] = useState(false);

  const resetCode = () => {
    setCode(starterCode);
    setSubmitted(false);
  };

  const handleRun = () => {
    setRunning(true);

    setTimeout(() => {
      setRunning(false);
    }, 600);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <section className="mt-14">

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <div className="flex items-center gap-2">
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
              <Code2 size={17} strokeWidth={2} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.14em] text-purple-700">
              YOUR SOLUTION
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-950">
            Try it yourself
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Don't look at the solution yet. Write your approach,
            test your thinking, and submit when you're ready.
          </p>

        </div>

        {/* Reset */}

        <button
          type="button"
          onClick={resetCode}
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
            transition-all
            hover:border-gray-300
            hover:bg-gray-50
            hover:text-gray-900
          "
        >
          <RotateCcw size={14} />

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

        {/* ===================================================
            EDITOR HEADER
        =================================================== */}

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

          <div className="flex items-center gap-3">

            {/* Window controls */}

            <div className="flex items-center gap-1.5">

              <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />

              <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />

              <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />

            </div>

            <div className="h-4 w-px bg-gray-700" />

            <span className="text-xs font-medium text-gray-400">
              solution.{language.toLowerCase() === "cpp" ? "cpp" : "txt"}
            </span>

          </div>


          {/* Language */}

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
            {language.toUpperCase()}
          </span>

        </div>


        {/* ===================================================
            CODE AREA
        =================================================== */}

        <div className="relative bg-[#0b0f19]">

          {/* Editor label */}

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
            <span className="h-1.5 w-1.5 rounded-full bg-gray-700" />
            Editing
          </div>


          <textarea
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setSubmitted(false);
            }}
            spellCheck={false}
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


        {/* ===================================================
            EDITOR FOOTER
        =================================================== */}

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

          <div className="flex items-center gap-2">

            <Terminal
              size={14}
              className="text-gray-600"
            />

            <p className="text-[11px] text-gray-500">
              Evaluation engine coming soon
            </p>

          </div>


          <div className="flex items-center gap-2">

            {/* Run */}

            <button
              type="button"
              onClick={handleRun}
              disabled={running}
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
                transition-all
                hover:border-gray-600
                hover:bg-gray-800
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              <Play
                size={14}
                className={running ? "animate-pulse" : ""}
              />

              {running ? "Running..." : "Run"}

            </button>


            {/* Submit */}

            <button
              type="button"
              onClick={handleSubmit}
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
                transition-all
                hover:bg-purple-500
                hover:shadow-md
              "
            >

              <Send size={14} />

              Submit

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          SUBMISSION STATE
      ===================================================== */}

      {submitted && (
        <div
          className="
            mt-4
            overflow-hidden
            rounded-2xl
            border
            border-purple-200
            bg-purple-50
          "
        >

          <div className="flex items-start gap-4 p-5">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-purple-100
                text-purple-700
              "
            >
              <CheckCircle2
                size={18}
                strokeWidth={2}
              />
            </div>

            <div>

              <p className="text-sm font-bold text-purple-950">
                Submission received
              </p>

              <p className="mt-1 text-sm leading-6 text-purple-700">
                Your code has been submitted. Once the evaluation
                engine is connected, you'll receive the actual
                verdict and test-case results here.
              </p>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          TEST CASES
      ===================================================== */}

      {examples.length > 0 && (
        <div className="mt-10">

          <div className="mb-4">

            <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
              TEST CASES
            </p>

            <h3 className="mt-1 text-xl font-extrabold tracking-tight text-gray-950">
              Check your thinking
            </h3>

          </div>


          <div className="grid gap-4 md:grid-cols-2">

            {examples.map((example, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  transition-all
                  duration-200
                  hover:border-gray-300
                  hover:shadow-sm
                "
              >

                {/* Test case header */}

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

                  <span className="text-xs font-bold text-gray-700">
                    Example {index + 1}
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


                {/* Input / Output */}

                <div className="grid divide-y divide-gray-100 md:grid-cols-2 md:divide-x md:divide-y-0">

                  {/* Input */}

                  <div className="p-4">

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
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
                      {example.input}
                    </pre>

                  </div>


                  {/* Output */}

                  <div className="p-4">

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
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
                      {example.output}
                    </pre>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      )}

    </section>
  );
}