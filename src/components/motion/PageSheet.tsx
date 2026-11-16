import { ViewTransition, type ReactNode } from "react";

/**
 * Page-level boundary for navigations (React only animates what sits inside
 * <ViewTransition> boundaries; the document root is left static).
 *   nav-forward → the old page sinks back, the new page is laid on top like
 *                 a fresh sheet (or, when the clicked sheet is on screen, the
 *                 sheet itself morphs — see ProjectCover).
 *   nav-back    → a quick cross-dissolve back to the pile.
 * Untyped transitions (browser back/forward) do nothing special.
 */
export function PageSheet({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "page-lay", "nav-back": "page-fade-in", default: "none" }}
      exit={{ "nav-forward": "page-sink", "nav-back": "page-fade-out", default: "none" }}
      default="none"
    >
      <div>{children}</div>
    </ViewTransition>
  );
}
