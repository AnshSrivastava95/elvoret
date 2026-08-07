import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ArticleHero from "@/components/article/ArticleHero";
import ArticleContent from "@/components/article/ArticleContent";
import LatestArticles from "@/components/articles/ArticleGrid";
import ArticleJsonLd from "@/components/article/ArticleJsonLd";

import { articles } from "@/data/article";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {

    const { slug } = await params;

    const article = articles.find(
        (article) => article.slug === slug
    );

    if (!article) {
        return {
            title: "Article Not Found | Elvoret",
        };
    }

    return {

        title: `${article.title} | Elvoret`,

        description: article.description,

        keywords: [
            article.category,
            "Programming",
            "Software Engineering",
            "Backend",
            "AI",
            "System Design",
            "DSA",
            "Elvoret",
        ],

        authors: [
            {
                name: article.author,
            },
        ],

        creator: article.author,

        openGraph: {

            title: article.title,

            description: article.description,

            url: `https://elvoret.in/articles/${article.slug}`,

            siteName: "Elvoret",

            images: [
                {
                    url: article.image,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],

            locale: "en_US",

            type: "article",
        },

        twitter: {

            card: "summary_large_image",

            title: article.title,

            description: article.description,

            images: [article.image],

        },

        robots: {

            index: true,

            follow: true,

        },

    };
}

export default async function ArticlePage({
    params,
}: Props) {

    const { slug } = await params;

    const article = articles.find(
        (article) => article.slug === slug
    );

    if (!article) {
        notFound();
    }

    return (
        <>
            <Navbar />

            <ArticleJsonLd article={article} />

            <main>

                <ArticleHero article={article} />

                <ArticleContent article={article} />

                <LatestArticles />

            </main>

            <Footer />

        </>
    );
}