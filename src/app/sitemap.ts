import type { MetadataRoute } from "next";

const SITE_URL = "https://ethanurbanky.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/resume.pdf`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
