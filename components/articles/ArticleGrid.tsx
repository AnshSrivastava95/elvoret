import ArticleCard from "./ArticleCard";
import { getAllArticles } from "@/lib/articles";

export default function ArticleGrid() {
  const articles = getAllArticles();

  const latestArticles = articles.filter(
    (article) => !article.featured
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest Articles
          </h2>

          <p className="mt-2 max-w-2xl text-base text-gray-500 sm:text-lg">
            Fresh tutorials, guides, and developer resources to help you
            become a better software engineer.
          </p>

        </div>

      </div>

      {latestArticles.length > 0 ? (

        <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">

          {latestArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
            />
          ))}

        </div>

      ) : (

        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center sm:p-12">

          <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            More articles coming soon 🚀
          </h3>

          <p className="mt-3 text-gray-600">
            We're working on more high-quality tutorials. Stay tuned!
          </p>

        </div>

      )}

    </section>
  );
}