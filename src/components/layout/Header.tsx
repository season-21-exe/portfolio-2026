"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { TransitionLink } from "@/components/motion/PageTransition";
import { RegMark } from "@/components/print/PrintMarks";
import { MiniCover } from "@/components/project/MiniCover";

/**
 * Header = two tabs stuck on the proof (legible on any surface), plus a
 * full-screen index menu. Esc closes, focus returns to the trigger, the page
 * behind becomes inert.
 */
export function Header({ locale = "es" }: { locale?: Locale }) {
  const t = ui(locale);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setOpen(false), []);

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
        gsap.fromTo(el.querySelectorAll("[data-menu-item]"), { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.05, delay: 0.25 });
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

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex items-start justify-between pad-x pt-3" style={{ viewTransitionName: "site-header" }}>
        <TransitionLink
          href="/"
          direction="back"
          className="pointer-events-auto flex items-center gap-2 bg-carbon px-3 py-2 text-paper"
          aria-label={`${site.name} — ${t.nav.home}`}
        >
          <RegMark size={16} className="text-signal" />
          <span className="text-[0.95rem] font-black uppercase leading-none tracking-[-0.02em]" style={{ fontVariationSettings: '"wdth" 125' }}>
            {site.shortName}
          </span>
        </TransitionLink>

        <nav aria-label="Principal" className="pointer-events-auto flex items-stretch gap-px">
          <ul className="hidden items-stretch gap-px md:flex">
            {[
              { href: sectionHref("trabajo"), label: t.nav.work },
              { href: sectionHref("sobre-mi"), label: t.nav.about },
              { href: sectionHref("contacto"), label: t.nav.contact },
            ].map((l) => (
              <li key={l.href} className="flex">
                <a href={l.href} className="t-meta flex items-center bg-paper px-3 py-2 text-carbon transition-colors hover:bg-signal">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            ref={trigger}
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
            className="t-meta flex items-center gap-2 bg-carbon px-3 py-2 text-paper transition-colors hover:bg-signal hover:text-carbon"
          >
            <span aria-hidden className="relative block h-2.5 w-4">
              <span className={`absolute left-0 top-0 h-[2px] w-full bg-current transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-[2px] w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </span>
            {open ? t.nav.close : t.nav.index}
          </button>
        </nav>
      </header>

      <div
        id="site-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.index}
        hidden={!open}
        className="surface-ink fixed inset-0 z-[70] overflow-y-auto pad-x pb-10 pt-24"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <nav aria-label={t.work.title} className="lg:col-span-7">
            <ol className="border-t border-paper/20">
              {projects.map((p, i) => (
                <li key={p.slug} className="overflow-hidden border-b border-paper/20">
                  <div data-menu-item>
                    <TransitionLink
                      ref={i === 0 ? firstLink : undefined}
                      href={`/projects/${p.slug}/`}
                      onMouseEnter={() => setPreview(p.slug)}
                      onFocus={() => setPreview(p.slug)}
                      onClick={close}
                      className="group flex items-baseline gap-4 py-3 md:py-4"
                    >
                      <span className="t-slug w-8 shrink-0 text-grey-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="t-display text-[clamp(2.2rem,6.5vw,5.5rem)] transition-colors duration-300 group-hover:text-signal group-focus-visible:text-signal">
                        {p.title}
                      </span>
                      <span className="t-slug ml-auto hidden text-grey-light sm:block">{p.categories.map((c) => t.categories[c]).join(" / ")}</span>
                    </TransitionLink>
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <div aria-hidden className="relative hidden aspect-[4/3] overflow-hidden bg-carbon-2 lg:block">
              {projects.map((p) => (
                <div key={p.slug} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: preview === p.slug ? 1 : 0, background: p.theme.bg }}>
                  {open ? <MiniCover p={p} sizes="40vw" /> : null}
                </div>
              ))}
              {!preview ? <p className="t-slug absolute inset-0 grid place-items-center text-grey-light">{t.work.count(projects.length)}</p> : null}
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { href: sectionHref("trabajo"), label: t.nav.work },
                { href: sectionHref("sobre-mi"), label: t.nav.about },
                { href: sectionHref("contacto"), label: t.nav.contact },
              ].map((l) => (
                <li key={l.href} className="overflow-hidden">
                  <a data-menu-item href={l.href} onClick={close} className="t-headline block text-[clamp(1.6rem,3vw,2.4rem)] hover:text-signal">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="t-slug text-grey-light">
              <a className="link-ink" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              {site.socials.instagram ? (
                <>
                  {"  —  "}
                  <a className="link-ink" href={site.socials.instagram.url} target="_blank" rel="noopener noreferrer">
                    Instagram @{site.socials.instagram.handle}
                  </a>
                </>
              ) : null}
            </p>
            <p className="t-slug text-grey-light">{tx(site.title, locale)} · {tx(site.location, locale)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
