import Image from "next/image";
import { ClipReveal, FadeUp } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ingredients } from "@/lib/content/dishes";

const offsets = ["", "lg:mt-24", "lg:mt-10", "lg:mt-36"];

export function Ingredients() {
  return (
    <section aria-labelledby="ingredients-title" className="surface-light relative overflow-hidden bg-hs-sand py-28 text-hs-text md:py-40">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="ingredients-title"
            eyebrow="Premium ingredients"
            className="lg:col-span-6"
            titleClassName="text-hs-green"
            lines={["From soil", <em key="e">to spice.</em>]}
          />
          <FadeUp as="p" className="text-lead text-hs-text/75 lg:col-span-5 lg:col-start-8">
            Great Indian cooking starts long before the tandoor is lit — with lentils from Punjab, lamb from Tasmania and flour milled the old way.
          </FadeUp>
        </div>

        <ul className="mt-20 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((item, i) => (
            <li key={item.name} className={`group ${offsets[i]}`}>
              <ClipReveal delay={i * 0.08} className="media-zoom relative aspect-[3/4] overflow-hidden" data-cursor="View">
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw" placeholder="blur" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-hs-green-deep/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                <span aria-hidden className="absolute inset-3 border border-hs-gold-pale/0 transition-colors duration-700 group-hover:border-hs-gold-pale/60" />
                <p className="glass-chip absolute bottom-4 left-4">
                  <span className="h-px w-4 bg-hs-gold transition-[width] duration-700 group-hover:w-8" />
                  {item.origin}
                </p>
              </ClipReveal>
              <FadeUp delay={i * 0.08 + 0.1} className="mt-6">
                <p className="font-display text-sm text-hs-gold-deep">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display mt-1 text-2xl text-hs-green">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-hs-muted">{item.description}</p>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
