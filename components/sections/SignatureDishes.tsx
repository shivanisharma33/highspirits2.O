"use client";

import { useState } from "react";
import { DishCard } from "@/components/cards/DishCard";
import { FadeUp } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { signatureDishes } from "@/lib/content/dishes";
import { cx } from "@/lib/format";

type CategoryFilter = "all" | "Non-Veg" | "North Indian";

export function SignatureDishes() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const nonVegCount = signatureDishes.filter((d) => d.categoryTag === "Non-Veg").length;
  const northIndianCount = signatureDishes.filter((d) => d.categoryTag === "North Indian").length;

  const filteredDishes =
    activeCategory === "all"
      ? signatureDishes
      : signatureDishes.filter((dish) => dish.categoryTag === activeCategory);

  return (
    <section aria-labelledby="signature-title" className="grain relative overflow-hidden bg-hs-green-dark py-24 md:py-36">
      {/* Drifting Emerald & Gold Ambient Aurora */}
      <Aurora />

      <div className="shell relative">
        {/* Header with Title and Narrative */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="signature-title"
            eyebrow="Signature Creations"
            className="lg:col-span-7"
            lines={["Plates we're", <em key="k" className="text-gold-gradient">celebrated for.</em>]}
          />
          <FadeUp className="lg:col-span-5 lg:col-start-8">
            <p className="text-lead text-hs-cream/80">
              Handcrafted with ethical Tasmanian produce and authentic Punjabi spices — our most revered culinary masterworks, perfected for an unforgettable dining experience.
            </p>
          </FadeUp>
        </div>

        {/* Category Filter Tabs & Status */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={cx(
                "group flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300",
                activeCategory === "all"
                  ? "bg-hs-gold text-hs-green-deep shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                  : "border border-white/10 bg-white/[0.04] text-hs-cream/70 hover:border-hs-gold/40 hover:text-white"
              )}
            >
              <span>All Creations</span>
              <span
                className={cx(
                  "rounded-full px-1.5 py-0.5 text-[0.62rem] font-bold font-mono",
                  activeCategory === "all"
                    ? "bg-hs-green-deep/20 text-hs-green-deep"
                    : "bg-white/10 text-hs-cream/80"
                )}
              >
                {signatureDishes.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("Non-Veg")}
              className={cx(
                "group flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300",
                activeCategory === "Non-Veg"
                  ? "bg-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.4)]"
                  : "border border-white/10 bg-white/[0.04] text-hs-cream/70 hover:border-red-500/40 hover:text-white"
              )}
            >
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span>Non-Veg</span>
              <span
                className={cx(
                  "rounded-full px-1.5 py-0.5 text-[0.62rem] font-bold font-mono",
                  activeCategory === "Non-Veg"
                    ? "bg-black/30 text-white"
                    : "bg-white/10 text-hs-cream/80"
                )}
              >
                {nonVegCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("North Indian")}
              className={cx(
                "group flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300",
                activeCategory === "North Indian"
                  ? "bg-hs-gold text-hs-green-deep shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                  : "border border-white/10 bg-white/[0.04] text-hs-cream/70 hover:border-hs-gold/40 hover:text-white"
              )}
            >
              <span className="h-2 w-2 rounded-full bg-hs-gold" />
              <span>North Indian</span>
              <span
                className={cx(
                  "rounded-full px-1.5 py-0.5 text-[0.62rem] font-bold font-mono",
                  activeCategory === "North Indian"
                    ? "bg-hs-green-deep/20 text-hs-green-deep"
                    : "bg-white/10 text-hs-cream/80"
                )}
              >
                {northIndianCount}
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-hs-gold/80">
            <span className="h-1.5 w-1.5 rounded-full bg-hs-gold animate-pulse" />
            Clay Oven & Charcoal Fired
          </div>
        </div>

        {/* Symmetrical Neat & Clean 3-Column Luxury Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.no} dish={dish} />
          ))}
        </div>

        {/* Bottom Menu Callout (Luxury Emerald Glass) */}
        <div className="mt-16 rounded-3xl border border-hs-gold/20 bg-hs-green-deep/60 p-8 md:p-10 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-white tracking-wide">
              Explore Our Full Dining Menu
            </h3>
            <p className="mt-2 text-sm text-hs-cream/75 leading-relaxed">
              From charcoal-fired clay tandoor specialties and slow-simmered Punjabi curries to freshly baked naans and artisan drinks — explore over 80 authentic selections.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <ButtonLink href="/menu" variant="gold">
              View Full Menu
            </ButtonLink>
            <ButtonLink href="https://order.highspirits.au/" external variant="ghost">
              Order Online
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
