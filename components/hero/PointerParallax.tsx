"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode; strength?: number; className?: string };

/**
 * Nudges its content a few pixels against the pointer (max ±strength px).
 * Fine pointers only, paused while off-screen, disabled for reduced motion.
 */
export function PointerParallax({ children, strength = 8, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    let tx = 0,
      ty = 0,
      x = 0,
      y = 0,
      frame = 0,
      running = false,
      visible = true;

    const loop = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05) frame = requestAnimationFrame(loop);
      else running = false;
    };

    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      tx = (e.clientX / window.innerWidth - 0.5) * -2 * strength;
      ty = (e.clientY / window.innerHeight - 0.5) * -2 * strength;
      if (!running) {
        running = true;
        frame = requestAnimationFrame(loop);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
