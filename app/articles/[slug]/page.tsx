import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ArticleHero from "@/components/article/ArticleHero";
import ArticleContent from "@/components/article/ArticleContent";
import LatestArticles from "@/components/articles/ArticleGrid";

import { articles } from "@/data/article";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;

    const article = articles.find((item) => item.slug === slug);

    if (!article) {
        notFound();
    }

    return (
        <>
            <Navbar />

            <main>

                <ArticleHero article={article} />

                <ArticleContent article={article} />

                <LatestArticles />

            </main>

            <Footer />
        </>
    );
}