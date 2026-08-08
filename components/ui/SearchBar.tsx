"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  function handleSearch() {
    const trimmed = query.trim();

    if (!trimmed) return;

    // Add your search logic here later
    console.log("Searching for:", trimmed);
  }

  return (
    <section className="mt-8 w-full">
      <div className="flex w-full items-center overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-200 focus-within:border-purple-300 focus-within:shadow-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search articles, AI, System Design..."
          className="
            min-w-0
            flex-1
            bg-transparent
            px-6
            py-5
            text-base
            text-gray-900
            outline-none
            placeholder:text-gray-400
            sm:px-7
            sm:py-6
            sm:text-lg
          "
        />

        <button
          type="button"
          onClick={handleSearch}
          className="
            mr-2
            shrink-0
            rounded-2xl
            bg-purple-700
            px-7
            py-4
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-purple-800
            hover:shadow-md
            active:scale-[0.98]
            sm:mr-2
            sm:px-8
            sm:py-4
          "
        >
          Search
        </button>
      </div>
    </section>
  );
}