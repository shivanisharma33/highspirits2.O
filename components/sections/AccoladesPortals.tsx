"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useEffect, useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { FadeUp } from "@/components/motion/Reveal";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { site } from "@/lib/site";

type PortalItem = {
  id: string;
  chipLabel: string;
  title: string;
  subtitle: string;
  meta: (isActive: boolean) => ReactNode;
  actionText: string;
  link: string;
  emblem: ReactNode;
};

function MiniStarRow({ isActive = false }: { isActive?: boolean }) {
  return (
    <div className="flex items-center gap-1" aria-label="5 stars rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          className="h-3.5 w-3.5 fill-hs-gold"
          viewBox="0 0 20 20"
          aria-hidden="true"
          animate={isActive ? { scale: [1, 1.3, 1], rotate: [0, 12, 0] } : { scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
}

function AGFGEmblem() {
  return (
    <div className="relative flex h-24 w-32 items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md p-2 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-hs-gold/25 transition-transform duration-500 group-hover:scale-105">
      <Image
        src="/agfg-badge.png"
        alt="AGFG Readers' Choice 2026 Winner"
        width={96}
        height={60}
        className="object-contain"
        priority
      />
    </div>
  );
}

function GoogleEmblem() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50/70 via-white/80 to-amber-50/40 backdrop-blur-md p-4 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-hs-gold/25 transition-transform duration-500 group-hover:scale-105">
      <svg viewBox="0 0 24 24" className="h-12 w-12" fill="currentColor" aria-hidden="true">
        <path
          d="M12.24 10.285V14.4h6.887c-.648 2.428-2.519 4.114-5.137 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.637 0 3.125.626 4.256 1.646L21.3 4.675C19.034 2.554 15.937 1.2 12.24 1.2 6.2 1.2 1.2 6.2 1.2 12.24s5 11.04 11.04 11.04c6.31 0 11.04-4.44 11.04-11.04 0-.744-.06-1.464-.18-2.155H12.24z"
          className="fill-[#4285F4]"
        />
      </svg>
    </div>
  );
}

function UberEatsEmblem() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white/80 to-emerald-100/40 backdrop-blur-md p-4 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-emerald-400/30 transition-transform duration-500 group-hover:scale-105">
      <svg viewBox="0 0 24 24" className="h-12 w-12 text-emerald-600" fill="currentColor" aria-hidden="true">
        <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z" />
      </svg>
    </div>
  );
}

function TripAdvisorEmblem() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white/80 to-green-100/40 backdrop-blur-md p-4 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-[#00aa6c]/30 transition-transform duration-500 group-hover:scale-105">
      <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#00aa6c]" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-4.5 13.5A2.5 2.5 0 0 1 5 13a2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5zm4.5-5.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zm4.5 5.25A2.5 2.5 0 0 1 14 13a2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5z" />
      </svg>
    </div>
  );
}

function TrustpilotEmblem() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white/80 to-green-100/40 backdrop-blur-md p-4 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-[#00b67a]/30 transition-transform duration-500 group-hover:scale-105">
      <svg viewBox="0 0 62 60" className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M61.5 22.4H38L30.8 0l-7.3 22.4L0 22.3l19 13.8-7.3 22.3 19-13.8 19 13.8-7.3-22.3 19.1-13.7z" fill="#00b67a" />
        <path d="M44.2 41.2l-1.6-5.1-11.8 8.5 13.4-3.4z" fill="#005128" />
      </svg>
    </div>
  );
}

