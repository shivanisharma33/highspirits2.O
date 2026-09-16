import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { IntroLines } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { media } from "@/lib/images";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-hs-green-dark pt-[var(--header-h)]">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <Image src={media.heroDish3.src} alt="" fill sizes="42vw" placeholder="blur" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-linear-to-r from-hs-green-dark via-hs-green-dark/40 to-transparent" />
      </div>

      <div className="shell relative py-24">
        <p className="eyebrow intro-rise mb-8" style={d(0.1)}>
          Error 404 · Page not found
        </p>
        <IntroLines
          as="h1"
          lines={["This table", <em key="e" className="text-gold-gradient">isn’t set.</em>]}
          className="font-display text-h1 max-w-4xl"
        />
        <p className="intro-rise mt-8 max-w-lg text-lead text-hs-cream/75" style={d(0.6)}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us seat you somewhere delicious instead.
        </p>
        <div className="intro-rise mt-12 flex flex-wrap gap-3" style={d(0.8)}>
          <ButtonLink href="/">Return Home</ButtonLink>
          <ButtonLink href="/menu" variant="ghost">
            Explore Menu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
