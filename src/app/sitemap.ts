import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}/`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.8 })),
  ];
}
