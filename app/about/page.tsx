import type { Metadata } from "next";
import Image from "next/image";
import { AboutHero } from "@/components/about/AboutHero";
import { TeamShowcase } from "@/components/about/TeamShowcase";
import { ChefStory } from "@/components/chef/ChefStory";
import { ClipReveal, FadeUp, ImageReveal, TextReveal } from "@/components/motion/Reveal";
import { ReservationCTA } from "@/components/sections/ReservationCTA";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  aboutMilestones,
  mission,
  partner,
  recognitionAwards,
  team,
  values,
} from "@/lib/content/story";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { accolade, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us | High Spirits — Authentic Indian Fine Dining in Bunbury",
  description:
    "At High Spirits, where tradition meets luxury in every bite. Discover our mission, core values, culinary team, and legacy of excellence in Bunbury, WA.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      {/* ─── 1. HERO: Interactive & Engaging About Us ─── */}
      <AboutHero />

      {/* ─── 2. OUR MISSION ─── */}
      <section
        aria-labelledby="mission-title"
        className="surface-light bg-hs-cream py-24 text-hs-text md:py-36"
      >
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-hs-gold-deep" />
              <FadeUp as="p" className="eyebrow text-hs-gold-deep">
                Our Mission
              </FadeUp>
            </div>
            <TextReveal
              as="h2"
              id="mission-title"
              className="font-display mt-6 text-h2 text-hs-green"
              lines={["The Soul of India,", <em key="e" className="text-hs-gold-deep italic">in Bunbury.</em>]}
            />
            <div className="mt-8 hidden lg:block">
              <span className="block h-px w-20 bg-hs-gold-deep/30" />
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-hs-muted">
                Fine Dining · Authentic Recipes · Elevated Moments
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 lg:pl-6">
            <FadeUp
              as="p"
              className="text-lead text-hs-text/90 first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-hs-green"
            >
              {mission[0]}
            </FadeUp>

            <FadeUp as="p" delay={0.12} className="mt-8 leading-relaxed text-hs-muted text-base md:text-lg">
              {mission[1]}
            </FadeUp>

            <FadeUp
              as="blockquote"
              delay={0.2}
              className="font-display mt-12 rounded-2xl border-l-4 border-hs-gold-deep bg-hs-sand/40 p-6 md:p-8 text-[clamp(1.35rem,2.2vw,1.9rem)] italic leading-snug text-hs-green"
            >
              “Every dish carries a story of heritage, passion, and uncompromising quality, designed to be savoured slowly and remembered fondly.”
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── 3. OUR PHILOSOPHY — CORE VALUES ─── */}
      <section
        aria-labelledby="values-title"
        className="grain relative overflow-hidden bg-hs-green-dark py-24 md:py-36 text-white"
      >
        <Aurora />
        <div className="shell relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <FadeUp as="p" className="eyebrow justify-center text-hs-gold">
              Our Philosophy
            </FadeUp>
            <FadeUp as="h2" id="values-title" className="font-display mt-4 text-h2">
              Core <em className="text-gold-gradient">Values</em>
            </FadeUp>
            <FadeUp as="p" delay={0.1} className="mt-4 text-sm leading-relaxed text-hs-cream/70 md:text-base">
              Four foundational commitments guiding every plate and every guest interaction at High Spirits.
            </FadeUp>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#082218]/90 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-hs-gold/50">
                  {/* Glowing background sheen on hover */}
                  <div className="pointer-events-none absolute -inset-1 bg-gradient-to-br from-hs-gold/15 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-semibold text-hs-gold">
                        0{i + 1}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-hs-gold/40 transition-transform duration-300 group-hover:scale-150 group-hover:bg-hs-gold" />
                    </div>

                    <h3 className="font-display mt-8 text-3xl font-bold text-hs-cream transition-colors duration-300 group-hover:text-hs-gold-pale">
                      {v.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-hs-cream/75 transition-colors duration-300 group-hover:text-hs-cream/90">
                      {v.body}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 pt-4 border-t border-white/10">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-hs-gold-soft">
                      High Spirits Standard
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. THE TEAM: 3D Curved Carousel Showcase ─── */}
      <TeamShowcase />

      {/* ─── 5. FROM PUNJAB TO AUSTRALIA — CHEF ISHPREET BEDI ─── */}
      <section
        aria-labelledby="partner-title"
        className="bg-hs-green py-24 text-white md:py-36"
      >
        <div className="shell grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <ClipReveal
              className="relative aspect-[3/4] max-w-md overflow-hidden rounded-[2.5rem] ring-1 ring-hs-gold/20"
              data-cursor="View"
            >
              <Image
                src={partner.portrait.src}
                alt={partner.portrait.alt}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-hs-green-deep/70 via-transparent to-transparent"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-hs-green-deep/80 p-4 backdrop-blur-md">
                <p className="font-display text-lg font-bold text-hs-cream">Chef Ishpreet Bedi</p>
                <p className="text-xs uppercase tracking-[0.2em] text-hs-gold">Business Partner &amp; Co-Founder</p>
              </div>
            </ClipReveal>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-hs-gold" />
              <FadeUp as="p" className="eyebrow text-hs-gold">
                Meet Our Business Partner
              </FadeUp>
            </div>

            <TextReveal
              as="h2"
              id="partner-title"
              className="font-display mt-6 text-h2"
              lines={["Chef Ishpreet", <em key="e" className="text-gold-gradient italic">Bedi</em>]}
            />

            <FadeUp as="p" delay={0.1} className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-hs-gold-soft">
              {partner.role} · {partner.eyebrow}
            </FadeUp>

            <FadeUp as="p" delay={0.15} className="mt-8 text-lead leading-relaxed text-hs-cream/90">
              {partner.bio}
            </FadeUp>

            <FadeUp as="p" delay={0.22} className="mt-6 leading-relaxed text-hs-cream/75 text-base md:text-lg">
              Her presence, eye for detail, and genuine devotion to the art of making people&apos;s lives happier play an important part in creating the image of{" "}
              <strong className="font-semibold text-hs-gold-pale">High Spirits</strong> as a classy restaurant and bar where one can enjoy the real taste of Indian fine dining in{" "}
              <strong className="font-semibold text-hs-gold-pale">Bunbury, WA</strong>. Moreover, it helps the restaurant gain the fine dining standard in Australia through care, consistency, and warm-hearted hospitality.
            </FadeUp>

            <FadeUp delay={0.3} className="mt-8 flex flex-wrap gap-2.5">
              {partner.highlights.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-hs-gold/30 bg-hs-gold/10 px-4 py-1.5 text-xs font-medium text-hs-gold-pale backdrop-blur-sm"
                >
                  ✦ {tag}
                </span>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── 6. EXECUTIVE CHEF STORY ─── */}
      <ChefStory cta={false} />

      {/* ─── 7. OUR JOURNEY: Milestones & Achievements ─── */}
      <section
        aria-labelledby="journey-section-title"
        className="grain relative overflow-hidden bg-[#041710] py-24 text-white md:py-36"
      >
        <Aurora />
        <div className="shell relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-hs-gold">
              <span className="h-px w-6 bg-hs-gold/60" />
              <span>Our Journey</span>
              <span className="h-px w-6 bg-hs-gold/60" />
            </div>

            <FadeUp as="h2" id="journey-section-title" className="font-display mt-4 text-h2 text-white">
              Milestones <em className="italic text-gold-gradient">&amp;</em> Achievements
            </FadeUp>

            <FadeUp as="p" delay={0.1} className="mt-4 text-sm leading-relaxed text-hs-cream/70 md:text-base">
              From our founding vision to becoming Australia&apos;s celebrated benchmark for luxury Indian gastronomy.
            </FadeUp>
          </div>

          {/* Timeline Grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {aboutMilestones.map((m, idx) => (
              <FadeUp key={m.year} delay={idx * 0.1}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#082218]/85 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-hs-gold/50">
                  {/* Subtle hover backlight */}
                  <div className="pointer-events-none absolute -inset-1 bg-gradient-to-b from-hs-gold/15 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl font-bold tracking-tight text-hs-gold">
                        {m.year}
                      </span>
                      <span className="rounded-full border border-hs-gold/30 bg-hs-gold/10 px-2.5 py-0.5 text-[10px] font-semibold text-hs-gold-pale">
                        Step 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-display mt-6 text-xl font-bold text-hs-cream group-hover:text-hs-gold-pale transition-colors duration-300">
                      {m.title}
                    </h3>

                    <p className="mt-3 text-xs leading-relaxed text-hs-cream/75 group-hover:text-hs-cream/90 transition-colors duration-300">
                      {m.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="h-1 w-8 bg-hs-gold/40 group-hover:w-16 transition-all duration-500 group-hover:bg-hs-gold" />
                    <span className="text-[10px] uppercase tracking-wider text-hs-cream/50">Milestone</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. RECOGNITION: Awards & Accolades ─── */}
      <section
        aria-labelledby="awards-section-title"
        className="surface-light bg-hs-cream py-24 text-hs-text md:py-36"
      >
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-hs-gold-deep">
              <span className="h-px w-6 bg-hs-gold-deep/60" />
              <span>Recognition</span>
              <span className="h-px w-6 bg-hs-gold-deep/60" />
            </div>

            <FadeUp as="h2" id="awards-section-title" className="font-display mt-4 text-h2 text-hs-green">
              Awards <em className="italic text-hs-gold-deep">&amp;</em> Accolades
            </FadeUp>

            <FadeUp as="p" delay={0.1} className="mt-4 text-sm leading-relaxed text-hs-muted md:text-base">
              Honoured by industry critics and cherished by our wonderful diners across Western Australia.
            </FadeUp>
          </div>

          {/* 3 Prominent Stat Cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recognitionAwards.map((item, idx) => (
              <FadeUp key={item.title} delay={idx * 0.12}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-black/5 bg-white p-8 transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-hs-sand/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-hs-gold-deep">
                      {item.badge}
                    </span>
                    <span className="font-display text-2xl text-hs-gold-deep">✦</span>
                  </div>

                  <div className="my-6">
                    <p className="font-display text-4xl font-bold tracking-tight text-hs-green sm:text-5xl">
                      {item.metric}
                    </p>
                    <h3 className="font-display mt-3 text-xl font-bold text-hs-green">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-hs-muted">
                      {item.description}
                    </p>
                  </div>

                  <div className="h-1 w-12 bg-hs-gold-deep/30 group-hover:w-full group-hover:bg-hs-gold-deep transition-all duration-500" />
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Official AGFG 2026 Readers' Choice Banner */}
          <FadeUp
            delay={0.3}
            className="glass-light glass-spot mt-12 flex flex-col gap-8 rounded-[2.5rem] border border-black/5 bg-white/90 p-8 sm:flex-row sm:items-center md:p-12"
          >
            <div className="relative flex h-28 w-44 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
              <Image
                src={accolade.badge}
                alt="Australian Good Food Guide Readers' Choice Winner 2026 badge"
                width={200}
                height={120}
                className="h-auto w-36 object-contain"
              />
            </div>

            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Verified Credential
              </span>
              <h3 className="font-display mt-2 text-2xl font-bold text-hs-green sm:text-3xl">
                {accolade.title}
              </h3>
              <p className="mt-1 text-sm text-hs-muted">{accolade.body}</p>
              <p className="mt-3 text-xs leading-relaxed text-hs-text/75 sm:text-sm">
                Voted by the guests we proudly cook for, acknowledging High Spirits as Bunbury&apos;s leading destination for authentic Punjabi and Indian fine dining.
              </p>
            </div>

            <ButtonLink
              href={site.listings.agfg}
              external
              variant="outline-dark"
              className="shrink-0"
            >
              View on AGFG
            </ButtonLink>
          </FadeUp>
        </div>
      </section>

      {/* ─── 9. RESERVATION CTA ─── */}
      <ReservationCTA />
    </>
  );
}
