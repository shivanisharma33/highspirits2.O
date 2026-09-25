"use client";

import { FadeUp, TextReveal } from "@/components/motion/Reveal";
import { reviews, googleRating, type Review } from "@/lib/content/reviews";

function QuoteIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 fill-[#E5851D]" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="group relative flex h-[255px] sm:h-[300px] w-[285px] sm:w-[370px] shrink-0 flex-col justify-between rounded-2xl sm:rounded-3xl border border-hs-gold/25 bg-[#072419] p-5 sm:p-7 text-white transition-all duration-300 hover:-translate-y-1.5 hover:border-hs-gold/60"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QuoteIcon className="h-4 sm:h-5 w-4 sm:w-5 text-hs-gold" />
            <StarRow />
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.6rem] sm:text-[0.62rem] font-mono tracking-wider text-hs-cream/70">
            <svg className="h-2.5 w-2.5 text-hs-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Verified
          </span>
        </div>

        <p className="mt-3.5 sm:mt-4 text-xs sm:text-[0.86rem] leading-relaxed text-hs-cream/90 font-sans line-clamp-4">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      <div className="border-t border-white/10 pt-3.5 sm:pt-4 flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-hs-gold transition-colors">
            {review.name}
          </p>
          <p className="mt-0.5 text-[0.65rem] sm:text-[0.68rem] text-hs-gold font-mono uppercase tracking-wider">
            {review.title || "Verified Diner"}
          </p>
        </div>

        <span className="text-[0.62rem] sm:text-[0.65rem] font-mono uppercase tracking-widest text-hs-cream/45">
          Bunbury, WA
        </span>
      </div>
    </div>
  );
}

function RatingCard() {
  return (
    <div
      className="relative flex h-[255px] sm:h-[300px] w-[275px] sm:w-[350px] shrink-0 flex-col justify-between rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-br from-[#8B3E2F] to-[#6d2f23] p-5 sm:p-7 text-[#FDF8F3] transition-all duration-300 hover:-translate-y-1.5 hover:border-hs-gold/50"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/80">
            Google Rating
          </span>
          <svg className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.24 10.285V14.4h6.887c-.648 2.428-2.519 4.114-5.137 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.637 0 3.125.626 4.256 1.646L21.3 4.675C19.034 2.554 15.937 1.2 12.24 1.2 6.2 1.2 1.2 6.2 1.2 12.24s5 11.04 11.04 11.04c6.31 0 11.04-4.44 11.04-11.04 0-.744-.06-1.464-.18-2.155H12.24z" />
          </svg>
        </div>

        <div className="mt-4 sm:mt-6">
          <span className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#FDF8F3]">
            {googleRating.value}
          </span>
          <div className="mt-2.5 sm:mt-3">
            <StarRow />
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 pt-3.5 sm:pt-4">
        <p className="text-xs font-semibold tracking-wide text-white/95">
          {googleRating.label}
        </p>
        <p className="mt-0.5 text-[0.65rem] sm:text-[0.68rem] text-white/70 uppercase tracking-wider font-mono">
          Bunbury&apos;s Top Indian Restaurant
        </p>
      </div>
    </div>
  );
}

export function ReviewsSlider() {
  // Pure reviews & Google rating spotlight cards (ZERO image cards)
  const streamItems = [
    { type: "review", data: reviews[0], id: "rev-0" },
    { type: "review", data: reviews[1], id: "rev-1" },
    { type: "rating", id: "rating-card" },
    { type: "review", data: reviews[2], id: "rev-2" },
    { type: "review", data: reviews[3], id: "rev-3" },
    { type: "review", data: reviews[4], id: "rev-4" },
    { type: "review", data: reviews[5], id: "rev-5" },
    { type: "review", data: reviews[6] || reviews[0], id: "rev-6" },
    { type: "review", data: reviews[7] || reviews[1], id: "rev-7" },
  ];

  return (
    <section
      aria-labelledby="reviews-title"
      className="surface-light grain grain-ink relative overflow-hidden bg-hs-cream py-16 md:py-24 text-hs-text"
    >
      <div className="shell relative z-10 text-center mb-10 md:mb-14">
        <FadeUp as="p" className="eyebrow justify-center mb-4">
          Guest voices
        </FadeUp>

        <TextReveal
          as="h2"
          id="reviews-title"
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-hs-green tracking-tight"
          lines={[
            "What Our Guests ",
            <em key="say" className="italic text-gold-gradient font-normal">
              Say
            </em>,
          ]}
        />

        <FadeUp
          delay={0.15}
          className="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-hs-muted"
        >
          Every dish carries a story of heritage, passion and uncompromising quality — as told by our valued diners in Bunbury, WA.
        </FadeUp>


      </div>

      {/* ── Continuous Infinite Stream (Zero Images) ── */}
      <div className="reviews-marquee-wrapper relative w-full overflow-hidden py-3 sm:py-4 select-none">
        {/* Luxury Edge Gradient Vignettes for Smooth Infinite Fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-6 sm:w-20 md:w-32 bg-gradient-to-r from-hs-cream via-hs-cream/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-6 sm:w-20 md:w-32 bg-gradient-to-l from-hs-cream via-hs-cream/80 to-transparent"
        />

        {/* Smooth Continuous Moving Track */}
        <div className="reviews-marquee-track flex gap-4 sm:gap-5 md:gap-6">
          {/* First loop pass */}
          {streamItems.map((item, idx) =>
            item.type === "rating" ? (
              <RatingCard key={`pass1-${item.id}-${idx}`} />
            ) : (
              <ReviewCard
                key={`pass1-${item.id}-${idx}`}
                review={item.data as Review}
              />
            )
          )}

          {/* Second duplicate pass for seamless 100% loop */}
          {streamItems.map((item, idx) =>
            item.type === "rating" ? (
              <RatingCard key={`pass2-${item.id}-${idx}`} />
            ) : (
              <ReviewCard
                key={`pass2-${item.id}-${idx}`}
                review={item.data as Review}
              />
            )
          )}
        </div>
      </div>

      {/* Scoped seamless continuous marquee animation styling */}
      <style jsx>{`
        @keyframes reviewsContinuousMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .reviews-marquee-track {
          display: flex;
          width: max-content;
          animation: reviewsContinuousMarquee 42s linear infinite;
          will-change: transform;
        }
        .reviews-marquee-wrapper:hover .reviews-marquee-track,
        .reviews-marquee-wrapper:active .reviews-marquee-track,
        .reviews-marquee-track:hover,
        .reviews-marquee-track:active {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .reviews-marquee-track {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
