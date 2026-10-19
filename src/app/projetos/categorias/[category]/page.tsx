import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { portfolioCategories, getPortfolioCategory, getCategoryProjects } from "@/lib/portfolio-categories";
import styles from "@/components/PortfolioNavigation.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return portfolioCategories.map(category => ({ category: category.slug })); }
export async function generateMetadata({ params }: { params: Promise<{category:string}> }): Promise<Metadata> {
  const category = getPortfolioCategory((await params).category);
  return { title: category?.label ?? "Projetos", alternates: category ? { canonical: `/projetos/categorias/${category.slug}` } : undefined };
}
export default async function CategoryPage({ params }: { params: Promise<{category:string}> }) {
  const category = getPortfolioCategory((await params).category);
  if (!category) notFound();
  const collection = getCategoryProjects(category.slug);
  const descriptions: Record<string, string> = {
    "design-de-posts": "Identidade e intenção em cada publicação. Design para marcas que têm algo a dizer.",
    "identidade-visual": "Marcas que ganham forma, personalidade e uma linguagem própria.",
    "sites-e-landing-pages": "Experiências digitais que conectam clareza, design e navegação.",
    "impressos": "Ideias que saem da tela e ganham presença no papel.",
    "thumbs-e-banners": "Composições que despertam o olhar e apresentam uma ideia.",
    "outros": "Outros formatos, novas possibilidades e diferentes formas de criar.",
  };
  return <main className="category-page"><Header />
    <section className="category-intro" aria-labelledby="category-title">
      <Link href="/projetos" className="category-return"><span aria-hidden="true"><ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" /></span> Todas as categorias</Link>
      <div className="category-intro__meta"><span>Portfólio / {String(portfolioCategories.indexOf(category)+1).padStart(2,"0")}</span><span>{String(collection.length).padStart(2,"0")} {collection.length===1?"projeto":"projetos"}</span></div>
      <h1 id="category-title">{category.label}</h1>
      <p>{descriptions[category.slug]}</p>
    </section>
    <div className={styles.caseList}>{collection.length === 0 && <p className="category-empty">Novos projetos em breve.</p>}{collection.map((project,index) => <Link key={project.slug} className={styles.caseCard} href={`/projetos/${project.slug}?categoria=${category.slug}`}>
      <div className={styles.caseCover} style={{aspectRatio: `${project.cover.width} / ${project.cover.height}`}}>{project.coverImages?.length ? <div className={styles.coverComposition}>{project.coverImages.map((art,artIndex)=><div key={art.src}><Image src={art.src} alt={artIndex===0 ? `Artes de ${project.name}` : ""} fill sizes="(max-width:700px) 33vw, 334px" priority={index===0} /></div>)}</div> : project.cover.src && <Image src={project.cover.src} alt={`Case ${project.name}`} fill sizes="(max-width:700px) 100vw, 1000px" priority={index===0} />}</div>
      <div className={styles.caseInfo}><div className={styles.caseTitle}><span className={styles.caseNumber}>{String(index+1).padStart(2,"0")}</span><h2>{project.name}</h2></div><span className={styles.caseAction}>Conhecer projeto <span aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></span></span></div>
    </Link>)}</div>
    <nav className="category-explore" aria-label="Explorar outras categorias"><span>Continue explorando</span><div>{portfolioCategories.filter(item=>item.slug!==category.slug && ["design-de-posts", "identidade-visual", "sites-e-landing-pages"].includes(item.slug)).map(item=><Link key={item.slug} href={`/projetos/categorias/${item.slug}`}>{item.label}<span aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></span></Link>)}</div></nav>
  </main>;
}
