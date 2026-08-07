import LatestArticles from "@/components/articles/ArticleGrid";

export default function RelatedArticles() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Related Articles
      </h2>

      <LatestArticles />
    </section>
  );
}