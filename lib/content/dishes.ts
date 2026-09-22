import { media, type Media } from "@/lib/images";

export type SignatureDish = {
  no: string;
  name: string;
  region: string;
  categoryTag?: "Non-Veg" | "North Indian";
  description: string;
  lines?: string[];
  notes: string[];
  price?: number;
  image: Media;
};

/**
 * Signature creations as requested with authentic HD photography and dietary tags.
 */
export const signatureDishes: SignatureDish[] = [
  {
    no: "01",
    name: "Tandoori Mixed Grill",
    region: "From the Tandoor",
    categoryTag: "Non-Veg",
    description: "Seekh kebabs, chicken tikka, tandoori prawns, and charred lamb cutlets fired in the authentic clay tandoor.",
    lines: ["Charcoal-fired.", "Artisan marinades.", "Unrivalled tenderness."],
    notes: ["Seekh Kebab", "Chicken Tikka", "Tandoori Prawns", "Lamb Cutlets"],
    price: 35.99,
    image: media.heroDish2, // 1920x1080 Ultra HD
  },
  {
    no: "02",
    name: "Tasmanian Lamb",
    region: "Signature Specialty",
    categoryTag: "Non-Veg",
    description: "Ethically sourced Tasmanian grass-fed lamb slow-simmered in a deep, aromatic Kashmiri and Punjabi gravy.",
    notes: ["Tasmanian Lamb", "Whole Spices", "Kashmiri Chilli", "Slow Cooked"],
    price: 25.99,
    image: media.ingredientLamb, // 1024x1024 Ultra HD
  },
  {
    no: "03",
    name: "Biryani Royale",
    region: "Fragrant Basmati",
    categoryTag: "North Indian",
    description: "Aged long-grain basmati rice layered with spiced tender cuts, saffron, caramelized onions, and fresh mint.",
    notes: ["Aged Basmati", "Pure Saffron", "Dum Pukht", "Mint & Herbs"],
    price: 24.99,
    image: media.heroDish3, // 1920x1080 Ultra HD
  },
  {
    no: "04",
    name: "Palak Paneer",
    region: "Punjabi Classic",
    categoryTag: "Non-Veg",
    description: "Artisan cottage cheese cubes gently cooked in a velvety spiced puree of fresh local baby spinach, garlic, and roasted cumin.",
    notes: ["Local Spinach", "Cottage Cheese", "Garlic Tadka", "Fresh Cream"],
    price: 19.99,
    image: media.ingredientSpinach, // 1024x1024 Ultra HD
  },
  {
    no: "05",
    name: "Butter Chicken",
    region: "House Classic",
    categoryTag: "North Indian",
    description: "Tender boneless chicken roasted in the clay oven, simmered in a silky tomato, cashew, and churned butter gravy.",
    notes: ["Tandoor Chicken", "Tomato & Cashew", "Churned Butter", "Fenugreek"],
    price: 23.99,
    image: media.heroDish1, // 1920x1080 Ultra HD
  },
  {
    no: "06",
    name: "Dal Makhani",
    region: "Heritage Signature",
    categoryTag: "North Indian",
    description: "Hand-selected whole black urad lentils, slow-cooked for 16 hours over gentle embers with churned butter and dairy cream.",
    lines: ["Slow-cooked.", "Deeply layered.", "Unforgettable."],
    notes: ["16-Hour Simmer", "Black Urad Dal", "White Butter", "Velvet Cream"],
    price: 19.99,
    image: media.ingredientLentils, // 1024x1024 Ultra HD
  },
];

export const ingredients = [
  {
    name: "Black Lentils",
    origin: "Punjab, India",
    description: "Hand-selected premium whole urad dal, slow-cooked for 12 hours to achieve velvety perfection.",
    image: media.foodCurry,
  },
  {
    name: "Australian Lamb",
    origin: "Tasmania, Australia",
    description: "Grass-fed, ethically sourced from pristine Tasmanian highlands, aged for optimal tenderness.",
    image: media.ingredientLamb,
  },
  {
    name: "Organic Spinach",
    origin: "Victoria, Australia",
    description: "Farm-fresh baby spinach from our local Victorian partners, harvested at peak freshness.",
    image: media.ingredientSpinach,
  },
  {
    name: "Stone-Ground Flour",
    origin: "Punjab, India",
    description: "Traditional chakki-ground whole wheat, imported directly from heritage mills in Punjab.",
    image: media.ingredientFlour,
  },
];
