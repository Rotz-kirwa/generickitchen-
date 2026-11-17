import type { HeroSlide, Product } from "@/types/restaurant";

import nyamaChoma from "@/assets/twala-nyama-choma.webp";
import nyamaChoma480 from "@/assets/twala-nyama-choma-480.webp";
import nyamaChoma768 from "@/assets/twala-nyama-choma-768.webp";

import chapatiSamosa from "@/assets/twala-chapati-samosa.webp";
import chapatiSamosa480 from "@/assets/twala-chapati-samosa-480.webp";
import chapatiSamosa768 from "@/assets/twala-chapati-samosa-768.webp";

import mahamri from "@/assets/twala-mahamri.webp";
import mahamri480 from "@/assets/twala-mahamri-480.webp";
import mahamri768 from "@/assets/twala-mahamri-768.webp";

import kenyanPlate from "@/assets/twala-kenyan-plate.webp";
import kenyanPlate480 from "@/assets/twala-kenyan-plate-480.webp";
import kenyanPlate768 from "@/assets/twala-kenyan-plate-768.webp";

import pilau from "@/assets/twala-pilau.webp";
import pilau480 from "@/assets/twala-pilau-480.webp";
import pilau768 from "@/assets/twala-pilau-768.webp";

import githeri from "@/assets/twala-githeri.webp";
import githeri480 from "@/assets/twala-githeri-480.webp";
import githeri768 from "@/assets/twala-githeri-768.webp";

import bhajia from "@/assets/twala-bhajia.webp";
import bhajia480 from "@/assets/twala-bhajia-480.webp";
import bhajia768 from "@/assets/twala-bhajia-768.webp";

import menuMukimo from "@/assets/menu-mukimo.webp";
import menuRice from "@/assets/menu-rice.webp";
import menuPilau from "@/assets/menu-pilau.webp";
import menuMatumbo from "@/assets/menu-matumbo.webp";
import grilledChicken from "@/assets/kenyan-grilled-chicken.webp";
import menuKaimati from "@/assets/menu-kaimati.webp";
import menuChai from "@/assets/menu-chai.webp";
import menuSweetPotato from "@/assets/menu-sweet-potato.webp";
import menuBhajias from "@/assets/menu-bhajias.webp";
import menuMahamri from "@/assets/menu-mahamri.webp";
import menuChapati from "@/assets/menu-chapati.webp";
import menuUgali from "@/assets/menu-ugali.webp";
import menuBeefStew from "@/assets/menu-beef-stew.webp";
import menuChickenStew from "@/assets/menu-chicken-stew.webp";
import menuGoatStew from "@/assets/menu-goat-stew.webp";
import menuLiver from "@/assets/menu-liver.webp";
import menuSukumaWiki from "@/assets/menu-sukuma-wiki.webp";
import menuKachumbari from "@/assets/menu-kachumbari.webp";
import menuMatoke from "@/assets/menu-matoke.webp";
import menuGitheri from "@/assets/menu-githeri.webp";
import menuVegetarianMeal from "@/assets/menu-vegetarian-meal.webp";
import menuBeefSoup from "@/assets/menu-beef-soup.webp";
import menuChickenSoup from "@/assets/menu-chicken-soup.webp";
import menuBoneSoup from "@/assets/menu-bone-soup.webp";
import menuSamosa from "@/assets/menu-samosa.webp";

export {
  nyamaChoma,
  nyamaChoma480,
  nyamaChoma768,
  chapatiSamosa,
  mahamri,
  kenyanPlate,
  pilau,
  githeri,
  bhajia,
};

export const PHONE_DISPLAY = "0455 433 391";
export const PHONE_TEL = "tel:0455433391";
export const WHATSAPP_NUMBER = "61455433391";
export const HERO_SLIDE_INTERVAL_MS = 3500;
export const NAV_ITEMS = ["Home", "Menu", "Catering", "About", "Contact"] as const;

