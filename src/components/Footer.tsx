import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return <footer id="contato" className="footer"><div className="footer__main"><span className="eyebrow">Tem uma ideia em mente?</span><h2>Vamos criar<br/><em>algo marcante.</em></h2><a className="footer__cta" href="https://wa.me/5521988842323" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp <span aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></span></a></div><div className="footer__bottom"><Logo light /><span>© {new Date().getFullYear()} Rudolf Studio</span><div><Link href="/sobre">Sobre</Link><a href="https://www.behance.net/pablorudolfdesigner" target="_blank" rel="noopener noreferrer">Behance <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></a></div></div></footer>;
}
