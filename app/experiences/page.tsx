import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Parallax } from "@/components/motion/Parallax";
import { ClipReveal, FadeUp, ImageReveal, IntroLines, TextReveal } from "@/components/motion/Reveal";
import { ReservationCTA } from "@/components/sections/ReservationCTA";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { eventsExperience, experiences, type Experience } from "@/lib/content/experiences";
import { cx } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Experiences | Chef's Table, Buffet & Degustation",
  description:
    "Chef's Table, degustation journeys, the lavish evening buffet, lunch, private events, corporate dining and delivery — the signature experiences of High Spirits, Bunbury.",
  path: "/experiences",
});

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

// Page order: the six signature experiences with private events after corporate dining.
const all: Experience[] = [...experiences.slice(0, 4), eventsExperience, ...experiences.slice(4)];

function Meta({ exp, light }: { exp: Experience; light?: boolean }) {
  return (
    <ul className={cx("flex flex-wrap gap-x-5 gap-y-2 text-[0.66rem] uppercase tracking-[0.24em]", light ? "text-hs-muted" : "text-hs-cream/75")}>
      {exp.meta.map((m, i) => (
        <li key={m} className="flex items-center gap-5">
          {i > 0 && <span aria-hidden className={cx("h-1 w-1 rotate-45", light ? "bg-hs-gold-deep" : "bg-hs-gold")} />}
          {m}
        </li>
      ))}
    </ul>
  );
}

function Features({ exp, light }: { exp: Experience; light?: boolean }) {
  return (
    <ul className={cx("mt-8 grid gap-3 border-t pt-6", light ? "border-hs-line text-hs-text/80" : "border-hs-cream/15 text-hs-cream/80")}>
      {exp.features.map((f) => (
        <li key={f} className="flex items-center gap-4 text-sm">
          <span aria-hidden className={cx("h-px w-6", light ? "bg-hs-gold-deep" : "bg-hs-gold")} />
          {f}
        </li>
      ))}
    </ul>
  );
}

function Cta({ exp, light }: { exp: Experience; light?: boolean }) {
  return (
    <ButtonLink href={exp.cta.href} external={exp.cta.external} variant={light ? "dark" : "gold"} className="mt-10">
      {exp.cta.label}
    </ButtonLink>
  );
}

