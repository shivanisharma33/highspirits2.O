"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowLeft, ArrowRight, Close } from "@/components/ui/Icons";
import { media, type Media } from "@/lib/images";

type CelebrationStageItem = {
  id: string;
  item: Media;
  step: string;
  category: string;
  title: string;
  quote: string;
  description: string;
  capacity: string;
  vibe: string;
};

const CELEBRATIONS_STAGE: CelebrationStageItem[] = [
  {
    id: "family-banquets",
    item: media.guests7,
    step: "01",
    category: "Family Milestones",
    title: "Grand Family Banquets",
    quote: "“The warmth of the room and the richness of the curries made it an unforgettable afternoon.”",
    description:
      "Generations gathered around lavish dining tables, sharing sizzling tandoori specialties, fragrant curries and memories in the warm glow of our dining room.",
    capacity: "Family Tables & Groups",
    vibe: "Warm & Heartfelt",
  },
  {
    id: "valentines",
    item: media.valentines2,
    step: "02",
    category: "Romantic Soirées",
    title: "Valentine's Celebration",
    quote: "“Candlelight, emerald velvet and bespoke dessert pairings crafted for two.”",
    description:
      "An enchanting evening where couples savoured multi-course tasting menus, house mocktails and our High Spirits floral celebration backdrop.",
    capacity: "Intimate Pairings",
    vibe: "Candlelit & Elegant",
  },
  {
    id: "team-celebration",
    item: media.teamCelebration,
    step: "03",
    category: "Culinary Milestones",
    title: "Team & Award Celebrations",
    quote: "“Celebrating culinary excellence, teamwork and every happy guest who walks through our doors.”",
    description:
      "Our kitchen and front-of-house family marking award recognitions, birthdays and special milestones together with joyful toasts.",
    capacity: "Milestone Receptions",
    vibe: "Joyous & Triumphant",
  },
  {
    id: "dinner-feasts",
    item: media.guests1,
    step: "04",
    category: "Dinner Gatherings",
    title: "Long Table Feasts",
    quote: "“Delicious food, exquisite wines and an atmosphere that invites you to linger for hours.”",
    description:
      "Groups of friends gathering for lively evening dinners, passing around aromatic curries, hot naan and cocktails.",
    capacity: "Groups of 6 to 24",
    vibe: "Vibrant & Sociable",
  },
  {
    id: "galas",
    item: media.guests5,
    step: "05",
    category: "Private Venue Hire",
    title: "Milestone Galas",
    quote: "“From the welcome drinks to the last dessert, the service was pure perfection.”",
    description:
      "Exclusive room hire hosting long banquet tables, private cocktail receptions and corporate milestones for up to 120 guests.",
    capacity: "Up to 120 Guests",
    vibe: "Grand & Exclusive",
  },
];

