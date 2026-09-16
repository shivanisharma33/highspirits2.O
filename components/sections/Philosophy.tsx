import Image from "next/image";
import { FadeUp, TextReveal } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { philosophy } from "@/lib/content/story";

const lift = ["", "lg:mt-20", "lg:mt-10"];

/** HERITAGE + CRAFT + INNOVATION — three glass chapters over drifting emerald light. */
export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="grain relative overflow-hidden bg-hs-green-deep py-28 md:py-40">
      <Aurora />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <FadeUp as="p" className="eyebrow mb-7">
              Our philosophy
            </FadeUp>
            <TextReveal
              as="h2"
              id="philosophy-title"
              className="font-display text-h2"
              lines={["Heritage, craft", <em key="e" className="text-gold-gradient">& innovation.</em>]}
            />
          </div>
          <FadeUp as="p" delay={0.1} className="text-lead text-hs-cream/75 lg:col-span-4 lg:col-start-9">
            Three ideas behind every plate — the recipes we inherited, the hours we give them, and the way we bring them to Bunbury.
          </FadeUp>
        </div>

        <ol className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-3 lg:gap-8">
          {philosophy.map((chapter, i) => (
            <FadeUp as="li" key={chapter.word} delay={i * 0.1} className={lift[i]}>
              <article className="glass glass-edge glass-spot group h-full rounded-[1.75rem] p-3 transition-transform duration-700 ease-luxe hover:-translate-y-2 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:block">
                <div className="media-zoom relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
                  <Image src={chapter.image.src} alt={chapter.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" placeholder="blur" className="object-cover" />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-hs-green-deep/70 via-transparent to-transparent" />
                  <span className="glass-chip absolute left-4 top-4">
                    <span className="text-hs-gold">{String(i + 1).padStart(2, "0")}</span> / {String(philosophy.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="px-4 pb-6 pt-7 md:px-3 md:py-4 lg:px-6 lg:pb-8 lg:pt-8">
                  <p className="font-display text-[clamp(2rem,3vw,3.2rem)] uppercase leading-none tracking-[-0.02em]">
                    {i === 1 ? <em className="text-gold-gradient normal-case">{chapter.word}</em> : chapter.word}
                  </p>
                  <h3 className="font-display mt-5 text-xl italic text-hs-gold-pale">{chapter.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-hs-cream/75">{chapter.body}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}
