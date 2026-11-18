import type { CSSProperties } from "react";
import type { Project } from "@/data/types";

/**
 * How a project's name is set: in its brand face when Iván supplied one
 * (src/fonts/), otherwise in the site's expanded black capitals.
 */
export function titleFace(p: Project): { className: string; style: CSSProperties } {
  const b = p.theme.brand;
  if (!b) {
    return {
      className: "font-black uppercase tracking-[-0.035em]",
      style: { fontFamily: p.theme.display ?? "var(--font-archivo)", fontVariationSettings: '"wdth" 125' },
    };
  }
  return {
    className: b.upper ? "uppercase" : "",
    style: { fontFamily: b.family, fontWeight: b.weight ?? 400, letterSpacing: 0 },
  };
}
