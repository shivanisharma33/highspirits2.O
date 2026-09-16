import { cx } from "@/lib/format";
import { LogoMark } from "./Logo";

type Props = {
  text: string;
  /** Needed when more than one badge is on a page. */
  id?: string;
  /** Position and display come from the caller (e.g. "absolute hidden lg:grid"). */
  className?: string;
};

/** A slowly turning circular seal around the peacock mark. Decorative. */
export function RotatingBadge({ text, id = "badge-ring", className }: Props) {
  return (
    <div aria-hidden className={cx("aspect-square place-items-center", className)}>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text className="fill-current text-[11px] font-medium uppercase">
          <textPath href={`#${id}`} textLength={500} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[26%] rounded-full border border-current opacity-30" />
      <LogoMark className="relative w-[16%]" />
    </div>
  );
}
