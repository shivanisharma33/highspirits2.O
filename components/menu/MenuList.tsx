"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Flame, Leaf, Minus, Plus } from "@/components/ui/Icons";
import { dietLabels, menuCategories, type Diet, type MenuItem } from "@/lib/content/menu";
import { cx, formatPrice } from "@/lib/format";
import { media, type Media } from "@/lib/images";

/* ── Category fallback images ── */
const categoryImages: Record<string, Media> = {
  entrees: media.dishSamosa,
  platters: media.platter,
  vegetarian: media.dishPalakPaneerHd,
  chicken: media.dishButterChickenHd,
  meat: media.dishLambRoganJosh,
  ocean: media.dishFishCurry,
  "rice-biryanis": media.dishBiryaniHd,
  breads: media.dishButterNaan,
  sides: media.dishRaita,
  "indo-chinese": media.dishChilliPaneer,
  specials: media.dishMomos,
  dosas: media.dishMasalaDosa,
  kids: media.dishButterChicken,
  desserts: media.dishGulabJamun,
  beverages: media.dishMangoLassi,
};

/* ── Specific dish images ── */
const itemImages: Record<string, Media> = {
  "Papadums (5 pieces)": media.dishPapadums,
  "Vegetable Samosas (3 pieces)": media.dishSamosa,
  "Pani Puri (6 pieces)": media.dishPaniPuri,
  "Onion Bhaji (5 pieces)": media.dishOnionBhaji,
  "Dahi Puri (6 pieces)": media.dishPaniPuri,
  "Aloo Chat": media.dishPaniPuri,
  "Aloo Tikki Chaat": media.dishSamosa,
  "Chicken Tikka (4 pieces)": media.dishTandooriChicken,
  "Tandoori Chicken (Half)": media.dishTandooriChicken,
  "Tandoori Chicken (Full)": media.dishTandooriChicken,
  "Veg Platter": media.dishSamosa,
  "Mix Tandoori Grill Platter": media.platter,
  "Butter Chicken": media.dishButterChickenHd,
  "Dhaba Butter Chicken": media.dishButterChicken,
  "Chicken Mushroom": media.foodCurry,
  "Chicken Kadhai": media.foodCurry,
  "Chicken Dhaba": media.foodCurry,
  "Chicken Chettinad": media.foodCurry,
  "Chicken Korma": media.dishChickenKorma,
  "Chicken Vindaloo": media.dishLamb,
  "Mango Chicken": media.dishChickenKorma,
  "Chicken Musibat": media.foodCurry,
  "Kerala Chicken Roast": media.foodCurry,
  "Lamb Rogan Josh": media.dishLambRoganJosh,
  "Lamb Saag": media.dishPalakPaneerHd,
  "Lamb Korma": media.dishChickenKorma,
  "Lamb Vindaloo": media.dishLamb,
  "Goat Curry": media.dishGoatCurry,
  "Beef Fry": media.dishLamb,
  "Pepper & Coconut Beef": media.dishLamb,
  "Beef Hariyali Korma": media.dishPalakPaneer,
  "Beef Vindaloo": media.dishLamb,
  "Beef Roast": media.dishLamb,
  "Paneer Tikka Masala": media.heroDish1,
  "Paneer Butter Masala": media.heroDish1,
  "Paneer Lababdar": media.heroDish1,
  "Palak Paneer": media.dishPalakPaneerHd,
  "Malai Kofta": media.dishChickenKorma,
  "Vegetable Korma": media.dishChickenKorma,
  "Dal Makhani": media.dishDalMakhaniHd,
  "Dal Tadka (VGO)": media.dishDalSignature,
  "Chana Masala (VGO)": media.foodCurry,
  "Aloo Gobi (VGO)": media.foodCurry,
  "Saag Aloo (VGO)": media.dishPalakPaneerHd,
  "Goan Fish Curry": media.dishFishCurry,
  "Kerala Fish Curry": media.dishFishCurry,
  "Fish Malabar": media.dishFishCurry,
  "Bombay Fish Curry": media.dishFishCurry,
  "Prawn Curry": media.dishPrawnCurry,
  "Chilli Prawns": media.dishPrawnCurry,
  "Prawn Tikka Masala": media.dishPrawnCurry,
  "Royalla Fry (Prawn Fry)": media.dishPrawnCurry,
  "Royalla 65 (Prawn 65)": media.dishPrawnCurry,
  "Lime & Coriander Prawns": media.dishPrawnCurry,
  "Steamed Basmati Rice": media.heroDish3,
  "Jeera Rice": media.heroDish3,
  "Jeera Peas Pulao": media.heroDish3,
  "Kashmiri Rice": media.heroDish3,
  "Curd Rice": media.dishRaita,
  "Coconut Rice": media.heroDish3,
  "Vegetable Pulao": media.foodBiryani,
  "Mushroom Matar Pulao": media.foodBiryani,
  "Vegetable Biryani": media.foodBiryani,
  "Chicken Biryani": media.dishBiryaniHd,
  "Gongora Chicken Biryani": media.dishBiryaniHd,
  "Lamb Biryani": media.dishBiryaniRoyale,
  "Goat Biryani": media.dishBiryaniRoyale,
  "Gongora Goat Biryani": media.dishBiryaniRoyale,
  "Plain Naan": media.dishButterNaan,
  "Butter Naan": media.dishButterNaan,
  "Garlic Naan": media.dishGarlicNaan,
  "Cheese Naan": media.dishButterNaan,
  "Chicken & Cheese Naan": media.dishGarlicNaan,
  "Pizza Naan": media.dishButterNaan,
  "Kashmiri Naan": media.dishButterNaan,
  "Keema Naan": media.dishButterNaan,
  "Roti": media.dishButterNaan,
  "Lachha Paratha": media.dishButterNaan,
  "Raita": media.dishRaita,
  "Pickles & Chutneys": media.dishPapadums,
  "Pickled Onion": media.dishRaita,
  "Green Salad": media.dishRaita,
  "Chilli Paneer": media.dishChilliPaneer,
  "Gobi Manchurian": media.dishChilliPaneer,
  "Veg Noodles": media.dishHakkaNoodles,
  "Chicken Noodles": media.dishHakkaNoodles,
  "Chilli Chicken": media.dishChilliPaneer,
  "Veg Manchurian Noodles": media.dishHakkaNoodles,
  "Veg Manchurian Fried Rice": media.foodBiryani,
  "Szechuan Fried Rice": media.foodBiryani,
  "Chicken Lollipop": media.foodSizzler,
  "Chicken Fried Rice": media.foodBiryani,
  "Seafood Fried Rice": media.foodBiryani,
  "Chilli Momos (Veg/Non-Veg)": media.dishMomos,
  "Jhol Momos (Veg/Non-Veg)": media.dishMomos,
  "Steamed Momos (Veg/Non-Veg)": media.dishMomos,
  "Fried Momos (Veg/Non-Veg)": media.dishMomos,
  "Plain Dosa": media.dishMasalaDosa,
  "Masala Dosa": media.dishMasalaDosa,
  "Paneer Dosa": media.dishMasalaDosa,
  "Ghee Roast Dosa": media.dishMasalaDosa,
  "Chicken Tikka Dosa": media.dishMasalaDosa,
  "Mini Butter Chicken": media.dishButterChicken,
  "Mini Mango Chicken": media.dishChickenKorma,
  "Mini Honey Chicken": media.dishChickenKorma,
  "Mini Chicken Biryani": media.dishBiryaniHd,
  "Premium Chicken Nuggets with Chips": media.dishOnionBhaji,
  "Gulab Jamun (2 Pieces)": media.dishGulabJamun,
  "Mango Kulfi": media.dishGulabJamun,
  "Pistachio Kulfi": media.dishGulabJamun,
  "Ras Malai": media.dishGulabJamun,
  "Shahi Tukda (4 Pieces)": media.dishGulabJamun,
  "Soft Drink cans": media.dishMangoLassi,
  "Indian Masala Chai": media.dishMasalaChai,
  "Still / Sparkling Water": media.dishMangoLassi,
  "Sweet Lassi": media.dishMangoLassi,
  "Salted Lassi": media.dishMangoLassi,
  "Mango Lassi": media.dishMangoLassi,
  "Rose Lassi": media.dishMangoLassi,
};

