"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CurvedCarousel } from "@/components/about/CurvedCarousel";
import { FadeUp, TextReveal } from "@/components/motion/Reveal";
import { media, type Media } from "@/lib/images";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  experience: string;
  quote: string;
  image: Media;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "amardeep-singh",
    name: "Amardeep Singh",
    role: "Executive Chef & Co-Founder",
    badge: "Master of Tandoor",
    experience: "20+ Years Global Craft",
    quote: "Cooking is an expression of soul, balance, and ancestral storytelling.",
    image: media.chefAmardeep,
  },
  {
    id: "ishpreet-bedi",
    name: "Ishpreet Bedi",
    role: "Business Partner & Operations",
    badge: "Hospitality Lead",
    experience: "Punjab to Australia",
    quote: "Authentic hospitality is built on genuine warmth, care, and attention to detail.",
    image: media.partnerIshpreet,
  },
  {
    id: "chef-kitchen",
    name: "Tandoori Brigade",
    role: "Clay Oven Artisans",
    badge: "Live Fire Mastery",
    experience: "Traditional Charcoal Tandoor",
    quote: "Blistering breads and smoky tandoori grills perfected at 450°C.",
    image: media.chefKitchen,
  },
  {
    id: "kitchen-craft",
    name: "Artisan Breadcrafters",
    role: "Naan & Kulcha Guild",
    badge: "Handcrafted Doughs",
    experience: "Heritage Hand Kneading",
    quote: "Every garlic naan, roti, and laccha paratha prepared by hand to order.",
    image: media.kitchenCraft,
  },
  {
    id: "team-celebration",
    name: "The Culinary Brigade",
    role: "Kitchen & Pastry Masters",
    badge: "Chardi Kala Spirit",
    experience: "United Excellence",
    quote: "A passionate team united by culinary ambition and the joy of hospitality.",
    image: media.teamCelebration,
  },
  {
    id: "team-family",
    name: "Front-of-House Guild",
    role: "Sommeliers & Service",
    badge: "Curated Experiences",
    experience: "Five-Star Dining Service",
    quote: "Guiding every guest through nuanced wine pairings, single malts, and dining.",
    image: media.teamFamily,
  },
  {
    id: "team-with-guests",
    name: "Guest Relations",
    role: "Personalized Dining",
    badge: "Community Benchmark",
    experience: "Bunbury Cherished Dining",
    quote: "Creating unforgettable memories and heartwarming connections every night.",
    image: media.teamWithGuests,
  },
  {
    id: "heritage-spices",
    name: "The Spice Atelier",
    role: "Slow Roast & Masala Guild",
    badge: "Small Batch Roasting",
    experience: "Ancestral Punjabi Formulas",
    quote: "Stone-ground whole spices roasted daily to release complex aromatic oils.",
    image: media.spices,
  },
];

export function TeamShowcase() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section
      aria-labelledby="team-curved-title"
      className="grain relative overflow-hidden bg-hs-green-dark py-8 text-white md:py-12"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-hs-gold/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[900px] rounded-full bg-hs-emerald/15 blur-[150px]"
      />

      {/* Section Header (Centered in shell) */}
      <div className="shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-hs-gold/30 bg-hs-gold/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-hs-gold animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-hs-gold-pale">
              The Culinary Brigade
            </span>
          </div>

          <TextReveal
            as="h2"
            id="team-curved-title"
            className="font-display mt-4 text-h2 text-white"
            lines={[
              "Passionate",
              <em key="em" className="italic text-gold-gradient">
                {" "}Professionals
              </em>,
            ]}
          />

          <FadeUp
            as="p"
            delay={0.12}
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-hs-cream/75 md:text-base"
          >
            From our visionary founders to the live-fire tandoori masters and
            front-of-house guild, each artisan shares a dedication to
            exceptional dining and timeless Punjabi hospitality.
          </FadeUp>
        </div>
      </div>

      {/* ─── 3D Curved Carousel (Full-Bleed: No Left or Right Gap) ─── */}
      <div className="relative z-10 mt-5 w-full overflow-hidden px-0 md:mt-6">
        <CurvedCarousel
          perspective={2000}
          itemDistance={1100}
          initialRotation={0}
          repeatCount={2}
          draggable={true}
          dragSensitivity={0.2}
          momentumFriction={0.94}
          autoRotate={true}
          autoRotateSpeed={20}
          autoRotateDirection="right"
          hoverSpeedMultiplier={0.65}
          enableMobileDrag={true}
          cardWidth={380}
          cardHeight={520}
          fadeClipping={{
            enabled: true,
            fadeWidth: 10,
            fadeAlpha: 0.15,
          }}
          items={TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[26px] border border-white/20 bg-[#0a1e16] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] transition-all duration-500 hover:border-hs-gold/80 hover:shadow-[0_30px_70px_-10px_rgba(212,175,55,0.3)]"
            >
              {/* Clean Edge-to-Edge Team Portrait */}
              <Image
                src={member.image.src}
                alt={member.image.alt}
                fill
                sizes="(max-width: 640px) 290px, (max-width: 1024px) 330px, 400px"
                placeholder="blur"
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle Inner Gloss Sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/10 group-hover:ring-hs-gold/40 transition-all duration-500"
              />
            </div>
          ))}
        />
      </div>

      {/* ─── Detail Modal (When clicking a team member card) ─── */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-hs-gold/30 bg-[#071911] p-8 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              aria-label="Close details"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
            >
              ✕
            </button>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative aspect-[3/4] w-36 shrink-0 overflow-hidden rounded-2xl border border-white/20 shadow-xl">
                <Image
                  src={selectedMember.image.src}
                  alt={selectedMember.image.alt}
                  fill
                  placeholder="blur"
                  className="object-cover"
                />
              </div>

              <div>
                <span className="inline-block rounded-full border border-hs-gold/40 bg-hs-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-hs-gold-pale">
                  ✦ {selectedMember.badge}
                </span>
                <h3 className="font-display mt-2 text-2xl font-bold text-white">
                  {selectedMember.name}
                </h3>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-hs-gold-soft">
                  {selectedMember.role}
                </p>
                <p className="mt-1 text-xs text-hs-cream/60">
                  {selectedMember.experience}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-display text-base italic leading-relaxed text-hs-cream/90">
                “{selectedMember.quote}”
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
