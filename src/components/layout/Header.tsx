"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { site } from "@/config/site";
import { groups, projectNumber, projects } from "@/data/projects";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { TransitionLink } from "@/components/motion/PageTransition";
import { RegMark } from "@/components/print/PrintMarks";
import { MiniCover } from "@/components/project/MiniCover";

const HOME_SECTIONS = ["trabajo", "sobre-mi", "contacto"] as const;

/**
 * SITE NAVIGATION — a compact bar that stays out of the way.
 *  · Over the cover it is transparent; once you scroll it becomes a solid
 *    paper bar with a hairline. Over a project's sheet (the pile, a feature's
 *    cover, the next project) it takes that project's inks, so the sheet runs
 *    edge to edge.
 *  · Home: the active section is marked, and while you browse the work the
 *    bar names the project in view ("03 Cirquera").
 *  · Features: back link, project number and title, current chapter, and a
 *    reading-progress line.
 *  · "Índice" opens the full project index (Esc closes, focus returns).
 */
export function Header({ locale = "es" }: { locale?: Locale }) {
  const t = ui(locale);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [feature, setFeature] = useState<{ num: string; title: string } | null>(null);
  const [sheet, setSheet] = useState<string | null>(null);
  const [fade, setFade] = useState(true);
  const bar = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // ── Scroll state: solid bar, reading progress, the sheet under the bar ───
  useEffect(() => {
    let raf = 0;
    let last: string | null = null;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
        // Sheets laid later lie on top (the pile): the last one under the bar's
        // lower edge lends it its inks. The colour changes the moment a sheet
        // meets the bar — a fade would leave the type unreadable halfway.
        const y = (bar.current?.offsetHeight ?? 56) - 1;
        let under: string | null = null;
        for (const s of document.querySelectorAll<HTMLElement>("[data-sheet]")) {
          const r = s.getBoundingClientRect();
          if (r.top <= y && r.bottom > y) under = s.dataset.sheet ?? null;
        }
        setSheet(under);
        setFade(!under && !last);
        last = under;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // ── Where am I: section on home, project in view, chapter in a feature ────
  useEffect(() => {
    setStatus("");
    setActive(null);
    const article = document.querySelector<HTMLElement>("article[data-project]");
    setFeature(article ? { num: article.dataset.number ?? "", title: article.dataset.title ?? "" } : null);

    // Everything crossing the reading line, in reading order. Sections never
    // overlap; sheets in the pile do — every stuck sheet still spans the line,
    // and the last one laid is the one on top, so the last item names the position.
    const inBand = new Set<HTMLElement>();
    const ordered = (els: HTMLElement[]) => els.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target as HTMLElement);
          else inBand.delete(e.target as HTMLElement);
        }
        const section = ordered([...inBand].filter((el) => el.dataset.navSection))[0];
        const item = ordered([...inBand].filter((el) => el.dataset.navStatus)).at(-1);
        if (section) setActive(section.dataset.navSection!);
        // between items (the work's header, a feature's cover) there is no position to show
        setStatus(item?.dataset.navStatus ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-nav-section], [data-nav-status]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // ── Index overlay ─────────────────────────────────────────────────────────
  useEffect(() => {
    const main = document.getElementById("main");
    const footer = document.getElementById("site-footer");
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      document.documentElement.style.overflow = "hidden";
      const el = panel.current;
      if (el && !prefersReducedMotion()) {
        gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut" });
        gsap.fromTo(el.querySelectorAll("[data-menu-item]"), { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.04, delay: 0.25 });
      }
      window.setTimeout(() => firstLink.current?.focus(), 50);
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const solid = scrolled || !isHome || open;
  const inks = !open && sheet ? projects.find((p) => p.slug === sheet)?.theme : undefined;
  const links = [
    { id: "trabajo", label: t.nav.work },
    { id: "sobre-mi", label: t.nav.about },
    { id: "contacto", label: t.nav.contact },
  ];

  return (
    <>
      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-[80] ${fade ? "transition-[background-color,box-shadow] duration-500" : ""} ${
          open
            ? "bg-carbon text-paper"
            : inks
              ? "bg-[var(--bar-ground)] text-[var(--bar-ink)]"
              : solid
                ? "bg-paper/95 text-carbon shadow-[0_1px_0_var(--color-rule)]"
                : "bg-transparent text-carbon"
        }`}
        style={{ viewTransitionName: "site-header", ...(inks ? { "--bar-ground": inks.bg, "--bar-ink": inks.ink } : {}) } as CSSProperties}
      >
        <div className="flex h-[var(--header-h)] items-center gap-6 pad-x">
          <TransitionLink href="/" direction="back" className="flex shrink-0 items-center gap-2" aria-label={`${site.name}, ${t.nav.home}`}>
            <RegMark size={14} className="text-signal" />
            <span className="text-[0.9rem] font-black uppercase leading-none tracking-[-0.02em]" style={{ fontVariationSettings: '"wdth" 125' }}>
              {site.shortName}
            </span>
          </TransitionLink>

          {isHome ? (
            <nav aria-label={t.nav.primary} className="ml-6 hidden md:block">
              <ul className="flex items-center gap-6">
                {links.map((l) => {
                  const on = active === l.id;
                  return (
                    <li key={l.id}>
                      <a
                        href={sectionHref(l.id)}
                        aria-current={on ? "true" : undefined}
                        className={`t-label group flex items-center gap-2 transition-colors ${on ? "" : "opacity-60 hover:opacity-100"}`}
                      >
                        <span aria-hidden className={`block h-1.5 w-1.5 bg-signal transition-transform duration-300 ${on ? "scale-100" : "scale-0 group-hover:scale-100"}`} />
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : feature ? (
            <nav aria-label={t.nav.primary} className="ml-4 hidden min-w-0 items-center gap-4 md:flex">
              <TransitionLink href={`/#trabajo`} direction="back" className="t-label opacity-60 transition-opacity hover:opacity-100">
                ← {t.nav.work}
              </TransitionLink>
              <span aria-hidden className="h-3 w-px bg-current opacity-25" />
              <span className="t-label flex min-w-0 items-center gap-2">
                <span className={inks ? "opacity-70" : "text-signal-deep"}>{feature.num}</span>
                <span className="truncate">{feature.title}</span>
              </span>
            </nav>
          ) : null}

          <div className="ml-auto flex items-center gap-5">
            <p aria-live="off" className={`t-label hidden max-w-[34ch] truncate transition-opacity duration-300 lg:block ${status && !open ? "opacity-60" : "opacity-0"}`}>
              {status}
            </p>
            <button
              ref={trigger}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((o) => !o)}
              className={`t-label flex items-center gap-2.5 px-3 py-2 transition-colors ${
                open ? "bg-paper text-carbon" : inks ? "bg-[var(--bar-ink)] text-[var(--bar-ground)] hover:bg-signal hover:text-carbon" : "bg-carbon text-paper hover:bg-signal hover:text-carbon"
              }`}
            >
              <span aria-hidden className="relative block h-2 w-3.5">
                <span className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
              </span>
              {open ? t.nav.close : t.nav.index}
            </button>
          </div>
        </div>
        {!isHome && !open ? (
          <div
            role="progressbar"
            aria-label={t.case.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            className="h-[2px] origin-left bg-signal"
            style={{ transform: `scaleX(${progress})` }}
          />
        ) : null}
      </header>

      <div
        id="site-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.index}
        hidden={!open}
        className="surface-ink fixed inset-0 z-[70] overflow-y-auto pad-x pb-10 pt-[calc(var(--header-h)+2.5rem)]"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <nav aria-label={t.work.title} className="space-y-8 lg:col-span-7">
            {groups.map((g) => (
              <div key={g.id}>
                <p className="t-label mb-2 flex justify-between text-grey-light">
                  <span>{g.title}</span>
                  <span>{g.note}</span>
                </p>
                <ol className="border-t border-paper/20">
                  {projects
                    .filter((p) => p.group === g.id)
                    .map((p) => (
                      <li key={p.slug} className="overflow-hidden border-b border-paper/20">
                        <div data-menu-item>
                          <TransitionLink
                            ref={projects.indexOf(p) === 0 ? firstLink : undefined}
                            href={`/projects/${p.slug}/`}
                            onMouseEnter={() => setPreview(p.slug)}
                            onFocus={() => setPreview(p.slug)}
                            onClick={close}
                            className="group flex items-baseline gap-4 py-2.5 md:py-3"
                          >
                            <span className="t-label w-7 shrink-0 text-grey-light">{projectNumber(p)}</span>
                            <span className="t-display text-[clamp(2rem,5.4vw,4.6rem)] transition-colors duration-300 group-hover:text-signal group-focus-visible:text-signal">
                              {p.title}
                            </span>
                            <span className="t-label ml-auto hidden text-right text-grey-light sm:block">{tx(p.label, locale)}</span>
                          </TransitionLink>
                        </div>
                      </li>
                    ))}
                </ol>
              </div>
            ))}
          </nav>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <div aria-hidden className="relative hidden aspect-[4/3] overflow-hidden bg-carbon-2 lg:block">
              {projects.map((p) => (
                <div key={p.slug} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: preview === p.slug ? 1 : 0, background: p.theme.bg }}>
                  {open ? <MiniCover p={p} sizes="40vw" /> : null}
                </div>
              ))}
              {!preview ? <p className="t-label absolute inset-0 grid place-items-center text-grey-light">{t.work.count(projects.length)}</p> : null}
            </div>
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.id} className="overflow-hidden">
                  <a data-menu-item href={sectionHref(l.id)} onClick={close} className="t-cond block text-[clamp(1.8rem,3.4vw,2.8rem)] hover:text-signal">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="t-label text-grey-light">
              {tx(site.title, locale)} · {tx(site.location, locale)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
