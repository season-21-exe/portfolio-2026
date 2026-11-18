"use client";

import { useRef, ViewTransition, type CSSProperties, type ElementType } from "react";
import type { Project } from "@/data/types";
import { groups } from "@/data/projects";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { isDark } from "@/lib/color";
import { titleFace } from "@/lib/titleFace";
import { gsap, useGSAP } from "@/lib/gsap";
import { Picture, getAsset } from "@/components/ui/Picture";
import { TransitionLink, arrivedByTransition } from "@/components/motion/PageTransition";

/**
 * PROJECT COVER — one project, printed as a full sheet in its own inks.
 *
 *   index → its sheet in the home pile (the whole sheet is the link)
 *   hero  → the opening of the case study
 *   next  → the next sheet at the end of a case study
 *
 * The key visual and the title carry shared view-transition names, so when a
 * sheet is opened the browser morphs them from the pile into the case study:
 * the same object, going deeper — not a page swap.
 */
export type CoverVariant = "index" | "hero" | "next";

/** Shared-element morph only on typed in-app navigations; never on filter changes etc. */
const SHARE = { "nav-forward": "morph", "nav-back": "morph", default: "none" };
/** Photographs change crop between the exhibition card and the feature: morph them as filled frames. */
const SHARE_PHOTO = { "nav-forward": "morph-photo", "nav-back": "morph-photo", default: "none" };

