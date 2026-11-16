"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Variety } from "@/data/types";
import { tx, type Locale } from "@/lib/i18n";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Picture } from "@/components/ui/Picture";
import { ui } from "@/i18n/ui";

/**
 * VALHALLA — one system, three temperaments. A tablist re-inks the whole
 * block with the selected variety's palette, so the visitor *sees* the
 * system rule: structure constant, colour variable.
 */
export function Varieties({ varieties, locale = "es" }: { varieties: Variety[]; locale?: Locale }) {
  const t = ui(locale);
  const [i, setI] = useState(0);
  const v = varieties[i];
  const id = useId();
  const stage = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (n: number) => {
    if (n === i) return;
    const el = stage.current;
    if (el && !prefersReducedMotion()) {
      gsap.fromTo(el.querySelectorAll("[data-swap]"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.04, delay: 0.08 });
    }
    setI(n);
  };

  const onKey = (e: KeyboardEvent) => {
    const n = varieties.length;
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <div ref={stage} className="theme-transition -mx-[var(--gutter)] px-[var(--gutter)] py-[8vh]" style={{ background: v.theme.bg, color: v.theme.ink }}>
      <div role="tablist" aria-label="Variedades de Valhalla" onKeyDown={onKey} className="flex flex-wrap gap-2">
        {varieties.map((x, n) => (
          <button
            key={x.id}
            ref={(el) => {
              tabs.current[n] = el;
            }}
            role="tab"
            id={`${id}-tab-${x.id}`}
            aria-selected={n === i}
            aria-controls={`${id}-panel`}
            tabIndex={n === i ? 0 : -1}
            onClick={() => select(n)}
            className="flex items-center gap-2 border-2 px-4 py-2 text-[0.95rem] font-semibold uppercase tracking-[0.06em] transition-colors"
            style={{
              fontFamily: "var(--font-montserrat)",
              borderColor: v.theme.ink,
              background: n === i ? v.theme.ink : "transparent",
              color: n === i ? v.theme.bg : v.theme.ink,
            }}
          >
            <span aria-hidden className="flex h-3 overflow-hidden">
              {x.colors.map((c) => (
                <span key={c.hex} className="block h-3 w-3" style={{ background: c.hex, boxShadow: "inset 0 0 0 1px rgba(127,127,127,.5)" }} />
              ))}
            </span>
            {x.name.replace("Valhalla ", "")}
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${v.id}`} className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div data-swap className="lg:col-span-4">
          <p className="text-[0.95rem] font-semibold uppercase tracking-[0.08em]" style={{ fontFamily: "var(--font-montserrat)" }}>
            {tx(v.tagline, locale)}
          </p>
          <h3 className="mt-2 text-[clamp(2.4rem,5vw,4.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em]" style={{ fontFamily: "var(--font-montserrat)" }}>
            {v.name}
          </h3>
          <p className="t-body mt-4 max-w-[36ch] opacity-90">{tx(v.description, locale)}</p>
          <ul className="mt-6 space-y-1">
            {v.colors.map((c) => (
              <li key={c.hex} className="t-slug flex items-center gap-3">
                <span aria-hidden className="block h-5 w-8" style={{ background: c.hex, boxShadow: "inset 0 0 0 1px rgba(127,127,127,.6)" }} />
                {tx(c.name, locale)} · {c.hex} · {c.cmyk}
              </li>
            ))}
          </ul>
          <figure className="mt-8 w-32" data-swap>
            <Picture k={v.cap.key} alt={tx(v.cap.alt, locale)} sizes="128px" placeholder={false} className="block" imgClassName="h-auto w-full rounded-full" />
            <figcaption className="t-slug mt-2 opacity-70">Etiqueta de tapón · {t.imageKinds.flat}</figcaption>
          </figure>
        </div>

        <div className="lg:col-span-8">
          <ul className="grid grid-cols-3 gap-3 sm:gap-4">
            {v.labels.map((l, n) => (
              <li key={l.key} data-swap>
                <figure>
                  <Picture k={l.key} alt={tx(l.alt, locale)} sizes="(min-width:1024px) 20vw, 30vw" className="block shadow-[0_10px_30px_-12px_rgba(0,0,0,.45)]" imgClassName="h-auto w-full" />
                  <figcaption className="t-slug mt-2 opacity-70">{["Frontal · cabeza", "Frontal · drakkar", "Dorsal"][n]}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {[v.bottles, v.box].map((m) => (
          <figure key={m.key} data-swap>
            <div className="bg-white p-3">
              <Picture k={m.key} alt={tx(m.alt, locale)} sizes="(min-width:768px) 45vw, 100vw" className="block" imgClassName="h-auto w-full" />
            </div>
            <figcaption className="t-slug mt-2 opacity-70">{t.imageKinds[m.kind]}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
        <figure className="md:col-span-4" data-swap>
          <div className="bg-white p-4">
            <Picture k={v.dieline.key} alt={tx(v.dieline.alt, locale)} sizes="(min-width:768px) 30vw, 100vw" className="block" imgClassName="mx-auto h-auto max-h-[460px] w-auto" />
          </div>
          <figcaption className="t-slug mt-2 opacity-70">Troquel · {t.imageKinds.flat}</figcaption>
        </figure>
        {v.scene ? (
          <figure className="md:col-span-8" data-swap>
            <Picture k={v.scene.key} alt={tx(v.scene.alt, locale)} sizes="(min-width:768px) 60vw, 100vw" className="block h-full" imgClassName="h-full w-full" />
            <figcaption className="t-slug mt-2 opacity-70">{t.imageKinds[v.scene.kind]}</figcaption>
          </figure>
        ) : null}
      </div>
    </div>
  );
}
