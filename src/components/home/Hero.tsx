"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { TransitionLink } from "@/components/motion/PageTransition";
import { CropMarks } from "@/components/print/PrintMarks";
import { MiniCover } from "@/components/project/MiniCover";
import { Slug } from "@/components/layout/Slug";
import { requestFilter } from "@/components/home/ProjectIndex";

const PROOF_MS = 4200;

/**
 * HERO — "prueba de imprenta".
 *
 * 1 · The name is printed with two plates (carbon + signal red, multiplied).
 *     On load the red plate slides into register — horizontally, as a real
 *     press misregisters — and the pointer nudges it slightly out again.
 * 2 · The statement is also the index: each clause opens the work filtered
 *     by its discipline.
 * 3 · The proof runs through every project's sheet, in its own ink. The
 *     control strip below shows which sheet is on the press and how long it
 *     stays; hovering or focusing a patch holds that proof.
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
  const counts = { identidad: 0, packaging: 0, editorial: 0 } as Record<string, number>;
  projects.forEach((p) => p.categories.forEach((c) => (counts[c] += 1)));

  // ── Load sequence + pointer misregistration ────────────────────────────
  useGSAP(
    () => {
      const el = root.current!;
      const plate = el.querySelector<HTMLElement>("[data-plate]");
      const lines = el.querySelectorAll<HTMLElement>("[data-line]");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(lines, { yPercent: 102, duration: 1.2, stagger: 0.08 })
          .fromTo(plate, { x: "-0.75em", opacity: 0 }, { x: "0.045em", opacity: 1, duration: 1.5, ease: "expo.inOut" }, 0.15)
          .from("[data-proof]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" }, 0.45)
          .from("[data-fade]", { opacity: 0, y: 14, duration: 0.9, stagger: 0.08 }, 0.8)
          .from("[data-chip]", { scaleY: 0, transformOrigin: "bottom", duration: 0.6, stagger: 0.03, ease: "power3.out" }, 1);

        if (!window.matchMedia("(pointer: fine)").matches || !plate) return;
        const qx = gsap.quickTo(plate, "x", { duration: 0.9, ease: "power3.out" });
        const qy = gsap.quickTo(plate, "y", { duration: 0.9, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const fs = parseFloat(getComputedStyle(plate).fontSize);
          qx(fs * (0.045 + (e.clientX / window.innerWidth - 0.5) * 0.07));
          qy(fs * (e.clientY / window.innerHeight - 0.5) * 0.012);
        };
        tl.eventCallback("onComplete", () => window.addEventListener("pointermove", onMove));
        return () => window.removeEventListener("pointermove", onMove);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(plate, { x: "0.045em", opacity: 1 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // ── The press: advance the proof, unless held, hidden or off-screen ────
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    let last = performance.now();
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), { threshold: 0.25 });
    if (root.current) io.observe(root.current);
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!holdRef.current && onScreen && !document.hidden) {
        progress.current += dt / PROOF_MS;
        if (progress.current >= 1) {
          progress.current = 0;
          setActive((a) => (a + 1) % projects.length);
        }
      }
      bars.current.forEach((b, i) => {
        if (b) b.style.transform = `scaleX(${i === activeRef.current ? progress.current : 0})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // ── Each new proof is pulled up over the last one ──────────────────────
  useEffect(() => {
    activeRef.current = active;
    const prev = prevRef.current;
    if (prev === active) return;
    layers.current.forEach((l, i) => l && (l.style.zIndex = i === active ? "3" : i === prev ? "2" : "1"));
    const el = layers.current[active];
    if (el) {
      if (prefersReducedMotion()) el.style.clipPath = "inset(0% 0% 0% 0%)";
      else gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.95, ease: "expo.inOut" });
    }
    prevRef.current = active;
  }, [active]);

  const hold = (i: number | null) => {
    holdRef.current = i !== null;
    if (i !== null && i !== activeRef.current) {
      progress.current = 0;
      setActive(i);
    }
  };

  const nameLines = site.heroLines;

  return (
    <section ref={root} aria-labelledby="hero-title" className="surface-paper relative flex min-h-[100svh] flex-col pad-x pb-5 pt-[calc(var(--header-h)+1.25rem)]">
      {/* ── The name: carbon plate + red plate ─────────────────────────── */}
      <h1 id="hero-title" className="relative select-none">
        <span className="sr-only">
          {site.name}, {tx(site.title, locale).toLowerCase()} en {tx(site.location, locale)}
        </span>
        {/* Sized to the measure: "ORDÓÑEZ" is ≈6.4em wide in Archivo Expanded Black. */}
        <span aria-hidden className="t-display relative block text-carbon" style={{ lineHeight: 0.9, fontSize: "min(calc((100vw - 2 * var(--gutter)) / 6.6), 26rem)" }}>
          {nameLines.map((l, i) => (
            <span key={l} className={`block overflow-hidden ${i === 1 ? "text-right" : ""}`}>
              <span data-line className="block">
                {l}
              </span>
            </span>
          ))}
          <span data-plate className="pointer-events-none absolute inset-0 block text-signal mix-blend-multiply" style={{ opacity: 0.94 }}>
            {nameLines.map((l, i) => (
              <span key={l} className={`block ${i === 1 ? "text-right" : ""}`}>
                {l}
              </span>
            ))}
          </span>
        </span>
      </h1>

      {/* ── Statement (also the index) + proof ───────────────────────────── */}
      <div className="relative mt-6 grid flex-1 grid-cols-1 gap-8 md:mt-7 md:grid-cols-12 md:gap-6">
        <div className="flex flex-col justify-between gap-6 md:col-span-6">
          <div className="space-y-4">
            <p data-fade className="t-slug text-grey-ink">
              {tx(site.title, locale)} en {tx(site.location, locale)}
            </p>
            <p data-fade className="t-lead max-w-[25ch] text-[clamp(1.45rem,1rem+1.35vw,2.4rem)] font-semibold" style={{ fontVariationSettings: '"wdth" 112' }}>
              {site.statementParts.map((part, i) =>
                part.filter ? (
                  <a
                    key={i}
                    href="#trabajo"
                    onClick={(e) => {
                      e.preventDefault();
                      requestFilter(part.filter!);
                    }}
                    className="decoration-signal decoration-[0.09em] underline-offset-[0.14em] [text-decoration-line:underline] transition-colors hover:text-signal-deep focus-visible:text-signal-deep"
                    aria-label={`${tx(part.text, locale)}: ${t.categories[part.filter]}, ${t.work.count(counts[part.filter])}`}
                  >
                    {tx(part.text, locale)}
                    <sup aria-hidden className="t-slug ml-[0.15em] align-super text-[0.42em] text-signal-deep">
                      {counts[part.filter]}
                    </sup>
                  </a>
                ) : (
                  <span key={i}>{tx(part.text, locale)}</span>
                ),
              )}
            </p>
          </div>
          <a data-fade href="#trabajo" className="group t-meta hidden w-fit items-center gap-3 md:inline-flex">
            <span className="relative block h-10 w-px overflow-hidden bg-carbon/20" aria-hidden>
              <span className="absolute inset-x-0 top-0 h-1/2 bg-signal motion-safe:animate-[scrollcue_1.8s_ease-in-out_infinite]" />
            </span>
            <span className="link-ink">{t.hero.scroll}</span>
          </a>
        </div>

        <figure
          className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8 lg:-mt-[8.5vw]"
          onMouseEnter={() => hold(activeRef.current)}
          onMouseLeave={() => hold(null)}
        >
          <TransitionLink href={`/projects/${current.slug}/`} className="relative block text-carbon" aria-label={`${t.work.open}: ${current.title}`}>
            <span className="relative block md:rotate-[-1.5deg]">
              <CropMarks />
              <span data-proof className="relative block aspect-[3/2] overflow-hidden bg-carbon">
                {projects.map((p, i) => (
                  <span
                    key={p.slug}
                    ref={(el) => {
                      layers.current[i] = el;
                    }}
                    className="absolute inset-0 block"
                    style={{ zIndex: i === 0 ? 3 : 1, clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                  >
                    <MiniCover p={p} sizes="(min-width: 768px) 42vw, 100vw" priority={i === 0} withAlt={i === active} locale={locale} />
                  </span>
                ))}
              </span>
            </span>
          </TransitionLink>
          <figcaption className="t-slug mt-4 flex items-baseline justify-between gap-4 md:rotate-[-1.5deg]">
            <span className="tabular-nums">
              Prueba {active + 1}/{projects.length}
              <strong className="ml-3 font-bold">{current.title}</strong>
            </span>
            <span className="text-grey-ink">{current.categories.map((c) => t.categories[c]).join(" / ")}</span>
          </figcaption>
        </figure>
      </div>

      {/* ── Control strip: one ink group per project ────────────────────── */}
      <div className="mt-8 flex flex-col gap-3 md:mt-5">
        <div className="flex items-end gap-3">
          <ul aria-label={t.hero.stripLabel} className="flex flex-1 items-end gap-1.5 sm:gap-2" onMouseLeave={() => hold(null)}>
            {projects.map((p, i) => (
              <li key={p.slug} className="flex-1">
                <TransitionLink
                  href={`/projects/${p.slug}/`}
                  onMouseEnter={() => hold(i)}
                  onFocus={() => hold(i)}
                  onBlur={() => hold(null)}
                  aria-label={`${p.title}: ${p.categories.map((c) => t.categories[c]).join(", ")}`}
                  className="group block"
                >
                  <span className="flex h-9 sm:h-11">
                    {p.inks.map((c) => (
                      <span key={c} data-chip className="block flex-1" style={{ background: c, boxShadow: "inset 0 0 0 1px rgba(26,25,24,.12)" }} />
                    ))}
                  </span>
                  <span aria-hidden className="mt-1 block h-[2px] w-full bg-carbon/10">
                    <span
                      ref={(el) => {
                        bars.current[i] = el;
                      }}
                      className="block h-full w-full origin-left bg-carbon"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                  <span className={`t-slug mt-1 block truncate transition-colors ${i === active ? "text-carbon" : "text-grey-ink"} group-hover:text-carbon`}>{p.title}</span>
                </TransitionLink>
              </li>
            ))}
          </ul>
          {/* process patches, as on a real control strip */}
          <div aria-hidden className="hidden h-11 w-36 shrink-0 self-start lg:flex">
            {["#00a0e3", "#e5007e", "#ffed00", "#1a1918", "#5c5a56", "#8b8984", "#b9b7b1"].map((c) => (
              <span key={c} data-chip className="block flex-1" style={{ background: c }} />
            ))}
          </div>
        </div>
        <Slug folio="1" className="text-grey-ink" />
      </div>
    </section>
  );
}
