import type { StaticImageData } from "next/image";

import interiorLuxe from "@/assets/images/interior-luxe.jpg";
import interiorDiningRoom from "@/assets/images/interior-dining-room.jpg";
import interiorLounge from "@/assets/images/interior-lounge.jpg";
import heroDish1 from "@/assets/images/hero-dish-1.jpg";
import heroDish2 from "@/assets/images/hero-dish-2.jpg";
import heroDish3 from "@/assets/images/hero-dish-3.jpg";
import dishButterChicken from "@/assets/images/dish-butter-chicken.jpg";
import dishTandooriGrill from "@/assets/images/dish-tandoori-grill.jpg";
import dishLamb from "@/assets/images/dish-lamb.jpg";
import dishPalakPaneer from "@/assets/images/dish-palak-paneer-supreme.jpg";
import dishBiryaniRoyale from "@/assets/images/dish-biryani-royale.jpg";
import dishDalSignature from "@/assets/images/dish-dal-makhani-signature.jpg";
import ingredientLentils from "@/assets/images/ingredient-lentils.jpg";
import ingredientLamb from "@/assets/images/ingredient-lamb.jpg";
import ingredientSpinach from "@/assets/images/ingredient-spinach.jpg";
import ingredientFlour from "@/assets/images/ingredient-flour.jpg";
import chefAmardeep from "@/assets/images/chef-amardeep.jpg";
import chefKitchen from "@/assets/images/chef-amardeep-kitchen.jpg";
import partnerIshpreet from "@/assets/images/partner-ishpreet.jpg";
import kitchenCraft from "@/assets/images/kitchen-craft.jpg";
import teamCelebration from "@/assets/images/team-celebration.jpg";
import teamWithGuests from "@/assets/images/team-with-guests.jpg";
import teamFamily from "@/assets/images/team-family.jpg";
import exteriorNight from "@/assets/images/exterior-night.jpg";
import exteriorNight2 from "@/assets/images/exterior-night-2.jpg";
import exteriorDay from "@/assets/images/exterior-day.jpg";
import exteriorFacade from "@/assets/images/exterior-facade.jpg";
import signage from "@/assets/images/signage.jpg";
import foodCurry from "@/assets/images/food-curry.jpg";
import foodBiryani from "@/assets/images/food-biryani.jpg";
import foodBuffet from "@/assets/images/food-buffet.jpg";
import foodSizzler from "@/assets/images/food-sizzler.jpg";
import spices from "@/assets/images/spices.jpg";
import guests1 from "@/assets/images/guests-1.jpg";
import guests2 from "@/assets/images/guests-2.jpg";
import guests3 from "@/assets/images/guests-3.jpg";
import guests4 from "@/assets/images/guests-4.jpg";
import guests5 from "@/assets/images/guests-5.jpg";
import guests6 from "@/assets/images/guests-6.jpg";
import guests7 from "@/assets/images/guests-7.jpg";
import guests8 from "@/assets/images/guests-8.jpg";
import guests9 from "@/assets/images/guests-9.jpg";
import guests10 from "@/assets/images/guests-10.jpg";
import guests11 from "@/assets/images/guests-11.jpg";
import opening1 from "@/assets/images/opening-1.jpg";
import opening2 from "@/assets/images/opening-2.jpg";
import opening3 from "@/assets/images/opening-3.jpg";
import opening4 from "@/assets/images/opening-4.jpg";
import opening5 from "@/assets/images/opening-5.jpg";
import valentines1 from "@/assets/images/valentines-1.jpg";
import valentines2 from "@/assets/images/valentines-2.jpg";
import valentines3 from "@/assets/images/valentines-3.jpg";
import fathersDay from "@/assets/images/fathers-day.jpg";

export type Media = { src: StaticImageData; alt: string };

const m = (src: StaticImageData, alt: string): Media => ({ src, alt });

