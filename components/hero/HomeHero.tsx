import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroCarousel } from "./HeroCarousel";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-hs-green-deep text-center"
    >
      {/* 1. Cinematic Background Carousel with side chevrons matching reference */}
      <HeroCarousel />

      {/* 2. Hero Content: Clean, grand, matching the reference image layout */}
      <div className="shell relative z-20 mx-auto flex max-w-5xl flex-col items-center justify-center px-4 pb-14 pt-[calc(var(--header-h)+2rem)] md:pb-18">

        {/* Main Heading: HIGH SPIRITS (Grand Luxury Serif Display) */}
        <h1
          id="hero-title"
          className="intro-rise font-display text-[clamp(3.8rem,11.5vw,9.5rem)] font-bold uppercase leading-[0.92] tracking-[0.03em] text-white drop-shadow-[0_8px_36px_rgba(0,0,0,0.9)]"
          style={d(0.35)}
        >
          HIGH SPIRITS
        </h1>

        {/* Subtitle / Tagline directly beneath the main heading */}
        <p
          className="intro-rise mt-4 text-[clamp(0.78rem,1.8vw,1.15rem)] font-medium uppercase tracking-[0.32em] text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:mt-5"
          style={d(0.5)}
        >
          AUTHENTIC INDIAN RESTAURANT
        </p>

        {/* Description Paragraph */}
        <p
          className="intro-rise mt-5 max-w-2xl text-[clamp(0.95rem,1.4vw,1.15rem)] font-normal leading-relaxed text-hs-cream/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] sm:mt-6"
          style={d(0.65)}
        >
          Discover authentic Punjabi, North Indian, and tandoori specialties crafted with traditional flavors &mdash; served in a luxurious fine-dining atmosphere.
        </p>

        {/* Action Buttons */}
        <div
          className="intro-rise mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10"
          style={d(0.8)}
        >
          <ButtonLink href="/menu" variant="ghost">
            Explore Menu
          </ButtonLink>
          <ButtonLink href="/reservation">
            Reserve a Table
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