export function ProjectCover({ p, n, variant, locale = "es" }: { p: Project; n: number; variant: CoverVariant; locale?: Locale }) {
  const t = ui(locale);
  const root = useRef<HTMLDivElement>(null);
  const v = p.visual;
  const ground = p.theme.bg;
  const ink = p.theme.ink;
  const dark = isDark(ground);
  const titleColor = v.titleColor ?? ink;
  const a = getAsset(v.media.key);
  const ratio = a.width / a.height;
  const isHero = variant === "hero";
  const face = titleFace(p);
  const Title: ElementType = isHero ? "h1" : variant === "index" ? "h3" : "p";
  const num = String(n).padStart(2, "0");
  const group = groups.find((g) => g.id === p.group)?.title;
  const cats = tx(p.label, locale);
  const who = p.authorship === "individual" ? t.work.individual : t.work.team;

  // Title fitted to the measure (longest word, measured in the project's own face), capped by height.
  const titleSize = `min(calc((100vw - 2 * var(--gutter)) / ${v.fitEm}), ${!isHero ? "32svh" : v.layout === "masthead" ? "26svh" : "34svh"})`;

  // Direct visits get a short printed intro; arriving through a morph, the morph *is* the intro.
  useGSAP(
    () => {
      if (!isHero || arrivedByTransition()) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.15 })
          .from("[data-line]", { yPercent: 104, duration: 1.1 })
          .fromTo("[data-plate]", { x: "-0.5em", opacity: 0 }, { x: "0.035em", opacity: 1, duration: 1.3, ease: "expo.inOut" }, 0.05)
          .from("[data-object]", { yPercent: 8, opacity: 0, duration: 1.3 }, 0.2)
          .from("[data-row]", { opacity: 0, y: 10, duration: 0.8, stagger: 0.08 }, 0.55);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const plate = (
    <span
      aria-hidden
      data-plate
      className={`pointer-events-none absolute inset-0 block ${dark ? "mix-blend-screen" : "mix-blend-multiply"} ${
        isHero ? "" : "opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-[0.04em] group-hover:opacity-100 group-focus-visible:translate-x-[0.04em] group-focus-visible:opacity-100"
      }`}
      style={{ color: p.theme.accent, ...(isHero ? { transform: "translateX(0.035em)" } : {}) }}
    >
      {p.title}
    </span>
  );

  const title = (
    <ViewTransition name={`vt-title-${p.slug}`} share={SHARE} default="none">
      <Title
        className={`relative flow-root leading-[0.84] ${face.className} ${isHero && v.layout === "behind" ? "text-center" : ""}`}
        style={{ ...face.style, fontSize: titleSize, color: titleColor, textWrap: "balance" }}
      >
        <span className="relative -mt-[0.22em] block overflow-hidden pb-[0.04em] pt-[0.22em]">
          <span data-line className="block">
            {p.title}
          </span>
        </span>
        {plate}
      </Title>
    </ViewTransition>
  );

  const shadow: CSSProperties =
    v.shadow === "paper" ? { boxShadow: "0 2px 3px rgba(0,0,0,.25), 0 34px 70px -24px rgba(0,0,0,.65)" } : v.shadow === "drop" ? { filter: "drop-shadow(0 34px 44px rgba(0,0,0,.45))" } : {};

  const topRow = (
    <div data-row className="t-slug relative z-30 flex items-baseline justify-between gap-6 opacity-80">
      {variant === "hero" ? (
        <nav aria-label="Migas" className="flex gap-3">
          <TransitionLink href={`/#p-${p.slug}`} direction="back" className="link-ink">
            {t.work.title}
          </TransitionLink>
          <span aria-hidden>/</span>
          <span aria-current="page" className="tabular-nums">
            {num} {p.title}
          </span>
        </nav>
      ) : (
        <span className="tabular-nums">
          {variant === "next" ? (
            t.case.next
          ) : (
            <>
              {num}
              {group ? <span className="mx-2 opacity-60">·</span> : null}
              {group}
            </>
          )}
        </span>
      )}
      <span className="text-right">
        {cats}
        <span className="mx-2 opacity-60">/</span>
        {who}
      </span>
    </div>
  );

  const bottomRow = (
    <div data-row className="relative z-30 grid grid-cols-1 items-end gap-4 md:grid-cols-12">
      <p className={`max-w-[46ch] text-[0.98rem] leading-snug md:col-span-7 lg:col-span-5 ${isHero ? "t-lead !text-[clamp(1.1rem,0.9rem+0.8vw,1.6rem)]" : ""}`}>
        {tx(isHero ? p.tagline : p.summary, locale)}
      </p>
      {isHero ? (
        <a href="#case-intro" className="t-meta justify-self-start md:col-span-3 md:col-start-10 md:justify-self-end">
          <span className="link-ink">{t.case.scroll}</span>
        </a>
      ) : (
        <span
          className="t-meta justify-self-start px-3 py-2 transition-colors duration-300 group-hover:!bg-signal group-hover:!text-carbon md:col-span-3 md:col-start-10 md:justify-self-end"
          style={{ background: titleColor, color: ground }}
        >
          {t.work.open}
        </span>
      )}
    </div>
  );

  return (
    <ViewTransition name={`vt-sheet-${p.slug}`} share={SHARE} default="none">
    <div
      ref={root}
      data-sheet={p.slug}
      className="relative isolate flex h-[100svh] min-h-[560px] flex-col overflow-hidden pad-x pb-5 pt-[calc(var(--header-h)+0.6rem)]"
      style={{ background: ground, color: ink }}
    >
      {topRow}

      {!isHero ? (
        <>
          {/* The key visual, large and faint behind the name: the project's own inks lead. */}
          <ViewTransition name={`vt-visual-${p.slug}`} share={SHARE_PHOTO} default="none">
            <div data-object aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <Picture
                k={v.media.key}
                alt=""
                sizes="100vw"
                className="block h-full w-full"
                imgClassName={`h-full w-full object-cover grayscale ${dark ? "opacity-[0.1] mix-blend-luminosity" : "opacity-[0.12] mix-blend-multiply"} transition-[opacity,transform] duration-[1.4s] ease-[var(--ease-out-quint)] group-hover:scale-[1.03] ${dark ? "group-hover:opacity-[0.18]" : "group-hover:opacity-[0.2]"}`}
                style={{ objectPosition: v.backdropFocus ?? v.focus ?? "50% 50%" }}
              />
            </div>
          </ViewTransition>
          <div className="relative z-10 my-4 flex min-h-0 flex-1 flex-col justify-center">{title}</div>
        </>
      ) : v.layout === "masthead" ? (
        <>
          <div className="relative z-10 mt-3">{title}</div>
          <ViewTransition name={`vt-visual-${p.slug}`} share={SHARE_PHOTO} default="none">
            <div data-object className="relative -mx-[var(--gutter)] my-4 min-h-0 flex-1 overflow-hidden">
              <Picture
                k={v.media.key}
                alt={tx(v.media.alt, locale)}
                sizes="100vw"
                priority={isHero}
                className="block h-full w-full"
                imgClassName="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-out-quint)] group-hover:scale-[1.03]"
                style={{ objectPosition: v.focus ?? "50% 50%" }}
              />
            </div>
          </ViewTransition>
        </>
      ) : (
        <div className="relative my-3 min-h-0 flex-1 [container-type:size]">
          {/* Phones: masthead on top, object standing below it. From md: title behind the object, magazine-cover style. */}
          <div className="absolute inset-x-0 top-0 z-10 md:top-1/2 md:-translate-y-1/2">{title}</div>
          <ViewTransition name={`vt-visual-${p.slug}`} share={SHARE} default="none">
            <div
              data-object
              className="absolute bottom-0 left-1/2 right-auto top-auto z-20 [height:var(--hm)] [transform:rotate(var(--rot))] [translate:-50%_0] md:bottom-[var(--b)] md:left-[var(--l)] md:right-[var(--r)] md:top-[var(--t)] md:[height:var(--hd)] md:[transform:translateY(var(--ty))_rotate(var(--rot))] md:[translate:var(--tx)_0]"
              style={
                {
                  aspectRatio: `${a.width} / ${a.height}`,
                  "--hd": `min(${Math.min(0.97, (v.scale ?? 0.78) * (isHero ? 1.08 : 1)) * 100}cqh, calc(${isHero ? 0.6 : 0.56} * 100cqw / ${ratio.toFixed(4)}))`,
                  "--hm": `min(76cqh, calc(0.86 * 100cqw / ${ratio.toFixed(4)}))`,
                  "--l": v.align === "left" ? "7cqw" : v.align === "right" ? "auto" : "50%",
                  "--r": v.align === "right" ? "7cqw" : "auto",
                  "--tx": v.align === "left" || v.align === "right" ? "0%" : "-50%",
                  "--t": v.valign === "bottom" ? "auto" : "50%",
                  "--b": v.valign === "bottom" ? "0px" : "auto",
                  "--ty": v.valign === "bottom" ? "0%" : "-50%",
                  "--rot": `${v.tilt ?? 0}deg`,
                } as CSSProperties
              }
            >
              <div className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:-translate-y-[1.5%]" style={v.shadow === "paper" ? shadow : undefined}>
                <Picture
                  k={v.media.key}
                  alt={tx(v.media.alt, locale)}
                  sizes="(min-width: 768px) 56vw, 90vw"
                  priority={isHero}
                  placeholder={false}
                  fit="contain"
                  className="block h-full w-full"
                  imgClassName="h-full w-full"
                  style={v.shadow === "drop" ? shadow : undefined}
                />
              </div>
            </div>
          </ViewTransition>
        </div>
      )}

      {bottomRow}
    </div>
    </ViewTransition>
  );
}
