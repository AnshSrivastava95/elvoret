import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ArticleHero from "@/components/article/ArticleHero";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleJsonLd from "@/components/article/ArticleJsonLd";
import ReadingProgress from "@/components/article/ReadingProgress";
import LatestArticles from "@/components/articles/ArticleGrid";

import { getArticleBySlug } from "@/lib/articles";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);
    const articleUrl = `https://elvoret.in/articles/${article.slug}`;

    return {
      title: `${article.title} | Elvoret`,

      description: article.description,

      alternates: {
        canonical: articleUrl,
      },

      keywords: [
        article.category,
        "Redis",
        "Backend",
        "Programming",
        "Software Engineering",
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

        url: articleUrl,

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
  } catch {
    return {
      title: "Article Not Found | Elvoret",
    };
  }
}

export default async function ArticlePage({
  params,
}: Props) {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);

    return (
      <>
        <Navbar />

        <ReadingProgress />

        <ArticleJsonLd article={article} />

        <main>
          <ArticleHero article={article} />

          <ArticleContent article={article} />

          <LatestArticles columns={3} />
        </main>

        <Footer />
      </>
    );
  } catch {
    notFound();
  }
}