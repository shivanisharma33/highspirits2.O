import { media, type Media } from "@/lib/images";

/**
 * The High Spirits à la carte menu, transcribed from the restaurant's CMS
 * (menu-items + menu-categories). V = vegetarian, VG = vegan, S = spicy.
 */
export type Diet = "V" | "VG" | "S";

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  diet?: Diet[];
};

export type MenuCategory = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  image?: Media;
  items: MenuItem[];
};

export const dietLabels: Record<Diet, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  S: "Spicy",
};

export const menuCategories: MenuCategory[] = [
  {
    slug: "entree",
    title: "Entrée",
    short: "Entrée",
    intro: "Small plates to open the evening — crisp, tangy and fresh from the tandoor.",
    image: media.foodSizzler,
    items: [
      { name: "Vegetable Samosas", description: "3 pieces", price: 11.99, diet: ["V"] },
      { name: "Onion Bhaji", description: "5 pieces", price: 11.99, diet: ["V"] },
      { name: "Aloo Chaat", description: "Potato cubes topped with onions, tomatoes, chickpeas and sev, tossed with spices and herbs.", price: 10.99, diet: ["V"] },
      { name: "Aloo Tikki Chaat", description: "Crispy spiced potato patties topped with chickpeas, yogurt, tamarind and mint chutneys, finished with fresh herbs and crunchy sev.", price: 12.99, diet: ["V"] },
      { name: "Papadums", description: "5 pieces", price: 5.99, diet: ["V"] },
      { name: "Chicken Tikka", description: "Succulent chicken marinated in spiced yoghurt and traditional Indian spices, grilled for a smoky, tender finish. Served with fresh salad and mint chutney.", price: 15.9 },
      { name: "Tandoori Chicken (4 pieces)", description: "Juicy chicken marinated in yoghurt and aromatic spices, roasted in a traditional tandoor for a smoky, chargrilled flavour. Served with fresh salad and mint chutney.", price: 21.9 },
    ],
  },
  {
    slug: "platters",
    title: "High Spirits Special Platters",
    short: "Platters",
    intro: "Generous sharing boards built for the middle of the table.",
    image: media.dishTandooriGrill,
    items: [
      { name: "Vegetarian Platter", description: "Two vegetable samosas, two onion bhaji, two aloo tikki and two paneer pakoras.", price: 31.9, diet: ["V"] },
      { name: "Mixed Tandoori Grilled Platter", description: "Two seekh kebabs, two chicken tikka pieces, two tandoori prawns and two lamb cutlets.", price: 39.9 },
    ],
  },
  {
    slug: "chicken",
    title: "Chicken Lovers",
    short: "Chicken",
    intro: "From the gentle richness of butter chicken to the hottest curry in town.",
    image: media.dishButterChicken,
    items: [
      { name: "Butter Chicken", description: "Tender chicken in a creamy tomato and butter sauce.", price: 29.9 },
      { name: "Dhaba Butter Chicken", description: "Tandoor-style chicken simmered in tomato butter gravy, finished with Punjabi spices and a hint of smoky dhaba flavour.", price: 32.9 },
      { name: "Chicken Mushroom", description: "Chicken with mushrooms in an onion tomato gravy.", price: 29.9 },
      { name: "Chicken Kadhai", description: "Chicken cooked with capsicum, onion and ground spices.", price: 29.9 },
      { name: "Chicken Dhaba", description: "Tender chicken slow-cooked in a rich onion and tomato gravy with traditional North Indian spices, for bold, rustic flavour.", price: 29.9 },
      { name: "Chicken Chettinad", description: "South Indian curry with roasted spices and coconut.", price: 29.9 },
      { name: "Chicken Korma", description: "Mild cashew and cream based chicken curry.", price: 29.9 },
      { name: "Chicken Vindaloo", description: "Goan style spicy curry.", price: 29.9, diet: ["S"] },
      { name: "Mango Chicken", description: "Tender chicken simmered in a creamy sauce of ripe mango purée and aromatic spices.", price: 29.9 },
      { name: "Chicken Musibat", description: "Extremely spicy chicken curry — the hottest in town.", price: 29.9, diet: ["S"] },
      { name: "Kerala Chicken Roast", description: "South Indian style chicken roasted with curry leaves, onions, coconut and coastal spices.", price: 29.9 },
    ],
  },
  {
    slug: "meat",
    title: "Meat Lovers",
    short: "Lamb, Beef & Goat",
    intro: "Slow-cooked lamb, beef and goat — including the chef's grandmother's goat curry.",
    image: media.ingredientLamb,
    items: [
      { name: "Lamb Rogan Josh", description: "Kashmiri style lamb curry with spices.", price: 29.9 },
      { name: "Lamb Saag", description: "Diced lamb cooked with spinach, garlic and spices.", price: 29.9 },
      { name: "Lamb Korma", description: "Mild lamb curry in a cashew and cream based sauce.", price: 29.9 },
      { name: "Lamb Vindaloo", description: "Hot Goan style lamb curry.", price: 29.9, diet: ["S"] },
      { name: "Lamb Madras", description: "South Indian style lamb curry with coconut and selected spices.", price: 29.9 },
      { name: "Goat Curry", description: "The chef's grandmother's way of cooking — slow-cooked Punjabi style goat curry.", price: 29.9 },
      { name: "Goat Gongora", description: "Tender goat slow-cooked in a gravy of roasted spices, caramelised onions and herbs.", price: 29.9 },
      { name: "Beef Fry", description: "Tender beef slow-cooked with caramelised onion, curry leaves and roasted spices.", price: 29.9 },
      { name: "Pepper and Coconut Beef", description: "Beef tossed with cracked black pepper, coconut and spices.", price: 29.9 },
      { name: "Beef Hariyali Kerma", description: "Diced beef in a smooth green gravy of herbs, mint, coriander and mild spices.", price: 29.9 },
      { name: "Beef Vindaloo", description: "A fiery Goan style beef curry simmered with red chillies, garlic, vinegar and spices.", price: 29.9, diet: ["S"] },
      { name: "Beef Roast", description: "Slow-roasted beef in a dry masala with roasted spices, onions and curry leaves.", price: 29.9 },
    ],
  },
  {
    slug: "vegetarian",
    title: "Vegetarian and Vegan Lovers",
    short: "Vegetarian & Vegan",
    intro: "Paneer, lentils and garden vegetables, treated with the same devotion as everything else.",
    image: media.dishPalakPaneer,
    items: [
      { name: "Paneer Tikka Masala", description: "Char-grilled cottage cheese simmered in a tomato onion gravy, finished with cream and Indian spices.", price: 21.9, diet: ["V"] },
      { name: "Paneer Butter Masala", description: "Paneer in a creamy tomato gravy.", price: 21.9, diet: ["V"] },
      { name: "Paneer Lababdar", description: "Cottage cheese in a tomato onion gravy with cream and mild spices.", price: 21.9, diet: ["V"] },
      { name: "Palak Paneer", description: "Cottage cheese cooked with spinach, garlic and spices.", price: 21.9, diet: ["V"] },
      { name: "Malai Kofta", description: "Vegetable dumplings in a creamy cashew sauce.", price: 21.9, diet: ["V"] },
      { name: "Vegetable Korma", description: "Mixed vegetables in a mild cashew based sauce.", price: 21.9, diet: ["V"] },
      { name: "Dal Makhani", description: "Slow-cooked black lentils with butter and cream.", price: 21.9, diet: ["V"] },
      { name: "Chana Masala", description: "Chickpeas cooked in a spiced tomato gravy.", price: 21.9, diet: ["VG", "V"] },
      { name: "Aloo Gobi", description: "Potatoes and cauliflower cooked with Indian spices.", price: 21.9, diet: ["VG", "V"] },
      { name: "Saag Aloo", description: "Spinach, onions and Indian spices.", price: 21.9, diet: ["V"] },
      { name: "Methi Malai Mutter Mushroom", description: "Mushrooms and peas in a fenugreek-scented creamy sauce.", price: 21.9, diet: ["V"] },
      { name: "Mixed Vegetables", description: "Vegetables lightly spiced and sautéed.", price: 21.9, diet: ["V"] },
      { name: "Masala Okra", description: "Punjabi ladyfinger cooked with onions and garam masala.", price: 21.9, diet: ["V"] },
      { name: "Masala Aloo", description: "Tender potato cubes cooked with onions, tomatoes and Indian spices, finished with herbs.", price: 17.9, diet: ["V"] },
      { name: "Jeera Aloo", description: "Sautéed potatoes tossed with roasted cumin seeds, green chillies and Indian spices.", price: 17.9, diet: ["V"] },
    ],
  },
  {
    slug: "seafood",
    title: "Seafood Lovers",
    short: "Seafood",
    intro: "Coastal curries from Goa, Kerala, Malabar and Mumbai.",
    image: media.heroDish1,
    items: [
      { name: "Goan Fish Curry", description: "Cooked in coconut, tamarind and spices.", price: 31.9 },
      { name: "Kerala Fish Curry", description: "Fish curry with coconut and curry leaves.", price: 31.9 },
      { name: "Fish Malabar", description: "Malabar style fish curry with coconut milk and spices.", price: 31.9 },
      { name: "Bombay Fish Curry", description: "Fish simmered in a spiced tomato and coconut gravy with mustard seeds, curry leaves and Mumbai style spices.", price: 31.9 },
      { name: "Prawn Curry", description: "Succulent prawns in a traditional spiced curry.", price: 31.9 },
      { name: "Chilli Prawns", description: "Indo-Chinese style prawns with chilli, garlic and capsicum.", price: 31.9, diet: ["S"] },
      { name: "Prawn Tikka Masala", description: "Marinated prawns grilled and simmered in a spiced tomato masala, finished with cream and Indian spices.", price: 31.9 },
      { name: "Prawn 65 (Royalla 65)", description: "Crispy fried prawns marinated in spices, curry leaves and chilli.", price: 31.9, diet: ["S"] },
      { name: "Lime and Coriander Prawns", description: "Prawns sautéed with lime, coriander and mild spices.", price: 31.9 },
    ],
  },
  {
    slug: "rice",
    title: "Rice and Signature Biryanis",
    short: "Rice & Biryani",
    intro: "Fragrant basmati, from simple jeera rice to layered signature biryanis.",
    image: media.heroDish3,
    items: [
      { name: "Steamed Basmati Rice", description: "Steamed top quality basmati rice.", price: 5.9, diet: ["V"] },
      { name: "Jeera Rice", description: "Basmati rice tempered with roasted cumin seeds.", price: 6.9, diet: ["V"] },
      { name: "Jeera Peas Pulao", description: "Basmati rice cooked with cumin seeds and sweet green peas.", price: 7.9, diet: ["V"] },
      { name: "Kashmiri Rice", description: "Spiced rice infused with saffron, dry fruits and subtle sweetness.", price: 7.9, diet: ["V"] },
      { name: "Curd Rice", description: "Rice folded through creamy yoghurt, tempered with mustard seeds, curry leaves and green chillies. Served cold.", price: 11.9, diet: ["V"] },
      { name: "Mushroom Matar Pulao", description: "Fragrant basmati with mushroom and green peas.", price: 15.9, diet: ["V"] },
      { name: "Veg Biryani", description: "Rice, mixed vegetables and Indian spices.", price: 22.9, diet: ["V"] },
      { name: "Chicken Biryani", description: "Basmati rice and chicken cooked with biryani spices.", price: 25.9 },
      { name: "Lamb Biryani", description: "Basmati rice layered with tender lamb and aromatic spices.", price: 27.9 },
      { name: "Beef Biryani", description: "Basmati rice layered with beef and aromatic Indian spices.", price: 27.9 },
      { name: "Goat Biryani", description: "Tender goat and fragrant basmati cooked together in selected aromatic spices.", price: 27.9 },
    ],
  },
  {
    slug: "breads",
    title: "Clay Oven Cooked Fresh Breads",
    short: "Breads",
    intro: "Baked to order against the walls of the tandoor.",
    image: media.ingredientFlour,
    items: [
      { name: "Butter Naan", description: "Leavened flatbread baked in a clay oven, brushed with butter.", price: 4.9, diet: ["V"] },
      { name: "Garlic Naan", description: "Clay oven baked leavened bread with garlic.", price: 5.9, diet: ["V"] },
      { name: "Cheese Naan", description: "Naan stuffed with cheese, cooked in a clay oven.", price: 5.9, diet: ["V"] },
      { name: "Chilli Garlic Naan", description: "Naan baked in a clay oven with garlic and chilli.", price: 7.9, diet: ["V", "S"] },
      { name: "Pizza Naan", description: "Naan baked in a clay oven with a pizza-style filling.", price: 7.9 },
      { name: "Chicken Cheese Naan", description: "Tandoor-baked naan filled with chicken and cheese.", price: 7.9 },
      { name: "Kashmiri Naan", description: "Stuffed with nuts and dry fruit.", price: 8.9, diet: ["V"] },
      { name: "Tandoori Roti", description: "Wholemeal unleavened flatbread cooked in a clay oven.", price: 4.5, diet: ["V"] },
    ],
  },
];

