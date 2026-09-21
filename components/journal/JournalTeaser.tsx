import Link from "next/link";
import { FadeUp } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { articles } from "@/lib/content/journal";
import { ArticleCard } from "./ArticleCard";

export function JournalTeaser() {
  const [latest] = articles;
  if (!latest) return null;

  return (
    <section aria-labelledby="journal-teaser-title" className="surface-light relative bg-hs-white py-24 text-hs-text md:py-32">
      <div className="shell">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-hs-line pb-8">
          <div>
            <FadeUp as="p" className="eyebrow mb-4">
              The Blog
            </FadeUp>
            <FadeUp as="h2" id="journal-teaser-title" className="font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-none text-hs-green">
              Stories from our kitchen
            </FadeUp>
          </div>
          <Link href="/blogs" className="link-line text-xs font-semibold uppercase tracking-[0.22em] text-hs-green">
            View Blog <ArrowRight size={14} />
          </Link>
        </div>
        <ArticleCard article={latest} featured />
      </div>
    </section>
  );
}
