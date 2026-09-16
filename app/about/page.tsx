import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ChefStory } from "@/components/chef/ChefStory";
import { Parallax } from "@/components/motion/Parallax";
import { ClipReveal, FadeUp, ImageReveal, IntroLines, TextReveal } from "@/components/motion/Reveal";
import { ReservationCTA } from "@/components/sections/ReservationCTA";
import { Timeline } from "@/components/timeline/Timeline";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { mission, partner, philosophy, team, values } from "@/lib/content/story";
import { media } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { accolade, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About | Indian Fine Dining in Bunbury",
  description: "Learn about High Spirits, a Bunbury Indian dining destination known for its curated buffet, refined flavours and welcoming hospitality.",
  path: "/about",
});

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function AboutPage() {
  const fusion = philosophy[2];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      {/* 1. Hero — vertical editorial: headline, then a cinematic band */}
      <section aria-labelledby="about-title" className="grain relative overflow-hidden bg-hs-green-deep pt-[calc(var(--header-h)+5rem)]">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <p className="eyebrow intro-rise" style={d(0.1)}>
              About High Spirits
            </p>
            <p className="intro-rise max-w-xs text-sm text-hs-cream/60" style={d(0.2)}>
              A destination restaurant & bar at 1/57 Victoria Street, Bunbury.
            </p>
          </div>
          <IntroLines
            as="h1"
            id="about-title"
            className="font-display mt-10 text-h1"
            start={0.25}
            lines={["Where tradition", <span key="2" className="pl-[10vw]">meets <em className="text-gold-gradient">luxury</em></span>, "in every bite."]}
          />
        </div>
        <div className="intro-rise relative mt-16 aspect-[16/10] w-full overflow-hidden md:mt-24 md:aspect-[21/9]" style={d(0.6)}>
          <Image src={media.teamFamily.src} alt={media.teamFamily.alt} fill preload sizes="100vw" placeholder="blur" className="intro-media object-cover" />
          <div aria-hidden className="absolute inset-0 bg-linear-to-b from-hs-green-deep/40 via-transparent to-hs-green-deep/50" />
        </div>
      </section>

      {/* 2. Brand story */}
      <section aria-labelledby="mission-title" className="surface-light bg-hs-cream py-28 text-hs-text md:py-40">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FadeUp as="p" className="eyebrow">
              Our mission
            </FadeUp>
            <TextReveal as="h2" id="mission-title" className="font-display mt-7 text-h2 text-hs-green" lines={["The soul", "of India,", <em key="e">in Bunbury.</em>]} />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <FadeUp as="p" className="text-lead text-hs-text/85 first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-hs-green">
              {mission[0]}
            </FadeUp>
            <FadeUp as="p" delay={0.1} className="mt-8 leading-relaxed text-hs-muted">
              {mission[1]}
            </FadeUp>
            <FadeUp as="blockquote" delay={0.15} className="font-display mt-14 border-l-2 border-hs-gold-deep pl-6 text-[clamp(1.6rem,2.6vw,2.4rem)] italic leading-snug text-hs-green">
              “Every dish carries a story of heritage, passion, and uncompromising quality.”
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 3. Philosophy — values */}
      <section aria-labelledby="values-title" className="grain relative overflow-hidden bg-hs-green-dark py-28 md:py-36">
        <Aurora />
        <div className="shell relative">
          <FadeUp as="p" className="eyebrow">
            Our philosophy
          </FadeUp>
          <FadeUp as="h2" id="values-title" className="font-display mt-7 max-w-3xl text-h2">
            Four promises on <em className="text-gold-gradient">every plate.</em>
          </FadeUp>
          <ol className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeUp as="li" key={v.title} delay={i * 0.08}>
                <div className="glass glass-edge glass-spot h-full rounded-[1.75rem] p-8 transition-transform duration-700 ease-luxe hover:-translate-y-2">
                  <span className="glass-chip">
                    <span className="text-hs-gold">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <h3 className="font-display mt-10 text-4xl">{v.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-hs-cream/70">{v.body}</p>
                </div>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Punjab → Australia */}
      <section aria-labelledby="journey-title" className="surface-light relative overflow-hidden bg-hs-sand py-28 text-hs-text md:py-40">
        <div className="shell">
          <h2 id="journey-title" className="sr-only">
            From Punjab to Australia
          </h2>
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
            <FadeUp as="p" className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-none text-hs-green">
              Punjab
            </FadeUp>
            <ClipReveal aria-hidden className="flex items-center gap-3 text-hs-gold-deep md:flex-col">
              <span className="h-px w-16 bg-hs-gold-deep md:h-24 md:w-px" />
              <span className="font-display text-3xl italic">to</span>
              <span className="h-px w-16 bg-hs-gold-deep md:h-24 md:w-px" />
            </ClipReveal>
            <FadeUp as="p" delay={0.1} className="font-display text-[clamp(3.5rem,10vw,10rem)] italic leading-none text-hs-gold-deep md:text-right">
              Australia
            </FadeUp>
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-center">
            <ImageReveal className="relative aspect-[4/3] overflow-hidden lg:col-span-5" data-cursor="View">
              <Parallax speed={0.12} className="absolute -inset-y-[8%] inset-x-0">
                <Image src={media.spices.src} alt={media.spices.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="object-cover" />
              </Parallax>
            </ImageReveal>
            <FadeUp className="lg:col-span-3 lg:px-4">
              <h3 className="font-display text-h3 italic text-hs-green">{fusion.title}</h3>
              <p className="mt-5 leading-relaxed text-hs-muted">{fusion.body}</p>
            </FadeUp>
            <ImageReveal delay={0.1} className="relative aspect-[3/4] overflow-hidden lg:col-span-4 lg:mt-24" data-cursor="View">
              <Image src={media.exteriorDay.src} alt={media.exteriorDay.alt} fill sizes="(min-width: 1024px) 32vw, 100vw" placeholder="blur" className="object-cover" />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 5. Chef */}
      <ChefStory cta={false} />

      {/* 6. Team */}
      <section aria-labelledby="team-title" className="bg-hs-green py-28 md:py-40">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ClipReveal className="relative aspect-[2/3] max-w-md overflow-hidden" data-cursor="View">
              <Image src={partner.portrait.src} alt={partner.portrait.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" placeholder="blur" className="object-cover" />
            </ClipReveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <FadeUp as="p" className="eyebrow">
              Meet our business partner
            </FadeUp>
            <TextReveal as="h2" id="team-title" className="font-display mt-7 text-h2" lines={["Ishpreet", <em key="e" className="text-gold-gradient">Bedi</em>]} />
            <FadeUp as="p" delay={0.1} className="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-hs-gold">
              {partner.role}
            </FadeUp>
            <FadeUp as="p" delay={0.15} className="mt-8 leading-relaxed text-hs-cream/80">
              {partner.bio}
            </FadeUp>
            <FadeUp as="p" delay={0.2} className="font-display mt-10 text-2xl italic leading-snug text-hs-cream/90">
              {team.body}
            </FadeUp>
          </div>
        </div>

        <div className="shell mt-24 grid grid-cols-2 gap-4 md:grid-cols-3">
          {team.images.map((img, i) => (
            <ImageReveal key={img.alt} delay={i * 0.08} className={`relative overflow-hidden ${i === 0 ? "row-span-2 aspect-[3/4] md:row-span-1" : "aspect-[4/3]"} ${i === 2 ? "col-span-2 md:col-span-1" : ""}`} data-cursor="View">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 33vw, 50vw" placeholder="blur" className="object-cover" />
            </ImageReveal>
          ))}
        </div>
      </section>

      {/* 7. Timeline */}
      <Timeline />

      {/* 8. Recognition */}
      <section aria-labelledby="awards-title" className="surface-light bg-hs-cream py-24 text-hs-text md:py-32">
        <div className="shell grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeUp as="p" className="eyebrow">
              Recognition
            </FadeUp>
            <FadeUp as="h2" id="awards-title" className="font-display mt-7 text-h2 text-hs-green">
              Voted by <em>our guests.</em>
            </FadeUp>
          </div>
          <FadeUp delay={0.1} className="glass-light glass-spot flex flex-col gap-8 rounded-[2rem] p-8 sm:flex-row sm:items-center md:p-12 lg:col-span-6 lg:col-start-7">
            <Image src={accolade.badge} alt="Australian Good Food Guide Readers' Choice Winner 2026 badge" width={250} height={150} className="h-auto w-44 shrink-0" />
            <div>
              <p className="font-display text-3xl text-hs-green">{accolade.title}</p>
              <p className="mt-2 text-hs-muted">{accolade.body}</p>
              <ButtonLink href={site.listings.agfg} external variant="outline-dark" className="mt-6">
                View on AGFG
              </ButtonLink>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 9. CTA */}
      <ReservationCTA />
    </>
  );
}
