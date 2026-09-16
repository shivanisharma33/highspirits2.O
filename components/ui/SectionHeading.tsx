import type { ReactNode } from "react";
import { cx } from "@/lib/format";
import { FadeUp, TextReveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow: string;
  lines: ReactNode[];
  id?: string;
  as?: "h2" | "h3";
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
};

/** Eyebrow + masked editorial headline + optional supporting copy. */
export function SectionHeading({ eyebrow, lines, id, as = "h2", className, titleClassName, children }: Props) {
  return (
    <div className={className}>
      <FadeUp as="p" className="eyebrow mb-7">
        {eyebrow}
      </FadeUp>
      <TextReveal as={as} id={id} lines={lines} className={cx("font-display text-h2", titleClassName)} />
      {children && (
        <FadeUp delay={0.2} className="mt-8 max-w-xl text-lead opacity-80">
          {children}
        </FadeUp>
      )}
    </div>
  );
}
