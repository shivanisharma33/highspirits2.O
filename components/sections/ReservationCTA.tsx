import Image from "next/image";
import { FadeUp, TextReveal } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Clock } from "@/components/ui/Icons";
import { media } from "@/lib/images";
import { hours, site } from "@/lib/site";

/** The conversion moment: a single, dramatic invitation. */
export function ReservationCTA() {
  return (
    <section aria-labelledby="cta-title" className="grain relative isolate overflow-hidden bg-hs-green py-14 text-center md:py-20">
      <Image src={media.interiorLuxe.src} alt="" fill sizes="100vw" placeholder="blur" className="-z-20 object-cover opacity-25 mix-blend-luminosity" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,hsl(160_60%_18%/0.4),var(--hs-green)_85%)]" />
      <Aurora />

      {/* concentric gold rings */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        {[34, 52, 72].map((s) => (
          <span key={s} className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full border border-hs-gold/15" style={{ width: `${s}rem`, height: `${s}rem` }} />
        ))}
      </div>

      <div className="shell">
        <FadeUp as="p" className="eyebrow justify-center">
          Reservations
        </FadeUp>
        <TextReveal
          as="h2"
          id="cta-title"
          className="font-display mt-8 text-display uppercase"
          lines={["Your table", <em key="e" className="text-gold-gradient normal-case">awaits.</em>]}
        />
        <FadeUp as="p" delay={0.2} className="font-display mx-auto mt-10 max-w-xl text-2xl italic text-hs-cream/85">
          Come for the flavours. Stay for the experience.
        </FadeUp>
        <FadeUp delay={0.3} className="glass glass-edge mx-auto mt-12 flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-[2rem] p-2 sm:rounded-full">
          <ButtonLink href="/reservation">Reserve a Table</ButtonLink>
          <ButtonLink href="/menu" variant="ghost">
            Explore Menu
          </ButtonLink>
        </FadeUp>
        <FadeUp as="ul" delay={0.35} className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2" aria-label="Opening hours">
          {hours.map((h) => (
            <li key={h.label} className="glass-chip">
              <Clock size={13} className="text-hs-gold" />
              {h.label} · {h.days} · {h.time}
            </li>
          ))}
          <li className="glass-chip">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hs-gold" />
            Buffet from {site.buffet.starts}
          </li>
        </FadeUp>
        <FadeUp as="p" delay={0.4} className="mt-10 text-xs uppercase tracking-[0.24em] text-hs-cream/60">
          Prefer to call?{" "}
          <a href={site.phone.href} className="link-line text-hs-gold">
            {site.phone.display}
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
