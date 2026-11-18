import type { Media } from "@/data/types";
import { ui } from "@/i18n/ui";
import { tx, type Locale } from "@/lib/i18n";
import { Picture, getAsset } from "@/components/ui/Picture";
import { ImageReveal } from "@/components/motion/Reveal";

/**
 * A figure in a case study. Every image carries a small label saying what
 * it is (render, mockup, arte final, obra de terceros…) — the brief asks for
 * that distinction to be explicit.
 */
export function Figure({
  media,
  sizes = "100vw",
  className = "",
  frameClassName = "",
  ratio,
  priority = false,
  reveal = true,
  captionClassName = "",
  locale = "es",
}: {
  media: Media;
  sizes?: string;
  className?: string;
  frameClassName?: string;
  ratio?: string;
  priority?: boolean;
  reveal?: boolean;
  captionClassName?: string;
  locale?: Locale;
}) {
  const t = ui(locale);
  const a = getAsset(media.key);
  const contain = media.fit === "contain";
  const frame = (
    <div
      className={`relative overflow-hidden ${contain ? "p-[clamp(0.5rem,2vw,1.75rem)]" : ""} ${frameClassName}`}
      style={{ background: contain ? media.ground ?? "var(--p-soft, var(--color-paper-2))" : undefined, aspectRatio: ratio }}
    >
      <Picture
        k={media.key}
        alt={tx(media.alt, locale)}
        sizes={sizes}
        priority={priority}
        className={`block ${ratio ? "h-full w-full" : "w-full"}`}
        imgClassName={`${ratio ? "h-full w-full" : "h-auto w-full"}`}
        fit={contain ? "contain" : "cover"}
        placeholder={!contain && !a.alpha}
      />
    </div>
  );
  return (
    <figure className={className}>
      {reveal && !priority ? <ImageReveal>{frame}</ImageReveal> : frame}
      <figcaption className={`mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 ${captionClassName}`}>
        <span className="t-label opacity-60">{t.imageKinds[media.kind]}</span>
        {media.caption ? <span className="text-[0.85rem] leading-snug opacity-90">{tx(media.caption, locale)}</span> : null}
      </figcaption>
    </figure>
  );
}
