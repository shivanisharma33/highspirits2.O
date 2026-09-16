import type { MetadataRoute } from "next";
import { articles } from "@/lib/content/journal";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
    ["/", 1, "weekly"],
    ["/menu", 0.9, "weekly"],
    ["/reservation", 0.9, "monthly"],
    ["/experiences", 0.8, "monthly"],
    ["/about", 0.7, "monthly"],
    ["/events", 0.7, "monthly"],
    ["/gallery", 0.6, "monthly"],
    ["/blogs", 0.6, "weekly"],
    ["/contact", 0.6, "yearly"],
    ["/privacy", 0.2, "yearly"],
    ["/terms", 0.2, "yearly"],
  ];

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: absoluteUrl(path), changeFrequency, priority })),
    ...articles.map((a) => ({ url: absoluteUrl(`/blogs/${a.slug}`), lastModified: new Date(a.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
