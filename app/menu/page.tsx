import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { FadeUp, IntroLines, TextReveal } from "@/components/motion/Reveal";
import { ReservationCTA } from "@/components/sections/ReservationCTA";
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
      offers: { "@type": "Offer", price: i.price.toFixed(2), priceCurrency: "AUD" },
      ...(i.diet?.includes("VG") ? { suitableForDiet: "https://schema.org/VeganDiet" } : i.diet?.includes("V") ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
    })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <JsonLd data={menuJsonLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Menu", path: "/menu" }])} />

      {/* Hero — typographic masthead with a single plated image */}
      <section aria-labelledby="menu-title" className="grain relative overflow-hidden bg-hs-green-deep pb-20 pt-[calc(var(--header-h)+5rem)] md:pb-28">
        <div className="shell grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow intro-rise" style={d(0.1)}>
              À la carte · Buffet · Breads
            </p>
            <IntroLines as="h1" id="menu-title" className="font-display mt-8 text-display" lines={["The", <em key="m" className="text-gold-gradient">Menu</em>]} start={0.2} />
            <p className="intro-rise mt-10 max-w-lg text-lead text-hs-cream/75" style={d(0.6)}>
              Punjabi roots, premium plates. {menuItemCount} dishes from the tandoor, the stove and the clay oven — plus a nightly buffet from {buffet.starts}.
            </p>
          </div>
          <div className="relative lg:col-span-5">
            <div className="intro-rise relative aspect-[4/5] overflow-hidden" style={d(0.4)}>
              <Image src={media.heroDish2.src} alt={media.heroDish2.alt} fill preload sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" className="intro-media object-cover" />
            </div>
            <div className="glass glass-edge intro-rise absolute -bottom-8 -left-4 max-w-[16rem] rounded-[1.5rem] p-6 md:-left-12" style={d(0.8)}>
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-hs-gold">Dietary key</p>
              <ul className="mt-4 grid gap-2 text-sm text-hs-cream/85">
                <li className="flex items-center gap-3">
                  <span className="diet text-hs-gold-pale">V</span> Vegetarian
                </li>
                <li className="flex items-center gap-3">
                  <span className="diet text-hs-gold-pale">VG</span> Vegan
                </li>
                <li className="flex items-center gap-3">
                  <span className="diet text-hs-gold-soft">
                    <Flame size={11} />
                  </span>
                  Spicy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Buffet — featured block */}
      <section id="buffet" aria-labelledby="buffet-title" className="surface-light relative scroll-mt-28 overflow-hidden bg-hs-cream py-24 text-hs-text md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeUp as="p" className="eyebrow">
              Nightly from {buffet.starts}
            </FadeUp>
            <TextReveal as="h2" id="buffet-title" className="font-display mt-7 text-h2 text-hs-green" lines={["The Lavish", <em key="b">Buffet</em>]} />
            <FadeUp delay={0.15} className="mt-8 flex items-end gap-4">
              <span className="font-display text-6xl leading-none text-hs-green">{formatPrice(buffet.price)}</span>
              <span className="pb-1 text-xs uppercase tracking-[0.2em] text-hs-muted">Unlimited servings</span>
            </FadeUp>
            <FadeUp as="p" delay={0.2} className="mt-8 max-w-md leading-relaxed text-hs-muted">
              A wide spread of freshly prepared dishes with unlimited servings — perfect for families, groups and celebratory dining.
            </FadeUp>
            <FadeUp delay={0.25} className="mt-10">
              <ButtonLink href="/reservation?experience=buffet" variant="dark">
                Book the buffet
              </ButtonLink>
            </FadeUp>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {buffet.courses.map((course, i) => (
              <FadeUp key={course.title} delay={i * 0.08}>
                <h3 className="border-b border-hs-gold-deep/40 pb-4 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-hs-gold-deep">{course.title}</h3>
                <ul className="mt-5 grid gap-5">
                  {course.items.map((item) => (
                    <li key={item.name}>
                      <p className="font-display text-lg text-hs-green">
                        {item.name}
                        {item.diet?.map((dt) => (
                          <span key={dt} className="diet ml-2 align-middle text-hs-gold-deep">
                            {dt === "S" ? <Flame size={10} /> : dt}
                            <span className="sr-only">{dt === "S" ? "Spicy" : dt === "V" ? "Vegetarian" : "Vegan"}</span>
                          </span>
                        ))}
                      </p>
                      <p className="mt-1 text-sm text-hs-muted">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* À la carte */}
      <section aria-label="À la carte menu" className="relative bg-hs-green-dark pb-32 pt-20 md:pt-28">
        <div className="shell">
          <MenuBrowser />
          <p className="mt-20 max-w-2xl text-xs leading-relaxed text-hs-cream/55">
            Please inform us of any allergies or dietary restrictions when ordering. While we take every care with food preparation, our kitchen handles nuts, dairy and gluten. Prices in AUD.
          </p>
        </div>
      </section>

      <ReservationCTA />
    </>
  );
}
