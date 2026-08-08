export default function ArticleHero() {
  return (
    <section className="w-full py-3 sm:py-5 lg:py-6">
      <div className="max-w-4xl">

        {/* Badge */}

        <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1.5 sm:px-4 sm:py-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-purple-700 sm:text-sm">
            Explore our Knowledge Base
          </span>
        </div>

        {/* Heading */}

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:mt-4 sm:text-5xl lg:text-6xl">
          Articles
        </h1>

        {/* Description */}

        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 sm:mt-4 sm:text-lg sm:leading-8">
          Practical tutorials, AI, System Design, Backend Development, DSA,
          career advice, and developer resources—all in one place.
        </p>

      </div>
    </section>
  );
}