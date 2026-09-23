"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/format";
import { scrollToTop } from "@/lib/lenis";

export function LogoMark({ className }: { className?: string }) {
  return <Image src="/logo-mark.png" alt="" width={262} height={451} sizes="48px" className={cx("h-auto", className)} />;
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (pathname === "/") {
      e.preventDefault();
      scrollToTop(true);
    } else {
      scrollToTop(true);
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label="High Spirits — home"
      className={cx("group inline-flex items-center gap-3 cursor-pointer", className)}
    >
      <LogoMark className="w-[1.45rem] transition-transform duration-700 ease-luxe group-hover:-rotate-6 md:w-[1.6rem]" />
      <span className="font-display text-[1.05rem] tracking-[0.22em] text-hs-cream md:text-[1.15rem]">
        HIGH SPIRITS
      </span>
    </Link>
  );
}
