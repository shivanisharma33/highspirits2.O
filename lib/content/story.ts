import { media } from "@/lib/images";
import { accolade } from "@/lib/site";

/** Brand narrative — wording taken from the existing High Spirits site. */
export const intro = {
  lead: "At High Spirits, cooking is an expression of soul and storytelling where the rich traditions of Punjab meet the modern spirit of Australia.",
  body: "Every plate reflects balance, emotion and a deep respect for heritage, crafted for those who appreciate refined Indian fine dining in Bunbury, WA.",
};

export const mission = [
  "At High Spirits, we bring the soul of India to the heart of Bunbury, WA, crafting an experience that goes far beyond a meal. As a refined restaurant & bar, our vision is rooted in authenticity, honouring time-loved Indian recipes while presenting them with modern elegance and thoughtful detail.",
  "We see food as an art form and a celebration of culture, connection and life’s finest moments. Every dish carries a story of heritage, passion and uncompromising quality, designed to be savoured slowly and remembered fondly. From warm hospitality to elevated flavours, High Spirits proudly represents Indian fine dining at its most expressive, setting a new benchmark for fine dining Australia can truly be proud of right here in Bunbury.",
];

export const chef = {
  name: "Amardeep Singh",
  role: "Executive Chef & Co-Founder",
  experience: "20+",
  philosophyTitle: "CHEF'S PHILOSOPHY",
  philosophy:
    "At High Spirits, cooking is an expression of soul and storytelling where the rich traditions of Punjab meet the modern spirit of Australia. Every plate reflects balance, emotion and a deep respect for heritage, crafted for those who appreciate refined Indian fine dining in Bunbury, WA..",
  bio: "Led by Amardeep Singh, our Executive Chef with over 20 years of global culinary experience, the kitchen blends time-honoured techniques with contemporary finesse. Using the finest seasonal ingredients, High Spirits stands proudly as a destination restaurant & bar, redefining fine dining in Australia through flavour, warmth and unforgettable experiences.",
  quote: "Cooking is an expression of soul and storytelling.",
  portrait: media.chefKitchen,
  inset: media.chefAmardeep,
  accolades: [
    "Chef of the Year 2020 - Australian Culinary Federation",
    "Michelin Guide Featured 2022",
    "Best Indian Restaurant - Gourmet Traveller 2023",
    "Top 50 Chefs in Australia - Food & Wine Magazine",
  ],
};

export const partner = {
  name: "Chef Ishpreet Bedi",
  role: "Business Partner",
  title: "From Punjab to Australia",
  eyebrow: "Leadership & Hospitality",
  bio: "Our business partner, Ishpreet Bedi, grew up in the heart of Punjab, where hospitality is a way of life. From an early age, she learned that successful businesses are built on care, consistency and attention to detail—values she brings into every aspect of operations and guest experience.",
  secondBio:
    "With a refined vision shaped by hospitality experience across India and Australia, Ishpreet Bedi leads the brand with a focus on operational excellence, cultural authenticity and elevated guest experiences.",
  paragraphs: [
    "Our business partner, Ishpreet Bedi, grew up in the heart of Punjab, where hospitality is a way of life. From an early age, she learned that successful businesses are built on care, consistency and attention to detail—values she brings into every aspect of operations and guest experience.",
    "With a refined vision shaped by hospitality experience across India and Australia, Ishpreet Bedi leads the brand with a focus on operational excellence, cultural authenticity and elevated guest experiences.",
  ],
  portrait: media.partnerIshpreet,
  inset: media.opening1,
  highlights: [
    "Care & Consistency",
    "Warm-Hearted Hospitality",
    "Fine Dining Standard",
  ],
};

export const team = {
  eyebrow: "The Team",
  title: "Passionate Professionals",
  lead: "Our team of expert chefs, sommeliers and hospitality professionals work in perfect harmony to create an unforgettable experience. Each member brings years of expertise and a deep commitment to excellence.",
  body: "From our executive chef to our front-of-house team, everyone at High Spirit shares a common goal: to exceed your expectations and create memories that last a lifetime.",
  images: [media.teamCelebration, media.teamFamily, media.teamWithGuests],
};

