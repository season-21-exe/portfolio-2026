import { site } from "@/config/site";
import { ui } from "@/i18n/ui";
import type { Locale } from "@/lib/i18n";
import { Slug } from "./Slug";

export function Footer({ locale = "es" }: { locale?: Locale }) {
  const t = ui(locale);
  const year = new Date().getFullYear();
  return (
    <footer id="site-footer" className="surface-ink pad-x pb-6 pt-10">
      <div className="flex flex-col gap-6 border-t border-paper/20 pt-5 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="t-meta">
            © {year} {site.name}
          </p>
          <p className="t-slug max-w-[60ch] text-grey-light">{t.footer.rights}</p>
        </div>
        <div className="flex items-center gap-6">
          <a className="t-meta link-ink" href={`mailto:${site.contact.email}`}>
            Email
          </a>
          {site.socials.instagram ? (
            <a className="t-meta link-ink" href={site.socials.instagram.url} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          ) : null}
          {site.socials.linkedin ? (
            <a className="t-meta link-ink" href={site.socials.linkedin.url} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          ) : null}
          {site.socials.behance ? (
            <a className="t-meta link-ink" href={site.socials.behance.url} target="_blank" rel="noopener noreferrer">
              Behance
            </a>
          ) : null}
          <a className="t-meta link-ink" href="#top">
            {t.footer.top}
          </a>
        </div>
      </div>
      <Slug folio="∞" className="mt-8 text-grey-light" />
    </footer>
  );
}
