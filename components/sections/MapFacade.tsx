"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin } from "@/components/ui/Icons";
import { media } from "@/lib/images";
import { cx } from "@/lib/format";
import { site } from "@/lib/site";

/**
 * Click-to-load map. Nothing from Google loads (and no API key or usage cost
 * is involved) until the visitor asks for the interactive map.
 */
export function MapFacade({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cx("relative overflow-hidden bg-hs-green", className)}>
      {loaded ? (
        <iframe
          title="Map showing High Spirits, 1/57 Victoria Street, Bunbury"
          src={site.mapEmbed}
          className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.35)_contrast(1.05)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <Image src={media.exteriorFacade.src} alt={media.exteriorFacade.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" className="object-cover opacity-45" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(hsl(42_78%_51%/0.07)_1px,transparent_1px),linear-gradient(90deg,hsl(42_78%_51%/0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div className="glass glass-edge rounded-[1.75rem] px-6 py-7 sm:px-12 sm:py-9">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-hs-gold text-hs-green-deep shadow-[0_0_0_10px_hsl(42_78%_51%/0.18)]">
                <MapPin size={24} />
              </span>
              <p className="font-display mt-6 text-2xl">1/57 Victoria Street</p>
              <p className="mt-1 text-sm text-hs-cream/70">Bunbury WA 6230</p>
              <button type="button" onClick={() => setLoaded(true)} className="btn btn-ghost mt-7">
                <span>Load interactive map</span>
              </button>
              <p className="mt-3 text-[0.68rem] text-hs-cream/50">Loads Google Maps</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
