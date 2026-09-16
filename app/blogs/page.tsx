import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { JournalIndex } from "@/components/journal/JournalIndex";
import { IntroLines } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { articles } from "@/lib/content/journal";
import { formatDate } from "@/lib/format";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Journal | Stories from the High Spirits Kitchen",
  description: "Explore our blog for insights into Indian cuisine, chef tips, restaurant stories, and dining experiences at High Spirits.",
  path: "/blogs",
});

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function BlogsPage() {
  const latest = articles[0];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Journal", path: "/blogs" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "The High Spirits Journal",
          url: absoluteUrl("/blogs"),
          blogPost: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: absoluteUrl(`/blogs/${a.slug}`), datePublished: a.date })),
        }}
      />

      {/* Masthead */}
      <section aria-labelledby="journal-title" className="surface-light relative bg-hs-cream pb-16 pt-[calc(var(--header-h)+4rem)] text-hs-text">
        <div className="shell">
          <div className="intro-rise flex flex-wrap items-center justify-between gap-4 border-b border-hs-green/20 pb-5 text-[0.65rem] uppercase tracking-[0.3em] text-hs-muted" style={d(0.1)}>
            <span>The High Spirits Journal</span>
            <span>Bunbury, Western Australia</span>
            {latest && <span>Latest · {formatDate(latest.date)}</span>}
          </div>
          <IntroLines
            as="h1"
            id="journal-title"
            className="font-display mt-10 text-center text-[clamp(4rem,17vw,17rem)] leading-[0.82] tracking-[-0.045em] text-hs-green"
            lines={[<>The <em className="text-hs-gold-deep">Journal</em></>]}
            start={0.2}
          />
          <p className="intro-rise mx-auto mt-8 max-w-xl text-center text-lead text-hs-text/75" style={d(0.5)}>
            Stories from our kitchen and beyond — Indian cuisine, chef tips, restaurant stories and dining experiences.
          </p>
        </div>
      </section>

      <section aria-label="Stories" className="surface-light bg-hs-cream pb-32 text-hs-text">
        <div className="shell">
          <JournalIndex />
        </div>
      </section>
    </>
  );
}
