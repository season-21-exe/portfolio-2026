import type { Block, Media } from "@/data/types";
import { tx, type Locale } from "@/lib/i18n";
import { Figure } from "./Figure";
import { Palette } from "./Palette";
import { Varieties } from "./Varieties";
import { Spreads } from "./Spreads";
import { Compare } from "./Compare";
import { Words } from "./Words";
import { Picture } from "@/components/ui/Picture";

/** Renders one content block of a case study. Layouts are editorial, not card grids. */
export function BlockView({ block, locale = "es" }: { block: Block; locale?: Locale }) {
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
              <li key={f.name} className="border-t border-current pt-4">
                <p className="text-[clamp(2rem,4vw,3.4rem)] leading-none" style={{ fontFamily: f.family, fontWeight: f.family ? 600 : 800 }}>
                  {f.name}
                </p>
                <p className="t-body mt-3 text-[0.98rem] opacity-85">{tx(f.role, locale)}</p>
                {f.family && f.sample ? (
                  <p className="mt-4 text-[1.35rem] leading-snug" style={{ fontFamily: f.family }}>
                    {f.sample}
                  </p>
                ) : (
                  <p className="t-slug mt-3 opacity-60">Tipografía no disponible en web: ver muestrario.</p>
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
                <span aria-hidden className="block text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[0.8] text-[var(--p-accent)]" style={{ fontVariationSettings: '"wdth" 125' }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-headline mt-4 text-[clamp(1.4rem,2vw,1.9rem)]" style={{ fontFamily: "var(--p-display)" }}>
                  {tx(s.title, locale)}
                </h3>
                <p className="t-body mt-3 text-[0.98rem] opacity-85">{tx(s.body, locale)}</p>
              </div>
              {s.media?.length ? (
                <div className={`grid gap-4 md:col-span-8 lg:col-span-9 ${s.media.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {s.media.map((m) => (
                    <Figure key={m.key} media={m} sizes="(min-width:768px) 40vw, 100vw" locale={locale} />
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      );

    case "facts":
      return (
        <dl className="grid grid-cols-1 gap-6 border-t border-current pt-6 sm:grid-cols-3">
          {block.items.map((f) => (
            <div key={tx(f.label, locale)}>
              <dt className="t-slug opacity-70">{tx(f.label, locale)}</dt>
              <dd className="t-meta mt-1 text-[1.05rem]">{tx(f.value, locale)}</dd>
            </div>
          ))}
        </dl>
      );

    case "quote":
      return (
        <figure className="border-l-4 border-[var(--p-accent)] pl-5 md:pl-8">
          <blockquote className="text-[clamp(2.2rem,6vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.02em]" style={{ fontFamily: "var(--p-display)" }}>
            «{tx(block.text, locale)}»
          </blockquote>
          {block.cite ? <figcaption className="t-slug mt-4 opacity-75">{tx(block.cite, locale)}</figcaption> : null}
        </figure>
      );

    case "dodont":
      return (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {block.items.map((it, i) => (
            <li key={i}>
              <figure>
                <div className="relative">
                  <Picture k={it.media.key} alt={tx(it.media.alt, locale)} sizes="(min-width:768px) 30vw, 50vw" className="block aspect-square" imgClassName="h-full w-full" />
                  <span
                    aria-hidden
                    className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full text-lg font-bold"
                    style={{ background: it.ok ? "#1a1918" : "#ff3d17", color: it.ok ? "#e8e7e2" : "#1a1918" }}
                  >
                    {it.ok ? "✓" : "✕"}
                  </span>
                </div>
                <figcaption className="t-meta mt-2">
                  <span className="sr-only">{it.ok ? "Correcto: " : "Incorrecto: "}</span>
                  {tx(it.label, locale)}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      );

    case "spreads":
      return <Spreads items={block.items} locale={locale} />;

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
              <li key={i} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-current pt-3">
                <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-[var(--p-accent)] text-[0.8rem] font-bold text-white">
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
  }
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
      return <div className="mx-auto max-w-[min(100%,960px)] space-y-6">{items.map((m) => F(m, "(min-width:1024px) 60vw, 100vw"))}</div>;
    case "pair":
      return <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6">{items.map((m) => F(m, "(min-width:768px) 46vw, 100vw"))}</div>;
    case "trio":
      return <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-3">{items.map((m) => F(m, "(min-width:640px) 31vw, 100vw", { ratio: m.fit === "contain" ? undefined : "4 / 5" }))}</div>;
    case "grid":
      return <div className="grid grid-cols-2 items-start gap-4 md:grid-cols-3 md:gap-6">{items.map((m) => F(m, "(min-width:768px) 30vw, 50vw"))}</div>;
    case "offset-left":
      return (
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          {items[0] ? F(items[0], "(min-width:768px) 38vw, 100vw", { className: "md:col-span-5" }) : null}
          {items[1] ? F(items[1], "(min-width:768px) 54vw, 100vw", { className: "md:col-span-7 md:mt-[18vh]" }) : null}
        </div>
      );
    case "offset-right":
      return (
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          {items[0] ? F(items[0], "(min-width:768px) 38vw, 100vw", { className: "md:col-span-5 md:col-start-2" }) : null}
          {items[1] ? F(items[1], "(min-width:768px) 46vw, 100vw", { className: "md:col-span-5 md:col-start-8 md:mt-[22vh]" }) : null}
        </div>
      );
    case "tall-pair":
      return (
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          {items[0] ? F(items[0], "(min-width:768px) 33vw, 100vw", { className: "md:col-span-4" }) : null}
          {items[1] ? F(items[1], "(min-width:768px) 62vw, 100vw", { className: "md:col-span-8" }) : null}
        </div>
      );
  }
}