export function getWhatsAppUrl(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function formatCurrency(amount: number): string {
  const rounded = Number(Math.round(Number(amount + "e+2")) + "e-2");
  return rounded.toLocaleString("en-AU", {
    minimumFractionDigits: Number.isInteger(rounded) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export const heroSlides: [HeroSlide, ...HeroSlide[]] = [
  {
    name: "Nyama Choma",
    scriptSubtitle: "Smoky, generous, unforgettable",
    category: "Meat Dishes",
    price: "$28",
    priceNum: 28,
    description:
      "Smoky grilled nyama choma, served with vibrant kachumbari and all the joy of the shared table.",
    image: nyamaChoma,
    image480: nyamaChoma480,
    image768: nyamaChoma768,
    position: "center",
    alt: "Nyama choma with fresh tomato and red onion kachumbari",
  },
  {
    name: "Kenyan Beef Pilau",
    scriptSubtitle: "Fragrant coastal spices",
    category: "Staples",
    price: "$22",
    priceNum: 22,
    description:
      "Basmati rice slow-cooked with caramelized beef, whole cardamom, cumin, and fresh tomato kachumbari.",
    image: pilau,
    image480: pilau480,
    image768: pilau768,
    position: "center",
    alt: "Aromatic Kenyan beef pilau served with fresh kachumbari",
  },
  {
    name: "Chapati & Beef Samosas",
    scriptSubtitle: "Hot off the pan",
    category: "Snacks",
    price: "$12",
    priceNum: 12,
    description:
      "Soft, golden-layered chapatis paired with crisp spiced beef samosas and fresh herb kachumbari.",
    image: chapatiSamosa,
    image480: chapatiSamosa480,
    image768: chapatiSamosa768,
    position: "center",
    alt: "Freshly folded chapati with golden crispy samosas",
  },
  {
    name: "Traditional Githeri",
    scriptSubtitle: "Hearty home comfort",
    category: "Vegetables & Sides",
    price: "$20",
    priceNum: 20,
    description:
      "Slow-simmered golden maize and red kidney beans in savoury tomato-onion gravy with ripe sliced avocado.",
    image: githeri,
    image480: githeri480,
    image768: githeri768,
    position: "center",
    alt: "Steaming traditional Kenyan githeri with sliced avocado",
  },
  {
    name: "Coastal Mahamri & Chai",
    scriptSubtitle: "Mildly sweet & fluffy",
    category: "Sweets",
    price: "$11",
    priceNum: 11,
    description:
      "Pillowy coconut and cardamom triangles fried to a warm golden finish, made for sharing with spiced Kenyan tea.",
    image: mahamri,
    image480: mahamri480,
    image768: mahamri768,
    position: "center",
    alt: "Golden Kenyan mahamri served with spiced tea",
  },
  {
    name: "Viazi Karai & Bhajias",
    scriptSubtitle: "Crisp street snack",
    category: "Snacks",
    price: "$10",
    priceNum: 10,
    description:
      "Golden turmeric-battered potato slices fried crisp and served with tangy tamarind ukwaju chutney.",
    image: bhajia,
    image480: bhajia480,
    image768: bhajia768,
    position: "center",
    alt: "Crispy Kenyan potato bhajias with tamarind ukwaju chutney",
  },
  {
    name: "All Kenyan Comfort Plate",
    scriptSubtitle: "A little bit of home",
    category: "Meat Dishes",
    price: "$25",
    priceNum: 25,
    description:
      "Rich slow-braised Kenyan beef stew alongside fluffy white rice, sautéed sukuma wiki, and zesty kachumbari.",
    image: kenyanPlate,
    image480: kenyanPlate480,
    image768: kenyanPlate768,
    position: "center",
    alt: "Kenyan beef stew plate with white rice, sukuma wiki, and kachumbari",
  },
];

export const products: Product[] = [
  // Staples
  {
    name: "Chapati",
    category: "Staples",
    image: menuChapati,
    position: "center 72%",
    description: "Soft, flaky, layered flatbread made fresh every time.",
    price: "$3",
    priceNum: 3,
  },
  {
    name: "Ugali",
    category: "Staples",
    image: menuUgali,
    position: "center 50%",
    description: "Traditional firm white maize meal swallow, served warm.",
    price: "$5",
    priceNum: 5,
  },
  {
    name: "Plain Rice",
    category: "Staples",
    image: menuRice,
    position: "center",
    description: "Light, fluffy steamed white rice.",
    price: "$5",
    priceNum: 5,
  },
  {
    name: "Kenyan Beef Pilau",
    category: "Staples",
    image: menuPilau,
    position: "center 52%",
    description: "Fragrant basmati rice slow-cooked with coastal spices, beef & kachumbari.",
    price: "$22",
    priceNum: 22,
  },
  {
    name: "Mukimo",
    category: "Staples",
    image: menuMukimo,
    position: "center 60%",
    description: "Traditional mashed potatoes folded with peas, maize & greens.",
    price: "$14",
    priceNum: 14,
  },

  // Meat Dishes
  {
    name: "Nyama Choma (Beef)",
    category: "Meat Dishes",
    image: nyamaChoma,
    position: "center",
    description:
      "Grilled beef, juicy, tender, and full of smoky flavour — served standalone or as a meal with ugali/chapati, sukuma wiki & kachumbari.",
    price: "$28",
    priceNum: 28,
  },
  {
    name: "Nyama Choma (Chicken)",
    category: "Meat Dishes",
    image: grilledChicken,
    position: "center",
    description:
      "Charcoal-grilled chicken, well seasoned with herbs & spices — served standalone or as a meal with ugali/chapati, sukuma wiki & kachumbari.",
    price: "$24",
    priceNum: 24,
  },
  {
    name: "Matumbo",
    category: "Meat Dishes",
    image: menuMatumbo,
    position: "center",
    description:
      "Traditional slow-simmered Kenyan tripe stew — served standalone or as a hearty meal with warm ugali or soft chapati.",
    price: "$21",
    priceNum: 21,
  },
  {
    name: "Beef Stew",
    category: "Meat Dishes",
    image: menuBeefStew,
    position: "center",
    description: "Tender beef simmered in a rich tomato, onion & dhania gravy.",
    price: "$28",
    priceNum: 28,
  },
  {
    name: "Chicken Stew",
    category: "Meat Dishes",
    image: menuChickenStew,
    position: "center",
    description: "Succulent chicken slow-cooked in a warm savoury sauce.",
    price: "$22",
    priceNum: 22,
  },
  {
    name: "Goat Stew",
    category: "Meat Dishes",
    image: menuGoatStew,
    position: "center",
    description:
      "Tender goat meat stew braised slowly with aromatic spices — served standalone or as a meal with ugali/chapati, sukuma wiki & kachumbari.",
    price: "$30",
    priceNum: 30,
  },
  {
    name: "Liver Fry",
    category: "Meat Dishes",
    image: menuLiver,
    position: "center",
    description: "Pan-fried beef liver tossed with caramelized onions.",
    price: "$25",
    priceNum: 25,
  },

  // Vegetables & Sides
  {
    name: "Sukuma Wiki",
    category: "Vegetables & Sides",
    image: menuSukumaWiki,
    position: "center",
    description: "Fresh sautéed Kenyan collard greens with onions & tomatoes.",
    price: "$7",
    priceNum: 7,
  },
  {
    name: "Kachumbari",
    category: "Vegetables & Sides",
    image: menuKachumbari,
    position: "center",
    description: "Fresh diced tomato, red onion & coriander salad.",
    price: "$6",
    priceNum: 6,
  },
  {
    name: "Matoke",
    category: "Vegetables & Sides",
    image: menuMatoke,
    position: "center",
    description: "Tender green banana stew slow-simmered in savoury tomato gravy.",
    price: "$18",
    priceNum: 18,
  },
  {
    name: "Traditional Githeri",
    category: "Vegetables & Sides",
    image: menuGitheri,
    position: "center",
    description: "Slow-simmered maize and beans finished with herbs & avocado.",
    price: "$20",
    priceNum: 20,
  },
  {
    name: "Vegetarian Meal",
    category: "Vegetables & Sides",
    image: menuVegetarianMeal,
    position: "center",
    description:
      "Choice of garden vegetables served with warm ugali or soft layered chapati & fresh kachumbari.",
    price: "$19",
    priceNum: 19,
  },

  // Soups
  {
    name: "Beef Soup",
    category: "Soups",
    image: menuBeefSoup,
    position: "center",
    description: "Hearty slow-simmered beef & garden vegetable soup.",
    price: "$12",
    priceNum: 12,
  },
  {
    name: "Chicken Soup",
    category: "Soups",
    image: menuChickenSoup,
    position: "center",
    description: "Warm, comforting, spiced chicken soup.",
    price: "$12",
    priceNum: 12,
  },
  {
    name: "Mbone (Bone) Soup",
    category: "Soups",
    image: menuBoneSoup,
    position: "center",
    description: "Traditional slow-boiled cow bone soup — rich & nourishing.",
    price: "$14",
    priceNum: 14,
  },

  // Snacks
  {
    name: "Samosa",
    category: "Snacks",
    image: menuSamosa,
    position: "center",
    description: "Crispy golden pastry with spiced beef or vegetable filling.",
    price: "$3.50",
    priceNum: 3.5,
  },
  {
    name: "Viazi Karai & Bhajias",
    category: "Snacks",
    image: menuBhajias,
    position: "center 60%",
    description: "Crispy spiced potato bites served with tangy tamarind ukwaju.",
    price: "$10",
    priceNum: 10,
  },

  // Sweets
  {
    name: "Mandazi",
    category: "Sweets",
    image: mahamri,
    position: "60% center",
    description: "Sweet fried dough — warm, fluffy, and simply irresistible.",
    price: "$1.50",
    priceNum: 1.5,
  },
  {
    name: "Mahamri",
    category: "Sweets",
    image: menuMahamri,
    position: "center 45%",
    description: "Sweet coconut fried bread with warm coastal cardamom.",
    price: "$1.50",
    priceNum: 1.5,
  },
  {
    name: "Sweet Potato",
    category: "Sweets",
    image: menuSweetPotato,
    position: "center 60%",
    description: "Naturally sweet Kenyan ngwashe, served boiled or roasted.",
    price: "$8",
    priceNum: 8,
  },
  {
    name: "Kaimati",
    category: "Sweets",
    image: menuKaimati,
    position: "center",
    description: "Golden coconut cookies & glazed sweet fried dumplings.",
    price: "$2",
    priceNum: 2,
  },

  // Hot Drinks
  {
    name: "Chai (Kenyan Tea)",
    category: "Hot Drinks",
    image: menuChai,
    position: "center 62%",
    description: "Strong & spiced Kenyan milk tea brewed fresh to order.",
    price: "$3.50",
    priceNum: 3.5,
  },
];

export const categories = [
  "All",
  "Staples",
  "Meat Dishes",
  "Vegetables & Sides",
  "Soups",
  "Snacks",
  "Sweets",
  "Hot Drinks",
] as const;
