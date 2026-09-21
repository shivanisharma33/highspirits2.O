"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DESKTOP_MOTION, gsap } from "@/components/motion/gsap";
import { ClipRevealX, FadeUp, ImageReveal } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { signatureDishes, type SignatureDish } from "@/lib/content/dishes";
import { cx } from "@/lib/format";
import { lenisStore } from "@/lib/lenis";

type CategoryFilter = "all" | "Non-Veg" | "North Indian";

/** Curated running order for the gallery; any dish not listed follows. */
const RUNNING_ORDER = [
  "Dal Makhani",
  "Butter Chicken",
  "Tandoori Mixed Grill",
  "Biryani Royale",
  "Palak Paneer",
  "Tasmanian Lamb",
];

const DISHES: SignatureDish[] = [
  ...RUNNING_ORDER.flatMap((name) => signatureDishes.filter((d) => d.name === name)),
  ...signatureDishes.filter((d) => !RUNNING_ORDER.includes(d.name)),
];

/** Crop focus per photograph, so no bowl, plate or garnish is cut. */
const FOCUS: Record<string, string> = {
  "Dal Makhani": "50% 45%",
  "Butter Chicken": "52% 50%",
  "Tandoori Mixed Grill": "50% 58%",
  "Biryani Royale": "50% 50%",
  "Palak Paneer": "50% 50%",
  "Tasmanian Lamb": "50% 50%",
};

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All Creations" },
  { id: "Non-Veg", label: "Non-Veg" },
  { id: "North Indian", label: "North Indian" },
];

/** Fixed frame per gallery slot: a swapped-in dish never changes the layout. */
const SLOT_ASPECT = ["aspect-[5/4]", "aspect-[4/3]", "aspect-[3/2]", "aspect-[5/4]", "aspect-[4/3]"];

const pad = (n: number) => String(n).padStart(2, "0");
const numberOf = (dish: SignatureDish) => pad(DISHES.indexOf(dish) + 1);
const price = (dish: SignatureDish) => (dish.price ? `$${dish.price.toFixed(2)}` : null);
const inFilter = (filter: CategoryFilter) =>
  filter === "all" ? DISHES : DISHES.filter((d) => d.categoryTag === filter);

/**
 * "Signature Creations" as a culinary gallery: one plate holds the stage while
 * the rest sit in a staggered editorial index. Choosing a plate trades it with
 * the featured one in place, so nothing else on the page moves.
 */
