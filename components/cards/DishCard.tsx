import Image from "next/image";
import { ClipReveal, FadeUp, ImageReveal } from "@/components/motion/Reveal";
import type { SignatureDish } from "@/lib/content/dishes";
import { cx, formatPrice } from "@/lib/format";

type Props = { dish: SignatureDish; variant: "feature" | "wide" | "compact"; className?: string; delay?: number };

/** Editorial dish card: gold numbering, metadata, restrained hover choreography. */
export function DishCard({ dish, variant, className, delay = 0 }: Props) {
  if (variant === "feature") {
    return (
      <article className={cx("group relative", className)}>
        <ImageReveal className="media-zoom relative aspect-[4/5] overflow-hidden" data-cursor="View" delay={delay}>
          <Image src={dish.image.src} alt={dish.image.alt} fill sizes="(min-width: 1024px) 46vw, 100vw" placeholder="blur" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-hs-green-deep/80 via-transparent to-transparent" />
        </ImageReveal>

        <FadeUp
          delay={delay + 0.25}
          className="glass glass-edge glass-spot relative -mt-28 ml-4 mr-4 rounded-[1.75rem] p-7 sm:ml-8 sm:mr-auto sm:max-w-md md:p-9"
        >
          <div className="flex items-baseline justify-between gap-6">
            <span className="font-display text-4xl text-hs-gold">{dish.no}</span>
            <span className="text-[0.62rem] uppercase tracking-[0.3em] text-hs-cream/60">{dish.region}</span>
          </div>
          <h3 className="font-display mt-5 text-h3 uppercase tracking-[0.02em] transition-transform duration-700 ease-luxe group-hover:translate-x-1.5">
            {dish.name}
          </h3>
          {dish.lines && (
            <p className="font-display mt-4 text-xl italic leading-snug text-hs-cream/85">
              {dish.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          )}
          <div className="mt-6 h-px w-full origin-left scale-x-[0.25] bg-hs-gold transition-transform duration-1000 ease-luxe group-hover:scale-x-100" />
          <div className="mt-5 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-hs-cream/70">
            <span>{dish.notes.join(" · ")}</span>
            {dish.price && <span className="text-hs-gold">{formatPrice(dish.price)}</span>}
          </div>
        </FadeUp>
      </article>
    );
  }

  const wide = variant === "wide";
  return (
    <article
      className={cx(
        "group relative transition-transform duration-700 ease-luxe hover:-translate-y-1.5",
        wide && "sm:grid sm:grid-cols-[1.2fr_1fr] sm:items-end sm:gap-7",
        className,
      )}
    >
      <ClipReveal delay={delay} className="media-zoom relative aspect-[2/1] overflow-hidden shadow-[0_30px_60px_-40px_hsl(160_90%_3%/0.9)] transition-shadow duration-700 group-hover:shadow-[0_40px_80px_-30px_hsl(160_90%_3%)]" data-cursor="View">
        <Image src={dish.image.src} alt={dish.image.alt} fill sizes={wide ? "(min-width: 1024px) 28vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"} placeholder="blur" className="object-cover" />
        <span aria-hidden className="absolute inset-0 ring-1 ring-inset ring-hs-gold/0 transition-[box-shadow] duration-700 group-hover:ring-hs-gold/50" />
        {dish.price && <span className="glass-chip absolute left-3 top-3 tracking-[0.14em] text-hs-gold-pale">{formatPrice(dish.price)}</span>}
      </ClipReveal>
      <FadeUp delay={delay + 0.15} className={cx("mt-6", wide && "sm:mt-0")}>
        <div className="flex items-center gap-4">
          <span className="font-display text-2xl text-hs-gold">{dish.no}</span>
          <span className="h-px w-8 bg-hs-gold/50 transition-[width] duration-700 group-hover:w-14" />
          <span className="text-[0.6rem] uppercase tracking-[0.28em] text-hs-cream/55">{dish.region}</span>
        </div>
        <h3 className="font-display mt-3 text-2xl uppercase tracking-[0.02em] transition-transform duration-700 ease-luxe group-hover:translate-x-1.5 md:text-[1.7rem]">
          {dish.name}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-hs-cream/70">{dish.description}</p>
        {dish.price && <p className="mt-3 text-xs uppercase tracking-[0.2em] text-hs-gold">{formatPrice(dish.price)}</p>}
      </FadeUp>
    </article>
  );
}
