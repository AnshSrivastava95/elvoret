"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  RotateCcw,
  ArrowLeft,
  Code2,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import CodeEditor from "@/components/code/CodeEditor";
import LanguageSelector, {
  LANGUAGES,
} from "@/components/code/LanguageSelector";

import OutputPanel from "@/components/code/OutputPanel";

const DEFAULT_CODE = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, Elvoret!";
    return 0;
}`,

  python: `print("Hello, Elvoret!")`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Elvoret!");
    }
}`,

  javascript: `console.log("Hello, Elvoret!");`,
};

export default function PlaygroundPage() {
  const [language, setLanguage] = useState(LANGUAGES[0]);

  const [code, setCode] = useState(
    DEFAULT_CODE[language.value as keyof typeof DEFAULT_CODE]
  );

  const [input, setInput] = useState("");

  const [output, setOutput] = useState("");

  const [error, setError] = useState("");

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  function handleLanguageChange(
    selectedLanguage: typeof LANGUAGES[number]
  ) {
    setLanguage(selectedLanguage);

    setCode(
      DEFAULT_CODE[
        selectedLanguage.value as keyof typeof DEFAULT_CODE
      ]
    );

    setOutput("");
    setError("");
    setStatus("");
  }

  function resetCode() {
    setCode(
      DEFAULT_CODE[
        language.value as keyof typeof DEFAULT_CODE
      ]
    );

    setOutput("");
    setError("");
    setStatus("");
  }

  async function runCode() {
    setLoading(true);

    setOutput("");
    setError("");
    setStatus("");

    try {
      const response = await fetch("/api/code/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: language.id,
          stdin: input,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to execute code."
        );
      }

      setOutput(data.output || "");

      setError(data.error || "");

      setStatus(data.status || "");

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

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">

        {/* ================================================= */}
        {/* Header */}
        {/* ================================================= */}

        <section className="border-b border-gray-200 bg-white">

          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-purple-700
                transition
                hover:text-purple-900
              "
            >
              <ArrowLeft size={16} />

              Back to Elvoret
            </Link>

            <div className="mt-8 flex items-start gap-4">

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-100
                  text-purple-700
                "
              >
                <Code2 size={23} />
              </div>

              <div>

                <p className="text-sm font-semibold uppercase tracking-wider text-purple-700">
                  ELVORET PLAYGROUND
                </p>

                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Write. Run. Experiment.
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
                  Experiment with code directly in your browser.
                  No setup, no downloads, just start building.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* Playground */}
        {/* ================================================= */}

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111111] shadow-xl">

            {/* Toolbar */}

            <div className="flex flex-col gap-3 border-b border-gray-800 bg-[#181818] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

              <LanguageSelector
                value={language.value}
                onChange={handleLanguageChange}
              />

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={resetCode}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-gray-700
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-gray-300
                    transition
                    hover:border-gray-600
                    hover:bg-gray-800
                  "
                >
                  <RotateCcw size={15} />

                  Reset
                </button>

                <button
                  type="button"
                  onClick={runCode}
                  disabled={loading}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-purple-700
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-purple-600
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <Play size={15} />

                  {loading ? "Running..." : "Run Code"}
                </button>

              </div>

            </div>

            {/* Editor */}

            <CodeEditor
              value={code}
              language={language.value}
              onChange={setCode}
              height="520px"
            />

            {/* Input */}

            <div className="border-t border-gray-800 bg-[#181818] p-4">

              <label
                htmlFor="stdin"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
              >
                Standard Input
              </label>

              <textarea
                id="stdin"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder="Enter input for your program..."
                className="
                  min-h-[100px]
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-gray-700
                  bg-[#111111]
                  p-3
                  font-mono
                  text-sm
                  text-gray-300
                  outline-none
                  placeholder:text-gray-700
                  focus:border-purple-600
                "
              />

            </div>

            {/* Output */}

            <OutputPanel
              output={output}
              error={error}
              status={status}
              loading={loading}
            />

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}