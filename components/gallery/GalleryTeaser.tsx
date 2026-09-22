"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { galleryItems } from "@/lib/content/gallery";
import { media } from "@/lib/images";
import { cx } from "@/lib/format";

interface GalleryTile {
  id: string;
  item: typeof media.opening2;
  title: string;
  tag: string;
  className: string;
  initialScale: number;
  targetScale: number;
  initialX: number;
  targetX: number;
  initialY: number;
  targetY: number;
  initialRotate: number;
  targetRotate: number;
  mobileInitialScale: number;
  mobileTargetScale: number;
  mobileInitialX: number;
  mobileTargetX: number;
  mobileInitialY: number;
  mobileTargetY: number;
  priority?: boolean;
}

const GALLERY_TILES: GalleryTile[] = [
  // 1. Center Focal Showcase
  {
    id: "center-hero",
    item: media.opening2,
    title: "Grand Opening Gala",
    tag: "Celebration",
    className: "w-[300px] h-[200px] sm:w-[380px] sm:h-[250px] lg:w-[480px] lg:h-[310px] z-10",
    initialScale: 0.62,
    targetScale: 1.38,
    initialX: 0,
    targetX: 0,
    initialY: 0,
    targetY: 0,
    initialRotate: 0,
    targetRotate: 0,
    mobileInitialScale: 0.72,
    mobileTargetScale: 1.25,
    mobileInitialX: 0,
    mobileTargetX: 0,
    mobileInitialY: 0,
    mobileTargetY: 0,
    priority: true,
  },
  // 2. Top-Left: The Emerald Lounge
  {
    id: "top-left",
    item: media.interiorLounge,
    title: "The Emerald Lounge",
    tag: "Atmosphere",
    className: "w-[210px] h-[150px] sm:w-[260px] sm:h-[185px] lg:w-[320px] lg:h-[220px] z-0",
    initialScale: 0.52,
    targetScale: 1.18,
    initialX: -160,
    targetX: -440,
    initialY: -100,
    targetY: -250,
    initialRotate: -5,
    targetRotate: -1,
    mobileInitialScale: 0.55,
    mobileTargetScale: 0.95,
    mobileInitialX: -110,
    mobileTargetX: -170,
    mobileInitialY: -80,
    mobileTargetY: -190,
  },
  // 3. Top-Right: Tandoori & Culinary Art
  {
    id: "top-right",
    item: media.dishTandooriGrill,
    title: "Sizzling Tandoori",
    tag: "Signature Craft",
    className: "w-[210px] h-[150px] sm:w-[260px] sm:h-[185px] lg:w-[320px] lg:h-[220px] z-0",
    initialScale: 0.54,
    targetScale: 1.2,
    initialX: 160,
    targetX: 440,
    initialY: -100,
    targetY: -250,
    initialRotate: 4,
    targetRotate: 1,
    mobileInitialScale: 0.55,
    mobileTargetScale: 0.95,
    mobileInitialX: 110,
    mobileTargetX: 170,
    mobileInitialY: -80,
    mobileTargetY: -190,
  },
  // 4. Bottom-Left: Guests & Celebrations
  {
    id: "bottom-left",
    item: media.guests3,
    title: "Warm Evenings",
    tag: "Community",
    className: "w-[200px] h-[150px] sm:w-[250px] sm:h-[180px] lg:w-[310px] lg:h-[215px] z-0",
    initialScale: 0.52,
    targetScale: 1.16,
    initialX: -170,
    targetX: -430,
    initialY: 105,
    targetY: 260,
    initialRotate: -4,
    targetRotate: -1,
    mobileInitialScale: 0.55,
    mobileTargetScale: 0.95,
    mobileInitialX: -110,
    mobileTargetX: -165,
    mobileInitialY: 85,
    mobileTargetY: 200,
  },
  // 5. Bottom-Right: Dining Room Splendor
  {
    id: "bottom-right",
    item: media.interiorLuxe,
    title: "Chandelier Ambiance",
    tag: "Spaces",
    className: "w-[200px] h-[150px] sm:w-[250px] sm:h-[180px] lg:w-[310px] lg:h-[215px] z-0",
    initialScale: 0.52,
    targetScale: 1.16,
    initialX: 170,
    targetX: 430,
    initialY: 105,
    targetY: 260,
    initialRotate: 3,
    targetRotate: 1,
    mobileInitialScale: 0.55,
    mobileTargetScale: 0.95,
    mobileInitialX: 110,
    mobileTargetX: 165,
    mobileInitialY: 85,
    mobileTargetY: 200,
  },
  // 6. Far Left Flank (Desktop & Wide Viewports)
  {
    id: "far-left",
    item: media.foodCurry,
    title: "Royal Dal Makhani",
    tag: "Heritage",
    className: "hidden xl:block w-[260px] h-[180px] z-0",
    initialScale: 0.46,
    targetScale: 1.05,
    initialX: -320,
    targetX: -650,
    initialY: 5,
    targetY: 10,
    initialRotate: -6,
    targetRotate: -2,
    mobileInitialScale: 0,
    mobileTargetScale: 0,
    mobileInitialX: 0,
    mobileTargetX: 0,
    mobileInitialY: 0,
    mobileTargetY: 0,
  },
  // 7. Far Right Flank (Desktop & Wide Viewports)
  {
    id: "far-right",
    item: media.kitchenCraft,
    title: "Handcrafted Naan",
    tag: "Tandoor",
    className: "hidden xl:block w-[260px] h-[180px] z-0",
    initialScale: 0.46,
    targetScale: 1.05,
    initialX: 320,
    targetX: 650,
    initialY: 5,
    targetY: 10,
    initialRotate: 6,
    targetRotate: 2,
    mobileInitialScale: 0,
    mobileTargetScale: 0,
    mobileInitialX: 0,
    mobileTargetX: 0,
    mobileInitialY: 0,
    mobileTargetY: 0,
  },
];

