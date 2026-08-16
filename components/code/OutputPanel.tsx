"use client";

interface OutputPanelProps {
  output: string;
  error?: string;
  status?: string;
  loading?: boolean;
}

export default function OutputPanel({
  output,
  error,
  status,
  loading,
}: OutputPanelProps) {
  return (
    <div className="border-t border-gray-800 bg-[#111111]">

      <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">

        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Output
        </span>

        {loading && (
          <span className="text-xs font-medium text-purple-400">
            Running...
          </span>
        )}

        {!loading && status && (
          <span
            className={`text-xs font-semibold ${
              status === "Accepted"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {status}
          </span>
        )}

      </div>

      <div className="min-h-[150px] p-4">

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />
            Executing your code...
          </div>
        ) : error ? (
          <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-red-400">
            {error}
          </pre>
        ) : output ? (
          <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-gray-300">
            {output}
          </pre>
        ) : (
          <p className="text-sm text-gray-600">
            Run your code to see the output here.
          </p>
        )}

      </div>
    </div>
  );
}