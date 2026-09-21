import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ArticleCard, ArticleMeta } from "@/components/journal/ArticleCard";
import { IntroLines } from "@/components/motion/Reveal";
import { ReservationCTA } from "@/components/sections/ReservationCTA";
import { ArrowLeft } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { articles, getArticle, readingTime } from "@/lib/content/journal";
import { Markdown } from "@/lib/markdown";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blogs/${article.slug}`,
    type: "article",
    image: { url: article.image.src.src, alt: article.image.alt, width: article.image.src.width, height: article.image.src.height },
  });
}

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default async function ArticlePage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.excerpt,
          image: absoluteUrl(article.image.src.src),
          datePublished: article.date,
          author: { "@type": "Person", name: article.author },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") } },
          mainEntityOfPage: absoluteUrl(`/blogs/${article.slug}`),
          wordCount: article.content.split(/\s+/).length,
          timeRequired: `PT${readingTime(article.content)}M`,
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blogs", path: "/blogs" },
          { name: article.title, path: `/blogs/${article.slug}` },
        ])}
      />

      <article className="surface-light bg-hs-cream text-hs-text">
        <header className="shell pb-14 pt-[calc(var(--header-h)+3.5rem)]">
          <Link href="/blogs" className="intro-rise link-line text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-hs-green" style={d(0.05)}>
            <ArrowLeft size={14} /> Back to Blogs
          </Link>
          <div className="intro-rise mt-12" style={d(0.15)}>
            <ArticleMeta article={article} className="text-hs-muted" />
          </div>
          <IntroLines as="h1" className="font-display mt-8 max-w-5xl text-h1 text-hs-green" lines={[article.title]} start={0.25} />
          <p className="intro-rise mt-8 max-w-2xl text-lead text-hs-text/75" style={d(0.5)}>
            {article.excerpt}
          </p>
          <p className="intro-rise mt-8 text-sm text-hs-muted" style={d(0.6)}>
            By <span className="text-hs-green">{article.author}</span>
          </p>
        </header>

        <div className="intro-rise relative mx-auto aspect-[21/10] w-full max-w-[1680px] overflow-hidden" style={d(0.5)}>
          <Image src={article.image.src} alt={article.image.alt} fill preload sizes="100vw" placeholder="blur" className="object-cover" />
        </div>

        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32 border-t border-hs-line pt-6 text-sm text-hs-muted">
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-hs-gold-deep">Written by</p>
              <p className="font-display mt-2 text-xl text-hs-green">{article.author}</p>
              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.24em] text-hs-gold-deep">Reading time</p>
              <p className="mt-2">{readingTime(article.content)} minutes</p>
            </div>
          </aside>
          <div className="max-w-2xl lg:col-span-7 lg:col-start-5 [&>p:first-of-type]:first-letter:font-display [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:text-7xl [&>p:first-of-type]:first-letter:leading-[0.8] [&>p:first-of-type]:first-letter:text-hs-green">
            <Markdown source={article.content} />
          </div>
        </div>

        {/* More Stories from the Blog */}
        {articles.filter((a) => a.slug !== article.slug).length > 0 && (
          <section aria-labelledby="more-stories-title" className="border-t border-hs-line py-20 md:py-28">
            <div className="shell">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="eyebrow">Continue Reading</p>
                  <h2 id="more-stories-title" className="font-display mt-3 text-3xl text-hs-green">
                    More from the Blog
                  </h2>
                </div>
                <Link
                  href="/blogs"
                  className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-hs-gold-deep hover:underline sm:inline-block"
                >
                  All Blogs →
                </Link>
              </div>

              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles
                  .filter((a) => a.slug !== article.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <ArticleCard key={item.slug} article={item} />
                  ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <ReservationCTA />
    </>
  );
}
