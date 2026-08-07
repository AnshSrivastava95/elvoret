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
        <div className="mt-8 flex flex-wrap gap-4">
            {categories.map((category) => (
                <button
                    key={category}
                    className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-purple-600 hover:bg-purple-50 hover:text-purple-700"
                >
                    {category}
                </button>
            ))}
        </div>
    );
}