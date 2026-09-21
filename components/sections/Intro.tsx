import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { ClipReveal, ClipRevealX, FadeIn, FadeUp, ScaleReveal, TextReveal } from "@/components/motion/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { intro, stats } from "@/lib/content/story";
import { media } from "@/lib/images";

/**
 * "The Spirit of Punjab" — one art-directed spread: the story on the left, the
 * tandoor kitchen on the right. Height comes from the content, never the
 * viewport, and only the photograph's frame clips.
 */
export function Intro() {
  return (
    <section
      aria-labelledby="intro-title"
      className="surface-light grain grain-ink relative bg-hs-cream py-[clamp(4.5rem,9vw,8.75rem)] text-hs-text"
    >
      <IntroDecor />

      <div className="shell relative">
        <div className="mx-auto grid max-w-[1400px] items-center gap-y-14 md:gap-y-16 lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] lg:gap-x-[4.5rem] xl:gap-x-28">
          {/* Story */}
          <div>
            <FadeUp as="p" duration={0.8} className="eyebrow max-sm:tracking-[0.22em] max-sm:before:hidden">
              Since day one · 1/57 Victoria Street
            </FadeUp>

            <TextReveal
              id="intro-title"
              delay={0.15}
              className="intro-title font-display mt-6 text-[clamp(2.2rem,5.5vw,3.5rem)] leading-[1.02] tracking-[-0.025em] text-hs-green lg:mt-7 lg:text-[clamp(2.75rem,4vw,4.5rem)] [&_.tr-line]:block"
              lineClassName="whitespace-nowrap"
              lines={[
                <span key="l1">
                  The <em className="text-hs-gold-deep">Spirit</em>
                </span>,
                "of Punjab",
              ]}
            />

            <ClipRevealX delay={0.35} className="mt-8 w-20 lg:mt-10">
              <div aria-hidden className="h-px bg-hs-gold-deep/50" />
            </ClipRevealX>

            <FadeUp as="h3" delay={0.35} duration={0.9} className="font-display mt-7 text-h3 text-hs-green">
              Tradition, <em>reimagined.</em>
            </FadeUp>

            <FadeUp as="p" delay={0.42} duration={0.9} className="mt-4 max-w-[34rem] text-lead text-hs-text/85">
              {intro.lead}
            </FadeUp>

            <FadeUp as="p" delay={0.5} duration={0.9} className="mt-4 max-w-[34rem] text-hs-muted">
              {intro.body}
            </FadeUp>

            <FadeUp
              as="dl"
              delay={0.55}
              duration={0.9}
              className="mt-9 grid max-w-[34rem] grid-cols-3 border-t border-hs-line pt-6 lg:mt-10"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col pr-3">
                  <dt className="order-2 mt-2 text-[0.68rem] uppercase leading-snug tracking-[0.16em] text-hs-muted">
                    {s.label}
                  </dt>
                  <dd className="font-display order-1 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none text-hs-green">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </FadeUp>

            <FadeUp delay={0.6} duration={0.8} className="mt-9">
              <Link
                href="/about"
                className="link-line text-xs font-semibold uppercase tracking-[0.22em] text-hs-green"
              >
                Discover our story <ArrowRight size={14} />
              </Link>
            </FadeUp>
          </div>

          {/* Photograph */}
          <div className="relative">
            {/* Gold hairline frame, offset up and right behind the photograph */}
            <FadeIn
              delay={0.8}
              className="pointer-events-none absolute -right-3 -top-3 bottom-3 left-3 border border-hs-gold/45 lg:-right-4 lg:-top-4 lg:bottom-4 lg:left-4"
            />

            {/* Portrait source (2:3): the cook sits left, her hands at centre —
                every crop keeps her face, both arms and the dough in frame. */}
            <ClipReveal
              duration={0.9}
              className="intro-frame relative z-10 aspect-[5/6] overflow-hidden bg-hs-sand md:aspect-[5/4] lg:aspect-[4/5]"
            >
              <Link
                href="/gallery"
                aria-label="View the gallery"
                data-cursor="View"
                className="group absolute inset-0 block"
              >
                <Parallax distance={16} className="absolute -inset-y-5 inset-x-0">
                  <div className="absolute inset-0 transition-transform duration-[1100ms] ease-luxe group-hover:scale-[1.03] group-focus-visible:scale-[1.03]">
                    <Image
                      src={media.kitchenCraft.src}
                      alt={media.kitchenCraft.alt}
                      fill
                      sizes="(min-width: 1440px) 680px, (min-width: 1024px) 50vw, 100vw"
                      placeholder="blur"
                      className="object-cover object-[50%_22%] md:object-[50%_16%] lg:object-[50%_25%]"
                    />
                  </div>
                </Parallax>

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,hsl(160_80%_6%/0.38),transparent_32%)]"
                />

                <span className="glass-chip absolute right-4 top-4 hidden sm:inline-flex md:right-5 md:top-5">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hs-gold" />
                  The tandoor, lit every day
                </span>

                <span
                  aria-hidden
                  data-intro-view
                  className="glass-chip absolute bottom-4 right-4 transition-colors duration-500 ease-luxe group-hover:border-hs-gold/70 group-hover:text-hs-gold-pale group-focus-visible:border-hs-gold/70 group-focus-visible:text-hs-gold-pale md:bottom-5 md:right-5"
                >
                  View
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-500 ease-luxe group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </ClipReveal>

            {/* On phones the chip would cross her head, so it becomes a caption. */}
            <p className="mt-4 flex items-center gap-2.5 text-[0.625rem] font-medium uppercase tracking-[0.24em] text-hs-gold-deep sm:hidden">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hs-gold" />
              The tandoor, lit every day
            </p>

            {/* Seal: straddles the text/photo seam on desktop, the frame's bottom edge on
                tablet, its top-right (over the range hood) on phones — never her face. */}
            <ScaleReveal
              delay={0.7}
              duration={0.8}
              className="glass-light absolute -top-12 right-4 z-20 w-24 rounded-full sm:-bottom-12 sm:left-5 sm:right-auto sm:top-auto md:w-28 lg:-left-16 lg:bottom-[14%] lg:w-32 xl:-left-[4.5rem] xl:w-36"
            >
              <div data-intro-badge>
                <RotatingBadge
                  text="Authentic Punjabi · Fine dining · Bunbury WA · "
                  className="relative grid w-full text-hs-gold-deep"
                />
              </div>
            </ScaleReveal>

            <FadeIn delay={0.9} className="absolute -right-9 top-0 hidden 2xl:block">
              <span className="vertical-label block text-[0.625rem] font-medium uppercase tracking-[0.32em] text-hs-gold-deep/80">
                Kitchen · Victoria Street
              </span>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Quiet atmosphere: a warm glow behind the photograph and a botanical sprig. */
function IntroDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-[12%] top-[6%] aspect-square w-[min(44rem,90vw)] rounded-full bg-[radial-gradient(closest-side,hsl(42_78%_51%/0.12),transparent)]" />
      <FadeIn delay={0.9} className="absolute -left-12 bottom-[4%] hidden w-56 text-hs-gold-deep/15 lg:block xl:left-[1%]">
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
