"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * ImageReveal — the one scroll reveal used across the site: a proof sheet
 * being pulled up through the press. A clip-path wipe plus a slight settle
 * of the image inside. Only runs once, only with motion allowed.
 */
export function ImageReveal({ children, className = "", as: Tag = "div", delay = 0 }: { children: ReactNode; className?: string; as?: ElementType; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const img = el.querySelector("img");
        // Already on screen at mount (e.g. after a filter) → show immediately, no mask.
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) return;
        gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
        if (img) gsap.set(img, { scale: 1.12 });
        // IntersectionObserver (not ScrollTrigger): it stays correct when the
        // layout reflows under it — filters, view changes, late-loading images.
        const io = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            io.disconnect();
            gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "expo.inOut", delay });
            if (img) gsap.to(img, { scale: 1, duration: 1.6, ease: "expo.out", delay });
          },
          { rootMargin: "0px 0px -10% 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * AnimatedText — splits a heading into lines of words and raises them from
 * behind a mask. Used for page-level headings only (one orchestrated moment).
 */
export function AnimatedText({ text, as: Tag = "h2", className = "", delay = 0, trigger = "scroll" }: { text: string; as?: ElementType; className?: string; delay?: number; trigger?: "scroll" | "load" }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = el.querySelectorAll<HTMLElement>("[data-w]");
        gsap.set(words, { yPercent: 105 });
        const play = () => gsap.to(words, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.045, delay });
        if (trigger === "load") play();
        else ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: play });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom" style={{ marginBottom: "-0.08em" }}>
          <span data-w className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