/** The evening buffet — served from 5:00 PM (CMS: buffet-categories / buffet-items). */
export const buffet = {
  price: 39.99,
  starts: "5:00 PM",
  courses: [
    {
      title: "Starters",
      items: [
        { name: "Veg Samosa", description: "Crispy pastry with spiced vegetables", diet: ["V"] as Diet[] },
        { name: "Mixed Pakoras", description: "Assorted vegetables in gram flour batter", diet: ["V"] as Diet[] },
        { name: "Fish Pakoras", description: "Tender fish in a crispy coating" },
        { name: "Honey Chilli Chicken", description: "Spicy and sweet glazed chicken", diet: ["S"] as Diet[] },
      ],
    },
    {
      title: "Signature Curries",
      items: [
        { name: "Butter Chicken", description: "Tender chicken in rich tomato cream sauce" },
        { name: "Lamb Saag", description: "Lamb cooked with creamy spinach" },
        { name: "Lamb Vindaloo", description: "Fiery lamb curry with potatoes", diet: ["S"] as Diet[] },
        { name: "Dal Makhani", description: "Slow-cooked black lentils with butter and cream", diet: ["V"] as Diet[] },
        { name: "Chana Masala", description: "Chickpea curry with aromatic spices", diet: ["V"] as Diet[] },
        { name: "Shahi Paneer", description: "Cottage cheese in creamy fenugreek sauce", diet: ["V"] as Diet[] },
      ],
    },
    {
      title: "Desserts",
      items: [
        { name: "Gulab Jamun", description: "Milk dumplings in rose-cardamom syrup", diet: ["V"] as Diet[] },
        { name: "Rice Pudding", description: "Creamy rice pudding with cardamom and nuts", diet: ["V"] as Diet[] },
      ],
    },
  ],
};

export const menuItemCount = menuCategories.reduce((n, c) => n + c.items.length, 0);
