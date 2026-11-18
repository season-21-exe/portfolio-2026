"use client";

import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { ui } from "@/i18n/ui";
import type { Locale } from "@/lib/i18n";

/**
 * Colophon. On the home page the contact section sits right above it, so it
 * stays a single line; on the other pages it also carries the way to get in
 * touch (the only place the address appears there).
 */
export function Footer({ locale = "es" }: { locale?: Locale }) {
  const t = ui(locale);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const year = new Date().getFullYear();
  return (
    <footer id="site-footer" className="surface-ink pad-x pb-6 pt-8">
      {!isHome ? (
        <div className="rule-b mb-6 grid grid-cols-1 gap-x-6 gap-y-3 pb-8 md:grid-cols-12 md:items-end">
          <p className="t-cond text-[clamp(2.4rem,6vw,5.5rem)] md:col-span-5">Hablemos</p>
          <ul className="t-meta flex flex-wrap gap-x-6 gap-y-2 md:col-span-7 md:justify-end">
            <li>
              <a className="link-ink" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </li>
            {site.socials.instagram ? (
              <li>
                <a className="link-ink" href={site.socials.instagram.url} target="_blank" rel="noopener noreferrer">
                  Instagram @{site.socials.instagram.handle}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
      <div className="t-label flex flex-col gap-3 text-grey-light md:flex-row md:items-baseline md:justify-between md:gap-8">
        <p className="text-paper">
          © {year} {site.name}
        </p>
        <p className="max-w-[70ch] normal-case tracking-normal">{t.footer.rights}</p>
        <a className="link-ink self-start text-paper md:self-auto" href="#top">
          {t.footer.top} ↑
        </a>
      </div>
    </footer>
  );
}
