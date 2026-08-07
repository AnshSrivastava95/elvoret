"use client";

import { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
    language: string;
    code: string;
};

export default function CodeBlock({ language, code }: Props) {
    const [copied, setCopied] = useState(false);

    async function copyCode() {
        await navigator.clipboard.writeText(code);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <div className="my-10 overflow-hidden rounded-2xl border border-gray-700 bg-[#282C34] shadow-lg">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-gray-700 bg-[#1E2127] px-5 py-3">

                <span className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {language}
                </span>

                <button
                    onClick={copyCode}
                    className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-200 transition hover:bg-gray-700"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>

            </div>

            {/* Code */}

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    padding: "24px",
                    background: "#282C34",
                    fontSize: "15px",
                    borderRadius: 0,
                }}
                wrapLongLines
            >
                {code}
            </SyntaxHighlighter>

        </div>
    );
}