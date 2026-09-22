import Image from "next/image";
import Link from "next/link";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { FadeUp, TextReveal } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { experiences } from "@/lib/content/experiences";

/** Signature experiences as cinematic panels that travel horizontally. */
export function ExperienceScroller() {
  const total = String(experiences.length).padStart(2, "0");

  return (
    <div className="grain relative bg-hs-green-deep py-24 lg:py-0">
      <Aurora />
      <HorizontalScroll label="Signature experiences" trackClassName="gap-5 px-[var(--gutter)] md:gap-8 lg:items-center">
        <div data-panel className="flex w-[82vw] flex-col justify-center pr-6 sm:w-[60vw] lg:h-[68vh] lg:max-h-[580px] lg:min-h-[460px] lg:w-[34vw] lg:pr-16">
          <FadeUp as="p" className="eyebrow mb-7">
            Extraordinary moments
          </FadeUp>
          <TextReveal
            as="h2"
            className="font-display text-h2"
            lines={["Signature", <em key="e" className="text-gold-gradient">Experiences</em>]}
          />
          <FadeUp as="p" delay={0.15} className="mt-8 max-w-sm text-hs-cream/70">
            Curated exclusively for the discerning palate, each experience is a masterpiece of culinary artistry and impeccable service.
          </FadeUp>
          <FadeUp delay={0.25} className="mt-10 flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.3em] text-hs-gold">
            <span className="hidden lg:inline">Keep scrolling</span>
            <span className="lg:hidden">Swipe</span>
            <ArrowRight size={16} />
          </FadeUp>
        </div>

        {experiences.map((exp, i) => (
          <article
            key={exp.slug}
            data-panel
            aria-labelledby={`exp-${exp.slug}`}
            className="group relative h-[72svh] min-h-[30rem] w-[86vw] overflow-hidden rounded-[2rem] border border-white/10 sm:w-[70vw] lg:h-[68vh] lg:max-h-[580px] lg:min-h-[460px] lg:w-[58vw] xl:w-[52vw]"
          >
            <Image
              src={exp.image.src}
              alt={exp.image.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 86vw"
              quality={80}
              className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.05]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />

            {/* Top Index Chips */}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-7">
              <span className="font-display text-4xl text-hs-gold drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] md:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="glass-chip">
                {String(i + 1).padStart(2, "0")} / {total}
              </span>
            </div>

            {/* Sleek Compact Frosted Glass Experience Card */}
            <div className="glass glass-edge absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-black/45 p-4 sm:p-5 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-0.5 md:inset-x-4 md:bottom-4 md:p-4.5 lg:p-5">
              <p className="text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.26em] text-hs-gold font-medium">
                {exp.kicker}
              </p>
              <h3 id={`exp-${exp.slug}`} className="font-display mt-1 text-lg sm:text-xl md:text-2xl uppercase leading-tight tracking-tight text-white">
                {exp.title}
              </h3>
              <p className="mt-1.5 max-w-xl text-xs sm:text-[0.82rem] leading-relaxed text-hs-cream/80 line-clamp-2">
                {exp.description}
              </p>

              {/* Compact Key Highlights */}
              {exp.features && exp.features.length > 0 && (
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {exp.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-1 rounded-full border border-hs-gold/25 bg-white/[0.04] px-2.5 py-0.5 text-[0.6rem] font-medium tracking-wide text-hs-cream/90 backdrop-blur-md"
                    >
                      <span className="h-1 w-1 rounded-full bg-hs-gold" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Bottom Metadata & Action Link */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-2.5">
                <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6rem] sm:text-[0.62rem] uppercase tracking-[0.2em] text-hs-cream/70">
                  {exp.meta.map((m, j) => (
                    <li key={m} className="flex items-center gap-3">
                      {j > 0 && <span aria-hidden className="h-1 w-1 rotate-45 bg-hs-gold" />}
                      {m}
                    </li>
                  ))}
                </ul>
                {exp.cta.external ? (
                  <a
                    href={exp.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-hs-gold hover:text-white transition-colors"
                  >
                    <span>{exp.cta.label}</span> <ArrowUpRight size={13} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link
                    href={`/experiences#${exp.slug}`}
                    className="link-line flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-hs-gold hover:text-white transition-colors"
                  >
                    <span>Discover</span> <span className="sr-only">{exp.title}</span> <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}

        <div aria-hidden className="w-[4vw] shrink-0" />
      </HorizontalScroll>
    </div>
  );
}
