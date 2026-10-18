"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ProjectBreadcrumb({ title, categories }: { title: string; categories: {slug:string;label:string}[] }) {
  const requested = useSearchParams().get("categoria");
  const category = categories.find(item=>item.slug===requested) ?? categories[0];
  return <nav className="project-breadcrumb" aria-label="Caminho do projeto"><Link href={category ? `/projetos/categorias/${category.slug}` : "/projetos"}>{category?.label ?? "Projetos"}</Link><span aria-hidden="true">/</span><h1>{title}</h1></nav>;
}
