import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CategoryGrid } from "@/components/CategoryGrid";

export const metadata: Metadata = { title: "Projetos", alternates: { canonical: "/projetos" } };
export default function ProjectsPage() {
  return <main className="category-home"><Header /><div className="portfolio-heading"><p className="home-kicker">Portfólio de Design</p><h1><span>O QUE VOCÊ</span>{" "}<span>QUER CONHECER</span>{" "}<span>PRIMEIRO?</span></h1></div><CategoryGrid /></main>;
}
