import { media, type Media } from "@/lib/images";

export type GalleryCategory = "Food" | "Spaces" | "Kitchen" | "Guests" | "Grand Opening" | "Celebrations";

export type GalleryItem = Media & { category: GalleryCategory };

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
  g(media.fathersDay, "Celebrations"),
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
