import type Lenis from "lenis";

/**
 * A tiny module-level handle on the active Lenis instance so client
 * components (mobile menu, lightbox, anchors) can pause or drive scrolling
 * without prop drilling or context re-renders.
 */
let instance: Lenis | null = null;

export const lenisStore = {
  get: () => instance,
  set: (next: Lenis | null) => {
    instance = next;
  },
};

export function lockScroll(locked: boolean) {
  const lenis = instance;
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToTop(smooth: boolean = true) {
  const lenis = instance;
  if (lenis) {
    lenis.scrollTo(0, { immediate: !smooth });
  }
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  }
}

