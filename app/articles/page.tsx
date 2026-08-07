import ArticlesHero from "@/components/articles/ArticleHero";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/ui/SearchBar";
import CategoryCards from "@/components/articles/CategoryCard";
export default function ArticlesPage(){
    return(
        <>
        <Navbar/>
        <main>
            <ArticlesHero/>
            <SearchBar/>
            <CategoryCards/>
        </main>
        </>
    );
}