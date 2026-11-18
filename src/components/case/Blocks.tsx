import type { Block, Media } from "@/data/types";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { Figure } from "./Figure";
import { Palette } from "./Palette";
import { Varieties } from "./Varieties";
import { Spreads } from "./Spreads";
import { Compare } from "./Compare";
import { Words } from "./Words";
import { Picture, getAsset } from "@/components/ui/Picture";
import { ImageReveal } from "@/components/motion/Reveal";

/** Renders one content block of a case study. Layouts are editorial, not card grids. */
export function BlockView({ block, locale = "es" }: { block: Block; locale?: Locale }) {
  const t = ui(locale);
  switch (block.type) {
    case "media":
      return <MediaBlock layout={block.layout} items={block.items} ratio={block.ratio} locale={locale} />;

    case "palette":
      return <Palette colors={block.colors} note={block.note ? tx(block.note, locale) : undefined} locale={locale} />;

    case "specimen":
      return (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <ul className={`space-y-8 ${block.media ? "lg:col-span-5" : "lg:col-span-12 lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0"}`}>
            {block.fonts.map((f) => (
              <li key={f.name} className="rule-t pt-4">
                <p className="text-[clamp(2rem,4vw,3.4rem)] leading-none" style={{ fontFamily: f.family, fontWeight: f.family ? 600 : 800 }}>
                  {f.name}
                </p>
                <p className="t-label mt-3 opacity-75">{tx(f.role, locale)}</p>
                {f.family && f.sample ? (
                  <p className="mt-4 text-[1.35rem] leading-snug" style={{ fontFamily: f.family }}>
                    {f.sample}
                  </p>
                ) : (
                  <p className="t-slug mt-2 opacity-60">Tipografía no disponible en web{block.media ? ": ver la página del manual." : "."}</p>
                )}
              </li>
            ))}
          </ul>
          {block.media ? (
            <div className="lg:col-span-7">
              <Figure media={block.media} sizes="(min-width:1024px) 55vw, 100vw" locale={locale} />
            </div>
          ) : null}
        </div>
      );

    case "steps":
      return (
        <ol className="space-y-16 md:space-y-24">
          {block.steps.map((s, i) => (
            <li key={i} className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="md:col-span-4 lg:col-span-3">
                <p className="t-label opacity-70">Paso</p>
                <span aria-hidden className="mt-1 block text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[0.8] text-[var(--p-accent)]" style={{ fontVariationSettings: '"wdth" 125' }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-headline mt-4 text-[clamp(1.4rem,2vw,1.9rem)]" style={{ fontFamily: "var(--p-display)" }}>
                  <span className="sr-only">Paso {i + 1}: </span>
                  {tx(s.title, locale)}
                </h3>
                <p className="t-body mt-3 text-[0.98rem] opacity-85">{tx(s.body, locale)}</p>
              </div>
              {s.media?.length ? (
                <div className={`grid gap-4 md:col-span-8 lg:col-span-9 ${s.media.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {s.media.map((m) => (
                    <Figure key={m.key} media={m} sizes={s.media!.length > 1 ? "(min-width:768px) 36vw, 100vw" : "(min-width:768px) 70vw, 100vw"} locale={locale} />
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      );

    case "facts":
      return (
        <dl className="rule-t grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3">
          {block.items.map((f) => (
            <div key={tx(f.label, locale)}>
              <dt className="t-label opacity-70">{tx(f.label, locale)}</dt>
              <dd className="mt-1.5 text-[clamp(1.15rem,1rem+0.5vw,1.5rem)] font-semibold leading-tight">{tx(f.value, locale)}</dd>
            </div>
          ))}
        </dl>
      );

    case "quote":
      return (
        <figure className="border-l-2 border-[var(--p-accent)] pl-5 md:pl-8">
          <blockquote className="text-[clamp(2.2rem,6vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.02em]" style={{ fontFamily: "var(--p-display)" }}>
            «{tx(block.text, locale)}»
          </blockquote>
          {block.cite ? <figcaption className="t-label mt-4 opacity-75">{tx(block.cite, locale)}</figcaption> : null}
        </figure>
      );

    case "dodont":
      return (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6">
          {block.items.map((it, i) => (
            <li key={i}>
              <figure>
                <div className="relative">
                  <Picture k={it.media.key} alt={tx(it.media.alt, locale)} sizes="(min-width:768px) 30vw, 50vw" className="block aspect-square" imgClassName="h-full w-full" />
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 grid h-9 w-9 place-items-center text-lg font-bold"
                    style={{ background: it.ok ? "var(--color-carbon)" : "var(--color-signal)", color: it.ok ? "var(--color-paper)" : "var(--color-carbon)" }}
                  >
                    {it.ok ? "✓" : "✕"}
                  </span>
                </div>
                <figcaption className="mt-2.5">
                  <span className="t-label block opacity-60">{it.ok ? "Correcto" : "Incorrecto"}</span>
                  <span className="t-meta mt-0.5 block">{tx(it.label, locale)}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      );

    case "spreads":
      return <Spreads items={block.items} folios={block.folios} locale={locale} />;

    case "varieties":
      return <Varieties varieties={block.varieties} locale={locale} />;

    case "words":
      return <Words words={block.words} />;

    case "compare":
      return <Compare before={block.before} after={block.after} beforeLabel={tx(block.beforeLabel, locale)} afterLabel={tx(block.afterLabel, locale)} locale={locale} />;

    case "annotated":
      return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Figure media={block.media} sizes="(min-width:1024px) 60vw, 100vw" locale={locale} />
          </div>
          <ol className="space-y-5 lg:col-span-4 lg:pt-6">
            {block.notes.map((n, i) => (
              <li key={i} className="rule-t grid grid-cols-[2rem_1fr] gap-3 pt-3">
                <span aria-hidden className="t-label grid h-7 w-7 place-items-center bg-[var(--p-accent)] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="t-meta">{tx(n.title, locale)}</p>
                  <p className="mt-1 text-[0.95rem] leading-snug opacity-85">{tx(n.body, locale)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );

    case "matrix":
      return <Matrix block={block} locale={locale} />;

    case "detail":
      return <Detail media={block.media} crops={block.crops} label={t.zoom.detail} kind={t.imageKinds[block.media.kind]} locale={locale} />;
  }
}

/** The family at a glance: rows = variants, columns = pieces. */
function Matrix({ block, locale }: { block: Extract<Block, { type: "matrix" }>; locale: Locale }) {
  const cols = { gridTemplateColumns: `repeat(${block.columns.length}, minmax(0, 1fr))` };
  return (
    <figure>
      <div aria-hidden className="rule-b hidden pb-3 md:grid md:grid-cols-[11rem_1fr] md:gap-x-6">
        <span />
        <span className="t-label grid gap-x-4 opacity-70" style={cols}>
          {block.columns.map((c) => (
            <span key={tx(c, locale)}>{tx(c, locale)}</span>
          ))}
        </span>
      </div>
      <ul>
        {block.rows.map((r) => (
          <li key={tx(r.label, locale)} className="rule-b grid grid-cols-1 gap-y-4 py-6 md:grid-cols-[11rem_1fr] md:items-center md:gap-x-6">
            <p className="flex items-center gap-3">
              <span aria-hidden className="flex">
                {[r.ground, r.ink].filter(Boolean).map((c) => (
                  <span key={c} className="block h-5 w-3" style={{ background: c, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.12)" }} />
                ))}
              </span>
              <span className="t-cond text-[clamp(1.9rem,2.6vw,2.6rem)]">{tx(r.label, locale)}</span>
            </p>
            <ul className="grid items-end gap-x-3 gap-y-2 md:gap-x-4" style={cols}>
              {r.items.map((m, k) => (
                <li key={m.key}>
                  <figure>
                    <span className="block aspect-[7/8]">
                      <Picture k={m.key} alt={tx(m.alt, locale)} sizes="(min-width:768px) 18vw, 24vw" fit="contain" placeholder={false} className="block h-full w-full" imgClassName="h-full w-full" />
                    </span>
                    <figcaption className="t-label mt-2 text-[0.625rem] opacity-60 md:sr-only">{tx(block.columns[k] ?? "", locale)}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {block.note ? <figcaption className="t-label mt-4 opacity-70">{tx(block.note, locale)}</figcaption> : null}
    </figure>
  );
}

/** The artwork small, with numbered frames; the framed regions enlarged next to it (same pixels, closer). */
function Detail({ media, crops, label, kind, locale }: { media: Media; crops: Extract<Block, { type: "detail" }>["crops"]; label: string; kind: string; locale: Locale }) {
  const a = getAsset(media.key);
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-12 md:items-start">
      <figure className="md:sticky md:top-[calc(var(--header-h)+2rem)] md:col-span-4">
        <span className="relative block" style={{ aspectRatio: `${a.width} / ${a.height}` }}>
          <Picture k={media.key} alt={tx(media.alt, locale)} sizes="(min-width:768px) 32vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full" />
          {crops.map((c, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute border-2 border-signal"
              style={{ left: `${c.rect[0] * 100}%`, top: `${c.rect[1] * 100}%`, width: `${(c.rect[2] - c.rect[0]) * 100}%`, height: `${(c.rect[3] - c.rect[1]) * 100}%` }}
            >
              <span className="t-label absolute -left-[2px] top-0 -translate-y-full bg-signal px-1.5 text-carbon">{i + 1}</span>
            </span>
          ))}
        </span>
        <figcaption className="t-label mt-3 opacity-70">
          {kind} · {label} {crops.length > 1 ? `1–${crops.length}` : "1"}
        </figcaption>
      </figure>
      <div className={`grid items-start gap-6 md:col-span-8 ${crops.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {crops.map((c, i) => {
          const [x0, y0, x1, y1] = c.rect;
          const w = x1 - x0;
          const h = y1 - y0;
          const cap = c.caption ? tx(c.caption, locale) : "";
          const share = crops.length > 1 ? 30 : 62;
          const aspect = (w * a.width) / (h * a.height);
          return (
            <figure key={i} className="w-full" style={{ maxWidth: `calc(80svh * ${aspect.toFixed(3)})` }}>
              <ImageReveal>
                <span className="relative block overflow-hidden" style={{ aspectRatio: `${(w * a.width).toFixed(1)} / ${(h * a.height).toFixed(1)}` }}>
                  <Picture
                    k={media.key}
                    alt={`${label} ${i + 1}${cap ? `: ${cap}` : ""}`}
                    sizes={`(min-width: 768px) ${Math.round(share / w)}vw, ${Math.round(100 / w)}vw`}
                    placeholder={false}
                    className="block"
                    imgClassName="absolute max-w-none"
                    style={{ width: `${100 / w}%`, height: "auto", left: `${(-x0 / w) * 100}%`, top: `${(-y0 / h) * 100}%` }}
                  />
                </span>
              </ImageReveal>
              <figcaption className="t-label mt-3 flex gap-3">
                <span className="text-signal">{i + 1}</span>
                <span className="opacity-80">{cap}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

function MediaBlock({ layout, items, ratio, locale }: { layout: Extract<Block, { type: "media" }>["layout"]; items: Media[]; ratio?: string; locale: Locale }) {
  const F = (m: Media, sizes: string, extra: { className?: string; ratio?: string } = {}) => (
    <Figure key={m.key} media={m} sizes={sizes} className={extra.className} ratio={extra.ratio ?? ratio} locale={locale} />
  );
  switch (layout) {
    case "full":
      return <div className="-mx-[var(--gutter)]">{items.map((m) => F(m, "100vw", { className: "[&_figcaption]:px-[var(--gutter)]" }))}</div>;
    case "wide":
      return <div className="space-y-6">{items.map((m) => F(m, "(min-width:1024px) 92vw, 100vw"))}</div>;
    case "inset":
      return <div className="mx-auto max-w-[min(100%,1100px)] space-y-6">{items.map((m) => F(m, "(min-width:1024px) 70vw, 100vw"))}</div>;
    case "pair":
      return <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6">{items.map((m) => F(m, "(min-width:768px) 48vw, 100vw"))}</div>;
    case "trio":
      return <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-3">{items.map((m) => F(m, "(min-width:640px) 32vw, 100vw", { ratio: m.fit === "contain" ? undefined : "4 / 5" }))}</div>;
    case "grid":
      return <div className="grid grid-cols-2 items-start gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6">{items.map((m) => F(m, "(min-width:768px) 31vw, 50vw"))}</div>;
    case "offset-left":
      return (
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          {items[0] ? F(items[0], "(min-width:768px) 40vw, 100vw", { className: "md:col-span-5" }) : null}
          {items[1] ? F(items[1], "(min-width:768px) 56vw, 100vw", { className: "md:col-span-7 md:mt-[18vh]" }) : null}
        </div>
      );
    case "offset-right":
      return (
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          {items[0] ? F(items[0], "(min-width:768px) 40vw, 100vw", { className: "md:col-span-5 md:col-start-2" }) : null}
          {items[1] ? F(items[1], "(min-width:768px) 48vw, 100vw", { className: "md:col-span-5 md:col-start-8 md:mt-[22vh]" }) : null}
        </div>
      );
    case "tall-pair":
      return (
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          {items[0] ? F(items[0], "(min-width:768px) 33vw, 100vw", { className: "md:col-span-4" }) : null}
          {items[1] ? F(items[1], "(min-width:768px) 64vw, 100vw", { className: "md:col-span-8" }) : null}
        </div>
      );
  }
}
