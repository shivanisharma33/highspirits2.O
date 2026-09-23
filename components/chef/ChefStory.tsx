import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { ClipReveal, FadeUp } from "@/components/motion/Reveal";
import { chef } from "@/lib/content/story";
import { cx } from "@/lib/format";

type Props = { className?: string; cta?: boolean };

/** Executive Chef Amardeep Singh — matches user reference image. */
export function ChefStory({ className, cta = true }: Props) {
  return (
    <section
      aria-labelledby="chef-title"
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
              src={chef.portrait.src}
              alt={chef.portrait.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              quality={90}
              priority
              className="object-cover object-[50%_25%]"
            />
          </ClipReveal>

          {/* Bottom-Left Overlapping Inset */}
          {chef.inset && (
            <ClipReveal
              delay={0.25}
              className="absolute -bottom-8 left-4 w-[38%] max-w-[15rem] overflow-hidden rounded-[1.75rem] border-[6px] border-white md:-left-6 md:-bottom-10"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={chef.inset.src}
                  alt={chef.inset.alt}
                  fill
                  sizes="15rem"
                  quality={80}
                  className="object-cover"
                />
              </div>
            </ClipReveal>
          )}
        </div>

        {/* Right Side: Editorial Card Exactly Matching Reference Image */}
        <div className="relative z-10 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-ml-12 xl:-ml-16">
          <div className="relative rounded-[2.5rem] border border-white/80 bg-white/92 p-8 backdrop-blur-xl sm:p-12 lg:p-14">
            {/* Top Eyebrow with gold dash */}
            <FadeUp as="p" className="eyebrow mb-2">
              The Visionary
            </FadeUp>

            {/* Main Headline: "Meet the" in Green + "Visionary" in Gold Italic */}
            <FadeUp as="h2" id="chef-title" delay={0.08} className="font-display mt-5 text-[clamp(2.8rem,5.2vw,4.6rem)] font-normal leading-[1] tracking-tight">
              <span className="block text-hs-green">Meet the</span>
              <span className="block font-normal italic text-hs-gold-deep">Visionary</span>
            </FadeUp>

            {/* Chef Identity */}
            <FadeUp delay={0.14} className="mt-7">
              <h3 className="font-display text-2xl font-bold uppercase tracking-[0.06em] text-hs-green sm:text-3xl">
                {chef.name}
              </h3>
              <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-hs-gold-deep">
                {chef.role}
              </p>
            </FadeUp>

            {/* Experience Metric: 20+ YEARS OF GLOBAL CULINARY EXPERIENCE */}
            <FadeUp delay={0.18} className="mt-8 flex items-center gap-4">
              <span className="font-display text-5xl font-bold text-hs-green leading-none sm:text-6xl">
                <CountUp value={chef.experience} />
              </span>
              <span className="border-l border-hs-line pl-4 text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.2em] text-hs-muted">
                YEARS OF GLOBAL
                <br />
                CULINARY EXPERIENCE
              </span>
            </FadeUp>

            {/* Divider Line */}
            <div className="my-8 h-px w-full bg-hs-line/70" />

            {/* Chef's Philosophy Header with Golden Dot */}
            <FadeUp delay={0.22} className="flex items-center justify-between">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-hs-gold-deep">
                {chef.philosophyTitle}
              </span>
              <span className="h-2 w-2 rounded-full bg-hs-gold-deep" />
            </FadeUp>

            {/* Paragraph 1 */}
            <FadeUp delay={0.26} as="p" className="mt-4 text-xs sm:text-sm leading-relaxed text-hs-text/85">
              At{" "}
              <strong className="font-semibold text-hs-gold-deep">High Spirits</strong>,
              cooking is an expression of soul and storytelling where the rich traditions
              of Punjab meet the modern spirit of Australia. Every plate reflects balance,
              emotion and a deep respect for heritage, crafted for those who appreciate
              refined Indian fine dining in{" "}
              <strong className="font-semibold text-hs-gold-deep">Bunbury, WA</strong>.
            </FadeUp>

            {/* Paragraph 2 */}
            <FadeUp delay={0.3} as="p" className="mt-4 text-xs sm:text-sm leading-relaxed text-hs-text/85">
              Led by{" "}
              <strong className="font-semibold text-hs-gold-deep">Amardeep Singh</strong>,
              our Executive Chef with over 20 years of global culinary experience, the
              kitchen blends time-honoured techniques with contemporary finesse. Using the
              finest seasonal ingredients,{" "}
              <strong className="font-semibold text-hs-gold-deep">High Spirits</strong>{" "}
              stands proudly as a destination restaurant &amp; bar, redefining fine dining in
              Australia through flavour, warmth and unforgettable experiences.
            </FadeUp>

            {/* Accolades Section */}
            {chef.accolades && chef.accolades.length > 0 && (
              <FadeUp delay={0.35} className="mt-8 border-t border-hs-line/70 pt-6">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-hs-gold-deep" />
                  <h4 className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-hs-green">
                    Accolades
                  </h4>
                </div>
                <ul className="mt-3.5 grid gap-2">
                  {chef.accolades.map((item) => (
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
