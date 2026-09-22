"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Flame, Leaf } from "@/components/ui/Icons";
import { dietLabels, menuCategories, type Diet, type MenuItem } from "@/lib/content/menu";
import { cx, formatPrice } from "@/lib/format";
import { media, type Media } from "@/lib/images";

/* ── Category fallback images ── */
const categoryImages: Record<string, Media> = {
  entrees: media.dishSamosa,
  platters: media.dishTandooriGrill,
  vegetarian: media.dishPalakPaneerHd,
  chicken: media.dishButterChickenHd,
  meat: media.dishLambRoganJosh,
  ocean: media.dishPrawnCurry,
  "rice-biryanis": media.dishBiryaniHd,
  breads: media.dishGarlicNaan,
  sides: media.ingredientLentils,
  "indo-chinese": media.foodSizzler,
  specials: media.dishTandooriChicken,
  dosas: media.heroDish2,
  kids: media.dishButterChicken,
  desserts: media.heroDish3,
  beverages: media.heroDiningHall,
};

/* ── Specific dish images ── */
const itemImages: Record<string, Media> = {
  "Papadums (5 pieces)": media.foodSizzler,
  "Vegetable Samosas (3 pieces)": media.dishSamosa,
  "Pani Puri (6 pieces)": media.dishSamosa,
  "Onion Bhaji (5 pieces)": media.dishOnionBhaji,
  "Aloo Chaat": media.dishSamosa,
  "Aloo Tikki Chaat": media.dishSamosa,
  "Chicken Tikka (4 pieces)": media.dishTandooriChicken,
  "Tandoori Chicken (4 pieces)": media.dishTandooriChicken,
  "Veg Platter": media.dishSamosa,
  "Mix Tandoori Grill Platter": media.dishTandooriGrill,
  "Butter Chicken": media.dishButterChickenHd,
  "Dhaba Butter Chicken": media.dishButterChicken,
  "Chicken Mushroom": media.foodCurry,
  "Chicken Kadhai": media.foodCurry,
  "Chicken Dhaba": media.foodCurry,
  "Chicken Chettinad": media.foodCurry,
  "Chicken Korma": media.dishChickenKorma,
  "Chicken Vindaloo": media.foodCurry,
  "Mango Chicken": media.dishChickenKorma,
  "Chicken Musibat": media.foodCurry,
  "Kerala Chicken Roast": media.foodCurry,
  "Lamb Rogan Josh": media.dishLambRoganJosh,
  "Lamb Saag": media.ingredientLamb,
  "Lamb Korma": media.dishLamb,
  "Lamb Vindaloo": media.dishLamb,
  "Lamb Madras": media.dishLambRoganJosh,
  "Goat Curry": media.dishGoatCurry,
  "Goat Gongora": media.dishGoatCurry,
  "Beef Fry": media.ingredientLamb,
  "Pepper & Coconut Beef": media.ingredientLamb,
  "Beef Hariyali Korma": media.ingredientLamb,
  "Beef Vindaloo": media.dishLamb,
  "Beef Roast": media.ingredientLamb,
  "Paneer Tikka Masala": media.dishPalakPaneer,
  "Paneer Butter Masala": media.dishPalakPaneer,
  "Paneer Lababdar": media.dishPalakPaneer,
  "Palak Paneer": media.dishPalakPaneerHd,
  "Malai Kofta": media.dishPalakPaneer,
  "Vegetable Korma": media.dishPalakPaneer,
  "Dal Makhani": media.dishDalMakhaniHd,
  "Chana Masala": media.dishDalSignature,
  "Aloo Gobi": media.ingredientLentils,
  "Saag Aloo (VGO)": media.dishPalakPaneerHd,
  "Methi Malai Mutter Mushroom": media.ingredientSpinach,
  "Mixed Vegetables": media.ingredientLentils,
  "Masala Okra": media.ingredientLentils,
  "Masala Aloo": media.ingredientLentils,
  "Jeera Aloo": media.ingredientLentils,
  "Goan Fish Curry": media.heroDish1,
  "Kerala Fish Curry": media.heroDish1,
  "Fish Malabar": media.heroDish1,
  "Bombay Fish Curry": media.heroDish1,
  "Prawn Curry": media.dishPrawnCurry,
  "Chilli Prawns": media.dishPrawnCurry,
  "Prawn Tikka Masala": media.dishPrawnCurry,
  "Prawn 65 (Royalla 65)": media.dishPrawnCurry,
  "Lime and Coriander Prawns": media.dishPrawnCurry,
  "Steamed Basmati Rice": media.heroDish3,
  "Jeera Rice": media.heroDish3,
  "Jeera Peas Pulao": media.heroDish3,
  "Kashmiri Rice": media.heroDish3,
  "Veg Biryani": media.foodBiryani,
  "Chicken Biryani": media.dishBiryaniHd,
  "Lamb Biryani": media.dishBiryaniRoyale,
  "Beef Biryani": media.dishBiryaniRoyale,
  "Goat Biryani": media.dishBiryaniRoyale,
  "Plain Naan": media.ingredientFlour,
  "Butter Naan": media.ingredientFlour,
  "Garlic Naan": media.dishGarlicNaan,
  "Cheese Naan": media.ingredientFlour,
  "Cheese & Garlic Naan": media.dishGarlicNaan,
  "Chilli Garlic Naan": media.dishGarlicNaan,
  "Kashmiri Naan": media.ingredientFlour,
  "Tandoori Roti": media.ingredientFlour,
  "Gulab Jamun (2 Pieces)": media.heroDish3,
  "Mango Kulfi": media.heroDish3,
  "Pistachio Kulfi": media.heroDish3,
  "Rasmalai (2 Pieces)": media.heroDish3,
  "Indian Masala Chai": media.heroDiningHall,
  "Mango Lassi": media.heroDiningHall,
};

function getItemImage(itemName: string, categorySlug: string): Media {
  if (itemImages[itemName]) return itemImages[itemName];

  const lower = itemName.toLowerCase();
  if (lower.includes("biryani")) return media.dishBiryaniHd;
  if (lower.includes("naan") || lower.includes("roti")) return media.dishGarlicNaan;
  if (lower.includes("prawn")) return media.dishPrawnCurry;
  if (lower.includes("fish")) return media.heroDish1;
  if (lower.includes("paneer")) return media.dishPalakPaneerHd;
  if (lower.includes("dal")) return media.dishDalMakhaniHd;
  if (lower.includes("tandoori") || lower.includes("tikka")) return media.dishTandooriChicken;
  if (lower.includes("butter chicken")) return media.dishButterChickenHd;
  if (lower.includes("lamb") || lower.includes("beef") || lower.includes("goat")) return media.dishLambRoganJosh;
  if (lower.includes("korma")) return media.dishChickenKorma;
  if (lower.includes("momo") || lower.includes("manchurian") || lower.includes("noodle")) return media.foodSizzler;
  if (lower.includes("dosa")) return media.heroDish2;
  if (lower.includes("kulfi") || lower.includes("jamun") || lower.includes("rasmalai")) return media.heroDish3;

  return categoryImages[categorySlug] ?? media.heroDish1;
}

export function MenuList() {
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
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-hs-green-mid">
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
                const img = getItemImage(item.name, cat.slug);
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
    </div>
  );
}