const portals: PortalItem[] = [
  {
    id: "agfg",
    chipLabel: "AGFG 2026",
    title: "Winner 2026",
    subtitle: "AGFG Readers' Choice",
    meta: () => (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-hs-gold-deep">
        <span className="h-1.5 w-1.5 rounded-full bg-hs-gold animate-pulse" />
        Official 2026 Award
      </span>
    ),
    actionText: "View Credential",
    link: site.listings.agfg,
    emblem: <AGFGEmblem />,
  },
  {
    id: "google",
    chipLabel: "5.0 Rating",
    title: "5.0 Rating",
    subtitle: "Google Reviews & Rating",
    meta: (isActive) => (
      <div className="flex flex-col items-center gap-1">
        <MiniStarRow isActive={isActive} />
        <span className="text-xs font-medium text-hs-text/70">567+ Verified Diners</span>
      </div>
    ),
    actionText: "Check Rating",
    link: site.listings.google,
    emblem: <GoogleEmblem />,
  },
  {
    id: "ubereats",
    chipLabel: "Uber Eats",
    title: "Order Online",
    subtitle: "Delivery via Uber Eats",
    meta: () => (
      <span className="text-xs font-semibold text-emerald-700">
        Hot &amp; Fresh to Doorstep
      </span>
    ),
    actionText: "Order Now",
    link: site.listings.uberEats,
    emblem: <UberEatsEmblem />,
  },
  {
    id: "tripadvisor",
    chipLabel: "TripAdvisor",
    title: "TripAdvisor",
    subtitle: "Read Guest Reviews",
    meta: () => (
      <span className="text-xs font-semibold text-[#00aa6c]">
        Verified Traveler Reviews
      </span>
    ),
    actionText: "Read Reviews",
    link: site.listings.tripadvisor,
    emblem: <TripAdvisorEmblem />,
  },
  {
    id: "trustpilot",
    chipLabel: "Trustpilot",
    title: "Trustpilot",
    subtitle: "Read Guest Reviews",
    meta: () => (
      <span className="text-xs font-semibold text-[#00b67a]">
        Transparent Customer Scores
      </span>
    ),
    actionText: "Read Reviews",
    link: site.listings.trustpilot,
    emblem: <TrustpilotEmblem />,
  },
];

