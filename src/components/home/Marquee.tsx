"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { RegMark } from "@/components/print/PrintMarks";

/**
 * The tilted discipline band from Iván's PDF portfolio, made live: it drifts
 * slowly and speeds up / reverses with scroll velocity. Static with reduced motion.
 */
export function Marquee({ words, tone = "ink", angle = -3 }: { words: string[]; tone?: "ink" | "signal"; angle?: number }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 38, repeat: -1 });
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const dir = self.direction < 0 ? -1 : 1;
            const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(self.getVelocity()) / 400);
            gsap.to(loop, { timeScale: dir * boost, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.25 });
          },
        });
        return () => {
          loop.kill();
          st.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const colors = tone === "ink" ? "bg-carbon text-paper" : "bg-signal text-carbon";
  const run = (
    <span className="flex shrink-0 items-center">
      {[...words, ...words].map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="t-display px-[0.35em] text-[clamp(2.6rem,7.5vw,7rem)]">{w}</span>
          <RegMark size={40} className={tone === "ink" ? "text-signal" : "text-carbon"} />
        </span>
      ))}
    </span>
  );

  return (
    <div ref={root} aria-hidden className="relative z-10 -my-[3vw] overflow-hidden py-[3vw]">
      <div className={`${colors} py-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,.5)]`} style={{ transform: `rotate(${angle}deg) scale(1.06)` }}>
        <div data-track className="flex w-max">
          {run}
          {run}
        </div>
      </div>
    </div>
  );
}
