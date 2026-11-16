"use client";

import { useState } from "react";
import type { Swatch } from "@/data/types";
import { tx, type Locale } from "@/lib/i18n";
import { isDark } from "@/lib/color";

/** Ink chips in the manner of a swatch book. Click a chip to copy its HEX. */
export function Palette({ colors, note, locale = "es" }: { colors: Swatch[]; note?: string; locale?: Locale }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable: the value is visible anyway */
    }
  };
  const cols = colors.length >= 5 ? "lg:grid-cols-5" : colors.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <div>
      <ul className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${cols}`}>
        {colors.map((c) => {
          const dark = isDark(c.hex);
          return (
            <li key={c.hex + tx(c.name, locale)} className="bg-white text-[#1a1918] shadow-[0_1px_0_rgba(0,0,0,.08)]">
              <button
                type="button"
                onClick={() => copy(c.hex)}
                className="group relative block aspect-[4/3] w-full text-left"
                style={{ background: c.hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.08)" }}
                aria-label={`Copiar ${c.hex}`}
              >
                <span className={`t-slug absolute bottom-2 left-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${dark ? "text-white" : "text-black"}`}>
                  {copied === c.hex ? "Copiado" : "Copiar HEX"}
                </span>
              </button>
              <div className="space-y-0.5 p-3">
                <p className="t-meta">{tx(c.name, locale)}</p>
                <p className="t-slug tabular-nums">{c.hex.toUpperCase()}</p>
                {c.cmyk ? <p className="t-slug tabular-nums opacity-70">{c.cmyk}</p> : null}
                {c.rgb ? <p className="t-slug tabular-nums opacity-70">RGB {c.rgb}</p> : null}
                {c.pms ? <p className="t-slug tabular-nums opacity-70">{c.pms}</p> : null}
                {c.use ? <p className="pt-2 text-[0.85rem] leading-snug opacity-80">{tx(c.use, locale)}</p> : null}
              </div>
            </li>
          );
        })}
      </ul>
      <p role="status" aria-live="polite" className="sr-only">
        {copied ? `${copied} copiado` : ""}
      </p>
      {note ? <p className="t-slug mt-3 opacity-70">{note}</p> : null}
    </div>
  );
}
