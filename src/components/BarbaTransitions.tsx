"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ITransitionData, ITransitionPage } from "@barba/core/dist/src/defs";
import { Logo } from "./Logo";

const normalize = (path: string) => path.replace(/\/$/, "") || "/";
const namespace = (path: string) => normalize(path) === "/" ? "home" : path.startsWith("/projetos") ? "projects" : "about";

/** Barba owns the transition lifecycle; Next owns containers, history and routing. */
export function BarbaTransitions({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const content = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const path = useRef(pathname);
  const pending = useRef<{ target: string; resolve: () => void; reject: (error: Error) => void; timeout: number } | null>(null);

  useLayoutEffect(() => {
    path.current = pathname;
    if (pending.current && normalize(pathname) === pending.current.target) {
      const navigation = pending.current;
      pending.current = null;
      window.clearTimeout(navigation.timeout);
      requestAnimationFrame(navigation.resolve);
    }
  }, [pathname]);

  useEffect(() => {
    let disposed = false;
    let removeClick: (() => void) | undefined;
    let reset: (() => void) | undefined;

    async function setup() {
      const { default: barba } = await import("@barba/core");
      if (disposed || !content.current || !curtain.current || !wrapper.current) return;
      // Bootstrap the public transition manager, then detach Barba's PJAX router.
      // Restoring the exact state preserves the App Router's history metadata.
      const nextHistory = window.history.state;
      barba.init({ prefetchIgnore: true, prevent: () => true, transitions: [] });
      const manager = barba.transitions;
      barba.destroy();
      window.history.replaceState(nextHistory, "", window.location.href);
      const host = content.current;
      const cover = curtain.current;
      const shell = wrapper.current;
      shell.dataset.transitionEngine = "barba";

      const animateCover = async (from: string, to: string) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const animation = cover.animate([{ transform: from }, { transform: to }], { duration: reduce ? 0 : 330, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" });
        await animation.finished;
        cover.style.transform = to;
        animation.cancel();
      };

      const release = () => {
        host.inert = false;
        host.removeAttribute("aria-busy");
        cover.style.pointerEvents = "none";
        cover.style.transform = "translateY(100%)";
        shell.dataset.barbaPhase = "idle";
        manager.isRunning = false;
      };
      reset = release;

      const transition: ITransitionPage = {
        name: "home-projects-curtain",
        before() { host.inert = true; host.setAttribute("aria-busy", "true"); cover.style.pointerEvents = "auto"; },
        async leave() { shell.dataset.barbaPhase = "leave"; await animateCover("translateY(100%)", "translateY(0%)"); },
        async enter() { shell.dataset.barbaPhase = "enter"; await animateCover("translateY(0%)", "translateY(-100%)"); },
        after(data) { shell.dataset.barbaLastTransition = `${data.current.namespace}:${data.next.namespace}`; release(); },
      };
      manager.store.add("transition", transition);

      // Adapt Barba's public container hooks instead of swapping React-owned DOM.
      manager.add = async (data) => {
        const target = new URL(data.next.url.href!);
        await new Promise<void>((resolve, reject) => {
          const timeout = window.setTimeout(() => {
            pending.current = null;
            reject(new Error("Next navigation did not commit"));
          }, 8000);
          pending.current = { target: normalize(target.pathname), resolve, reject, timeout };
          router.push(`${target.pathname}${target.search}${target.hash}`);
        });
        data.next.container = host;
        data.next.html = host.outerHTML;
      };
      manager.remove = async () => { /* Next unmounts the outgoing route. */ };

      const navigate = async (anchor: HTMLAnchorElement, event: MouseEvent) => {
        const current = new URL(window.location.href);
        const next = new URL(anchor.href);
        const data: ITransitionData = {
          current: { container: host, namespace: namespace(current.pathname), html: host.outerHTML, url: { href: current.href, ...barba.url.parse(current.href) } },
          next: { container: host, namespace: namespace(next.pathname), html: "next-router-managed", url: { href: next.href, ...barba.url.parse(next.href) } },
          trigger: anchor,
          event,
        };
        try {
          await manager.doPage({ data, transition: manager.get(data) as ITransitionPage, page: Promise.resolve(), wrapper: shell });
          const main = host.querySelector("main");
          if (main) { main.setAttribute("tabindex", "-1"); main.focus({ preventScroll: true }); }
        } catch {
          release();
          window.location.assign(next.href);
        }
      };

      const onClick = (event: MouseEvent) => {
        const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
        if (!anchor || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
        const target = new URL(anchor.href);
        if (target.origin !== window.location.origin || normalize(target.pathname) === normalize(path.current)) return;
        const from = namespace(path.current);
        const to = namespace(target.pathname);
        if (!["home", "projects"].includes(from) || !["home", "projects"].includes(to)) return;
        event.preventDefault();
        event.stopPropagation();
        if (!manager.isRunning) void navigate(anchor, event);
      };
      document.addEventListener("click", onClick, true);
      removeClick = () => document.removeEventListener("click", onClick, true);
    }
    void setup();
    return () => {
      disposed = true;
      removeClick?.();
      if (pending.current) { window.clearTimeout(pending.current.timeout); pending.current.resolve(); pending.current = null; }
      reset?.();
    };
  }, [router]);

  return <div ref={wrapper} data-barba="wrapper" data-barba-phase="idle"><div ref={content} data-barba="container" data-barba-namespace={namespace(pathname)}>{children}</div><div ref={curtain} className="barba-curtain" aria-hidden="true"><Logo light /></div></div>;
}
