import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";
import { BarbaTransitions } from "@/components/BarbaTransitions";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rudolfstudio.github.io"),
  title: { default: "Rudolf Studio — Portfólio", template: "%s | Rudolf Studio" },
  description: "Portfólio de Pablo Rudolf. Identidade visual e design para redes sociais.",
  alternates: { canonical: "https://rudolfstudio.github.io/portfolio/" },
  openGraph: { title: "Rudolf Studio — Portfólio", description: "Projetos visuais de Pablo Rudolf.", type: "website", locale: "pt_BR", images: [{ url: "https://rudolfstudio.github.io/portfolio/social/pablo-rudolf-preview.png", width: 1024, height: 1024, alt: "Pablo Rudolf — designer gráfico" }] },
  twitter: { card: "summary_large_image", images: [{ url: "https://rudolfstudio.github.io/portfolio/social/pablo-rudolf-preview.png", width: 1024, height: 1024, alt: "Pablo Rudolf — designer gráfico" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${display.variable} ${body.variable}`}><body><BarbaTransitions>{children}</BarbaTransitions></body></html>;
}


