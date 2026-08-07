export default function SearchBar() {
    return (
        <div className="mt-12">
            <div className="relative max-w-3xl">
                <input
                    type="text"
                    placeholder="Search articles, AI, System Design..."
                    className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 pr-14 text-lg outline-none transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />

                <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-purple-700 px-5 py-2 font-medium text-white hover:bg-purple-800 transition-colors">
                    Search
                </button>
            </div>
        </div>
    );
}