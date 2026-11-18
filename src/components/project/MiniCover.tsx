import type { Project } from "@/data/types";
import { tx, type Locale } from "@/lib/i18n";
import { Picture, getAsset } from "@/components/ui/Picture";
import { titleFace } from "@/lib/titleFace";

/**
 * A project's sheet in miniature — same composition as ProjectCover (title
 * behind the object, or masthead over the photo), sized entirely in
 * container units so it works at any scale: the hero proof, the menu
 * preview, the list-view preview. Decorative wrapper; the image keeps its alt
 * only when `alt` is requested.
 */
export function MiniCover({ p, sizes = "40vw", priority = false, withAlt = false, locale = "es" }: { p: Project; sizes?: string; priority?: boolean; withAlt?: boolean; locale?: Locale }) {
  const v = p.visual;
  const a = getAsset(v.media.key);
  const titleColor = v.titleColor ?? p.theme.ink;
  const face = titleFace(p);
  const font = { ...face.style, color: titleColor };
  const alt = withAlt ? tx(v.media.alt, locale) : "";

  if (v.layout === "masthead") {
    const size = `calc(90cqw / ${v.fitEm})`;
    return (
      <span className="absolute inset-0 block overflow-hidden [container-type:size]" style={{ background: p.theme.bg }}>
        <span aria-hidden className={`absolute left-[5cqw] right-[5cqw] top-[6cqh] block leading-[0.84] ${face.className}`} style={{ ...font, fontSize: size }}>
          {p.title}
        </span>
        <span className="absolute inset-x-0 bottom-0 block" style={{ top: `calc(6cqh + ${size} * 0.9 + 4cqh)` }}>
          <Picture k={v.media.key} alt={alt} sizes={sizes} priority={priority} className="block h-full w-full" imgClassName="h-full w-full" style={{ objectPosition: v.focus ?? "50% 50%" }} />
        </span>
      </span>
    );
  }

  const h = (v.scale ?? 0.78) * 92;
  return (
    <span className="absolute inset-0 block overflow-hidden [container-type:size]" style={{ background: p.theme.bg }}>
      <span
        aria-hidden
        className={`absolute inset-x-[4cqw] top-1/2 block -translate-y-1/2 text-center leading-[0.84] ${face.className} [text-wrap:balance]`}
        style={{ ...font, fontSize: `min(calc(92cqw / ${v.fitEm}), 30cqh)` }}
      >
        {p.title}
      </span>
      <span
        className="absolute block"
        style={{
          aspectRatio: `${a.width} / ${a.height}`,
          height: `min(${h}cqh, calc(${v.mode === "object" ? 60 : 90}cqw / ${(a.width / a.height).toFixed(4)}))`,
          ...(v.align === "left" ? { left: "7cqw" } : v.align === "right" ? { right: "7cqw" } : { left: "50%", translate: "-50% 0" }),
          ...(v.valign === "bottom" ? { bottom: "4cqh" } : { top: "50%" }),
          transform: `${v.valign === "bottom" ? "" : "translateY(-50%)"} rotate(${v.tilt ?? 0}deg)`,
          boxShadow: v.shadow === "paper" ? "0 1px 2px rgba(0,0,0,.25), 0 12px 24px -8px rgba(0,0,0,.6)" : undefined,
          filter: v.shadow === "drop" ? "drop-shadow(0 10px 14px rgba(0,0,0,.45))" : undefined,
        }}
      >
        <Picture k={v.media.key} alt={alt} sizes={sizes} priority={priority} placeholder={false} fit="contain" className="block h-full w-full" imgClassName="h-full w-full" />
      </span>
    </span>
  );
}
