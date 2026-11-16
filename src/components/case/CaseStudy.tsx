import type { CSSProperties } from "react";
import type { Project, Section } from "@/data/types";
import { nextProject, projects } from "@/data/projects";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { BlockView } from "./Blocks";
import { RunningHead } from "./RunningHead";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Slug } from "@/components/layout/Slug";
import { ProjectCover } from "@/components/project/ProjectCover";

/**
 * Shared case-study architecture. The structure is common; the inks,
 * typeface, surfaces and signature blocks (variety switcher, page-turn,
 * comparison, width-axis words…) come from each project's data.
 */
export function CaseStudy({ p, locale = "es" }: { p: Project; locale?: Locale }) {
  const t = ui(locale);
  const n = projects.indexOf(p) + 1;
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
    <article style={vars} data-project={p.slug}>
      <RunningHead sections={p.sections.map((s) => ({ id: s.id, title: tx(s.title, locale) }))} accent={p.theme.accent} locale={locale} />
      <ProjectCover p={p} n={n} total={projects.length} variant="hero" locale={locale} />
      <CaseIntro p={p} locale={locale} />

      {p.sections.map((s, i) => (
        <CaseSection key={s.id} s={s} i={i} locale={locale} />
      ))}

      {/* Credits */}
      <section aria-labelledby="creditos" className="surface-ink pad-x py-[10vh]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <h2 id="creditos" className="t-headline text-[clamp(1.8rem,3vw,2.6rem)] md:col-span-4">
            {t.case.credits}
          </h2>
          <div className="space-y-3 md:col-span-7 md:col-start-6">
            {p.team?.length ? (
              <ul className="t-meta flex flex-wrap gap-x-5 gap-y-1">
                {p.team.map((m) => (
                  <li key={m.name}>
                    {m.name}
                    {m.me ? <span className="t-slug ml-1 text-signal">(yo)</span> : null}
                    {m.role ? <span className="t-slug ml-1 opacity-70">— {tx(m.role, locale)}</span> : null}
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
        <Slug folio={`${n}.${p.sections.length + 1}`} className="mt-14 text-grey-light" />
      </section>

      {/* Next project: the next sheet on the pile. Opening it morphs its key visual into that case study. */}
      <TransitionLink href={`/projects/${next.slug}/`} className="group block" aria-label={`${t.case.next}: ${next.title}`}>
        <ProjectCover p={next} n={projects.indexOf(next) + 1} total={projects.length} variant="next" locale={locale} />
      </TransitionLink>
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
    <section id="case-intro" aria-label={t.meta.context} className="pad-x pb-[6vh] pt-[2vh]" style={{ background: "var(--p-bg)", color: "var(--p-ink)" }}>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-5 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "color-mix(in srgb, currentColor 28%, transparent)" }}>
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="t-slug opacity-70">{m.label}</dt>
            <dd className="mt-1 max-w-[38ch] text-[0.95rem] leading-snug">{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function CaseSection({ s, i, locale }: { s: Section; i: number; locale: Locale }) {
  const surface = s.surface ?? "project";
  const cls =
    surface === "paper"
      ? "surface-paper"
      : surface === "ink"
        ? "surface-ink"
        : "";
  const style: CSSProperties =
    surface === "project"
      ? { background: "var(--p-bg)", color: "var(--p-ink)" }
      : surface === "alt"
        ? { background: "var(--p-alt)", color: "var(--p-alt-ink)" }
        : {};
  const hasText = Boolean(s.lead || s.body?.length);

  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className={`${cls} relative pad-x py-[12vh]`} style={style}>
      <header className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <span aria-hidden className="t-slug tabular-nums opacity-70">
            {String(i + 1).padStart(2, "0")}
          </span>
          {s.original ? <p className="t-slug mt-1 opacity-60" lang="ca">{s.original}</p> : null}
        </div>
        <div className="md:col-span-9 lg:col-span-8">
          <h2 id={`${s.id}-title`} className="t-headline text-[clamp(2.2rem,5.2vw,5rem)]" style={{ fontFamily: "var(--p-display)" }}>
            {tx(s.title, locale)}
          </h2>
          {hasText ? (
            <div className="mt-6 space-y-4">
              {s.lead ? <p className="t-lead max-w-[40ch]">{tx(s.lead, locale)}</p> : null}
              {s.body?.map((b, k) => (
                <p key={k} className="t-body opacity-90">
                  {tx(b, locale)}
                </p>
              ))}
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