export function RecentCelebrations() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const activeItem = CELEBRATIONS_STAGE[activeIdx];

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % CELEBRATIONS_STAGE.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + CELEBRATIONS_STAGE.length) % CELEBRATIONS_STAGE.length);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") setLightboxIdx((p) => ((p ?? 0) + 1) % CELEBRATIONS_STAGE.length);
      if (e.key === "ArrowLeft") setLightboxIdx((p) => ((p ?? 0) - 1 + CELEBRATIONS_STAGE.length) % CELEBRATIONS_STAGE.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIdx]);

  return (
    <section
      aria-labelledby="moments-title"
      className="grain relative overflow-hidden bg-[#03150D] py-28 md:py-40 text-hs-cream"
    >
      <Aurora />

      {/* Atmospheric Ambient Glow Pods */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-44 left-1/4 h-[550px] w-[550px] rounded-full bg-hs-gold/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-44 right-1/4 h-[550px] w-[550px] rounded-full bg-emerald-500/10 blur-[150px]"
      />

      {/* Floating Gold Ornamental Rings in Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-15"
      >
        <div className="h-[750px] w-[750px] rounded-full border border-hs-gold/30 animate-[spin_120s_linear_infinite]" />
        <div className="absolute inset-8 rounded-full border border-dashed border-hs-gold/20 animate-[spin_90s_linear_infinite_reverse]" />
      </div>

      <div className="shell relative z-10">
        {/* ─── SECTION MASTHEAD ─── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-hs-gold/15 pb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-hs-gold/30 bg-hs-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.26em] text-hs-gold-pale backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-hs-gold animate-pulse" />
              <span>EXPERIENCES &amp; OCCASIONS</span>
            </motion.div>

            <motion.h2
              id="moments-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display mt-5 text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Recent{" "}
              <em className="text-gold-gradient italic font-normal">
                Celebrations
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-sm leading-relaxed text-hs-cream/75 sm:text-base md:text-lg"
            >
              From candlelit anniversaries to grand gala banquets. Hover or click through
              our celebration chapters below.
            </motion.p>
          </div>

          {/* Controls & Gallery CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-hs-gold hover:bg-hs-gold/15 hover:text-hs-gold cursor-pointer"
                aria-label="Previous celebration"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="px-3 font-display text-sm font-semibold tracking-wider text-hs-gold">
                0{activeIdx + 1} / 0{CELEBRATIONS_STAGE.length}
              </span>
              <button
                type="button"
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-hs-gold hover:bg-hs-gold/15 hover:text-hs-gold cursor-pointer"
                aria-label="Next celebration"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <ButtonLink href="/gallery" variant="ghost">
              Full Gallery ↗
            </ButtonLink>
          </div>
        </div>

        {/* ─── KINETIC ACCORDION SHOWCASE (The WOW Factor) ─── */}
        <div className="mt-12 hidden lg:flex h-[600px] gap-3">
          {CELEBRATIONS_STAGE.map((c, idx) => {
            const isActive = activeIdx === idx;

            return (
              <motion.div
                key={c.id}
                layout
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className={`group relative overflow-hidden rounded-[2.25rem] border transition-all duration-700 cursor-pointer ${
                  isActive
                    ? "flex-[3.2] border-hs-gold/60"
                    : "flex-1 border-white/10 hover:border-hs-gold/30 opacity-75 hover:opacity-95"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={c.item.src}
                  alt={c.item.alt}
                  fill
                  priority={isActive}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  placeholder="blur"
                  className={`object-cover transition-transform duration-1000 ease-out ${
                    isActive ? "scale-105" : "scale-100 filter grayscale-[20%]"
                  }`}
                />

                {/* Dark Vignette Overlays */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-t from-[#020e08]/95 via-[#020e08]/40 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-90" : "opacity-80"
                  }`}
                />

                {/* ─── ACTIVE EXPANDED VIEW ─── */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="relative z-10 flex h-full flex-col justify-between p-7 lg:p-8"
                  >
                    {/* Top Bar inside card */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full border border-hs-gold/40 bg-black/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-hs-gold backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        {c.category}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIdx(idx);
                        }}
                        className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-xs font-medium text-white hover:bg-hs-gold hover:text-hs-green-deep transition-all cursor-pointer backdrop-blur-md"
                        aria-label={`Open ${c.title} photo`}
                      >
                        <span>Enlarge</span>
                        <span>⊕</span>
                      </button>
                    </div>

                    {/* Bottom Editorial Content */}
                    <div className="max-w-lg rounded-3xl border border-white/10 bg-[#051c12]/85 p-6 sm:p-7 backdrop-blur-xl">
                      <span className="font-display text-xs font-semibold uppercase tracking-wider text-hs-gold">
                        CHAPTER {c.step}
                      </span>
                      <h3 className="font-display mt-1 text-2xl font-bold text-white sm:text-3xl">
                        {c.title}
                      </h3>

                      <p className="mt-2.5 font-display text-sm italic leading-snug text-hs-gold-pale/90">
                        {c.quote}
                      </p>

                      <p className="mt-2.5 text-xs leading-relaxed text-hs-cream/75">
                        {c.description}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center justify-between border-t border-white/10 pt-3.5 text-xs gap-3">
                        <div className="flex items-center gap-2 text-emerald-300 font-medium text-[11px]">
                          <span>✦ {c.capacity}</span>
                          <span>•</span>
                          <span className="text-hs-gold-soft">{c.vibe}</span>
                        </div>

                        <ButtonLink href="#enquire" className="py-1.5! px-3.5! text-xs!">
                          Host Your Event
                        </ButtonLink>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── INACTIVE CONTRACTED PREVIEW ─── */}
                {!isActive && (
                  <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 text-center">
                    <span className="font-display text-xl font-bold text-hs-gold">
                      {c.step}
                    </span>

                    <div className="flex items-center justify-center -rotate-90 origin-center whitespace-nowrap">
                      <p className="font-display text-sm font-semibold tracking-wider text-white/90">
                        {c.title}
                      </p>
                    </div>

                    <span className="h-1.5 w-1.5 mx-auto rounded-full bg-hs-gold/50" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ─── MOBILE TOUCH-FRIENDLY INTERACTIVE CAROUSEL ─── */}
        <div className="mt-10 lg:hidden">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-hs-gold/40 bg-[#082218]/90"
          >
            <div
              onClick={() => setLightboxIdx(activeIdx)}
              className="relative aspect-[4/3] w-full cursor-pointer"
            >
              <Image
                src={activeItem.item.src}
                alt={activeItem.item.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041911] via-transparent to-black/40" />

              <div className="absolute top-4 left-4 z-10">
                <span className="rounded-full border border-hs-gold/40 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-hs-gold">
                  {activeItem.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <span className="font-display text-xs font-semibold text-hs-gold">
                CHAPTER {activeItem.step}
              </span>
              <h3 className="font-display mt-1 text-2xl font-bold text-white">
                {activeItem.title}
              </h3>
              <p className="mt-2 font-display text-sm italic text-hs-gold-pale/90">
                {activeItem.quote}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-hs-cream/75">
                {activeItem.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[11px] text-emerald-300">
                  ✦ {activeItem.capacity}
                </span>
                <ButtonLink href="#enquire" className="py-2! px-3! text-xs!">
                  Book Now
                </ButtonLink>
              </div>
            </div>
          </motion.div>

          {/* Mobile Dot Nav */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {CELEBRATIONS_STAGE.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === idx ? "w-8 bg-hs-gold" : "w-2.5 bg-white/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── FULLSCREEN LIGHTBOX PREVIEW ─── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-xl"
            onClick={() => setLightboxIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-3xl border border-hs-gold/30 bg-[#051c12]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxIdx(null)}
                className="absolute top-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white hover:bg-hs-gold hover:text-hs-green-deep transition-all cursor-pointer shadow-lg"
                aria-label="Close modal"
              >
                <Close size={20} />
              </button>

              <div className="relative aspect-[16/10] w-full max-h-[65vh]">
                <Image
                  src={CELEBRATIONS_STAGE[lightboxIdx].item.src}
                  alt={CELEBRATIONS_STAGE[lightboxIdx].item.alt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1100px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6 md:p-8 border-t border-hs-gold/20 bg-[#051c12]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-hs-gold">
                      {CELEBRATIONS_STAGE[lightboxIdx].category} · Chapter {CELEBRATIONS_STAGE[lightboxIdx].step}
                    </span>
                    <h3 className="font-display mt-1 text-2xl md:text-3xl font-bold text-white">
                      {CELEBRATIONS_STAGE[lightboxIdx].title}
                    </h3>
                    <p className="mt-2 text-sm text-hs-cream/80 max-w-2xl">
                      {CELEBRATIONS_STAGE[lightboxIdx].description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <ButtonLink href="/gallery" variant="ghost">
                      See All Photos
                    </ButtonLink>
                    <ButtonLink href="#enquire">
                      Plan Your Event
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Separator Line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-hs-gold/40 to-transparent"
      />
    </section>
  );
}
