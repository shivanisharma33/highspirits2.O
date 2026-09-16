import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { ClipReveal, ClipRevealX, FadeUp, TextReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { chef } from "@/lib/content/story";
import { cx } from "@/lib/format";

type Props = { cta?: boolean; className?: string };

/** Executive Chef Amardeep Singh — portrait-led editorial spread. */
export function ChefStory({ cta = true, className }: Props) {
  return (
    <section aria-labelledby="chef-title" className={cx("surface-light relative overflow-hidden bg-hs-cream py-28 text-hs-text md:py-40", className)}>
      <div className="shell grid items-center gap-y-12 lg:grid-cols-12">
        {/* Portrait ≈ 58% */}
        <div className="relative lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <ClipReveal className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]" data-cursor="View">
            <Image src={chef.portrait.src} alt={chef.portrait.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" placeholder="blur" className="object-cover object-[50%_30%]" />
          </ClipReveal>
          <ClipReveal delay={0.35} className="absolute -bottom-10 left-4 w-[34%] max-w-[15rem] overflow-hidden border-[6px] border-hs-cream shadow-[0_40px_80px_-30px_hsl(160_70%_12%/0.55)] md:-left-6">
            <div className="relative aspect-[2/3]">
              <Image src={chef.inset.src} alt={chef.inset.alt} fill sizes="15rem" placeholder="blur" className="object-cover" />
            </div>
          </ClipReveal>
        </div>

        {/* Text panel overlapping the portrait */}
        <div className="relative z-10 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-ml-10 lg:mt-40">
          <div className="glass-light glass-spot relative rounded-[2rem] p-8 sm:p-12 lg:p-14">
            <ClipRevealX aria-hidden className="absolute left-0 top-12 bottom-12 w-px bg-hs-gold-deep" />
            <FadeUp as="p" className="eyebrow">
              The visionary
            </FadeUp>
            <TextReveal as="h2" id="chef-title" className="font-display mt-6 text-h2 text-hs-green" lines={["Amardeep", "Singh"]} />
            <FadeUp as="p" delay={0.15} className="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-hs-gold-deep">
              {chef.role}
            </FadeUp>

            <FadeUp delay={0.2} className="mt-10 flex items-end gap-5 border-y border-hs-line py-6">
              <CountUp value={chef.experience} className="font-display text-6xl leading-none text-hs-green" />
              <span className="pb-1 text-xs uppercase leading-snug tracking-[0.2em] text-hs-muted">
                Years of global
                <br />
                culinary experience
              </span>
            </FadeUp>

            <FadeUp as="p" delay={0.25} className="mt-8 leading-relaxed text-hs-text/80">
              {chef.bio}
            </FadeUp>
            <FadeUp as="blockquote" delay={0.3} className="font-display mt-8 border-l-2 border-hs-gold-deep pl-5 text-2xl italic leading-snug text-hs-green">
              “{chef.quote}”
            </FadeUp>
            {cta && (
              <FadeUp delay={0.35} className="mt-10">
                <ButtonLink href="/about" variant="dark">
                  Our story
                </ButtonLink>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
