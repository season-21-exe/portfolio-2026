import assets from "@/data/assets.generated.json";
import type { AssetKey } from "@/data/types";
import type { CSSProperties } from "react";

type Asset = (typeof assets)[AssetKey];

export const getAsset = (key: AssetKey): Asset => assets[key];

export interface PictureProps {
  k: AssetKey;
  alt: string;
  /** `sizes` attribute — describe the rendered width so the browser picks the right file. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  fit?: "cover" | "contain";
  style?: CSSProperties;
  /** Show the blurred placeholder while loading (default for opaque images). */
  placeholder?: boolean;
}

/**
 * Responsive <picture>: AVIF → WebP, explicit intrinsic size (no layout
 * shift), lazy by default, blurred placeholder for opaque images.
 */
export function Picture({ k, alt, sizes = "100vw", priority = false, className = "", imgClassName = "", fit = "cover", style, placeholder = true }: PictureProps) {
  const a = assets[k];
  if (!a) throw new Error(`Unknown asset key: ${k}`);
  const srcSet = (ext: string) => a.widths.map((w) => `${a.src}-${w}.${ext} ${w}w`).join(", ");
  const fallbackW = a.widths.find((w) => w >= 1200) ?? a.widths[a.widths.length - 1];
  const bg: CSSProperties =
    placeholder && !a.alpha ? { backgroundImage: `url(${a.placeholder})`, backgroundSize: "cover", backgroundPosition: "center" } : {};
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`${a.src}-${fallbackW}.webp`}
        width={a.width}
        height={a.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={imgClassName}
        style={{ objectFit: fit, ...bg, ...style }}
      />
    </picture>
  );
}
