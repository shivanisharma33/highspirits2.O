import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { EventForm } from "@/components/forms/EventForm";
import { CountUp } from "@/components/motion/CountUp";
import { ClipReveal, FadeUp, IntroLines, TextReveal } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Mail, Phone } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { RecentCelebrations } from "@/components/events/RecentCelebrations";
import { eventServices } from "@/lib/content/events";
import { media } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Private Events & Indian Buffet Dining",
  description:
    "Plan private events at High Spirits in Bunbury, offering Indian buffet dining, elegant ambience and carefully curated dining experiences.",
  path: "/events",
});

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function perthToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Perth" }).format(new Date());
}

export default function EventsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Events", path: "/events" }])} />

      {/* Hero — split with overlapping photographs */}
      <section aria-labelledby="events-title" className="grain relative overflow-hidden bg-hs-green-deep pb-28 pt-[calc(var(--header-h)+5rem)]">
        <div className="shell grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow intro-rise" style={d(0.1)}>
              Private dining · Celebrations · Corporate
            </p>
            <IntroLines as="h1" id="events-title" className="font-display mt-8 text-h1" lines={["Gather in", <em key="e" className="text-gold-gradient">high spirits.</em>]} start={0.2} />
            <p className="intro-rise mt-10 max-w-lg text-lead text-hs-cream/75" style={d(0.6)}>
              Plan private events at High Spirits in Bunbury — Indian buffet dining, elegant ambience and carefully curated experiences for up to 120 guests.
            </p>
            <div className="intro-rise mt-10 flex flex-wrap gap-3" style={d(0.75)}>
              <ButtonLink href="#enquire">Enquire now</ButtonLink>
              <ButtonLink href={site.phone.href} variant="ghost" arrow={false}>
                Call {site.phone.display}
              </ButtonLink>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8">
            <div className="intro-rise relative ml-auto aspect-[3/4] w-[82%] overflow-hidden" style={d(0.3)}>
              <Image src={media.opening3.src} alt={media.opening3.alt} fill preload sizes="(min-width: 1024px) 34vw, 82vw" placeholder="blur" className="intro-media object-cover" />
            </div>
            <div className="intro-rise absolute -bottom-10 left-0 w-[48%] border-[6px] border-hs-green-deep" style={d(0.6)}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={media.valentines2.src} alt={media.valentines2.alt} fill sizes="(min-width: 1024px) 20vw, 48vw" placeholder="blur" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services — editorial index */}
      <section aria-labelledby="services-title" className="surface-light bg-hs-cream py-28 text-hs-text md:py-36">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <FadeUp as="p" className="eyebrow">
                What we host
              </FadeUp>
              <TextReveal as="h2" id="services-title" className="font-display mt-7 text-h2 text-hs-green" lines={["Every occasion,", <em key="e">beautifully held.</em>]} />
            </div>
          </div>

          <ol className="mt-20 border-t border-hs-line">
            {eventServices.map((s, i) => (
              <li key={s.title} className="group relative grid items-center gap-6 border-b border-hs-line py-8 md:grid-cols-12 md:py-10">
                <span className="font-display text-sm text-hs-gold-deep md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-[clamp(1.8rem,3.4vw,3.2rem)] leading-none text-hs-green transition-transform duration-700 ease-luxe group-hover:translate-x-3 md:col-span-5">
                  {s.title}
                </h3>
                <p className="text-hs-muted md:col-span-3">{s.body}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hs-gold-deep md:col-span-2 md:text-right">{s.capacity}</p>
                <div className="relative aspect-[16/9] overflow-hidden md:hidden">
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" placeholder="blur" className="object-cover" />
                </div>
                <div aria-hidden className="pointer-events-none absolute right-[18%] top-1/2 z-10 hidden aspect-[4/5] w-56 -translate-y-1/2 rotate-3 scale-90 overflow-hidden opacity-0 transition-all duration-700 ease-luxe group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 md:block">
                  <Image src={s.image.src} alt="" fill sizes="14rem" placeholder="blur" className="object-cover" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Venue information */}
      <section aria-labelledby="venue-title" className="relative isolate overflow-hidden bg-hs-green-dark py-28 md:py-36">
        <Aurora />
        <div className="shell grid gap-16 lg:grid-cols-12 lg:items-center">
          <ClipReveal className="relative aspect-[4/5] overflow-hidden lg:col-span-5" data-cursor="View">
            <Image src={media.interiorLuxe.src} alt={media.interiorLuxe.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="object-cover" />
          </ClipReveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <FadeUp as="p" className="eyebrow">
              The venue
            </FadeUp>
            <TextReveal as="h2" id="venue-title" className="font-display mt-7 text-h2" lines={["Yours for", <em key="e" className="text-gold-gradient">the evening.</em>]} />
            <FadeUp as="p" delay={0.1} className="mt-8 max-w-lg text-lead text-hs-cream/75">
              From intimate private celebrations to exclusive full-venue hire, our team shapes the menu, the room and the pace around your occasion.
            </FadeUp>
            <FadeUp delay={0.15} as="dl" className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["120", "Guests for receptions"],
                ["100", "Guests for corporate"],
                ["Full", "Venue hire available"],
              ].map(([v, l]) => (
                <div key={l} className="glass glass-edge glass-spot rounded-[1.25rem] p-6">
                  <dd className="font-display text-4xl text-hs-gold">
                    <CountUp value={v} />
                  </dd>
                  <dt className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-hs-cream/60">{l}</dt>
                </div>
              ))}
            </FadeUp>
            <FadeUp delay={0.2} className="mt-10 text-sm text-hs-cream/70">
              {site.address.street}, {site.address.locality} {site.address.region} {site.address.postcode} · Off-site catering available for events of any size.
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Interactive Celebrations Section */}
      <RecentCelebrations />

      {/* Enquiry */}
      <section id="enquire" aria-labelledby="enquire-title" className="grain relative scroll-mt-20 overflow-hidden bg-hs-green py-28 md:py-36">
        <Aurora />
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FadeUp as="p" className="eyebrow">
              Enquiries
            </FadeUp>
            <TextReveal as="h2" id="enquire-title" className="font-display mt-7 text-h2" lines={["Let's plan", <em key="e" className="text-gold-gradient">something.</em>]} />
            <FadeUp as="p" delay={0.1} className="mt-8 text-hs-cream/75">
              Tell us a little about your event and our team will come back to you within 24 hours with ideas, menus and availability.
            </FadeUp>
            <FadeUp delay={0.15} className="mt-10 grid gap-3 text-hs-cream/85">
              <a href={site.phone.href} className="link-line w-fit">
                <Phone size={16} className="text-hs-gold" /> {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="link-line w-fit break-all">
                <Mail size={16} className="text-hs-gold" /> {site.email}
              </a>
            </FadeUp>
          </div>
          <FadeUp delay={0.1} className="glass glass-edge rounded-[2rem] p-7 sm:p-10 lg:col-span-7 lg:col-start-6 lg:p-14">
            <EventForm minDate={perthToday()} />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
