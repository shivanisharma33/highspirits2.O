import type { CSSProperties, ReactNode } from "react";
import { IntroLines } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export type LegalSection = { title: string; intro?: string; items?: string[]; body?: ReactNode };

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** Quiet, highly legible layout for policy pages. */
export function LegalPage({ eyebrow, title, lastUpdated, sections }: { eyebrow: string; title: string; lastUpdated?: string; sections: LegalSection[] }) {
  return (
    <>
      <section aria-labelledby="legal-title" className="grain bg-hs-green-deep pb-16 pt-[calc(var(--header-h)+5rem)]">
        <div className="shell">
          <p className="eyebrow intro-rise" style={d(0.1)}>
            {eyebrow}
          </p>
          <IntroLines as="h1" id="legal-title" className="font-display mt-8 text-h1" lines={[title]} start={0.2} />
          {lastUpdated && (
            <p className="mt-4 text-sm text-hs-cream/60 tracking-wide intro-rise" style={d(0.3)}>
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </section>

      <section className="surface-light bg-hs-cream py-20 text-hs-text md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-32 grid gap-3 border-t border-hs-line pt-6 text-sm text-hs-muted">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#s-${i}`} className="link-line hover:text-hs-green">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="max-w-2xl lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.title} id={`s-${i}`} aria-labelledby={`s-${i}-t`} className="border-b border-hs-line py-10 first:pt-0 last:border-0">
                <h2 id={`s-${i}-t`} className="font-display text-h3 text-hs-green">
                  {s.title}
                </h2>
                {s.intro && <p className="mt-5 leading-relaxed text-hs-text/80">{s.intro}</p>}
                {s.items && (
                  <ul className="mt-5 grid gap-3">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-4 leading-relaxed text-hs-text/80">
                        <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rotate-45 bg-hs-gold-deep" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {s.body && <div className="mt-5 leading-relaxed text-hs-text/80">{s.body}</div>}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalContact() {
  return (
    <address className="not-italic">
      {site.name}, {site.address.street}, {site.address.locality} {site.address.region} {site.address.postcode}
      <br />
      Email:{" "}
      <a href={`mailto:${site.email}`} className="link-line text-hs-green">
        {site.email}
      </a>
      <br />
      Phone:{" "}
      <a href={site.phone.href} className="link-line text-hs-green">
        {site.phone.display}
      </a>
    </address>
  );
}
