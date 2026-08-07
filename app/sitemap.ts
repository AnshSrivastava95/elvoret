import { MetadataRoute } from "next";
import { articles } from "@/data/article";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://elvoret.in";

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    ...articlePages,
  ];
}