import type { CSSProperties } from "react";
import type { Project, Section } from "@/data/types";
import { nextProject, projectNumber, projects } from "@/data/projects";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { BlockView } from "./Blocks";
import { TransitionLink } from "@/components/motion/PageTransition";
import { ProjectCover } from "@/components/project/ProjectCover";

/**
 * Shared case-study architecture. The structure is common; the inks,
 * typeface, surfaces and signature blocks (variety switcher, family matrix,
 * readable spreads, detail crops, comparison…) come from each project's data.
 *
 * Numbering: the project keeps its exhibition number (02); its chapters are
 * numbered inside it (02.1, 02.2…), so no counter on the page can be read as
 * another project.
 */
export function CaseStudy({ p, locale = "es" }: { p: Project; locale?: Locale }) {
  const t = ui(locale);
  const n = projects.indexOf(p) + 1;
  const num = projectNumber(p);
  const next = nextProject(p.slug);
  const vars = {
    "--p-bg": p.theme.bg,
    "--p-ink": p.theme.ink,
    "--p-accent": p.theme.accent,
    "--p-alt": p.theme.alt,
    "--p-alt-ink": p.theme.altInk,
    "--p-soft": p.theme.soft,
    "--p-display": p.theme.display ?? "var(--font-archivo)",
  } as CSSProperties;

  return (
    <article style={vars} data-project={p.slug} data-number={num} data-title={p.title}>
      <div data-nav-section="portada">
        <ProjectCover p={p} n={n} variant="hero" locale={locale} />
        <CaseIntro p={p} locale={locale} />
      </div>

      {p.sections.map((s, i) => (
        <CaseSection key={s.id} s={s} label={`${num}.${i + 1}`} locale={locale} />
      ))}

      {/* Credits */}
      <section aria-labelledby="creditos" data-nav-status={t.case.credits} className="surface-ink pad-x py-[12vh]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="t-label text-grey-light">
              {num} · {p.title}
            </p>
            <h2 id="creditos" className="t-cond mt-2 text-[clamp(2.6rem,5vw,4.6rem)]">
              {t.case.credits}
            </h2>
          </div>
          <div className="space-y-4 md:col-span-7 md:col-start-6 md:pt-8">
            {p.team?.length ? (
              <ul className="rule-b flex flex-wrap gap-x-6 gap-y-2 pb-4 text-[1.05rem] font-semibold">
                {p.team.map((m) => (
                  <li key={m.name}>
                    {m.name}
                    {m.me ? <span className="t-label ml-2 text-signal">Yo</span> : null}
                    {m.role ? <span className="t-label ml-2 opacity-70">{tx(m.role, locale)}</span> : null}
                  </li>
                ))}
              </ul>
            ) : null}
            {p.credits.map((c, i) => (
              <p key={i} className="t-body text-[0.98rem] text-paper/80">
                {tx(c, locale)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Next project: the next sheet on the pile. Opening it morphs its key visual into that case study. */}
      <div data-nav-status={`${t.case.next} · ${projectNumber(next)} ${next.title}`}>
        <TransitionLink href={`/projects/${next.slug}/`} className="group block" aria-label={`${t.case.next}: ${next.title}`}>
          <ProjectCover p={next} n={projects.indexOf(next) + 1} variant="next" locale={locale} />
        </TransitionLink>
      </div>
    </article>
  );
}

/** Facts under the opening sheet: what it is, where it comes from, who did what. */
function CaseIntro({ p, locale }: { p: Project; locale: Locale }) {
  const t = ui(locale);
  const meta: { label: string; value: string }[] = [
    { label: t.meta.disciplines, value: p.disciplines.map((d) => tx(d, locale)).join(", ") },
    { label: t.meta.context, value: tx(p.context, locale) },
  ];
  if (p.role) meta.push({ label: t.meta.role, value: tx(p.role, locale) });
  if (p.team?.length) meta.push({ label: t.meta.team, value: p.team.map((m) => m.name).join(", ") });
  if (p.tools.length) meta.push({ label: t.meta.tools, value: p.tools.join(", ") });
  if (p.year) meta.push({ label: t.meta.year, value: p.year });
  return (
    <section id="case-intro" aria-label={t.meta.context} className="pad-x pb-[8vh] pt-[2vh]" style={{ background: "var(--p-bg)", color: "var(--p-ink)" }}>
      <dl className="rule-t grid grid-cols-1 gap-x-6 gap-y-6 pt-5 sm:grid-cols-2 lg:grid-cols-4">
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="t-label opacity-70">{m.label}</dt>
            <dd className="mt-1.5 max-w-[38ch] text-[0.98rem] leading-snug">{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function CaseSection({ s, label, locale }: { s: Section; label: string; locale: Locale }) {
  const surface = s.surface ?? "project";
  const cls = surface === "paper" ? "surface-paper" : surface === "ink" ? "surface-ink" : "";
  const style: CSSProperties =
    surface === "project" ? { background: "var(--p-bg)", color: "var(--p-ink)" } : surface === "alt" ? { background: "var(--p-alt)", color: "var(--p-alt-ink)" } : {};
  const hasText = Boolean(s.lead || s.body?.length);
  const title = tx(s.title, locale);

  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} data-nav-status={`${label} ${title}`} className={`${cls} relative pad-x py-[12vh]`} style={style}>
      <header className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="t-label flex items-center gap-2 opacity-75">
            <span aria-hidden className="block h-2 w-2 bg-[var(--p-accent)]" />
            {label}
          </p>
          {s.original ? (
            <p className="t-slug mt-2 max-w-[30ch] opacity-60">
              Manual · <span lang="ca">{s.original}</span>
            </p>
          ) : null}
        </div>
        <div className="md:col-span-9 lg:col-span-8">
          <h2 id={`${s.id}-title`} className="t-headline text-[clamp(2.4rem,5.6vw,5.6rem)]" style={{ fontFamily: "var(--p-display)" }}>
            {title}
          </h2>
          {hasText ? (
            <div className="mt-7 space-y-4">
              {s.lead ? <p className="t-lead max-w-[40ch]">{tx(s.lead, locale)}</p> : null}
              {s.body?.length ? (
                <div className={`grid grid-cols-1 gap-x-8 gap-y-4 ${s.body.length > 1 ? "lg:grid-cols-2" : ""}`}>
                  {s.body.map((b, k) => (
                    <p key={k} className="t-body opacity-90">
                      {tx(b, locale)}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>

      {s.blocks?.length ? (
        <div className="mt-14 space-y-[10vh] md:mt-20">
          {s.blocks.map((b, k) => (
            <BlockView key={k} block={b} locale={locale} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
