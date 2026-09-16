/** Guest reviews as published in the High Spirits CMS. */
export type Review = {
  quote: string;
  name: string;
  title: string;
  rating: number;
  date: string;
};

export const reviews: Review[] = [
  {
    quote: "Absolutely exquisite! The butter chicken was perfection, and the ambience transported us to luxury. Every bite was a journey through authentic Indian flavours.",
    name: "Emma Thompson",
    title: "Verified guest",
    rating: 5,
    date: "2025-12-19",
  },
  {
    quote: "Amazing place. Food is delicious and the service is incredible. Highly recommended. Love love love. Well done Deep and Ish.",
    name: "Michelle Harris",
    title: "Guest",
    rating: 5,
    date: "2026-01-20",
  },
  {
    quote: "The most authentic Indian cuisine I've ever tasted outside of India. The biryani is absolutely divine and worth every penny.",
    name: "David Chen",
    title: "Verified guest",
    rating: 5,
    date: "2025-12-19",
  },
  {
    quote: "Celebrated our anniversary here and it was absolutely perfect. The staff remembered our preferences and the surprise dessert was a lovely touch.",
    name: "Lisa Anderson",
    title: "Verified guest",
    rating: 5,
    date: "2025-12-19",
  },
  {
    quote: "A true fine dining experience. From the moment we walked in, we felt like royalty. The wine pairing suggestions were exceptional.",
    name: "Sophia Martinez",
    title: "Verified guest",
    rating: 5,
    date: "2025-12-19",
  },
  {
    quote: "Best Indian restaurant in Australia. The attention to detail in every dish is remarkable. The service was impeccable and the entire experience unforgettable.",
    name: "James Wilson",
    title: "Verified guest",
    rating: 5,
    date: "2025-12-19",
  },
];

/** Rating shown on the current highspirits.au homepage. Keep in sync with the live Google listing. */
export const googleRating = { value: "5.0", label: "Google rating" };
