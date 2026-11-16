"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode, Ref } from "react";

/**
 * NAVIGATION AS A PRINTING GESTURE — native view transitions.
 *
 * Route changes in the App Router are React transitions, so <ViewTransition>
 * boundaries animate on navigation. Every internal link declares a direction:
 *   nav-forward  → going into a project (the sheet is lifted from the pile:
 *                  its key visual and title morph into the case study)
 *   nav-back     → returning to the index
 * The CSS for both lives in globals.css (::view-transition-* rules scoped
 * with :active-view-transition-type). Browsers without the View Transitions
 * API simply navigate.
 */

let arrivedAt = 0;
/** Called on click: lets the destination skip its own intro (the morph is the intro). */
export const markTransitionNav = () => {
  arrivedAt = typeof performance !== "undefined" ? performance.now() : 0;
};
/** True if this page was reached by an in-app navigation in the last few seconds. */
export const arrivedByTransition = () => typeof performance !== "undefined" && arrivedAt > 0 && performance.now() - arrivedAt < 4000;

type Direction = "forward" | "back";

type TLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    direction?: Direction;
    ref?: Ref<HTMLAnchorElement>;
  };

export function TransitionLink({ direction = "forward", onClick, children, ...rest }: TLinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    markTransitionNav();
  };
  return (
    <Link transitionTypes={[direction === "forward" ? "nav-forward" : "nav-back"]} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
