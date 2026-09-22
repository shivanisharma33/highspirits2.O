"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Search, Close } from "@/components/ui/Icons";
import { journalCategories, type Article } from "@/lib/content/journal";
import { media } from "@/lib/images";
import { ArticleCard } from "./ArticleCard";

type Props = {
  articles: Article[];
};

const spiceShowcase = [
  {
    name: "Cumin Seeds",
    sanskrit: "Jeera",
    role: "Earthy Warmth",
    benefit: "Aids digestion and unlocks savory depth when roasted in clarified ghee.",
    tag: "Essential Base",
  },
  {
    name: "Green Cardamom",
    sanskrit: "Elaichi",
    role: "Aromatic Sweetness",
    benefit: "Floral, sweet camphor aroma that perfumes royal biryanis and dessert syrups.",
    tag: "Aromatic Top Note",
  },
  {
    name: "Cloves",
    sanskrit: "Laung",
    role: "Resinous Warmth",
    benefit: "Potent natural antioxidant providing deep, lingering warmth in slow curries.",
    tag: "Slow Alchemy",
  },
  {
    name: "Kashmiri Mirch",
    sanskrit: "Deggi Mirch",
    role: "Ruby Red Hue",
    benefit: "Sun-dried in Kashmir for vivid crimson colour without harsh, fiery heat.",
    tag: "Signature Colour",
  },
  {
    name: "Wild Turmeric",
    sanskrit: "Haldi",
    role: "Immunity & Glow",
    benefit: "Ancient healing root celebrated across Ayurvedic traditions for wellness.",
    tag: "Wellness Herb",
  },
  {
    name: "Coriander Seeds",
    sanskrit: "Dhania",
    role: "Citrus Balance",
    benefit: "Provides cooling citrus brightness that harmonizes robust whole spices.",
    tag: "Harmony & Balance",
  },
];

const exploreLinks = [
  { href: "/menu", kicker: "The Menu", title: "Clay oven tandoor & slow simmered gravies", image: media.heroTableSpread },
  { href: "/experiences", kicker: "Experiences", title: "Chef's table, tasting menus & weekend banquets", image: media.foodBuffetHd },
  { href: "/gallery", kicker: "The Gallery", title: "Moments & celebrations on Victoria Street", image: media.guests7 },
];

