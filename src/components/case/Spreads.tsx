"use client";

import { useRef, useState } from "react";
import type { Media } from "@/data/types";
import { tx, type Locale } from "@/lib/i18n";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Picture } from "@/components/ui/Picture";

/**
 * HOTRACE — leafing through the magazine. On wide screens the section pins
 * and vertical scroll turns the pages sideways (native scroll, no hijack:
 * the page still scrolls normally, it's just mapped to a horizontal track).
 * On small screens / reduced motion the spreads simply stack.
 */
export function Spreads({ items, locale = "es" }: { items: Media[]; locale?: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  useGSAP(
    () => {
      const el = root.current!;
      const track = el.querySelector<HTMLElement>("[data-track]")!;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const dist = () => track.scrollWidth - el.clientWidth;
        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => setPage(Math.min(items.length - 1, Math.round(self.progress * (items.length - 1)))),
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const folios = ["Portada", "Págs. 2–3", "Págs. 4–5", "Págs. 6–7", "Págs. 8–9"];

  return (
    <div ref={root} className="relative -mx-[var(--gutter)] overflow-hidden lg:h-[100svh]">
      <div className="flex h-full flex-col justify-center">
        <div data-track className="flex flex-col gap-10 px-[var(--gutter)] lg:w-max lg:flex-row lg:items-center lg:gap-[4vw]">
          {items.map((m, n) => {
            const cover = n === 0;
            return (
              <figure key={m.key} className={`shrink-0 ${cover ? "lg:h-[72svh] lg:w-auto" : "lg:h-[72svh] lg:w-auto"}`}>
                <div className="h-full shadow-[0_30px_60px_-30px_rgba(0,0,0,.55)]" style={{ aspectRatio: cover ? "1800 / 2546" : "2400 / 1698" }}>
                  <Picture k={m.key} alt={tx(m.alt, locale)} sizes={cover ? "(min-width:1024px) 52vh, 100vw" : "(min-width:1024px) 102vh, 100vw"} className="block h-full w-full" imgClassName="h-full w-full" />
                </div>
                <figcaption className="t-slug mt-3 opacity-70">{folios[n] ?? ""} · Arte final</figcaption>
              </figure>
            );
          })}
        </div>
        <p aria-hidden className="t-slug pointer-events-none absolute bottom-6 right-[var(--gutter)] hidden tabular-nums lg:block">
          {folios[page]} — {page + 1}/{items.length}
        </p>
      </div>
    </div>
  );
}

// Keep ScrollTrigger referenced so tree-shaking never drops the plugin registration in this chunk.
void ScrollTrigger;
