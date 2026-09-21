import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { readingTime, type Article } from "@/lib/content/journal";
import { cx, formatDate } from "@/lib/format";

type Props = {
  article: Article;
  featured?: boolean;
  className?: string;
  headingLevel?: "h2" | "h3";
};

export function ArticleMeta({ article, className }: { article: Article; className?: string }) {
  return (
    <p className={cx("flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.66rem] uppercase tracking-[0.2em]", className)}>
      <span className="font-semibold text-hs-gold-deep">{article.category}</span>
      <span aria-hidden className="text-hs-muted/40">·</span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden className="text-hs-muted/40">·</span>
      <span>{readingTime(article.content)} min read</span>
    </p>
  );
}

/** Magazine-grade luxury article card with responsive hover physics */
export function ArticleCard({ article, featured, className, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  const href = `/blogs/${article.slug}`;

  return (
    <article
      className={cx(
        "group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-hs-line/70 bg-white/70 shadow-sm backdrop-blur-xs transition-all duration-500 hover:-translate-y-1.5 hover:border-hs-gold-deep/50 hover:shadow-xl hover:shadow-hs-green/5",
        featured && "lg:grid lg:grid-cols-12 lg:items-center lg:gap-10",
        className,
      )}
    >
      {/* Image Media Container */}
      <div
        className={cx(
          "relative overflow-hidden",
          featured ? "aspect-[16/10] lg:col-span-7 lg:aspect-[16/11]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes={featured ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"}
          placeholder="blur"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
        />

        {/* Ambient Dark Gradient on Image Base */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        />

        {/* Floating Category Pill */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#03150D]/75 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-hs-gold backdrop-blur-md shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-hs-gold" />
          <span>{article.category}</span>
        </div>

        {/* Reading Time Pill */}
        <div className="absolute top-4 right-4 z-10 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-hs-cream/90 backdrop-blur-md">
          {readingTime(article.content)}m read
        </div>
      </div>

      {/* Narrative Card Body */}
      <div className={cx("flex flex-1 flex-col justify-between p-6 sm:p-8", featured && "lg:col-span-5")}>
        <div>
          {/* Published Date */}
          <time dateTime={article.date} className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-hs-muted">
            {formatDate(article.date)}
          </time>

          {/* Heading */}
          <Heading
            className={cx(
              "font-display mt-3 text-hs-green leading-snug transition-colors duration-300 group-hover:text-hs-gold-deep",
              featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl",
            )}
          >
            <Link href={href} className="after:absolute after:inset-0">
              {article.title}
            </Link>
          </Heading>

          {/* Excerpt */}
          <p
            className={cx(
              "mt-3 text-sm leading-relaxed text-hs-muted line-clamp-3",
              featured && "text-base line-clamp-4",
            )}
          >
            {article.excerpt}
          </p>
        </div>

        {/* Footer Meta & Arrow */}
        <div className="mt-7 flex items-center justify-between border-t border-hs-line/80 pt-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-hs-green/10 text-[0.68rem] font-bold text-hs-green">
              {article.author.charAt(0)}
            </span>
            <span className="text-xs font-medium text-hs-text/80">{article.author}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-hs-green transition-colors duration-300 group-hover:text-hs-gold-deep">
            <span>Read</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-hs-green/10 text-hs-green transition-all duration-300 group-hover:bg-hs-gold-deep group-hover:text-hs-cream group-hover:translate-x-0.5">
              <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
