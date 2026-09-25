import type { CSSProperties } from "react";
import { cx } from "@/lib/format";

type Props = {
  items: readonly string[];
  className?: string;
  duration?: number;
  label?: string;
};

/** Continuous editorial ticker. Pauses on hover; static for reduced motion. */
export function Marquee({ items, className, duration = 52, label = "High Spirits" }: Props) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="font-display px-5 text-base sm:text-xl md:text-[clamp(1.4rem,2.6vw,2.4rem)] italic tracking-tight sm:px-8 md:px-12">{item}</span>
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-hs-gold shrink-0" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={label} className={cx("marquee overflow-hidden", className)}>
      <div className="marquee-track flex w-max" style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
