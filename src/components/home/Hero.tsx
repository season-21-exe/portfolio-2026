"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { projectNumber, projects } from "@/data/projects";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Picture } from "@/components/ui/Picture";

const COVER_MS = 4600;

/**
 * COVER — the portfolio's front page, set like a poster.
 *
 *   masthead ...... IVÁN ORDÓÑEZ (expanded black, a red plate slides into register)
 *   profession .... DISEÑADOR GRÁFICO (condensed black, the tallest line)
 *   disciplines ... IDENTIDAD · PACKAGING · EDITORIAL (mono, set across the measure)
 *   cover story ... the six projects' key visuals, one after another; the
 *                   numbered index 01–06 selects and shows how long each stays.
 *
 * Every size is fitted to the measure, so the poster holds from 390 px to 2560 px.
 */
export function Hero({ locale = "es" }: { locale?: Locale }) {
  const t = ui(locale);
  const root = useRef<HTMLElement>(null);
  const layers = useRef<(HTMLSpanElement | null)[]>([]);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const prevRef = useRef(0);
  const holdRef = useRef(false);
  const progress = useRef(0);
  const current = projects[active];

  // ── Entrance: one timed sequence, then the pointer nudges the red plate ───
  useGSAP(
    () => {
      const el = root.current!;
      const plate = el.querySelector<HTMLElement>("[data-plate]");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-dateline]", { opacity: 0, y: -8, duration: 0.7 })
          .from("[data-line]", { yPercent: 104, duration: 1.15, stagger: 0.09 }, 0.1)
          .fromTo(plate, { x: "-0.5em", opacity: 0 }, { x: "0.04em", opacity: 1, duration: 1.4, ease: "expo.inOut" }, 0.2)
          .from("[data-rule]", { scaleX: 0, transformOrigin: "left", duration: 1, ease: "expo.inOut" }, 0.45)
          .from("[data-discipline]", { opacity: 0, y: 10, duration: 0.7, stagger: 0.08 }, 0.7)
          .from("[data-cover]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" }, 0.55)
          .from("[data-fade]", { opacity: 0, y: 12, duration: 0.8, stagger: 0.07 }, 0.95);

        if (!window.matchMedia("(pointer: fine)").matches || !plate) return;
        const qx = gsap.quickTo(plate, "x", { duration: 0.9, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const fs = parseFloat(getComputedStyle(plate).fontSize);
          qx(fs * (0.04 + (e.clientX / window.innerWidth - 0.5) * 0.06));
        };
        tl.eventCallback("onComplete", () => window.addEventListener("pointermove", onMove));
        return () => window.removeEventListener("pointermove", onMove);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(plate, { x: "0.04em", opacity: 1 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // ── Cover story: advance unless held, hidden or off-screen ───────────────
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    let last = performance.now();
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!holdRef.current && onScreen && !document.hidden) {
        progress.current += dt / COVER_MS;
        if (progress.current >= 1) {
          progress.current = 0;
          setActive((a) => (a + 1) % projects.length);
        }
      }
      bars.current.forEach((b, i) => {
        if (b) b.style.transform = `scaleX(${i === activeRef.current ? progress.current : i < activeRef.current ? 1 : 0})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // Each new cover is pulled up over the last
  useEffect(() => {
    activeRef.current = active;
    const prev = prevRef.current;
    if (prev === active) return;
    layers.current.forEach((l, i) => l && (l.style.zIndex = i === active ? "3" : i === prev ? "2" : "1"));
    const el = layers.current[active];
    if (el) {
      if (prefersReducedMotion()) el.style.clipPath = "inset(0% 0% 0% 0%)";
      else gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" });
    }
    prevRef.current = active;
  }, [active]);

  const select = (i: number) => {
    holdRef.current = true;
    if (i !== activeRef.current) {
      progress.current = 0;
      setActive(i);
    }
  };
  const release = () => (holdRef.current = false);

  return (
    <section ref={root} id="inicio" data-nav-section="inicio" aria-labelledby="hero-title" className="surface-paper relative flex min-h-[100svh] flex-col pad-x pb-6 pt-[calc(var(--header-h)+0.75rem)]">
      {/* Dateline, as on the first page of a publication */}
      <div data-dateline className="t-label flex items-center justify-between gap-4 pb-2 text-grey-ink">
        <span>{tx(site.edition, locale)}</span>
        <span className="hidden sm:block">{tx(site.location, locale)}</span>
        <span>{t.work.count(projects.length)}</span>
      </div>

      <h1 id="hero-title" className="relative select-none [container-type:inline-size]">
        <span className="sr-only">
          {site.name}, {tx(site.title, locale).toLowerCase()}. {site.disciplines.map((d) => tx(d, locale)).join(", ")}.
        </span>

        {/* Masthead: the name, with a red plate printed in register */}
        <span aria-hidden className="t-display relative flow-root text-carbon [font-size:calc(100cqi_/_6.46)] md:[font-size:calc(100cqi_/_9.82)]" style={{ lineHeight: 0.92 }}>
          <span className="block overflow-hidden pt-[0.16em] -mt-[0.16em]">
            <span data-line className="block">
              {site.heroLines[0]} <br className="md:hidden" />
              {site.heroLines[1]}
            </span>
          </span>
          <span data-plate className="pointer-events-none absolute inset-0 block text-signal mix-blend-multiply" style={{ opacity: 0.94, transform: "translateX(0.04em)" }}>
            {site.heroLines[0]} <br className="md:hidden" />
            {site.heroLines[1]}
          </span>
        </span>

        {/* Profession: condensed, the tallest line on the page */}
        <span aria-hidden className="t-cond block text-carbon [font-size:calc(100cqi_/_4.22)] md:[font-size:calc(100cqi_/_7.56)]" style={{ lineHeight: 0.86 }}>
          <span className="block overflow-hidden pt-[0.12em] -mt-[0.06em]">
            <span data-line className="block">
              {tx(site.title, locale)}
            </span>
          </span>
        </span>
      </h1>

      <div data-rule className="mt-3 h-px w-full bg-carbon/80" />
      <p className="t-label mt-2 flex justify-between text-[0.8rem] md:text-[0.95rem]" aria-label={site.disciplines.map((d) => tx(d, locale)).join(", ")}>
        {site.disciplines.map((d, i) => (
          <span key={i} data-discipline aria-hidden>
            {tx(d, locale)}
          </span>
        ))}
      </p>

      {/* Cover story + statement */}
      <div className="mt-6 grid flex-1 grid-cols-1 gap-6 md:grid-cols-12 md:gap-x-6">
        <figure className="relative min-h-[46svh] md:col-span-8 md:min-h-0" onMouseEnter={() => select(activeRef.current)} onMouseLeave={release}>
          <TransitionLink href={`/projects/${current.slug}/`} className="absolute inset-0 block" aria-label={`${t.work.open}: ${projectNumber(current)} ${current.title}`}>
            <span data-cover className="absolute inset-0 block overflow-hidden bg-carbon">
              {projects.map((p, i) => {
                const v = p.poster ?? p.cover;
                return (
                  <span
                    key={p.slug}
                    ref={(el) => {
                      layers.current[i] = el;
                    }}
                    className="absolute inset-0 block"
                    style={{ background: p.theme.bg, zIndex: i === 0 ? 3 : 1, clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                  >
                    <Picture k={v.key} alt={i === active ? tx(v.alt, locale) : ""} sizes="(min-width: 768px) 66vw, 100vw" priority={i === 0} className="block h-full w-full" imgClassName="h-full w-full" />
                  </span>
                );
              })}
            </span>
          </TransitionLink>
        </figure>

        <div className="flex flex-col justify-between gap-6 md:col-span-4">
          <p data-fade className="t-lead">
            {tx(site.statement, locale)}
          </p>

          <div data-fade>
            <p className="t-label mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="text-grey-ink">{t.hero.cover}</span>
              <span className="whitespace-nowrap">
                <span className="text-signal-deep">{projectNumber(current)}</span> {current.title}
              </span>
            </p>
            <ol className="grid grid-cols-6 gap-1.5" onMouseLeave={release}>
              {projects.map((p, i) => (
                <li key={p.slug}>
                  <TransitionLink
                    href={`/projects/${p.slug}/`}
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    onBlur={release}
                    aria-label={`${projectNumber(p)} ${p.title}, ${tx(p.label, locale)}`}
                    className="group block pt-2"
                  >
                    <span aria-hidden className="block h-[3px] w-full bg-carbon/15">
                      <span
                        ref={(el) => {
                          bars.current[i] = el;
                        }}
                        className="block h-full w-full origin-left bg-carbon"
                        style={{ transform: "scaleX(0)" }}
                      />
                    </span>
                    <span className={`t-label mt-1.5 block transition-colors ${i === active ? "text-carbon" : "text-grey-ink"} group-hover:text-signal-deep`}>{projectNumber(p)}</span>
                  </TransitionLink>
                </li>
              ))}
            </ol>
          </div>

          <a data-fade href="#trabajo" className="t-label group inline-flex w-fit items-center gap-3">
            <span className="relative block h-9 w-px overflow-hidden bg-carbon/20" aria-hidden>
              <span className="absolute inset-x-0 top-0 h-1/2 bg-signal motion-safe:animate-[scrollcue_1.8s_ease-in-out_infinite]" />
            </span>
            <span className="link-ink">{t.hero.scroll}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
