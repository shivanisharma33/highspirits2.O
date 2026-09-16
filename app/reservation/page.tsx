import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { IntroLines } from "@/components/motion/Reveal";
import { Clock, Phone } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { media } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { hours, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Reserve a Table",
  description: "Request a table at High Spirits, Bunbury — lunch Wednesday to Friday, dinner and the evening buffet every night.",
  path: "/reservation",
});

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function perthToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Perth" }).format(new Date());
}

export default async function ReservationPage({ searchParams }: PageProps<"/reservation">) {
  const { experience } = await searchParams;
  const initialExperience = typeof experience === "string" ? experience : "";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Reservations", path: "/reservation" }])} />

      <section aria-labelledby="reserve-title" className="relative grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Left: atmosphere + essentials */}
        <div className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden px-[var(--gutter)] pb-14 pt-[calc(var(--header-h)+4rem)] lg:sticky lg:top-0 lg:h-[100svh]">
          <Image src={media.interiorLuxe.src} alt={media.interiorLuxe.alt} fill preload sizes="(min-width: 1024px) 42vw, 100vw" placeholder="blur" className="intro-media object-cover" />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-hs-green-deep via-hs-green-deep/60 to-hs-green-deep/30" />
          <div className="relative">
            <p className="eyebrow intro-rise" style={d(0.1)}>
              Reservations
            </p>
            <IntroLines as="h1" id="reserve-title" className="font-display mt-7 text-h1" lines={["Your table", <em key="e" className="text-gold-gradient">awaits.</em>]} start={0.2} />
            <div className="intro-rise mt-10 grid gap-4 text-sm text-hs-cream/85" style={d(0.55)}>
              {hours.map((h) => (
                <p key={h.label} className="flex gap-3">
                  <Clock size={16} className="mt-0.5 text-hs-gold" />
                  <span>
                    <span className="text-hs-cream">{h.label}</span> · {h.days} · {h.time}
                  </span>
                </p>
              ))}
              <p className="flex gap-3">
                <Phone size={16} className="mt-0.5 text-hs-gold" />
                <span>
                  Prefer to call?{" "}
                  <a href={site.phone.href} className="link-line text-hs-gold">
                    {site.phone.display}
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: one simple form */}
        <div className="grain relative bg-hs-green-dark px-[var(--gutter)] py-20 lg:pt-[calc(var(--header-h)+4rem)]">
          <div className="intro-rise mx-auto max-w-3xl" style={d(0.35)}>
            <p className="max-w-lg text-hs-cream/75">
              Choose a date, time and party size — we&apos;ll confirm your table personally. It takes under a minute.
            </p>
            <div className="gold-rule my-12" />
            <ReservationForm minDate={perthToday()} initialExperience={initialExperience} />
            <div className="mt-16 grid gap-3 border-t border-hs-cream/10 pt-8 text-xs leading-relaxed text-hs-cream/55">
              <p>Please arrive within 15 minutes of your reservation time; tables are held for 15 minutes.</p>
              <p>
                Cancellations must be made at least 24 hours in advance; no-shows or late cancellations may incur a fee. See our{" "}
                <Link href="/terms" className="link-line text-hs-cream/80">
                  terms
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
