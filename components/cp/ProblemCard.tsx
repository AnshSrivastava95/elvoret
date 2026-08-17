import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface ProblemCardData {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  source: "LeetCode" | "Codeforces";
  solved?: boolean;
}

export default function ProblemCard({
  problem,
}: {
  problem: ProblemCardData;
}) {
  const difficultyClass =
    problem.difficulty === "Easy"
      ? "text-green-600 bg-green-50"
      : problem.difficulty === "Medium"
      ? "text-yellow-700 bg-yellow-50"
      : "text-red-600 bg-red-50";

  return (
    <Link
      href={`/cp/${problem.slug}`}
      className="
        group
        flex
        items-center
        justify-between
        gap-5
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        transition
        hover:-translate-y-0.5
        hover:border-purple-200
        hover:shadow-lg
      "
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <h3 className="truncate font-bold text-gray-950 transition group-hover:text-purple-700">
            {problem.title}
          </h3>

          {problem.solved && (
            <CheckCircle2
              size={17}
              className="shrink-0 text-green-600"
            />
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>{problem.topic}</span>

          <span className="text-gray-300">•</span>

          <span>{problem.source}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span
          className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${difficultyClass}`}
        >
          {problem.difficulty}
        </span>

        <ArrowRight
          size={17}
          className="
            text-gray-400
            transition
            group-hover:translate-x-1
            group-hover:text-purple-700
          "
        />
      </div>
    </Link>
  );
}