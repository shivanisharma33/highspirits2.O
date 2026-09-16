import { media } from "@/lib/images";

/** Event services from the High Spirits CMS (event-services). */
export const eventServices = [
  {
    title: "Private Celebrations",
    body: "Birthday parties, anniversaries, and milestone celebrations.",
    capacity: "Up to 80 guests",
    image: media.opening3,
  },
  {
    title: "Corporate Events",
    body: "Business dinners, team building, and corporate gatherings.",
    capacity: "Up to 100 guests",
    image: media.guests7,
  },
  {
    title: "Weddings & Receptions",
    body: "Elegant wedding receptions and engagement celebrations.",
    capacity: "Up to 120 guests",
    image: media.valentines2,
  },
  {
    title: "Catering Services",
    body: "Off-site catering for your special occasions.",
    capacity: "Any size",
    image: media.foodBuffet,
  },
  {
    title: "Private Venues",
    body: "Exclusive venue hire for intimate or grand events.",
    capacity: "Full venue available",
    image: media.interiorLounge,
  },
];

export const eventTypes = [
  "Private celebration",
  "Corporate event",
  "Wedding or reception",
  "Catering",
  "Full venue hire",
  "Something else",
];
