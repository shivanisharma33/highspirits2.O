"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet desktop-only cursor companion. The native cursor stays visible;
 * this dot follows it, swells over interactive elements and shows a short
 * label over media marked with `data-cursor="View"` etc. It also feeds the
 * pointer position to `.glass-spot` surfaces for their spotlight.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const ease = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.22;
    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      frame = 0,
      running = false;

    const render = () => {
      cx += (x - cx) * ease;
      cy += (y - cy) * ease;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(x - cx) > 0.1 || Math.abs(y - cy) > 0.1) frame = requestAnimationFrame(render);
      else running = false;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (el.dataset.visible !== "true") {
        cx = x;
        cy = y;
        el.dataset.visible = "true";
      }
      if (!running) {
        running = true;
        frame = requestAnimationFrame(render);
      }
      const spot = e.target instanceof Element ? e.target.closest<HTMLElement>(".glass-spot") : null;
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${x - r.left}px`);
        spot.style.setProperty("--my", `${y - r.top}px`);
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const media = target.closest<HTMLElement>("[data-cursor]");
      const interactive = target.closest("a, button, [role='button'], input, select, textarea, label, summary");
      if (media && media.dataset.cursor) {
        el.dataset.mode = "label";
        label.textContent = media.dataset.cursor;
      } else {
        el.dataset.mode = interactive ? "hover" : "";
      }
    };

    const onLeave = () => {
      el.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="hs-cursor">
      <div className="hs-cursor-dot">
        <span ref={labelRef} className="hs-cursor-label" />
      </div>
    </div>
  );
}
