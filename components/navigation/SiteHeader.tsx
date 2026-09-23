"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useCart } from "@/components/cart/CartContext";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Close, Facebook, Instagram, ShoppingBag } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { lockScroll } from "@/lib/lenis";
import { addressLines, hours, primaryNav, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Scroll lock, focus management and keyboard handling while the menu is open.
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const panel = panelRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    const timer = window.setTimeout(() => focusables()[1]?.focus(), 300);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, close]);

  // The journal and menu open on a cream masthead, where the bare cream nav would vanish without the glass pill.
  const lightTop = pathname.startsWith("/blogs") || pathname.startsWith("/menu");

  return (
    <header data-scrolled={scrolled || lightTop} className="site-header fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-hs-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-hs-green-deep focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div className="header-inner relative">
        <div aria-hidden className="header-glass glass pointer-events-none absolute inset-x-[max(0.75rem,calc(var(--gutter)*0.55))] inset-y-2 rounded-full" />
        <div className="shell relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <div className="header-logo">
            <Logo />
          </div>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-7 2xl:gap-9">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link" aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={openCart}
              aria-label={`View your order (${totalCount} ${totalCount === 1 ? "item" : "items"})`}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-hs-cream/25 text-hs-cream transition-colors hover:border-hs-gold hover:text-hs-gold"
            >
              <ShoppingBag size={18} />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-hs-gold px-1 text-[0.65rem] font-bold text-hs-green-deep shadow-md">
                  {totalCount}
                </span>
              )}
            </button>
            <ButtonLink href="/reservation" className="hidden min-h-11! px-5! text-[0.66rem]! sm:inline-flex" arrow={false}>
              Reserve a Table
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="group inline-flex h-11 items-center gap-3 rounded-full border border-hs-cream/25 pl-4 pr-3 text-[0.66rem] font-medium uppercase tracking-[0.24em] text-hs-cream transition-colors hover:border-hs-gold xl:hidden"
            >
              Menu
              <span aria-hidden className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current transition-transform duration-500 group-hover:translate-x-0.5" />
                <span className="h-px w-3/5 self-end bg-hs-gold transition-transform duration-500 group-hover:-translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-open={open}
        inert={!open}
        className="mobile-menu grain fixed inset-0 z-[55] overflow-y-auto bg-hs-green-deep"
        data-lenis-prevent
      >
        <div className="shell flex min-h-full flex-col pb-10">
          <div className="flex h-[var(--header-h)] items-center justify-between">
            <Logo onClick={close} />
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openCart();
                }}
                aria-label={`View your order (${totalCount} items)`}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-hs-cream/25 text-hs-cream transition-colors hover:border-hs-gold hover:text-hs-gold"
              >
                <ShoppingBag size={18} />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-hs-gold px-1 text-[0.65rem] font-bold text-hs-green-deep shadow-md">
                    {totalCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hs-cream/25 text-hs-cream transition-colors hover:border-hs-gold hover:text-hs-gold"
                aria-label="Close menu"
              >
                <Close size={18} />
              </button>
            </div>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex-1 md:mt-14">
            <ol className="grid gap-1">
              {primaryNav.map((item, i) => (
                <li key={item.href} className="mm-item" style={{ "--i": i } as CSSProperties}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="group flex items-baseline gap-5 border-b border-hs-cream/10 py-3 aria-[current=page]:text-hs-gold md:py-4"
                  >
                    <span className="w-6 text-[0.65rem] tracking-[0.2em] text-hs-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[clamp(2.1rem,8vw,4.2rem)] leading-none transition-transform duration-700 ease-luxe group-hover:translate-x-2">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mm-item mt-10 grid gap-8 sm:grid-cols-2" style={{ "--i": primaryNav.length } as CSSProperties}>
            <div className="text-sm leading-relaxed text-hs-cream/70">
              <p className="eyebrow eyebrow--plain mb-3">Visit</p>
              {addressLines.map((l) => (
                <p key={l}>{l}</p>
              ))}
              <p className="mt-3">
                <a href={site.phone.href} className="link-line text-hs-cream">
                  {site.phone.display}
                </a>
              </p>
            </div>
            <div className="text-sm leading-relaxed text-hs-cream/70">
              <p className="eyebrow eyebrow--plain mb-3">Hours</p>
              {hours.map((h) => (
                <p key={h.label}>
                  <span className="text-hs-cream">{h.label}</span> · {h.days}, {h.time}
                </p>
              ))}
              <div className="mt-4 flex gap-3">
                <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="High Spirits on Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hs-cream/20 hover:border-hs-gold hover:text-hs-gold">
                  <Instagram size={17} />
                </a>
                <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="High Spirits on Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hs-cream/20 hover:border-hs-gold hover:text-hs-gold">
                  <Facebook size={17} />
                </a>
              </div>
            </div>
          </div>
          <div className="mm-item mt-10 flex flex-col sm:flex-row gap-3" style={{ "--i": primaryNav.length + 1 } as CSSProperties}>
            <ButtonLink href="/reservation" className="w-full sm:w-auto">
              Reserve a Table
            </ButtonLink>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openCart();
              }}
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-hs-gold/40 bg-hs-gold/10 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-hs-gold transition-colors hover:bg-hs-gold hover:text-hs-green-deep"
            >
              <ShoppingBag size={16} />
              <span>Your Cart ({totalCount})</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
