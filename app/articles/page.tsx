import ArticlesHero from "@/components/articles/ArticleHero";
import Navbar from "@/components/layout/Navbar";
export default function ArticlesPage(){
    return(
        <>
        <Navbar/>
        <main>
            <ArticlesHero/>
        </main>
        </>
    );
}