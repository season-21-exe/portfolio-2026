"use client";

import type { CSSProperties, FocusEvent } from "react";
import { groups, projectNumber, projects } from "@/data/projects";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { TransitionLink } from "@/components/motion/PageTransition";
import { ProjectCover } from "@/components/project/ProjectCover";

/**
 * THE PILE — every project is a full sheet printed in its own inks (ground,
 * ink, display face: see ProjectCover). The sheets are sticky, so as you
 * scroll each new one is laid on top of the last — pure CSS, scrolling stays
 * native (`.pile` in globals.css). Opening a sheet morphs it into its case
 * study. Order = hierarchy: destacados, identidad, editorial.
 */
export function ProjectIndex({ locale = "es" }: { locale?: Locale }) {
  const t = ui(locale);

  // A stuck sheet lies under the ones laid after it. When the keyboard lands on
  // one (Shift+Tab back up the pile), bring it back to its own place.
  const reveal = (e: FocusEvent<HTMLElement>, slug: string) => {
    if ((e.target as HTMLElement).matches(":focus-visible")) document.getElementById(`p-${slug}`)?.scrollIntoView({ block: "start" });
  };

  return (
    <section id="trabajo" data-nav-section="trabajo" aria-labelledby="trabajo-title" className="surface-paper relative">
      <header className="grid grid-cols-12 items-end gap-x-6 gap-y-6 pad-x pb-14 pt-[var(--section-y)]">
        <h2 id="trabajo-title" className="t-display t-section-title col-span-12 md:col-span-8">
          {t.work.title}
        </h2>
        <div className="col-span-12 md:col-span-4 md:pb-[0.6em]">
          <p className="t-lead max-w-[28ch]">Identidad, packaging y diseño editorial: de la idea al objeto impreso.</p>
          <p className="t-label mt-4 text-grey-ink">
            {t.work.count(projects.length)} · {groups.map((g) => g.title).join(" / ")}
          </p>
        </div>
      </header>

      <div className="pile">
        {/* Where each sheet comes to rest. A stuck sheet's own box travels with the
            scroll, so links to a project (/#p-slug) aim at these fixed marks. */}
        {projects.map((p, i) => (
          <span key={p.slug} id={`p-${p.slug}`} aria-hidden className="pile-mark" style={{ "--i": i } as CSSProperties} />
        ))}
        <ol>
          {projects.map((p, i) => (
            <li key={p.slug} data-nav-status={`${projectNumber(p)} ${p.title}`} className="pile-sheet" style={{ zIndex: i + 1 }} onFocus={(e) => reveal(e, p.slug)}>
              <TransitionLink href={`/projects/${p.slug}/`} className="group block" aria-label={`${projectNumber(p)} ${p.title}, ${tx(p.label, locale)}: ${t.work.open}`}>
                <ProjectCover p={p} n={i + 1} variant="index" locale={locale} />
              </TransitionLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
