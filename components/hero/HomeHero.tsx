import Image from "next/image";
import type { CSSProperties } from "react";
import { IntroLines } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowUpRight } from "@/components/ui/Icons";
import { LogoMark } from "@/components/ui/Logo";
import { media } from "@/lib/images";
import { accolade, site } from "@/lib/site";
import { PointerParallax } from "./PointerParallax";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-end overflow-hidden bg-hs-green-deep">
      {/* 1. image settles from a slow zoom */}
      <PointerParallax strength={7} className="absolute -inset-3">
        <div className="intro-media absolute inset-0">
          <Image
            src={media.interiorLuxe.src}
            alt={media.interiorLuxe.alt}
            fill
            preload
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
      </PointerParallax>

      {/* 2. green atmosphere fades in over it */}
      <div
        aria-hidden
        className="intro-overlay absolute inset-0 bg-[linear-gradient(180deg,hsl(160_85%_5%/0.55)_0%,hsl(160_85%_5%/0.15)_35%,hsl(160_85%_5%/0.7)_72%,hsl(160_85%_5%)_100%),linear-gradient(90deg,hsl(160_80%_6%/0.75)_0%,transparent_65%)]"
      />
      <div aria-hidden className="intro-veil pointer-events-none absolute inset-0 bg-hs-green-deep" />

      <div className="shell relative z-10 w-full pb-10 pt-[calc(var(--header-h)+4rem)] md:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* 3. mark */}
            <div className="intro-rise flex items-center gap-4" style={d(0.55)}>
              <LogoMark className="w-5" />
              <span className="h-px w-10 bg-hs-gold/60" />
              <p className="text-eyebrow font-medium uppercase text-hs-gold">Authentic Indian Fine Dining · Bunbury WA</p>
            </div>

            {/* 4. headline, line by line */}
            <IntroLines
              as="h1"
              id="hero-title"
              start={0.7}
              step={0.13}
              className="font-display mt-8 text-display text-hs-cream"
              lines={[
                "Taste the",
                <em key="spirit" className="text-gold-gradient pr-[0.06em]">
                  Spirit
                </em>,
                "of Punjab",
              ]}
            />
          </div>

          <div className="lg:col-span-4 lg:pb-4">
            <p className="intro-rise max-w-sm text-lead text-hs-cream/80" style={d(1.1)}>
              Authentic Punjabi, North Indian and tandoori specialties crafted with traditional flavours — served in a luxurious fine-dining atmosphere.
            </p>
            {/* 5. calls to action */}
            <div className="intro-rise mt-9 flex flex-wrap gap-3" style={d(1.25)}>
              <ButtonLink href="/menu" variant="ghost">
                Explore Menu
              </ButtonLink>
              <ButtonLink href="/reservation">Reserve a Table</ButtonLink>
            </div>
          </div>
        </div>

        {/* 6. scroll indicator + credentials */}
        <div className="intro-rise mt-14 flex items-end justify-between gap-6 border-t border-hs-cream/15 pt-6 md:mt-20" style={d(1.55)}>
          <div className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.3em] text-hs-cream/60">
            <span aria-hidden className="scroll-cue relative block h-12 w-px overflow-hidden bg-hs-cream/20" />
            Scroll to discover
          </div>
          <p className="hidden text-[0.7rem] uppercase tracking-[0.24em] text-hs-cream/60 md:block">
            Dinner nightly 5 – 9 PM · Buffet from {site.buffet.starts}
          </p>
          <a
            href={accolade.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass group flex items-center gap-3 rounded-full py-2 pl-2 pr-4 text-left transition-colors hover:border-hs-gold/60"
          >
            <Image src={accolade.badge} alt="" width={250} height={150} sizes="56px" className="h-8 w-auto rounded-full bg-hs-white" />
            <span className="leading-tight">
              <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-hs-gold">AGFG Readers&apos; Choice</span>
              <span className="block text-xs text-hs-cream">Winner 2026</span>
            </span>
            <ArrowUpRight size={14} className="text-hs-cream/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