export function GalleryTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<Array<HTMLDivElement | null>>([]);
  const centerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const viewport = viewportRef.current;
    if (!container || !viewport) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet Motion
    mm.add("(min-width: 768px)", () => {
      // Set initial positions and scales for all tiles
      GALLERY_TILES.forEach((tile, index) => {
        const el = tilesRef.current[index];
        if (!el) return;
        gsap.set(el, {
          x: tile.initialX,
          y: tile.initialY,
          scale: tile.initialScale,
          rotation: tile.initialRotate,
          transformOrigin: "center center",
        });
      });

      // Pinned scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1500",
          pin: viewport,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each tile: zoom in and travel outward
      GALLERY_TILES.forEach((tile, index) => {
        const el = tilesRef.current[index];
        if (!el) return;

        tl.to(
          el,
          {
            x: tile.targetX,
            y: tile.targetY,
            scale: tile.targetScale,
            rotation: tile.targetRotate,
            ease: "power1.inOut",
          },
          0,
        );
      });

      // Subtle scale and elevation on center content card
      if (centerContentRef.current) {
        tl.to(
          centerContentRef.current,
          {
            scale: 1.04,
            ease: "power1.out",
          },
          0,
        );
      }

      return () => {
        tl.kill();
      };
    });

    // Mobile Devices (< 768px)
    mm.add("(max-width: 767px)", () => {
      GALLERY_TILES.forEach((tile, index) => {
        const el = tilesRef.current[index];
        if (!el) return;
        gsap.set(el, {
          x: tile.mobileInitialX,
          y: tile.mobileInitialY,
          scale: tile.mobileInitialScale,
          rotation: tile.initialRotate * 0.5,
          transformOrigin: "center center",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1000",
          pin: viewport,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      GALLERY_TILES.forEach((tile, index) => {
        const el = tilesRef.current[index];
        if (!el) return;

        tl.to(
          el,
          {
            x: tile.mobileTargetX,
            y: tile.mobileTargetY,
            scale: tile.mobileTargetScale,
            rotation: 0,
            ease: "power1.inOut",
          },
          0,
        );
      });

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-labelledby="gallery-teaser-title"
      className="relative bg-hs-cream text-hs-text overflow-clip"
    >
      {/* Sticky / Pinned Viewport Container */}
      <div
        ref={viewportRef}
        className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 select-none"
      >
        {/* Subtle Ambient Radial Gold Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,hsl(42_78%_51%/0.12)_0%,transparent_65%)]"
        />

        {/* Decorative Background Grid Accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-20 [background-image:linear-gradient(to_right,hsl(160_70%_12%/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(160_70%_12%/0.1)_1px,transparent_1px)] [background-size:4rem_4rem]"
        />

        {/* Floating Zoomable Image Tiles */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-10"
        >
          {GALLERY_TILES.map((tile, i) => (
            <div
              key={tile.id}
              ref={(el) => {
                tilesRef.current[i] = el;
              }}
              className={cx(
                "absolute rounded-2xl md:rounded-3xl overflow-hidden border border-hs-gold/30 bg-hs-green-deep will-change-transform transition-all duration-300",
                tile.className,
              )}
            >
              <Image
                src={tile.item.src}
                alt={tile.item.alt}
                fill
                priority={tile.priority}
                sizes="(min-width: 1024px) 35vw, 65vw"
                placeholder="blur"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white drop-shadow-sm text-xs md:text-sm font-sans">
                <span className="font-medium tracking-wide truncate">{tile.title}</span>
                <span className="text-[10px] uppercase tracking-widest text-hs-gold-pale bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 hidden sm:inline-block">
                  {tile.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Master Information Card */}
        <div
          ref={centerContentRef}
          className="relative z-30 max-w-2xl mx-auto text-center px-6 py-8 sm:px-10 sm:py-10 rounded-3xl bg-hs-cream/80 backdrop-blur-xl border border-hs-gold/35 flex flex-col items-center"
        >
          {/* Eyebrow with Luxury Gold Dot */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-hs-green/5 border border-hs-gold/40 text-hs-gold-deep text-xs font-medium tracking-[0.25em] uppercase mb-4 sm:mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-hs-gold animate-pulse" />
            <span>The Gallery Archive</span>
          </div>

          {/* Heading */}
          <h2
            id="gallery-teaser-title"
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-hs-green tracking-tight mb-4"
          >
            Moments at{" "}
            <em className="font-serif italic font-normal text-hs-emerald underline decoration-hs-gold/40 decoration-1 underline-offset-8">
              High Spirits
            </em>
          </h2>

          {/* Descriptive Copy */}
          <p className="text-sm sm:text-base md:text-lg text-hs-muted max-w-xl mx-auto leading-relaxed mb-8">
            Grand openings, quiet anniversaries, long tables of friends — a visual archive of evenings on Victoria Street.
          </p>

          {/* Actions & Badge */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink
              href="/gallery"
              variant="dark"
              data-cursor="Explore"
              className="shadow-lg shadow-hs-green/10"
            >
              Explore the gallery
            </ButtonLink>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-hs-green-dark hover:text-hs-gold-deep transition-colors px-4 py-2.5 rounded-full bg-white/70 border border-hs-gold/25 hover:border-hs-gold/60 backdrop-blur-sm shadow-sm group"
            >
              <span className="font-bold text-hs-gold-deep">{galleryItems.length}</span>
              <span>Photographs</span>
              <span className="text-hs-gold transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

