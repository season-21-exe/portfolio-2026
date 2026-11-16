"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import type { Category, Project } from "@/data/types";
import { ui } from "@/i18n/ui";
import { type Locale } from "@/lib/i18n";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { TransitionLink } from "@/components/motion/PageTransition";
import { MiniCover } from "@/components/project/MiniCover";
import { Slug } from "@/components/layout/Slug";
import { ProjectCover } from "@/components/project/ProjectCover";

const CATS: Category[] = ["identidad", "packaging", "editorial"];

/** Other parts of the page (the hero statement) can ask the index to show one discipline. */
export const FILTER_EVENT = "portfolio:filter";
export const requestFilter = (c: Category | "all") => window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: c }));

/**
 * THE PILE — every project is a full sheet printed in its own inks. On wide
 * screens the sheets are sticky, so each new proof is laid on top of the last
 * as you scroll (pure CSS; scrolling stays native). Opening a sheet morphs it
 * into its case study. A dense list view remains for scanning.
 */
export function ProjectIndex({ locale = "es" }: { locale?: Locale }) {
  const t = ui(locale);
  const [filter, setFilter] = useState<Category | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const visible = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))), [filter]);
  const counts = useMemo(() => Object.fromEntries(CATS.map((c) => [c, projects.filter((p) => p.categories.includes(c)).length])) as Record<Category, number>, []);

  useEffect(() => {
    const on = (e: Event) => {
      const c = (e as CustomEvent<Category | "all">).detail;
      setFilter(c);
      setView("grid");
      document.getElementById("trabajo")?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    };
    window.addEventListener(FILTER_EVENT, on);
    return () => window.removeEventListener(FILTER_EVENT, on);
  }, []);

  return (
    <section id="trabajo" aria-labelledby="trabajo-title" className="surface-ink relative">
      <header className="flex flex-col gap-8 pad-x pb-10 pt-[18vh] md:pb-14">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          {/* "SELECCIONADO" (12 caps) can’t wrap: fit it to the measure so it also works on a phone */}
          <h2 id="trabajo-title" className="t-display" style={{ fontSize: "min(6.6rem, calc((100vw - 2 * var(--gutter)) / 11.8))" }}>
            {t.work.title}
          </h2>
          <p className="t-slug max-w-[34ch] pb-2 text-grey-light">
            {t.work.count(visible.length)}. Cada proyecto, impreso en sus propias tintas.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-paper/20 pt-4">
          <div role="group" aria-label={t.work.filterLabel} className="flex flex-wrap gap-1">
            {(["all", ...CATS] as const).map((c) => {
              const on = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(c)}
                  className={`t-meta border px-3 py-1.5 transition-colors ${on ? "border-signal bg-signal text-carbon" : "border-paper/25 hover:border-paper"}`}
                >
                  {c === "all" ? t.work.all : t.categories[c]}
                  <span className="t-slug ml-1.5 opacity-70">{c === "all" ? projects.length : counts[c]}</span>
                </button>
              );
            })}
          </div>
          <div role="group" aria-label={t.work.viewLabel} className="flex gap-1">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={`t-meta px-2 py-1.5 transition-colors ${view === v ? "text-paper underline decoration-signal decoration-2 underline-offset-[6px]" : "text-grey-light hover:text-paper"}`}
              >
                {v === "grid" ? t.work.viewGrid : t.work.viewList}
              </button>
            ))}
          </div>
        </div>
      </header>

      {view === "grid" ? (
        <ol key={filter} className="animate-[sheetin_.6s_var(--ease-out-quint)_both]">
          {visible.map((p, i) => (
            <li
              key={p.slug}
              id={`p-${p.slug}`}
              className="relative md:sticky md:top-0"
              style={{ zIndex: i + 1, boxShadow: i ? "0 -28px 60px -28px rgba(0,0,0,.7)" : undefined }}
            >
              <TransitionLink href={`/projects/${p.slug}/`} className="group block" aria-label={`${p.title}: ${t.work.open}`}>
                <ProjectCover p={p} n={projects.indexOf(p) + 1} total={projects.length} variant="index" locale={locale} />
              </TransitionLink>
            </li>
          ))}
        </ol>
      ) : (
        <div className="pad-x pb-[10vh]">
          <ProjectList items={visible} locale={locale} />
        </div>
      )}

      <div className="pad-x py-8">
        <Slug folio="2" className="text-grey-light" note={t.work.count(visible.length)} />
      </div>
    </section>
  );
}

/** Index as a list: dense, scannable; a proof follows the cursor on hover. */
function ProjectList({ items, locale }: { items: Project[]; locale: Locale }) {
  const t = ui(locale);
  const float = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    const el = float.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      qx(e.clientX + 24);
      qy(e.clientY - 120);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <ol className="border-t border-paper/20" onMouseLeave={() => setHover(null)}>
        {items.map((p) => (
          <li key={p.slug} className="border-b border-paper/20">
            <TransitionLink
              href={`/projects/${p.slug}/`}
              onMouseEnter={() => setHover(p.slug)}
              className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-5 md:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.6fr)]"
            >
              <span className="t-slug text-grey-light tabular-nums">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
              <span className="t-display text-[clamp(1.9rem,4vw,3.6rem)] transition-colors duration-300 group-hover:text-signal">{p.title}</span>
              <span className="t-meta col-start-2 text-grey-light md:col-start-auto">{p.categories.map((c) => t.categories[c]).join(" / ")}</span>
              <span className="t-meta col-start-2 text-grey-light md:col-start-auto md:text-right">{p.authorship === "individual" ? t.work.individual : t.work.team}</span>
            </TransitionLink>
          </li>
        ))}
      </ol>
      <div ref={float} aria-hidden className="pointer-events-none fixed left-0 top-0 z-50 hidden w-[22vw] max-w-[340px] md:block">
        {items.map((p) => (
          <div
            key={p.slug}
            className="absolute left-0 top-0 aspect-[4/3] w-full overflow-hidden transition-[opacity,transform] duration-300"
            style={{ opacity: hover === p.slug ? 1 : 0, transform: hover === p.slug ? "scale(1)" : "scale(.92)", background: p.theme.bg }}
          >
            <MiniCover p={p} sizes="340px" />
          </div>
        ))}
      </div>
    </>
  );
}
