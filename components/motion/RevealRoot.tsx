"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One IntersectionObserver drives every `[data-reveal]` element on the page.
 * Server components declare reveals with plain data attributes (see
 * ./Reveal.tsx), so no per-element client code ships. A MutationObserver picks
 * up elements rendered later (filters, route changes).
 */
export function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    // Track observed elements per effect run, not with a DOM attribute: a marker
    // attribute outlives the cleanup (Strict Mode remount, route change), so the
    // next run would skip every element and nothing would ever reveal. It also
    // mutated server HTML before hydration.
    const observed = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        io.observe(el);
      });
    };
    scan();

    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
