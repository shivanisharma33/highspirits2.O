/**
 * Business information for High Spirits. Everything here is taken from the
 * existing highspirits.au site and its CMS — do not add unverified claims.
 */

export const site = {
  name: "High Spirits",
  legalName: "High Spirits Indian Restaurant",
  tagline: "Taste the Spirit of Punjab",
  description:
    "High Spirits is a classy Indian restaurant in Bunbury, offering a curated Indian buffet with vegetarian and non-vegetarian meals in a premium setting.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.highspirits.au",
  locale: "en_AU",
  cuisine: ["Indian", "Punjabi", "North Indian", "Tandoori"],
  address: {
    street: "1/57 Victoria Street",
    locality: "Bunbury",
    region: "WA",
    postcode: "6230",
    country: "Australia",
    countryCode: "AU",
  },
  phone: { display: "+61 420 408 809", href: "tel:+61420408809", e164: "+61420408809" },
  email: "highspirits005@gmail.com",
  whatsapp: "https://wa.me/61420408809",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=High+Spirits+1%2F57+Victoria+Street+Bunbury+WA+6230",
  mapEmbed: "https://www.google.com/maps?q=High+Spirits,+1%2F57+Victoria+Street,+Bunbury+WA+6230&output=embed",
  socials: {
    instagram: "https://www.instagram.com/highspirits5",
    facebook: "https://www.facebook.com/people/High-Spirits/61584455564451/",
  },
  listings: {
    agfg: "https://www.agfg.com.au/restaurant/high-spirits-82604",
    tripadvisor:
      "https://www.tripadvisor.com/Restaurant_Review-g255364-d34217398-Reviews-High_Spirits-Bunbury_Western_Australia.html",
    trustpilot: "https://www.trustpilot.com/review/highspirits.au",
    uberEats: "https://www.ubereats.com/au/store/high-spirits-indian-restaurant/XWZcSeKdV4Snw8JDlsLpyw",
    google:
      "https://www.google.com/search?q=High+Spirits+%E2%80%93+Bunbury%E2%80%99s+Luxury+Indian+Fine+Dining",
  },
  buffet: { price: 39.99, starts: "5:00 PM" },
} as const;

export type Service = {
  label: string;
  days: string;
  time: string;
  /** schema.org day names */
  schemaDays: string[];
  opens: string;
  closes: string;
};

export const hours: Service[] = [
  {
    label: "Lunch",
    days: "Wednesday – Friday",
    time: "11:30 AM – 2:30 PM",
    schemaDays: ["Wednesday", "Thursday", "Friday"],
    opens: "11:30",
    closes: "14:30",
  },
  {
    label: "Dinner",
    days: "Monday – Sunday",
    time: "5:00 PM – 9:00 PM",
    schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "17:00",
    closes: "21:00",
  },
];

export const addressLines = [site.address.street, `${site.address.locality} ${site.address.region} ${site.address.postcode}`, site.address.country];

export type NavItem = { href: string; label: string };

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export const legalNav: NavItem[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

/** Taglines from the existing site's hero marquee. */
export const taglines = [
  "Buffet starts at 5:00 PM",
  "Punjabi Roots. Premium Plates",
  "High on Taste. High on Spirit",
  "Food that Carries Chardi Kala",
  "Butter Chicken Knows Your Weakness",
  "Table for Two? We Order for Four",
  "Calories Don't Count Here",
  "Join Us for a High-Spirited Evening",
];

/** The one independently verifiable accolade on the current site. */
export const accolade = {
  title: "Readers' Choice Winner 2026",
  body: "Australian Good Food Guide",
  href: site.listings.agfg,
  badge: "/agfg-badge.png",
};
