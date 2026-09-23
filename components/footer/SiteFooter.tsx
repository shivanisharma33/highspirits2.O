"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import {
  ArrowUp,
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "@/components/ui/Icons";
import { hours, legalNav, primaryNav, site } from "@/lib/site";
import { scrollToTop } from "@/lib/lenis";

const listLink =
  "group inline-flex items-center gap-1.5 text-hs-cream/70 transition-all duration-300 hover:text-hs-gold hover:translate-x-1";

export function SiteFooter() {
  const year = new Date().getFullYear();




  return (
    <footer
      className="grain relative overflow-hidden bg-hs-green-deep text-hs-cream border-t border-hs-gold/20"
      aria-labelledby="footer-title"
    >
      <Aurora />

      {/* Atmospheric ambient lighting & radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[80vw] -translate-x-1/2 rounded-[50%] bg-hs-green-light/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-20 right-10 h-72 w-72 rounded-full bg-hs-gold/8 blur-[120px]"
      />

      <div className="shell relative z-10 pt-12 sm:pt-16 pb-12">
        {/* =========================================================================
            Invitation Headline & Direct Actions
            ========================================================================= */}
        <div className="pb-16 border-b border-hs-cream/10">
          <FadeUp className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-hs-gold/30 bg-hs-gold/10 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-hs-gold mb-6 shadow-sm shadow-hs-gold/10">
              <Image
                src="/logo-mark.png"
                alt=""
                width={16}
                height={28}
                className="h-3.5 w-auto object-contain"
              />
              <span>Victoria Street, Bunbury</span>
            </div>

            <h2
              id="footer-title"
              className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05] tracking-tight text-hs-cream"
            >
              Come for the flavours.
              <br />
              <em className="text-gold-gradient italic font-normal">Stay for the experience.</em>
            </h2>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-hs-cream/80">
              Experience the soul of Punjab through time-honoured tandoor recipes, authentic gravies, and a lavish
              daily evening buffet in the heart of Bunbury.
            </p>
          </FadeUp>
        </div>

        {/* =========================================================================
            Navigation & Experience Hub
            ========================================================================= */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 pt-14 pb-16">
          {/* Brand Col */}
          <FadeUp className="lg:col-span-4">
            <Link href="/" aria-label="High Spirits — Home" className="group inline-flex items-center gap-3.5 mb-2">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-hs-gold/25 via-hs-green-dark to-hs-green-deep p-2 border border-hs-gold/30 shadow-lg shadow-black/40 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/logo-mark.png"
                  alt="High Spirits Peacock Emblem"
                  width={60}
                  height={100}
                  className="h-auto w-7 object-contain transition-transform duration-700 ease-luxe group-hover:-rotate-6"
                />
              </div>
              <span className="font-display text-2xl tracking-[0.14em] text-hs-cream font-bold group-hover:text-hs-gold transition-colors leading-none">
                HIGH SPIRITS
              </span>
            </Link>

            <p className="text-xs tracking-[0.2em] text-hs-gold/90 uppercase mt-2">
              Taste the Spirit of Punjab
            </p>

            <p className="mt-4 text-sm leading-relaxed text-hs-cream/70 max-w-sm">
              Bunbury’s premier destination for elevated Indian dining, authentic tandoori specialities, and memorable
              celebrations.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 text-sm text-hs-cream/80">
              <a
                href={site.phone.href}
                className="inline-flex items-center gap-2.5 text-hs-cream hover:text-hs-gold transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-hs-gold/15 text-hs-gold">
                  <Phone size={14} />
                </div>
                <span>{site.phone.display}</span>
              </a>

              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 text-hs-cream hover:text-hs-gold transition-colors break-all"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-hs-gold/15 text-hs-gold">
                  <Mail size={14} />
                </div>
                <span>{site.email}</span>
              </a>

              <a
                href={site.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-hs-cream hover:text-hs-gold transition-colors group"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-hs-gold/15 text-hs-gold">
                  <MapPin size={14} />
                </div>
                <span>1/57 Victoria St, Bunbury WA</span>
                <ArrowUpRight size={13} className="text-hs-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </FadeUp>

          {/* Explore Links */}
          <FadeUp delay={0.05} className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-hs-gold mb-5">
              Explore &amp; Discover
            </h4>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={listLink}>
                    <span className="text-hs-gold/50 group-hover:text-hs-gold transition-colors">›</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/reservation" className={listLink}>
                  <span className="text-hs-gold/50 group-hover:text-hs-gold transition-colors">›</span>
                  <span className="font-semibold text-hs-gold">Online Reservations</span>
                </Link>
              </li>
            </ul>
          </FadeUp>

          {/* Hours & Service */}
          <FadeUp delay={0.1} className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-hs-gold mb-5">
              Dining Hours
            </h4>
            <div className="space-y-4 text-xs sm:text-sm text-hs-cream/75">
              {hours.map((h) => (
                <div key={h.label} className="border-l-2 border-hs-gold/40 pl-3">
                  <span className="block font-semibold text-hs-cream">{h.label}</span>
                  <span className="text-xs text-hs-gold-pale block">{h.days}</span>
                  <span className="text-xs text-hs-cream/80">{h.time}</span>
                </div>
              ))}
              <div className="border-l-2 border-hs-gold/40 pl-3">
                <span className="block font-semibold text-hs-cream">Dinner Buffet</span>
                <span className="text-xs text-hs-gold-pale block">Mon – Sun from 5:00 PM</span>
                <span className="text-xs text-hs-cream/80">$39.99 Per Person</span>
              </div>
            </div>
          </FadeUp>

          {/* Socials & Portals */}
          <FadeUp delay={0.15} className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-hs-gold mb-5">
              Connect &amp; Portals
            </h4>
            <div className="grid gap-2.5">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-hs-cream/10 bg-white/[0.02] p-3 text-xs sm:text-sm text-hs-cream/80 transition-all duration-300 hover:border-hs-gold/40 hover:bg-hs-gold/10 hover:text-hs-gold group"
              >
                <div className="flex items-center gap-2.5">
                  <Instagram size={16} className="text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </div>
                <span className="text-[0.7rem] text-hs-cream/50 group-hover:text-hs-gold flex items-center gap-0.5">
                  @highspirits5 <ArrowUpRight size={12} />
                </span>
              </a>

              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-hs-cream/10 bg-white/[0.02] p-3 text-xs sm:text-sm text-hs-cream/80 transition-all duration-300 hover:border-hs-gold/40 hover:bg-hs-gold/10 hover:text-hs-gold group"
              >
                <div className="flex items-center gap-2.5">
                  <Facebook size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>Facebook</span>
                </div>
                <span className="text-[0.7rem] text-hs-cream/50 group-hover:text-hs-gold flex items-center gap-0.5">
                  Follow Us <ArrowUpRight size={12} />
                </span>
              </a>

              <a
                href={site.listings.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-hs-cream/10 bg-white/[0.02] p-3 text-xs sm:text-sm text-hs-cream/80 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:text-emerald-300 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    ★
                  </div>
                  <span>Tripadvisor</span>
                </div>
                <span className="text-[0.7rem] text-emerald-400/80 group-hover:text-emerald-300 flex items-center gap-0.5">
                  Reviews <ArrowUpRight size={12} />
                </span>
              </a>

              <a
                href={site.listings.uberEats}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-hs-cream/10 bg-white/[0.02] p-3 text-xs sm:text-sm text-hs-cream/80 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:text-emerald-300 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded-md bg-emerald-400 text-black flex items-center justify-center font-black text-[9px]">
                    UE
                  </div>
                  <span>Uber Eats</span>
                </div>
                <span className="text-[0.7rem] text-emerald-400/80 group-hover:text-emerald-300 flex items-center gap-0.5">
                  Order Delivery <ArrowUpRight size={12} />
                </span>
              </a>
            </div>
          </FadeUp>
        </div>

        {/* =========================================================================
            LAYER 4: Grand Watermark Branding
            ========================================================================= */}
        <div className="relative pt-6 pb-2 overflow-hidden select-none pointer-events-none text-center">
          <div className="font-display font-black text-[clamp(2.5rem,10vw,8.5rem)] tracking-[0.08em] leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] to-transparent">
            HIGH SPIRITS
          </div>
        </div>

        {/* =========================================================================
            LAYER 5: Legal Navigation, Back to Top & Copyright
            ========================================================================= */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-hs-cream/10 pt-8 text-xs tracking-[0.1em] text-hs-cream/60 sm:flex-row">
          <p>© {year} High Spirits Indian Restaurant. All rights reserved.</p>

          <ul className="flex items-center gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line hover:text-hs-cream transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.listings.google}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line hover:text-hs-cream transition-colors"
              >
                Google Reviews
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <span className="text-hs-cream/45">Bunbury, WA</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-hs-gold/30 bg-hs-gold/10 px-3.5 py-1.5 text-[0.7rem] font-semibold text-hs-gold transition-all duration-300 hover:border-hs-gold hover:bg-hs-gold hover:text-hs-green-deep active:scale-95 cursor-pointer"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
