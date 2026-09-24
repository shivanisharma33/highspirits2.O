"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Aurora } from "@/components/ui/Aurora";
import { ArrowRight, ArrowUpRight, ChevronDown } from "@/components/ui/Icons";
import { experiences } from "@/lib/content/experiences";
import { cx } from "@/lib/format";

/**
 * Signature Experiences — Interactive Luxury Expanding Accordion
 * Sleek vertical panels on desktop that expand on hover/click to display
 * the pristine photograph alongside its curated story, with zero awkward overlaps.
 */
export function ExperienceScroller() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const total = String(experiences.length).padStart(2, "0");

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handlePanelHover = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
    }, 140);
  };

  const handlePanelClick = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveIndex(index);
  };

  return (
    <section
      aria-labelledby="experiences-title"
      className="grain relative bg-hs-green-deep py-20 md:py-28 lg:py-32 overflow-hidden text-hs-cream"
    >
      <Aurora />

      {/* Ambient Luxury Blooms */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-hs-gold/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[150px]"
      />

      <div className="shell relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 md:pb-12 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3.5">
              Extraordinary moments
            </p>
            <h2
              id="experiences-title"
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-white tracking-tight"
            >
              Signature{" "}
              <em className="text-gold-gradient italic font-normal">
                Experiences
              </em>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-hs-cream/75 leading-relaxed font-sans">
              Curated exclusively for the discerning palate, each experience is a
              masterpiece of culinary artistry and impeccable hospitality on
              Victoria Street.
            </p>

          </div>
        </div>

        {/* ── DESKTOP & LAPTOP: Interactive Expanding Accordion ── */}
        <div
          role="region"
          aria-label="Signature experiences accordion"
          className="hidden md:flex h-[560px] lg:h-[600px] w-full gap-2.5 lg:gap-3 rounded-[2.5rem] border border-hs-gold/25 bg-[#010c07]/85 p-3 lg:p-3.5 backdrop-blur-2xl overflow-hidden"
        >
          {experiences.map((exp, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={exp.slug}
                onClick={() => handlePanelClick(i)}
                onMouseEnter={() => handlePanelHover(i)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePanelClick(i);
                  }
                }}
                className={cx(
                  "relative h-full overflow-hidden rounded-[1.8rem] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isActive
                    ? "flex-[4.2] lg:flex-[4.5] border border-hs-gold/40 cursor-default"
                    : "flex-[0.7] lg:flex-[0.8] border border-white/10 hover:border-hs-gold/50 cursor-pointer bg-[#02140d]/60 group"
                )}
              >
                {/* ── INACTIVE SLAT VIEW ── */}
                {!isActive && (
                  <div className="absolute inset-0 flex flex-col justify-between items-center py-6 px-2 select-none">
                    {/* Background Preview Ghost */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <Image
                        src={exp.image.src}
                        alt=""
                        fill
                        sizes="100px"
                        className="object-cover opacity-20 grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-35 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-[#02130c]/85" />
                    </div>

                    {/* Top Index */}
                    <span className="relative z-10 font-display text-2xl text-hs-gold/80 transition-colors group-hover:text-hs-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Vertical Title */}
                    <span className="relative z-10 [writing-mode:vertical-rl] rotate-180 uppercase tracking-[0.26em] text-xs font-semibold text-hs-cream/70 group-hover:text-white transition-colors truncate max-h-[300px]">
                      {exp.title}
                    </span>

                    {/* Bottom Indicator */}
                    <div className="relative z-10 flex flex-col items-center gap-1.5 text-hs-gold/60 group-hover:text-hs-gold transition-colors">
                      <span className="h-1.5 w-1.5 rounded-full bg-hs-gold" />
                      <ArrowRight size={13} className="rotate-90 group-hover:translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                )}

                {/* ── ACTIVE EXPANDED PANEL VIEW ── */}
                {isActive && (
                  <div
                    key={`active-panel-${exp.slug}`}
                    className="relative z-10 flex h-full w-full"
                  >
                    {/* Left: 100% Unobstructed Clean Image */}
                    <div className="relative h-full w-[48%] lg:w-[50%] shrink-0 overflow-hidden bg-black/40">
                      <Image
                        src={exp.image.src}
                        alt={exp.image.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 35vw, 45vw"
                        quality={85}
                        className="object-cover object-center transition-transform duration-[2.5s] ease-luxe scale-100 hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#02140d]/90"
                      />

                      {/* Top Badges */}
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-x-0 top-0 flex items-center justify-between p-5 lg:p-6 pointer-events-none"
                      >
                        <span className="font-display text-4xl lg:text-5xl text-hs-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[0.62rem] font-mono tracking-widest text-hs-cream backdrop-blur-md shadow-md">
                          <span>{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-hs-gold">/</span>
                          <span>{total}</span>
                        </span>
                      </motion.div>
                    </div>

                    {/* Right: Dedicated Editorial Story */}
                    <div className="flex flex-1 flex-col justify-between p-6 lg:p-8 bg-gradient-to-br from-[#062016] via-[#02140d] to-[#010a06] border-l border-white/[0.08] overflow-y-auto no-scrollbar">
                      <div>
                        {/* Kicker Pill */}
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                          className="inline-flex items-center gap-2 rounded-full border border-hs-gold/35 bg-hs-gold/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-hs-gold-pale backdrop-blur-md"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-hs-gold animate-pulse" />
                          <span>{exp.kicker}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.65, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                          className="font-display mt-3.5 text-2xl lg:text-3xl uppercase leading-tight tracking-tight text-white"
                        >
                          {exp.title}
                        </motion.h3>

                        {/* Gold Hairline Divider */}
                        <motion.div
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.55, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                          style={{ transformOrigin: "left" }}
                          className="mt-3.5 h-px w-14 bg-gradient-to-r from-hs-gold to-transparent"
                        />

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.55, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-4 text-xs lg:text-[0.85rem] leading-relaxed text-hs-cream/80"
                        >
                          {exp.description}
                        </motion.p>

                        {/* Feature Badges */}
                        {exp.features && exp.features.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-5 flex flex-wrap gap-1.5 lg:gap-2"
                          >
                            {exp.features.map((feat, featIdx) => (
                              <motion.span
                                key={feat}
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.35, delay: 0.54 + featIdx * 0.05 }}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-hs-cream/90 backdrop-blur-sm"
                              >
                                <span className="h-1 w-1 rounded-full bg-hs-gold" />
                                <span>{feat}</span>
                              </motion.span>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {/* Bottom Specs & Action Bar */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4"
                      >
                        <ul className="flex items-center gap-2.5 text-[0.6rem] uppercase tracking-wider text-hs-cream/65 font-mono">
                          {exp.meta.map((m, j) => (
                            <li key={m} className="flex items-center gap-2">
                              {j > 0 && <span aria-hidden className="h-1 w-1 rotate-45 bg-hs-gold/80" />}
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>

                        {exp.cta.external ? (
                          <a
                            href={exp.cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-hs-gold/45 bg-hs-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-hs-gold transition-all duration-300 hover:border-hs-gold hover:bg-hs-gold hover:text-hs-green-deep hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] shrink-0 active:scale-95"
                          >
                            <span>{exp.cta.label}</span>
                            <ArrowUpRight size={13} />
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          <Link
                            href={exp.cta.href || `/experiences#${exp.slug}`}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-hs-gold/45 bg-hs-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-hs-gold transition-all duration-300 hover:border-hs-gold hover:bg-hs-gold hover:text-hs-green-deep hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] shrink-0 active:scale-95"
                          >
                            <span>{exp.cta.label || "Discover"}</span>
                            <ArrowRight size={13} />
                          </Link>
                        )}
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── MOBILE: Responsive Vertical Accordion ── */}
        <div className="md:hidden space-y-3">
          {experiences.map((exp, i) => {
            const isOpen = activeIndex === i;
            return (
              <div
                key={exp.slug}
                className={cx(
                  "overflow-hidden rounded-2xl border transition-all duration-300",
                  isOpen
                    ? "border-hs-gold/40 bg-[#02130c]/95"
                    : "border-white/10 bg-white/[0.02]"
                )}
              >
                {/* Header Toggle */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xl text-hs-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[0.58rem] uppercase tracking-[0.2em] text-hs-gold font-medium">
                        {exp.kicker}
                      </p>
                      <h3 className="font-display text-lg text-white leading-tight uppercase">
                        {exp.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={cx(
                      "grid h-8 w-8 place-items-center rounded-full border text-hs-gold transition-transform duration-300",
                      isOpen
                        ? "rotate-180 border-hs-gold bg-hs-gold/10"
                        : "border-white/10"
                    )}
                  >
                    <ChevronDown size={14} />
                  </span>
                </button>

                {/* Collapsible Body */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="border-t border-white/[0.08] p-4 pt-3 space-y-4 overflow-hidden"
                  >
                    {/* Unobstructed Image Frame */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/40">
                      <Image
                        src={exp.image.src}
                        alt={exp.image.alt}
                        fill
                        sizes="90vw"
                        quality={80}
                        className="object-cover"
                      />
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="text-xs leading-relaxed text-hs-cream/80"
                    >
                      {exp.description}
                    </motion.p>

                    {/* Features */}
                    {exp.features && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.16 }}
                        className="flex flex-wrap gap-1.5"
                      >
                        {exp.features.map((feat) => (
                          <span
                            key={feat}
                            className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[0.62rem] text-hs-cream/90"
                          >
                            <span className="h-1 w-1 rounded-full bg-hs-gold" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </motion.div>
                    )}

                    {/* Action Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.22 }}
                      className="pt-2"
                    >
                      {exp.cta.external ? (
                        <a
                          href={exp.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-hs-gold bg-hs-gold/10 py-2.5 text-xs font-bold uppercase tracking-wider text-hs-gold"
                        >
                          <span>{exp.cta.label}</span>
                          <ArrowUpRight size={13} />
                        </a>
                      ) : (
                        <Link
                          href={exp.cta.href || `/experiences#${exp.slug}`}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-hs-gold bg-hs-gold/10 py-2.5 text-xs font-bold uppercase tracking-wider text-hs-gold"
                        >
                          <span>{exp.cta.label || "Discover"}</span>
                          <ArrowRight size={13} />
                        </Link>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
