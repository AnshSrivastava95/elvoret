export default function ArticleHero() {
  return (
    <section className="w-full py-6 sm:py-8 lg:py-10">

      <div className="max-w-4xl">

        <div className="flex flex-col">

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-purple-100 px-4 py-2">

            <span className="text-xs font-semibold uppercase tracking-wide text-purple-700 sm:text-sm">
              Explore our Knowledge Base
            </span>

          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
            Articles
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
            Practical tutorials, AI, System Design, Backend Development, DSA,
            career advice, and developer resources—all in one place.
          </p>

        </div>

      </div>

    </section>
  );
}