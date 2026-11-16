import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { tx, type Locale } from "@/lib/i18n";
import { Picture } from "@/components/ui/Picture";
import { TransitionLink } from "@/components/motion/PageTransition";
import { ImageReveal } from "@/components/motion/Reveal";
import { Slug } from "@/components/layout/Slug";

/**
 * "Quién soy" keeps the device from Iván's own PDF portfolio: the word set
 * once solid and echoed in outline, the red-toned polaroid taped to the sheet.
 */
export function About({ locale = "es" }: { locale?: Locale }) {
  const titleOf = (slug: string) => projects.find((p) => p.slug === slug);
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="surface-paper relative pad-x pb-[12vh] pt-[16vh]">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-6">
        {/* polaroid */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
            <ImageReveal className="mx-auto w-[78%] max-w-[420px] -rotate-[4deg] md:w-full">
              <Picture k="personal/retrato-polaroid" alt="Retrato de Iván Ordóñez en una polaroid con tratamiento rojo, sujeta con cinta adhesiva." sizes="(min-width: 768px) 32vw, 78vw" placeholder={false} />
            </ImageReveal>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <h2 id="sobre-mi-title" className="t-display mb-10 text-[clamp(3.2rem,9vw,8.5rem)]" aria-label="Quién soy">
            <span aria-hidden className="block">Quién</span>
            <span aria-hidden className="block text-transparent [-webkit-text-stroke:1.5px_var(--color-signal)]">Quién</span>
            <span aria-hidden className="block -mt-[0.1em]">soy</span>
          </h2>

          <div className="space-y-5">
            <p className="t-lead max-w-[34ch]">{tx(site.bio[0], locale)}</p>
            {site.bio.slice(1).map((b, i) => (
              <p key={i} className="t-body text-carbon/85">
                {tx(b, locale)}
              </p>
            ))}
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-carbon pt-6 sm:grid-cols-2">
            <div>
              <dt className="t-slug mb-3 text-grey-ink">Formación</dt>
              {site.education.map((e) => (
                <dd key={e.period} className="space-y-1">
                  <p className="t-slug tabular-nums">{e.period}</p>
                  <p className="t-meta">{tx(e.title, locale)}</p>
                  <p className="text-[0.95rem] text-grey-ink">{e.place}</p>
                </dd>
              ))}
            </div>
            <div>
              <dt className="t-slug mb-3 text-grey-ink">Experiencia</dt>
              {site.experience.map((e) => (
                <dd key={e.period} className="space-y-1">
                  <p className="t-slug tabular-nums">{e.period}</p>
                  <p className="t-meta">
                    {tx(e.title, locale)} · {e.place}
                  </p>
                  <ul className="mt-1 space-y-0.5 text-[0.95rem] text-grey-ink">
                    {e.tasks.map((task, i) => (
                      <li key={i}>{tx(task, locale)}</li>
                    ))}
                  </ul>
                </dd>
              ))}
            </div>
          </dl>

          {/* Capabilities — a spec sheet, not a skills bar chart */}
          <div className="mt-16">
            <h3 className="t-headline mb-6 text-[clamp(1.8rem,3.2vw,2.8rem)]">Lo que hago</h3>
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Disciplinas que demuestran los proyectos</caption>
              <thead>
                <tr className="t-slug border-b border-carbon text-grey-ink">
                  <th scope="col" className="py-2 pr-4 text-left font-medium">Disciplina</th>
                  <th scope="col" className="py-2 text-right font-medium">Dónde se ve</th>
                </tr>
              </thead>
              <tbody>
                {site.skills.disciplines.map((d) => (
                  <tr key={tx(d.name, locale)} className="border-b border-carbon/20 align-middle">
                    <th scope="row" className="py-4 pr-6 text-left text-[clamp(1.05rem,0.9rem+0.5vw,1.35rem)] font-semibold leading-tight" style={{ fontVariationSettings: '"wdth" 110' }}>
                      {tx(d.name, locale)}
                    </th>
                    <td className="py-4">
                      <span className="flex flex-wrap justify-end gap-1.5">
                        {d.projects.map((slug) => {
                          const p = titleOf(slug);
                          return p ? (
                            <TransitionLink
                              key={slug}
                              href={`/projects/${slug}/`}
                              className="t-slug group inline-flex items-center gap-2 bg-carbon py-1 pl-1 pr-2.5 text-paper transition-colors hover:bg-signal hover:text-carbon"
                            >
                              <span aria-hidden className="flex h-4">
                                {p.inks.map((c) => (
                                  <span key={c} className="block h-4 w-2.5" style={{ background: c }} />
                                ))}
                              </span>
                              {p.title}
                            </TransitionLink>
                          ) : null;
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h4 className="t-slug mb-3 text-grey-ink">Software</h4>
                <ul className="t-meta space-y-1">
                  {site.skills.software.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="t-slug mb-3 text-grey-ink">Me interesa</h4>
                <ul className="t-meta space-y-1">
                  {site.skills.interests.map((s) => (
                    <li key={tx(s, locale)}>{tx(s, locale)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Slug folio="3" className="mt-20 text-grey-ink" />
    </section>
  );
}
