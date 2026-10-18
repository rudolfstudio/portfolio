import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { portfolioCategories } from "@/lib/portfolio-categories";

const base = "https://rudolfstudio.github.io/portfolio";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projetos`, changeFrequency: "monthly", priority: .9 },
    { url: `${base}/sobre`, changeFrequency: "yearly", priority: .6 },
    ...portfolioCategories.map(category => ({ url: `${base}/projetos/categorias/${category.slug}`, changeFrequency: "monthly" as const, priority: .9 })),
    ...projects.map((project) => ({ url: `${base}/projetos/${project.slug}`, changeFrequency: "yearly" as const, priority: .8, images: project.cover.src ? [`${base}${project.cover.src}`] : [] })),
  ];
}
