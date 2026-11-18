import type { Media } from "@/data/types";
import { ui } from "@/i18n/ui";
import { tx, type Locale, type T } from "@/lib/i18n";
import { Picture, getAsset } from "@/components/ui/Picture";
import { ImageReveal } from "@/components/motion/Reveal";
import { Loupe } from "./Loupe";

/**
 * Publication pages at reading size. Each spread is set as large as the
 * viewport allows (full measure, never taller than the screen) and opens at
 * full resolution in the loupe. If the sequence starts with a portrait cover,
 * the cover stands next to the issue's contents, linking to each spread.
 */
export function Spreads({ items, folios, locale = "es" }: { items: Media[]; folios?: T[]; locale?: Locale }) {
  const t = ui(locale);
  const folio = (n: number) => (folios?.[n] ? tx(folios[n], locale) : undefined);
  const first = items[0] ? getAsset(items[0].key) : null;
  const hasCover = Boolean(first && first.width < first.height && items.length > 1);
  const pages = hasCover ? items.slice(1) : items;
  const offset = hasCover ? 1 : 0;

  return (
    <div className="space-y-[10vh]">
      {hasCover ? (
        <div className="grid grid-cols-1 items-end gap-x-6 gap-y-10 md:grid-cols-12">
          <figure className="md:col-span-6 lg:col-span-5">
            <Sheet media={items[0]} label={folio(0)} locale={locale} sizes="(min-width: 768px) 40vw, 100vw" />
            <Caption label={folio(0)} kind={t.imageKinds[items[0].kind]} hint={t.zoom.read} />
          </figure>
          <nav aria-label={t.zoom.contents} className="md:col-span-6 lg:col-span-6 lg:col-start-7">
            <p className="t-label mb-4 opacity-70">{t.zoom.contents}</p>
            <ol className="rule-t">
              {pages.map((m, i) => (
                <li key={m.key} className="rule-b">
                  <a href={`#pliego-${i + offset}`} className="group grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 py-3">
                    <span className="t-label">{folio(i + offset)}</span>
                    <span className="text-[0.95rem] leading-snug opacity-85">{sentence(tx(m.alt, locale).replace(/^P[áa]ginas? [\d y]+: /, ""))}</span>
                    <span aria-hidden className="t-label transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      ) : null}

      {pages.map((m, i) => {
        const a = getAsset(m.key);
        const ratio = a.width / a.height;
        const n = i + offset;
        return (
          <figure key={m.key} id={`pliego-${n}`} className="mx-auto scroll-mt-[calc(var(--header-h)+1rem)]" style={{ width: `min(100%, calc((100svh - var(--header-h) - 5.5rem) * ${ratio.toFixed(4)}))` }}>
            <Sheet media={m} label={folio(n)} locale={locale} sizes="(min-width: 1024px) 80vw, 100vw" />
            <Caption label={folio(n)} kind={t.imageKinds[m.kind]} hint={t.zoom.read} />
          </figure>
        );
      })}
    </div>
  );
}

/** First letter up, once the "Páginas 6 y 7:" prefix is gone. */
const sentence = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function Sheet({ media, label, sizes, locale }: { media: Media; label?: string; sizes: string; locale: Locale }) {
  const a = getAsset(media.key);
  return (
    <ImageReveal>
      <Loupe media={media} label={label} locale={locale}>
        <span className="block shadow-[0_2px_3px_rgba(0,0,0,.18),0_30px_60px_-30px_rgba(0,0,0,.5)]" style={{ aspectRatio: `${a.width} / ${a.height}` }}>
          <Picture k={media.key} alt={tx(media.alt, locale)} sizes={sizes} className="block h-full w-full" imgClassName="h-full w-full" />
        </span>
      </Loupe>
    </ImageReveal>
  );
}

function Caption({ label, kind, hint }: { label?: string; kind: string; hint: string }) {
  return (
    <figcaption className="t-label mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <span>
        {label ? <span className="mr-3">{label}</span> : null}
        <span className="opacity-60">{kind}</span>
      </span>
      <span className="opacity-60">{hint}</span>
    </figcaption>
  );
}
