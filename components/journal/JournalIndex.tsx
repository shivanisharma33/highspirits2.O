"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "@/components/ui/Icons";
import { articles, journalCategories } from "@/lib/content/journal";
import { media } from "@/lib/images";
import { cx } from "@/lib/format";
import { ArticleCard } from "./ArticleCard";

/** Shown beside the stories until there are enough of them to fill a row. */
const explore = [
  { href: "/menu", kicker: "The menu", title: "From the tandoor, the stove and the clay oven", image: media.heroDish2 },
  { href: "/experiences", kicker: "Experiences", title: "Chef's Table, degustation and the evening buffet", image: media.foodBuffet },
  { href: "/gallery", kicker: "The gallery", title: "Evenings on Victoria Street, in photographs", image: media.guests7 },
];

/** Searchable, filterable journal index; short rows are completed with links into the rest of the site. */
export function JournalIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (category === "All" || a.category === category) &&
        (!q || `${a.title} ${a.excerpt} ${a.content}`.toLowerCase().includes(q)),
    );
  }, [query, category]);

  const [featured, ...others] = results;
  const fill = featured ? Math.max(0, 3 - others.length) : 0;

  return (
    <>
      <div className="flex flex-col gap-6 border-y border-hs-line py-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Categories" className="flex flex-wrap gap-2">
          {["All", ...journalCategories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cx(
                "min-h-10 rounded-full border px-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors",
                category === c ? "border-hs-green bg-hs-green text-hs-cream" : "border-hs-green/20 text-hs-green hover:border-hs-green/60",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative flex w-full items-center lg:w-80">
          <span className="sr-only">Search the journal</span>
          <Search size={16} className="pointer-events-none absolute left-0 text-hs-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories"
            className="min-h-11 w-full border-0 border-b border-hs-green/25 bg-transparent pl-7 text-hs-text placeholder:text-hs-muted focus:border-hs-green focus:outline-none"
          />
        </label>
      </div>
      <p aria-live="polite" className="sr-only">
        {results.length} {results.length === 1 ? "story" : "stories"} found
      </p>

      {featured ? (
        <div className="mt-16">
          <ArticleCard article={featured} featured headingLevel="h2" />
        </div>
      ) : (
        <p className="py-24 text-center text-hs-muted">No stories match your search yet — try another word or category.</p>
      )}

      {others.length > 0 && (
        <div className="mt-24 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {others.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}

      {fill > 0 && (
        <div className="mt-24">
          <p className="eyebrow">Keep exploring</p>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {explore.slice(0, fill).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[4/3] md:aspect-[4/5] lg:aspect-[4/3]" data-cursor="Explore">
                  <Image src={item.image.src} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" placeholder="blur" className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105" />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-hs-green-deep/70 via-transparent to-transparent" />
                  <div className="glass glass-edge absolute inset-x-3 bottom-3 flex items-end justify-between gap-4 rounded-[1.25rem] p-5 text-hs-cream">
                    <span>
                      <span className="block text-[0.6rem] uppercase tracking-[0.28em] text-hs-gold">{item.kicker}</span>
                      <span className="font-display mt-2 block text-xl leading-snug">{item.title}</span>
                    </span>
                    <ArrowUpRight size={18} className="mb-1 shrink-0 text-hs-gold transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
