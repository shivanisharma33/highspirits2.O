"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { lenisStore } from "@/lib/lenis";
import { cx } from "@/lib/format";
import { DESKTOP_MOTION, gsap } from "./gsap";

type Props = {
  children: ReactNode;
  label: string;
  className?: string;
  trackClassName?: string;
  barTrackClassName?: string;
  barFillClassName?: string;
};

/**
 * Vertical scroll → horizontal travel on desktop (GSAP pin + scrub).
 * Everywhere else the track is a native, swipeable scroll-snap row.
 */
export function HorizontalScroll({
  children,
  label,
  className,
  trackClassName,
  barTrackClassName,
  barFillClassName,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    const rail = track.current;
    if (!section || !rail) return;

    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      section.dataset.pinned = "true";
      const distance = () => Math.max(0, rail.scrollWidth - section.clientWidth);

      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // Keyboard users: move the page so a focused panel is in view.
      const onFocus = (e: FocusEvent) => {
        const panel = (e.target as HTMLElement).closest<HTMLElement>("[data-panel]");
        const st = tween.scrollTrigger;
        if (!panel || !st) return;
        section.scrollLeft = 0;
        const progress = Math.min(1, panel.offsetLeft / Math.max(1, distance()));
        const y = st.start + (st.end - st.start) * progress;
        const lenis = lenisStore.get();
        if (lenis) lenis.scrollTo(y, { immediate: true });
        else window.scrollTo({ top: y });
      };
      section.addEventListener("focusin", onFocus);

      return () => {
        section.removeEventListener("focusin", onFocus);
        delete section.dataset.pinned;
        gsap.set(rail, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-label={label} className={cx("hscroll relative overflow-hidden", className)}>
      <div ref={track} className={cx("hscroll-track", trackClassName)}>
        {children}
      </div>
      <div aria-hidden className="shell pointer-events-none mt-10 hidden lg:block">
        <div className={cx("h-px w-full bg-hs-cream/15", barTrackClassName)}>
          <div ref={bar} className={cx("h-px w-full origin-left scale-x-0 bg-hs-gold", barFillClassName)} />
        </div>
      </div>
    </section>
  );
}
