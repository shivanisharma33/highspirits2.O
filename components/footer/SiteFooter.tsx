import Link from "next/link";
import { FadeUp } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowUpRight, Facebook, Instagram } from "@/components/ui/Icons";
import { addressLines, hours, legalNav, primaryNav, site } from "@/lib/site";

const listLink = "link-line text-hs-cream/75 transition-colors hover:text-hs-cream";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-hs-green-deep text-hs-cream" aria-labelledby="footer-title">
      <Aurora />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70vw] -translate-x-1/2 rounded-[50%] bg-hs-green-light/40 blur-3xl" />

      <div className="shell relative pt-24 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <FadeUp className="lg:col-span-5">
            <p className="eyebrow mb-6">Your table awaits</p>
            <h2 id="footer-title" className="font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.02] tracking-tight">
              Come for the flavours.
              <br />
              <em className="text-gold-gradient">Stay for the experience.</em>
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/reservation">Reserve a Table</ButtonLink>
              <ButtonLink href="/menu" variant="ghost">
                Explore Menu
              </ButtonLink>
            </div>
          </FadeUp>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
            <FadeUp delay={0.05}>
              <h3 className="eyebrow eyebrow--plain mb-6">Explore</h3>
              <ul className="grid gap-2 text-[0.95rem]">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={listLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/reservation" className={listLink}>
                    Reservations
                  </Link>
                </li>
              </ul>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h3 className="eyebrow eyebrow--plain mb-6">Visit</h3>
              <address className="not-italic text-[0.95rem] leading-relaxed text-hs-cream/75">
                {addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <div className="mt-6 grid gap-3 text-[0.95rem] text-hs-cream/75">
                {hours.map((h) => (
                  <p key={h.label}>
                    <span className="block text-hs-cream">{h.label}</span>
                    {h.days}
                    <br />
                    {h.time}
                  </p>
                ))}
              </div>
              <ul className="mt-6 grid gap-2 text-[0.95rem]">
                <li>
                  <a href={site.phone.href} className={listLink}>
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className={`${listLink} break-all`}>
                    {site.email}
                  </a>
                </li>
              </ul>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h3 className="eyebrow eyebrow--plain mb-6">Social</h3>
              <ul className="grid gap-2 text-[0.95rem]">
                <li>
                  <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className={listLink}>
                    <Instagram size={15} /> Instagram
                  </a>
                </li>
                <li>
                  <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className={listLink}>
                    <Facebook size={15} /> Facebook
                  </a>
                </li>
                <li>
                  <a href={site.listings.tripadvisor} target="_blank" rel="noopener noreferrer" className={listLink}>
                    Tripadvisor <ArrowUpRight size={13} />
                  </a>
                </li>
                <li>
                  <a href={site.listings.uberEats} target="_blank" rel="noopener noreferrer" className={listLink}>
                    Order on Uber Eats <ArrowUpRight size={13} />
                  </a>
                </li>
              </ul>
            </FadeUp>
          </div>
        </div>

        <div className="gold-rule mt-24" />

        <p
          aria-hidden
          className="font-display select-none pb-2 pt-10 text-center text-[clamp(4.2rem,20.5vw,21rem)] leading-[0.8] tracking-[-0.045em] text-hs-cream/[0.92]"
        >
          HIGH
          {/* Bottom padding keeps the descender inside the gradient's paint box. */}
          <span className="block pb-[0.18em] text-gold-gradient italic">Spirits</span>
        </p>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-hs-cream/10 py-8 text-xs tracking-[0.12em] text-hs-cream/55 sm:flex-row sm:items-center">
          <p>© {year} High Spirits. All rights reserved.</p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line hover:text-hs-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>Bunbury, Western Australia</p>
        </div>
      </div>
    </footer>
  );
}
