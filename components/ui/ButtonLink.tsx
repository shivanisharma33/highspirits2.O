import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/format";
import { ArrowRight, ArrowUpRight } from "./Icons";

type Variant = "gold" | "ghost" | "dark" | "outline-dark";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  arrow?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function ButtonLink({ href, children, variant = "gold", external, arrow = true, className, ...rest }: Props) {
  const cls = cx("btn", `btn-${variant}`, className);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Icon className="btn-arrow" size={15} />}
    </>
  );

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
