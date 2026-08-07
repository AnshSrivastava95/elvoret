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

export default function CategoryFilters() {
    return (
        <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category, index) => (
                <button
                    key={category}
                    className={
                        index === 0
                            ? "rounded-full bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-purple-800"
                            : "rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-purple-600 hover:bg-purple-50 hover:text-purple-700"
                    }
                >
                    {category}
                </button>
            ))}
        </div>
    );
}