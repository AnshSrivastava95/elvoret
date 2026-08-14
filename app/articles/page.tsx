import ArticleHero from "@/components/articles/ArticleHero";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/ui/SearchBar";
import CategoryCards from "@/components/articles/CategoryCard";
import AdBanner from "@/components/articles/AdBanner";
import FeaturedArticle from "@/components/articles/FeautredArticle";
import ArticleGrid from "@/components/articles/ArticleGrid";
import Footer from "@/components/layout/Footer";

export default function ArticlesPage() {
  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

        <div className="flex flex-col gap-10 xl:flex-row">

          {/* Main Content */}

          <main className="min-w-0 flex-1">

            <ArticleHero />

            <SearchBar />

            <CategoryCards />

            <FeaturedArticle />

            <AdBanner />

            <ArticleGrid />

          </main>

          {/* Sidebar (Desktop Only) */}

          <aside className="hidden xl:block xl:w-80 shrink-0">

            {/* Add sidebar widgets here later */}

          </aside>

        </div>

      </section>
      <Footer/>
    </>
  );
}