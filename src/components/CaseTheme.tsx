"use client";

import { useEffect } from "react";
import palettes from "@/data/project-palettes.json";

export function CaseTheme({ slug }: { slug: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const color = (palettes as Record<string, string>)[slug] ?? "#f5f5f5";
    root.style.setProperty("--case-light", color);
    return () => { root.style.removeProperty("--case-light"); };
  }, [slug]);
  return null;
}
