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
        <div data-panel className="flex w-[82vw] flex-col justify-center pr-6 sm:w-[60vw] lg:h-[74vh] lg:w-[34vw] lg:pr-16">
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
            className="group relative h-[72svh] min-h-[32rem] w-[86vw] overflow-hidden rounded-[2rem] sm:w-[70vw] lg:h-[74vh] lg:w-[58vw] xl:w-[52vw]"
          >
            <Image
              src={exp.image.src}
              alt={exp.image.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 86vw"
              placeholder="blur"
              className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.05]"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-hs-green-deep/85 via-hs-green-deep/10 to-hs-green-deep/20" />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 md:p-8">
              <span className="font-display text-5xl text-hs-gold drop-shadow-[0_6px_20px_hsl(160_90%_3%/0.6)] md:text-6xl">{String(i + 1).padStart(2, "0")}</span>
              <span className="glass-chip">
                {String(i + 1).padStart(2, "0")} / {total}
              </span>
            </div>

            <div className="glass glass-edge absolute inset-x-3 bottom-3 rounded-[1.5rem] p-5 transition-transform duration-700 ease-luxe group-hover:-translate-y-1 md:inset-x-5 md:bottom-5 md:p-8">
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-hs-gold">{exp.kicker}</p>
              <h3 id={`exp-${exp.slug}`} className="font-display mt-3 text-[clamp(1.7rem,3.2vw,3.2rem)] uppercase leading-[0.95] tracking-tight">
                {exp.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-hs-cream/80 md:text-base">{exp.description}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-hs-cream/15 pt-4">
                <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.65rem] uppercase tracking-[0.22em] text-hs-cream/80">
                  {exp.meta.map((m, j) => (
                    <li key={m} className="flex items-center gap-4">
                      {j > 0 && <span aria-hidden className="h-1 w-1 rotate-45 bg-hs-gold" />}
                      {m}
                    </li>
                  ))}
                </ul>
                {exp.cta.external ? (
                  <a href={exp.cta.href} target="_blank" rel="noopener noreferrer" className="link-line text-xs font-semibold uppercase tracking-[0.22em] text-hs-gold">
                    {exp.cta.label} <ArrowUpRight size={14} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={`/experiences#${exp.slug}`} className="link-line text-xs font-semibold uppercase tracking-[0.22em] text-hs-gold">
                    Discover <span className="sr-only">{exp.title}</span> <ArrowRight size={14} />
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
