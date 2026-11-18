import { site } from "@/config/site";
import { projectNumber, projects } from "@/data/projects";
import { tx, type Locale } from "@/lib/i18n";
import { Picture } from "@/components/ui/Picture";
import { TransitionLink } from "@/components/motion/PageTransition";
import { ImageReveal } from "@/components/motion/Reveal";

/**
 * SOBRE MÍ — the profile, printed on the charcoal sheet: the red-toned
 * polaroid, the introduction, one line of Iván's own words set large, and a
 * data sheet (education, experience, disciplines linked to the projects that
 * show them, software). Only documented facts — see config/site.ts.
 */
export function About({ locale = "es" }: { locale?: Locale }) {
  const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
  return (
    <section id="sobre-mi" data-nav-section="sobre-mi" aria-labelledby="sobre-mi-title" className="surface-ink relative pad-x section-y">
      <header className="rule-b mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 pb-5 md:mb-20">
        <h2 id="sobre-mi-title" className="t-display t-section-title">
          Sobre mí
        </h2>
        <p className="t-label text-grey-light">
          {tx(site.title, locale)} · {tx(site.location, locale)}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12">
        {/* Portrait */}
        <div className="md:col-span-5 lg:col-span-4">
          <figure className="md:sticky md:top-[calc(var(--header-h)+2.5rem)]">
            <ImageReveal className="mx-auto w-[80%] max-w-[460px] -rotate-[3deg] md:mx-0 md:w-[92%]">
              <Picture k="personal/retrato-polaroid" alt="Retrato de Iván Ordóñez en una polaroid con tratamiento rojo, sujeta con cinta adhesiva." sizes="(min-width: 768px) 34vw, 80vw" placeholder={false} />
            </ImageReveal>
            <figcaption className="t-label mt-8 text-grey-light">{site.name}</figcaption>
          </figure>
        </div>

        {/* Introduction + data sheet */}
        <div className="md:col-span-7 lg:col-start-6">
          <p className="t-lead !text-[clamp(1.4rem,1rem+1.3vw,2.4rem)] max-w-[30ch]">{tx(site.bio[0], locale)}</p>

          {/* Pull line — his own words from the third paragraph, set as type. */}
          <p aria-hidden className="t-cond my-14 border-l-2 border-signal pl-5 text-[clamp(2.1rem,4.6vw,4.6rem)] md:my-20 md:pl-7">
            Composiciones con carácter: propuestas que transmiten <span className="text-signal">personalidad y fuerza.</span>
          </p>

          <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-paper/80 lg:grid-cols-2">
            {site.bio.slice(1).map((b, i) => (
              <p key={i} className="t-body">
                {tx(b, locale)}
              </p>
            ))}
          </div>

          <dl className="mt-16 md:mt-24">
            <Row label="Formación">
              {site.education.map((e) => (
                <Entry key={e.period} period={e.period} title={tx(e.title, locale)} place={e.place} />
              ))}
            </Row>
            <Row label="Experiencia">
              {site.experience.map((e) => (
                <Entry key={e.period} period={e.period} title={tx(e.title, locale)} place={e.place}>
                  <ul className="mt-2 space-y-0.5 text-[0.95rem] text-paper/70">
                    {e.tasks.map((task, i) => (
                      <li key={i}>{tx(task, locale)}</li>
                    ))}
                  </ul>
                </Entry>
              ))}
            </Row>
            <Row label="Disciplinas">
              <ul className="divide-y divide-paper/10">
                {site.skills.disciplines.map((d) => (
                  <li key={tx(d.name, locale)} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 lg:flex-row lg:items-baseline lg:justify-between lg:gap-6">
                    <span className="font-semibold">{tx(d.name, locale)}</span>
                    <span className="flex flex-wrap gap-x-4 gap-y-1">
                      {d.projects
                        .map(bySlug)
                        .filter((p): p is NonNullable<typeof p> => Boolean(p))
                        .sort((a, b) => projects.indexOf(a) - projects.indexOf(b))
                        .map((p) => (
                          <TransitionLink key={p.slug} href={`/projects/${p.slug}/`} className="t-label inline-flex items-baseline gap-1.5 text-grey-light transition-colors hover:text-paper focus-visible:text-paper">
                            <span className="text-signal">{projectNumber(p)}</span>
                            <span className="link-ink">{p.title}</span>
                          </TransitionLink>
                        ))}
                    </span>
                  </li>
                ))}
              </ul>
            </Row>
            <Row label="Software">
              <ul className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
                {site.skills.software.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Row>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rule-t grid grid-cols-1 gap-x-6 gap-y-3 py-5 sm:grid-cols-[9.5rem_1fr]">
      <dt className="t-label pt-1 text-grey-light">{label}</dt>
      <dd className="space-y-4">{children}</dd>
    </div>
  );
}

function Entry({ period, title, place, children }: { period: string; title: string; place: string; children?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-[7.5rem_1fr]">
      <span className="t-label pt-1 text-signal">{period}</span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-paper/70">{place}</p>
        {children}
      </div>
    </div>
  );
}
