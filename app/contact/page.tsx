import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeUp, IntroLines, TextReveal } from "@/components/motion/Reveal";
import { MapFacade } from "@/components/sections/MapFacade";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Facebook, Instagram, Mail, MapPin, Phone, Plus } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { media } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { addressLines, hours, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us | Indian Restaurant in Bunbury",
  description: "Contact High Spirits in Bunbury to book a table, enquire about events, or learn more about our Indian buffet dining experience.",
  path: "/contact",
});

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** Answers drawn from the restaurant's published hours, menu and dining guidelines. */
const faqs = [
  { q: "When are you open?", a: `Lunch is served ${hours[0].days}, ${hours[0].time}. Dinner is served ${hours[1].days}, ${hours[1].time}.` },
  { q: "What time does the buffet start?", a: `Our lavish buffet starts at ${site.buffet.starts}, with unlimited servings for $${site.buffet.price}.` },
  { q: "Do you cater for dietary requirements?", a: "Yes — vegetarian and vegan dishes are marked on our menu. Please inform us of any allergies or dietary restrictions when booking." },
  { q: "Are children welcome?", a: "Children are welcome, and high chairs are available on request." },
  { q: "Is there a dress code?", a: "Smart casual dress is encouraged." },
  { q: "Can you host a large group?", a: "Absolutely. For parties of 8 or more, 48 hours notice is required. For private celebrations of up to 120 guests, see our events page." },
  { q: "Do you offer delivery?", a: "Yes — order High Spirits favourites for delivery through Uber Eats." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />

      {/* Split screen */}
      <section aria-labelledby="contact-title" className="relative grid min-h-[100svh] lg:grid-cols-2">
        <div className="grain relative flex flex-col justify-end bg-hs-green-deep px-[var(--gutter)] pb-16 pt-[calc(var(--header-h)+4rem)] lg:pb-20">
          <p className="eyebrow intro-rise" style={d(0.1)}>
            Get in touch
          </p>
          <IntroLines as="h1" id="contact-title" className="font-display mt-8 text-h1" lines={["We'd love", <em key="e" className="text-gold-gradient">to hear from you.</em>]} start={0.2} />
          <p className="intro-rise mt-8 max-w-md text-hs-cream/75" style={d(0.5)}>
            Whether you have questions about our menu, want to make a reservation, or simply wish to share feedback — we&apos;re here to make your experience perfect.
          </p>

          <div className="intro-rise mt-14 grid gap-10 border-t border-hs-cream/15 pt-10 sm:grid-cols-2" style={d(0.65)}>
            <div>
              <h2 className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-hs-gold">
                <MapPin size={15} /> Location
              </h2>
              <address className="mt-4 not-italic leading-relaxed text-hs-cream/85">
                {addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <h2 className="text-[0.65rem] uppercase tracking-[0.3em] text-hs-gold">Opening hours</h2>
              <dl className="mt-4 grid gap-3 text-hs-cream/85">
                {hours.map((h) => (
                  <div key={h.label}>
                    <dt className="text-hs-cream">{h.label}</dt>
                    <dd className="text-sm text-hs-cream/70">
                      {h.days} · {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid gap-3">
              <a href={site.phone.href} className="link-line w-fit text-hs-cream">
                <Phone size={16} className="text-hs-gold" /> {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="link-line w-fit break-all text-hs-cream">
                <Mail size={16} className="text-hs-gold" /> {site.email}
              </a>
            </div>
            <div className="flex gap-3">
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="High Spirits on Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-hs-cream/20 transition-colors hover:border-hs-gold hover:text-hs-gold">
                <Instagram size={17} />
              </a>
              <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="High Spirits on Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-hs-cream/20 transition-colors hover:border-hs-gold hover:text-hs-gold">
                <Facebook size={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex items-center px-[var(--gutter)] py-20 lg:pt-[calc(var(--header-h)+3rem)]">
          <Image src={media.interiorLuxe.src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-hs-green-deep/50" />
          <div className="glass glass-edge intro-rise relative w-full rounded-[2rem] p-7 sm:p-10 xl:p-14" style={d(0.4)}>
            <h2 className="font-display text-h3">Send us a message</h2>
            <p className="mb-10 mt-3 text-sm text-hs-cream/70">For table bookings, our reservation page is the quickest way.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map + directions */}
      <section aria-labelledby="map-title" className="bg-hs-green-dark py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <FadeUp as="p" className="eyebrow">
              Visit us today
            </FadeUp>
            <TextReveal as="h2" id="map-title" className="font-display mt-7 text-h2" lines={["Victoria Street,", <em key="e" className="text-gold-gradient">Bunbury.</em>]} />
            <FadeUp as="p" delay={0.1} className="mt-8 text-hs-cream/75">
              Located in the heart of Bunbury&apos;s dining district, a short walk from the waterfront.
            </FadeUp>
            <FadeUp delay={0.15} className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={site.directions} external>
                Get directions
              </ButtonLink>
              <ButtonLink href="/reservation" variant="ghost">
                Reserve
              </ButtonLink>
            </FadeUp>
          </div>
          <FadeUp delay={0.1} className="lg:col-span-8">
            <MapFacade className="aspect-[4/5] w-full rounded-[2rem] sm:aspect-[16/10]" />
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="surface-light bg-hs-cream py-24 text-hs-text md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FadeUp as="p" className="eyebrow">
              Good to know
            </FadeUp>
            <FadeUp as="h2" id="faq-title" className="font-display mt-7 text-h2 text-hs-green">
              Questions, <em>answered.</em>
            </FadeUp>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {faqs.map((f, i) => (
              <FadeUp key={f.q} delay={i * 0.04}>
                <details className="group border-b border-hs-line py-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                    <span className="font-display text-xl text-hs-green md:text-2xl">{f.q}</span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-hs-green/20 text-hs-green transition-transform duration-500 group-open:rotate-45">
                      <Plus size={16} />
                    </span>
                  </summary>
                  <p className="mt-4 max-w-xl leading-relaxed text-hs-muted">{f.a}</p>
                </details>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
