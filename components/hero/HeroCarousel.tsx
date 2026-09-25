"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { media, type Media } from "@/lib/images";

export type HeroSlide = {
  id: string;
  media: Media;
  caption: string;
  tag: string;
  subtitle: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "dining-hall",
    media: media.heroDiningHall,
    caption: "The Grand Dining Room & Evening Lounge",
    tag: "Dining Lounge",
    subtitle: "Warm Chandeliers & Victoria Street Hospitality",
  },
  {
    id: "dum-biryani",
    media: media.heroDumBiryani,
    caption: "Steaming Royal Dum Biryani with Saffron Basmati",
    tag: "Dum Biryani",
    subtitle: "Slow-Cooked Punjabi Heritage Recipe",
  },
  {
    id: "palak-paneer",
    media: media.heroPalakPaneer,
    caption: "Artisan Palak Paneer & Fresh Tandoori Garlic Naan",
    tag: "Signature Curries",
    subtitle: "Velvety Spinach & Clay Oven Baked Naan",
  },
 

];

const DURATION_MS = 6000;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const goToSlide = (idx: number) => {
    setCurrent(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  useEffect(() => {
    startTimeRef.current = Date.now();

    const updateProgress = () => {
      if (!isPaused) {
        const elapsed = Date.now() - startTimeRef.current;
        const p = Math.min(100, (elapsed / DURATION_MS) * 100);
        setProgress(p);

        if (elapsed >= DURATION_MS) {
          nextSlide();
          return;
        }
      }
      animFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, isPaused, nextSlide]);

  return (
    <div
      className="absolute inset-0 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        startTimeRef.current = Date.now() - (progress / 100) * DURATION_MS;
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="High Spirits restaurant visual showcase"
    >
      {/* Visual Slides with subtle Ken Burns motion */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            <div
              className={`relative h-full w-full transform transition-transform duration-[7500ms] ease-out ${isActive ? "scale-105" : "scale-100"
                }`}
            >
              <Image
                src={slide.media.src}
                alt={slide.media.alt}
                fill
                priority={idx === 0}
                quality={88}
                sizes="100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}

      {/* Cinematic Vignette Overlays & Radial Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(160_85%_5%/0.65)_60%,hsl(160_85%_5%/0.95)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,hsl(160_85%_5%/0.75)_0%,hsl(160_85%_5%/0.3)_35%,hsl(160_85%_5%/0.4)_65%,hsl(160_85%_5%/0.95)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_45%,hsl(42_78%_51%/0.12)_0%,transparent_60%)]"
      />

      {/* Side Edge Navigation Chevrons - hidden on mobile to prevent blocking touch targets */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="group absolute left-3 top-1/2 z-30 hidden sm:flex h-12 w-12 md:h-16 md:w-16 -translate-y-1/2 items-center justify-center text-white/50 transition-all duration-300 hover:scale-110 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hs-gold sm:left-4 md:left-8"
      >
        <span className="sr-only">Previous Slide</span>
        <svg
          className="h-8 w-8 transition-transform duration-300 group-hover:-translate-x-1.5 sm:h-10 sm:w-10 md:h-12 md:w-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="group absolute right-3 top-1/2 z-30 hidden sm:flex h-12 w-12 md:h-16 md:w-16 -translate-y-1/2 items-center justify-center text-white/50 transition-all duration-300 hover:scale-110 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hs-gold sm:right-4 md:right-8"
      >
        <span className="sr-only">Next Slide</span>
        <svg
          className="h-8 w-8 transition-transform duration-300 group-hover:translate-x-1.5 sm:h-10 sm:w-10 md:h-12 md:w-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Subtle bottom indicator dots */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-30 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${isActive
                ? "w-8 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                : "w-2 bg-white/30 hover:bg-white/60"
                }`}
            />
          );
        })}
      </div>
    </div>
  );
}
