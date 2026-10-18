import { Intro } from "@/components/Intro";
import { Header } from "@/components/Header";
import { CategoryGrid } from "@/components/CategoryGrid";

export default function Home() {
  return <main className="category-home"><Intro /><Header /><div className="portfolio-heading"><p className="home-kicker">Portfólio de Design</p><h1><span>O QUE VOCÊ</span>{" "}<span>QUER CONHECER</span>{" "}<span>PRIMEIRO?</span></h1></div><CategoryGrid /></main>;
}
