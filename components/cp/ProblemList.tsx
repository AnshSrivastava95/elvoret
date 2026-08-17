import ProblemCard, {
  ProblemCardData,
} from "./ProblemCard";

const problems: ProblemCardData[] = [
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    source: "LeetCode",
  },
  {
    slug: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "Strings",
    source: "LeetCode",
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Binary Search",
    source: "LeetCode",
  },
];

export default function ProblemList() {
  return (
    <div className="space-y-3">
      {problems.map((problem) => (
        <ProblemCard
          key={problem.slug}
          problem={problem}
        />
      ))}
    </div>
  );
}