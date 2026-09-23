"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useCart, type CartItem } from "@/components/cart/CartContext";
import { Close, Minus, Plus, ShoppingBag, Trash, WhatsApp } from "@/components/ui/Icons";
import { formatPrice } from "@/lib/format";
import { media } from "@/lib/images";
import { lockScroll } from "@/lib/lenis";
import { site } from "@/lib/site";

/* ── Fallback image resolver ── */
function getCartItemImage(item: CartItem): string {
  if (item.image) return item.image;
  const name = item.name.toLowerCase();
  if (name.includes("naan") || name.includes("roti") || name.includes("bread")) return media.dishGarlicNaan.src;
  if (name.includes("biryani") || name.includes("rice")) return media.dishBiryaniHd.src;
  if (name.includes("butter chicken")) return media.butterChicken.src;
  if (name.includes("paneer")) return media.dishPalakPaneerHd.src;
  if (name.includes("dal") || name.includes("chana")) return media.dishDalMakhaniHd.src;
  if (name.includes("prawn")) return media.dishPrawnCurry.src;
  if (name.includes("fish")) return media.heroDish1.src;
  if (name.includes("lamb") || name.includes("beef") || name.includes("goat") || name.includes("rogan"))
    return media.dishLambRoganJosh.src;
  if (name.includes("lassi") || name.includes("chai")) return media.heroDiningHall.src;
  if (name.includes("jamun") || name.includes("kulfi") || name.includes("rasmalai")) return media.heroDish3.src;
  if (name.includes("puri") || name.includes("samosa") || name.includes("chaat") || name.includes("bhaji") || name.includes("tikki"))
    return media.dishSamosa.src;
  if (name.includes("tandoori") || name.includes("tikka")) return media.dishTandooriChicken.src;
  return media.foodCurry.src;
}

