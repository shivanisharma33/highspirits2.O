import { media, type Media } from "@/lib/images";

export type SignatureDish = {
  no: string;
  name: string;
  region: string;
  description: string;
  lines?: string[];
  notes: string[];
  price?: number;
  image: Media;
};

/**
 * Signature creations as listed in the High Spirits CMS. Descriptions and
 * prices are taken from the matching à la carte menu entries.
 */
export const signatureDishes: SignatureDish[] = [
  {
    no: "01",
    name: "Dal Makhani",
    region: "North Indian",
    description: "Whole black lentils, slow-cooked with butter and cream until velvet-soft.",
    lines: ["Slow-cooked.", "Deeply layered.", "Unforgettable."],
    notes: ["Black lentils", "Butter", "Cream"],
    price: 21.9,
    image: media.ingredientLentils,
  },
  {
    no: "02",
    name: "Butter Chicken",
    region: "North Indian",
    description: "Tender chicken in a creamy tomato and butter sauce.",
    notes: ["Tomato", "Butter", "Cream"],
    price: 29.9,
    image: media.dishButterChicken,
  },
  {
    no: "03",
    name: "Tandoori Mixed Grill",
    region: "From the tandoor",
    description: "Seekh kebabs, chicken tikka, tandoori prawns and lamb cutlets, fired in the clay oven.",
    notes: ["Seekh kebab", "Tikka", "Prawn", "Lamb"],
    price: 39.9,
    image: media.dishTandooriGrill,
  },
  {
    no: "04",
    name: "Biryani Royale",
    region: "Rice & biryani",
    description: "Fragrant basmati layered with tender lamb and aromatic spices.",
    notes: ["Basmati", "Lamb", "Saffron"],
    image: media.dishBiryaniRoyale,
  },
  {
    no: "05",
    name: "Palak Paneer",
    region: "North Indian · Vegetarian",
    description: "Cottage cheese cooked with spinach, garlic and spices.",
    notes: ["Paneer", "Spinach", "Garlic"],
    price: 21.9,
    image: media.dishPalakPaneer,
  },
  {
    no: "06",
    name: "Tasmanian Lamb",
    region: "Signature",
    description: "Grass-fed Tasmanian lamb, slow-cooked in a deep, aromatic curry.",
    notes: ["Tasmanian lamb", "Whole spices"],
    image: media.dishLamb,
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
