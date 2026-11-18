"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

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
        // While it waits, the frame also clips the enlarged image (clip-path alone
        // doesn't stop it pushing the page sideways). Once settled, both are
        // cleared, so shadows around the frame show again.
        gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)", overflow: "hidden" });
        if (img) gsap.set(img, { scale: 1.12 });
        const settle = () => gsap.set(el, { clearProps: "clipPath,overflow" });
        // IntersectionObserver (not ScrollTrigger): it stays correct when the
        // layout reflows under it — filters, view changes, late-loading images.
        const io = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            io.disconnect();
            gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "expo.inOut", delay, onComplete: img ? undefined : settle });
            if (img) gsap.to(img, { scale: 1, duration: 1.6, ease: "expo.out", delay, onComplete: settle });
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
