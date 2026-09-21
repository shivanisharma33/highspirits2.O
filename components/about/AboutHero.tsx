"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Aurora } from "@/components/ui/Aurora";

export function AboutHero() {
  const handleScrollToMission = () => {
    const el = document.getElementById("mission-title");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden bg-hs-green-deep text-hs-cream pt-[calc(var(--header-h)+3.5rem)] pb-16 md:pt-[calc(var(--header-h)+5rem)] md:pb-20"
    >
      {/* ─── 1. Cinematic Background Image with Gentle Ken Burns Drift ─── */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/images/about-hero-bg.jpg"
          alt="High Spirits luxury Indian fine dining room atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* ─── 2. Luxury Emerald & Vignette Overlays for Depth & Legibility ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-t from-hs-green-deep via-[#041911]/85 to-hs-green-deep/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,13,8,0.7)_80%)]"
      />
      <Aurora className="z-[2] opacity-40" />

      {/* Ambient Glow Blooms */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 z-[2] h-[500px] w-[500px] rounded-full bg-hs-gold/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 z-[2] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[140px]"
      />

      {/* ─── 3. Main Foreground Content ─── */}
      <div className="shell relative z-10 my-auto">
        <div className="max-w-4xl">
          {/* Top Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-hs-gold/30 bg-hs-gold/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-hs-gold-pale backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-hs-gold animate-pulse" />
            <span>ABOUT US · 1/57 VICTORIA STREET</span>
          </motion.div>

          {/* Brand Tag */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-xs font-bold uppercase tracking-[0.35em] text-hs-gold sm:text-sm"
          >
            High Spirits
          </motion.p>

          {/* Grand Main Headline */}
          <motion.h1
            id="about-hero-title"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-4 text-4xl font-normal tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem] leading-[1.04]"
          >
            The Story
            <br />
            Behind{" "}
            <span className="text-gold-gradient italic font-normal">
              High Spirits
            </span>
          </motion.h1>
        </div>
      </div>

      {/* ─── 4. Bottom Interactive Scroll Cue ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 mt-8 flex flex-col items-center justify-center text-center"
      >
        <button
          type="button"
          onClick={handleScrollToMission}
          className="group flex flex-col items-center gap-2 text-xs uppercase tracking-[0.26em] text-hs-gold/80 hover:text-hs-gold transition-colors cursor-pointer"
          aria-label="Scroll down to discover our mission"
        >
          <span>Discover Our Story</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-hs-gold/30 bg-hs-gold/10 text-hs-gold group-hover:border-hs-gold"
          >
            ↓
          </motion.span>
        </button>
      </motion.div>

      {/* Bottom Hairline Separator with Golden Flare */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-hs-gold/40 to-transparent"
      />
    </section>
  );
}
