"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FadeUp } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Facebook,
  Feather,
  Instagram,
  Mail,
  MapPin,
  Phone,
  WhatsApp,
} from "@/components/ui/Icons";
import { hours, legalNav, primaryNav, site } from "@/lib/site";

const listLink =
  "group inline-flex items-center gap-1.5 text-hs-cream/70 transition-all duration-300 hover:text-hs-gold hover:translate-x-1";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

      <div className="shell relative z-10 pt-20 sm:pt-28 pb-12">
        {/* =========================================================================
            LAYER 1: Invitation Headline + VIP Circle Newsletter
            ========================================================================= */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center pb-16 border-b border-hs-cream/10">
          <FadeUp className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-hs-gold/30 bg-hs-gold/10 px-4 py-1 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-hs-gold mb-6 shadow-sm shadow-hs-gold/10">
              <span className="h-1.5 w-1.5 rounded-full bg-hs-gold animate-pulse" />
              Victoria Street, Bunbury
            </div>

            <h2
              id="footer-title"
              className="font-display text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05] tracking-tight text-hs-cream"
            >
              Come for the flavours.
              <br />
              <em className="text-gold-gradient italic font-normal">Stay for the experience.</em>
            </h2>

            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-hs-cream/80">
              Experience the soul of Punjab through time-honoured tandoor recipes, authentic gravies, and a lavish
              daily evening buffet in the heart of Bunbury.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/reservation" variant="gold" className="shadow-lg shadow-hs-gold/20">
                Reserve a Table
              </ButtonLink>
              <ButtonLink href="/menu" variant="ghost">
                Explore Menu
              </ButtonLink>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost inline-flex items-center gap-2 border border-emerald-500/30 text-emerald-300 hover:border-emerald-400 hover:text-emerald-200 hover:bg-emerald-950/40"
              >
                <WhatsApp size={16} className="text-emerald-400" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </FadeUp>

          {/* Interactive VIP High Spirits Circle Card */}
          <FadeUp delay={0.1} className="lg:col-span-5">
            <div className="rounded-3xl border border-hs-gold/30 bg-gradient-to-b from-hs-green-dark/80 to-hs-green-deep/90 p-7 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/50 relative overflow-hidden group">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-hs-gold/15 blur-2xl transition-all duration-700 group-hover:scale-125"
              />

              <div className="flex items-center gap-2 text-hs-gold text-xs font-semibold uppercase tracking-[0.2em]">
                <Feather size={16} className="text-hs-gold" />
                <span>High Spirits Circle</span>
              </div>

              <h3 className="font-display mt-3 text-2xl text-hs-cream leading-snug">
                Exclusive Chef’s Table &amp; <span className="text-gold-gradient">Seasonal Tasting Invites</span>
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-hs-cream/70 leading-relaxed">
                Join our private guest list for secret seasonal menu previews, festival banquets, and reserved tasting
                invitations.
              </p>

              {subscribed ? (
                <div className="mt-6 rounded-2xl border border-hs-gold/40 bg-hs-gold/15 p-5 text-center transition-all animate-in fade-in zoom-in duration-300">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-hs-gold text-hs-green-deep font-bold">
                    ✓
                  </div>
                  <p className="font-display text-lg text-hs-gold">Welcome to the Circle</p>
                  <p className="mt-1 text-xs text-hs-cream/80">
                    You are confirmed on our VIP guest list. Expect curated culinary invitations directly to your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for VIP access"
                      className="h-12 w-full rounded-full border border-hs-gold/30 bg-black/40 px-5 text-xs sm:text-sm text-hs-cream placeholder:text-hs-cream/45 backdrop-blur-sm transition-all focus:border-hs-gold focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-hs-gold/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-hs-gold via-amber-400 to-hs-gold px-6 text-xs font-bold uppercase tracking-[0.18em] text-[#03150D] shadow-lg shadow-hs-gold/25 transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  >
                    <span>Request VIP Membership</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-[0.68rem] text-hs-cream/50">
                    Complimentary privilege. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </FadeUp>
        </div>

        {/* =========================================================================
            Navigation & Experience Hub
            ========================================================================= */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 pt-14 pb-16">
          {/* Brand Col */}
          <FadeUp className="lg:col-span-4">
            <h3 className="font-display text-2xl tracking-tight text-hs-cream font-bold">
              HIGH SPIRITS
            </h3>
            <p className="text-xs tracking-[0.2em] text-hs-gold uppercase mt-1">
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