export function CartDrawer() {
  const {
    items,
    totalCount,
    totalPrice,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState<"Takeaway" | "Dine-in" | "Delivery">("Takeaway");
  const [tableOrAddress, setTableOrAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!isOpen) return;
    lockScroll(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [isOpen, closeCart]);

  const handleWhatsAppCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMsg("Please enter your name and contact phone number.");
      return;
    }
    setErrorMsg("");

    const lines = [
      `🍽️ *New Order — High Spirits Restaurant*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `*Guest:* ${customerName.trim()}`,
      `*Phone:* ${customerPhone.trim()}`,
      `*Service:* ${orderType}${tableOrAddress.trim() ? ` (${tableOrAddress.trim()})` : ""}`,
      notes.trim() ? `*Notes:* ${notes.trim()}` : "",
      `━━━━━━━━━━━━━━━━━━━━`,
      `*Items:*`,
      ...items.map(
        (i) =>
          `• ${i.quantity}x ${i.name} — ${formatPrice(i.price * i.quantity)} (${formatPrice(i.price)} ea)`
      ),
      `━━━━━━━━━━━━━━━━━━━━`,
      `*Total:* ${formatPrice(totalPrice)} AUD (GST Incl.)`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `_Sent from highspirits.au_`,
    ]
      .filter(Boolean)
      .join("\n");

    const phone = "61420408809";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your Order"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* ── Glassmorphic Backdrop ── */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300 animate-in fade-in"
      />

      {/* ── Ultra-Sleek Obsidian Emerald Glass Drawer ── */}
      <div
        ref={drawerRef}
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#02130c]/95 backdrop-blur-3xl border-l border-hs-gold/25 text-hs-cream shadow-[-20px_0_60px_rgba(0,0,0,0.9),-1px_0_20px_rgba(212,175,55,0.15)] animate-in slide-in-from-right duration-300"
      >
        {/* ── Top Header ── */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-hs-gold/30 text-hs-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <ShoppingBag size={18} />
            </div>
            <div>
              <p className="text-[0.65rem] font-mono font-medium uppercase tracking-[0.25em] text-hs-gold">
                {showCheckout ? "Checkout" : "High Spirits"}
              </p>
              <h2 className="font-display text-xl font-normal tracking-wide text-white">
                {showCheckout ? "Order Details" : "Your Order"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!showCheckout && (
              <span className="rounded-full bg-hs-gold/15 px-2.5 py-0.5 font-mono text-xs font-semibold text-hs-gold border border-hs-gold/30">
                {totalCount} {totalCount === 1 ? "item" : "items"}
              </span>
            )}
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-hs-cream/70 transition-all hover:bg-white/[0.08] hover:border-hs-gold/50 hover:text-hs-gold active:scale-95"
            >
              <Close size={16} />
            </button>
          </div>
        </div>

        {/* ── Empty State ── */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-hs-gold/50 mb-5 shadow-inner">
              <ShoppingBag size={32} />
            </div>
            <h3 className="font-display text-2xl font-normal text-white">
              Your cart is empty
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-hs-cream/60 max-w-xs">
              Explore our menu and add authentic Punjabi curries, biryanis, and tandoori specialties.
            </p>
            <Link
              href="/menu"
              onClick={closeCart}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-hs-gold px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#02130c] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:bg-hs-gold-light hover:scale-105 active:scale-95"
            >
              Explore Menu
            </Link>
          </div>
        ) : showCheckout ? (
          /* ── Checkout View (Clean & Minimal) ── */
          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
            <button
              type="button"
              onClick={() => setShowCheckout(false)}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-hs-gold transition-colors hover:text-hs-gold-light"
            >
              <span>←</span>
              <span>Back to items</span>
            </button>

            {/* Quick Items Recap */}
            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-3.5 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-hs-cream/60 border-b border-white/[0.06] pb-2">
                <span>Summary ({totalCount} items)</span>
                <span className="text-hs-gold font-bold">{formatPrice(totalPrice)} AUD</span>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 no-scrollbar text-xs">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between text-hs-cream/80">
                    <span className="truncate pr-2">
                      <strong className="text-hs-gold font-mono font-normal">{i.quantity}x</strong> {i.name}
                    </span>
                    <span className="font-mono text-hs-cream/60 shrink-0">
                      {formatPrice(i.price * i.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleWhatsAppCheckout} className="space-y-3.5">
              {errorMsg && (
                <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Service Type Segmented Control */}
              <div>
                <label className="block text-[0.68rem] font-mono uppercase tracking-[0.2em] text-hs-cream/70 mb-1.5 font-medium">
                  Service Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Takeaway", "Dine-in", "Delivery"] as const).map((type) => {
                    const isSelected = orderType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrderType(type)}
                        className={`rounded-xl border py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                          isSelected
                            ? "border-hs-gold bg-hs-gold text-[#02130c] shadow-[0_0_15px_rgba(212,175,55,0.3)] font-bold"
                            : "border-white/10 bg-white/[0.03] text-hs-cream/70 hover:border-white/20 hover:bg-white/[0.06]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[0.68rem] font-mono uppercase tracking-[0.2em] text-hs-cream/70 mb-1 font-medium">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Liam Anderson"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-hs-cream/30 focus:border-hs-gold focus:outline-none focus:ring-1 focus:ring-hs-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-[0.68rem] font-mono uppercase tracking-[0.2em] text-hs-cream/70 mb-1 font-medium">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0420 123 456"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-hs-cream/30 focus:border-hs-gold focus:outline-none focus:ring-1 focus:ring-hs-gold transition-colors"
                />
              </div>

              {orderType !== "Takeaway" && (
                <div>
                  <label className="block text-[0.68rem] font-mono uppercase tracking-[0.2em] text-hs-cream/70 mb-1 font-medium">
                    {orderType === "Dine-in" ? "Table Number" : "Bunbury Delivery Address"}
                  </label>
                  <input
                    type="text"
                    value={tableOrAddress}
                    onChange={(e) => setTableOrAddress(e.target.value)}
                    placeholder={
                      orderType === "Dine-in"
                        ? "e.g. Table 4"
                        : "e.g. 12 Ocean Drive, Bunbury"
                    }
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-hs-cream/30 focus:border-hs-gold focus:outline-none focus:ring-1 focus:ring-hs-gold transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-[0.68rem] font-mono uppercase tracking-[0.2em] text-hs-cream/70 mb-1 font-medium">
                  Notes (Allergies / Spice)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Mild spice, extra cutlery..."
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-xs text-white placeholder-hs-cream/30 focus:border-hs-gold focus:outline-none focus:ring-1 focus:ring-hs-gold transition-colors resize-none"
                />
              </div>

              {/* Total Summary */}
              <div className="rounded-xl border border-hs-gold/30 bg-black/50 p-3.5 flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-hs-cream/70 font-mono">
                  Total Payable
                </span>
                <span className="font-mono text-lg font-bold text-hs-gold">
                  {formatPrice(totalPrice)} AUD
                </span>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] active:scale-[0.99]"
              >
                <WhatsApp size={17} />
                <span>Send Order via WhatsApp</span>
              </button>

              <p className="text-center text-[0.68rem] text-hs-cream/50">
                Direct to High Spirits kitchen WhatsApp ({site.phone.display}).
              </p>
            </form>
          </div>
        ) : (
          /* ── Selected Dishes List (Ultra-Sleek Glassmorphic & Minimal) ── */
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5 no-scrollbar">
              {items.map((item) => {
                const itemImg = getCartItemImage(item);
                return (
                  <div
                    key={item.id}
                    className="group relative flex items-center gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 transition-all duration-200 hover:border-hs-gold/40 hover:bg-white/[0.06]"
                  >
                    {/* Compact Dish Thumbnail */}
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40">
                      <Image
                        src={itemImg}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Middle: Name & Stepper */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-sm font-normal text-white truncate leading-snug">
                          {item.name}
                        </h4>
                        <span className="font-mono text-sm font-bold text-hs-gold shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      <p className="text-[0.7rem] text-hs-cream/50 font-mono">
                        {formatPrice(item.price)} each
                      </p>

                      {/* Stepper + Remove */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="inline-flex items-center rounded-lg border border-white/10 bg-black/50 p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease ${item.name}`}
                            className="flex h-6 w-6 items-center justify-center rounded text-hs-cream/70 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-6 text-center font-mono text-xs font-semibold text-hs-gold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase ${item.name}`}
                            className="flex h-6 w-6 items-center justify-center rounded text-hs-cream/70 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="flex h-6 w-6 items-center justify-center rounded text-hs-cream/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Minimalist Glass Footer ── */}
            <div className="border-t border-white/[0.08] bg-black/40 backdrop-blur-xl p-5 space-y-3.5 shadow-2xl">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-hs-cream/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)} AUD</span>
                </div>
                <div className="flex justify-between text-hs-cream/40">
                  <span>GST (10%)</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between items-baseline text-base font-bold text-white pt-2 border-t border-white/[0.08]">
                  <span className="uppercase tracking-wider text-xs text-hs-cream/70">Total Payable</span>
                  <span className="font-mono text-xl text-hs-gold">
                    {formatPrice(totalPrice)} <span className="text-xs text-hs-cream/50">AUD</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowCheckout(true)}
                  className="w-full group flex items-center justify-between rounded-xl bg-gradient-to-r from-hs-gold via-[#e8c865] to-hs-gold hover:from-[#e8c865] hover:to-hs-gold py-3.5 px-5 text-xs font-bold uppercase tracking-[0.2em] text-[#02130c] transition-all duration-200 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] active:scale-[0.99]"
                >
                  <span>Proceed to Checkout</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1 font-mono text-sm">→</span>
                </button>

                <div className="flex justify-between items-center px-1 text-[0.68rem] font-mono uppercase tracking-wider text-hs-cream/50">
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="hover:text-hs-gold transition-colors"
                  >
                    + Add More Dishes
                  </Link>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="hover:text-red-400 transition-colors"
                  >
                    Clear Order
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
