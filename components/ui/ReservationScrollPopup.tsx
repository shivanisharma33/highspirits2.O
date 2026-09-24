"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Close } from "@/components/ui/Icons";
import { media } from "@/lib/images";

export function ReservationScrollPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFolded, setIsFolded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"reserve" | "takeaway">("reserve");
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState("7:15 PM");

  const scrollThresholdRef = useRef(35);

  const closePopup = useCallback(() => {
    setIsFolded(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 450);
  }, []);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setIsOpen(true);
      if (window.scrollY > scrollThresholdRef.current) {
        setIsFolded(true);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll and wheel to fold up and completely dismiss
  useEffect(() => {
    if (!isOpen || isFolded) return;

    let dismissTimer: NodeJS.Timeout;

    const triggerFoldAndDismiss = () => {
      setIsFolded(true);
      // Wait for fold animation to complete, then close completely
      dismissTimer = setTimeout(() => {
        setIsOpen(false);
      }, 500);
    };

    const onScroll = () => {
      if (window.scrollY > scrollThresholdRef.current) {
        triggerFoldAndDismiss();
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 15) {
        triggerFoldAndDismiss();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      if (touchStartY - touchY > 25) {
        triggerFoldAndDismiss();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      clearTimeout(dismissTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isOpen, isFolded]);

  // Keyboard and Custom Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closePopup();
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
      setIsFolded(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-reservation-popup", handleCustomOpen);

    if (typeof window !== "undefined") {
      (window as unknown as { openReservationPopup?: () => void }).openReservationPopup = () => {
        setIsOpen(true);
        setIsFolded(false);
      };
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-reservation-popup", handleCustomOpen);
    };
  }, [isOpen, closePopup]);

  if (!mounted || !isOpen) return null;

  return (
    <>
      {/* Dimmed Atmospheric Backdrop (fades out completely when folded) */}
      <div
        role="presentation"
        onClick={closePopup}
        className={`fixed inset-0 z-[90] bg-black/85 backdrop-blur-md transition-opacity duration-500 ${
          isFolded
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      />

      {/* Main Container: Remains Centered and Rolls/Folds Away on Scroll */}
      <div
        role="dialog"
        aria-modal={!isFolded}
        aria-label="Reserve your seat at the table"
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[430px] sm:max-w-[470px] p-4 sm:p-0 z-[100] transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isFolded
            ? "opacity-0 -translate-y-[60%] scale-95 pointer-events-none"
            : "opacity-100 scale-100 pointer-events-auto"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Soft Ambient Gold Glow behind scroll */}
        {!isFolded && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-b from-amber-400/25 via-emerald-500/15 to-amber-500/10 blur-3xl opacity-80"
          />
        )}

        {/* =========================================================================
            TOP SCROLL ROD & ROLL
            ========================================================================= */}
        <div className="relative z-20 flex items-center justify-center">
          {/* Dismiss Button */}
          <button
            onClick={closePopup}
            aria-label="Close popup"
            className="absolute -top-3.5 -right-2 sm:-right-4 z-30 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#031c13] text-amber-200 border-2 border-amber-400/70 shadow-[0_4px_16px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-110 hover:bg-amber-400 hover:text-[#031c13] hover:border-amber-400 focus:outline-none cursor-pointer"
          >
            <Close size={15} />
          </button>

          {/* Left Ornate Brass Knob with Hanging Tassel */}
          <div className="relative shrink-0 flex items-center">
            <div
              className="rounded-l-full shadow-md border-y border-l border-amber-200/60 h-5 w-7 sm:w-8"
              style={{
                background:
                  "linear-gradient(180deg, #d4af37 0%, #fae69e 30%, #b8860b 70%, #5d4207 100%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 6px rgba(0,0,0,0.4)",
              }}
            />
            {/* Hanging Golden Tassel (Desktop) */}
            <div
              aria-hidden
              className="hidden sm:block absolute top-4 left-1 w-2.5 h-10 pointer-events-none opacity-85"
            >
              <div className="w-[1.5px] h-3 bg-amber-400/80 mx-auto" />
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-sm" />
              <div className="w-2 h-5 bg-gradient-to-b from-amber-400 to-amber-700 mx-auto rounded-b-sm shadow-sm" />
            </div>
          </div>

          {/* Top Rolled Cylinder */}
          <div
            className="relative -mx-1 w-full rounded-[22px] shadow-xl overflow-hidden border-t border-amber-300/40 flex items-center justify-center h-12 sm:h-13"
            style={{
              background:
                "linear-gradient(180deg, #052a1d 0%, #0d4632 25%, #166448 48%, #0d4330 75%, #041c13 100%)",
              boxShadow:
                "0 8px 18px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.25), inset 0 -2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* Horizontal Cylinder Light Shimmer */}
            <div className="absolute inset-x-0 top-1 h-[1.5px] bg-gradient-to-r from-transparent via-amber-200/50 to-transparent blur-[0.5px]" />
            <div className="absolute inset-x-0 bottom-1 h-[1.5px] bg-black/50" />

            {/* Floating Golden Peacock Emblem */}
            <div className="relative z-10 flex items-center justify-center gap-2">
              <div className="relative h-6 w-6">
                <Image
                  src="/logo-mark.png"
                  alt="High Spirits Peacock Emblem"
                  fill
                  className="object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  sizes="24px"
                />
              </div>
              <span className="text-[11px] tracking-[0.25em] font-bold text-amber-200 uppercase drop-shadow-sm">
                High Spirits · Bunbury
              </span>
            </div>
          </div>

          {/* Right Ornate Brass Knob with Hanging Tassel */}
          <div className="relative shrink-0 flex items-center">
            <div
              className="rounded-r-full shadow-md border-y border-r border-amber-200/60 h-5 w-7 sm:w-8"
              style={{
                background:
                  "linear-gradient(180deg, #d4af37 0%, #fae69e 30%, #b8860b 70%, #5d4207 100%)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 6px rgba(0,0,0,0.4)",
              }}
            />
            {/* Hanging Golden Tassel (Desktop) */}
            <div
              aria-hidden
              className="hidden sm:block absolute top-4 right-1 w-2.5 h-10 pointer-events-none opacity-85"
            >
              <div className="w-[1.5px] h-3 bg-amber-400/80 mx-auto" />
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-sm" />
              <div className="w-2 h-5 bg-gradient-to-b from-amber-400 to-amber-700 mx-auto rounded-b-sm shadow-sm" />
            </div>
          </div>
        </div>

        {/* =========================================================================
            MAIN SCROLL BODY / BANNER (Folds/rolls up into the rod on scroll)
            ========================================================================= */}
        <div
          className={`relative z-10 w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isFolded
              ? "max-h-0 scale-y-0 opacity-0 -mt-2 pointer-events-none"
              : "max-h-[820px] scale-y-100 opacity-100 -mt-4 shadow-2xl pointer-events-auto"
          }`}
          style={{
            transformOrigin: "top center",
            background:
              "radial-gradient(ellipse at 50% 10%, #0e4c35 0%, #073826 42%, #032015 100%)",
            boxShadow: isFolded
              ? "none"
              : "0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 12px 28px -5px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(212, 175, 55, 0.3)",
          }}
        >
          {/* Scroll Content Padding */}
          <div className="pt-8 pb-7 px-5 sm:px-7">
            {/* Double Ornate Border: Outer Gold Hairline + Inner White Contour */}
            <div className="pointer-events-none absolute inset-x-3 sm:inset-x-3.5 top-3.5 bottom-3">
              <svg
                className="w-full h-full"
                viewBox="0 0 380 540"
                preserveAspectRatio="none"
                fill="none"
              >
                {/* Subtle outer gold guide */}
                <path
                  d="M 3 3 L 377 3 L 377 494 A 42 42 0 0 0 338 536 L 42 536 A 42 42 0 0 0 3 494 Z"
                  stroke="#d4af37"
                  strokeOpacity="0.4"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Main White Concave Frame */}
                <path
                  d="M 0 0 L 380 0 L 380 490 A 42 42 0 0 0 338 532 L 42 532 A 42 42 0 0 0 0 490 Z"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Gold Diamond Accents */}
                <circle cx="42" cy="532" r="3" fill="#f8e79c" />
                <circle cx="338" cy="532" r="3" fill="#f8e79c" />
              </svg>
            </div>

            {/* Content Stack */}
            <div className="relative z-10 flex flex-col items-center text-center text-white">
              {/* Interactive Tabs: Dine-In Table vs Order Takeaway */}
              <div className="grid grid-cols-2 gap-1 p-1 rounded-full bg-black/40 border border-amber-300/30 mb-4 w-full max-w-[310px]">
                <button
                  type="button"
                  onClick={() => setActiveTab("reserve")}
                  className={`py-1.5 px-3 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    activeTab === "reserve"
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-md font-black"
                      : "text-amber-100/70 hover:text-white"
                  }`}
                >
                  🍽️ Dine-in Table
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("takeaway")}
                  className={`py-1.5 px-3 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    activeTab === "takeaway"
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-md font-black"
                      : "text-amber-100/70 hover:text-white"
                  }`}
                >
                  🥡 Takeaway Order
                </button>
              </div>

              {/* TAB 1: DINE-IN RESERVATION */}
              {activeTab === "reserve" && (
                <div className="flex flex-col items-center w-full animate-fadeIn">
                  {/* Eyebrow Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-[10px] tracking-[0.22em] text-amber-200 uppercase font-semibold mb-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>Victoria St · Bunbury</span>
                  </div>

                  {/* Main Heading */}
                  <h2
                    className="text-[1.35rem] sm:text-[1.65rem] font-black uppercase tracking-tight leading-[1.12] mb-3 drop-shadow-md"
                    style={{
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    }}
                  >
                    <span className="text-white block">RESERVE YOUR SEAT</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
                      AT THE TABLE
                    </span>
                  </h2>

                  {/* Paragraph Description */}
                  <p className="font-mono text-xs sm:text-[12px] leading-relaxed text-amber-50/90 max-w-[320px] mb-4 font-normal drop-shadow-sm">
                    We offer limited seats for a truly intimate experience. Reserve in advance to enjoy our full-service dine-in or pick up your favorite dishes to go.
                  </p>

                  {/* Interactive Quick-Booking Controls */}
                  <div className="w-full max-w-[340px] rounded-xl bg-black/30 border border-amber-300/25 p-3 mb-4 backdrop-blur-sm">
                    {/* Party Size Selector */}
                    <div className="flex items-center justify-between gap-1 mb-2.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200/80">Party Size:</span>
                      <div className="flex items-center gap-1">
                        {[2, 4, 6, 8].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setSelectedGuests(num)}
                            className={`h-7 px-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                              selectedGuests === num
                                ? "bg-amber-400 text-black shadow-sm font-black scale-105"
                                : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                          >
                            {num}{num === 8 ? "+" : ""}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preferred Time Slot */}
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200/80">Time Slot:</span>
                      <div className="flex items-center gap-1">
                        {["6:00 PM", "7:15 PM", "8:30 PM"].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`h-7 px-2 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                              selectedTime === time
                                ? "bg-amber-400 text-black shadow-sm font-black scale-105"
                                : "bg-white/10 text-white hover:bg-white/20"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Online Reservation Status */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <h4
                      className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-amber-200 drop-shadow"
                      style={{
                        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      }}
                    >
                      ONLINE RESERVATION SYSTEM
                    </h4>
                  </div>

                  {/* Action Button: BOOK A TABLE with Notched Inverted Corners */}
                  <Link
                    href={`/reservation?guests=${selectedGuests}&time=${encodeURIComponent(selectedTime)}`}
                    onClick={closePopup}
                    className="group relative inline-flex items-center justify-center px-9 py-2.5 transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                  >
                    {/* Button Ambient Glow */}
                    <div className="absolute inset-0 rounded-lg bg-amber-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* SVG Button Border with 4 Inward Concave Notched Corners */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 200 48"
                        preserveAspectRatio="none"
                        fill="none"
                      >
                        <path
                          d="M 8 0 L 192 0 A 8 8 0 0 0 200 8 L 200 40 A 8 8 0 0 0 192 48 L 8 48 A 8 8 0 0 0 0 40 L 0 8 A 8 8 0 0 0 8 0 Z"
                          stroke="#f9e79f"
                          strokeWidth="2.4"
                          className="transition-all duration-300 group-hover:fill-amber-300 group-hover:stroke-amber-200"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>

                    {/* Sweeping Shimmer glint across button */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
                    </div>

                    {/* Button Text */}
                    <span className="relative z-10 text-xs sm:text-[13px] font-black uppercase tracking-[0.22em] text-white transition-colors duration-300 group-hover:text-[#032015] flex items-center gap-2">
                      <span>BOOK A TABLE</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </Link>

                  {/* Subtext link to takeaway */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("takeaway")}
                    className="mt-3 text-[11px] text-amber-200/80 hover:text-white underline underline-offset-4 tracking-wide font-medium cursor-pointer transition-colors"
                  >
                    Looking to pick up food? Order Takeaway Online
                  </button>
                </div>
              )}

              {/* TAB 2: ORDER TAKEAWAY */}
              {activeTab === "takeaway" && (
                <div className="flex flex-col items-center w-full animate-fadeIn">
                  {/* Dish Showcase Card */}
                  <div className="relative w-full max-w-[330px] h-32 rounded-xl overflow-hidden mb-3 border border-amber-300/30 shadow-md">
                    <Image
                      src={media.dishButterChickenHd.src}
                      alt="High Spirits Butter Chicken"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="330px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-black uppercase tracking-wider">
                      Ready in 25 Mins
                    </div>
                    <div className="absolute bottom-2 left-3 text-left">
                      <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                        Direct Kitchen Pickup
                      </span>
                      <span className="text-xs font-black text-white">
                        Curries · Biryanis · Fresh Naans
                      </span>
                    </div>
                  </div>

                  {/* Main Takeaway Heading */}
                  <h3
                    className="text-base sm:text-lg font-black uppercase tracking-wide text-white leading-tight mb-2"
                    style={{
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    }}
                  >
                    ORDER TAKEAWAY DIRECTLY
                    <br />
                    <span className="text-amber-200">THROUGH OUR WEBSITE</span>
                  </h3>

                  <p className="font-mono text-xs text-amber-50/80 leading-relaxed max-w-[310px] mb-4">
                    Skip third-party fees. Order fresh, authentic Punjabi cuisine directly from our Bunbury kitchen.
                  </p>

                  {/* Action Button: ORDER TAKEAWAY NOW */}
                  <Link
                    href="/menu"
                    onClick={closePopup}
                    className="group relative inline-flex items-center justify-center px-9 py-2.5 transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                  >
                    {/* Button Ambient Glow */}
                    <div className="absolute inset-0 rounded-lg bg-amber-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* SVG Button Border with 4 Inward Concave Notched Corners */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 200 48"
                        preserveAspectRatio="none"
                        fill="none"
                      >
                        <path
                          d="M 8 0 L 192 0 A 8 8 0 0 0 200 8 L 200 40 A 8 8 0 0 0 192 48 L 8 48 A 8 8 0 0 0 0 40 L 0 8 A 8 8 0 0 0 8 0 Z"
                          stroke="#f9e79f"
                          strokeWidth="2.4"
                          className="transition-all duration-300 group-hover:fill-amber-300 group-hover:stroke-amber-200"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>

                    {/* Sweeping Shimmer glint across button */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
                    </div>

                    {/* Button Text */}
                    <span className="relative z-10 text-xs sm:text-[13px] font-black uppercase tracking-[0.22em] text-white transition-colors duration-300 group-hover:text-[#032015] flex items-center gap-2">
                      <span>BROWSE MENU &amp; ORDER</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </Link>

                  {/* Subtext link back to dine in */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("reserve")}
                    className="mt-3 text-[11px] text-amber-200/80 hover:text-white underline underline-offset-4 tracking-wide font-medium cursor-pointer transition-colors"
                  >
                    Want to dine in? Reserve a Table instead
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Rod Weight Bar for authentic hanging royal edict */}
          <div className="h-2 w-full bg-gradient-to-r from-amber-500/20 via-amber-300/70 to-amber-500/20 border-t border-amber-300/30" />
        </div>
      </div>
    </>
  );
}
