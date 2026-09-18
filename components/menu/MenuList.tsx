"use client";

import Image from "next/image";
import { Flame, Leaf } from "@/components/ui/Icons";
import { dietLabels, menuCategories, type Diet } from "@/lib/content/menu";
import { cx, formatPrice } from "@/lib/format";
import { media, type Media } from "@/lib/images";

/* ── Dish image mapping ── */
const categoryImages: Record<string, Media> = {
  entree: media.dishSamosa,
  platters: media.dishTandooriGrill,
  chicken: media.dishButterChickenHd,
  meat: media.dishLambRoganJosh,
  vegetarian: media.dishPalakPaneerHd,
  seafood: media.dishPrawnCurry,
  rice: media.dishBiryaniHd,
  breads: media.dishGarlicNaan,
};

const itemImages: Record<string, Media> = {
  "Vegetable Samosas": media.dishSamosa,
  "Onion Bhaji": media.dishOnionBhaji,
  "Aloo Chaat": media.dishSamosa,
  "Aloo Tikki Chaat": media.dishSamosa,
  "Papadums": media.foodSizzler,
  "Chicken Tikka": media.dishTandooriChicken,
  "Tandoori Chicken (4 pieces)": media.dishTandooriChicken,
  "Vegetarian Platter": media.dishSamosa,
  "Mixed Tandoori Grilled Platter": media.dishTandooriGrill,
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
  "Pepper and Coconut Beef": media.ingredientLamb,
  "Beef Hariyali Kerma": media.ingredientLamb,
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
  "Saag Aloo": media.dishPalakPaneerHd,
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
  "Curd Rice": media.heroDish3,
  "Mushroom Matar Pulao": media.heroDish3,
  "Veg Biryani": media.foodBiryani,
  "Chicken Biryani": media.dishBiryaniHd,
  "Lamb Biryani": media.dishBiryaniRoyale,
  "Beef Biryani": media.dishBiryaniRoyale,
  "Goat Biryani": media.dishBiryaniRoyale,
  "Butter Naan": media.ingredientFlour,
  "Garlic Naan": media.dishGarlicNaan,
  "Cheese Naan": media.ingredientFlour,
  "Chilli Garlic Naan": media.dishGarlicNaan,
  "Pizza Naan": media.ingredientFlour,
  "Chicken Cheese Naan": media.ingredientFlour,
  "Kashmiri Naan": media.ingredientFlour,
  "Tandoori Roti": media.ingredientFlour,
};

function getItemImage(itemName: string, categorySlug: string): Media {
  return itemImages[itemName] ?? categoryImages[categorySlug] ?? media.heroDish2;
}

/** Aromix-inspired menu — 4-column card grid with dish images, price badges, and names. */
export function MenuList() {
  return (
    <div className="bg-hs-cream py-20 md:py-28">
      {menuCategories.map((cat, ci) => (
        <section
          key={cat.slug}
          id={`menu-${cat.slug}`}
          aria-labelledby={`h-${cat.slug}`}
          className={cx(ci > 0 && "mt-16 md:mt-24")}
        >
          {/* ── Category header ── */}
          <div className="shell text-center">
            <p
              className="text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-hs-green-mid"
              data-reveal="fade-up"
            >
              Our menu
            </p>
            <h2
              id={`h-${cat.slug}`}
              className="font-display mt-3 text-[clamp(2rem,4.5vw,3.6rem)] italic leading-[1.08] tracking-tight text-hs-green-deep"
              data-reveal="fade-up"
            >
              {cat.title}
            </h2>
          </div>

          {/* ── 4-column card grid ── */}
          <div className="shell mt-10 md:mt-14">
            <div className="grid grid-cols-2 gap-5 md:gap-6 lg:grid-cols-4">
              {cat.items.map((item) => {
                const img = getItemImage(item.name, cat.slug);
                return (
                  <article
                    key={item.name}
                    className="group"
                    data-reveal="fade-up"
                  >
                    {/* Image + Aromix notched price badge */}
                    <div className="relative overflow-hidden rounded-[22px]">
                      <div className="aspect-[4/5] relative">
                        <Image
                          src={img.src}
                          alt={item.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          placeholder="blur"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>

                      {/* ── Top-Right Aromix Notch with Price Tag ── */}
                      <div className="absolute top-0 right-0 z-10 flex items-center justify-center bg-hs-cream pl-4 pr-3.5 pt-2 pb-2 rounded-bl-[20px]">
                        {/* Top-left concave transition curve */}
                        <svg
                          className="absolute top-0 -left-[19px] h-5 w-5 text-hs-cream fill-current pointer-events-none"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M 0 0 A 20 20 0 0 1 20 20 L 20 0 Z" />
                        </svg>

                        {/* Price text */}
                        <span className="font-sans text-sm md:text-base font-bold tracking-tight text-hs-green-deep tabular-nums">
                          {formatPrice(item.price)}
                        </span>

                        {/* Bottom-right concave transition curve */}
                        <svg
                          className="absolute -bottom-[19px] right-0 h-5 w-5 text-hs-cream fill-current pointer-events-none"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M 0 0 A 20 20 0 0 1 20 20 L 20 0 Z" />
                        </svg>
                      </div>

                      {/* Diet indicator dots — bottom left */}
                      {item.diet && item.diet.length > 0 && (
                        <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
                          {item.diet.map((d) => (
                            <span
                              key={d}
                              title={dietLabels[d]}
                              className={cx(
                                "flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm",
                                d === "S" ? "text-hs-gold-deep" : "text-hs-green",
                              )}
                            >
                              {d === "S" ? <Flame size={11} /> : <Leaf size={11} />}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dish name */}
                    <h3 className="mt-4 font-display text-base leading-snug tracking-tight text-hs-text transition-colors duration-400 group-hover:text-hs-green md:text-lg">
                      {item.name}
                    </h3>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Allergen disclaimer */}
      <div className="shell mt-20">
        <p className="mx-auto max-w-2xl text-center text-xs leading-relaxed text-hs-muted">
          Please inform us of any allergies or dietary restrictions when ordering. While we take every care with food preparation, our kitchen handles nuts, dairy and gluten. Prices in AUD.
        </p>
      </div>
    </div>
  );
}
