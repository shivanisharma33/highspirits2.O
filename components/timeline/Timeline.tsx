import Image from "next/image";
import { ClipReveal, FadeUp, TextReveal } from "@/components/motion/Reveal";
import { chapters } from "@/lib/content/story";
import { cx } from "@/lib/format";

/** Vertical story chapters on a gold spine, alternating sides on desktop. */
export function Timeline() {
  return (
    <section aria-labelledby="timeline-title" className="grain relative overflow-hidden bg-hs-green-deep py-28 md:py-40">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <FadeUp as="p" className="eyebrow eyebrow--plain justify-center">
            Our journey
          </FadeUp>
          <TextReveal as="h2" id="timeline-title" className="font-display mt-7 text-h2" lines={["A story told", <em key="e" className="text-gold-gradient">in chapters.</em>]} />
        </div>

        <ol className="relative mt-24">
          <span aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-linear-to-b from-transparent via-hs-gold/50 to-transparent md:left-1/2" />
          {chapters.map((c, i) => {
            const right = i % 2 === 1;
            return (
              <li key={c.mark} className="relative grid gap-8 pb-24 pl-14 last:pb-0 md:grid-cols-2 md:gap-20 md:pl-0">
                <span aria-hidden className="font-display absolute left-4 top-1 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border border-hs-gold bg-hs-green-deep text-xs text-hs-gold md:left-1/2">
                  {c.mark}
                </span>
                <FadeUp className={cx("md:pt-1", right ? "md:order-2 md:pl-4" : "md:pr-4 md:text-right")}>
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-hs-gold">{c.label}</p>
                  <h3 className="font-display mt-4 text-h3">{c.title}</h3>
                  <p className={cx("mt-4 max-w-md leading-relaxed text-hs-cream/70", !right && "md:ml-auto")}>{c.body}</p>
                </FadeUp>
                <ClipReveal className={cx("relative aspect-[4/3] overflow-hidden", right ? "md:order-1" : "")}>
                  <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 768px) 40vw, 90vw" placeholder="blur" className="object-cover" />
                </ClipReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
