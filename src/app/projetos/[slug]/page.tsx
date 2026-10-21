import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { CaseCarousel } from "@/components/CaseCarousel";
import { ProjectBreadcrumb } from "@/components/ProjectBreadcrumb";
import { getProject, projects } from "@/lib/projects";
import { getProjectCategories } from "@/lib/portfolio-categories";
import type { CreativeWork, WithContext } from "schema-dts";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({slug:project.slug})); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const project=getProject((await params).slug);
  return {title:project?.title??"Projeto",description:project?.summary,alternates:project?{canonical:`/projetos/${project.slug}`}:undefined,openGraph:project?{title:project.title,images:project.cover.src?[{url:project.cover.src,width:project.cover.width,height:project.cover.height}]:[]}:undefined};
}
export default async function ProjectPage({ params }: { params: Promise<{slug:string}> }) {
  const project=getProject((await params).slug);
  if(!project) notFound();
  const structuredData: WithContext<CreativeWork>={"@context":"https://schema.org","@type":"CreativeWork",name:project.title,description:project.summary,creator:{"@type":"Person",name:"Pablo Rudolf"},genre:project.category,url:`https://rudolfstudio.github.io/portfolio/projetos/${project.slug}`,image:project.images.filter(image=>image.src).map(image=>`https://rudolfstudio.github.io/portfolio${image.src}`)};
  return <main className="case-page case-page--carousel"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/><Header /><div className="portfolio-heading portfolio-heading--case"><Suspense fallback={<h1>{project.name}</h1>}><ProjectBreadcrumb title={project.name} categories={getProjectCategories(project)}/></Suspense></div><CaseCarousel images={project.images} title={project.name}/><section className="project-context"><h2>Sobre o projeto</h2><p>{project.summary}</p><div className="case-deliverables"><span>O que foi desenvolvido</span><ul>{project.deliverables.map(item=><li key={item}>{item}</li>)}</ul></div>{project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">Ver publicação original <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></a>}</section><div className="project-bottom"><Link href="/projetos">Todos os projetos <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></Link></div></main>;
}

