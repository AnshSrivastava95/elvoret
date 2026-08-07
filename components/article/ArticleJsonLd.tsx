import { Article } from "@/types/article";

type Props = {
  article: Article;
};

export default function ArticleJsonLd({ article }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "Article",

    headline: article.title,

    description: article.description,

    image: `https://elvoret.in${article.image}`,

    author: {
      "@type": "Person",
      name: article.author,
    },

    publisher: {
      "@type": "Organization",
      name: "Elvoret",
      logo: {
        "@type": "ImageObject",
        url: "https://elvoret.in/logo.png",
      },
    },

    datePublished: article.date,

    dateModified: article.date,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://elvoret.in/articles/${article.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}