"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Custom eases expressed as GSAP strings */
export const EASE = { print: "expo.inOut", out: "expo.out", soft: "power2.out" } as const;

export { gsap, ScrollTrigger, Flip, useGSAP };
