"use client";

import Image from "next/image";
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, Close } from "@/components/ui/Icons";
import type { GalleryItem } from "@/lib/content/gallery";
import { lockScroll } from "@/lib/lenis";

type Props = { items: GalleryItem[]; index: number; onClose: () => void; onIndex: (i: number) => void };

const pad = (n: number) => String(n).padStart(2, "0");

/** Fullscreen photo viewer: keyboard, swipe, focus trap, restores focus on close. */
export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const [dir, setDir] = useState(0);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const item = items[index];

  const go = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeBtn.current?.focus();
    return () => {
      lockScroll(false);
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const nodes = dialog.current?.querySelectorAll<HTMLElement>("button");
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  if (!item) return null;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.45 } }}
        className="fixed inset-0 z-[80] flex flex-col bg-hs-green-deep/[0.97]"
        data-lenis-prevent
      >
        <div className="shell flex h-20 shrink-0 items-center justify-between">
          <p className="text-xs tracking-[0.3em] text-hs-cream/70">
            <span className="text-hs-gold">{pad(index + 1)}</span> / {pad(items.length)}
            <span className="ml-4 hidden uppercase tracking-[0.24em] sm:inline">{item.category}</span>
          </p>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="grid h-12 w-12 place-items-center rounded-full border border-hs-gold/50 text-hs-gold transition-colors hover:bg-hs-gold hover:text-hs-green-deep"
          >
            <Close size={18} />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-4 md:px-24" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <m.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, x: dir * -60, transition: { duration: 0.35 } }}
              className="flex max-h-full flex-col items-center"
            >
              <Image
                src={item.src}
                alt={item.alt || ""}
                width={typeof item.src === "string" ? (item.width || 1600) : undefined}
                height={typeof item.src === "string" ? (item.height || 1200) : undefined}
                sizes="(min-width: 768px) 80vw, 100vw"
                placeholder={typeof item.src !== "string" ? "blur" : undefined}
                className="h-auto max-h-[calc(100svh-12rem)] w-auto max-w-full select-none object-contain"
                draggable={false}
              />
              <figcaption className="mt-4 max-w-xl text-center text-sm text-hs-cream/70">{item.alt}</figcaption>
            </m.figure>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-hs-gold/50 text-hs-gold transition-colors hover:bg-hs-gold hover:text-hs-green-deep sm:grid md:left-8"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-hs-gold/50 text-hs-gold transition-colors hover:bg-hs-gold hover:text-hs-green-deep sm:grid md:right-8"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <p className="pb-6 text-center text-[0.62rem] uppercase tracking-[0.28em] text-hs-cream/40 sm:hidden">Swipe to browse</p>
      </m.div>
    </LazyMotion>
  );
}
