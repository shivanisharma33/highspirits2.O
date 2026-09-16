import Image from "next/image";
import { Parallax } from "@/components/motion/Parallax";
import { FadeUp, TextReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Clock, MapPin } from "@/components/ui/Icons";
import { media } from "@/lib/images";
import { hours, site } from "@/lib/site";

/** Full-bleed photograph with a single glass information card. */
export function Atmosphere() {
  return (
    <section aria-labelledby="atmosphere-title" className="relative flex min-h-[110svh] items-end overflow-hidden bg-hs-green-deep">
      <Parallax speed={0.18} className="absolute -inset-y-[10%] inset-x-0">
        <Image src={media.exteriorNight.src} alt={media.exteriorNight.alt} fill sizes="100vw" placeholder="blur" className="object-cover" />
      </Parallax>
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-hs-green-deep via-hs-green-deep/30 to-hs-green-deep/60" />

      <div className="shell relative grid w-full items-end gap-12 pb-20 pt-40 md:pb-28 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <FadeUp as="p" className="eyebrow mb-7">
            The atmosphere
          </FadeUp>
          <TextReveal
            as="h2"
            id="atmosphere-title"
            className="font-display text-[clamp(2.2rem,5.6vw,6.25rem)] uppercase leading-[0.95] tracking-[-0.025em]"
            lines={["An unforgettable", <em key="e" className="text-gold-gradient normal-case">experience</em>]}
          />
        </div>

        <FadeUp delay={0.2} className="glass glass-edge glass-spot rounded-[1.75rem] p-8 md:p-10 lg:col-span-4 lg:col-start-9">
          <p className="text-[0.62rem] uppercase tracking-[0.3em] text-hs-gold">A destination restaurant & bar</p>
          <p className="font-display mt-4 text-2xl leading-snug">From warm hospitality to elevated flavours — an evening under the emerald glow.</p>
          <div className="mt-8 grid gap-4 border-t border-hs-cream/15 pt-6 text-sm text-hs-cream/80">
            <p className="flex gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-hs-gold" />
              {site.address.street}, {site.address.locality} {site.address.region} {site.address.postcode}
            </p>
            {hours.map((h) => (
              <p key={h.label} className="flex gap-3">
                <Clock size={17} className="mt-0.5 shrink-0 text-hs-gold" />
                <span>
                  <span className="text-hs-cream">{h.label}</span> · {h.days} · {h.time}
                </span>
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/reservation">Reserve</ButtonLink>
            <ButtonLink href={site.directions} variant="ghost" external>
              Directions
            </ButtonLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
