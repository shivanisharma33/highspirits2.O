"use client";

import Image from "next/image";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { media } from "@/lib/images";

function QuoteIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-1" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 fill-[#E5851D]" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsSlider() {
  return (
    <div className="surface-light relative overflow-hidden bg-hs-cream py-20 lg:py-0">
      <HorizontalScroll
        label="Guest reviews"
        trackClassName="gap-5 px-[var(--gutter)] md:gap-6 lg:items-center"
        barTrackClassName="bg-black/10"
        barFillClassName="bg-hs-gold-deep"
      >
        {/* Intro / Header Panel */}
        <div
          data-panel
          className="flex w-[82vw] shrink-0 flex-col justify-center pr-6 sm:w-[50vw] lg:h-[76vh] lg:w-[26vw] lg:pr-10"
        >
          <p className="eyebrow mb-3">Guest voices</p>
          <h2 id="reviews-title" className="font-display text-h2 text-hs-green">
            What Our Guests <em className="italic text-hs-gold-deep">Say</em>
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-hs-text/75">
            Every dish carries a story of heritage, passion, and uncompromising quality — as told by our valued diners.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-hs-gold-deep">
            <span className="h-px w-8 bg-hs-gold-deep" />
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* Item 1: Full-Height Food Image Card */}
        <div
          data-panel
          className="group relative h-[520px] w-[300px] shrink-0 overflow-hidden rounded-[2rem] border border-black/5 shadow-xl md:w-[340px] lg:h-[70vh]"
        >
          <Image
            src={media.heroDish2.src}
            alt={media.heroDish2.alt}
            fill
            sizes="340px"
            quality={80}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />
        </div>

        {/* Item 2: Split Column (Top Review Card + Bottom Terracotta Rating Card) */}
        <div
          data-panel
          className="flex h-[520px] w-[290px] shrink-0 flex-col gap-4 md:w-[320px] lg:h-[70vh]"
        >
          {/* Top Dark Green Review Card */}
          <div className="flex flex-1 flex-col justify-between rounded-[1.75rem] border border-white/5 bg-[#072419] p-6 text-white shadow-xl md:p-7">
            <div>
              <QuoteIcon className="h-6 w-6 text-emerald-500/80" />
              <div className="mt-4">
                <StarRow />
              </div>
              <p className="mt-4 text-xs leading-relaxed text-hs-cream/90 sm:text-sm">
                Every dish felt like a piece of art. The flavors, the presentation, the service — perfection
              </p>
            </div>
            <p className="mt-4 text-[0.72rem] font-medium tracking-wide text-hs-cream/70">
              Farzana Rahman
            </p>
          </div>

          {/* Bottom Terracotta Rating Card */}
          <div className="flex h-[180px] shrink-0 flex-col justify-between rounded-[1.75rem] border border-white/5 bg-[#8B3E2F] p-6 text-[#FDF8F3] shadow-xl">
            <span className="font-display text-4xl font-bold tracking-tight text-[#FDF8F3] sm:text-5xl">
              4.5
            </span>
            <div>
              <StarRow />
              <p className="mt-2 text-[0.68rem] font-medium tracking-wide text-white/80">
                Based on 567 review
              </p>
            </div>
          </div>
        </div>

        {/* Item 3: Tall Full-Height Dark Green Review Card */}
        <div
          data-panel
          className="flex h-[520px] w-[310px] shrink-0 flex-col justify-between rounded-[2rem] border border-white/5 bg-[#072419] p-8 text-white shadow-xl md:w-[340px] lg:h-[70vh]"
        >
          <div>
            <QuoteIcon className="h-7 w-7 text-emerald-500/80" />
            <div className="mt-5">
              <StarRow />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-hs-cream/90 sm:text-base">
              Dining at High Spirits is more than just enjoying exquisite food — it&apos;s a journey of taste, texture, and emotion. Every plate feels like a work of art, and every moment is curated with genuine care &amp; passion
            </p>
          </div>
          <p className="mt-6 text-xs font-medium tracking-wide text-hs-cream/70">
            Nadia &amp; Arif Hasan
          </p>
        </div>

        {/* Item 4: Full-Height Food Image Card (Plated Dish) */}
        <div
          data-panel
          className="group relative h-[520px] w-[300px] shrink-0 overflow-hidden rounded-[2rem] border border-black/5 shadow-xl md:w-[340px] lg:h-[70vh]"
        >
          <Image
            src={media.foodSizzler.src}
            alt={media.foodSizzler.alt}
            fill
            sizes="340px"
            quality={80}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />
        </div>

        {/* Item 5: Split Column (Top Review Card + Bottom Terracotta Rating Card) */}
        <div
          data-panel
          className="flex h-[520px] w-[290px] shrink-0 flex-col gap-4 md:w-[320px] lg:h-[70vh]"
        >
          {/* Top Dark Green Review Card */}
          <div className="flex flex-1 flex-col justify-between rounded-[1.75rem] border border-white/5 bg-[#072419] p-6 text-white shadow-xl md:p-7">
            <div>
              <QuoteIcon className="h-6 w-6 text-emerald-500/80" />
              <div className="mt-4">
                <StarRow />
              </div>
              <p className="mt-4 text-xs leading-relaxed text-hs-cream/90 sm:text-sm">
                Every dish felt like a piece of art. The flavors, the presentation, the service — perfection
              </p>
            </div>
            <p className="mt-4 text-[0.72rem] font-medium tracking-wide text-hs-cream/70">
              Farzana Rahman
            </p>
          </div>

          {/* Bottom Terracotta Rating Card */}
          <div className="flex h-[180px] shrink-0 flex-col justify-between rounded-[1.75rem] border border-white/5 bg-[#8B3E2F] p-6 text-[#FDF8F3] shadow-xl">
            <span className="font-display text-4xl font-bold tracking-tight text-[#FDF8F3] sm:text-5xl">
              4.5
            </span>
            <div>
              <StarRow />
              <p className="mt-2 text-[0.68rem] font-medium tracking-wide text-white/80">
                Based on 567 review
              </p>
            </div>
          </div>
        </div>

        {/* Item 6: Tall Full-Height Dark Green Review Card (Frans Buissink) */}
        <div
          data-panel
          className="flex h-[520px] w-[310px] shrink-0 flex-col justify-between rounded-[2rem] border border-white/5 bg-[#072419] p-8 text-white shadow-xl md:w-[340px] lg:h-[70vh]"
        >
          <div>
            <QuoteIcon className="h-7 w-7 text-emerald-500/80" />
            <div className="mt-5">
              <StarRow />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-hs-cream/90 sm:text-base">
              Some of the best Indian food to be had in Bunbury. Definitely worth checking out. Buffet of delicious selections at the moment, with very friendly and accommodating staff.
            </p>
          </div>
          <p className="mt-6 text-xs font-medium tracking-wide text-hs-cream/70">
            Frans Buissink
          </p>
        </div>

        {/* Item 7: Full-Height Food Image Card (Plated Curry) */}
        <div
          data-panel
          className="group relative h-[520px] w-[300px] shrink-0 overflow-hidden rounded-[2rem] border border-black/5 shadow-xl md:w-[340px] lg:h-[70vh]"
        >
          <Image
            src={media.heroDish1.src}
            alt={media.heroDish1.alt}
            fill
            sizes="340px"
            quality={80}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />
        </div>

        <div aria-hidden className="w-[4vw] shrink-0" />
      </HorizontalScroll>
    </div>
  );
}
