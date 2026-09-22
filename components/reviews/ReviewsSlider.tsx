"use client";

import Image from "next/image";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { media, type Media } from "@/lib/images";
import { reviews } from "@/lib/content/reviews";

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

function ReviewCard({
  quote,
  name,
  title,
}: {
  quote: string;
  name: string;
  title?: string;
}) {
  return (
    <div
      data-panel
      className="flex h-[380px] w-[290px] shrink-0 flex-col justify-between rounded-[1.75rem] border border-black/5 bg-[#072419] p-6 text-white shadow-xl transition-transform duration-500 hover:-translate-y-1 sm:w-[310px] md:p-7"
    >
      <div>
        <QuoteIcon className="h-6 w-6 text-emerald-400/80" />
        <div className="mt-4">
          <StarRow />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-hs-cream/90 sm:text-sm">
          {quote}
        </p>
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="text-xs font-semibold tracking-wide text-white sm:text-sm">
          {name}
        </p>
        <p className="mt-0.5 text-[0.7rem] text-hs-cream/60">
          {title || "Verified Diner"}
        </p>
      </div>
    </div>
  );
}

function ImageCard({ image }: { image: Media }) {
  return (
    <div
      data-panel
      className="group relative h-[380px] w-[290px] shrink-0 overflow-hidden rounded-[1.75rem] border border-black/5 shadow-xl transition-transform duration-500 hover:-translate-y-1 sm:w-[310px]"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="310px"
        quality={80}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
      />
    </div>
  );
}

function RatingCard() {
  return (
    <div
      data-panel
      className="flex h-[380px] w-[290px] shrink-0 flex-col justify-between rounded-[1.75rem] border border-white/5 bg-[#8B3E2F] p-6 text-[#FDF8F3] shadow-xl transition-transform duration-500 hover:-translate-y-1 sm:w-[310px] md:p-7"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/80">
            Google Rating
          </span>
          <svg className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.285V14.4h6.887c-.648 2.428-2.519 4.114-5.137 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.637 0 3.125.626 4.256 1.646L21.3 4.675C19.034 2.554 15.937 1.2 12.24 1.2 6.2 1.2 1.2 6.2 1.2 12.24s5 11.04 11.04 11.04c6.31 0 11.04-4.44 11.04-11.04 0-.744-.06-1.464-.18-2.155H12.24z" />
          </svg>
        </div>
        <div className="mt-8">
          <span className="font-display text-5xl font-bold tracking-tight text-[#FDF8F3] sm:text-6xl">
            4.5
          </span>
          <div className="mt-4">
            <StarRow />
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 pt-4">
        <p className="text-xs font-medium tracking-wide text-white/90">
          Based on 567 reviews
        </p>
        <p className="mt-1 text-[0.68rem] text-white/70">
          Bunbury&apos;s Top Indian Restaurant
        </p>
      </div>
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
          className="flex h-[380px] w-[82vw] shrink-0 flex-col justify-center pr-6 sm:w-[48vw] lg:w-[24vw] lg:pr-8"
        >
          <p className="eyebrow mb-3">Guest voices</p>
          <h2 id="reviews-title" className="font-display text-h2 text-hs-green">
            What Our Guests <em className="italic text-hs-gold-deep">Say</em>
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-hs-text/75">
            Every dish carries a story of heritage, passion, and uncompromising quality — as told by our valued diners.
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-hs-gold-deep">
            <span className="h-px w-8 bg-hs-gold-deep" />
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* 1. Food Image Card */}
        <ImageCard image={media.heroDish2} />

        {/* 2. Review Card */}
        <ReviewCard
          quote={reviews[0].quote}
          name={reviews[0].name}
          title={reviews[0].title}
        />

        {/* 3. Rating Card */}
        <RatingCard />

        {/* 4. Review Card */}
        <ReviewCard
          quote={reviews[1].quote}
          name={reviews[1].name}
          title={reviews[1].title}
        />

        {/* 5. Food Image Card */}
        <ImageCard image={media.foodSizzler} />

        {/* 6. Review Card */}
        <ReviewCard
          quote={reviews[2].quote}
          name={reviews[2].name}
          title={reviews[2].title}
        />

        {/* 7. Review Card */}
        <ReviewCard
          quote={reviews[3].quote}
          name={reviews[3].name}
          title={reviews[3].title}
        />

        {/* 8. Food Image Card */}
        <ImageCard image={media.heroDish1} />

        {/* 9. Review Card */}
        <ReviewCard
          quote={reviews[4].quote}
          name={reviews[4].name}
          title={reviews[4].title}
        />

        {/* 10. Review Card */}
        <ReviewCard
          quote={reviews[5].quote}
          name={reviews[5].name}
          title={reviews[5].title}
        />

        <div aria-hidden className="w-[4vw] shrink-0" />
      </HorizontalScroll>
    </div>
  );
}
