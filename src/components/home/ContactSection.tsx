"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { TornEdge } from "@/components/print/PrintMarks";
import { Slug } from "@/components/layout/Slug";

const TABS = 14;

/**
 * THE LAST SHEET — a street poster printed solid in the signal ink, with
 * tear-off tabs along the bottom like the ones on a lamp-post flyer.
 * Tearing a tab copies the email (that is its job, not decoration); the
 * address itself is also a plain mailto link. No fake form, real profiles only.
 */
export function ContactSection({ locale = "es" }: { locale?: Locale }) {
  const t = ui(locale);
  const email = site.contact.email;
  const [user, domain] = email.split("@");
  const [torn, setTorn] = useState<boolean[]>(() => Array(TABS).fill(false));
  const [status, setStatus] = useState("");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // How many tabs the poster shows at this width (7 / 10 / 14).
  const [shown, setShown] = useState(TABS);
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const f = () => setShown(md.matches ? 14 : sm.matches ? 10 : 7);
    f();
    md.addEventListener("change", f);
    sm.addEventListener("change", f);
    return () => {
      md.removeEventListener("change", f);
      sm.removeEventListener("change", f);
    };
  }, []);
  const firstOpen = torn.findIndex((x, i) => !x && i < shown);

  // When the last visible tab goes, a fresh row is printed.
  useEffect(() => {
    if (firstOpen !== -1) return;
    const id = window.setTimeout(() => setTorn(Array(TABS).fill(false)), 1600);
    return () => window.clearTimeout(id);
  }, [firstOpen]);

  const tear = async (i: number) => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus(t.contact.copied);
    } catch {
      setStatus(email);
    }
    window.setTimeout(() => setStatus(""), 2600);
    const el = tabs.current[i];
    const done = () => {
      setTorn((s) => s.map((x, k) => (k === i ? true : x)));
      // keep keyboard focus on the poster: move it to the next tab still attached
      window.requestAnimationFrame(() => {
        const next = tabs.current.find((b, k) => b && k !== i && !b.dataset.torn);
        next?.focus({ preventScroll: true });
      });
    };
    if (!el || prefersReducedMotion()) return done();
    el.dataset.torn = "1";
    gsap
      .timeline({ onComplete: done })
      .to(el, { rotate: i % 2 ? 7 : -6, y: -6, duration: 0.12, ease: "power2.out", transformOrigin: "50% 0%" })
      .to(el, { y: "130%", rotate: i % 2 ? 18 : -14, opacity: 0, duration: 0.55, ease: "power2.in" });
  };

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative">
      <div className="relative bg-signal text-carbon">
        <TornEdge color="var(--color-paper)" seed={11} className="absolute inset-x-0 top-0 z-10" />
        <div className="pad-x pb-10 pt-[14vh]">
          <h2 id="contacto-title" className="t-display" style={{ fontSize: "min(calc((100vw - 2 * var(--gutter)) / 7.7), 14rem)" }}>
            Hablemos
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12">
            <p className="t-lead max-w-[30ch] md:col-span-7">{tx(site.contact.invitation, locale)}</p>
            <ul className="t-meta space-y-1 md:col-span-4 md:col-start-9 md:self-end">
              {site.socials.instagram ? (
                <li>
                  <a href={site.socials.instagram.url} target="_blank" rel="noopener noreferrer" className="link-ink">
                    Instagram @{site.socials.instagram.handle}
                  </a>
                </li>
              ) : null}
              {site.socials.linkedin ? (
                <li>
                  <a href={site.socials.linkedin.url} target="_blank" rel="noopener noreferrer" className="link-ink">
                    LinkedIn
                  </a>
                </li>
              ) : null}
              {site.socials.behance ? (
                <li>
                  <a href={site.socials.behance.url} target="_blank" rel="noopener noreferrer" className="link-ink">
                    Behance
                  </a>
                </li>
              ) : null}
              {site.contact.showPhone ? (
                <li>
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="link-ink">
                    {site.contact.phone}
                  </a>
                </li>
              ) : null}
              <li className="text-carbon/70">{tx(site.location, locale)}</li>
            </ul>
          </div>

          <div className="mt-12 border-t-2 border-carbon pt-6">
            <a href={`mailto:${email}`} className="group block w-fit" aria-label={`${t.contact.write}: ${email}`}>
              <span className="t-headline block break-all text-[clamp(1.7rem,5.6vw,5.4rem)] lowercase leading-[1]">
                {user}
                <span className="text-paper">@</span>
                {domain}
              </span>
              <span className="mt-2 block h-[3px] w-full origin-left scale-x-0 bg-carbon transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:scale-x-100" />
            </a>
            <p className="t-slug mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href={`mailto:${email}`} className="t-meta bg-carbon px-4 py-2.5 text-paper transition-colors hover:bg-paper hover:text-carbon">
                {t.contact.write}
              </a>
              <span>o arranca una pestaña para copiarlo</span>
              <span role="status" aria-live="polite" className="t-meta">
                {status}
              </span>
            </p>
          </div>
          <Slug folio="4" className="mt-12" />
        </div>
        {/* perforation */}
        <div aria-hidden className="pad-x">
          <div className="border-t-2 border-dashed border-carbon/60" />
        </div>
      </div>

      {/* Tear-off tabs hang over the footer: a torn tab leaves a gap in the poster. */}
      <div className="relative -mb-px flex bg-carbon pad-x" role="group" aria-label="Pestañas con el email">
        {Array.from({ length: TABS }, (_, i) => (
          <div key={i} className={`relative min-w-0 flex-1 ${i >= 10 ? "hidden md:block" : i >= 7 ? "hidden sm:block" : ""}`}>
            {!torn[i] ? (
              <button
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                tabIndex={i === firstOpen ? 0 : -1}
                aria-hidden={i === firstOpen ? undefined : true}
                aria-label={i === firstOpen ? `${t.contact.copy}: ${email}` : undefined}
                onClick={() => tear(i)}
                className="group flex h-[clamp(8rem,22vw,11.5rem)] w-full items-center justify-center border-x border-dashed border-carbon/45 bg-signal text-carbon transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1"
                style={{ borderLeftWidth: i === 0 ? 0 : 1, borderRightWidth: 0 }}
              >
                <span className="t-slug whitespace-nowrap font-bold [writing-mode:vertical-rl] rotate-180">{email}</span>
              </button>
            ) : (
              <span className="block h-[clamp(8rem,22vw,11.5rem)]" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
