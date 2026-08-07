import { Article } from "@/lib/articles";

type Props = {
  article: Article;
};

export default function ArticleJsonLd({ article }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: article.title,

    description: article.description,

    image: [`https://elvoret.in${article.image}`],

    author: {
      "@type": "Person",
      name: article.author,
      url: "https://elvoret.in/about",
    },

    publisher: {
      "@type": "Organization",
      name: "Elvoret",
      logo: {
        "@type": "ImageObject",
        url: "https://elvoret.in/logo.png",
      },
    },

    datePublished: `${article.date}T09:00:00+05:30`,
    dateModified: `${article.date}T09:00:00+05:30`,

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