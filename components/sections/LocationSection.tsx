import { FadeUp, TextReveal } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Mail, Phone } from "@/components/ui/Icons";
import { addressLines, hours, site } from "@/lib/site";
import { MapFacade } from "./MapFacade";

export function LocationSection() {
  return (
    <section aria-labelledby="location-title" className="relative isolate overflow-hidden bg-hs-green-dark py-28 md:py-36">
      <Aurora />
      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-5">
          <FadeUp as="p" className="eyebrow mb-7">
            Find us
          </FadeUp>
          <TextReveal as="h2" id="location-title" className="font-display text-h2" lines={["In the heart", <em key="e" className="text-gold-gradient">of Bunbury.</em>]} />

          <FadeUp delay={0.1} className="glass glass-edge glass-spot mt-12 grid gap-10 rounded-[1.75rem] p-7 sm:grid-cols-2 md:p-8 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-hs-gold">Address</h3>
              <address className="mt-4 not-italic leading-relaxed text-hs-cream/80">
                {addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-hs-gold">Opening hours</h3>
              <dl className="mt-4 grid gap-3 text-hs-cream/80">
                {hours.map((h) => (
                  <div key={h.label}>
                    <dt className="text-hs-cream">{h.label}</dt>
                    <dd>
                      {h.days}
                      <br />
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="mt-8 grid gap-3 text-hs-cream/85">
            <a href={site.phone.href} className="link-line w-fit">
              <Phone size={16} className="text-hs-gold" /> {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="link-line w-fit break-all">
              <Mail size={16} className="text-hs-gold" /> {site.email}
            </a>
          </FadeUp>

          <FadeUp delay={0.25} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={site.directions} external>
              Get directions
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact
            </ButtonLink>
          </FadeUp>
        </div>

        <FadeUp delay={0.15} className="lg:col-span-7">
          <MapFacade className="aspect-[4/5] w-full rounded-[2rem] sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[22rem]" />
        </FadeUp>
      </div>
    </section>
  );
}




