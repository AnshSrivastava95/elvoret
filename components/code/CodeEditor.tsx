"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
  height?: string;
}

export default function CodeEditor({
  value,
  language,
  onChange,
  height = "500px",
}: CodeEditorProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#1e1e1e]">
      <Editor
        height={height}
        language={language}
        value={value}
        theme="vs-dark"
        onChange={(value) => onChange(value ?? "")}
        options={{
          fontSize: 14,
          fontFamily:
            "'JetBrains Mono', 'Fira Code', Consolas, monospace",

          minimap: {
            enabled: false,
          },

          padding: {
            top: 16,
            bottom: 16,
          },

          automaticLayout: true,

          scrollBeyondLastLine: false,

          smoothScrolling: true,

          cursorBlinking: "smooth",

          tabSize: 2,

          wordWrap: "on",

          renderWhitespace: "selection",

          lineNumbers: "on",

          folding: true,

          bracketPairColorization: {
            enabled: true,
          },

          suggestOnTriggerCharacters: true,

          quickSuggestions: true,

          formatOnPaste: true,

          formatOnType: false,
        }}
      />
    </div>
  );
}