"use client";

import { useState } from "react";

const difficulties = ["All", "Easy", "Medium", "Hard"];

const topics = [
  "All",
  "Arrays",
  "Strings",
  "Hashing",
  "Two Pointers",
  "Binary Search",
  "Trees",
  "Graphs",
  "Dynamic Programming",
];

const sources = ["All", "LeetCode", "Codeforces"];

export default function ProblemFilters() {
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [source, setSource] = useState("All");

  return (
    <div className="space-y-6">
      <FilterGroup
        title="Difficulty"
        options={difficulties}
        value={difficulty}
        onChange={setDifficulty}
      />

      <FilterGroup
        title="Topic"
        options={topics}
        value={topic}
        onChange={setTopic}
      />

      <FilterGroup
        title="Source"
        options={sources}
        value={source}
        onChange={setSource}
      />
    </div>
  );
}

function FilterGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-900">
        {title}
      </h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`
                rounded-lg
                border
                px-3
                py-2
                text-sm
                font-medium
                transition
                ${
                  active
                    ? "border-purple-700 bg-purple-700 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-purple-200 hover:text-purple-700"
                }
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}