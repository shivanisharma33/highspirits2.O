"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { Aurora } from "@/components/ui/Aurora";
import { ArrowLeft, ArrowRight, Pause, Play, Star } from "@/components/ui/Icons";
import { googleRating, reviews } from "@/lib/content/reviews";
import { cx, formatDate, initials } from "@/lib/format";
import { site } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");
const AUTOPLAY_MS = 7000;

function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-1 text-hs-gold" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={13} />
      ))}
    </span>
  );
}

/**
 * Large-quote testimonials: a glass carousel on desktop that advances on its
 * own while in view (paused on hover, focus, or with the pause button), and a
 * drag/swipe row on mobile.
 */
export function ReviewsSlider() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [inView, setInView] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const running = inView && !held && !stopped;
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + reviews.length) % reviews.length);

  useEffect(() => {
    const el = region.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % reviews.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, running]);

  return (
    <section aria-labelledby="reviews-title" className="grain relative overflow-hidden bg-hs-green py-28 md:py-40">
      <Aurora />
      <div aria-hidden className="font-display pointer-events-none absolute -left-6 -top-24 text-[34rem] leading-none text-hs-green-light/60 select-none">
        “
      </div>

      <div className="shell relative grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <p data-reveal="fade-up" className="eyebrow mb-7">
            Guest voices
          </p>
          <h2 id="reviews-title" data-reveal="fade-up" className="font-display text-h2">
            Said at <em className="text-gold-gradient">our table.</em>
          </h2>

          <div data-reveal="fade-up" className="glass glass-edge mt-12 flex items-center gap-5 rounded-[1.5rem] px-6 py-5">
            <CountUp value={googleRating.value} className="font-display text-6xl leading-none text-hs-gold" />
            <span className="grid gap-2">
              <Stars count={5} />
              <span className="text-[0.65rem] uppercase tracking-[0.24em] text-hs-cream/70">{googleRating.label}</span>
            </span>
          </div>
          <div data-reveal="fade-up" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-hs-cream/70">
            <a className="link-line hover:text-hs-cream" href="https://www.google.com/search?q=High+Spirits+Bunbury+reviews" target="_blank" rel="noopener noreferrer">
              Google
            </a>
            <a className="link-line hover:text-hs-cream" href={site.listings.tripadvisor} target="_blank" rel="noopener noreferrer">
              Tripadvisor
            </a>
            <a className="link-line hover:text-hs-cream" href={site.listings.trustpilot} target="_blank" rel="noopener noreferrer">
              Trustpilot
            </a>
          </div>
        </div>

        {/* Desktop / tablet: glass carousel with crossfading quotes */}
        <div
          ref={region}
          className="glass glass-edge glass-spot hidden rounded-[2rem] p-10 md:block lg:col-span-7 lg:col-start-6 lg:p-14"
          role="region"
          aria-roledescription="carousel"
          aria-label="Guest reviews"
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
          }}
        >
          <div className="grid">
            {reviews.map((r, i) => {
              const active = i === index;
              return (
                <figure
                  key={r.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${reviews.length}`}
                  aria-hidden={!active}
                  inert={!active}
                  className={cx(
                    "[grid-area:1/1] transition-[opacity,transform] duration-1000 ease-luxe",
                    active ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0",
                  )}
                >
                  <blockquote className="font-display text-[clamp(1.7rem,2.7vw,3rem)] italic leading-[1.2] tracking-tight">“{r.quote}”</blockquote>
                  <figcaption className="mt-10 flex items-center gap-5">
                    <span className="font-display grid h-14 w-14 place-items-center rounded-full border border-hs-gold/60 bg-hs-gold/10 text-lg text-hs-gold">{initials(r.name)}</span>
                    <span>
                      <span className="block text-sm font-medium tracking-wide">— {r.name}</span>
                      <span className="mt-1 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.2em] text-hs-cream/60">
                        <Stars count={r.rating} /> {r.title} · <time dateTime={r.date}>{formatDate(r.date, "short")}</time>
                      </span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-12 flex items-center gap-4">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="grid h-12 w-12 place-items-center rounded-full border border-hs-cream/25 transition-colors hover:border-hs-gold hover:text-hs-gold">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next review" className="grid h-12 w-12 place-items-center rounded-full border border-hs-cream/25 transition-colors hover:border-hs-gold hover:text-hs-gold">
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              aria-label={stopped ? "Play reviews automatically" : "Pause automatic reviews"}
              className="grid h-12 w-12 place-items-center rounded-full border border-hs-cream/25 text-hs-cream/80 transition-colors hover:border-hs-gold hover:text-hs-gold"
            >
              {stopped ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <p className="ml-2 text-xs tracking-[0.3em] text-hs-cream/60" aria-live={running ? "off" : "polite"}>
              <span className="text-hs-gold">{pad(index + 1)}</span> / {pad(reviews.length)}
            </p>
            <div aria-hidden className="ml-auto flex flex-1 gap-2">
              {reviews.map((r, i) => (
                <span key={r.name} className="h-px flex-1 overflow-hidden bg-hs-cream/20">
                  <span
                    key={`${index}-${running}`}
                    className={cx("block h-px origin-left bg-hs-gold", i === index ? (running ? "progress-run" : "scale-x-100") : "scale-x-0")}
                    style={{ "--progress-dur": `${AUTOPLAY_MS}ms` } as CSSProperties}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: horizontal drag */}
        <ul className="swipe-row -mx-[var(--gutter)] gap-4 px-[var(--gutter)] md:hidden" aria-label="Guest reviews">
          {reviews.map((r) => (
            <li key={r.name} className="w-[84vw]">
              <figure className="glass glass-edge h-full rounded-[1.75rem] p-7">
                <Stars count={r.rating} />
                <blockquote className="font-display mt-5 text-[1.45rem] italic leading-snug">“{r.quote}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <span className="font-display grid h-11 w-11 place-items-center rounded-full border border-hs-gold/60 text-hs-gold">{initials(r.name)}</span>
                  <span className="text-sm">
                    — {r.name}
                    <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-hs-cream/60">
                      <time dateTime={r.date}>{formatDate(r.date, "short")}</time>
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
