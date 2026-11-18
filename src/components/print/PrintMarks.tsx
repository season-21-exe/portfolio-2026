/**
 * Print furniture. Purely decorative — aria-hidden.
 */

/** Registration target ⊕ — the portfolio's recurring glyph (wordmark, 404). */
export function RegMark({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 1v22M1 12h22" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  );
}
