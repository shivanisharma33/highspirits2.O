import type { StaticImageData } from "next/image";
import { media, type Media } from "@/lib/images";

export type GalleryCategory = string;

export type GalleryItem = {
  src: StaticImageData | string;
  alt: string;
  category: string;
  width?: number;
  height?: number;
  id?: number | string;
  title?: string | null;
};

export interface StrapiGalleryItem {
  id: number;
  documentId?: string;
  Title: string | null;
  Category: string | null;
  displayOrder: number | null;
  Featured: boolean | null;
  altText: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  imsge?: {
    id: number;
    width: number;
    height: number;
    url: string;
    alternativeText?: string | null;
  };
  image?: {
    id: number;
    width: number;
    height: number;
    url: string;
    alternativeText?: string | null;
  };
}

export function normalizeGalleryCategory(raw?: string | null): string {
  if (!raw) return "Celebrations";
  const trimmed = raw.trim().toLowerCase();
  switch (trimmed) {
    case "food":
      return "Food";
    case "interiors":
      return "Interiors";
    case "chef":
      return "Chef & Kitchen";
    case "grand opening":
      return "Grand Opening";
    case "our happy customers":
      return "Happy Customers";
    default:
      return raw.charAt(0).toUpperCase() + raw.slice(1);
  }
}

export async function fetchGalleryItems(): Promise<{ items: GalleryItem[]; categories: string[] }> {
  try {
    const res = await fetch(
      "https://admin.highspirits.au/api/gallery-items?populate=*&pagination[pageSize]=100&sort[0]=createdAt:desc",
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      console.warn(`Gallery API returned ${res.status}, using static fallback`);
      return { items: galleryItems, categories: galleryCategories };
    }

    const json = (await res.json()) as { data?: StrapiGalleryItem[] };
    if (!json?.data || !Array.isArray(json.data) || json.data.length === 0) {
      return { items: galleryItems, categories: galleryCategories };
    }

    const mapped: GalleryItem[] = [];
    for (const entry of json.data) {
      const img = entry.imsge || entry.image;
      if (!img?.url) continue;

      const category = normalizeGalleryCategory(entry.Category);
      const alt =
        entry.altText ||
        entry.Title ||
        img.alternativeText ||
        `${category} at High Spirits`;

      mapped.push({
        id: entry.id,
        src: img.url,
        alt,
        category,
        width: img.width || 1200,
        height: img.height || 800,
        title: entry.Title,
      });
    }

    if (mapped.length === 0) {
      return { items: galleryItems, categories: galleryCategories };
    }

    const priority = ["Food", "Interiors", "Chef & Kitchen", "Grand Opening", "Happy Customers", "Celebrations"];
    const foundCategories = Array.from(new Set(mapped.map((i) => i.category)));
    const sortedCategories = [
      ...priority.filter((p) => foundCategories.includes(p)),
      ...foundCategories.filter((c) => !priority.includes(c)),
    ];

    return {
      items: mapped,
      categories: sortedCategories,
    };
  } catch (error) {
    console.error("Failed to fetch gallery items from API:", error);
    return { items: galleryItems, categories: galleryCategories };
  }
}

const g = (item: Media, category: GalleryCategory): GalleryItem => ({ ...item, category });

/** The gallery archive — photographs from the High Spirits CMS. */
export const galleryItems: GalleryItem[] = [
  g(media.interiorLuxe, "Spaces"),
  g(media.foodCurry, "Food"),
  g(media.chefKitchen, "Kitchen"),
  g(media.guests8, "Guests"),
  g(media.heroDish3, "Food"),
  g(media.exteriorNight, "Spaces"),
  g(media.opening2, "Grand Opening"),
  g(media.foodBiryani, "Food"),
  g(media.guests7, "Guests"),
  g(media.kitchenCraft, "Kitchen"),
  g(media.valentines2, "Celebrations"),
  g(media.interiorDiningRoom, "Spaces"),
  g(media.foodSizzler, "Food"),
  g(media.guests3, "Guests"),
  g(media.opening1, "Grand Opening"),
  g(media.dishTandooriGrill, "Food"),
  g(media.teamCelebration, "Kitchen"),
  g(media.guests10, "Guests"),
  g(media.exteriorFacade, "Spaces"),
  g(media.foodBuffet, "Food"),
  g(media.opening3, "Grand Opening"),
  g(media.guests5, "Guests"),
  g(media.guests10, "Celebrations"),
  g(media.heroDish2, "Food"),
  g(media.signage, "Spaces"),
  g(media.teamWithGuests, "Kitchen"),
  g(media.guests4, "Guests"),
  g(media.valentines1, "Celebrations"),
  g(media.ingredientLentils, "Food"),
  g(media.opening4, "Grand Opening"),
  g(media.guests6, "Guests"),
  g(media.interiorLounge, "Spaces"),
  g(media.dishButterChicken, "Food"),
  g(media.guests9, "Guests"),
  g(media.teamFamily, "Kitchen"),
  g(media.exteriorNight2, "Spaces"),
  g(media.guests11, "Guests"),
  g(media.opening5, "Grand Opening"),
  g(media.heroDish1, "Food"),
  g(media.valentines3, "Celebrations"),
  g(media.guests1, "Guests"),
  g(media.exteriorDay, "Spaces"),
  g(media.guests2, "Guests"),
  g(media.dishPalakPaneer, "Food"),
];

export const galleryCategories: GalleryCategory[] = ["Food", "Spaces", "Kitchen", "Guests", "Grand Opening", "Celebrations"];
