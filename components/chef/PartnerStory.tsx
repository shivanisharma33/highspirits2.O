import Image from "next/image";
import { ClipReveal, FadeUp } from "@/components/motion/Reveal";
import { partner } from "@/lib/content/story";
import { cx } from "@/lib/format";

type Props = { className?: string };

/** Business Partner Ishpreet Bedi — styled identically to ChefStory with cream background & frosted card. */
export function PartnerStory({ className }: Props) {
  return (
    <section
      aria-labelledby="partner-title"
      className={cx(
        "surface-light relative overflow-hidden bg-hs-cream py-12 md:py-16 lg:py-20",
        className,
      )}
    >
      <div className="shell grid items-center gap-y-12 lg:grid-cols-12">
        {/* Left Side: Portrait & Inset Photo */}
        <div className="relative lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <ClipReveal
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] md:aspect-[5/6]"
            data-cursor="View"
          >
            <Image
              src={partner.portrait.src}
              alt={partner.portrait.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              quality={80}
              priority
              className="object-cover object-[50%_20%]"
            />
          </ClipReveal>

          {/* Bottom-Left Overlapping Inset */}
          {partner.inset && (
            <ClipReveal
              delay={0.25}
              className="absolute -bottom-8 left-4 w-[38%] max-w-[15rem] overflow-hidden rounded-[1.75rem] border-[6px] border-white md:-left-6 md:-bottom-10"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={partner.inset.src}
                  alt={partner.inset.alt}
                  fill
                  sizes="15rem"
                  quality={80}
                  className="object-cover"
                />
              </div>
            </ClipReveal>
          )}
        </div>

        {/* Right Side: Editorial Card Exactly Matching ChefStory */}
        <div className="relative z-10 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-ml-12 xl:-ml-16">
          <div className="relative rounded-[2.5rem] border border-white/80 bg-white/92 p-8 backdrop-blur-xl sm:p-12 lg:p-14">
            {/* Top Eyebrow with gold dash */}
            <FadeUp as="div" className="flex items-center gap-3">
              <span className="h-px w-7 bg-hs-gold-deep" />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-hs-gold-deep">
                LEADERSHIP &amp; HOSPITALITY
              </span>
            </FadeUp>

            {/* Main Headline: "Meet Our" in Green + "Business Partner" in Gold Italic */}
            <FadeUp as="h2" id="partner-title" delay={0.08} className="font-display mt-5 text-[clamp(2.8rem,5.2vw,4.6rem)] font-normal leading-[1] tracking-tight">
              <span className="block text-hs-green">Meet Our</span>
              <span className="block font-normal italic text-hs-gold-deep">Business Partner</span>
            </FadeUp>

            {/* Partner Identity */}
            <FadeUp delay={0.14} className="mt-7">
              <h3 className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-hs-green sm:text-3xl">
                {partner.name}
              </h3>
              <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-hs-gold-deep">
                {partner.role}
              </p>
            </FadeUp>

            {/* Divider Line */}
            <div className="my-8 h-px w-full bg-hs-line/70" />

            {/* Hospitality Philosophy Header with Golden Dot */}
            <FadeUp delay={0.18} className="flex items-center justify-between">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-hs-gold-deep">
                HOSPITALITY PHILOSOPHY
              </span>
              <span className="h-2 w-2 rounded-full bg-hs-gold-deep" />
            </FadeUp>

            {/* Narrative Paragraphs Exactly from Screenshot */}
            <div className="mt-4 space-y-4">
              {partner.paragraphs.map((para, idx) => (
                <FadeUp
                  key={idx}
                  delay={0.22 + idx * 0.05}
                  as="p"
                  className="text-xs sm:text-sm leading-relaxed text-hs-text/85"
                >
                  {para}
                </FadeUp>
              ))}
            </div>

            {/* Key Hospitality Pillars */}
            {partner.highlights && partner.highlights.length > 0 && (
              <FadeUp delay={0.38} className="mt-8 border-t border-hs-line/70 pt-6">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-hs-gold-deep" />
                  <h4 className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-hs-green">
                    Core Standards
                  </h4>
                </div>
                <ul className="mt-3.5 grid gap-2">
                  {partner.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs font-medium tracking-wide text-hs-text/80"
                    >
                      <span className="text-hs-gold-deep text-xs font-bold shrink-0">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
