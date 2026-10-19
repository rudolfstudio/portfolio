import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import categoryCovers from "@/data/category-covers.json";
import { portfolioCategories, getCategoryProjects } from "@/lib/portfolio-categories";
import styles from "./PortfolioNavigation.module.css";

export function CategoryGrid() {
  return <div className={styles.categories}>{portfolioCategories.filter(category => ["design-de-posts", "identidade-visual", "sites-e-landing-pages"].includes(category.slug)).map((category,index) => {
    const collection = getCategoryProjects(category.slug);
    const cover = categoryCovers[category.slug as keyof typeof categoryCovers];
    return <Link className={styles.category} href={`/projetos/categorias/${category.slug}`} key={category.slug}>
      {cover && <Image src={cover} alt="" fill sizes="(max-width:700px) 100vw, 334px" priority={index<2} />}
      <span className={styles.categoryShade} /><span className={styles.categoryIndex} aria-hidden="true">{String(index+1).padStart(2,"0")}</span><span className={styles.categoryLabel}>{category.label}</span><span className={styles.count}>{collection.length} {collection.length === 1 ? "projeto" : "projetos"}</span><span className={styles.categoryArrow} aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></span>
    </Link>;
  })}</div>;
}
