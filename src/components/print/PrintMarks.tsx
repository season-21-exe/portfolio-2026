/**
 * Print furniture: crop marks, registration marks and torn paper edges.
 * Purely decorative — all aria-hidden.
 */

/** Four L-shaped crop marks sitting just outside the trim of the parent (parent must be `relative`). Hidden below lg: on narrow screens the gutter is smaller than the marks. */
export function CropMarks({ size = 14, offset = 8, className = "" }: { size?: number; offset?: number; className?: string }) {
  const s = size;
  const o = offset;
  const pos = [
    { key: "tl", style: { top: -(o + s), left: -(o + s) }, d: `M0 ${s - 0.5}H${s} M${s - 0.5} 0V${s}` },
    { key: "tr", style: { top: -(o + s), right: -(o + s) }, d: `M0 ${s - 0.5}H${s} M0.5 0V${s}` },
    { key: "bl", style: { bottom: -(o + s), left: -(o + s) }, d: `M0 0.5H${s} M${s - 0.5} 0V${s}` },
    { key: "br", style: { bottom: -(o + s), right: -(o + s) }, d: `M0 0.5H${s} M0.5 0V${s}` },
  ];
  return (
    <>
      {pos.map((p) => (
        <svg key={p.key} aria-hidden width={s} height={s} viewBox={`0 0 ${s} ${s}`} className={`pointer-events-none absolute max-lg:hidden ${className}`} style={p.style}>
          <path d={p.d} stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      ))}
    </>
  );
}

/** Registration target ⊕ — the portfolio's recurring glyph. */
export function RegMark({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 1v22M1 12h22" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  );
}

/** Seeded pseudo-random so torn edges render identically on server and client. */
function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Torn paper edge between two surfaces. `color` is the paper being torn
 * (the surface ABOVE when `edge="bottom"`). Fibres are a lighter rim.
 */
export function TornEdge({ color, seed = 7, edge = "bottom", height = 28, className = "" }: { color: string; seed?: number; edge?: "top" | "bottom"; height?: number; className?: string }) {
  const r = rng(seed);
  const W = 1200;
  const steps = 90;
  const pts: string[] = [];
  let y = height * 0.45;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W + (r() - 0.5) * 6;
    y += (r() - 0.5) * height * 0.38;
    y = Math.max(height * 0.12, Math.min(height * 0.92, y));
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const path = `M0,0 L${pts.join(" L")} L${W},0 Z`;
  const fibre = `M${pts.join(" L")}`;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${height}`}
      preserveAspectRatio="none"
      className={`pointer-events-none block w-full ${className}`}
      style={{ height, transform: edge === "top" ? "scaleY(-1)" : undefined }}
    >
      <path d={path} fill={color} />
      <path d={fibre} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
