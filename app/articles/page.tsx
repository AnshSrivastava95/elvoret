import ArticleHero from "@/components/articles/ArticleHero";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/ui/SearchBar";
import CategoryCards from "@/components/articles/CategoryCard";
export default function ArticlesPage(){
    return(
        <>
        <Navbar />
        <section className="max-w-[1440px] mx-auto px-6 py-16">
            <div className="flex gap-10">
                <main className="w-[72%]">
                    <ArticleHero />
                    <SearchBar />
                    <CategoryCards />
                </main>
                <aside className="w-[28%]">

                </aside>
            </div>
        </section>
        </>
    );
}