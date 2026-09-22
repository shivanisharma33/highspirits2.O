import type { Metadata } from "next";
import { JournalHero } from "@/components/journal/JournalHero";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { JournalNewsletter } from "@/components/journal/JournalNewsletter";
import { JsonLd } from "@/components/ui/JsonLd";
import { articles } from "@/lib/content/journal";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blogs | High Spirits Indian Restaurant",
  description:
    "Explore our blog for insights into Indian cuisine, chef tips, restaurant stories and dining experiences at High Spirits.",
  path: "/blogs",
});

export default function BlogsPage() {
  const featured = articles[0];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blogs", path: "/blogs" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "High Spirits Blogs",
          url: absoluteUrl("/blogs"),
          blogPost: articles.map((a) => ({
            "@type": "BlogPosting",
            headline: a.title,
            url: absoluteUrl(`/blogs/${a.slug}`),
            datePublished: a.date,
          })),
        }}
      />

      {/* Cinematic Hero with Featured Blog */}
      <JournalHero featured={featured} />

      {/* Main Blog Archive & Filterable Grid */}
      <section
        aria-label="High Spirits Blog Archive"
        className="surface-light bg-hs-cream py-20 md:py-28 text-hs-text"
      >
        <div className="shell">
          <JournalGrid articles={articles} />
        </div>
      </section>

      {/* VIP Culinary Dispatch & Newsletter */}
      <JournalNewsletter />
    </>
  );
}
