import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { IntroLines } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { fetchGalleryItems } from "@/lib/content/gallery";
import { media } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Gallery | Indian Dining Moments in Bunbury",
  description: "See photos from High Spirits capturing Indian buffet dining, refined spaces and happy customers enjoying thoughtful hospitality.",
  path: "/gallery",
});

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default async function GalleryPage() {
  const { items, categories } = await fetchGalleryItems();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])} />

      {/* Hero — overlapping collage around a centred title */}
      <section aria-labelledby="gallery-title" className="grain relative overflow-hidden bg-hs-green-deep pb-24 pt-[calc(var(--header-h)+4rem)]">
        <div className="shell relative min-h-[34rem] md:min-h-[42rem]">
          <div className="intro-rise absolute left-[2%] top-6 w-[34%] md:w-[22%]" style={d(0.3)}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={media.opening2.src} alt="" fill preload sizes="22vw" placeholder="blur" className="object-cover" />
            </div>
          </div>
          <div className="intro-rise absolute right-[3%] top-0 w-[38%] md:w-[26%]" style={d(0.45)}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={media.interiorLuxe.src} alt="" fill sizes="26vw" placeholder="blur" className="object-cover" />
            </div>
          </div>
          <div className="intro-rise absolute bottom-0 left-[14%] z-10 w-[30%] border-[6px] border-hs-green-deep md:w-[18%]" style={d(0.6)}>
            <div className="relative aspect-square overflow-hidden">
              <Image src={media.foodCurry.src} alt="" fill sizes="18vw" placeholder="blur" className="object-cover" />
            </div>
          </div>
          <div className="intro-rise absolute bottom-6 right-[10%] w-[36%] md:w-[20%]" style={d(0.75)}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={media.guests8.src} alt="" fill sizes="20vw" placeholder="blur" className="object-cover" />
            </div>
          </div>

          <div className="relative z-20 flex min-h-[34rem] flex-col items-center justify-center text-center md:min-h-[42rem]">
            <p className="eyebrow eyebrow--plain intro-rise" style={d(0.1)}>
              A visual archive · {items.length} photographs
            </p>
            <IntroLines as="h1" id="gallery-title" className="font-display mt-6 text-display drop-shadow-[0_10px_40px_hsl(160_90%_3%/0.8)]" lines={["The", <em key="a" className="text-gold-gradient">Archive</em>]} start={0.2} />
          </div>
        </div>
      </section>

      <section aria-label="Photographs" className="bg-hs-green-dark py-20 md:py-28">
        <div className="shell">
          <MasonryGallery initialItems={items} initialCategories={categories} />
        </div>
      </section>
    </>
  );
}
