export default function ArticleHero(){
    return(
        <section className="w-full py-16">
            <div className="w-full">
                <div className="flex flex-col">
                    <div className="inline-flex items-center gap-2 self-start rounded-full bg-purple-100 px-4 py-2">
                        <span className="text-sm font-medium text-purple-800">
                            Explore our Knowledge Base
                        </span>
                    </div>
                    <h1 className="mt-6 text-7xl font-extrabold tracking-tight text-gray-900">
                            Articles
                    </h1>
                    <p className="mt-6 max-w-[720px] text-xl leading-9 text-gray-600">
                        Practical tutorials, AI, System Design, Backend Development,
                        DSA, career advice, and developer resources—all in one place.
                    </p>
                </div>
            </div>
        </section>
    );
}