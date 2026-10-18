import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Sobre Pablo", alternates: { canonical: "/sobre" }, openGraph: { title: "Sobre Pablo Rudolf", images: [{ url: "/portfolio/profile/pablo-rudolf-atual.png", width: 1024, height: 1024 }] } };

export default function AboutPage() {
  const visuals = [projects[1], projects[2], projects[4]];
  return <main className="about-page"><Header /><section className="about-hero about-hero--portrait"><div className="about-hero__intro"><span className="eyebrow">Sobre / O designer</span><h1>Pablo<br/><em>Rudolf.</em></h1><p>Pablo Rudolf é designer gráfico. Cria identidades e peças visuais que ajudam marcas a se apresentar com clareza, personalidade e impacto.</p><span className="about-hero__location">Design gráfico / Nova Iguaçu, Brasil</span></div><figure className="about-portrait"><Image src="/portfolio/profile/pablo-rudolf-atual.png" alt="Retrato de Pablo Rudolf" width={1024} height={1024} sizes="(max-width:800px) 100vw, 45vw" priority /></figure></section><section className="about-visuals" aria-label="Trabalhos selecionados">{visuals.map((project) => <Link key={project.slug} href={`/projetos/${project.slug}`}>{project.cover.src && <Image src={project.cover.src} alt={project.title} width={project.cover.width} height={project.cover.height} />}<span>{project.title} <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></span></Link>)}</section><section className="about-copy"><div><span className="eyebrow">O que faço</span><h2>Ideias com<br/>forma e intenção.</h2></div><div><p>Da construção de uma identidade visual ao conteúdo digital, cada trabalho parte do que a marca precisa comunicar e ganha uma linguagem própria.</p><ul><li>Identidade visual</li><li>Design para redes sociais</li><li>Direção de arte</li></ul><Link href="/projetos">Explorar projetos <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></Link></div></section><Footer /></main>;
}