export const philosophy = [
  {
    word: "Heritage",
    title: "Recipes that remember",
    body: "Every dish carries a story of heritage, passion and uncompromising quality — time-loved Punjabi recipes, whole spices roasted in small batches and the joyful spirit of Chardi Kala.",
    image: media.spices,
  },
  {
    word: "Craft",
    title: "Hours in every plate",
    body: "Behind every dish lies hours of preparation, ancient techniques and modern innovation. From our slow-cooked dal to our tandoor-roasted meats, each element is crafted with precision and passion.",
    image: media.foodSizzler,
  },
  {
    word: "Innovation",
    title: "Punjab, reimagined",
    body: "We marry the complex spice profiles of Punjab with the clean, produce-driven ethos of Australian fine dining — honouring tradition while embracing contemporary technique.",
    image: media.heroDish1,
  },
];

export const values = [
  {
    title: "Passion",
    body: "Every dish is crafted with love and dedication to authentic flavors",
  },
  {
    title: "Excellence",
    body: "We pursue perfection in every aspect of the dining experience",
  },
  {
    title: "Quality",
    body: "Only the finest ingredients meet our exacting standards",
  },
  {
    title: "Innovation",
    body: "Tradition meets modern culinary artistry in every creation",
  },
];

export const aboutMilestones = [
  {
    year: "2003",
    title: "The Beginning",
    description: "High Spirit was founded with a vision to bring authentic Indian luxury dining to Australia",
  },
  {
    year: "2008",
    title: "First Award",
    description: "Recognized as Best Indian Restaurant in Sydney by the Australian Culinary Awards",
  },
  {
    year: "2015",
    title: "Expansion",
    description: "Opened our second location and introduced our signature tasting menu",
  },
  {
    year: "2020",
    title: "Global Recognition",
    description: "Featured in the World's 50 Best Restaurants list for Indian cuisine",
  },
  {
    year: "2024",
    title: "Continued Excellence",
    description: "Celebrating over 50,000 satisfied guests and numerous culinary accolades",
  },
];

export const recognitionAwards = [
  {
    metric: "15+",
    title: "15+ Culinary Awards",
    description: "Recognition from prestigious organizations",
    badge: "Accredited",
  },
  {
    metric: "Top 3",
    title: "Top 3 in Sydney",
    description: "Consistently ranked among the best",
    badge: "Ranked",
  },
  {
    metric: "50,000+",
    title: "50,000+ Happy Guests",
    description: "Creating memories since 2003",
    badge: "Milestone",
  },
];

/** Story chapters — deliberately undated except where a date is on record. */
export const chapters = [
  {
    mark: "I",
    label: "Punjab",
    title: "Where it begins",
    body: "Authentic Punjabi recipes, whole spices roasted daily in small batches and a table that always has room for one more.",
    image: media.spices,
  },
  {
    mark: "II",
    label: "The craft",
    title: "Two decades at the stove",
    body: "Executive Chef Amardeep Singh brings more than 20 years of global culinary experience — time-honoured technique, contemporary finesse.",
    image: media.chefAmardeep,
  },
  {
    mark: "III",
    label: "Victoria Street",
    title: "A home in Bunbury",
    body: "High Spirits opens at 1/57 Victoria Street as a destination restaurant & bar, bringing the soul of India to the heart of Bunbury, WA.",
    image: media.exteriorNight,
  },
  {
    mark: "IV",
    label: "Grand opening",
    title: "Bunbury pulls up a chair",
    body: "A grand opening buffet welcomes the community to the table — the first of many celebrations under the emerald glow.",
    image: media.opening1,
  },
  {
    mark: "V",
    label: "2026",
    title: accolade.title,
    body: `Recognised by diners in the ${accolade.body} — an honour voted for by the people we cook for.`,
    image: media.guests8,
  },
];

export const stats = [
  { value: "100%", label: "Authentic Punjabi recipes" },
  { value: "7 Days", label: "Freshly served" },
  { value: "20+", label: "Years of culinary craft" },
];
