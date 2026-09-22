"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { DESKTOP_MOTION, MOTION_OK, ScrollTrigger, gsap } from "@/components/motion/gsap";
import { ArrowRight, ArrowUpRight, Clock, Flame, Leaf } from "@/components/ui/Icons";
import { signatureDishes, type SignatureDish } from "@/lib/content/dishes";
import { media } from "@/lib/images";
import { reviews } from "@/lib/content/reviews";
import { lenisStore } from "@/lib/lenis";

/** Curated running order for the campaign; any dish not listed follows. */
const RUNNING_ORDER = [
  "Dal Makhani",
  "Butter Chicken",
  "Tandoori Mixed Grill",
  "Biryani Royale",
  "Palak Paneer",
  "Tasmanian Lamb",
];

const DISHES: SignatureDish[] = [
  ...RUNNING_ORDER.flatMap((name) => signatureDishes.filter((d) => d.name === name)),
  ...signatureDishes.filter((d) => !RUNNING_ORDER.includes(d.name)),
];

/** Crop focus per photograph inside the tall arch, so the plate stays whole. */
const FOCUS: Record<string, string> = {
  "Dal Makhani": "46% 52%",
  "Butter Chicken": "50% 55%",
  "Tandoori Mixed Grill": "46% 62%",
  "Biryani Royale": "50% 58%",
  "Palak Paneer": "50% 52%",
  "Tasmanian Lamb": "46% 56%",
};

const QUOTE = reviews[0];
const TOTAL = DISHES.length;

const pad = (n: number) => String(n).padStart(2, "0");
const price = (dish: SignatureDish) => (dish.price ? `$${dish.price.toFixed(2)}` : null);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A tiny line mark per note: fire, time, herb — or a spice seed. */
function NoteIcon({ note }: { note: string }) {
  const n = note.toLowerCase();
  if (/(simmer|slow|hour|dum)/.test(n)) return <Clock size={13} />;
  if (/(tandoor|tadka|chilli|kebab|tikka|charcoal)/.test(n)) return <Flame size={13} />;
  if (/(spinach|mint|herb|fenugreek)/.test(n)) return <Leaf size={13} />;
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path d="M12 3.5c3.6 3 5.5 5.8 5.5 8.6a5.5 5.5 0 0 1-11 0c0-2.8 1.9-5.6 5.5-8.6Z" />
      <path d="M12 9v7" />
    </svg>
  );
}