/** Every photograph used on the site, all sourced from highspirits.au and its CMS. */
export const media = {
  interiorLuxe: m(interiorLuxe, "Candle-lit dining room with emerald velvet banquettes, a crystal chandelier and gilt-framed art"),
  interiorDiningRoom: m(interiorDiningRoom, "The High Spirits dining room set with emerald chairs and pale timber tables"),
  interiorLounge: m(interiorLounge, "Dining room with emerald chairs, a leather lounge and chandeliers"),
  heroDish1: m(heroDish1, "Golden chicken curry garnished with coriander in a copper bowl"),
  heroDish2: m(heroDish2, "Tandoori chicken and paneer tikka on a copper platter"),
  heroDish3: m(heroDish3, "Steaming saffron biryani in a copper handi"),
  dishButterChicken: m(dishButterChicken, "Butter chicken in a rich tomato and cream sauce"),
  dishTandooriGrill: m(dishTandooriGrill, "Tandoori mixed grill with seekh kebab, chicken tikka, prawns and lamb cutlets"),
  dishLamb: m(dishLamb, "Slow-cooked lamb in a deep red curry"),
  dishPalakPaneer: m(dishPalakPaneer, "Seared paneer on a velvety spinach sauce"),
  dishBiryaniRoyale: m(dishBiryaniRoyale, "Biryani Royale topped with lamb, fried onions and nuts in an ornate bowl"),
  dishDalSignature: m(dishDalSignature, "Dal makhani crowned with cream"),
  ingredientLentils: m(ingredientLentils, "Dal makhani with a melting knob of butter in a copper pot"),
  ingredientLamb: m(ingredientLamb, "Lamb rogan josh in a copper karahi"),
  ingredientSpinach: m(ingredientSpinach, "Palak paneer with cubes of cottage cheese in spinach"),
  ingredientFlour: m(ingredientFlour, "Butter naan in a woven basket"),
  chefAmardeep: m(chefAmardeep, "Executive Chef Amardeep Singh in the kitchen at the tandoor"),
  chefKitchen: m(chefKitchen, "Executive Chef Amardeep Singh lifting fresh naan from the tandoor"),
  partnerIshpreet: m(partnerIshpreet, "Business partner Ishpreet Bedi holding the grand opening buffet menu"),
  kitchenCraft: m(kitchenCraft, "Bread being prepared by hand beside the tandoor"),
  teamCelebration: m(teamCelebration, "The High Spirits team celebrating together with a cake"),
  teamWithGuests: m(teamWithGuests, "Chef Amardeep Singh with guests in the kitchen"),
  teamFamily: m(teamFamily, "Ishpreet and Amardeep with guests in the dining room"),
  exteriorNight: m(exteriorNight, "High Spirits on Victoria Street, glowing emerald at night"),
  exteriorNight2: m(exteriorNight2, "The entrance of High Spirits lit up at night"),
  exteriorDay: m(exteriorDay, "High Spirits signage beneath a Bunbury tower on a clear day"),
  exteriorFacade: m(exteriorFacade, "The High Spirits facade on Victoria Street"),
  signage: m(signage, "The High Spirits street sign on Victoria Street, Bunbury"),
  foodCurry: m(foodCurry, "Slow-cooked dal finished with a swirl of cream"),
  foodBiryani: m(foodBiryani, "Biryani topped with a boiled egg and fresh coriander"),
  foodBuffet: m(foodBuffet, "Buffet trays of pakoras and curries"),
  foodSizzler: m(foodSizzler, "Tandoori chicken on a sizzling plate with onion and lemon"),
  spices: m(spices, "Mounds of vibrant ground spices at a market"),
  guests1: m(guests1, "Guests enjoying dinner together at High Spirits"),
  guests2: m(guests2, "Two guests smiling in the dining room"),
  guests3: m(guests3, "Two guests at a table dressed in emerald linen"),
  guests4: m(guests4, "Friends sharing dinner by the window"),
  guests5: m(guests5, "A table of friends celebrating together"),
  guests6: m(guests6, "Guests smiling over dinner"),
  guests7: m(guests7, "A long table of guests sharing a feast"),
  guests8: m(guests8, "A couple giving the thumbs up at their table"),
  guests9: m(guests9, "Guests dining in the afternoon light"),
  guests10: m(guests10, "A family moment with a newborn at High Spirits"),
  guests11: m(guests11, "Friends taking a selfie at dinner"),
  opening1: m(opening1, "Ishpreet and Amardeep with the grand opening buffet menu"),
  opening2: m(opening2, "Ishpreet and Amardeep at the High Spirits grand opening"),
  opening3: m(opening3, "A family celebrating the grand opening with balloons"),
  opening4: m(opening4, "Guests holding the grand opening buffet menu"),
  opening5: m(opening5, "Young guests at the grand opening"),
  valentines1: m(valentines1, "Guests at the High Spirits Valentine's Day celebration"),
  valentines2: m(valentines2, "A couple in front of the Valentine's Day floral backdrop"),
  valentines3: m(valentines3, "Friends celebrating Valentine's Day at High Spirits"),
  fathersDay: m(fathersDay, "Father and son sharing a meal at High Spirits"),
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
