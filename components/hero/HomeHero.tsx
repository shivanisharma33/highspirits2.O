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
      <div className="shell relative z-20 mx-auto flex max-w-5xl flex-col items-center justify-center px-4 pb-14 pt-[calc(var(--header-h)+1.5rem)] sm:pt-[calc(var(--header-h)+2rem)] md:pb-18">

        {/* Main Heading: HIGH SPIRITS (Grand Luxury Serif Display) */}
        <h1
          id="hero-title"
          className="intro-rise font-display text-[clamp(2.4rem,9.5vw,9.5rem)] font-bold uppercase leading-[0.95] sm:leading-[0.92] tracking-[0.02em] sm:tracking-[0.03em] text-white drop-shadow-[0_8px_36px_rgba(0,0,0,0.9)]"
          style={d(0.35)}
        >
          HIGH SPIRITS
        </h1>

        {/* Subtitle / Tagline directly beneath the main heading */}
        <p
          className="intro-rise mt-3.5 text-[clamp(0.72rem,1.8vw,1.15rem)] font-medium uppercase tracking-[0.22em] sm:tracking-[0.32em] text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:mt-5"
          style={d(0.5)}
        >
          AUTHENTIC INDIAN RESTAURANT
        </p>

        {/* Description Paragraph */}
        <p
          className="intro-rise mt-4 max-w-2xl text-[clamp(0.88rem,1.4vw,1.15rem)] font-normal leading-relaxed text-hs-cream/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] sm:mt-6"
          style={d(0.65)}
        >
          Discover authentic Punjabi, North Indian and tandoori specialties crafted with traditional flavors &mdash; served in a luxurious fine-dining atmosphere.
        </p>

        {/* Action Buttons */}
        <div
          className="intro-rise mt-7 flex w-full max-w-xs sm:max-w-none flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 sm:mt-10"
          style={d(0.8)}
        >
          <ButtonLink href="/menu" variant="ghost" className="w-full sm:w-auto text-center justify-center">
            Explore Menu
          </ButtonLink>
          <ButtonLink href="/reservation" className="w-full sm:w-auto text-center justify-center">
            Reserve a Table
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
