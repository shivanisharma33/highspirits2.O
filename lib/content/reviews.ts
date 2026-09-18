/** Guest reviews as published in the High Spirits CMS & user screenshot. */
export type Review = {
  quote: string;
  name: string;
  title: string;
  rating: number;
  date?: string;
};

export const reviews: Review[] = [
  {
    quote: "Every dish felt like a piece of art. The flavors, the presentation, the service — perfection",
    name: "Farzana Rahman",
    title: "Verified Diner",
    rating: 5,
  },
  {
    quote: "Dining at High Spirits is more than just enjoying exquisite food — it's a journey of taste, texture, and emotion. Every plate feels like a work of art, and every moment is curated with genuine care & passion",
    name: "Nadia & Arif Hasan",
    title: "Culinary Enthusiasts",
    rating: 5,
  },
  {
    quote: "Some of the best Indian food to be had in Bunbury. Definitely worth checking out. Buffet of delicious selections at the moment, with very friendly and accommodating staff.",
    name: "Frans Buissink",
    title: "Local Guide",
    rating: 5,
  },
  {
    quote: "Amazing place. Food is delicious and the service is incredible. Highly recommended. Love love love. Well done Deep and Ish.",
    name: "Michelle Harris",
    title: "Verified Guest",
    rating: 5,
  },
  {
    quote: "Amazing food, five star service and the warmest welcome. Highly recommend the best authentic Indian in Bunbury.",
    name: "Gemma Ainsworth",
    title: "Verified Guest",
    rating: 5,
  },
  {
    quote: "Incredible Indian food with bold, authentic flavours. Every dish is fresh, perfectly spiced, and full of character. Highly recommended!",
    name: "Mohit Sharma",
    title: "Verified Guest",
    rating: 5,
  },
];

/** Rating shown on the current highspirits.au homepage & reference image. */
export const googleRating = {
  value: "4.5",
  secondaryValue: "5.0",
  label: "Based on 567 reviews",
};
