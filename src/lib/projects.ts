import rawProjects from "@/data/projects.json";
import { projectDetails } from "./project-details";

export type ProjectImage = { src: string; width: number; height: number };
export type Project = {
  slug: string;
  hidden?: boolean;
  title: string;
  category: string;
  source: string;
  sourceUrl: string;
  cover: ProjectImage;
  images: ProjectImage[];
  coverImages?: ProjectImage[];
  sourceUrls?: string[];
  name: string;
  summary: string;
  deliverables: string[];
};

const featured = [
  "behance-184551257",
  "behance-86600217",
  "behance-206087051",
  "behance-251835227",
  "behance-206088167",
  "behance-223999127",
  "behance-124782585",
];


export const projects = (rawProjects as Project[]).filter(project => project.category !== "Arte digital" && !project.hidden).map((project) => ({
  ...project,
  name: project.title,
  summary: project.summary ?? projectDetails[project.slug]?.summary ?? `${project.title}. Este case reúne as peças e aplicações desenvolvidas para o projeto, na categoria ${project.category.toLowerCase()}.`,
  deliverables: project.deliverables ?? projectDetails[project.slug]?.deliverables ?? [project.category],
  cover: project.cover,
})).sort((a, b) => {
  if (a.source !== b.source) return a.source === "Behance" ? -1 : 1;
  const ai = featured.indexOf(a.slug);
  const bi = featured.indexOf(b.slug);
  if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  return 0;
});

export const categories = ["Todos", "Identidade visual", "Design para redes"];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
