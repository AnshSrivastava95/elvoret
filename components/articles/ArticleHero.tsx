export default function ArticleHero(){
    return(
        <section className="max-w-[1440px] mx-auto px-6 py-16">
            <div>
                <div className="flex flex-xol">
                    <div className="inline-flex items-center gap-2 self-start rounded-full bg-purple-100 px-4 py-2">
                        <span className="text-sm font-medium text-purple-800">
                            Explore our Knowledge Base
                        </span>
                    </div>
                    <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-gray-900">
                            Articles
                    </h1>
                    <p className="mt-6 max-w-3xl text-xl leading-9 text-gray-600">
                        Practical tutorials, AI, System Design, Backend Development,
                        DSA, career advice, and developer resources—all in one place.
                    </p>
                </div>
            </div>
        </section>
    );
}