"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/format";
import { gsap } from "./gsap";

type Props = {
  children: ReactNode;
  /** Fraction of the element's height it drifts across the viewport pass. */
  speed?: number;
  /** Fixed drift in px either side of rest; overrides `speed` for a capped, subtle move. */
  distance?: number;
  className?: string;
};

/** Scroll-linked vertical drift. Tablet and up only; off for reduced motion. */
export function Parallax({ children, speed = 0.12, distance, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        distance == null ? { yPercent: -speed * 50 } : { y: -distance },
        {
          ...(distance == null ? { yPercent: speed * 50 } : { y: distance }),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, [speed, distance]);

  return (
    <div ref={ref} className={cx("will-change-transform", className)}>
      {children}
    </div>
  );
}
