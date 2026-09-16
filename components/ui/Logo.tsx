import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/format";

export function LogoMark({ className }: { className?: string }) {
  return <Image src="/logo-mark.png" alt="" width={262} height={451} sizes="48px" className={cx("h-auto", className)} />;
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="High Spirits — home" className={cx("group inline-flex items-center gap-3", className)}>
      <LogoMark className="w-[1.45rem] transition-transform duration-700 ease-luxe group-hover:-rotate-6 md:w-[1.6rem]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.02rem] tracking-[0.2em] text-hs-cream md:text-[1.12rem]">HIGH SPIRITS</span>
        <span className="mt-1.5 text-[0.5rem] font-medium uppercase tracking-[0.46em] text-hs-gold">Indian Restaurant</span>
      </span>
    </Link>
  );
}
