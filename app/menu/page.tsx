import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { MenuList } from "@/components/menu/MenuList";
import { CountUp } from "@/components/motion/CountUp";
import { FadeUp, ClipReveal, IntroLines, TextReveal } from "@/components/motion/Reveal";
import { ReservationCTA } from "@/components/sections/ReservationCTA";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Flame } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { buffet, menuCategories, menuItemCount } from "@/lib/content/menu";
import { formatPrice } from "@/lib/format";
import { media } from "@/lib/images";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Menu | Indian Buffet & Fine Dining Bunbury",
  description:
    "Explore the High Spirits menu featuring an Indian buffet and fine dining dishes, with vegetarian and non-vegetarian mains crafted for refined tastes.",
  path: "/menu",
});

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "High Spirits Menu",
  url: absoluteUrl("/menu"),
  inLanguage: "en-AU",
  hasMenuSection: menuCategories.map((c) => ({
    "@type": "MenuSection",
    name: c.title,
    hasMenuItem: c.items.map((i) => ({
      "@type": "MenuItem",
      name: i.name,
      description: i.description,
      offers: { "@type": "Offer", price: typeof i.price === "number" ? i.price.toFixed(2) : String(i.price), priceCurrency: "AUD" },
      ...(i.diet?.includes("VG") ? { suitableForDiet: "https://schema.org/VeganDiet" } : i.diet?.includes("V") ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
    })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <JsonLd data={menuJsonLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Menu", path: "/menu" }])} />

      {/* ═══════════════════════════════════════════════════════
          PAGE TITLE — Centered editorial hero
          ═══════════════════════════════════════════════════════ */}
      <section aria-labelledby="menu-title" className="surface-light relative overflow-hidden bg-hs-cream pb-16 pt-[calc(var(--header-h)+5rem)] md:pb-20">
        <div className="shell relative">
          <div className="mx-auto max-w-5xl text-center">
            <IntroLines
              as="h1"
              id="menu-title"
              className="font-display text-[clamp(2.4rem,6.2vw,5.4rem)] leading-[0.98] tracking-tight text-hs-green-deep"
              lines={[
                <span key="l1" className="whitespace-nowrap">Discover the art</span>,
                <em key="m" className="italic whitespace-nowrap">of flavour</em>,
              ]}
              start={0.15}
            />
            <p className="intro-rise mx-auto mt-8 max-w-xl text-lead text-hs-muted" style={d(0.5)}>
              A curated journey of taste — {menuItemCount} dishes crafted from authentic Punjabi recipes, inspired by heritage and plated with precision.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BANNER — Full-width cinematic food image
          ═══════════════════════════════════════════════════════ */}
      <section aria-label="Featured banner" className="relative overflow-hidden bg-hs-cream">
        <div className="shell pb-4">
          <ClipReveal className="relative aspect-[21/9] overflow-hidden rounded-2xl md:rounded-3xl">
            <Image
              src={media.heroTableSpread.src}
              alt={media.heroTableSpread.alt}
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-cover"
              priority
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
          </ClipReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MENU SECTIONS — Aromix-style full-width item rows
          ═══════════════════════════════════════════════════════ */}
      <MenuList />

      {/* ═══════════════════════════════════════════════════════
          BUFFET — Featured spotlight
          ═══════════════════════════════════════════════════════ */}
      <section id="buffet" aria-labelledby="buffet-title" className="grain relative scroll-mt-28 overflow-hidden bg-hs-green-dark py-28 md:py-36">
        <Aurora />

        <div className="shell relative">
          <div className="mx-auto max-w-2xl text-center">
            <FadeUp as="p" className="eyebrow justify-center">
              Nightly from {buffet.starts}
            </FadeUp>
            <TextReveal as="h2" id="buffet-title" className="font-display mt-6 text-h2" lines={["The Lavish", <em key="b">Buffet</em>]} />
            <FadeUp delay={0.15} className="mt-8 inline-flex items-end gap-3">
              <CountUp value={formatPrice(buffet.price)} className="font-display text-7xl leading-none text-hs-gold md:text-8xl" />
              <span className="mb-2 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-hs-cream/45">per person · unlimited</span>
            </FadeUp>
            <FadeUp as="p" delay={0.2} className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-hs-cream/55">
              A wide spread of freshly prepared dishes with unlimited servings — perfect for families, groups and celebratory dining.
            </FadeUp>
            <FadeUp delay={0.25} className="mt-10">
              <ButtonLink href="/reservation?experience=buffet" variant="dark">
                Book the buffet
              </ButtonLink>
            </FadeUp>
          </div>

          <div className="mt-20 grid gap-1 sm:grid-cols-3">
            {buffet.courses.map((course, i) => (
              <FadeUp
                key={course.title}
                delay={i * 0.1}
                className="group rounded-2xl border border-hs-cream/[0.06] bg-hs-cream/[0.02] p-8 transition-all duration-500 hover:border-hs-gold/20 hover:bg-hs-cream/[0.05]"
              >
                <h3 className="border-b border-hs-gold/25 pb-4 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-hs-gold">
                  {course.title}
                </h3>
                <ul className="mt-5 grid gap-5">
                  {course.items.map((item) => (
                    <li key={item.name}>
                      <p className="font-display text-lg text-hs-cream/90">
                        {item.name}
                        {item.diet?.map((dt) => (
                          <span key={dt} className="diet ml-2 align-middle text-hs-gold">
                            {dt === "S" ? <Flame size={10} /> : dt}
                            <span className="sr-only">{dt === "S" ? "Spicy" : dt === "V" ? "Vegetarian" : "Vegan"}</span>
                          </span>
                        ))}
                      </p>
                      <p className="mt-1 text-[0.78rem] text-hs-cream/45">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <ReservationCTA />
    </>
  );
}
