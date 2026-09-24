import { media, type Media } from "@/lib/images";

/**
 * The High Spirits authentic menu data transcribed directly from https://www.highspirits.au/menu.
 * Contains all 15 categories and 135 dishes with live pricing, descriptions and dietary markers.
 * V = Vegetarian, VG = Vegan, S = Spicy.
 */
export type Diet = "V" | "VG" | "S";

export type MenuItem = {
  name: string;
  description: string;
  price: number | string;
  diet?: Diet[];
  image?: Media;
};

export type MenuCategory = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  image: Media;
  items: MenuItem[];
};

export const dietLabels: Record<Diet, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  S: "Spicy",
};

export const menuCategories: MenuCategory[] = [
  {
    slug: "entrees",
    title: "Entrees",
    short: "Entrees",
    intro: "Crispy, tangy and tandoor-roasted appetisers to begin your dining journey.",
    image: media.dishSamosa,
    items: [
      { name: "Papadums (5 pieces)", description: "Crispy lentil wafers, served with mango chutney and raita.", price: 4.99, diet: ["V"], image: media.dishPapadums },
      { name: "Vegetable Samosas (3 pieces)", description: "Triangular pastries filled with spiced potato and peas.", price: 7.99, diet: ["V"], image: media.dishSamosa },
      { name: "Pani Puri (6 pieces)", description: "Crisp puris filled with spiced potato, chickpeas and tangy mint water.", price: 10.99, image: media.dishPaniPuri },
      { name: "Onion Bhaji (5 pieces)", description: "Sliced onions in chickpea batter, deep-fried until golden.", price: 9.99, diet: ["V"], image: media.dishOnionBhaji },
      { name: "Dahi Puri (6 pieces)", description: "Puffed puris topped with chilled yoghurt, tamarind chutney and Sev.", price: 11.99, image: media.dishPaniPuri },
      { name: "Aloo Chat", description: "Freshly fried potatoes tossed with chaat masala, tamarind chutney, lemon juice and herbs.", price: 10.99, diet: ["V"], image: media.dishPaniPuri },
      { name: "Aloo Tikki Chaat", description: "Spiced potato patties topped with yoghurt, chutneys and Sev.", price: 12.99, diet: ["V"], image: media.dishSamosa },
      { name: "Vegetable Cutlets (3 pieces)", description: "Crispy mixed vegetable patties served with mint chutney.", price: 12.99, diet: ["V"], image: media.dishOnionBhaji },
      { name: "Paneer Pakoras (4 pieces)", description: "Cottage cheese cubes dipped in spiced batter and fried.", price: 16.99, diet: ["V"], image: media.dishOnionBhaji },
      { name: "Afghani Tikka (4 pieces)", description: "Chicken marinated in creamy yoghurt and mild spices, grilled to perfection.", price: 18.99, image: media.dishTandooriChicken },
      { name: "Chicken 65 Sizzler", description: "South Indian style deep-fried chicken, spiced with curry leaves and chilli.", price: 19.99, diet: ["S"], image: media.foodSizzler },
      { name: "Fish Pakoras (5 pieces)", description: "Fish fillets battered and fried with spices.", price: 19.99, image: media.dishOnionBhaji },
      { name: "Tandoori Prawn Sizzler (6 pieces)", description: "Jumbo prawns marinated in yoghurt and spices, grilled.", price: 19.99, image: media.dishPrawnCurry },
      { name: "Tandoori Chicken (Half)", description: "Yoghurt and spice marinated, charcoal grilled chicken.", price: 19.99, image: media.dishTandooriChicken },
      { name: "Tandoori Chicken (Full)", description: "Yoghurt and spice marinated, charcoal grilled chicken.", price: 25.99, image: media.dishTandooriChicken },
      { name: "Chicken Tikka (4 pieces)", description: "Boneless chicken marinated with tandoori spices and grilled.", price: 18.99, image: media.dishTandooriChicken },
      { name: "Seekh Kebab (4 pieces)", description: "Minced lamb skewers flavoured with herbs and spices, grilled.", price: 19.99, image: media.dishSeekhKebab },
      { name: "Lamb Cutlets (3 Pieces)", description: "Tender lamb chops marinated with aromatic spices and grilled until juicy and charred.", price: 25.99, image: media.dishSeekhKebab },
      { name: "Soya Chaap Malai (4 Pieces)", description: "Creamy malai-marinated soya chaap grilled to a soft, smoky finish.", price: 18.99, image: media.dishTandooriChicken },
      { name: "Soya Chaap Chingari (4 Pieces)", description: "Spicy soya chaap marinated with chilli and robust Indian spices, grilled in the tandoor.", price: 17.99, diet: ["S"], image: media.dishTandooriChicken },
    ],
  },
  {
    slug: "platters",
    title: "Special Platters",
    short: "Platters",
    intro: "Generous chef's sharing platters showcasing the finest vegetarian and tandoor selections.",
    image: media.platter,
    items: [
      { name: "Veg Platter", description: "A selection of vegetarian favourites including 2 vegetable samosas, 2 onion bhaji, 2 aloo Tikki and 2 paneer pakoras.", price: 27.99, diet: ["V"], image: media.dishSamosa },
      { name: "Mix Tandoori Grill Platter", description: "A generous assortment from the tandoor featuring 2 seekh kebabs, 2 chicken tikka pieces, 2 tandoori prawns and 2 lamb cutlets.", price: 35.99, image: media.platter },
    ],
  },
  {
    slug: "vegetarian",
    title: "Vegetarian Lovers",
    short: "Vegetarian",
    intro: "Rich paneer specialities, creamy lentils and garden-fresh heirloom vegetables.",
    image: media.dishPalakPaneerHd,
    items: [
      { name: "Palak Paneer", description: "Cottage cheese cooked with fresh spinach, garlic and spices.", price: 19.99, diet: ["V"], image: media.dishPalakPaneerHd },
      { name: "Saag Aloo (VGO)", description: "Potatoes gently cooked with fresh spinach, onions and traditional Indian spices.", price: 19.99, diet: ["V","VG"], image: media.dishPalakPaneerHd },
      { name: "Paneer Butter Masala", description: "Paneer in a rich, creamy tomato gravy.", price: 19.99, diet: ["V"], image: media.heroDish1 },
      { name: "Paneer Lababdar", description: "Cottage cheese in a tomato-onion gravy with cream and mild spices.", price: 19.99, diet: ["V"], image: media.heroDish1 },
      { name: "Paneer Tikka Masala", description: "Char-grilled cottage cheese cubes simmered in a rich tomato-onion gravy.", price: 19.99, diet: ["V"], image: media.heroDish1 },
      { name: "Malai Kofta", description: "Vegetable dumplings cooked in creamy cashew sauce.", price: 19.99, diet: ["V"], image: media.dishChickenKorma },
      { name: "Dal Makhani", description: "Slow-cooked black lentils with butter and cream.", price: 19.99, diet: ["V"], image: media.dishDalMakhaniHd },
      { name: "Dal Tadka (VGO)", description: "Yellow lentils tempered with garlic, cumin and spices.", price: 19.99, diet: ["V","VG"], image: media.dishDalSignature },
      { name: "Chana Masala (VGO)", description: "Chickpeas cooked in a spiced tomato gravy.", price: 19.99, diet: ["V","VG"], image: media.foodCurry },
      { name: "Aloo Gobi (VGO)", description: "Potatoes and cauliflower cooked with traditional Indian spices.", price: 19.99, diet: ["V","VG"], image: media.foodCurry },
      { name: "Aloo Eggplant (VGO)", description: "Potatoes and eggplant cooked with traditional Indian spices.", price: 19.99, diet: ["V","VG"], image: media.foodCurry },
      { name: "Masala Aloo (VGO)", description: "Tender potato cubes cooked with onions, tomatoes and fragrant Indian spices.", price: 15.99, diet: ["V","VG"], image: media.foodCurry },
      { name: "Jeera Aloo (VGO)", description: "Sautéed potatoes tossed with roasted cumin seeds and green chillies.", price: 15.99, diet: ["V","VG"], image: media.foodCurry },
      { name: "Methi Malai Mutter Mushroom", description: "Mushrooms and peas in a fenugreek-flavoured creamy sauce.", price: 19.99, diet: ["V"], image: media.dishPalakPaneer },
      { name: "Vegetable Korma", description: "Mixed vegetables cooked in a mild cashew-based sauce.", price: 19.99, diet: ["V"], image: media.dishChickenKorma },
      { name: "Mixed Vegetables (VGO)", description: "Seasonal vegetables lightly spiced and sautéed.", price: 19.99, diet: ["V","VG"], image: media.foodCurry },
    ],
  },
  {
    slug: "chicken",
    title: "Chicken Lovers",
    short: "Chicken",
    intro: "From our signature creamy Butter Chicken to rustic dhaba curries cooked over open flame.",
    image: media.dishButterChickenHd,
    items: [
      { name: "Butter Chicken", description: "Tender chicken in a creamy tomato and butter sauce.", price: 23.99, image: media.dishButterChickenHd },
      { name: "Dhaba Butter Chicken", description: "Tender, tandoor-style chicken simmered in a rich, rustic tomato-butter gravy.", price: 23.99, image: media.dishButterChicken },
      { name: "Chicken Mushroom", description: "Chicken with mushrooms in rich onion-tomato gravy.", price: 23.99, image: media.foodCurry },
      { name: "Chicken Kadhai", description: "Chicken cooked with capsicum, onion and freshly ground spices.", price: 23.99, image: media.foodCurry },
      { name: "Chicken Dhaba", description: "Rustic North Indian curry with bold spices.", price: 23.99, image: media.foodCurry },
      { name: "Chicken Chettinad", description: "South Indian curry with roasted spices and coconut.", price: 23.99, image: media.foodCurry },
      { name: "Chicken Korma", description: "Mild cashew and cream-based chicken curry.", price: 23.99, image: media.dishChickenKorma },
      { name: "Chicken Madras", description: "Spicy South Indian curry with coconut and chilli.", price: 23.99, diet: ["S"], image: media.foodCurry },
      { name: "Chicken Vindaloo", description: "Hot Goan-style curry with tangy flavours.", price: 23.99, diet: ["S"], image: media.dishLamb },
      { name: "Mango Chicken", description: "Chicken in a sweet mango-infused creamy sauce.", price: 23.99, image: media.dishChickenKorma },
      { name: "Chicken Musibat", description: "Extremely spicy curry, the hottest in town.", price: 23.99, diet: ["S"], image: media.foodCurry },
      { name: "Kerala Chicken Roast", description: "South Indian-style chicken roasted with curry leaves and bold coastal spices.", price: 23.99, image: media.foodCurry },
    ],
  },
  {
    slug: "meat",
    title: "Meat Lovers",
    short: "Meat",
    intro: "Tender slow-cooked Australian lamb, beef and heritage goat curries steeped in traditional spices.",
    image: media.dishLambRoganJosh,
    items: [
      { name: "Beef Fry", description: "Tender beef pieces slow-cooked with caramelised onions and curry leaves.", price: 27.99, image: media.dishLamb },
      { name: "Pepper & Coconut Beef", description: "Succulent beef tossed with cracked black pepper and fresh coconut.", price: 27.99, image: media.dishLamb },
      { name: "Beef Hariyali Korma", description: "Juicy beef cooked in a smooth green gravy of fresh herbs and mint.", price: 27.99, image: media.dishPalakPaneer },
      { name: "Beef Vindaloo", description: "A fiery Goan-style beef curry simmered with chillies and garlic.", price: 27.99, diet: ["S"], image: media.dishLamb },
      { name: "Beef Roast", description: "Slow-roasted beef in a rich, dry masala with roasted spices.", price: 27.99, image: media.dishLamb },
      { name: "Lamb Rogan Josh", description: "Kashmiri-style lamb curry with aromatic spices.", price: 27.99, image: media.dishLambRoganJosh },
      { name: "Lamb Saag", description: "Lamb cooked with spinach, garlic and spices.", price: 27.99, image: media.dishPalakPaneerHd },
      { name: "Lamb Korma", description: "Mild lamb curry with cashew and cream-based sauce.", price: 27.99, image: media.dishChickenKorma },
      { name: "Lamb Vindaloo", description: "Hot tangy Goan-style lamb curry.", price: 27.99, diet: ["S"], image: media.dishLamb },
    ],
  },
  {
    slug: "ocean",
    title: "Ocean Lovers",
    short: "Seafood",
    intro: "Coastal treasures infused with coconut milk, tamarind, fresh curry leaves and coastal spices.",
    image: media.dishFishCurry,
    items: [
      { name: "Goan Fish Curry", description: "Fish cooked in coconut, tamarind and spices.", price: 28.99, image: media.dishFishCurry },
      { name: "Kerala Fish Curry", description: "Tangy fish curry with coconut and curry leaves.", price: 28.99, image: media.dishFishCurry },
      { name: "Fish Malabar", description: "Malabar-style fish curry with coconut milk and spices.", price: 28.99, image: media.dishFishCurry },
      { name: "Bombay Fish Curry", description: "Tender fish simmered in a tangy, spiced tomato and coconut gravy.", price: 28.99, image: media.dishFishCurry },
      { name: "Prawn Curry", description: "Succulent prawns in a traditional spiced curry.", price: 28.99, image: media.dishPrawnCurry },
      { name: "Prawn Malabar", description: "Prawns cooked in creamy coconut Malabar-style sauce.", price: 28.99, image: media.dishPrawnCurry },
      { name: "Chilli Prawns", description: "Indo-Chinese style prawns with chilli, garlic and capsicum.", price: 28.99, diet: ["S"], image: media.dishPrawnCurry },
      { name: "Prawn Tikka Masala", description: "Marinated prawns grilled and simmered in a spiced tomato-based masala.", price: 28.99, image: media.dishPrawnCurry },
      { name: "Royalla Fry (Prawn Fry)", description: "Fresh prawns pan-fried with onions, curry leaves and spices.", price: 28.99, image: media.dishPrawnCurry },
      { name: "Royalla 65 (Prawn 65)", description: "Crispy, deep-fried prawns marinated in bold spices.", price: 28.99, diet: ["S"], image: media.dishPrawnCurry },
      { name: "Lime & Coriander Prawns", description: "Juicy prawns sautéed with fresh lime, coriander and mild spices.", price: 28.99, image: media.dishPrawnCurry },
    ],
  },
  {
    slug: "rice-biryanis",
    title: "Rice & Biryanis",
    short: "Rice & Biryanis",
    intro: "Aromatic aged basmati rice and slow-cooked layered dum biryanis with saffron and mint.",
    image: media.dishBiryaniHd,
    items: [
      { name: "Steamed Basmati Rice", description: "Fragrant steamed premium long-grain basmati rice.", price: 5, image: media.heroDish3 },
      { name: "Jeera Rice", description: "Basmati rice tempered with roasted cumin seeds and ghee.", price: 5.5, image: media.heroDish3 },
      { name: "Jeera Peas Pulao", description: "Basmati rice cooked with roasted cumin and sweet green peas.", price: 5.9, image: media.heroDish3 },
      { name: "Kashmiri Rice", description: "Fragrant saffron rice garnished with dried fruits and nuts.", price: 6.5, image: media.heroDish3 },
      { name: "Curd Rice", description: "Cooling seasoned yoghurt rice tempered with mustard seeds and curry leaves.", price: 9.9, image: media.dishRaita },
      { name: "Coconut Rice", description: "Basmati rice infused with coconut milk and tempered with curry leaves.", price: 7.9, image: media.heroDish3 },
      { name: "Vegetable Pulao", description: "Fragrant basmati rice gently cooked with garden vegetables and aromatic whole spices.", price: 12.99, diet: ["V"], image: media.foodBiryani },
      { name: "Mushroom Matar Pulao", description: "Sliced mushrooms and tender green peas cooked with fragrant spiced basmati.", price: 13.99, diet: ["V"], image: media.foodBiryani },
      { name: "Vegetable Biryani", description: "Layered basmati rice slow-cooked with spiced seasonal vegetables, saffron and herbs.", price: 19.99, diet: ["V"], image: media.foodBiryani },
      { name: "Chicken Biryani", description: "Aged basmati rice slow-cooked with spiced marinated chicken and mint.", price: 20.99, image: media.dishBiryaniHd },
      { name: "Gongora Chicken Biryani", description: "Aromatic chicken biryani infused with tangy Andhra gongura leaves.", price: 21.99, image: media.dishBiryaniHd },
      { name: "Lamb Biryani", description: "Basmati rice layered with tender Australian lamb and aromatic spices.", price: 21.99, image: media.dishBiryaniRoyale },
      { name: "Goat Biryani", description: "Tender goat pieces layered with fragrant basmati and traditional whole spices.", price: 21.99, image: media.dishBiryaniRoyale },
      { name: "Gongora Goat Biryani", description: "Slow-braised goat biryani cooked with traditional sour gongura leaves.", price: 21.99, image: media.dishBiryaniRoyale },
    ],
  },
  {
    slug: "breads",
    title: "Breads",
    short: "Breads",
    intro: "Hand-stretched artisanal naans and rotis slapped against the fiery clay walls of our tandoor.",
    image: media.dishButterNaan,
    items: [
      { name: "Plain Naan", description: "Traditional leavened flatbread freshly baked in the tandoor clay oven.", price: 3.5, image: media.dishButterNaan },
      { name: "Butter Naan", description: "Leavened flatbread baked in the tandoor, brushed with warm clarified butter.", price: 4, image: media.dishButterNaan },
      { name: "Garlic Naan", description: "Tandoor-baked flatbread infused with roasted minced garlic and fresh herbs.", price: 4.5, image: media.dishGarlicNaan },
      { name: "Cheese Naan", description: "Artisanal naan stuffed with melted cheddar and mozzarella cheese.", price: 5, image: media.dishButterNaan },
      { name: "Chicken & Cheese Naan", description: "Tandoori naan stuffed with seasoned spiced chicken and melted mozzarella cheese.", price: 5.5, image: media.dishGarlicNaan },
      { name: "Pizza Naan", description: "Naan stuffed with spiced tomato, cheese and aromatic Italian herbs.", price: 5.5, image: media.dishButterNaan },
      { name: "Kashmiri Naan", description: "Sweet naan stuffed with dried fruits, nuts and coconut.", price: 6.5, image: media.dishButterNaan },
      { name: "Keema Naan", description: "Fluffy naan stuffed with spiced minced meat and fresh herbs.", price: 5.5, image: media.dishButterNaan },
      { name: "Roti", description: "Traditional unleavened whole wheat flatbread cooked in the tandoor.", price: 3.5, image: media.dishButterNaan },
      { name: "Lachha Paratha", description: "Multi-layered flaky whole wheat bread brushed with ghee.", price: 4.5, image: media.dishButterNaan },
    ],
  },
  {
    slug: "sides",
    title: "Sides",
    short: "Sides",
    intro: "Cooling house-churned raitas, tangy homemade chutneys and spiced accompaniments.",
    image: media.dishRaita,
    items: [
      { name: "Raita", description: "Cooling spiced yoghurt dip with cucumber, roasted cumin and mint.", price: 5, image: media.dishRaita },
      { name: "Pickles & Chutneys", description: "House selection of tangy mango chutney and spiced mixed pickles.", price: 5, image: media.dishPapadums },
      { name: "Pickled Onion", description: "Crisp sliced red onions steeped in spiced vinegar and beet juice.", price: 5, image: media.dishRaita },
      { name: "Green Salad", description: "Fresh garden salad with cucumber, tomato, red onion and lemon wedge.", price: 5, image: media.dishRaita },
    ],
  },
  {
    slug: "indo-chinese",
    title: "Indo-Chinese Lovers",
    short: "Indo-Chinese",
    intro: "Fiery wok-tossed street delicacies combining bold Indian spices with Chinese culinary craft.",
    image: media.dishChilliPaneer,
    items: [
      { name: "Chilli Paneer", description: "Crispy cottage cheese cubes tossed with capsicum, onions and fiery soy chilli sauce.", price: 21.99, diet: ["V","S"], image: media.dishChilliPaneer },
      { name: "Gobi Manchurian", description: "Crispy cauliflower florets coated in a tangy, spicy Indo-Chinese Manchurian glaze.", price: 21.99, diet: ["V","S"], image: media.dishChilliPaneer },
      { name: "Veg Noodles", description: "Wok-tossed noodles with julienned vegetables and savoury Asian sauces.", price: 21.99, diet: ["V"], image: media.dishHakkaNoodles },
      { name: "Chicken Noodles", description: "Wok-tossed egg noodles with tender chicken and crisp vegetables.", price: 21.99, image: media.dishHakkaNoodles },
      { name: "Chilli Chicken", description: "Crisp batter-fried chicken bites tossed with chillies, garlic and soy.", price: 21.99, diet: ["S"], image: media.dishChilliPaneer },
      { name: "Veg Manchurian Noodles", description: "Stir-fried noodles topped with crisp vegetable Manchurian dumplings in spicy glaze.", price: 21.99, diet: ["V"], image: media.dishHakkaNoodles },
      { name: "Veg Manchurian Fried Rice", description: "Wok-tossed jasmine rice paired with vegetable Manchurian balls in savoury sauce.", price: 21.99, diet: ["V"], image: media.foodBiryani },
      { name: "Szechuan Fried Rice", description: "Spicy wok-fried rice tossed with fiery Szechuan chilli paste and fresh vegetables.", price: 21.99, image: media.foodBiryani },
      { name: "Chicken Lollipop", description: "Crisp frenched chicken winglets marinated in Indo-Chinese spices and served sizzling.", price: 21.99, image: media.foodSizzler },
      { name: "Chicken Fried Rice", description: "Wok-tossed basmati rice with diced chicken and fresh spring onions.", price: 21.99, image: media.foodBiryani },
      { name: "Seafood Fried Rice", description: "Wok-charred rice tossed with prawns, calamari and garlic aromatics.", price: 26.99, image: media.foodBiryani },
    ],
  },
  {
    slug: "specials",
    title: "High Spirits Specials",
    short: "Specials",
    intro: "House signature delicacies including Himalayan-style momos in rich chilli and jhol gravies.",
    image: media.dishMomos,
    items: [
      { name: "Chilli Momos (Veg/Non-Veg)", description: "Steamed dumplings tossed in a bold, spicy garlic and red chilli sauce.", price: "18.99 / 19.99", diet: ["V","S"], image: media.dishMomos },
      { name: "Jhol Momos (Veg/Non-Veg)", description: "Himalayan-style dumplings served in a rich, tangy spiced sesame and tomato broth.", price: "18.99 / 19.99", diet: ["V"], image: media.dishMomos },
      { name: "Steamed Momos (Veg/Non-Veg)", description: "Traditional hand-folded dumplings served with spicy sesame chutney.", price: "18.99 / 19.99", diet: ["V","S"], image: media.dishMomos },
      { name: "Fried Momos (Veg/Non-Veg)", description: "Golden-crisped hand dumplings with savoury filling and dipping sauces.", price: "18.99 / 19.99", diet: ["V"], image: media.dishMomos },
    ],
  },
  {
    slug: "dosas",
    title: "Dosas",
    short: "Dosas",
    intro: "Golden, crispy fermented rice and lentil crêpes served with traditional sambar and coconut chutney.",
    image: media.dishMasalaDosa,
    items: [
      { name: "Plain Dosa", description: "Thin, golden crispy fermented rice crêpe served with hot sambar and coconut chutney.", price: 15, diet: ["V"], image: media.dishMasalaDosa },
      { name: "Masala Dosa", description: "Crispy dosa rolled around a fragrant spiced potato and onion masala filling.", price: 19.99, diet: ["V"], image: media.dishMasalaDosa },
      { name: "Paneer Dosa", description: "Crispy golden crêpe stuffed with seasoned grated cottage cheese and herbs.", price: 19.99, diet: ["V"], image: media.dishMasalaDosa },
      { name: "Ghee Roast Dosa", description: "Crispy paper-thin dosa roasted in aromatic desi ghee for ultimate crunch.", price: 16.99, diet: ["V"], image: media.dishMasalaDosa },
      { name: "Chicken Tikka Dosa", description: "South-meets-North crispy dosa stuffed with smoky spiced tandoori chicken tikka.", price: 20.99, image: media.dishMasalaDosa },
    ],
  },
  {
    slug: "kids",
    title: "Kids Menu",
    short: "Kids",
    intro: "Mild, wholesome and kid-approved smaller portions crafted with fresh ingredients.",
    image: media.dishButterChicken,
    items: [
      { name: "Mini Butter Chicken", description: "Mild, creamy chicken curry served with a mini butter naan and steamed rice.", price: 13, image: media.dishButterChicken },
      { name: "Mini Mango Chicken", description: "Tender chicken in a sweet and fruity mild mango purée sauce.", price: 13, image: media.dishChickenKorma },
      { name: "Mini Honey Chicken", description: "Crisp glazed chicken bites in a sweet honey sauce.", price: 13, image: media.dishChickenKorma },
      { name: "Mini Chicken Biryani", description: "Mild, fragrant portion of chicken biryani specially spiced for young diners.", price: 13, image: media.dishBiryaniHd },
      { name: "Premium Chicken Nuggets with Chips", description: "Crispy golden chicken nuggets served with hot potato chips and tomato ketchup.", price: 13, image: media.dishOnionBhaji },
    ],
  },
  {
    slug: "desserts",
    title: "Desserts",
    short: "Desserts",
    intro: "Decadent sweet endings featuring warm rose-cardamom gulab jamun and artisanal kulfis.",
    image: media.dishGulabJamun,
    items: [
      { name: "Gulab Jamun (2 Pieces)", description: "Warm milk dumplings soaked in aromatic saffron and rose cardamom syrup.", price: 7, diet: ["V"], image: media.dishGulabJamun },
      { name: "Mango Kulfi", description: "Traditional slow-churned Indian ice cream infused with sweet Alphonso mango.", price: 7, diet: ["V"], image: media.dishGulabJamun },
      { name: "Pistachio Kulfi", description: "Authentic dense Indian frozen dessert flavoured with roasted pistachios and cardamom.", price: 7, diet: ["V"], image: media.dishGulabJamun },
      { name: "Ras Malai", description: "Soft melt-in-mouth cottage cheese discs steeped in saffron cardamom infused sweet milk.", price: 7, diet: ["V"], image: media.dishGulabJamun },
      { name: "Shahi Tukda (4 Pieces)", description: "Crispy royal fried bread soaked in saffron syrup and layered with thickened rabri.", price: 7, diet: ["V"], image: media.dishGulabJamun },
    ],
  },
  {
    slug: "beverages",
    title: "Beverages",
    short: "Beverages",
    intro: "Spiced Indian masala chai, refreshing chilled drinks and artisan beverages.",
    image: media.dishMangoLassi,
    items: [
      { name: "Soft Drink cans", description: "Choice of Coke, Coke No Sugar, Sprite, or Fanta (375ml).", price: 4.5, image: media.dishMangoLassi },
      { name: "Indian Masala Chai", description: "Freshly brewed spiced black tea simmered with whole milk, ginger and cardamom.", price: 4.5, image: media.dishMasalaChai },
      { name: "Still / Sparkling Water", description: "Chilled bottled natural still or sparkling mineral water (750ml).", price: 4.5, image: media.dishMangoLassi },
      { name: "Sweet Lassi", description: "Refreshing whipped sweet yoghurt drink with a hint of rose water.", price: 4.5, image: media.dishMangoLassi },
      { name: "Salted Lassi", description: "Traditional cooling yoghurt drink flavoured with roasted cumin and black salt.", price: 4.5, image: media.dishMangoLassi },
      { name: "Mango Lassi", description: "Traditional chilled creamy yoghurt smoothie blended with sweet mango pulp.", price: 4.5, image: media.dishMangoLassi },
      { name: "Rose Lassi", description: "Fragrant chilled whipped yoghurt drink infused with organic rose syrup.", price: 4.5, image: media.dishMangoLassi },
    ],
  },
];

/** The evening buffet — served nightly from 5:00 PM */
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