function getItemImage(item: MenuItem, categorySlug: string): Media {
  if (item.image) return item.image;
  if (itemImages[item.name]) return itemImages[item.name];

  const lower = item.name.toLowerCase();
  if (lower.includes("biryani")) return media.dishBiryaniHd;
  if (lower.includes("garlic naan")) return media.dishGarlicNaan;
  if (lower.includes("naan") || lower.includes("roti") || lower.includes("paratha")) return media.dishButterNaan;
  if (lower.includes("prawn")) return media.dishPrawnCurry;
  if (lower.includes("fish")) return media.dishFishCurry;
  if (lower.includes("palak") || lower.includes("saag")) return media.dishPalakPaneerHd;
  if (lower.includes("paneer")) return media.dishPalakPaneerHd;
  if (lower.includes("dal makhani")) return media.dishDalMakhaniHd;
  if (lower.includes("dal")) return media.dishDalSignature;
  if (lower.includes("seekh") || lower.includes("cutlet")) return media.dishSeekhKebab;
  if (lower.includes("tandoori") || lower.includes("tikka") || lower.includes("chaap")) return media.dishTandooriChicken;
  if (lower.includes("butter chicken")) return media.dishButterChickenHd;
  if (lower.includes("goat")) return media.dishGoatCurry;
  if (lower.includes("lamb") || lower.includes("beef")) return media.dishLambRoganJosh;
  if (lower.includes("korma")) return media.dishChickenKorma;
  if (lower.includes("momo")) return media.dishMomos;
  if (lower.includes("noodle") || lower.includes("chow")) return media.dishHakkaNoodles;
  if (lower.includes("chilli paneer") || lower.includes("manchurian") || lower.includes("chilli chicken")) return media.dishChilliPaneer;
  if (lower.includes("dosa")) return media.dishMasalaDosa;
  if (lower.includes("papadum")) return media.dishPapadums;
  if (lower.includes("puri") || lower.includes("chaat") || lower.includes("chat")) return media.dishPaniPuri;
  if (lower.includes("raita") || lower.includes("salad")) return media.dishRaita;
  if (lower.includes("chai") || lower.includes("tea")) return media.dishMasalaChai;
  if (lower.includes("lassi")) return media.dishMangoLassi;
  if (lower.includes("kulfi") || lower.includes("jamun") || lower.includes("ras malai") || lower.includes("shahi tukda")) return media.dishGulabJamun;

  return categoryImages[categorySlug] ?? media.dishButterChickenHd;
}

