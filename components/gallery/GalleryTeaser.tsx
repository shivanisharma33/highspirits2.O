import Image from "next/image";
import Link from "next/link";
import { ClipReveal, FadeUp, ImageReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryItems } from "@/lib/content/gallery";
import { media } from "@/lib/images";

const tiles = [
  { item: media.opening2, className: "col-span-7 row-span-2 aspect-[4/5]", sizes: "(min-width: 1024px) 34vw, 58vw" },
  { item: media.interiorLounge, className: "col-span-5 aspect-[3/4] mt-16", sizes: "(min-width: 1024px) 24vw, 42vw" },
  { item: media.guests3, className: "col-span-5 aspect-square", sizes: "(min-width: 1024px) 24vw, 42vw" },
  { item: media.dishDalSignature, className: "col-span-6 col-start-2 aspect-[2/1] -mt-10 z-10 border-[6px] border-hs-cream", sizes: "(min-width: 1024px) 30vw, 50vw" },
  { item: media.guests10, className: "col-span-5 aspect-[4/3] mt-8", sizes: "(min-width: 1024px) 24vw, 42vw" },
];

/** Overlapping editorial collage leading into the full gallery. */
export function GalleryTeaser() {
  return (
    <section aria-labelledby="gallery-teaser-title" className="surface-light relative overflow-hidden bg-hs-cream py-28 text-hs-text md:py-40">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <SectionHeading
            id="gallery-teaser-title"
            eyebrow="The gallery"
            titleClassName="text-hs-green"
            lines={["Moments at", <em key="e">High Spirits</em>]}
          >
            Grand openings, quiet anniversaries, long tables of friends — a visual archive of evenings on Victoria Street.
          </SectionHeading>
          <FadeUp delay={0.3} className="mt-10">
            <ButtonLink href="/gallery" variant="dark">
              Explore the gallery
            </ButtonLink>
          </FadeUp>
        </div>

        <Link href="/gallery" aria-label="Open the gallery" className="grid grid-cols-12 gap-3 md:gap-5 lg:col-span-7 lg:col-start-6" data-cursor="Explore">
          {tiles.map(({ item, className, sizes }, i) => {
            const Reveal = i % 2 ? ClipReveal : ImageReveal;
            return (
              <Reveal key={item.alt} delay={i * 0.07} className={`media-zoom relative overflow-hidden ${className}`}>
                <Image src={item.src} alt={item.alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
                {i === 0 && (
                  <span className="glass-chip absolute bottom-4 left-4">
                    <span className="text-hs-gold">{galleryItems.length}</span> photographs
                  </span>
                )}
              </Reveal>
            );
          })}
        </Link>
      </div>
    </section>
  );
}
