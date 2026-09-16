"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, MOTION_OK } from "./gsap";

type Props = {
  children: ReactNode;
  from?: number;
  to?: number;
  origin?: string;
  className?: string;
};

/** Typography that grows into place as it travels up the viewport. */
export function ScrollScale({ children, from = 0.78, to = 1, origin = "left bottom", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        el,
        { scale: from, transformOrigin: origin },
        {
          scale: to,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.6 },
        },
      );
    });
    return () => mm.revert();
  }, [from, to, origin]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
