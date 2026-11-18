"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * CONTRAPORTADA — the back cover. It repeats the cover's device (black type,
 * a red plate sliding into register) for the one call to action that matters:
 * the email, set as large as the measure allows. One address, one copy
 * button, the real profiles only.
 */
export function ContactSection({ locale = "es" }: { locale?: Locale }) {
  const t = ui(locale);
  const email = site.contact.email;
  const [user, domain] = email.split("@");
  const [status, setStatus] = useState("");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.from(el.querySelectorAll("[data-line]"), { yPercent: 104, duration: 1.1, stagger: 0.08 })
          .fromTo(el.querySelector("[data-plate]"), { x: "-0.45em", opacity: 0 }, { x: "0.04em", opacity: 1, duration: 1.3, ease: "expo.inOut" }, 0.1)
          .from(el.querySelector("[data-rule]"), { scaleX: 0, transformOrigin: "left", duration: 1, ease: "expo.inOut" }, 0.3)
          .from(el.querySelectorAll("[data-fade]"), { opacity: 0, y: 12, duration: 0.8, stagger: 0.07 }, 0.5);
        const io = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            io.disconnect();
            tl.play();
          },
          { rootMargin: "0px 0px -25% 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus(t.contact.copied);
    } catch {
      setStatus(email);
    }
    window.setTimeout(() => setStatus(""), 2600);
  };

  return (
    <section ref={root} id="contacto" data-nav-section="contacto" aria-labelledby="contacto-title" className="surface-paper relative overflow-hidden pad-x pb-10 pt-[var(--section-y)]">
      <div className="t-label rule-b flex items-baseline justify-between gap-6 pb-3 text-grey-ink">
        <span>Contacto</span>
        <span>{tx(site.location, locale)}</span>
      </div>

      {/* HABLEMOS — set across the measure, the plate prints a hair out of register */}
      <h2 id="contacto-title" className="relative mt-6 select-none [container-type:inline-size]">
        <span className="t-display relative flow-root [font-size:calc(100cqi_/_7.4)]">
          <span className="relative -mt-[0.2em] block overflow-hidden pb-[0.03em] pt-[0.2em]">
            <span data-line className="block">
              Hablemos
            </span>
          </span>
          <span aria-hidden data-plate className="pointer-events-none absolute inset-0 block text-signal mix-blend-multiply" style={{ transform: "translateX(0.04em)" }}>
            <span className="-mt-[0.2em] block pb-[0.03em] pt-[0.2em]">Hablemos</span>
          </span>
        </span>
      </h2>

      <span data-rule aria-hidden className="mt-5 block h-[2px] w-full bg-carbon" />

      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-12">
        <p data-fade className="t-lead max-w-[30ch] md:col-span-7">
          {tx(site.contact.invitation, locale)}
        </p>
        <ul data-fade className="space-y-2 md:col-span-4 md:col-start-9 md:self-end">
          {site.socials.instagram ? (
            <li className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3">
              <span className="t-label text-grey-ink">Instagram</span>
              <a href={site.socials.instagram.url} target="_blank" rel="noopener noreferrer" className="t-meta link-ink justify-self-start">
                @{site.socials.instagram.handle}
              </a>
            </li>
          ) : null}
          {site.socials.linkedin ? (
            <li className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3">
              <span className="t-label text-grey-ink">LinkedIn</span>
              <a href={site.socials.linkedin.url} target="_blank" rel="noopener noreferrer" className="t-meta link-ink justify-self-start">
                {site.socials.linkedin.handle}
              </a>
            </li>
          ) : null}
          {site.socials.behance ? (
            <li className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3">
              <span className="t-label text-grey-ink">Behance</span>
              <a href={site.socials.behance.url} target="_blank" rel="noopener noreferrer" className="t-meta link-ink justify-self-start">
                {site.socials.behance.handle}
              </a>
            </li>
          ) : null}
          {site.contact.showPhone ? (
            <li className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3">
              <span className="t-label text-grey-ink">Teléfono</span>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="t-meta link-ink justify-self-start">
                {site.contact.phone}
              </a>
            </li>
          ) : null}
        </ul>
      </div>

      {/* The address, as large as the line allows: two lines on phones, one from md. */}
      <div data-fade className="mt-16 md:mt-24 [container-type:inline-size]">
        <p className="t-label mb-3 text-grey-ink">Email</p>
        <a href={`mailto:${email}`} className="group relative block w-full" aria-label={`${t.contact.write}: ${email}`}>
          <span className="block font-[750] lowercase leading-[0.95] tracking-[-0.045em] [font-size:calc(100cqi_/_7.93)] [font-variation-settings:'wdth'_100] md:[font-size:calc(100cqi_/_13.7)]">
            <span className="block md:inline">{user}</span>
            <span className="block md:inline">
              <span className="text-signal transition-colors duration-300 group-hover:text-carbon">@</span>
              {domain}
            </span>
          </span>
          <span aria-hidden className="mt-3 block h-[3px] w-full origin-left scale-x-[0.18] bg-signal transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
        </a>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="button" onClick={copy} className="t-label inline-flex items-center gap-2 border border-carbon px-3 py-2 transition-colors hover:bg-carbon hover:text-paper focus-visible:bg-carbon focus-visible:text-paper">
            <span aria-hidden className="block h-2 w-2 bg-signal" />
            {t.contact.copy}
          </button>
          <span role="status" aria-live="polite" className="t-label text-grey-ink">
            {status}
          </span>
        </div>
      </div>
    </section>
  );
}