/** Each experience gets its own composition, driven by its tone. */
function ExperienceChapter({ exp, index }: { exp: Experience; index: number }) {
  const no = String(index + 1).padStart(2, "0");
  const titleId = `t-${exp.slug}`;

  if (exp.tone === "noir") {
    return (
      <section id={exp.slug} aria-labelledby={titleId} className="relative flex min-h-[100svh] scroll-mt-0 items-end overflow-hidden bg-hs-green-deep">
        <Parallax speed={0.16} className="absolute -inset-y-[10%] inset-x-0">
          <Image src={exp.image.src} alt={exp.image.alt} fill sizes="100vw" placeholder="blur" className="object-cover" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-hs-green-deep via-hs-green-deep/55 to-hs-green-deep/20" />
        <div className="shell relative grid w-full gap-10 pb-20 pt-40 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <FadeUp as="p" className="eyebrow">
              {no} · {exp.kicker}
            </FadeUp>
            <TextReveal as="h2" id={titleId} className="font-display mt-7 text-h1 uppercase" lines={[exp.title]} />
          </div>
          <FadeUp delay={0.15} className="glass glass-edge glass-spot rounded-[1.75rem] p-7 md:p-9 lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-hs-cream/85">{exp.description}</p>
            <div className="mt-8">
              <Meta exp={exp} />
            </div>
            <Features exp={exp} />
            <Cta exp={exp} />
          </FadeUp>
        </div>
      </section>
    );
  }

  if (exp.tone === "cream") {
    return (
      <section id={exp.slug} aria-labelledby={titleId} className="surface-light relative overflow-hidden bg-hs-cream py-28 text-hs-text md:py-40">
        <div className="shell grid items-center gap-14 lg:grid-cols-12">
          <ClipReveal className="relative aspect-[3/4] overflow-hidden lg:col-span-5" data-cursor="View">
            <Image src={exp.image.src} alt={exp.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="object-cover" />
          </ClipReveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <FadeUp as="p" className="font-display text-[clamp(5rem,12vw,11rem)] leading-none text-hs-gold-deep/25">
              {no}
            </FadeUp>
            <FadeUp as="p" className="eyebrow -mt-4">
              {exp.kicker}
            </FadeUp>
            <TextReveal as="h2" id={titleId} className="font-display mt-6 text-h2 text-hs-green" lines={[exp.title]} />
            <FadeUp delay={0.15}>
              <p className="mt-8 max-w-lg text-lead text-hs-text/80">{exp.description}</p>
              <div className="mt-8">
                <Meta exp={exp} light />
              </div>
              <Features exp={exp} light />
              <Cta exp={exp} light />
            </FadeUp>
          </div>
        </div>
      </section>
    );
  }

  if (exp.tone === "gold") {
    const flip = index % 2 === 1;
    return (
      <section id={exp.slug} aria-labelledby={titleId} className="grain relative overflow-hidden bg-hs-green py-28 md:py-40">
        <div aria-hidden className="absolute inset-y-0 w-1/2 bg-[radial-gradient(closest-side,hsl(42_78%_51%/0.14),transparent)]" style={{ [flip ? "left" : "right"]: 0 } as CSSProperties} />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-12">
          <div className={cx("lg:col-span-5", flip ? "lg:order-2 lg:col-start-8" : "")}>
            <FadeUp as="p" className="eyebrow">
              {no} · {exp.kicker}
            </FadeUp>
            <TextReveal as="h2" id={titleId} className="font-display mt-7 text-h2" lines={[<em key="t" className="text-gold-gradient">{exp.title}</em>]} />
            <FadeUp delay={0.15}>
              <p className="mt-8 text-lead text-hs-cream/80">{exp.description}</p>
              <div className="mt-8">
                <Meta exp={exp} />
              </div>
              <Features exp={exp} />
              <Cta exp={exp} />
            </FadeUp>
          </div>
          <ImageReveal className={cx("relative aspect-[16/11] overflow-hidden lg:col-span-7", flip ? "lg:order-1 lg:col-start-1" : "")} data-cursor="View">
            <Image src={exp.image.src} alt={exp.image.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" placeholder="blur" className="object-cover" />
            <span aria-hidden className="absolute inset-5 border border-hs-gold/40" />
          </ImageReveal>
        </div>
      </section>
    );
  }

  // emerald — centred glass card over the photograph
  return (
    <section id={exp.slug} aria-labelledby={titleId} className="relative flex min-h-[100svh] items-center overflow-hidden bg-hs-green-dark py-28">
      <Image src={exp.image.src} alt={exp.image.alt} fill sizes="100vw" placeholder="blur" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-hs-green-deep/55" />
      <div className="shell relative">
        <FadeUp className="glass glass-edge glass-spot mx-auto max-w-2xl rounded-[2rem] p-8 text-center sm:p-12 md:p-16">
          <p className="eyebrow eyebrow--plain justify-center">
            {no} · {exp.kicker}
          </p>
          <h2 id={titleId} className="font-display mt-6 text-h2">
            {exp.title}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-hs-cream/85">{exp.description}</p>
          <div className="mt-8 flex justify-center">
            <Meta exp={exp} />
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {exp.features.map((f) => (
              <li key={f} className="rounded-full border border-hs-gold/40 px-4 py-2 text-xs text-hs-cream/85">
                {f}
              </li>
            ))}
          </ul>
          <Cta exp={exp} />
        </FadeUp>
      </div>
    </section>
  );
}

export default function ExperiencesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Experiences", path: "/experiences" }])} />

      {/* Hero — title with a table of contents */}
      <section aria-labelledby="experiences-title" className="grain relative overflow-hidden bg-hs-green-deep pb-24 pt-[calc(var(--header-h)+5rem)] md:pb-32">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow intro-rise" style={d(0.1)}>
              Extraordinary moments
            </p>
            <IntroLines
              as="h1"
              id="experiences-title"
              className="font-display mt-8 text-[clamp(3.2rem,8.4vw,9.5rem)] leading-[0.9] tracking-[-0.03em]"
              lines={["Signature", <em key="e" className="text-gold-gradient pr-[0.06em]">Experiences</em>]}
              start={0.2}
            />
            <p className="intro-rise mt-10 max-w-lg text-lead text-hs-cream/75" style={d(0.6)}>
              Curated exclusively for the discerning palate, each experience is a masterpiece of culinary artistry and impeccable service.
            </p>
          </div>
          <nav aria-label="Experiences on this page" className="intro-rise lg:col-span-4 lg:col-start-9" style={d(0.75)}>
            <ol className="border-t border-hs-cream/15">
              {all.map((exp, i) => (
                <li key={exp.slug}>
                  <Link href={`#${exp.slug}`} className="group flex items-baseline gap-5 border-b border-hs-cream/15 py-4 transition-colors hover:text-hs-gold">
                    <span className="text-[0.65rem] tracking-[0.2em] text-hs-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-xl transition-transform duration-500 ease-luxe group-hover:translate-x-2">{exp.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {all.map((exp, i) => (
        <ExperienceChapter key={exp.slug} exp={exp} index={i} />
      ))}

      <ReservationCTA />
    </>
  );
}
