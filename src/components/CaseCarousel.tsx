"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProjectImage } from "@/lib/projects";
import styles from "./CaseCarousel.module.css";

export function CaseCarousel({ images, title }: { images: ProjectImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const strip = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const slides = images.length ? images : [{ src: "", width: 2000, height: 1500 }];
  const image = slides[active] ?? slides[0];
  const select = (index: number) => setActive((index + slides.length) % slides.length);
  useEffect(() => {
    const button = strip.current?.children[active] as HTMLElement | undefined;
    if (button && strip.current) strip.current.scrollTo({ left: button.offsetLeft - strip.current.offsetWidth / 2 + button.offsetWidth / 2, behavior: reduceMotion ? "instant" : "smooth" });
  }, [active, reduceMotion]);

  return <section className={styles.carousel} aria-label={`Artes de ${title}`} aria-roledescription="carrossel" tabIndex={0} onKeyDown={event => { if(event.key === "ArrowRight" || event.key === "ArrowLeft") {event.preventDefault();select(active+(event.key==="ArrowRight"?1:-1));} }}>
    <div className={styles.viewport} style={{aspectRatio: `${image.width} / ${image.height}`, maxWidth: `min(100%, calc((100svh - 230px) * ${image.width / image.height}))`}}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={active} className={styles.slide} initial={reduceMotion ? false : {opacity:0,x:18}} animate={{opacity:1,x:0}} exit={reduceMotion ? undefined : {opacity:0,x:-18}} transition={{duration:reduceMotion?0:.22}}>
          {image.src && <Image src={image.src} alt={`${title} — arte ${active+1} de ${slides.length}`} fill sizes="(max-width:800px) 100vw, 90vw" priority={active===0} loading="eager" />}
        </motion.div>
      </AnimatePresence>
    </div>
    <div className={styles.controls}>{slides.length>1 && <button type="button" aria-label="Arte anterior" onClick={() => select(active-1)}><ArrowLeft size={20} strokeWidth={1.3} /></button>}<span aria-live="polite" aria-atomic="true">{String(active+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</span>{slides.length>1 && <button type="button" aria-label="Próxima arte" onClick={() => select(active+1)}><ArrowRight size={20} strokeWidth={1.3} /></button>}</div>
    {slides.length>1 && <div ref={strip} className={styles.thumbnails} role="group" aria-label="Escolher arte">{slides.map((item,index) => <button key={index} type="button" aria-label={`Ver arte ${index+1}`} aria-pressed={index===active} onClick={() => select(index)}>{item.src && <Image src={item.src} alt="" width={80} height={64} loading="lazy" />}</button>)}</div>}
  </section>;
}
