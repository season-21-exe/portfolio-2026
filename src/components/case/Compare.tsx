"use client";

import { useState } from "react";
import type { Media } from "@/data/types";
import { tx, type Locale } from "@/lib/i18n";
import { Picture } from "@/components/ui/Picture";

/**
 * Before/after wipe for photographic direction (incorrecto vs. correcto).
 * A native range input drives it — keyboard and screen-reader friendly.
 */
export function Compare({ before, after, beforeLabel, afterLabel, locale = "es" }: { before: Media; after: Media; beforeLabel: string; afterLabel: string; locale?: Locale }) {
  const [pos, setPos] = useState(50);
  return (
    <figure>
      <div className="relative aspect-[1265/935] w-full select-none overflow-hidden">
        <Picture k={after.key} alt={tx(after.alt, locale)} sizes="(min-width:1024px) 70vw, 100vw" className="absolute inset-0 block h-full w-full" imgClassName="h-full w-full" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Picture k={before.key} alt={tx(before.alt, locale)} sizes="(min-width:1024px) 70vw, 100vw" className="absolute inset-0 block h-full w-full" imgClassName="h-full w-full" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-[2px] bg-[var(--p-accent,#ff3d17)]" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--p-accent,#ff3d17)] text-white">⇆</span>
        </div>
        <span className="t-slug absolute left-3 top-3 bg-black/70 px-2 py-1 text-white">✕ {beforeLabel}</span>
        <span className="t-slug absolute right-3 top-3 bg-black/70 px-2 py-1 text-white">✓ {afterLabel}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Comparar: ${beforeLabel} / ${afterLabel}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="t-slug mt-2.5 opacity-70">Referencias de dirección fotográfica · arrastra para comparar</figcaption>
    </figure>
  );
}
