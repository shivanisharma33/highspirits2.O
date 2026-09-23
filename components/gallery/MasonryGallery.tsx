"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { galleryCategories, galleryItems, type GalleryCategory, type GalleryItem } from "@/lib/content/gallery";
import { cx } from "@/lib/format";

// The viewer (and Motion) only download when a photo is opened.
const Lightbox = dynamic(() => import("./Lightbox").then((mod) => mod.Lightbox), { ssr: false });

type Filter = "All" | string;

const ITEMS_PER_PAGE = 12;

interface MasonryGalleryProps {
  initialItems?: GalleryItem[];
  initialCategories?: string[];
}

export function MasonryGallery({
  initialItems,
  initialCategories,
}: MasonryGalleryProps = {}) {
  const allItems = initialItems && initialItems.length > 0 ? initialItems : galleryItems;
  const categoriesList =
    initialCategories && initialCategories.length > 0
      ? initialCategories
      : Array.from(new Set(allItems.map((i) => i.category)));

  const [filter, setFilter] = useState<Filter>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState<number | null>(null);
  const galleryTopRef = useRef<HTMLDivElement>(null);

  const items = filter === "All" ? allItems : allItems.filter((i) => i.category === filter);
  const counts = (c: Filter) => (c === "All" ? allItems.length : allItems.filter((i) => i.category === c).length);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const validPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

  const paginatedItems = items.slice(
    (validPage - 1) * ITEMS_PER_PAGE,
    validPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    if (galleryTopRef.current) {
      galleryTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={galleryTopRef} className="scroll-mt-28">
      {/* Category Filter Pills */}
      <div role="group" aria-label="Filter photographs" className="flex flex-wrap gap-2">
        {(["All", ...categoriesList] as Filter[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => handleFilterChange(c)}
            className={cx(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 cursor-pointer",
              filter === c ? "border-hs-gold bg-hs-gold text-hs-green-deep font-semibold" : "border-hs-cream/20 text-hs-cream/75 hover:border-hs-gold/60",
            )}
          >
            {c}
            <span className={cx("text-[0.6rem]", filter === c ? "text-hs-green-deep/80" : "text-hs-cream/40")}>{counts(c)}</span>
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {paginatedItems.length} of {items.length} photographs on page {validPage} of {totalPages}
      </p>

      {/* Masonry Columns */}
      <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 2xl:columns-4">
        {paginatedItems.map((item, i) => {
          const globalIndex = (validPage - 1) * ITEMS_PER_PAGE + i;
          return (
            <li
              key={item.id ? `gallery-${item.id}` : `${item.alt}-${globalIndex}`}
              data-reveal="fade-up"
              style={{ "--delay": `${(i % 3) * 0.06}s` } as CSSProperties}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setOpen(globalIndex)}
                data-cursor="Explore"
                className="group relative block w-full overflow-hidden bg-hs-green rounded-lg cursor-pointer"
                aria-label={`Open photo: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt || "High Spirits Gallery Photograph"}
                  width={typeof item.src === "string" ? (item.width || 1200) : undefined}
                  height={typeof item.src === "string" ? (item.height || 800) : undefined}
                  sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  placeholder={typeof item.src !== "string" ? "blur" : undefined}
                  className="h-auto w-full transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.045]"
                />
                <span aria-hidden className="absolute inset-0 bg-linear-to-t from-hs-green-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span aria-hidden className="absolute bottom-4 left-4 translate-y-2 text-[0.62rem] uppercase tracking-[0.28em] text-hs-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.category}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <nav
          role="navigation"
          aria-label="Gallery pagination"
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-hs-cream/10 pt-10 sm:flex-row"
        >
          {/* Progress / Status Summary */}
          <p className="text-xs uppercase tracking-[0.22em] text-hs-cream/60">
            Showing{" "}
            <span className="font-semibold text-hs-gold">
              {(validPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(validPage * ITEMS_PER_PAGE, items.length)}
            </span>{" "}
            of <span className="font-semibold text-hs-gold">{items.length}</span> photographs
          </p>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* Prev Button */}
            <button
              type="button"
              disabled={validPage <= 1}
              onClick={() => changePage(validPage - 1)}
              className={cx(
                "inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-xs uppercase tracking-wider transition-colors duration-200",
                validPage <= 1
                  ? "cursor-not-allowed border-hs-cream/10 text-hs-cream/20"
                  : "border-hs-cream/25 text-hs-cream/80 hover:border-hs-gold hover:text-hs-gold cursor-pointer"
              )}
              aria-label="Previous page"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Numbered Page Buttons */}
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => changePage(p)}
                aria-current={validPage === p ? "page" : undefined}
                className={cx(
                  "grid h-10 w-10 place-items-center rounded-full text-xs font-semibold transition-all duration-200",
                  validPage === p
                    ? "bg-hs-gold text-hs-green-deep shadow-md font-bold"
                    : "border border-hs-cream/20 text-hs-cream/75 hover:border-hs-gold/60 hover:text-hs-gold cursor-pointer"
                )}
              >
                {p}
              </button>
            ))}

            {/* Next Button */}
            <button
              type="button"
              disabled={validPage >= totalPages}
              onClick={() => changePage(validPage + 1)}
              className={cx(
                "inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-xs uppercase tracking-wider transition-colors duration-200",
                validPage >= totalPages
                  ? "cursor-not-allowed border-hs-cream/10 text-hs-cream/20"
                  : "border-hs-cream/25 text-hs-cream/80 hover:border-hs-gold hover:text-hs-gold cursor-pointer"
              )}
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </nav>
      )}

      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />}
    </div>
  );
}
