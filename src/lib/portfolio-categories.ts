import { projects, type Project } from "./projects";

export const portfolioCategories = [
  { slug: "design-de-posts", label: "Design de posts", sourceCategory: "Design para redes", members: ["instagram-DTtWLxyFaZr","instagram-DR22PthAdDj","instagram-DccUtudFT7n","instagram-DSDaoeDgY2G","instagram-Ddm2QLWlYAm","instagram-DcwR9vzFWKI","instagram-DR-ct-6AaSw","instagram-DRiTzWLgR76","instagram-DUgyffOFbo9","instagram-DTTfn93lYXL"] },
  { slug: "identidade-visual", label: "Identidade visual", sourceCategory: "Identidade visual", members: [] as string[] },
  { slug: "sites-e-landing-pages", label: "Sites e landing pages", sourceCategory: "Web design", members: [] as string[] },
  { slug: "impressos", label: "Impressos", sourceCategory: "", members: [] as string[] },
  { slug: "thumbs-e-banners", label: "Thumbs e banners", sourceCategory: "", members: [] as string[] },
  { slug: "outros", label: "Outros", sourceCategory: "", members: ["instagram-CjGl0jsOski", "instagram-CTDeJ-2AnRz", "instagram-Ci_VPs_grJE"] },
];

export function getPortfolioCategory(slug: string) { return portfolioCategories.find(category => category.slug === slug); }
export function getCategoryProjects(slug: string) {
  const category = getPortfolioCategory(slug);
  if (!category) return [];
  if (slug === "design-de-posts") return category.members.map(member => projects.find(project => project.slug === member)).filter((project): project is Project => Boolean(project));
  return projects.filter(project => getProjectCategories(project).some(item => item.slug === slug));
}
export function getProjectCategories(project: Project) {
  const assigned = portfolioCategories.filter(category => category.members.includes(project.slug));
  const original = portfolioCategories.find(category => category.sourceCategory === project.category);
  if (original && !assigned.includes(original) && original.slug !== "design-de-posts") assigned.push(original);
  return assigned.map(category => ({ slug: category.slug, label: category.label }));
}
