import Image from "next/image";
import type { SignatureDish } from "@/lib/content/dishes";
import { cx } from "@/lib/format";

type Props = {
  dish: SignatureDish;
  className?: string;
};

export function DishCard({ dish, className }: Props) {
  const isNonVeg = dish.categoryTag === "Non-Veg";

  return (
    <article
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-all duration-500 hover:-translate-y-2 hover:border-hs-gold/45 hover:shadow-[0_30px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(212,175,55,0.18)]",
        className,
      )}
    >
      {/* Specular glass reflection & inner glass bevel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.08]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-hs-gold/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Top Media Block with Sculpted Corner Notch */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-hs-green-deep">
        <Image
          src={dish.image.src}
          alt={dish.image.alt}
          fill
          sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
          quality={80}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Subtle Dark Vignettes for contrast */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        />

        {/* --- SCULPTED TOP-RIGHT NOTCH (Exact Reference Geometry) --- */}
        <>
          {/* Top-Left Inverted Fillet (Concave corner connecting top edge into notch) */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-[54px] z-20 h-4 w-4"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              style={{ fill: "var(--hs-green-dark)" }}
              preserveAspectRatio="none"
            >
              <path d="M0 0 H16 V16 A16 16 0 0 1 0 0 Z" />
            </svg>
          </div>

          {/* Notch Main Body: docked at top-right with rounded-bl-2xl */}
          <div
            className="absolute top-0 right-0 z-20 flex h-[42px] w-[54px] items-center justify-center rounded-bl-2xl shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)]"
            style={{ backgroundColor: "var(--hs-green-dark)" }}
          >
            <span className="text-hs-gold text-base transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
              ✦
            </span>
          </div>

          {/* Bottom-Right Inverted Fillet (Concave corner connecting notch bottom into right edge) */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[42px] right-0 z-20 h-4 w-4"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              style={{ fill: "var(--hs-green-dark)" }}
              preserveAspectRatio="none"
            >
              <path d="M0 0 H16 V16 A16 16 0 0 1 0 0 Z" />
            </svg>
          </div>
        </>

        {/* Category Dietary Tag (Top-Left Pill) */}
        {dish.categoryTag && (
          <div className="absolute left-4 top-4 z-10">
            <span
              className={cx(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] shadow-lg backdrop-blur-md border",
                isNonVeg
                  ? "border-red-500/40 bg-black/65 text-red-300"
                  : "border-hs-gold/40 bg-black/65 text-hs-gold"
              )}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={cx(
                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-65",
                    isNonVeg ? "bg-red-400" : "bg-hs-gold"
                  )}
                />
                <span
                  className={cx(
                    "relative inline-flex h-2 w-2 rounded-full",
                    isNonVeg ? "bg-red-500" : "bg-hs-gold"
                  )}
                />
              </span>
              {dish.categoryTag}
            </span>
          </div>
        )}
      </div>

      {/* Card Content in Frosted Glass */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-hs-gold/90">
            {dish.region}
          </p>

          <h3 className="font-display mt-2 text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-gold-gradient line-clamp-1">
            {dish.name}
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-hs-cream/80 line-clamp-2">
            {dish.description}
          </p>

          {/* Flavor Notes / Ingredients Tags */}
          {dish.notes && dish.notes.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {dish.notes.slice(0, 4).map((note) => (
                <span
                  key={note}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-hs-cream/70 transition-colors group-hover:border-hs-gold/30 group-hover:text-hs-cream/90"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer Bar */}
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-hs-gold/80 transition-colors group-hover:text-hs-gold">
            Chef&apos;s Signature
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-hs-gold transition-transform duration-300 group-hover:translate-x-1">
            Order Online <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
