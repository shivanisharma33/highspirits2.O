"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/lib/content/gallery";
import { cx } from "@/lib/format";

// The viewer (and Motion) only download when a photo is opened.
const Lightbox = dynamic(() => import("./Lightbox").then((mod) => mod.Lightbox), { ssr: false });

type Filter = "All" | GalleryCategory;

export function MasonryGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = filter === "All" ? galleryItems : galleryItems.filter((i) => i.category === filter);
  const counts = (c: Filter) => (c === "All" ? galleryItems.length : galleryItems.filter((i) => i.category === c).length);

  return (
    <>
      <div role="group" aria-label="Filter photographs" className="flex flex-wrap gap-2">
        {(["All", ...galleryCategories] as Filter[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={cx(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
              filter === c ? "border-hs-gold bg-hs-gold text-hs-green-deep" : "border-hs-cream/20 text-hs-cream/75 hover:border-hs-gold/60",
            )}
          >
            {c}
            <span className={cx("text-[0.6rem]", filter === c ? "text-hs-green-deep/70" : "text-hs-cream/40")}>{counts(c)}</span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        Showing {items.length} photographs
      </p>

      <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 2xl:columns-4">
        {items.map((item, i) => (
          <li key={item.alt} data-reveal="fade-up" style={{ "--delay": `${(i % 3) * 0.06}s` } as CSSProperties} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              data-cursor="Explore"
              className="group relative block w-full overflow-hidden bg-hs-green"
              aria-label={`Open photo: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt=""
                sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                placeholder="blur"
                className="h-auto w-full transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.045]"
              />
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-hs-green-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span aria-hidden className="absolute bottom-4 left-4 translate-y-2 text-[0.62rem] uppercase tracking-[0.28em] text-hs-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.category}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </>
  );
}
