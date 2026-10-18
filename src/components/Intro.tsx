"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";

let hasPlayedIntro = false;

export function Intro() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const finishRef = useRef<() => void>(() => {});
  const finish = useCallback(() => finishRef.current(), []);

  useEffect(() => {
    if (hasPlayedIntro || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    let cancelled = false;
    let finished = false;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.introLoading = "true";
    window.scrollTo({ top: 0, behavior: "instant" });
    const complete = () => {
      if (cancelled || finished) return;
      finished = true;
      hasPlayedIntro = true;
      setProgress(100);
      document.body.style.overflow = originalOverflow;
      delete document.documentElement.dataset.introLoading;
      window.scrollTo({ top: 0, behavior: "instant" });
      setVisible(false);
    };
    finishRef.current = complete;
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") complete(); };
    window.addEventListener("keydown", onEscape);
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('.category-home img')).slice(0, 3);
    const resources = [document.fonts.ready, ...images.map(image => image.decode().catch(() => {}))];
    let loaded = 0;
    const ready = Promise.all(resources.map(resource => Promise.resolve(resource).finally(() => { loaded++; if (!cancelled && !finished) setProgress(Math.round(loaded / resources.length * 90)); })));
    let minimumTimer: number;
    const minimum = new Promise<void>(resolve => { minimumTimer = window.setTimeout(resolve, 1450); });
    void Promise.all([ready, minimum]).then(complete);
    const maximumTimer = window.setTimeout(complete, 4000);
    return () => {
      cancelled = true;
      window.clearTimeout(minimumTimer);
      window.clearTimeout(maximumTimer);
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = originalOverflow;
      delete document.documentElement.dataset.introLoading;
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && <motion.div className="intro intro--curtain" initial={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: .75, ease: [.76, 0, .24, 1] }}>
        <div className="intro__top"><span>Portfólio / Pablo Rudolf</span><button type="button" onClick={finish}>Pular <span>[Esc]</span></button></div>
        <motion.div className="intro__inner" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><Logo priority className="intro__logo" /><span className="intro__caption" role="status">Carregando portfólio</span><div className="intro__progress"><div className="intro__track"><span style={{ transform: `scaleX(${progress / 100})` }} /></div><span aria-hidden="true">{String(progress).padStart(2, "0")}%</span></div></motion.div>
        <div className="intro__bottom"><span>Design & direção visual</span><span>© {new Date().getFullYear()}</span></div>
      </motion.div>}
    </AnimatePresence>
  );
}
