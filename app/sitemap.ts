import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://elvoret.in";

  const articlePages = getAllArticles().map((article) => ({
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
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articlePages,
  ];
}