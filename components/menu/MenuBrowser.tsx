"use client";

import Image from "next/image";
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { Flame, Leaf } from "@/components/ui/Icons";
import { dietLabels, menuCategories, type Diet } from "@/lib/content/menu";
import { cx, formatPrice } from "@/lib/format";
import { lenisStore } from "@/lib/lenis";

const dietFilters: Diet[] = ["V", "VG", "S"];

export function DietBadge({ diet }: { diet: Diet }) {
  return (
    <abbr title={dietLabels[diet]} className={cx("diet no-underline", diet === "S" ? "text-hs-gold-soft" : "text-hs-gold-pale")}>
      {diet === "S" ? <Flame size={11} /> : diet}
      <span className="sr-only">{dietLabels[diet]}</span>
    </abbr>
  );
}

/** Luxury digital menu: sticky category rail, dietary filters, animated transitions without reloads. */
export function MenuBrowser() {
  const [active, setActive] = useState("all");
  const [diet, setDiet] = useState<Diet | null>(null);
  const top = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      menuCategories
        .filter((c) => active === "all" || c.slug === active)
        .map((c) => ({ ...c, items: diet ? c.items.filter((i) => i.diet?.includes(diet)) : c.items }))
        .filter((c) => c.items.length > 0),
    [active, diet],
  );
  const count = visible.reduce((n, c) => n + c.items.length, 0);

  const scrollToTop = () => {
    const el = top.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 24;
    if (window.scrollY <= y) return;
    const lenis = lenisStore.get();
    if (lenis) lenis.scrollTo(y, { duration: 0.9 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const choose = (slug: string) => {
    setActive(slug);
    scrollToTop();
  };

  const tabs = [{ slug: "all", short: "All dishes" }, ...menuCategories];

  return (
    <LazyMotion features={domAnimation}>
      <div ref={top} className="scroll-mt-40" />
      <div className="sticky top-[calc(var(--header-h)+0.75rem)] z-30">
        <div className="glass flex items-center gap-2 rounded-full p-1.5">
          <div role="group" aria-label="Menu categories" className="no-scrollbar flex flex-1 gap-1 overflow-x-auto" data-lenis-prevent>
            {tabs.map((t) => (
              <button
                key={t.slug}
                type="button"
                aria-pressed={active === t.slug}
                onClick={() => choose(t.slug)}
                className={cx(
                  "shrink-0 rounded-full px-4 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500",
                  active === t.slug ? "bg-hs-gold text-hs-green-deep" : "text-hs-cream/75 hover:text-hs-cream",
                )}
              >
                {t.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Dietary filters" className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-[0.65rem] uppercase tracking-[0.24em] text-hs-cream/50">Filter</span>
          {dietFilters.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={diet === d}
              onClick={() => setDiet((cur) => (cur === d ? null : d))}
              className={cx(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-xs tracking-wide transition-colors duration-300",
                diet === d ? "border-hs-gold bg-hs-gold/15 text-hs-cream" : "border-hs-cream/20 text-hs-cream/70 hover:border-hs-gold/60",
              )}
            >
              {d === "S" ? <Flame size={13} /> : <Leaf size={13} />}
              {dietLabels[d]}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-xs uppercase tracking-[0.22em] text-hs-cream/55">
          {count} {count === 1 ? "dish" : "dishes"}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={`${active}-${diet ?? "any"}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
          className="mt-14 grid gap-24"
        >
          {visible.length === 0 && <p className="py-20 text-center text-hs-cream/60">No dishes match that filter in this category.</p>}
          {visible.map((cat, ci) => (
            <section key={cat.slug} id={`menu-${cat.slug}`} aria-labelledby={`h-${cat.slug}`} className="grid gap-10 lg:grid-cols-12">
              <header className="lg:col-span-4">
                <div className="lg:sticky lg:top-[calc(var(--header-h)+6rem)]">
                  <p className="font-display text-sm text-hs-gold">{String(ci + 1).padStart(2, "0")}</p>
                  <h2 id={`h-${cat.slug}`} className="font-display mt-2 text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.02]">
                    {cat.title}
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-hs-cream/65">{cat.intro}</p>
                  {cat.image && (
                    <div className="media-zoom relative mt-8 hidden aspect-[4/3] overflow-hidden lg:block">
                      <Image src={cat.image.src} alt={cat.image.alt} fill sizes="30vw" placeholder="blur" className="object-cover" />
                    </div>
                  )}
                </div>
              </header>
              <ul className="grid content-start gap-x-12 lg:col-span-8 md:grid-cols-2">
                {cat.items.map((item, i) => (
                  <m.li
                    key={item.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 10) * 0.035, duration: 0.5 } }}
                    className="group border-b border-hs-cream/10 py-6"
                  >
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-xl leading-snug transition-colors duration-500 group-hover:text-hs-gold-pale">{item.name}</h3>
                      <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-hs-cream/25" />
                      <p className="shrink-0 text-sm tracking-wide text-hs-gold">{formatPrice(item.price)}</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-hs-cream/65">{item.description}</p>
                    {item.diet && item.diet.length > 0 && (
                      <p className="mt-3 flex gap-1.5">
                        {item.diet.map((d) => (
                          <DietBadge key={d} diet={d} />
                        ))}
                      </p>
                    )}
                  </m.li>
                ))}
              </ul>
            </section>
          ))}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
