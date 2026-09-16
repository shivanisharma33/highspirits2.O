import Image from "next/image";
import Link from "next/link";
import { ClipReveal, FadeUp } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { readingTime, type Article } from "@/lib/content/journal";
import { cx, formatDate } from "@/lib/format";

type Props = { article: Article; featured?: boolean; className?: string; headingLevel?: "h2" | "h3" };

export function ArticleMeta({ article, className }: { article: Article; className?: string }) {
  return (
    <p className={cx("flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] uppercase tracking-[0.24em]", className)}>
      <span className="text-hs-gold-deep">{article.category}</span>
      <span aria-hidden>·</span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden>·</span>
      <span>{readingTime(article.content)} min read</span>
    </p>
  );
}

/** Magazine-style article card. The featured variant is a wide split spread. */
export function ArticleCard({ article, featured, className, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  const href = `/blogs/${article.slug}`;

  return (
    <article className={cx("group relative", featured && "grid gap-10 lg:grid-cols-12 lg:items-center", className)}>
      <ClipReveal className={cx("media-zoom relative overflow-hidden", featured ? "aspect-[4/3] lg:col-span-7" : "aspect-[4/3]")} data-cursor="Read">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes={featured ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
          placeholder="blur"
          className="object-cover"
        />
      </ClipReveal>
      <FadeUp delay={0.15} className={cx(featured ? "lg:col-span-5" : "mt-6")}>
        <ArticleMeta article={article} className="text-hs-muted" />
        <Heading className={cx("font-display mt-5 text-hs-green transition-transform duration-700 ease-luxe group-hover:translate-x-1.5", featured ? "text-h2" : "text-2xl")}>
          <Link href={href} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </Heading>
        <p className={cx("mt-5 leading-relaxed text-hs-muted", featured && "text-lead")}>{article.excerpt}</p>
        <p className="mt-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-hs-green">
          Read the story
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hs-green/25 transition-colors duration-500 group-hover:border-hs-green group-hover:bg-hs-green group-hover:text-hs-cream">
            <ArrowRight size={15} />
          </span>
        </p>
        <p className="mt-2 text-xs text-hs-muted">By {article.author}</p>
      </FadeUp>
    </article>
  );
}
