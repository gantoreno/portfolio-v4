import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: "https://gantoreno.com" },
    { url: "https://gantoreno.com/blog" },
    ...(await getPosts()).map((post) => ({
      url: `https://gantoreno.com/blog/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
