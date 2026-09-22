"use client";

import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Flame, Leaf } from "@/components/ui/Icons";
import { dietLabels, menuCategories, type Diet, type MenuItem } from "@/lib/content/menu";
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

/* ─── Expandable Dish Card ─── */
function DishCard({ item, index, isExpanded, onToggle }: {
  item: MenuItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLLIElement>(null);

  /* Feed pointer coordinates to the gold spotlight */
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <m.li
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: Math.min(index, 12) * 0.04, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      }}
      layout
      onClick={onToggle}
      onPointerMove={onPointerMove}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
      aria-expanded={isExpanded}
      className={cx(
        "group relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-500",
        isExpanded
          ? "border-hs-gold/30 bg-hs-cream/[0.07]"
          : "border-hs-cream/[0.08] bg-hs-cream/[0.03] hover:border-hs-gold/20 hover:bg-hs-cream/[0.06]",
      )}
    >
      {/* Mouse-following gold spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(24rem circle at var(--mx, 50%) var(--my, -20%), hsl(42 90% 65% / 0.08), transparent 50%)",
        }}
      />

      {/* Decorative corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-hs-gold/[0.04] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="relative">
        {/* Name + price row */}
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-lg leading-snug tracking-tight transition-colors duration-500 group-hover:text-hs-gold-pale lg:text-xl">
            {item.name}
          </h3>
          <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-hs-cream/15" />
          <p className="shrink-0 font-display text-base tabular-nums tracking-wide text-hs-gold">
            {formatPrice(item.price)}
          </p>
        </div>

        {/* Description — always visible but shorter when collapsed */}
        <p className={cx(
          "mt-2.5 text-[0.82rem] leading-relaxed text-hs-cream/50 transition-all duration-400",
          !isExpanded && "line-clamp-1",
        )}>
          {item.description}
        </p>

        {/* Expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-hs-cream/[0.08] pt-4">
                {/* Diet badges */}
                {item.diet && item.diet.length > 0 && (
                  <div className="flex gap-2">
                    {item.diet.map((d) => (
                      <span
                        key={d}
                        className={cx(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.16em]",
                          d === "S"
                            ? "border-hs-gold-soft/25 bg-hs-gold-soft/10 text-hs-gold-soft"
                            : "border-hs-gold-pale/25 bg-hs-gold-pale/10 text-hs-gold-pale",
                        )}
                      >
                        {d === "S" ? <Flame size={10} /> : <Leaf size={10} />}
                        {dietLabels[d]}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price emphasis */}
                <span className="ml-auto inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-hs-cream/35">
                  <span className="h-px w-4 bg-hs-gold/30" />
                  Tap to collapse
                </span>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Collapsed diet indicators — small inline pills */}
        {!isExpanded && item.diet && item.diet.length > 0 && (
          <div className="mt-3 flex gap-1.5">
            {item.diet.map((d) => (
              <span
                key={d}
                className={cx(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.58rem] font-medium uppercase tracking-[0.14em]",
                  d === "S" ? "border-hs-gold-soft/20 text-hs-gold-soft" : "border-hs-gold-pale/20 text-hs-gold-pale",
                )}
              >
                {d === "S" ? <Flame size={8} /> : <Leaf size={8} />}
                {dietLabels[d]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expand indicator */}
      <div
        aria-hidden
        className={cx(
          "absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border text-[0.6rem] transition-all duration-400",
          isExpanded
            ? "border-hs-gold/40 bg-hs-gold/15 text-hs-gold rotate-45"
            : "border-hs-cream/15 text-hs-cream/30 group-hover:border-hs-cream/30 group-hover:text-hs-cream/50",
        )}
      >
        +
      </div>
    </m.li>
  );
}

/* ─── Search Icon ─── */
function SearchIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

/** Luxury digital menu: sticky category rail, search, dietary filters, expandable cards. */
export function MenuBrowser() {
  const [active, setActive] = useState("all");
  const [diet, setDiet] = useState<Diet | null>(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const top = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      menuCategories
        .filter((c) => active === "all" || c.slug === active)
        .map((c) => ({
          ...c,
          items: c.items.filter((i) => {
            if (diet && !i.diet?.includes(diet)) return false;
            if (search && !i.name.toLowerCase().includes(search.toLowerCase()) && !i.description.toLowerCase().includes(search.toLowerCase())) return false;
            return true;
          }),
        }))
        .filter((c) => c.items.length > 0),
    [active, diet, search],
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
    setExpanded(null);
    scrollToTop();
  };

  const toggleExpand = (name: string) => {
    setExpanded((cur) => (cur === name ? null : name));
  };

  const tabs = [{ slug: "all", short: "All dishes" }, ...menuCategories];

  /* Index map: category slug → original index (1-based) for the watermark number */
  const catIndex = Object.fromEntries(menuCategories.map((c, i) => [c.slug, i + 1]));

  return (
    <LazyMotion features={domAnimation}>
      <div ref={top} className="scroll-mt-40" />

      {/* ── Sticky navigation rail ── */}
      <div className="sticky top-[calc(var(--header-h)+0.75rem)] z-30">
        <div className="glass glass-edge rounded-full p-1.5">
          <div role="group" aria-label="Menu categories" className="no-scrollbar flex items-center gap-1 overflow-x-auto" data-lenis-prevent>
            {tabs.map((t) => (
              <button
                key={t.slug}
                type="button"
                aria-pressed={active === t.slug}
                onClick={() => choose(t.slug)}
                className={cx(
                  "relative shrink-0 rounded-full px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-all duration-500",
                  active === t.slug
                    ? "bg-hs-gold text-hs-green-deep shadow-[0_2px_16px_hsl(42_78%_51%/0.35)]"
                    : "text-hs-cream/70 hover:text-hs-cream hover:bg-hs-cream/[0.06]",
                )}
              >
                {t.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search + Filter bar ── */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <div aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-hs-cream/35">
            <SearchIcon size={14} />
          </div>
          <input
            type="search"
            placeholder="Search dishes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-hs-cream/15 bg-hs-cream/[0.04] py-2.5 pl-10 pr-4 text-sm text-hs-cream placeholder:text-hs-cream/30 transition-all duration-400 focus:border-hs-gold/40 focus:bg-hs-cream/[0.06] focus:outline-none focus:ring-1 focus:ring-hs-gold/20"
            aria-label="Search dishes"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-hs-cream/40 hover:text-hs-cream transition-colors"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Dietary filters */}
        <div role="group" aria-label="Dietary filters" className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-hs-cream/35">Filter</span>
          {dietFilters.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={diet === d}
              onClick={() => setDiet((cur) => (cur === d ? null : d))}
              className={cx(
                "inline-flex min-h-9 items-center gap-2 rounded-full border px-4 text-[0.7rem] font-medium tracking-wider transition-all duration-400",
                diet === d
                  ? "border-hs-gold/60 bg-hs-gold/15 text-hs-cream shadow-[0_0_16px_hsl(42_78%_51%/0.12)]"
                  : "border-hs-cream/12 text-hs-cream/55 hover:border-hs-cream/25 hover:text-hs-cream/80",
              )}
            >
              {d === "S" ? <Flame size={12} /> : <Leaf size={12} />}
              {dietLabels[d]}
            </button>
          ))}
        </div>

        {/* Dish count */}
        <m.p
          key={count}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          aria-live="polite"
          className="ml-auto text-[0.68rem] font-medium uppercase tracking-[0.22em] text-hs-cream/40"
        >
          {count} {count === 1 ? "dish" : "dishes"}
        </m.p>
      </div>

      {/* ── Active filters summary ── */}
      {(search || diet) && (
        <m.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex flex-wrap items-center gap-2"
        >
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-hs-cream/30">Active:</span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="inline-flex items-center gap-1.5 rounded-full border border-hs-emerald/30 bg-hs-emerald/10 px-3 py-1 text-[0.62rem] font-medium text-hs-cream/70 transition-colors hover:bg-hs-emerald/20"
            >
              &ldquo;{search}&rdquo;
              <span className="text-hs-cream/40">×</span>
            </button>
          )}
          {diet && (
            <button
              onClick={() => setDiet(null)}
              className="inline-flex items-center gap-1.5 rounded-full border border-hs-gold/30 bg-hs-gold/10 px-3 py-1 text-[0.62rem] font-medium text-hs-gold-pale transition-colors hover:bg-hs-gold/20"
            >
              {dietLabels[diet]}
              <span className="text-hs-gold-pale/50">×</span>
            </button>
          )}
          <button
            onClick={() => { setSearch(""); setDiet(null); }}
            className="text-[0.62rem] uppercase tracking-[0.18em] text-hs-cream/30 transition-colors hover:text-hs-cream/60"
          >
            Clear all
          </button>
        </m.div>
      )}

      {/* ── Menu grid ── */}
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={`${active}-${diet ?? "any"}-${search}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
          className="mt-14 grid gap-28"
        >
          {visible.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-hs-cream/40">No dishes found</p>
              <p className="mt-2 text-sm text-hs-cream/30">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => { setSearch(""); setDiet(null); setActive("all"); }}
                className="mt-6 rounded-full border border-hs-gold/30 px-6 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-hs-gold transition-all hover:bg-hs-gold/10"
              >
                Reset filters
              </button>
            </div>
          )}

          {visible.map((cat, ci) => (
            <section key={cat.slug} id={`menu-${cat.slug}`} aria-labelledby={`h-${cat.slug}`}>
              {/* ── Category header with watermark number ── */}
              <header className="relative mb-12">
                {/* Large watermark number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-8 left-0 select-none font-display text-[clamp(7rem,14vw,12rem)] font-bold leading-none text-hs-cream/[0.03]"
                >
                  {String(catIndex[cat.slug] ?? ci + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-hs-gold">
                      {String(catIndex[cat.slug] ?? ci + 1).padStart(2, "0")} — {cat.short}
                    </p>
                    <h2
                      id={`h-${cat.slug}`}
                      className="font-display mt-3 text-[clamp(2rem,3.8vw,3.6rem)] leading-[1.02] tracking-tight"
                    >
                      {cat.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-hs-cream/50">{cat.intro}</p>
                  </div>

                  {/* Item count badge */}
                  <span className="hidden shrink-0 rounded-full border border-hs-cream/10 px-4 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-hs-cream/35 sm:inline-flex">
                    {cat.items.length} {cat.items.length === 1 ? "dish" : "dishes"}
                  </span>
                </div>

                {/* Decorative gold line */}
                <div className="mt-8 h-px w-full bg-gradient-to-r from-hs-gold/40 via-hs-gold/15 to-transparent" />
              </header>

              {/* ── Dish cards grid ── */}
              <ul className="grid gap-4 md:grid-cols-2">
                {cat.items.map((item, i) => (
                  <DishCard
                    key={item.name}
                    item={item}
                    index={i}
                    isExpanded={expanded === item.name}
                    onToggle={() => toggleExpand(item.name)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
