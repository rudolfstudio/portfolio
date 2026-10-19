"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export function Header({ light = false, immersive = false }: { light?: boolean; immersive?: boolean }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();
  const home = pathname === "/" || pathname === "/projetos" || pathname === "/projetos/";
  const dark = !home;

  useEffect(() => {
    let anchor = Math.max(0, window.scrollY);
    setHidden(false);
    setAtTop(anchor <= 24);
    const onScroll = () => {
      if (home) { setHidden(false); return; }
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      setAtTop(y <= 24);
      if (y <= 64) { setHidden(false); anchor = y; return; }
      if (Math.abs(y - anchor) < 10) return;
      setHidden(y > anchor);
      anchor = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, home]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <header className={`site-header scroll-header ${dark ? "scroll-header--dark" : "scroll-header--white"} ${hidden && !open ? "scroll-header--hidden" : ""}`} inert={hidden && !open} onFocusCapture={() => setHidden(false)}>
        <Link href="/" className="site-header__brand" aria-label="Rudolf Studio — início"><Logo light={dark} priority /></Link>
        <div className="site-header__actions">{immersive && <Link href="/projetos" className="projects-link">Projetos</Link>}<Dialog.Trigger asChild><button className="menu-trigger" aria-label="Abrir menu"><span>Menu</span><Menu size={25} strokeWidth={1.4} aria-hidden="true" /></button></Dialog.Trigger></div>
      </header>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-overlay__backdrop" />
        <Dialog.Content className="menu-overlay" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">Menu principal</Dialog.Title>
          <div className="menu-overlay__top"><Logo light /><Dialog.Close className="menu-overlay__close" aria-label="Fechar menu"><span>Fechar</span><X size={27} strokeWidth={1.3} /></Dialog.Close></div>
          <nav className="menu-overlay__links" aria-label="Menu principal">
            <Dialog.Close asChild><Link href="/projetos"><small>01</small>Projetos</Link></Dialog.Close>
            <Dialog.Close asChild><Link href="/sobre"><small>02</small>Sobre Pablo</Link></Dialog.Close>
            <Dialog.Close asChild><a href="https://wa.me/5521988842323" target="_blank" rel="noopener noreferrer"><small>03</small>Contato <ArrowUpRight size={42} strokeWidth={1.2} aria-hidden="true" /></a></Dialog.Close>
          </nav>
          <div className="menu-overlay__bottom"><span>Nova Iguaçu, Brasil</span><span>Design gráfico & direção visual</span></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
