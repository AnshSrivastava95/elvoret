import ArticleHero from "@/components/articles/ArticleHero";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/ui/SearchBar";
import CategoryCards from "@/components/articles/CategoryCard";
import AdBanner from "@/components/articles/AdBanner";
import FeaturedArticle from "@/components/articles/FeautredArticle";
export default function ArticlesPage(){
    return(
        <>
        <Navbar />
        <section className="max-w-[1440px] mx-auto px-6 py-8">
            <div className="flex gap-10">
                <main className="flex-1 min-w-0">
                    <ArticleHero />
                    <SearchBar />
                    <CategoryCards />
                    <FeaturedArticle/>
                    <AdBanner/>
                </main>
                <aside className="w-[320px] shrink-0">

                </aside>
            </div>
        </section>
        </>
    );
}