"use client";

import Link from "next/link";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { Aurora } from "@/components/ui/Aurora";
import { ArrowRight } from "@/components/ui/Icons";

function MapPinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-4-4.5-7-8.5-7-12a7 7 0 1 1 14 0c0 3.5-3 7.5-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function SparkleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
    </svg>
  );
}

function AwardIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function CompassIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

function CrownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}

const MILESTONE_ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  "2015": MapPinIcon,
  "2017": SparkleIcon,
  "2020": AwardIcon,
  "2023": CompassIcon,
  "2026": CrownIcon,
};

export type Milestone = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export const MILESTONES: Milestone[] = [
  {
    id: "vision-2015",
    year: "2015",
    title: "The Vision",
    description:
      "Born from a dream to bring authentic North Indian fine dining to Australia, High Spirits was conceived in the vibrant culinary scene of Melbourne.",
  },
  {
    id: "debut-2017",
    year: "2017",
    title: "Opening Night",
    description:
      "Our doors opened to Melbourne's elite, introducing a revolutionary fusion of authentic Indian flavours with Australian produce.",
  },
  {
    id: "acclaim-2020",
    year: "2020",
    title: "Chef of the Year",
    description:
      "Executive Chef Amardeep Singh was crowned Chef of the Year by the Australian Culinary Federation, gaining national acclaim for culinary excellence.",
  },
  {
    id: "bunbury-2023",
    year: "2023",
    title: "Destination Bunbury",
    description:
      "Bringing our culinary legacy to 1/57 Victoria Street in Bunbury, crafting an intimate destination for refined fine dining and lavish buffets.",
  },
  {
    id: "today-2026",
    year: "2026",
    title: "A Legacy of Excellence",
    description:
      "Today, High Spirits stands as Western Australia's celebrated benchmark for modern Indian gastronomy, celebrated by more than 560 five-star reviews.",
  },
];

export function JourneySection() {
  return (
    <div className="grain relative overflow-hidden bg-[#041710] py-16 text-white lg:py-0">
      <Aurora />

      <HorizontalScroll
        label="Our Journey: A Legacy of Excellence"
        trackClassName="gap-4 px-[var(--gutter)] md:gap-5 lg:items-center"
      >
        {/* Intro Header Panel (Reduced space) */}
        <div
          data-panel
          className="flex w-[80vw] shrink-0 flex-col justify-center pr-4 sm:w-[50vw] lg:h-[56vh] lg:w-[28vw] lg:pr-10"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-px w-5 bg-[#F3B755]" />
            <p className="eyebrow text-[#F3B755]">
              OUR JOURNEY
            </p>
          </div>

          <h2
            id="journey-title"
            className="font-display mt-3.5 text-[clamp(2.2rem,4.4vw,3.8rem)] font-normal leading-[1.06] tracking-tight text-white"
          >
            A Legacy of <em className="italic text-[#F3B755]">Excellence</em>
          </h2>

          <p className="mt-4 max-w-xs text-xs font-light leading-relaxed text-white/75 sm:text-sm">
            From humble beginnings to Australia&apos;s most celebrated Indian fine dining destination.
          </p>

          <div className="mt-7 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.26em] text-[#F3B755]">
            <span className="hidden lg:inline">Scroll to explore</span>
            <span className="lg:hidden">Swipe to explore</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Milestone Cards (Tight, Elegant & Clean with fine luxury line icons) */}
        {MILESTONES.map((m) => {
          const IconComponent = MILESTONE_ICONS[m.year] ?? SparkleIcon;

          return (
            <article
              key={m.id}
              data-panel
              aria-labelledby={`milestone-${m.id}`}
              className="group relative flex h-[380px] w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#0a2c1f] via-[#072419] to-[#041710] p-6 shadow-xl transition-all duration-300 hover:border-[#F3B755]/50 hover:shadow-[0_15px_40px_-15px_rgba(243,183,85,0.2)] sm:w-[330px] sm:p-7 lg:h-[50vh] lg:min-h-[350px] lg:w-[350px]"
            >
              <div>
                {/* Icon in Circle + Year */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F3B755]/40 bg-[#F3B755]/10 text-[#F3B755] shadow-[0_0_15px_rgba(243,183,85,0.2)] transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
                    <IconComponent className="h-4 w-4" />
                  </div>

                  <span className="font-display text-3xl font-bold tracking-tight text-[#F3B755] sm:text-4xl">
                    {m.year}
                  </span>
                </div>

                {/* Title */}
                <h3
                  id={`milestone-${m.id}`}
                  className="font-display mt-5 text-xl font-normal text-white sm:text-2xl"
                >
                  {m.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs font-light leading-relaxed text-white/80 sm:text-sm">
                  {m.description}
                </p>
              </div>

              {/* Minimal bottom accent hairline */}
              <div className="pt-3 border-t border-white/5">
                <span className="h-0.5 w-8 bg-[#F3B755]/30 block transition-all duration-300 group-hover:w-14 group-hover:bg-[#F3B755]" />
              </div>
            </article>
          );
        })}

        {/* Final Outro Card (Tight & Proportional) */}
        <div
          data-panel
          className="flex h-[380px] w-[78vw] shrink-0 flex-col justify-between rounded-[1.75rem] border border-[#F3B755]/35 bg-gradient-to-br from-[#0c3324] via-[#072419] to-[#041710] p-6 shadow-xl sm:w-[330px] sm:p-7 lg:h-[50vh] lg:min-h-[350px] lg:w-[350px]"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F3B755]/40 bg-[#F3B755]/10 px-3 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#F3B755]">
              <span>✦</span>
              <span>TRADITION</span>
            </div>

            <h3 className="font-display mt-4 text-xl font-normal leading-snug text-white sm:text-2xl">
              Be Part of Our <em className="italic text-[#F3B755]">Next Chapter</em>
            </h3>

            <p className="mt-2.5 text-xs font-light leading-relaxed text-white/75">
              Join us for an unforgettable dining experience in Bunbury, WA.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10">
            <Link
              href="/reservation"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F3B755] px-5 py-2.5 text-xs font-semibold text-[#041710] shadow-md transition-all duration-300 hover:bg-[#e2a440] hover:scale-[1.02]"
            >
              <span>Reserve a Table</span>
              <span>→</span>
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:border-[#F3B755] hover:bg-white/5"
            >
              Explore Menu
            </Link>
          </div>
        </div>

        <div aria-hidden className="w-[4vw] shrink-0" />
      </HorizontalScroll>
    </div>
  );
}