/** Star anise and a curry-leaf sprig, drawn as a single gold hairline study. */
function BotanicalStudy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" fill="none" stroke="currentColor" strokeWidth={0.8} aria-hidden className={className}>
      <g transform="translate(70 92)">
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 45})`}>
            <path d="M0 -6 C 7 -14, 9 -28, 0 -40 C -9 -28, -7 -14, 0 -6 Z" />
            <ellipse cx="0" cy="-22" rx="2.2" ry="4" />
          </g>
        ))}
        <circle r="5" />
      </g>
      <path d="M128 168 C 142 128, 160 86, 206 22" />
      {[
        [140, 138, -52],
        [150, 116, 38],
        [160, 96, -48],
        [172, 76, 42],
        [184, 58, -42],
        [196, 40, 46],
      ].map(([x, y, r], i) => (
        <path key={i} transform={`translate(${x} ${y}) rotate(${r})`} d="M0 0 C 6 -6, 18 -6, 26 0 C 18 6, 6 6, 0 0 Z M3 0 H 22" />
      ))}
    </svg>
  );
}

/** Eight-point star from two turned squares — a quiet Punjabi phulkari nod. */
function PhulkariStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.9} aria-hidden className={className}>
      <rect x="6" y="6" width="12" height="12" />
      <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
      <circle cx="12" cy="12" r="1.6" />
    </svg>
  );
}

/**
 * "Signature Creations" as an immersive culinary editorial: one plate held in
 * an arch at the centre of the canvas, its story set beside it, and a
 * culinary index along the foot that re-sets the whole composition in place.
 */
export function SignatureDishes() {
  const root = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const entrance = useRef<gsap.core.Timeline | null>(null);
  const swap = useRef<gsap.core.Timeline | null>(null);
  const shown = useRef(0);

  const [active, setActive] = useState(0);
  // Only the opening plate loads with the page; the others arrive on intent
  // (hover, focus) or once the section is actually reached.
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [announce, setAnnounce] = useState("");

  const warm = useCallback((i: number) => {
    setSeen((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  }, []);

  const select = useCallback(
    (next: number, { reveal = false }: { reveal?: boolean } = {}) => {
      const i = (next + TOTAL) % TOTAL;
      warm(i);
      setActive(i);
      setAnnounce(`${pad(i + 1)} of ${pad(TOTAL)}: ${DISHES[i].name}`);

      // Keep the chosen entry in view within the index strip.
      const scroller = scrollerRef.current;
      const tab = tabRefs.current[i];
      if (scroller && tab && scroller.scrollWidth > scroller.clientWidth) {
        const left = tab.offsetLeft - (scroller.clientWidth - tab.offsetWidth) / 2;
        scroller.scrollTo({ left, behavior: reducedMotion() ? "auto" : "smooth" });
      }

      // On small screens the photograph sits far above the index: bring it
      // back into view so the change is seen, not just made.
      const art = artRef.current;
      if (reveal && art && window.innerWidth < 1200) {
        const rect = art.getBoundingClientRect();
        if (rect.bottom < window.innerHeight * 0.35) {
          const lenis = lenisStore.get();
          if (lenis) lenis.scrollTo(art, { offset: -96, duration: 1.2 });
          else window.scrollTo({ top: rect.top + window.scrollY - 96, behavior: reducedMotion() ? "auto" : "smooth" });
        }
      }
    },
    [warm],
  );

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next: number;
    switch (e.key) {
      case "ArrowRight":
        next = i + 1;
        break;
      case "ArrowLeft":
        next = i - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = TOTAL - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    const target = (next + TOTAL) % TOTAL;
    select(target);
    tabRefs.current[target]?.focus({ preventScroll: true });
  };

  // Load the remaining plates once the section is near.
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => setSeen(new Set(DISHES.map((_, i) => i))), 1200);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(section);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  // The gold underline glides beneath the active index entry.
  useLayoutEffect(() => {
    const list = listRef.current;
    const marker = markerRef.current;
    if (!list || !marker) return;
    const place = () => {
      const item = list.children[active] as HTMLElement | undefined;
      if (!item) return;
      marker.style.transform = `translate3d(${item.offsetLeft}px,0,0) scaleX(${item.offsetWidth / 100})`;
      marker.style.opacity = "1";
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  // Entrance, parallax and drift.
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const q = gsap.utils.selector(section);
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const panel = panelRefs.current[shown.current];
      const layer = layerRefs.current[shown.current];
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "expo.out" },
        onComplete: () => {
          entrance.current = null;
        },
      });
      tl.fromTo(q("[data-sc-bg]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.2, ease: "power2.out" }, 0)
        .fromTo(q("[data-sc-line]"), { yPercent: 112 }, { yPercent: 0, duration: 1.3, stagger: 0.14 }, 0.15)
        .fromTo(q("[data-sc-mark]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 0.9)
        .fromTo(
          q("[data-sc-fade]"),
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 },
          0.45,
        )
        .fromTo(
          q("[data-sc-reveal]"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
          0.2,
        )
        .fromTo(layer?.querySelector("img") ?? [], { scale: 1.16 }, { scale: 1, duration: 2.4 }, 0.2)
        .fromTo(q("[data-sc-outline]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.6 }, 0.8);
      if (panel) {
        tl.fromTo(
          panel.querySelectorAll("[data-sc-mask]"),
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, stagger: 0.1 },
          0.75,
        ).fromTo(
          panel.querySelectorAll("[data-sc-in]"),
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07 },
          0.95,
        );
      }
      tl.fromTo(
        q("[data-sc-index] > li"),
        { autoAlpha: 0, x: 36 },
        { autoAlpha: 1, x: 0, duration: 1.1, stagger: 0.07 },
        1.05,
      ).fromTo(q("[data-sc-late]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 1.3);

      entrance.current = tl;
      const st = ScrollTrigger.create({ trigger: section, start: "top 72%", once: true, onEnter: () => void tl.play() });
      // Arriving already scrolled past the section (reload, anchor): just play.
      if (st.progress > 0) tl.play();
      return () => {
        st.kill();
        entrance.current = null;
      };
    });

    mm.add(DESKTOP_MOTION, () => {
      const scrub = { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 };
      gsap.fromTo(q("[data-sc-parallax]"), { yPercent: -3.5 }, { yPercent: 3.5, ease: "none", scrollTrigger: scrub });
      gsap.fromTo(q("[data-sc-drift]"), { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: scrub });
      gsap.fromTo(q("[data-sc-float]"), { y: 18 }, { y: -18, ease: "none", scrollTrigger: scrub });
    });

    return () => mm.revert();
  }, []);

  // The cinematic swap: a clip-path wipe for the plate, masks for the type.
  useLayoutEffect(() => {
    const from = shown.current;
    if (from === active) return;
    shown.current = active;

    entrance.current?.progress(1);
    swap.current?.progress(1);
    if (reducedMotion()) return;

    const oldLayer = layerRefs.current[from];
    const newLayer = layerRefs.current[active];
    const oldPanel = panelRefs.current[from];
    const newPanel = panelRefs.current[active];
    if (!newLayer || !newPanel) return;
    const newImg = newLayer.querySelector("img");

    // The outgoing plate and story stay on screen beneath the incoming ones.
    gsap.set([oldLayer, oldPanel], { visibility: "visible" });
    gsap.set(oldLayer, { zIndex: 1 });
    gsap.set(newLayer, { zIndex: 2 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "expo.out" },
      onComplete: () => {
        gsap.set([oldLayer, oldPanel], { clearProps: "visibility,zIndex" });
        gsap.set(newLayer, { clearProps: "clipPath,zIndex" });
        if (oldPanel) gsap.set(oldPanel.querySelectorAll("[data-sc-in],[data-sc-mask]"), { clearProps: "all" });
        swap.current = null;
      },
    });
    tl.fromTo(
        newLayer,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.35, ease: "expo.inOut" },
        0,
      )
      .fromTo(newImg ?? [], { scale: 1.08 }, { scale: 1, duration: 2, ease: "power3.out" }, 0);
    if (oldPanel) {
      tl.to(oldPanel.querySelectorAll("[data-sc-mask]"), { yPercent: -110, duration: 0.5, ease: "power3.in", stagger: 0.04 }, 0)
        .to(oldPanel.querySelectorAll("[data-sc-in]"), { autoAlpha: 0, y: -12, duration: 0.4, ease: "power2.in", stagger: 0.03 }, 0);
    }
    tl.fromTo(newPanel.querySelectorAll("[data-sc-mask]"), { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.42)
      .fromTo(
        newPanel.querySelectorAll("[data-sc-in]"),
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.95, stagger: 0.06 },
        0.6,
      );
    swap.current = tl;

    // Hold the frame until the incoming photograph can be painted.
    if (!newImg || newImg.complete) {
      tl.play();
      return;
    }
    let started = false;
    const start = () => {
      if (started || swap.current !== tl) return;
      started = true;
      tl.play();
    };
    newImg.decode().then(start, start);
    const cap = window.setTimeout(start, 900);
    return () => window.clearTimeout(cap);
  }, [active]);

  const dish = DISHES[active];

  return (
    <section
      ref={root}
      id="signature"
      aria-labelledby="signature-title"
      className="sc grain relative overflow-hidden"
      style={{ "--sc-i": active, "--sc-n": TOTAL } as CSSProperties}
    >
      {/* ── Atmosphere: barely-there photography for depth ─────────────── */}
      <div data-sc-bg aria-hidden className="sc-atmos">
        <div data-sc-drift className="sc-atmos-room">
          <Image src={media.interiorLuxe.src} alt="" fill sizes="40vw" quality={70} className="object-cover" />
        </div>
        <div data-sc-drift className="sc-atmos-spice">
          <Image src={media.spices.src} alt="" fill sizes="30vw" quality={70} className="object-cover" />
        </div>
        <div className="sc-atmos-glow" />
      </div>

      <div className="shell relative">
        <div className="sc-stage">
          {/* ── Editorial story ─────────────────────────────────────────── */}
          <div className="sc-story">
            <div>
              <p data-sc-fade className="eyebrow">
                Signature Creations
              </p>
              <h2 id="signature-title" className="sc-title font-display">
                <span className="sc-title-line">
                  <span data-sc-line className="block">
                    Plates we&rsquo;re
                  </span>
                </span>
                <span className="sc-title-line sc-title-line--em">
                  <em data-sc-line className="sc-title-em">
                    celebrated for.
                    <svg className="sc-title-mark" viewBox="0 0 300 16" fill="none" aria-hidden preserveAspectRatio="none">
                      <path
                        data-sc-mark
                        pathLength={1}
                        d="M3 11 C 60 4, 140 3, 206 6 S 276 10, 297 5"
                        stroke="currentColor"
                        strokeWidth={1.1}
                        strokeLinecap="round"
                        strokeDasharray="1"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </em>
                </span>
              </h2>
              <p data-sc-fade className="sc-lede">
                Handcrafted with the finest ingredients and authentic Punjabi spices — the dishes our guests return for,
                night after night.
              </p>

              <Link href="/about" data-sc-fade className="sc-taste group">
                <span aria-hidden className="sc-taste-ring">
                  <svg viewBox="0 0 48 48" fill="none" className="sc-taste-circle">
                    <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="0.75" className="opacity-35" />
                    <circle
                      cx="24"
                      cy="24"
                      r="23"
                      stroke="currentColor"
                      strokeWidth="0.9"
                      pathLength={1}
                      className="sc-taste-draw"
                    />
                  </svg>
                  <ArrowRight size={14} />
                </span>
                <span className="sc-taste-label">
                  A taste of
                  <br />
                  our story
                </span>
              </Link>
            </div>

            <div data-sc-fade className="sc-brand">
              <BotanicalStudy className="sc-botanical" />
              <p className="sc-brand-line">
                <PhulkariStar className="size-3.5 shrink-0" />
                Clay Oven &amp; Charcoal Fired
              </p>
            </div>
          </div>

          {/* ── The plate, held in an arch ──────────────────────────────── */}
          <figure ref={artRef} className="sc-art">
            <span data-sc-outline aria-hidden className="sc-art-outline">
              <PhulkariStar className="sc-art-keystone" />
            </span>
            <div className="sc-frame">
              <div data-sc-reveal className="sc-frame-reveal">
                <div data-sc-parallax className="sc-frame-parallax">
                  {DISHES.map((d, i) =>
                    seen.has(i) ? (
                      <div
                        key={d.name}
                        ref={(el) => {
                          layerRefs.current[i] = el;
                        }}
                        className="sc-layer"
                        data-active={i === active || undefined}
                      >
                        <Image
                          src={d.image.src}
                          alt={i === active ? d.image.alt : ""}
                          fill
                          sizes="(min-width: 1200px) 31vw, (min-width: 768px) 46vw, 92vw"
                          quality={80}
                          loading={i === 0 ? "lazy" : "eager"}
                          className="object-cover"
                          style={{ objectPosition: FOCUS[d.name] }}
                        />
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
              <span aria-hidden className="sc-frame-shade" />
            </div>
            <span data-sc-outline aria-hidden className="sc-art-base" />
            <figcaption className="sr-only">{dish.image.alt}</figcaption>
          </figure>

          {/* ── A guest's line, set like a pull quote ───────────────────── */}
          <figure data-sc-fade className="sc-quote">
            <blockquote>
              <p className="font-display">&ldquo;{QUOTE.quote}&rdquo;</p>
            </blockquote>
            <figcaption>
              <span aria-hidden className="sc-quote-rule" />
              {QUOTE.name} · {QUOTE.title}
            </figcaption>
          </figure>

          {/* ── The dish story ──────────────────────────────────────────── */}
          <div className="sc-info">
            <span aria-hidden className="sc-ghost font-display">
              <span className="sc-roll">
                {DISHES.map((_, i) => (
                  <span key={i}>{pad(i + 1)}</span>
                ))}
              </span>
            </span>

            <div className="sc-panels">
              {DISHES.map((d, i) => {
                const on = i === active;
                return (
                  <div
                    key={d.name}
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    id={`sc-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`sc-tab-${i}`}
                    aria-hidden={!on}
                    inert={!on}
                    data-active={on || undefined}
                    className="sc-panel"
                  >
                    <p className="sc-kicker">
                      <span className="sc-mask">
                        <span data-sc-mask className="sc-kicker-no font-display">
                          {pad(i + 1)}
                        </span>
                      </span>
                      <span data-sc-in aria-hidden className="sc-kicker-rule" />
                      <span data-sc-in>{d.region}</span>
                    </p>
                    <h3 className="sc-dish font-display">
                      <span className="sc-mask">
                        <span data-sc-mask className="block">
                          {d.name}
                        </span>
                      </span>
                    </h3>
                    {d.lines ? (
                      <p data-sc-in className="sc-lines font-display">
                        {d.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    ) : null}
                    <p data-sc-in className="sc-desc">
                      {d.description}
                    </p>
                    <ul data-sc-in className="sc-notes" aria-label="Key ingredients">
                      {d.notes.map((note) => (
                        <li key={note}>
                          <NoteIcon note={note} />
                          {note}
                        </li>
                      ))}
                    </ul>
                    <div data-sc-in className="sc-order">
                      {price(d) && (
                        <p className="sc-price font-display">
                          <span className="sr-only">Price </span>
                          {price(d)}
                        </p>
                      )}
                      <Link href="/menu" className="sc-view">
                        View dish
                        <ArrowRight size={13} />
                        <span className="sr-only"> — {d.name} on the menu</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Edge navigation ─────────────────────────────────────────── */}
          <div data-sc-late className="sc-rail">
            <button type="button" className="sc-rail-btn" onClick={() => select(active - 1)} aria-label="Previous dish">
              <svg viewBox="0 0 12 16" fill="none" stroke="currentColor" strokeWidth={1} aria-hidden>
                <path d="M6 15V1M1.5 5.5 6 1l4.5 4.5" />
              </svg>
            </button>
            <p className="sc-rail-count font-display" aria-hidden>
              <span className="sc-rail-window">
                <span className="sc-roll">
                  {DISHES.map((_, i) => (
                    <span key={i}>{pad(i + 1)}</span>
                  ))}
                </span>
              </span>
              <span className="sc-rail-slash">/</span>
              <span className="sc-rail-total">{pad(TOTAL)}</span>
            </p>
            <button type="button" className="sc-rail-btn" onClick={() => select(active + 1)} aria-label="Next dish">
              <svg viewBox="0 0 12 16" fill="none" stroke="currentColor" strokeWidth={1} aria-hidden>
                <path d="M6 1v14M1.5 10.5 6 15l4.5-4.5" />
              </svg>
            </button>
            <p className="sr-only" aria-live="polite">
              {announce}
            </p>
          </div>
        </div>

        {/* ── Culinary index ────────────────────────────────────────────── */}
        <div ref={scrollerRef} className="sc-index">
          <ol ref={listRef} data-sc-index role="tablist" aria-label="Signature creations" className="sc-index-list">
            {DISHES.map((d, i) => {
              const on = i === active;
              return (
                <li key={d.name} role="presentation" className="sc-index-item">
                  <button
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`sc-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={`sc-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i, { reveal: true })}
                    onKeyDown={(e) => onTabKey(e, i)}
                    onPointerEnter={() => warm(i)}
                    onFocus={() => warm(i)}
                    className="sc-tab"
                  >
                    <span className="sc-tab-thumb">
                      <Image
                        src={d.image.src}
                        alt=""
                        fill
                        sizes="48px"
                        quality={70}
                        className="object-cover"
                        style={{ objectPosition: FOCUS[d.name] }}
                      />
                    </span>
                    <span className="sc-tab-text">
                      <span className="sc-tab-no font-display">{pad(i + 1)}</span>
                      <span className="sc-tab-name font-display">{d.name}</span>
                      <span className="sc-tab-cat">{d.region}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <span ref={markerRef} aria-hidden className="sc-index-marker" />
        </div>

        {/* ── Coda ──────────────────────────────────────────────────────── */}
        <div data-sc-late className="sc-coda">
          <p className="sc-coda-lede">
            <span className="sc-coda-kicker">More than a meal</span>
            <span className="sc-coda-text">
              Over 80 authentic selections — from the charcoal-fired clay tandoor to slow-simmered Punjabi curries.
            </span>
          </p>
          <div className="sc-coda-links">
            <Link href="/menu" className="sc-coda-link">
              Explore full menu
              <ArrowRight size={14} />
            </Link>
            <a href="https://order.highspirits.au/" target="_blank" rel="noopener noreferrer" className="sc-coda-alt">
              Order online
              <ArrowUpRight size={12} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