export function MenuList() {
  const { addItem, updateQuantity, getItemQuantity, totalCount, totalPrice, openCart } = useCart();
  const [activeDiet, setActiveDiet] = useState<"ALL" | Diet>("ALL");
  const [activeCategory, setActiveCategory] = useState<string>(menuCategories[0]?.slug ?? "entrees");

  const filteredCategories = useMemo(() => {
    if (activeDiet === "ALL") return menuCategories;
    return menuCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.diet?.includes(activeDiet)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [activeDiet]);

  const scrollToCategory = (slug: string) => {
    setActiveCategory(slug);
    const element = document.getElementById(`menu-${slug}`);
    if (element) {
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-hs-cream pb-24">
      {/* ═══════════════════════════════════════════════════════
          STICKY CATEGORY QUICK-NAV & DIET FILTER BAR
          ═══════════════════════════════════════════════════════ */}
      <div className="sticky top-[calc(var(--header-h)-1px)] z-30 border-y border-hs-gold/20 bg-hs-cream/95 backdrop-blur-md">
        <div className="shell flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          {/* Category tabs (scrollable) */}
          <nav
            aria-label="Menu categories"
            className="no-scrollbar flex items-center gap-1.5 overflow-x-auto scroll-smooth pb-1 md:pb-0"
          >
            {menuCategories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => scrollToCategory(cat.slug)}
                  className={cx(
                    "whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-300",
                    isActive
                      ? "bg-hs-green-deep text-hs-cream"
                      : "bg-hs-cream-mid/70 text-hs-text/80 hover:bg-hs-cream-mid hover:text-hs-green-deep",
                  )}
                >
                  {cat.short}
                </button>
              );
            })}
          </nav>

          {/* Diet filter pills */}
          <div className="flex shrink-0 items-center gap-1.5 self-start border-t border-hs-gold/15 pt-2 md:border-t-0 md:pt-0">
            {(["ALL", "V", "VG", "S"] as const).map((diet) => {
              const isActive = activeDiet === diet;
              const label =
                diet === "ALL"
                  ? "All Dishes"
                  : diet === "V"
                    ? "Vegetarian"
                    : diet === "VG"
                      ? "Vegan"
                      : "Spicy";
              return (
                <button
                  key={diet}
                  type="button"
                  onClick={() => setActiveDiet(diet)}
                  className={cx(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-medium transition-all duration-200",
                    isActive
                      ? "bg-hs-gold-deep text-white"
                      : "bg-white/80 text-hs-muted hover:bg-white hover:text-hs-text",
                  )}
                >
                  {diet === "V" || diet === "VG" ? <Leaf size={10} /> : null}
                  {diet === "S" ? <Flame size={10} /> : null}
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MENU SECTIONS — Left small card, right data layout
          ═══════════════════════════════════════════════════════ */}
      <div className="shell mt-12 md:mt-16 space-y-16 md:space-y-24">
        {filteredCategories.map((cat) => (
          <section
            key={cat.slug}
            id={`menu-${cat.slug}`}
            aria-labelledby={`h-${cat.slug}`}
            className="scroll-mt-32"
          >
            {/* Category header */}
            <div className="border-b border-hs-gold/25 pb-4 md:pb-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow">
                    High Spirits Menu
                  </p>
                  <h2
                    id={`h-${cat.slug}`}
                    className="font-display mt-1.5 text-3xl md:text-4xl italic tracking-tight text-hs-green-deep"
                  >
                    {cat.title}
                  </h2>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-hs-muted font-medium">
                  {cat.items.length} {cat.items.length === 1 ? "dish" : "dishes"}
                </span>
              </div>
              {cat.intro && (
                <p className="mt-3 max-w-2xl text-xs md:text-sm leading-relaxed text-hs-muted text-pretty">
                  {cat.intro}
                </p>
              )}
            </div>

            {/* Menu Items — Horizontal Split Card (Left: Small Image, Right: Data) */}
            <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5">
              {cat.items.map((item) => {
                const img = getItemImage(item, cat.slug);
                return (
                  <article
                    key={item.name}
                    className="group relative flex items-start gap-3.5 sm:gap-4.5 p-3.5 sm:p-4 rounded-2xl bg-white/75 hover:bg-white border border-hs-gold/20 hover:border-hs-gold/50 transition-all duration-300"
                  >
                    {/* LEFT: Small card thumbnail */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-hs-cream-mid">
                      <Image
                        src={img.src}
                        alt={item.name}
                        fill
                        sizes="(min-width: 768px) 128px, 96px"
                        placeholder="blur"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      {/* Dietary indicator dot on thumbnail */}
                      {item.diet && item.diet.length > 0 && (
                        <div className="absolute bottom-1.5 left-1.5 flex gap-1 z-10">
                          {item.diet.map((d) => (
                            <span
                              key={d}
                              title={dietLabels[d]}
                              className={cx(
                                "flex h-5 w-5 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm",
                                d === "S" ? "text-hs-gold-deep" : "text-hs-green-deep",
                              )}
                            >
                              {d === "S" ? <Flame size={10} /> : <Leaf size={10} />}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* RIGHT: Data block */}
                    <div className="flex flex-1 flex-col justify-between self-stretch min-w-0">
                      <div>
                        {/* Title and Price */}
                        <div className="flex items-start justify-between gap-2.5">
                          <h3 className="font-display text-base sm:text-lg font-medium leading-snug tracking-tight text-hs-green-deep transition-colors duration-300 group-hover:text-hs-green text-balance">
                            {item.name}
                          </h3>
                          <span className="font-sans text-sm sm:text-base font-bold text-hs-gold-deep tabular-nums shrink-0 whitespace-nowrap pt-0.5">
                            {formatPrice(item.price)}
                          </span>
                        </div>

                        {/* Dietary label tags */}
                        {item.diet && item.diet.length > 0 && (
                          <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            {item.diet.map((d) => (
                              <span
                                key={d}
                                className={cx(
                                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-medium tracking-wide",
                                  d === "S"
                                    ? "bg-amber-50 text-amber-900 border border-amber-200/60"
                                    : "bg-emerald-50 text-emerald-900 border border-emerald-200/60",
                                )}
                              >
                                {d === "S" ? <Flame size={9} /> : <Leaf size={9} />}
                                {dietLabels[d]}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Description */}
                        {item.description && (
                          <p className="mt-1.5 text-xs sm:text-[0.82rem] leading-relaxed text-hs-muted line-clamp-2 sm:line-clamp-3 text-pretty">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Add to Cart & Stepper controls */}
                      <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-hs-gold/20">
                        {getItemQuantity(item.name) === 0 ? (
                          <button
                            type="button"
                            onClick={() => {
                              const numPrice =
                                typeof item.price === "number"
                                  ? item.price
                                  : parseFloat(item.price) || 0;
                              addItem({
                                id: item.name,
                                name: item.name,
                                price: numPrice,
                                diet: item.diet,
                                description: item.description,
                                category: cat.title,
                                image: img.src,
                              });
                            }}
                            aria-label={`Add ${item.name} to cart`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-hs-green-deep text-hs-cream hover:bg-hs-gold hover:text-hs-green-deep px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-wider border border-hs-gold/40 transition-all duration-200 shadow-xs hover:shadow-md hover:scale-105 active:scale-95"
                          >
                            <Plus size={13} />
                            <span>Add</span>
                          </button>
                        ) : (
                          <div className="inline-flex items-center rounded-full border-2 border-hs-gold bg-hs-green-deep px-1 py-0.5 shadow-md">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.name, getItemQuantity(item.name) - 1)
                              }
                              aria-label={`Decrease ${item.name} quantity`}
                              className="flex h-6 w-6 items-center justify-center rounded-full text-hs-cream hover:bg-hs-gold hover:text-hs-green-deep transition-all active:scale-90"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-xs font-bold tabular-nums text-hs-gold">
                              {getItemQuantity(item.name)}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.name, getItemQuantity(item.name) + 1)
                              }
                              aria-label={`Increase ${item.name} quantity`}
                              className="flex h-6 w-6 items-center justify-center rounded-full text-hs-cream hover:bg-hs-gold hover:text-hs-green-deep transition-all active:scale-90"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        )}

                        {getItemQuantity(item.name) > 0 && (
                          <button
                            type="button"
                            onClick={openCart}
                            className="inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-wider text-hs-gold-deep hover:text-hs-green-deep transition-colors"
                          >
                            <span>View Cart</span>
                            <span>→</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-display text-hs-green-deep">No dishes match the selected dietary filter.</p>
            <button
              type="button"
              onClick={() => setActiveDiet("ALL")}
              className="mt-4 rounded-full bg-hs-green-deep px-5 py-2 text-xs font-medium uppercase tracking-wider text-hs-cream"
            >
              Show all dishes
            </button>
          </div>
        )}

        {/* Allergen disclaimer */}
        <div className="pt-8 border-t border-hs-gold/20">
          <p className="mx-auto max-w-2xl text-center text-xs leading-relaxed text-hs-muted">
            Please inform us of any allergies or dietary restrictions when ordering. While we take every care with food preparation, our kitchen handles nuts, dairy and gluten. Prices in AUD.
          </p>
        </div>
      </div>

      {/* Floating Bottom Order Bar */}
      {totalCount > 0 && (
        <aside
          aria-label="Floating order summary"
          className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none animate-in slide-in-from-bottom-6 duration-300"
        >
          <button
            type="button"
            onClick={openCart}
            className="pointer-events-auto group flex items-center gap-3 sm:gap-4.5 rounded-full bg-gradient-to-r from-[#062c1f] via-[#083a29] to-[#062c1f] px-5 sm:px-6 py-3 text-hs-cream shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(212,175,55,0.35)] border-2 border-hs-gold/70 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(212,175,55,0.5)] active:scale-95"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-hs-gold text-xs font-bold text-hs-green-deep shadow-md transition-transform duration-300 group-hover:scale-110">
                {totalCount}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-hs-cream hidden sm:inline">
                {totalCount === 1 ? "Item" : "Items"} in Feast
              </span>
            </div>
            <span className="h-4 w-px bg-hs-gold/30" />
            <span className="font-mono text-sm sm:text-base font-bold text-hs-gold tabular-nums tracking-wide">
              {formatPrice(totalPrice)} AUD
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-hs-gold px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-hs-green-deep transition-colors group-hover:bg-hs-gold-light ml-1 shadow-sm">
              <span>View Order</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">→</span>
            </span>
          </button>
        </aside>
      )}
    </div>
  );
}
