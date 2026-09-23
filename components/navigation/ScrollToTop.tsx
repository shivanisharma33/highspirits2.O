"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@/components/ui/Icons";
import { scrollToTop } from "@/lib/lenis";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setVisible(window.scrollY > 400);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => scrollToTop(true)}
      aria-label="Scroll to top of page"
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#031710]/90 text-hs-gold border border-hs-gold/40 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(212,175,55,0.2)] backdrop-blur-md transition-all duration-300 hover:bg-hs-gold hover:text-[#031710] hover:scale-110 active:scale-95 animate-in fade-in zoom-in cursor-pointer"
    >
      <ArrowUp size={16} />
    </button>
  );
}
