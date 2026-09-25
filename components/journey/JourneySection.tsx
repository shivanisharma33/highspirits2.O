"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DESKTOP_MOTION, MOTION_OK, gsap, ScrollTrigger } from "@/components/motion/gsap";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRight } from "@/components/ui/Icons";
import { cx } from "@/lib/format";
import { media, type Media } from "@/lib/images";

export type Milestone = {
  id: string;
  year: string;
  title: string;
  description: string;
  /** Small gold place/context label beside the chapter number. */
  place: string;
  image: Media;
  caption: string;
  /** Frame orientation — chosen so no face, dish or sign is cropped. */
  orientation: "portrait" | "landscape";
  /** Frame ratio (Tailwind class) matched to the source photograph. */
  aspect: string;
  /** object-position for the photograph inside its frame. */
  focus: string;
};

export const MILESTONES: Milestone[] = [
  {
    id: "vision-2015",
    year: "2015",
    title: "The Vision",
    description:
      "Born from a dream to bring authentic North Indian fine dining to Australia, High Spirits was conceived to introduce a revolutionary fusion of authentic flavours with Australian produce in an elegant setting.",
    place: "The Beginning",
    image: media.journeyDiningHall,
    caption: "The warm chandelier-lit dining room, set for service",
    orientation: "landscape",
    aspect: "aspect-[4/3]",
    focus: "50% 50%",
  },
  {
    id: "acclaim-2020",
    year: "2020",
    title: "Chef of the Year",
    description:
      "Executive Chef Amardeep Singh was crowned Chef of the Year by the Australian Culinary Federation, gaining national acclaim for culinary excellence.",
    place: "National acclaim",
    image: media.journeyChefAmardeep,
    caption: "Executive Chef Amardeep Singh",
    orientation: "portrait",
    aspect: "aspect-[4/5]",
    focus: "50% 25%",
  },
  {
    id: "bunbury-2023",
    year: "2023",
    title: "Destination Bunbury",
    description:
      "Bringing our culinary legacy to 1/57 Victoria Street in Bunbury, crafting an intimate destination for refined fine dining and lavish buffets.",
    place: "Bunbury, WA",
    image: media.journeyBunburyExterior,
    caption: "1/57 Victoria Street, Bunbury — glowing at night",
    orientation: "landscape",
    aspect: "aspect-[4/3]",
    focus: "50% 50%",
  },
  {
    id: "today-2026",
    year: "2026",
    title: "A Legacy of Excellence",
    description:
      "Today, High Spirits stands as Western Australia's celebrated benchmark for modern Indian gastronomy, celebrated by more than 560 five-star reviews.",
    place: "Today",
    image: media.journeyTeamGuests,
    caption: "Ishpreet and Amardeep celebrating with guests",
    orientation: "landscape",
    aspect: "aspect-[16/10]",
    focus: "50% 35%",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "The Journey" — a sticky editorial panel beside a single vertical timeline.
 * The rail draws itself as you scroll, a gold marker travels along it and the
 * chapter under the reading line comes into focus while the others recede.
 */
export function JourneySection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = root.current;
    if (!section) return;

    const chapters = gsap.utils.toArray<HTMLElement>("[data-jn-chapter]", section);
    const rail = section.querySelector<HTMLElement>("[data-jn-rail]");
    const fill = section.querySelector<HTMLElement>("[data-jn-fill]");
    const marker = section.querySelector<HTMLElement>("[data-jn-marker]");

    // The chapter in focus is the last one whose top has crossed the reading
    // line (60% down the viewport). Measured on every update rather than via
    // per-chapter toggles, so index jumps and fast flicks never skip a chapter.
    section.classList.add("is-live");
    const pick = () => {
      const line = window.innerHeight * 0.6;
      let index = 0;
      chapters.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) index = i;
      });
      setActive(index);
    };
    const focus = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: pick,
      onRefresh: pick,
    });
    pick();

    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const last = chapters[chapters.length - 1];
      if (rail && fill && marker && last) {
        // Both ride the reading line: the line draws down to it, and the marker
        // travels with it until it settles on the final chapter's node.
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: rail, start: "top 60%", end: "bottom 60%", scrub: 0.9 },
          },
        );
        gsap.set(marker, { autoAlpha: 1 });
        gsap.fromTo(
          marker,
          { y: 0 },
          {
            y: () => last.offsetTop,
            ease: "none",
            scrollTrigger: {
              trigger: rail,
              start: "top 60%",
              endTrigger: last,
              end: "top 60%",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      chapters.forEach((chapter) => {
        const texts = chapter.querySelectorAll("[data-jn-text]");
        const frame = chapter.querySelector("[data-jn-frame]");
        const accent = chapter.querySelector("[data-jn-accent]");

        const tl = gsap.timeline({
          defaults: { ease: "power4.out", duration: 1.5 },
          scrollTrigger: { trigger: chapter, start: "top 82%", once: true },
        });
        tl.fromTo(
          texts,
          { clipPath: "inset(-20% -8% 100% -8%)", y: 26 },
          { clipPath: "inset(-20% -8% -20% -8%)", y: 0, stagger: 0.11, clearProps: "clipPath,transform" },
          0,
        );
        if (frame) {
          tl.fromTo(
            frame,
            { clipPath: "inset(12% 9% 12% 9% round 1.25rem)" },
            { clipPath: "inset(0% 0% 0% 0% round 1.25rem)", duration: 2, ease: "expo.out", clearProps: "clipPath" },
            0.15,
          );
        }
        if (accent) tl.fromTo(accent, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0.35);
      });
    });

    // Image breathing + a whisper of parallax: desktop pointers only.
    mm.add(DESKTOP_MOTION, () => {
      chapters.forEach((chapter) => {
        const frame = chapter.querySelector("[data-jn-frame]");
        const photo = chapter.querySelector("[data-jn-media]");
        if (!frame || !photo) return;
        gsap.fromTo(
          photo,
          { scale: 1.05 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "center 55%", scrub: 1 } },
        );
        gsap.fromTo(
          photo,
          { yPercent: -3 },
          { yPercent: 3, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 1 } },
        );
      });
    });

    return () => {
      focus.kill();
      mm.revert();
      section.classList.remove("is-live");
    };
  }, []);

  const current = MILESTONES[active];

  return (
    <section
      ref={root}
      id="journey"
      aria-labelledby="journey-title"
      className="journey grain relative bg-hs-green-dark py-12 md:py-16 lg:py-20"
    >
      <div className="shell md:grid md:grid-cols-12 md:gap-x-10 xl:gap-x-16">
        {/* ── Story panel: anchored while the chapters travel past ─────────── */}
        <header className="md:col-span-5 lg:col-span-4">
          <div className="jn-panel md:sticky md:top-[calc(var(--header-h)+2.5rem)] md:flex md:h-[calc(100svh-var(--header-h)-5rem)] md:flex-col md:justify-between">
            <div>
              <p className="eyebrow">Our Journey</p>
              <h2
                id="journey-title"
                className="font-display mt-6 text-[clamp(2.6rem,4.3vw,5rem)] font-normal leading-[1] tracking-[-0.025em] text-hs-cream"
              >
                <span className="block">A Legacy of</span>
                <em className="jn-title-em block text-gold-gradient">Excellence</em>
              </h2>
              <p className="mt-6 max-w-[23rem] text-[0.95rem] font-light leading-[1.75] text-hs-cream/70 md:text-base">
                From humble beginnings to Australia&apos;s most celebrated Indian fine dining destination.
              </p>
              <p className="mt-9 hidden items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.3em] text-hs-gold md:flex">
                <span>Scroll to discover</span>
                <ArrowRight size={13} className="jn-cue-arrow" />
              </p>
            </div>

            {/* Faint editorial year: crossfades as each chapter takes focus */}
            <div aria-hidden className="jn-ghosts">
              {MILESTONES.map((m, i) => (
                <span key={m.id} className="jn-ghost font-display" data-active={i === active || undefined}>
                  {m.year}
                </span>
              ))}
            </div>

            <nav aria-label="Journey chapters" className="jn-index hidden md:block">
              <p className="flex items-baseline gap-3 text-[0.62rem] font-medium uppercase tracking-[0.3em] text-hs-cream/45">
                <span className="font-display text-[1.75rem] leading-none tracking-normal text-hs-gold tabular-nums">
                  {pad(active + 1)}
                </span>
                <span>/ {pad(MILESTONES.length)}</span>
                <span aria-hidden className="h-px w-8 self-center bg-hs-cream/20" />
                <span className="truncate" aria-live="polite">
                  {current.title}
                </span>
              </p>
              <ol className="mt-6 border-l border-hs-cream/10">
                {MILESTONES.map((m, i) => (
                  <li key={m.id}>
                    <a
                      href={`#journey-${m.year}`}
                      aria-current={i === active ? "step" : undefined}
                      className="jn-index-link"
                    >
                      <span className="font-display text-[1.05rem] tabular-nums">{m.year}</span>
                      <span className="jn-index-title hidden lg:inline">{m.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </header>

        {/* ── The timeline ─────────────────────────────────────────────────── */}
        <div className="relative mt-10 sm:mt-16 md:col-span-7 md:mt-0 lg:col-span-8">
          <div className="relative">
            <span aria-hidden data-jn-rail className="jn-rail">
              <span data-jn-fill className="jn-rail-fill" />
              <span data-jn-marker className="jn-marker" />
            </span>

            <ol className="relative">
              {MILESTONES.map((m, i) => (
                <Chapter key={m.id} milestone={m} index={i} active={i === active} passed={i < active} />
              ))}
            </ol>
          </div>

          {/* Coda: the next chapter */}
          <div className="jn-coda relative pl-9 md:pl-12 xl:pl-20">
            <span aria-hidden className="jn-coda-mark" />
            <p className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-hs-gold">
              <span aria-hidden>✦</span> Tradition
            </p>
            <h3 className="font-display mt-3.5 sm:mt-4 text-[clamp(1.5rem,2.6vw,2.6rem)] font-normal leading-[1.1] text-hs-cream">
              Be Part of Our <em className="whitespace-nowrap text-hs-gold-soft">Next Chapter</em>
            </h3>
            <div className="mt-3 gap-8 lg:flex lg:items-center lg:justify-between">
              <p className="max-w-[30rem] text-[0.88rem] sm:text-[0.95rem] font-light leading-relaxed text-hs-cream/65">
                Join us for an unforgettable dining experience in Bunbury, WA.
              </p>
              <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3 lg:mt-0 lg:shrink-0">
                <ButtonLink href="/reservation" className="w-full sm:w-auto text-center justify-center">Reserve a Table</ButtonLink>
                <ButtonLink href="/menu" variant="ghost" arrow={false} className="w-full sm:w-auto text-center justify-center">
                  Explore Menu
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ChapterProps = { milestone: Milestone; index: number; active: boolean; passed: boolean };

function Chapter({ milestone: m, index, active, passed }: ChapterProps) {
  const alt = index % 2 === 1;
  const portrait = m.orientation === "portrait";

  return (
    <li
      id={`journey-${m.year}`}
      data-jn-chapter
      data-active={active || undefined}
      data-passed={passed || undefined}
      aria-labelledby={`milestone-${m.id}`}
      className="jn-chapter relative pl-9 md:pl-12 xl:pl-20"
    >
      <span aria-hidden className="jn-node" />

      <div className="jn-grid">
        {/* Chapter label, year, title */}
        <div className={cx("jn-dim jn-head", alt ? "xl:col-[1/9]" : "xl:col-[1/6]")}>
          <p data-jn-text className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-hs-gold">
            <span className="whitespace-nowrap">Chapter {pad(index + 1)}</span>
            <span aria-hidden className="h-px w-6 bg-hs-gold/50" />
            <span className="whitespace-nowrap font-medium text-hs-gold/75">{m.place}</span>
          </p>
          <p className="jn-year font-display" aria-hidden>
            <span data-jn-text className="block">
              {m.year}
            </span>
          </p>
          <h3
            id={`milestone-${m.id}`}
            data-jn-text
            className="font-display mt-4 text-[clamp(1.65rem,2.5vw,2.6rem)] font-normal leading-[1.08] tracking-[-0.01em] text-hs-cream"
          >
            <span className="sr-only">{m.year} — </span>
            {m.title}
          </h3>
        </div>

        {/* Photograph */}
        <figure
          className={cx(
            "jn-figure",
            portrait ? "jn-figure--portrait" : "jn-figure--landscape",
            alt ? "xl:col-[1/8] xl:row-[2] xl:mt-10" : portrait ? "xl:col-[7/13] xl:row-[1/3]" : "xl:col-[6/13] xl:row-[1/3]",
          )}
        >
          <div
            data-jn-frame
            className={cx("jn-frame media-zoom", m.aspect)}
          >
            <div data-jn-media className="jn-media">
              <Image
                src={m.image.src}
                alt={m.image.alt}
                fill
                sizes={
                  portrait
                    ? "(min-width: 1280px) 26vw, (min-width: 1024px) 30vw, (min-width: 768px) 24rem, 90vw"
                    : "(min-width: 1280px) 34vw, (min-width: 1024px) 30vw, (min-width: 768px) 55vw, 90vw"
                }
                quality={80}
                placeholder="blur"
                className="object-cover"
                style={{ objectPosition: m.focus } as CSSProperties}
              />
            </div>
          </div>
          <figcaption className="mt-3 flex items-baseline gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-hs-cream/40">
            <span className="shrink-0 text-hs-gold/70 tabular-nums">Fig. {pad(index + 1)}</span>
            <span className="normal-case tracking-[0.04em]">{m.caption}</span>
          </figcaption>
        </figure>

        {/* Supporting copy */}
        <div
          className={cx(
            "jn-dim jn-body",
            alt ? "xl:col-[8/13] xl:row-[2] xl:self-end" : "xl:col-[1/6] xl:row-[2]",
          )}
        >
          <span data-jn-accent aria-hidden className="block h-px w-12 origin-left bg-hs-gold/70" />
          <p data-jn-text className="mt-5 max-w-[36ch] text-[0.95rem] font-light leading-[1.8] text-hs-cream/72">
            {m.description}
          </p>
        </div>
      </div>
    </li>
  );
}
