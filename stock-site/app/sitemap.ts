import type { MetadataRoute } from "next";

const siteUrl = "https://ai-stock-data.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/stocks`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];
}