export function JournalGrid({ articles }: Props) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = selectedCategory === "All" || a.category === selectedCategory;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [articles, query, selectedCategory]);

  return (
    <div className="relative">
      {/* Interactive Controls Bar: Category Pills & Live Search */}
      <div className="flex flex-col gap-6 border-y border-hs-line/80 py-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Animated Category Pills */}
        <div
          role="group"
          aria-label="Filter blog by category"
          className="flex flex-wrap items-center gap-2"
        >
          {["All", ...journalCategories].map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(cat)}
                className="relative min-h-10 cursor-pointer rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors focus:outline-none"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeJournalCategory"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-hs-green shadow-md"
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    isActive ? "text-hs-cream" : "text-hs-green hover:text-hs-gold-deep"
                  }`}
                >
                  {cat}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full lg:w-84">
          <label htmlFor="blog-search" className="sr-only">
            Search blog articles and spices
          </label>
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-hs-muted"
          />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search spices, recipes, techniques..."
            className="h-11 w-full rounded-full border border-hs-line bg-white/80 pl-10 pr-10 text-sm text-hs-text shadow-2xs placeholder:text-hs-muted/70 transition-all focus:border-hs-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-hs-green/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-hs-muted hover:text-hs-text cursor-pointer"
            >
              <Close size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Results Counter */}
      <div className="mt-6 flex items-center justify-between text-xs text-hs-muted">
        <p aria-live="polite">
          Showing <span className="font-semibold text-hs-green">{filteredArticles.length}</span>{" "}
          {filteredArticles.length === 1 ? "article" : "articles"}
          {selectedCategory !== "All" && (
            <>
              {" "}in <span className="text-hs-gold-deep font-semibold">&ldquo;{selectedCategory}&rdquo;</span>
            </>
          )}
          {query && (
            <>
              {" "}matching <span className="text-hs-green font-semibold">&ldquo;{query}&rdquo;</span>
            </>
          )}
        </p>

        {(query || selectedCategory !== "All") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
            }}
            className="cursor-pointer font-semibold uppercase tracking-[0.16em] text-hs-gold-deep hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Animated Blog Card Presentation */}
      <div className="mt-10">
        <AnimatePresence mode="popLayout">
          {filteredArticles.length > 0 ? (
            <div className="space-y-10">
              {filteredArticles.map((article, idx) => (
                <motion.div
                  key={article.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ArticleCard article={article} featured />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-dashed border-hs-line p-16 text-center"
            >
              <p className="font-display text-2xl text-hs-green">No articles found</p>
              <p className="mt-3 text-sm text-hs-muted max-w-md mx-auto">
                We couldn&apos;t find any articles matching &ldquo;{query}&rdquo;. Try adjusting your keywords or reset filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-hs-green px-6 text-xs font-semibold uppercase tracking-[0.2em] text-hs-cream transition-colors hover:bg-hs-green-dark cursor-pointer"
              >
                Show All Blogs
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Culinary Mastercraft Showcase: The Spice Alchemy */}
      <section aria-labelledby="spice-showcase-title" className="mt-24 rounded-[2.5rem] border border-hs-line/80 bg-hs-white p-8 sm:p-12 lg:p-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-hs-line pb-8">
          <div>
            <p className="eyebrow">Culinary Masterclass</p>
            <h3 id="spice-showcase-title" className="font-display mt-3 text-3xl sm:text-4xl text-hs-green">
              Behind the Blend: <em className="italic text-hs-gold-deep">Essential Spices</em>
            </h3>
          </div>
          <p className="max-w-md text-sm text-hs-muted leading-relaxed">
            As featured in Chef Ishpreet Bedi’s blog post, here are the core whole spices roasted daily in small batches in the High Spirits kitchen.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spiceShowcase.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between rounded-[1.75rem] border border-hs-line/80 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-hs-gold-deep/50"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-hs-muted">
                  <span className="font-mono text-hs-gold-deep">0{i + 1}</span>
                  <span className="rounded-full bg-hs-cream px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-hs-green">
                    {s.tag}
                  </span>
                </div>
                <h4 className="font-display mt-4 text-2xl text-hs-green group-hover:text-hs-gold-deep transition-colors">
                  {s.name}
                </h4>
                <p className="text-xs uppercase tracking-widest text-hs-gold-deep font-semibold mt-0.5">
                  {s.sanskrit} · {s.role}
                </p>
                <p className="mt-3 text-sm text-hs-muted leading-relaxed">
                  {s.benefit}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-hs-line/50 flex items-center justify-between text-[0.68rem] text-hs-muted uppercase tracking-wider">
                <span>Roasted Daily</span>
                <span className="text-hs-green font-semibold">100% Whole Spices</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Keep Exploring Portal Cards */}
      <div className="mt-28 border-t border-hs-line/80 pt-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Discover More</p>
            <h3 className="font-display mt-3 text-2xl sm:text-3xl text-hs-green">
              Beyond the Blog
            </h3>
          </div>
          <p className="hidden text-xs uppercase tracking-[0.2em] text-hs-muted sm:block">
            Victoria Street · Bunbury
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {exploreLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-[1.75rem] transition-all duration-700 hover:-translate-y-1"
              data-cursor="Explore"
            >
              <Image
                src={item.image.src}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                placeholder="blur"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#03150D]/90 via-[#03150D]/30 to-transparent"
              />
              <div className="glass glass-edge absolute inset-x-3 bottom-3 flex items-end justify-between gap-4 rounded-[1.25rem] p-5 text-hs-cream backdrop-blur-md">
                <span>
                  <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-hs-gold">
                    {item.kicker}
                  </span>
                  <span className="font-display mt-1.5 block text-lg leading-snug">
                    {item.title}
                  </span>
                </span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hs-gold/30 bg-hs-gold/10 text-hs-gold transition-all duration-500 group-hover:border-hs-gold group-hover:bg-hs-gold group-hover:text-hs-green-dark">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
