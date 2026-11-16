"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * HERB LUBALIN — the adjectives from the fascicle, set in Archivo and
 * stretched along its width axis as you scroll: an homage to a designer who
 * squeezed, stretched and interlocked letters for a living.
 */
export function Words({ words }: { words: string[] }) {
  const root = useRef<HTMLUListElement>(null);
  useGSAP(
    () => {
      const items = root.current!.querySelectorAll<HTMLElement>("[data-word]");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        items.forEach((el, i) => {
          const from = i % 2 ? 125 : 62;
          const to = i % 2 ? 62 : 125;
          const state = { w: from };
          el.style.fontVariationSettings = `"wdth" ${from}`;
          gsap.to(state, {
            w: to,
            ease: "none",
            onUpdate: () => {
              el.style.fontVariationSettings = `"wdth" ${state.w.toFixed(1)}`;
            },
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <ul ref={root} aria-label="Lubalin, en ocho adjetivos" className="mt-12 border-t border-current">
      {words.map((w, i) => (
        <li key={w} className="flex items-baseline justify-between gap-4 border-b border-current py-1">
          <span data-word className="block font-black leading-[0.95] tracking-[-0.03em]" style={{ color: i === 3 ? "var(--p-accent)" : undefined, fontVariationSettings: '"wdth" 100', fontSize: "min(8.5rem, calc((100vw - 2 * var(--gutter) - 2.5rem) / 10.6))" }}>
            {w}
          </span>
          <span className="t-slug tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
        </li>
      ))}
    </ul>
  );
}

void ScrollTrigger;