/* ─── 3D Magnetic Interactive Glass Card ─── */
function TiltCard({
  item,
  isActive,
  onClick,
}: {
  item: PortalItem;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onClick={onClick}
      animate={
        isActive
          ? {
              scale: 1,
              opacity: 1,
              y: [0, -6, 0],
            }
          : {
              scale: 0.88,
              opacity: 0.82,
              y: 0,
            }
      }
      transition={
        isActive
          ? {
              y: {
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.45 },
            }
          : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
      }
      className={`shrink-0 w-[290px] sm:w-[320px] transition-all duration-500 cursor-pointer relative perspective-1000 ${
        isActive ? "z-20" : "z-10 hover:opacity-100"
      }`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={`group relative flex flex-col items-center justify-between text-center rounded-[2.25rem] p-8 sm:p-10 transition-all duration-500 overflow-hidden ${
          isActive
            ? "bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.95)] ring-1 ring-black/[0.08]"
            : "bg-white/40 hover:bg-white/55 backdrop-blur-xl border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] ring-1 ring-black/[0.04]"
        } min-h-[440px] sm:min-h-[470px]`}
      >
        {/* Top: Brand / Award Emblem with 3D Depth */}
        <motion.div
          style={{ transform: "translateZ(30px)" }}
          className="mb-6 flex flex-1 items-center justify-center relative z-10 transition-transform duration-300"
        >
          {item.emblem}
        </motion.div>

        {/* Middle: Title, Subtitle, & Trust Meta with 3D Depth */}
        <div
          style={{ transform: "translateZ(18px)" }}
          className="flex flex-col items-center justify-center my-auto relative z-10"
        >
          <h3 className="font-display text-2xl sm:text-[1.75rem] font-bold text-hs-green tracking-tight transition-colors duration-300 group-hover:text-hs-gold-deep">
            {item.title}
          </h3>

          <p className="mt-2 text-sm sm:text-base text-hs-text/75 font-medium leading-snug">
            {item.subtitle}
          </p>

          <div className="mt-4 flex items-center justify-center">
            {item.meta(isActive)}
          </div>
        </div>

        {/* Bottom: Action Link (Frosted Glass Pill with 3D Depth) */}
        <div
          style={{ transform: "translateZ(24px)" }}
          className="mt-8 pt-2 w-full flex items-center justify-center relative z-10"
        >
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full border border-hs-gold/35 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-hs-gold-deep backdrop-blur-md transition-all duration-300 hover:border-hs-gold hover:bg-hs-gold hover:text-hs-green-deep group-hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{item.actionText}</span>
            <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AccoladesPortals() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stepWidth, setStepWidth] = useState(348);
  const sectionRef = useRef<HTMLElement>(null);

  const total = portals.length;

  useEffect(() => {
    const updateWidth = () => {
      setStepWidth(window.innerWidth >= 640 ? 348 : 314);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 5.5 seconds unless paused on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="accolades-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden bg-[#FAF8F5] py-20 sm:py-24 md:py-28 text-hs-text border-y border-hs-gold/25"
    >
      <div className="shell relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* =========================================================================
              LEFT COLUMN: Editorial Typography, Category Pills & Navigation Controls
              ========================================================================= */}
          <div className="lg:col-span-5">
            <FadeUp as="p" className="eyebrow mb-6">
              Recognitions &amp; Partners
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                id="accolades-title"
                className="font-display text-[clamp(2.3rem,4.2vw,3.6rem)] leading-[1.08] tracking-tight text-hs-green"
              >
                Our Accolades <br />
                <em className="text-gold-gradient italic font-normal">&amp; Online Portals.</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-hs-text/75 max-w-md">
                Explore our verified credentials, read dining reviews or order directly to your door.
              </p>
            </FadeUp>

            {/* Interactive Category Tabs / Direct Selection Pills */}
            <FadeUp delay={0.25} className="mt-7 flex flex-wrap gap-2">
              {portals.map((p, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? "bg-hs-green text-hs-cream border border-hs-gold/50 shadow-sm scale-105"
                        : "bg-white/75 text-hs-text/70 border border-black/[0.08] hover:border-hs-gold/40 hover:text-hs-green hover:bg-white"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${isCurrent ? "bg-hs-gold animate-pulse" : "bg-black/20"}`} />
                    <span>{p.chipLabel}</span>
                  </button>
                );
              })}
            </FadeUp>

            {/* Navigation Controls: Previous circular button + Elongated Next arrow */}
            <FadeUp delay={0.3} className="mt-10 sm:mt-12 flex items-center gap-6 select-none">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous accolade"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-hs-gold/35 bg-white text-hs-green shadow-sm transition-all duration-300 hover:border-hs-gold hover:bg-hs-gold hover:text-hs-green-deep active:scale-95 cursor-pointer"
              >
                <ArrowLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>

              {/* Next Elongated Arrow matching the reference design */}
              <button
                onClick={handleNext}
                aria-label="Next accolade"
                className="group flex items-center gap-3 text-hs-gold-deep transition-all duration-300 hover:text-hs-green cursor-pointer py-2"
              >
                <span className="h-[2px] w-14 sm:w-16 bg-gradient-to-r from-hs-gold via-hs-gold-pale to-hs-gold transition-all duration-300 group-hover:w-20 group-hover:bg-hs-gold-deep" />
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Progress Count & Animated Capsule */}
              <div className="ml-2 flex items-center gap-3">
                <div className="font-mono text-xs font-semibold tracking-widest text-hs-gold-deep/80">
                  <span>0{activeIndex + 1}</span>
                  <span className="mx-1.5 opacity-35">/</span>
                  <span className="opacity-40">0{total}</span>
                </div>
                <div className="hidden sm:block h-1 w-16 rounded-full bg-black/10 overflow-hidden">
                  <motion.div
                    key={activeIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5.5, ease: "linear" }}
                    className="h-full bg-hs-gold"
                  />
                </div>
              </div>
            </FadeUp>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Scaled & Perspective Horizontal Carousel Showcase
              ========================================================================= */}
          <div className="lg:col-span-7 relative overflow-hidden py-4 -mr-4 sm:-mr-8 lg:-mr-12 pl-1">
            <div className="relative overflow-visible">
              <motion.div
                className="flex items-center gap-6 sm:gap-7 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -(total - 1) * stepWidth, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) handleNext();
                  else if (info.offset.x > 40) handlePrev();
                }}
                animate={{
                  x: -activeIndex * stepWidth,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                  mass: 0.8,
                }}
              >
                {portals.map((item, idx) => (
                  <TiltCard
                    key={item.id}
                    item={item}
                    isActive={idx === activeIndex}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
