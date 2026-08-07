import ArticleCard from "./ArticleCard";
import { getAllArticles } from "@/lib/articles";

export default function ArticleGrid() {
  const articles = getAllArticles();

  // Remove the featured article from the grid
  const latestArticles = articles.filter((article) => !article.featured);

  return (
    <section className="mx-auto mt-24 max-w-7xl px-6 pb-24">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Latest Articles
          </h2>

          <p className="mt-3 text-lg text-gray-500">
            Fresh tutorials, guides, and developer resources to help you
            become a better software engineer.
          </p>

        </div>

      </div>

      {latestArticles.length > 0 ? (

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {latestArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
            />
          ))}

        </div>

      ) : (

        <div className="mt-12 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">

          <h3 className="text-2xl font-semibold text-gray-900">
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