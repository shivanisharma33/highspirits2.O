"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Desktop-grade motion only: wide viewport, precise pointer, motion allowed. */
export const DESKTOP_MOTION = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
/** Any viewport that allows motion; distances are reduced on small screens by callers. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger };
