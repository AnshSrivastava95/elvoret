const categories = [
  "All",
  "AI",
  "DSA",
  "Backend",
  "System Design",
  "Frontend",
  "Career",
  "News",
];

export default function CategoryCards() {
  return (
    <section className="mt-6 w-full sm:mt-8">

      <div className="flex w-full gap-3 overflow-x-auto pb-2 scrollbar-hide">

        {categories.map((category, index) => (
          <button
            key={category}
            type="button"
            className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 sm:px-6 sm:py-3 ${
              index === 0
                ? "border-purple-700 bg-purple-700 text-white shadow-md hover:bg-purple-800"
                : "border-gray-200 bg-white text-gray-700 hover:border-purple-600 hover:text-purple-700"
            }`}
          >
            {category}
          </button>
        ))}

      </div>

    </section>
  );
}