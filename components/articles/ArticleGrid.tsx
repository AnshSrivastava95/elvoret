import ArticleCard from "./ArticleCard";
import { getAllArticles } from "@/lib/articles";

export default async function ArticleGrid() {
  const articles = getAllArticles();

  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">

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

      <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
          />
        ))}

      </div>

    </section>
  );
}