export function SignatureDishes() {
  const root = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [order, setOrder] = useState<SignatureDish[]>(DISHES);
  const [previous, setPrevious] = useState<SignatureDish | null>(null);
  const [swapped, setSwapped] = useState(false);

  const featured = order[0];
  const supporting = order.slice(1);

  const chooseFilter = (next: CategoryFilter) => {
    if (next === filter) return;
    setFilter(next);
    setOrder(inFilter(next));
    setPrevious(null);
    setSwapped(false);
  };

  const feature = (slot: number) => {
    const next = [...order];
    [next[0], next[slot]] = [next[slot], next[0]];
    setPrevious(order[0]);
    setOrder(next);
    setSwapped(true);

    // Bring the stage into view so the change is seen, not just made.
    const stage = stageRef.current;
    if (!stage) return;
    const top = stage.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.35) {
      const lenis = lenisStore.get();
      if (lenis) lenis.scrollTo(stage, { offset: -110, duration: 1.4 });
      else window.scrollTo({ top: top + window.scrollY - 110, behavior: "smooth" });
    }
  };

  // A whisper of parallax (~14px) on every photograph: desktop pointers only.
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      gsap.utils.toArray<HTMLElement>("[data-sg-parallax]", section).forEach((el) => {
        gsap.fromTo(
          el,
          { y: -14 },
          {
            y: 14,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );
      });
    });
    return () => mm.revert();
  }, [filter]);

  return (
    <section
      ref={root}
      id="signature"
      aria-labelledby="signature-title"
      data-swapped={swapped || undefined}
      className="sg grain relative overflow-hidden bg-hs-green-dark py-24 md:py-32 xl:py-40"
    >
      <Aurora />

      <div className="shell relative">
        {/* ── Masthead ─────────────────────────────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="signature-title"
            eyebrow="Signature Creations"
            className="lg:col-span-7"
            lines={["Plates we're", <em key="k" className="sg-title-em text-gold-gradient">celebrated for.</em>]}
          />
          <FadeUp delay={0.2} className="lg:col-span-4 lg:col-start-9 lg:pb-3">
            <p className="text-lead font-light text-hs-cream/75">
              Handcrafted with the finest ingredients and authentic spices — the dishes our guests return for, night
              after night.
            </p>
          </FadeUp>
        </div>

        {/* ── Editorial filter ─────────────────────────────────────────── */}
        <FadeUp delay={0.3} className="mt-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-hs-cream/10 md:mt-20">
          <div role="group" aria-label="Filter signature creations" className="sg-filter">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => chooseFilter(f.id)}
                className="sg-filter-btn"
              >
                {f.label}
                <sup className="sg-filter-count tabular-nums">{pad(inFilter(f.id).length)}</sup>
              </button>
            ))}
          </div>
          <p className="hidden pb-4 text-[0.62rem] font-medium uppercase tracking-[0.3em] text-hs-gold/75 md:block">
            Clay Oven &amp; Charcoal Fired
          </p>
        </FadeUp>

        {/* ── The stage: one plate, given the room it deserves ─────────── */}
        <div key={`stage-${filter}`} ref={stageRef} className="sg-stage">
          <figure className="sg-stage-figure">
            <ImageReveal className="sg-frame aspect-[4/3]">
              <div data-sg-parallax className="sg-parallax">
                {order.map((dish) => (
                  <div
                    key={dish.name}
                    className="sg-layer"
                    data-state={dish === featured ? "active" : dish === previous ? "prev" : undefined}
                  >
                    <Image
                      src={dish.image.src}
                      alt={dish === featured ? dish.image.alt : ""}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      quality={80}
                      className="object-cover"
                      style={{ objectPosition: FOCUS[dish.name] } as CSSProperties}
                    />
                  </div>
                ))}
              </div>
            </ImageReveal>
            <figcaption className="mt-4 flex items-baseline gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-hs-cream/40">
              <span className="shrink-0 text-hs-gold/75 tabular-nums">Plate {numberOf(featured)}</span>
              <span aria-hidden className="h-px w-6 self-center bg-hs-cream/20" />
              <span className="normal-case tracking-[0.04em]">{featured.image.alt}</span>
            </figcaption>
          </figure>

          <div className="sg-stage-info">
            <span aria-hidden className="sg-ghost font-display" key={`ghost-${featured.name}`}>
              {numberOf(featured)}
            </span>

            <FadeUp delay={0.25} className="relative">
              <div key={featured.name} className="sg-swap" aria-live="polite">
                <p className="sg-rise flex items-baseline gap-3" style={{ "--i": 0 } as CSSProperties}>
                  <span className="font-display text-[clamp(3rem,5vw,5.25rem)] leading-[0.85] text-hs-gold tabular-nums">
                    {numberOf(featured)}
                  </span>
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-hs-cream/40 tabular-nums">
                    / {pad(DISHES.length)}
                  </span>
                </p>
                <p
                  className="sg-rise mt-7 text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-hs-gold"
                  style={{ "--i": 1 } as CSSProperties}
                >
                  {featured.region}
                </p>
                <h3
                  className="sg-rise font-display mt-3 text-[clamp(2.3rem,4vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.02em] text-hs-cream"
                  style={{ "--i": 2 } as CSSProperties}
                >
                  {featured.name}
                </h3>
                <ClipRevealX delay={0.5} className="mt-7">
                  <span aria-hidden className="block h-px w-14 bg-hs-gold/70" />
                </ClipRevealX>
                {featured.lines ? (
                  <p
                    className="sg-rise font-display mt-6 text-[1.35rem] italic leading-[1.45] text-hs-cream/85"
                    style={{ "--i": 3 } as CSSProperties}
                  >
                    {featured.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                ) : null}
                <p
                  className="sg-rise mt-6 max-w-[38ch] text-[0.95rem] font-light leading-[1.8] text-hs-cream/72"
                  style={{ "--i": 4 } as CSSProperties}
                >
                  {featured.description}
                </p>
                <p
                  className="sg-rise mt-6 text-[0.68rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-hs-cream/50"
                  style={{ "--i": 5 } as CSSProperties}
                >
                  {featured.notes.slice(0, 3).join("  ·  ")}
                </p>
                <div
                  className="sg-rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-hs-cream/10 pt-7"
                  style={{ "--i": 6 } as CSSProperties}
                >
                  {price(featured) && (
                    <p className="font-display text-[2rem] leading-none text-hs-cream tabular-nums">
                      <span className="sr-only">Price </span>
                      {price(featured)}
                    </p>
                  )}
                  <Link href="/menu" className="sg-view group">
                    <span>View dish</span>
                    <span aria-hidden className="sg-view-circle">
                      <ArrowRight size={14} />
                    </span>
                    <span className="sr-only"> — {featured.name} on the menu</span>
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* ── The collection: a staggered editorial index ──────────────── */}
        {supporting.length > 0 && (
          <div key={`gallery-${filter}`} className="sg-collection">
            <div className="flex items-baseline justify-between gap-6 border-b border-hs-cream/10 pb-4">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-hs-gold">The Collection</p>
              <p className="hidden text-[0.62rem] font-medium uppercase tracking-[0.3em] text-hs-cream/40 sm:block">
                Choose a plate to feature
              </p>
            </div>

            <ol className="sg-gallery">
              {supporting.map((dish, i) => (
                <li key={`${i}-${dish.name}`} className="sg-item group">
                  <ImageReveal className={cx("sg-frame", SLOT_ASPECT[i % SLOT_ASPECT.length])} delay={0.08 * (i % 2)}>
                    <div data-sg-parallax className="sg-parallax">
                      <Image
                        src={dish.image.src}
                        alt={dish.image.alt}
                        fill
                        sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 100vw"
                        quality={80}
                        className="sg-item-img object-cover"
                        style={{ objectPosition: FOCUS[dish.name] } as CSSProperties}
                      />
                    </div>
                  </ImageReveal>

                  <FadeUp delay={0.15} className="mt-6">
                    <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-hs-gold">
                      <span className="sg-item-no font-display text-[1.35rem] font-normal tracking-normal tabular-nums">
                        {numberOf(dish)}
                      </span>
                      <span aria-hidden className="sg-item-rule" />
                      <span className="text-hs-gold/80">{dish.region}</span>
                    </p>
                    <div className="mt-3 flex items-start justify-between gap-6">
                      <h3 className="font-display text-[clamp(1.6rem,2.2vw,2.15rem)] font-normal leading-[1.1] text-hs-cream">
                        <button
                          type="button"
                          onClick={() => feature(i + 1)}
                          className="sg-item-title text-left after:absolute after:inset-0 after:content-['']"
                        >
                          {dish.name}
                          <span className="sr-only"> — show as featured plate</span>
                        </button>
                      </h3>
                      <span aria-hidden className="sg-item-arrow">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                    <p className="mt-3 max-w-[44ch] text-[0.9rem] font-light leading-[1.75] text-hs-cream/65">
                      {dish.description}
                    </p>
                    {price(dish) && (
                      <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-hs-cream/45 tabular-nums">
                        {price(dish)}
                      </p>
                    )}
                  </FadeUp>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* ── Coda: the full menu ──────────────────────────────────────── */}
        <FadeUp className="mt-24 grid gap-8 border-t border-hs-cream/10 pt-10 md:mt-32 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-hs-gold">The Full Menu</p>
            <h3 className="font-display mt-4 text-[clamp(1.8rem,2.8vw,2.75rem)] font-normal leading-[1.1] text-hs-cream">
              Explore Our Full <em className="text-hs-gold-soft">Dining Menu</em>
            </h3>
            <p className="mt-4 max-w-[52ch] text-[0.95rem] font-light leading-relaxed text-hs-cream/65">
              From charcoal-fired clay tandoor specialties and slow-simmered Punjabi curries to freshly baked naans and
              artisan drinks — explore over 80 authentic selections.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ButtonLink href="/menu" variant="gold">
              View Full Menu
            </ButtonLink>
            <ButtonLink href="https://order.highspirits.au/" external variant="ghost">
              Order Online
            </ButtonLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
