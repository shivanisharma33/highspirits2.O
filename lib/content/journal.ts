import { media, type Media } from "@/lib/images";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  image: Media;
  content: string;
};

/** Journal entries published on highspirits.au/blogs. */
export const articles: Article[] = [
  {
    slug: "the-art-of-perfect-indian-spices",
    title: "The Art of Perfect Indian Spices",
    excerpt:
      "Discover how authentic Indian spices are carefully selected, roasted, and blended to create rich, unforgettable flavours in every dish at High Spirits Indian Restaurant.",
    author: "Chef Ishpreet Bedi",
    category: "Cuisine",
    date: "2026-02-25",
    image: media.spices,
    content: `## The Heart of Indian Cuisine Lies in Its Spices

Indian cuisine is not just about heat or colour — it is about balance, depth, and harmony. At High Spirits Indian Restaurant, every dish begins with a carefully crafted spice blend that reflects centuries of culinary tradition.

Spices are more than ingredients. They are stories of culture, geography, and heritage.

---

## Selecting the Finest Ingredients

Our chefs source premium whole spices, not pre-ground powders. Whole spices retain their essential oils, ensuring maximum freshness and flavour.

Some of the key spices used in our kitchen include:

* Cumin seeds for earthy warmth
* Coriander for citrus undertones
* Cardamom for aromatic sweetness
* Cloves for depth
* Turmeric for colour and wellness
* Kashmiri red chilli for rich colour without excessive heat

Each spice serves a purpose — none overpower the other.

---

## The Science of Roasting

Dry roasting spices unlocks their essential oils and enhances their natural aroma. Timing is everything. Even a few extra seconds can change the entire flavour profile.

At High Spirits, our chefs roast spices in small batches daily to preserve freshness and consistency.

This attention to detail is what elevates a simple curry into an extraordinary culinary experience.

---

## The Art of Blending

Garam Masala is perhaps the most famous Indian spice blend, but each region of India has its own signature mix.

Our kitchen prepares custom blends for:

* Butter Chicken
* Biryani
* Tandoori marinades
* Lentil preparations
* Signature buffet dishes

Every blend is carefully balanced to create layers of flavour — warm, sweet, smoky, and aromatic — all in perfect harmony.

---

## Health Benefits of Indian Spices

Beyond flavour, Indian spices are known for their wellness properties:

* Turmeric supports immunity
* Ginger aids digestion
* Cumin promotes metabolism
* Cloves have antioxidant properties

Indian cooking has always combined taste with health, long before it became a global trend.

---

## A Dining Experience Rooted in Tradition

When you dine at High Spirits, you are not just enjoying a meal — you are experiencing the artistry of spice mastery perfected over generations.

Every bite tells a story.

And that story begins with the perfect blend.`,
  },
];

export const blogCategories = ["Cuisine"];
export const journalCategories = blogCategories;

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function readingTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
