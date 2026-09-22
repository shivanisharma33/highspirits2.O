"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Aurora } from "@/components/ui/Aurora";
import { ArrowUpRight } from "@/components/ui/Icons";
import { formatDate } from "@/lib/format";
import { readingTime, type Article } from "@/lib/content/journal";

type Props = {
  featured: Article;
};

export function JournalHero({ featured }: Props) {
  return (
    <section
      aria-labelledby="journal-hero-title"
      className="grain relative overflow-hidden bg-[#03150D] pt-[calc(var(--header-h)+3rem)] pb-20 md:pt-[calc(var(--header-h)+5rem)] md:pb-32 text-hs-cream"
    >
      <Aurora />

      {/* Atmospheric ambient glow spots */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-hs-gold/10 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[140px]"
      />

      <div className="shell relative z-10">
        {/* Top Masthead Editorial Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-hs-gold/20 pb-5 text-[0.68rem] uppercase tracking-[0.26em] text-hs-cream/60"
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 animate-ping rounded-full bg-hs-gold" />
            <span className="font-semibold text-hs-gold">High Spirits Blogs</span>
          </div>
          <div className="hidden sm:block">
            <span>Bunbury · 1/57 Victoria Street</span>
          </div>
          <div>
            <span>Published · {formatDate(featured.date)}</span>
          </div>
        </motion.div>

        {/* Big Editorial Title */}
        <div className="mt-12 text-center md:mt-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow mx-auto text-hs-gold"
          >
            Insights · Cuisine · Culinary Craft
          </motion.p>
          <motion.h1
            id="journal-hero-title"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-5 text-[clamp(2.8rem,7.5vw,7.5rem)] leading-[0.92] tracking-[-0.03em] text-hs-cream"
          >
            The High Spirits <em className="italic text-gold-gradient">Blog</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-base md:text-lead text-hs-cream/75 leading-relaxed"
          >
            Dive into stories, recipes, and insights from the world of fine Indian dining.
          </motion.p>
        </div>

        {/* Featured Cover Story Showcase */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 md:mt-20"
          >
            <Link
              href={`/blogs/${featured.slug}`}
              className="group relative block overflow-hidden rounded-[2rem] border border-hs-gold/25 bg-hs-green-dark/40 backdrop-blur-md transition-all duration-700 hover:border-hs-gold/60"
              data-cursor="Read"
            >
              <div className="grid lg:grid-cols-12 lg:items-center">
                {/* Visual Cover Spread */}
                <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-[16/11]">
                  <Image
                    src={featured.image.src}
                    alt={featured.image.alt}
                    fill
                    preload
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#03150D] via-[#03150D]/40 to-transparent lg:hidden"
                  />
                  <div
                    aria-hidden
                    className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-[#03150D]/20 to-[#03150D]/90"
                  />

                  {/* Editorial Spotlight Ribbon */}
                  <div className="absolute top-5 left-5 z-10 flex items-center gap-2 rounded-full border border-hs-gold/40 bg-black/60 px-4 py-1.5 backdrop-blur-md">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-hs-gold" />
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-hs-gold">
                      Featured Blog
                    </span>
                  </div>
                </div>

                {/* Cover Story Narrative */}
                <div className="relative z-10 p-7 sm:p-10 lg:col-span-5 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.22em] text-hs-gold">
                    <span>✦ {featured.category}</span>
                    <span className="text-hs-cream/30">·</span>
                    <span className="text-hs-cream/70">{readingTime(featured.content)} min read</span>
                    <span className="text-hs-cream/30">·</span>
                    <span className="text-hs-cream/70">{formatDate(featured.date)}</span>
                  </div>

                  <h2 className="font-display mt-5 text-2xl sm:text-3xl lg:text-4xl text-hs-cream leading-tight transition-colors duration-500 group-hover:text-hs-gold">
                    {featured.title}
                  </h2>

                  <p className="mt-4 line-clamp-3 text-sm sm:text-base leading-relaxed text-hs-cream/75">
                    {featured.excerpt}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-hs-gold/20 pt-6">
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.2em] text-hs-cream/50">Written by</p>
                      <p className="font-display text-base text-hs-cream">{featured.author}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-hs-gold transition-transform duration-500 group-hover:translate-x-1.5">
                      <span>Read Full Blog</span>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hs-gold/40 bg-hs-gold/10 text-hs-gold transition-colors duration-500 group-hover:border-hs-gold group-hover:bg-hs-gold group-hover:text-hs-green-dark">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
