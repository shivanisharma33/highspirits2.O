"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { FadeUp, TextReveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

type PortalItem = {
  id: string;
  badgeTag: string;
  title: string;
  subtitle: string;
  actionText: string;
  link: string;
  glowColor: string;
  accentBorder: string;
  iconRender: ReactNode;
  extraMeta?: ReactNode;
};

function AGFGIcon() {
  return (
    <div className="relative flex h-14 w-20 items-center justify-center rounded-xl bg-white/95 p-1.5 transition-transform duration-500 group-hover:scale-105">
      <Image
        src="/agfg-badge.png"
        alt="AGFG Readers' Choice 2026 Winner"
        width={76}
        height={48}
        className="object-contain"
        priority
      />
    </div>
  );
}

function UberEatsIcon() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/25 to-emerald-950/60 p-3 shadow-inner ring-1 ring-emerald-400/30 transition-transform duration-500 group-hover:scale-110">
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 text-emerald-400 transition-colors duration-300 group-hover:text-emerald-300"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z" />
      </svg>
    </div>
  );
}

function TripAdvisorIcon() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00aa6c]/25 to-emerald-950/60 p-3 shadow-inner ring-1 ring-[#00aa6c]/35 transition-transform duration-500 group-hover:scale-110">
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 text-[#00eb93] transition-colors duration-300 group-hover:text-emerald-200"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-4.5 13.5A2.5 2.5 0 0 1 5 13a2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5zm4.5-5.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zm4.5 5.25A2.5 2.5 0 0 1 14 13a2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5z" />
      </svg>
    </div>
  );
}

function TrustpilotIcon() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00b67a]/25 to-emerald-950/60 p-3 shadow-inner ring-1 ring-[#00b67a]/35 transition-transform duration-500 group-hover:scale-110">
      <svg
        viewBox="0 0 62 60"
        className="h-8 w-8 transition-transform duration-500 group-hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M61.5 22.4H38L30.8 0l-7.3 22.4L0 22.3l19 13.8-7.3 22.3 19-13.8 19 13.8-7.3-22.3 19.1-13.7z"
          fill="#00b67a"
        />
        <path d="M44.2 41.2l-1.6-5.1-11.8 8.5 13.4-3.4z" fill="#005128" />
      </svg>
    </div>
  );
}

function GoogleReviewsIcon() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 via-hs-gold/15 to-emerald-950/60 p-3 shadow-inner ring-1 ring-blue-400/30 transition-transform duration-500 group-hover:scale-110">
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 transition-colors duration-300"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M12.24 10.285V14.4h6.887c-.648 2.428-2.519 4.114-5.137 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.637 0 3.125.626 4.256 1.646L21.3 4.675C19.034 2.554 15.937 1.2 12.24 1.2 6.2 1.2 1.2 6.2 1.2 12.24s5 11.04 11.04 11.04c6.31 0 11.04-4.44 11.04-11.04 0-.744-.06-1.464-.18-2.155H12.24z"
          className="fill-[#4285F4] group-hover:fill-[#609bfa]"
        />
      </svg>
    </div>
  );
}

function MiniStarRow() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 stars rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-3 w-3 fill-hs-gold drop-shadow-[0_0_4px_rgba(200,164,92,0.6)]"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const portals: PortalItem[] = [
  {
    id: "agfg",
    badgeTag: "Award Winner",
    title: "Winner 2026",
    subtitle: "AGFG Readers' Choice",
    actionText: "View Credential",
    link: site.listings.agfg,
    glowColor: "from-red-500/25 via-hs-gold/15 to-transparent",
    accentBorder: "group-hover:border-hs-gold/60",
    iconRender: <AGFGIcon />,
    extraMeta: (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-hs-gold-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-hs-gold animate-pulse" />
        Official 2026 Award
      </span>
    ),
  },
  {
    id: "ubereats",
    badgeTag: "Direct Delivery",
    title: "Order Online",
    subtitle: "Delivery via Uber Eats",
    actionText: "Order Now",
    link: site.listings.uberEats,
    glowColor: "from-emerald-500/25 via-emerald-400/10 to-transparent",
    accentBorder: "group-hover:border-emerald-400/60",
    iconRender: <UberEatsIcon />,
    extraMeta: (
      <span className="text-[11px] font-medium text-emerald-300/90">
        Hot & Fresh to Doorstep
      </span>
    ),
  },
  {
    id: "tripadvisor",
    badgeTag: "Global Diners",
    title: "TripAdvisor",
    subtitle: "Read Guest Reviews",
    actionText: "Read Reviews",
    link: site.listings.tripadvisor,
    glowColor: "from-[#00aa6c]/25 via-emerald-500/10 to-transparent",
    accentBorder: "group-hover:border-[#00aa6c]/60",
    iconRender: <TripAdvisorIcon />,
    extraMeta: (
      <span className="text-[11px] font-medium text-[#00eb93]/90">
        Verified Traveler Reviews
      </span>
    ),
  },
  {
    id: "trustpilot",
    badgeTag: "Verified Trust",
    title: "Trustpilot",
    subtitle: "Read Guest Reviews",
    actionText: "Read Reviews",
    link: site.listings.trustpilot,
    glowColor: "from-[#00b67a]/25 via-emerald-400/10 to-transparent",
    accentBorder: "group-hover:border-[#00b67a]/60",
    iconRender: <TrustpilotIcon />,
    extraMeta: (
      <span className="text-[11px] font-medium text-[#00b67a]">
        Transparent Customer Scores
      </span>
    ),
  },
  {
    id: "google",
    badgeTag: "Excellence",
    title: "5.0 Rating",
    subtitle: "Google Reviews & Rating",
    actionText: "Check Rating",
    link: site.listings.google,
    glowColor: "from-blue-500/25 via-hs-gold/20 to-transparent",
    accentBorder: "group-hover:border-hs-gold/60",
    iconRender: <GoogleReviewsIcon />,
    extraMeta: <MiniStarRow />,
  },
];

