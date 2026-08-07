export default function SearchBar() {
    return (
        <div className="mt-14">
            <div className="relative w-full max-w-6xl">
                <input
                    type="text"
                    placeholder="Search articles, AI, System Design..."
                    className="w-full rounded-3xl border border-gray-200 bg-white px-6 py-5 pr-36 text-lg outline-none transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />

                <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-purple-700 px-7 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-purple-800">
                    Search
                </button>
            </div>
        </div>
    );
}