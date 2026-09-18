import { media, type Media } from "@/lib/images";
import { site } from "@/lib/site";

export type Experience = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  meta: string[];
  features: string[];
  image: Media;
  cta: { label: string; href: string; external?: boolean };
  /** Visual identity used on the experiences page. */
  tone: "noir" | "gold" | "cream" | "emerald";
};

/** Signature experiences, as requested and offered on highspirits.au. */
export const experiences: Experience[] = [
  {
    slug: "chefs-table",
    title: "Chef's Table",
    kicker: "Intimate · Chef Led",
    description:
      "An intimate 8-seat experience where our Executive Chef crafts a personalized journey through contemporary Indian cuisine, paired with rare wines from our cellar.",
    meta: ["8 seats", "10 courses", "Chef led"],
    features: [
      "Personalized 10-course menu",
      "Chef interaction",
      "Kitchen tour",
    ],
    image: media.teamWithGuests,
    cta: { label: "Enquire", href: "/reservation?experience=chefs-table" },
    tone: "noir",
  },
  {
    slug: "delivery",
    title: "Skip the Trip",
    kicker: "Doorstep Delivery",
    description:
      "Get your favorites delivered straight to your door fast, easy, and hassle free. No lines, no travel, just tap and enjoy.",
    meta: ["Fast delivery", "Real-time tracking", "Uber Eats"],
    features: [
      "Doorstep delivery",
      "Real-time order tracking",
      "Wide restaurant selection",
    ],
    image: media.heroDish2,
    cta: { label: "Order on Uber Eats", href: site.listings.uberEats, external: true },
    tone: "gold",
  },
  {
    slug: "lunch",
    title: "Lunch Dining Experience",
    kicker: "Wednesday – Friday",
    description:
      "Take a relaxing midday break with our thoughtfully curated lunch menu, offering fresh flavors, quick service, and a comfortable dining atmosphere.",
    meta: ["Wed – Fri", "11:30 AM – 2:30 PM", "Quick service"],
    features: [
      "Freshly prepared lunch menu",
      "Quick & efficient service",
      "Comfortable seating",
    ],
    image: media.interiorDiningRoom,
    cta: { label: "Book lunch", href: "/reservation?experience=lunch" },
    tone: "cream",
  },
  {
    slug: "buffet",
    title: "Lavish Buffet Experience",
    kicker: `Nightly from ${site.buffet.starts}`,
    description:
      "Enjoy a wide spread of freshly prepared dishes with unlimited servings, perfect for families, groups, and celebratory dining.",
    meta: [`From ${site.buffet.starts}`, `$${site.buffet.price}`, "Unlimited servings"],
    features: [
      "Multi-cuisine spread",
      "Unlimited servings",
      "Live food counters",
    ],
    image: media.foodBuffet,
    cta: { label: "See the buffet", href: "/menu#buffet" },
    tone: "emerald",
  },
  {
    slug: "corporate",
    title: "Corporate High-End Events",
    kicker: "Business Dining",
    description:
      "Impress clients and celebrate success with sophisticated corporate dining experiences tailored to your business needs.",
    meta: ["Up to 100 guests", "Full venue buyout", "AV equipped"],
    features: [
      "Full venue buyout",
      "Branded experiences",
      "Presentation facilities",
    ],
    image: media.guests7,
    cta: { label: "Plan an event", href: "/events#enquire" },
    tone: "noir",
  },
  {
    slug: "degustation",
    title: "Degustation Journey",
    kicker: "Tasting Menu",
    description:
      "Our signature 7-course or 10-course tasting menu showcasing the finest seasonal ingredients and innovative techniques.",
    meta: ["7 or 10 courses", "3.5 hours", "Seasonal"],
    features: [
      "Seasonal menu",
      "3.5 hour experience",
      "Chef-led culinary storytelling",
    ],
    image: media.heroDish1,
    cta: { label: "Reserve", href: "/reservation?experience=degustation" },
    tone: "gold",
  },
];

/** The experiences page additionally features private events. */
export const eventsExperience: Experience = {
  slug: "events",
  title: "Events & Celebrations",
  kicker: "Private dining",
  description:
    "Wedding receptions, engagements, birthdays, anniversaries and milestone celebrations — hosted in an elegant setting, for intimate gatherings or the full venue.",
  meta: ["Up to 120 guests", "Off-site catering"],
  features: ["Weddings & receptions", "Private celebrations", "Exclusive venue hire"],
  image: media.opening3,
  cta: { label: "Enquire", href: "/events#enquire" },
  tone: "emerald",
};