/* ─── 3D Magnetic Tilt Glass Card ─── */
function TiltPortalCard({ item, index }: { item: PortalItem; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Mouse coords for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spotlight coords relative to card
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  // Smooth springs for tilt angles
  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Normalized position from -0.5 to 0.5
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);

    // Pixel position for spotlight
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-1000 h-full"
    >
      <motion.a
        ref={cardRef}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        aria-label={`${item.title} - ${item.subtitle}`}
        className={`group relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#082218]/90 via-[#051810]/95 to-[#020b07] p-7 backdrop-blur-xl transition-colors duration-500 ${item.accentBorder}`}
      >
        {/* Ambient Backlight Glow */}
        <div
          className={`pointer-events-none absolute -inset-1 bg-gradient-to-br ${item.glowColor} opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100`}
        />

        {/* Dynamic Cursor Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [spotX, spotY],
              ([x, y]) =>
                `radial-gradient(280px circle at ${x}px ${y}px, rgba(200, 164, 92, 0.16), transparent 70%)`
            ),
          }}
        />

        {/* Shimmer Rim Border Line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hs-gold/30 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Top Meta Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full border border-hs-gold/25 bg-hs-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-hs-gold-pale backdrop-blur-sm transition-colors duration-300 group-hover:border-hs-gold/50 group-hover:bg-hs-gold/20">
            {item.badgeTag}
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-hs-cream/60 transition-all duration-300 group-hover:border-hs-gold/50 group-hover:bg-hs-gold/15 group-hover:text-hs-gold">
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        {/* Centerpiece Icon & Title */}
        <div className="relative z-10 my-6 flex flex-1 flex-col items-center justify-center text-center">
          {/* Icon Pod with 3D Depth */}
          <div
            style={{ transform: "translateZ(30px)" }}
            className="mb-5 transition-transform duration-500"
          >
            {item.iconRender}
          </div>

          <h3 className="font-display text-2xl tracking-tight text-hs-cream transition-colors duration-300 group-hover:text-hs-gold-pale sm:text-2xl">
            {item.title}
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-hs-cream/70 transition-colors duration-300 group-hover:text-hs-cream/90 sm:text-sm">
            {item.subtitle}
          </p>

          {item.extraMeta && (
            <div className="mt-3.5 flex items-center justify-center">
              {item.extraMeta}
            </div>
          )}
        </div>

        {/* Bottom Action Pill */}
        <div className="relative z-10 pt-2">
          <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 px-4 text-xs font-medium tracking-wide text-hs-cream/80 transition-all duration-300 group-hover:border-hs-gold/40 group-hover:bg-hs-gold/[0.12] group-hover:text-hs-gold-pale">
            <span>{item.actionText}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

/* ─── Main Section Component ─── */
export function AccoladesPortals() {
  return (
    <section
      aria-labelledby="accolades-portals-title"
      className="relative overflow-hidden bg-hs-green-deep py-12 md:py-16 lg:py-20 text-hs-cream"
    >
      {/* Top Hairline Separator with Golden Flare */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-hs-gold/40 to-transparent"
      />

      {/* Atmospheric Ambient Light Blooms */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-hs-gold/5 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]"
      />

      <div className="shell relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp as="p" className="eyebrow justify-center mb-6">
            Recognitions &amp; Partners
          </FadeUp>

          <TextReveal
            as="h2"
            id="accolades-portals-title"
            className="font-display text-h2"
            lines={[
              "Our Accolades",
              <em key="k" className="text-gold-gradient">
                &amp; Online Portals.
              </em>,
            ]}
          />

          <FadeUp delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lead text-hs-cream/80">
              Explore our verified credentials, read dining reviews, or order directly
              to your door.
            </p>
          </FadeUp>
        </div>

        {/* 5-Card Grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
          {portals.map((item, idx) => (
            <TiltPortalCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* Bottom Trust Seal Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 border-t border-hs-gold/15 pt-8 text-xs tracking-wider text-hs-cream/60"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-hs-cream/80">100% Independently Verified Dining & Delivery</span>
          </div>
          <span className="hidden text-hs-gold/40 sm:inline">•</span>
          <div>Australian Good Food Guide Readers&apos; Choice 2026</div>
          <span className="hidden text-hs-gold/40 sm:inline">•</span>
          <div>Victoria Street, Bunbury WA</div>
        </motion.div>
      </div>

      {/* Bottom Hairline Separator */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-hs-gold/40 to-transparent"
      />
    </section>
  );
}
