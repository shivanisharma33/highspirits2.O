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
        <div className="pb-10 sm:pb-16 border-b border-hs-cream/10">
          <FadeUp className="max-w-3xl">
            <p className="eyebrow mb-4 sm:mb-6">
              Victoria Street, Bunbury
            </p>

            <h2
              id="footer-title"
              className="font-display text-[clamp(1.85rem,4vw,3.8rem)] leading-[1.08] sm:leading-[1.05] tracking-tight text-hs-cream"
            >
              Come for the flavours.
              <br />
              <em className="text-gold-gradient italic font-normal">Stay for the experience.</em>
            </h2>

            <p className="mt-3.5 sm:mt-5 text-sm sm:text-lg leading-relaxed text-hs-cream/80">
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
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-105">
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
                  <span>Online Reservations</span>
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
            </div>
          </FadeUp>

          {/* Socials & Portals */}
          <FadeUp delay={0.15} className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-hs-gold mb-5">
              Connect &amp; Portals
            </h4>

            <div className="grid gap-2.5">
              {/* Instagram Card */}
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-xl border border-hs-gold/15 bg-white/[0.02] p-3 text-xs sm:text-sm text-hs-cream transition-all duration-300 hover:border-hs-gold/50 hover:bg-hs-gold/[0.06] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(212,175,55,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-hs-gold/10 border border-hs-gold/25 text-hs-gold transition-all duration-300 group-hover:bg-hs-gold group-hover:text-hs-green-deep group-hover:scale-105">
                    <Instagram size={17} />
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold text-hs-cream text-xs sm:text-sm group-hover:text-hs-gold transition-colors">
                      Instagram
                    </span>
                    <span className="block text-[10px] text-hs-cream/50 group-hover:text-hs-cream/80 transition-colors">
                      Photos &amp; Stories
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-hs-gold/20 bg-hs-gold/5 px-2.5 py-1 text-[11px] text-hs-cream/70 transition-all duration-300 group-hover:border-hs-gold/50 group-hover:bg-hs-gold/15 group-hover:text-hs-gold">
                  <span>@highspirits5</span>
                  <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>

              {/* Facebook Card */}
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-xl border border-hs-gold/15 bg-white/[0.02] p-3 text-xs sm:text-sm text-hs-cream transition-all duration-300 hover:border-hs-gold/50 hover:bg-hs-gold/[0.06] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(212,175,55,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-hs-gold/10 border border-hs-gold/25 text-hs-gold transition-all duration-300 group-hover:bg-hs-gold group-hover:text-hs-green-deep group-hover:scale-105">
                    <Facebook size={17} />
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold text-hs-cream text-xs sm:text-sm group-hover:text-hs-gold transition-colors">
                      Facebook
                    </span>
                    <span className="block text-[10px] text-hs-cream/50 group-hover:text-hs-cream/80 transition-colors">
                      Events &amp; Community
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-hs-gold/20 bg-hs-gold/5 px-2.5 py-1 text-[11px] text-hs-cream/70 transition-all duration-300 group-hover:border-hs-gold/50 group-hover:bg-hs-gold/15 group-hover:text-hs-gold">
                  <span>Follow Us</span>
                  <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>

              {/* Tripadvisor Card */}
              <a
                href={site.listings.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-xl border border-hs-gold/15 bg-white/[0.02] p-3 text-xs sm:text-sm text-hs-cream transition-all duration-300 hover:border-hs-gold/50 hover:bg-hs-gold/[0.06] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(212,175,55,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-hs-gold/10 border border-hs-gold/25 text-hs-gold transition-all duration-300 group-hover:bg-hs-gold group-hover:text-hs-green-deep group-hover:scale-105">
                    <span className="text-sm font-black">★</span>
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold text-hs-cream text-xs sm:text-sm group-hover:text-hs-gold transition-colors">
                      Tripadvisor
                    </span>
                    <span className="block text-[10px] text-hs-gold/80 font-medium group-hover:text-hs-gold transition-colors">
                      ★★★★★ Top Rated
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-hs-gold/20 bg-hs-gold/5 px-2.5 py-1 text-[11px] text-hs-cream/70 transition-all duration-300 group-hover:border-hs-gold/50 group-hover:bg-hs-gold/15 group-hover:text-hs-gold">
                  <span>Reviews</span>
                  <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>

              {/* Uber Eats Card */}
              <a
                href={site.listings.uberEats}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-xl border border-hs-gold/15 bg-white/[0.02] p-3 text-xs sm:text-sm text-hs-cream transition-all duration-300 hover:border-hs-gold/50 hover:bg-hs-gold/[0.06] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(212,175,55,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-hs-gold/10 border border-hs-gold/25 text-hs-gold transition-all duration-300 group-hover:bg-hs-gold group-hover:text-hs-green-deep group-hover:scale-105">
                    <span className="font-black text-[10px] tracking-tight">UE</span>
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold text-hs-cream text-xs sm:text-sm group-hover:text-hs-gold transition-colors">
                      Uber Eats
                    </span>
                    <span className="block text-[10px] text-hs-cream/50 group-hover:text-hs-cream/80 transition-colors">
                      Order Delivery &amp; Pickup
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-hs-gold/20 bg-hs-gold/5 px-2.5 py-1 text-[11px] text-hs-cream/70 transition-all duration-300 group-hover:border-hs-gold/50 group-hover:bg-hs-gold/15 group-hover:text-hs-gold">
                  <span>Order Now</span>
                  <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
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
              onClick={() => scrollToTop()}
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
