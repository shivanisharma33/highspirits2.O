import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { FadeIn, FadeUp, ScaleReveal, TextReveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { intro, stats } from "@/lib/content/story";

/**
 * "The Spirit of Punjab" — compact luxury editorial spread.
 * Perfectly centered and height-optimized with balanced typography,
 * streamlined stats card, and inline badge + CTA.
 */
export function Intro() {
  return (
    <section
      aria-labelledby="intro-title"
      className="surface-light grain grain-ink relative overflow-hidden bg-hs-cream py-10 md:py-14 lg:py-16 text-hs-text"
    >
      <IntroDecor />

      <div className="shell relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Eyebrow Highlight */}
          <FadeUp as="p" className="eyebrow justify-center mb-2" delay={0.08} duration={0.7}>
            Since day one · 1/57 Victoria Street
          </FadeUp>

          {/* Grand Centered Title */}
          <div className="mt-4 text-center">
            <TextReveal
              as="h2"
              id="intro-title"
              delay={0.15}
              className="intro-title font-display text-h2 text-hs-green [&_.tr-line]:block"
              lineClassName="justify-center"
              lines={[
                <span key="l1">
                  The <em className="text-gold-gradient font-normal italic">Spirit</em> of Punjab
                </span>,
              ]}
            />
          </div>

          {/* Symmetrical Luxury Gold Divider */}
          <FadeUp delay={0.22} duration={0.7} className="my-3.5 flex items-center justify-center gap-3">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-hs-gold-deep/60 sm:w-20 md:w-28" />
            <span className="inline-block h-1.5 w-1.5 rotate-45 border border-hs-gold-deep/80 bg-hs-gold/40" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-hs-gold-deep/60 sm:w-20 md:w-28" />
          </FadeUp>

          {/* Subtitle */}
          <FadeUp as="h3" delay={0.28} duration={0.8} className="font-display text-lg text-hs-green sm:text-xl md:text-2xl">
            Tradition, <em className="text-hs-gold-deep italic">reimagined.</em>
          </FadeUp>

          {/* Lead & Narrative Body */}
          <div className="mx-auto mt-3.5 max-w-2xl space-y-2">
            <FadeUp as="p" delay={0.34} duration={0.8} className="text-base leading-relaxed text-hs-text/90 md:text-lg font-normal">
              {intro.lead}
            </FadeUp>
            <FadeUp as="p" delay={0.4} duration={0.8} className="text-xs sm:text-sm leading-relaxed text-hs-muted">
              {intro.body}
            </FadeUp>
          </div>

          {/* Centered Compact Luxury Stats Showcase Card */}
          <FadeUp
            as="div"
            delay={0.46}
            duration={0.8}
            className="mx-auto mt-7 w-full max-w-2xl rounded-xl border border-hs-gold/35 bg-gradient-to-b from-hs-sand/70 via-hs-cream/90 to-hs-sand/50 px-5 py-4 shadow-sm backdrop-blur-sm sm:px-8 sm:py-5"
          >
            <dl className="grid grid-cols-1 divide-y divide-hs-gold/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center px-3 py-2.5 sm:py-0">
                  <dd className="font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-none text-hs-green">
                    <CountUp value={s.value} />
                  </dd>
                  <span className="mt-2 h-0.5 w-6 rounded-full bg-hs-gold/50" />
                  <dt className="mt-1.5 text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.18em] text-hs-gold-deep">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </FadeUp>

          {/* Streamlined Seal & CTA */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <ScaleReveal delay={0.52} duration={0.7} className="w-20 text-hs-gold-deep md:w-24">
              <RotatingBadge
                text="Authentic Punjabi · Fine dining · Bunbury WA · "
                className="relative grid w-full text-hs-gold-deep drop-shadow-xs"
              />
            </ScaleReveal>

            <FadeUp delay={0.58} duration={0.7}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2.5 rounded-full border border-hs-green/40 bg-hs-green px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-hs-cream shadow-sm transition-all duration-500 ease-luxe hover:border-hs-gold hover:bg-hs-green-deep hover:shadow-md hover:shadow-hs-green/20"
              >
                <span>Discover our story</span>
                <ArrowRight size={13} className="text-hs-gold transition-transform duration-300 ease-luxe group-hover:translate-x-1" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Quiet atmosphere: warm centered radial glow and symmetrical botanical accents. */
function IntroDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Centered radiant warm aura */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[min(50rem,90vw)] rounded-full bg-[radial-gradient(circle,hsl(42_78%_51%/0.11)_0%,transparent_68%)]" />

      {/* Left Botanical Sprig */}
      <FadeIn delay={0.8} className="absolute -left-10 bottom-[5%] hidden w-44 text-hs-gold-deep/10 lg:block xl:left-[2%]">
        <svg viewBox="0 0 200 260" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-auto w-full">
          <path d="M100 258C96 200 104 140 93 18" />
          <path d="M97 205C70 195 52 173 48 150c24 4 42 24 49 55Z" />
          <path d="M99 172c27-10 45-32 51-56-26 4-44 26-51 56Z" />
          <path d="M96 132c-24-10-38-32-40-52 22 6 36 26 40 52Z" />
          <path d="M97 102c23-10 37-30 41-50-22 6-36 26-41 50Z" />
          <path d="M94 40c-12-8-16-22-12-34 10 8 14 20 12 34Z" />
        </svg>
      </FadeIn>

      {/* Right Botanical Sprig (Symmetrical reflection) */}
      <FadeIn delay={0.8} className="absolute -right-10 bottom-[5%] hidden w-44 -scale-x-100 text-hs-gold-deep/10 lg:block xl:right-[2%]">
        <svg viewBox="0 0 200 260" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-auto w-full">
          <path d="M100 258C96 200 104 140 93 18" />
          <path d="M97 205C70 195 52 173 48 150c24 4 42 24 49 55Z" />
          <path d="M99 172c27-10 45-32 51-56-26 4-44 26-51 56Z" />
          <path d="M96 132c-24-10-38-32-40-52 22 6 36 26 40 52Z" />
          <path d="M97 102c23-10 37-30 41-50-22 6-36 26-41 50Z" />
          <path d="M94 40c-12-8-16-22-12-34 10 8 14 20 12 34Z" />
        </svg>
      </FadeIn>
    </div>
  );
}
