import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, BriefcaseBusiness, MapPin, Palette, PanelsTopLeft, PenTool, ScanLine, Smartphone, MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Sobre Pablo", description: "Perfil profissional de Pablo Rudolf: design gráfico, identidade visual, redes sociais e landing pages.", alternates: { canonical: "/sobre" }, openGraph: { title: "Sobre Pablo Rudolf", images: [{ url: "/portfolio/profile/pablo-rudolf-atual.png", width: 1024, height: 1024 }] } };
const areas = [
  { icon: PenTool, title: "Identidade visual", text: "Criação de marcas, linguagem gráfica, paletas e aplicações em materiais digitais, papelaria e embalagens." },
  { icon: Smartphone, title: "Design para redes sociais", text: "Posts e carrosséis que combinam fotografia, tipografia e composição para construir uma presença visual consistente." },
  { icon: PanelsTopLeft, title: "Sites e landing pages", text: "Design de páginas para desktop e celular, com hierarquia de informação, apresentação de produtos e chamadas para ação." },
];
export default function AboutPage() {
  return <main className={styles.page}><Header /><div className={styles.container}>
    <section className={styles.hero} aria-labelledby="profile-title"><div className={styles.intro}>
      <span className={styles.kicker}>Sobre / Perfil profissional</span>
      <h1 id="profile-title">Pablo<br />Rudolf.</h1>
      <p className={styles.role}>Designer gráfico <span aria-hidden="true">/</span> Rudolf Studio</p>
      <p className={styles.summary}>Identidades, conteúdo e experiências digitais com clareza, personalidade e intenção.</p>
      <div className={styles.location}><MapPin size={16} strokeWidth={1.5} aria-hidden="true" /><span>Nova Iguaçu, Rio de Janeiro · Brasil</span></div>
      <a className={styles.contact} href="https://wa.me/5521988842323" target="_blank" rel="noopener noreferrer">Vamos conversar <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></a>
    </div><figure className={styles.portrait}><Image src="/portfolio/profile/pablo-rudolf-atual.png" alt="Retrato de Pablo Rudolf" width={1024} height={1024} sizes="(max-width:760px) 100vw, 42vw" priority /></figure></section>
    <section className={styles.section} aria-labelledby="profile-heading"><h2 id="profile-heading"><BriefcaseBusiness size={21} strokeWidth={1.4} aria-hidden="true" />Perfil</h2><div className={styles.content}><p className={styles.lead}>Sou Pablo Rudolf, designer gráfico. Desenvolvo a linguagem visual de marcas e transformo ideias em peças de comunicação para diferentes pontos de contato.</p><p>Minha atuação reúne identidade visual, design para redes sociais e páginas digitais. Trabalho com composição, fotografia e tipografia para organizar a mensagem e dar personalidade a cada projeto.</p></div></section>
    <section className={styles.section} aria-labelledby="areas-heading"><h2 id="areas-heading"><Palette size={21} strokeWidth={1.4} aria-hidden="true" />Áreas de atuação</h2><div className={styles.areas}>{areas.map(({icon: Icon,title,text}) => <article className={styles.area} key={title}><Icon size={24} strokeWidth={1.3} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
    <section className={styles.section} aria-labelledby="skills-heading"><h2 id="skills-heading"><ScanLine size={21} strokeWidth={1.4} aria-hidden="true" />Competências</h2><div className={styles.content}><ul className={styles.skills}>{["Composição visual","Tipografia e hierarquia","Linguagem de marca","Aplicações de identidade","Design de carrosséis","Layouts para desktop e mobile"].map(skill=><li key={skill}>{skill}</li>)}</ul><p className={styles.note}>Projetos em segmentos como beleza e cuidados pessoais, saúde, arquitetura, tecnologia, alimentação e serviços.</p></div></section>
    <section className={styles.section} aria-labelledby="contact-heading"><h2 id="contact-heading"><MessageCircle size={21} strokeWidth={1.4} aria-hidden="true" />Contato e redes</h2><div className={styles.links}>
      <a href="https://wa.me/5521988842323" target="_blank" rel="noopener noreferrer"><span>WhatsApp<small>+55 21 98884-2323</small></span><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></a>
      <a href="https://www.behance.net/pablorudolfdesigner" target="_blank" rel="noopener noreferrer"><span>Behance<small>pablorudolfdesigner</small></span><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></a>
      <a href="https://www.instagram.com/pablorudolf.designer/" target="_blank" rel="noopener noreferrer"><span>Instagram<small>@pablorudolf.designer</small></span><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></a>
    </div></section>
  </div><Footer /></main>;
}
