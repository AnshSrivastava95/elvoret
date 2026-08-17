export type ProblemDifficulty = "Easy" | "Medium" | "Hard";

export type ProblemSource = "LeetCode" | "Codeforces";

export interface Problem {
  slug: string;
  title: string;

  source: ProblemSource;
  sourceId: string;
  sourceUrl?: string;

  difficulty: ProblemDifficulty;

  topics: string[];
  pattern?: string;

  date: string;
  featured?: boolean;

  description: string;

  hints: string[];

  contentHtml?: string;
  solutionCode?: string;

  complexity?: {
    time: string;
    space: string;
  };
}