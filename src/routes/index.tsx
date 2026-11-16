import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CalendarDays,
  Check,
  ChefHat,
  Clock3,
  Flame,
  Heart,
  Leaf,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import nyamaChoma from "@/assets/twala-nyama-choma.webp";
import chapatiSamosa from "@/assets/twala-chapati-samosa.webp";
import mahamri from "@/assets/twala-mahamri.webp";
import kenyanPlate from "@/assets/twala-kenyan-plate.webp";
import pilau from "@/assets/twala-pilau.webp";
import githeri from "@/assets/twala-githeri.webp";
import bhajia from "@/assets/twala-bhajia.webp";
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
import cateringBirthdays from "@/assets/catering-birthdays.webp";
import cateringEvents from "@/assets/catering-events.webp";
import cateringMealPreps from "@/assets/catering-meal-preps.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Generic Food & Delicacies — Taste of Home, Made with Love" },
      {
        name: "description",
        content:
          "Discover the warm, authentic flavours of Kenya at Generic Food & Delicacies. Sizzling nyama choma, aromatic Swahili pilau, hearty stews, and full-service event catering.",
      },
      {
        property: "og:title",
        content: "Generic Food & Delicacies — Taste of Home, Made with Love",
      },
      {
        property: "og:description",
        content:
          "Authentic Kenyan cuisine, sizzling nyama choma, rich stews, and event catering, prepared fresh with love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: nyamaChoma, fetchPriority: "high" }],
  }),
  component: GenericHome,
});

const navItems = ["Home", "Menu", "Catering", "About", "Contact"];
const HERO_SLIDE_INTERVAL_MS = 3500;

type HeroSlide = {
  name: string;
  scriptSubtitle: string;
  category: string;
  price: string;
  priceNum: number;
  description: string;
  image: string;
  position: string;
  alt: string;
};

type Product = {
  name: string;
  category: string;
  image: string;
  position: string;
  description: string;
  price: string;
  priceNum: number;
};

type CartItem = {
  name: string;
  price: string;
  priceNum: number;
  quantity: number;
  image: string;
  category?: string | undefined;
};

const heroSlides: [HeroSlide, ...HeroSlide[]] = [
  {
    name: "Nyama Choma",
    scriptSubtitle: "Smoky, generous, unforgettable",
    category: "Meat Dishes",
    price: "$28",
    priceNum: 28,
    description:
      "Smoky grilled nyama choma, served with vibrant kachumbari and all the joy of the shared table.",
    image: nyamaChoma,
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
    position: "center",
    alt: "Freshly folded chapati with golden crispy samosas",
  },
  {
    name: "Traditional Githeri",
    scriptSubtitle: "Hearty home comfort",
    category: "Vegetables & Sides",
    price: "$16",
    priceNum: 16,
    description:
      "Slow-simmered golden maize and red kidney beans in savoury tomato-onion gravy with ripe sliced avocado.",
    image: githeri,
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
    position: "center",
    alt: "Kenyan beef stew plate with white rice, sukuma wiki, and kachumbari",
  },
];

const products: Product[] = [
  // Staples
  {
    name: "Chapati",
    category: "Staples",
    image: menuChapati,
    position: "center 72%",
    description: "Soft, flaky, layered flatbread made fresh every time.",
    price: "$4",
    priceNum: 4,
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
    price: "$23",
    priceNum: 23,
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
    price: "$25",
    priceNum: 25,
  },
  {
    name: "Liver Fry",
    category: "Meat Dishes",
    image: menuLiver,
    position: "center",
    description: "Pan-fried beef liver tossed with caramelized onions.",
    price: "$20",
    priceNum: 20,
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
    price: "$16",
    priceNum: 16,
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
    price: "$8",
    priceNum: 8,
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
    price: "$6",
    priceNum: 6,
  },
  {
    name: "Mahamri",
    category: "Sweets",
    image: menuMahamri,
    position: "center 45%",
    description: "Sweet coconut fried bread with warm coastal cardamom.",
    price: "$7",
    priceNum: 7,
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
    price: "$8",
    priceNum: 8,
  },

  // Hot Drinks
  {
    name: "Chai (Kenyan Tea)",
    category: "Hot Drinks",
    image: menuChai,
    position: "center 62%",
    description: "Strong & spiced Kenyan milk tea brewed fresh to order.",
    price: "$5",
    priceNum: 5,
  },
];
const categories = [
  "All",
  "Staples",
  "Meat Dishes",
  "Vegetables & Sides",
  "Soups",
  "Snacks",
  "Sweets",
  "Hot Drinks",
];

const PHONE_DISPLAY = "0455 433 391";
const PHONE_TEL = "tel:0455433391";
const WHATSAPP_NUMBER = "61455433391";

function getWhatsAppUrl(text?: string) {
  return text
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;
}

function WhatsAppMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="whatsapp-mark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function PotMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`pot-mark${small ? " pot-mark-small" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 56 48" fill="none">
        <path
          d="M18 5c3-4 7-1 10-4 2 4-1 8-5 8"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M24 18 9 10l-5 6 13 10m15-8 13-8 5 6-14 11"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 23c0 12 7 19 19 19s19-7 19-19H9Z" fill="currentColor" />
        <path d="M7 22h42m-2 22H11" stroke="currentColor" strokeWidth="3.3" strokeLinecap="round" />
        <path
          d="m20 26 8 8m0-8-8 8"
          stroke="var(--background)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function BrandWordmark() {
  return (
    <>
      <PotMark />
      <span className="wordmark-type">
        <span className="wordmark-script">
          Generic<span className="wordmark-dot">.</span>
        </span>
        <span className="wordmark-ribbon">
          <span className="wordmark-spear wordmark-spear-left" aria-hidden="true" />
          <span className="wordmark-sub">
            FOOD <em className="wordmark-amp">&amp;</em> DELICACIES
          </span>
          <span className="wordmark-spear wordmark-spear-right" aria-hidden="true" />
        </span>
      </span>
    </>
  );
}

const EXTENSION_IGNORE_ATTRS = {
  "data-lpignore": "true",
  "data-1p-ignore": "true",
  "data-bwignore": "true",
  "data-form-type": "other",
} as const;

const subscribeNoop = () => () => {};

function GenericHome() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState("home");
  const [category, setCategory] = useState("All");
  const [showTop, setShowTop] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("generic_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("generic_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    if (!cartOpen && !mobileOpen) {
      document.body.style.overflow = "";
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [cartOpen, mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const totalCartItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const totalCartAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * item.priceNum, 0),
    [cart],
  );

  const cartMap = useMemo(() => {
    const map = new Map<string, CartItem>();
    for (const item of cart) {
      map.set(item.name, item);
    }
    return map;
  }, [cart]);

  const addToCart = (product: {
    name: string;
    price: string;
    priceNum: number;
    image: string;
    category?: string;
  }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          name: product.name,
          price: product.price,
          priceNum: product.priceNum,
          quantity: 1,
          image: product.image,
          category: product.category,
        },
      ];
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.name === name) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    const itemsSummary = cart.map(
      (item) =>
        `• ${item.quantity}x ${item.name} ($${item.priceNum} each) = $${item.quantity * item.priceNum}`,
    );

    const messageLines = [
      "Hello Generic Food & Delicacies! I'd like to place an order from your website:",
      "",
      "📋 *ORDER SUMMARY:*",
      ...itemsSummary,
      "",
      `💰 *TOTAL AMOUNT: $${totalCartAmount}*`,
    ];

    if (customerName.trim()) {
      messageLines.push(`👤 *Customer Name:* ${customerName.trim()}`);
    }
    if (customerLocation.trim()) {
      messageLines.push(`📍 *Delivery Location / Table:* ${customerLocation.trim()}`);
    }
    if (orderNotes.trim()) {
      messageLines.push(`📝 *Special Requests:* ${orderNotes.trim()}`);
    }

    messageLines.push(
      "",
      "Please confirm receipt and let me know the estimated prep/delivery time. Thank you!",
    );

    window.open(getWhatsAppUrl(messageLines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const formHydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [loadedHeroSlides, setLoadedHeroSlides] = useState<number[]>([0]);
  const visibleProducts = useMemo(
    () => (category === "All" ? products : products.filter((item) => item.category === category)),
    [category],
  );
  const activeHeroSlide = heroSlides[heroSlideIndex] ?? heroSlides[0];
  const activeHeroIndex = heroSlideIndex;

  useEffect(() => {
    const nextIdx = (activeHeroIndex + 1) % heroSlides.length;
    const prevIdx = (activeHeroIndex - 1 + heroSlides.length) % heroSlides.length;
    setLoadedHeroSlides((prev) => {
      if (prev.includes(activeHeroIndex) && prev.includes(nextIdx) && prev.includes(prevIdx)) {
        return prev;
      }
      return Array.from(new Set([...prev, activeHeroIndex, nextIdx, prevIdx]));
    });
  }, [activeHeroIndex]);

  useEffect(() => {
    if (heroPaused) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;
    const timer = window.setInterval(() => {
      setHeroSlideIndex((index) => (index + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  const selectHeroSlide = (index: number) => {
    setHeroSlideIndex(((index % heroSlides.length) + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    const revealObserver = new IntersectionObserver(
      (entries, current) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    const onScroll = () => setShowTop(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const desktopQuery = window.matchMedia("(min-width: 641px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onBreakpoint);
    };
  }, [mobileOpen]);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "Hello Generic Food & Delicacies! I'd love to make an enquiry.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Event date: ${data.get("date")}`,
      `Message: ${data.get("message")}`,
    ].join("\n");
    setSubmitted(true);
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    form.reset();
  }

  const goTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="generic-site">
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#home"
            className="wordmark"
            onClick={() => setMobileOpen(false)}
            aria-label="Generic Food & Delicacies home"
          >
            <BrandWordmark />
          </a>
          <div className="header-actions">
            <nav className="main-nav" aria-label="Main navigation">
              {navItems.map((item) => {
                const id = item.toLowerCase();
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={active === id ? "nav-active" : ""}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(id);
                    }}
                  >
                    {item}
                  </a>
                );
              })}
              <Button variant="default" className="header-cta" asChild>
                <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
                  <WhatsAppMark size={16} /> Let’s talk
                </a>
              </Button>
            </nav>
            <button
              type="button"
              className="header-cart-btn"
              onClick={() => setCartOpen(true)}
              aria-label={`Open food cart (${totalCartItems} items)`}
            >
              <span className="cart-icon-wrap">
                <ShoppingBag size={21} />
                {totalCartItems > 0 && <span className="header-cart-badge">{totalCartItems}</span>}
              </span>
              <span className="header-cart-label">Cart</span>
            </button>

            <Button
              variant="ghost"
              size="icon"
              className="mobile-toggle"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <MenuIcon />}
            </Button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-drawer-backdrop${mobileOpen ? " is-open" : ""}`}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />
      <aside
        id="mobile-navigation-drawer"
        className={`mobile-drawer${mobileOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div className="mobile-drawer-header">
          <a
            href="#home"
            className="wordmark mobile-drawer-brand"
            onClick={(event) => {
              event.preventDefault();
              goTo("home");
            }}
            aria-label="Generic Food & Delicacies home"
          >
            <BrandWordmark />
          </a>
          <Button
            ref={drawerCloseRef}
            type="button"
            variant="ghost"
            size="icon"
            className="mobile-drawer-close"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          >
            <X />
          </Button>
        </div>
        <nav className="mobile-drawer-nav" aria-label="Mobile sections">
          {navItems.map((item, idx) => {
            const id = item.toLowerCase();
            return (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "nav-active" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(id);
                }}
              >
                <span className="mobile-drawer-index">{String(idx + 1).padStart(2, "0")}</span>
                <span className="mobile-drawer-label">{item}</span>
                <ArrowRight className="mobile-drawer-arrow" size={16} />
              </a>
            );
          })}
        </nav>
        <div className="mobile-drawer-footer">
          <Button variant="default" size="lg" className="mobile-drawer-cta" asChild>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              <WhatsAppMark size={17} /> Let’s talk on WhatsApp
            </a>
          </Button>
          <p className="mobile-drawer-note">Taste of home · Made with love</p>
        </div>
      </aside>

      <main>
        <section
          className="hero-section"
          id="home"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
          onFocus={() => setHeroPaused(true)}
          onBlur={() => setHeroPaused(false)}
        >
          <div
            className="hero-carousel-track"
            style={{ transform: `translate3d(-${heroSlideIndex * 100}%, 0, 0)` }}
          >
            {heroSlides.map((slide, idx) => (
              <div
                className="hero-carousel-slide hero-standalone-slide"
                key={slide.name}
                aria-hidden={idx !== activeHeroIndex}
                inert={idx !== activeHeroIndex}
              >
                {loadedHeroSlides.includes(idx) && (
                  <img
                    className="hero-standalone-bg"
                    src={slide.image}
                    alt={slide.alt}
                    style={{ objectPosition: slide.position }}
                    width={1200}
                    height={900}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding={idx === 0 ? "sync" : "async"}
                  />
                )}
                <div className="hero-standalone-scrim" aria-hidden="true" />
                <div className="hero-standalone-inner page-width">
                  <div className="hero-standalone-details">
                    <div className="hero-standalone-meta">
                      <span className="hero-standalone-pill">{slide.category}</span>
                      <span className="hero-standalone-price">{slide.price}</span>
                    </div>
                    <h1 className="hero-standalone-title">{slide.name}</h1>
                    <p className="hero-standalone-script">{slide.scriptSubtitle}</p>
                    <p className="hero-standalone-desc">{slide.description}</p>
                    <div className="hero-actions">
                      <Button
                        variant="default"
                        size="lg"
                        className="hero-add-cart-btn"
                        onClick={() => {
                          addToCart({
                            name: slide.name,
                            price: slide.price,
                            priceNum: slide.priceNum,
                            image: slide.image,
                            category: slide.category,
                          });
                          setCartOpen(true);
                        }}
                      >
                        <Plus size={16} /> Add to Cart ({slide.price})
                      </Button>
                      <Button variant="secondary" size="lg" asChild>
                        <a
                          href={getWhatsAppUrl(
                            `Hello Generic Food & Delicacies! I'd like to order ${slide.name}.`,
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <WhatsAppMark size={17} /> Order Now
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="hero-standalone-menu-btn"
                        onClick={() => {
                          setCategory(slide.category);
                          goTo("menu");
                        }}
                      >
                        View {slide.category} <ArrowRight size={17} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hero-controls page-width hero-controls-dark">
            <div className="hero-controls-status" aria-live="polite">
              <span>{String(activeHeroIndex + 1).padStart(2, "0")}</span>
              <span>/ {String(heroSlides.length).padStart(2, "0")}</span>
              <strong>{activeHeroSlide.name}</strong>
            </div>
            <div className="hero-controls-right">
              <div className="hero-slider-dots" role="tablist" aria-label="Hero showcase slides">
                {heroSlides.map((slide, idx) => (
                  <Button
                    key={slide.name}
                    type="button"
                    variant="ghost"
                    size="icon"
                    role="tab"
                    aria-selected={activeHeroIndex === idx}
                    aria-label={`Show ${slide.name}`}
                    className={`hero-slider-dot${activeHeroIndex === idx ? " is-active" : ""}`}
                    onClick={() => selectHeroSlide(idx)}
                  />
                ))}
              </div>
              <a className="scroll-cue" href="#menu" aria-label="Scroll to the menu">
                <ArrowDown size={16} />
              </a>
            </div>
          </div>
          <div className="hero-bottom-rule" />
        </section>

        <section id="menu" className="menu-section section-pad">
          <div className="page-width">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">
                  <span /> FROM OUR KITCHEN
                </p>
                <h2>
                  Good things, <em>cooking.</em>
                </h2>
                <p className="section-intro">
                  Street-side favourites and the comfort of a proper home-cooked meal.
                </p>
              </div>
              <span className="section-index">
                01 <i>—</i> THE MENU
              </span>
            </div>
            <div className="menu-toolbar reveal">
              <span className="menu-count">
                {visibleProducts.length} {visibleProducts.length === 1 ? "dish" : "dishes"} · Made
                fresh, every day <Heart size={14} />
              </span>
              <div className="filter-row" role="group" aria-label="Filter menu by category">
                {categories.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    variant={category === item ? "default" : "ghost"}
                    size="sm"
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
            <div className="menu-grid reveal">
              {visibleProducts.map((item, index) => (
                <article
                  className="menu-card"
                  key={item.name}
                  style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
                >
                  <div className="menu-image-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ objectPosition: item.position }}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="menu-pill">{item.category}</span>
                    <span className="menu-number">
                      {String(products.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="menu-card-copy">
                    <div className="menu-title-row">
                      <h3>{item.name}</h3>
                      <span className="menu-price">{item.price}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="menu-card-footer">
                      {cartMap.has(item.name) ? (
                        <div className="menu-stepper">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.name, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={12} />
                          </button>
                          <span>{cartMap.get(item.name)?.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.name, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="menu-add-cart-btn"
                          onClick={() => addToCart(item)}
                        >
                          <Plus size={13} /> Add to Cart
                        </button>
                      )}
                      <a
                        className="menu-order"
                        href={getWhatsAppUrl(
                          `Hello Generic Food & Delicacies! I'd like to ask about ${item.name}.`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        title="Quick WhatsApp enquiry"
                      >
                        Ask <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="catering" className="catering-section section-pad">
          <div className="page-width">
            <div className="catering-header-row reveal">
              <div className="catering-heading">
                <p className="eyebrow eyebrow-light">
                  <span /> BRING EVERYONE TO THE TABLE
                </p>
                <h2>
                  We cater for <em>unforgettable moments.</em>
                </h2>
                <p>
                  From joyous birthday parties and grand banquets to convenient weekly meal preps —
                  served hot, fresh, and made with love.
                </p>
              </div>
              <aside className="love-seal">
                <span>MADE FRESH</span>
                <span className="seal-accent">MADE WITH LOVE</span>
                <span>MADE FOR YOU</span>
                <Heart />
              </aside>
            </div>

            <div className="catering-cards-grid">
              <article className="catering-card reveal">
                <div className="catering-card-media">
                  <img
                    src={cateringBirthdays}
                    alt="Festive birthday celebration catering buffet and party platter setup"
                    style={{ objectPosition: "center 58%" }}
                    width={720}
                    height={480}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="catering-card-badge">
                    <span className="catering-badge-num">01</span>
                    <span className="catering-badge-tag">BIRTHDAYS &amp; PARTIES</span>
                  </div>
                </div>
                <div className="catering-card-body">
                  <div className="catering-title-row">
                    <span className="service-icon">
                      <CalendarDays />
                    </span>
                    <h3>Birthdays &amp; Parties</h3>
                  </div>
                  <p>
                    Make milestone birthdays delicious and stress-free. From sizzling nyama choma
                    platters to sweet kaimati &amp; mahamri spreads, we bring true joy to the table.
                  </p>
                  <ul className="catering-perks">
                    <li>
                      <span className="perk-bullet">✦</span> Bespoke Celebration Menus
                    </li>
                    <li>
                      <span className="perk-bullet">✦</span> Sizzling Nyama Choma Platters
                    </li>
                    <li>
                      <span className="perk-bullet">✦</span> Authentic Kenyan Sweet Bars
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="catering-card-cta"
                    onClick={(e) => {
                      e.preventDefault();
                      goTo("contact");
                    }}
                  >
                    Plan a celebration <ArrowRight size={14} />
                  </a>
                </div>
              </article>

              <article className="catering-card reveal">
                <div className="catering-card-media">
                  <img
                    src={cateringEvents}
                    alt="Glamorous banquet and wedding floral reception setting"
                    width={720}
                    height={480}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="catering-card-badge">
                    <span className="catering-badge-num">02</span>
                    <span className="catering-badge-tag">EVENTS &amp; WEDDINGS</span>
                  </div>
                </div>
                <div className="catering-card-body">
                  <div className="catering-title-row">
                    <span className="service-icon">
                      <Users />
                    </span>
                    <h3>Events &amp; Banquets</h3>
                  </div>
                  <p>
                    Weddings, corporate galas, family reunions, and cultural get-togethers. Flawless
                    presentation, generous portions, and authentic Kenyan warmth.
                  </p>
                  <ul className="catering-perks">
                    <li>
                      <span className="perk-bullet">✦</span> Full Banquet &amp; Buffet Service
                    </li>
                    <li>
                      <span className="perk-bullet">✦</span> Corporate &amp; Cultural Galas
                    </li>
                    <li>
                      <span className="perk-bullet">✦</span> Professional Presentation
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="catering-card-cta"
                    onClick={(e) => {
                      e.preventDefault();
                      goTo("contact");
                    }}
                  >
                    Tell us about your event <ArrowRight size={14} />
                  </a>
                </div>
              </article>

              <article className="catering-card reveal">
                <div className="catering-card-media">
                  <img
                    src={cateringMealPreps}
                    alt="Hot chafing dishes and steaming buffet catering line"
                    width={720}
                    height={480}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="catering-card-badge">
                    <span className="catering-badge-num">03</span>
                    <span className="catering-badge-tag">MEAL PREPS &amp; BUFFETS</span>
                  </div>
                </div>
                <div className="catering-card-body">
                  <div className="catering-title-row">
                    <span className="service-icon">
                      <ChefHat />
                    </span>
                    <h3>Meal Preps &amp; Platters</h3>
                  </div>
                  <p>
                    Wholesome, home-style meals prepared fresh for your busy week or private buffet.
                    Chafing-dish ready, hot, nourishing, and always ready to serve.
                  </p>
                  <ul className="catering-perks">
                    <li>
                      <span className="perk-bullet">✦</span> Weekly Family &amp; Individual Packs
                    </li>
                    <li>
                      <span className="perk-bullet">✦</span> Steaming Chafing Dishes
                    </li>
                    <li>
                      <span className="perk-bullet">✦</span> Made Fresh Daily to Order
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="catering-card-cta"
                    onClick={(e) => {
                      e.preventDefault();
                      goTo("contact");
                    }}
                  >
                    Make life easier <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="gallery-strip" aria-label="A little more from our kitchen">
          <img
            src={kenyanPlate}
            alt="A colourful Kenyan beef stew and greens plate"
            width={1200}
            height={1008}
            loading="lazy"
            decoding="async"
          />
          <img
            src={pilau}
            alt="Fragrant Kenyan beef pilau served with kachumbari"
            width={1200}
            height={896}
            loading="lazy"
            decoding="async"
          />
          <img
            src={githeri}
            alt="Slow-simmered Kenyan githeri with sliced avocado"
            width={1200}
            height={896}
            loading="lazy"
            decoding="async"
          />
          <img
            src={bhajia}
            alt="Crispy Kenyan potato bhajias with tangy ukwaju chutney"
            width={1200}
            height={896}
            loading="lazy"
            decoding="async"
          />
        </section>

        <section className="motto-band">
          <div className="motto-inner page-width">
            <Flame className="motto-icon" />
            <p>
              Authentic recipes. <span>Quality ingredients.</span> Exceptional service.
            </p>
            <span className="motto-mark">&amp;</span>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="page-width about-grid">
            <div className="about-visual reveal">
              <img
                src={kenyanPlate}
                alt="A lovingly prepared plate of authentic Kenyan beef stew, sautéed greens, and layered chapati"
                width={1200}
                height={1008}
                loading="lazy"
                decoding="async"
              />
              <div className="about-photo-stamp">
                <PotMark small />
                <span>
                  OUR TABLE
                  <br />
                  IS YOURS
                </span>
              </div>
              <span className="about-photo-count">FRESH DAILY · HERITAGE RECIPES</span>

              <div className="about-visual-highlights">
                <div className="about-stat-item">
                  <strong>100%</strong>
                  <span>Scratch Cooked</span>
                </div>
                <div className="about-stat-divider" aria-hidden="true" />
                <div className="about-stat-item">
                  <strong>Fresh</strong>
                  <span>Farm-Direct Greens</span>
                </div>
                <div className="about-stat-divider" aria-hidden="true" />
                <div className="about-stat-item">
                  <strong>Whole</strong>
                  <span>Toasted Spices</span>
                </div>
              </div>
            </div>

            <div className="about-copy reveal">
              <p className="eyebrow">
                <span /> OUR KITCHEN &amp; HERITAGE
              </p>
              <h2>
                Authentic flavours, <em>wholesome goodness.</em>
              </h2>
              <div className="about-story">
                <p>
                  At Generic Food &amp; Delicacies, we celebrate the true culinary soul of Kenya.
                  Every dish is rooted in timeless heritage and rich family traditions — from smoky
                  charcoal-grilled <strong>Nyama Choma</strong> and fragrant Swahili{" "}
                  <strong>Pilau</strong>, to slow-simmered{" "}
                  <strong>Beef, Goat, and Matumbo stews</strong>, steaming fluffy{" "}
                  <strong>Ugali</strong>, velvety <strong>Mukimo</strong>, and coastal street
                  favourites like golden <strong>Samosas</strong>, crispy <strong>Bhajias</strong>,
                  and sweet <strong>Mahamri</strong>.
                </p>
                <p>
                  The foundation of our goodness is simple: uncompromising care and zero shortcuts.
                  We source crisp greens daily from local Kenyan growers, use only prime grass-fed
                  cuts, and toast our whole spices from scratch. Every meal is simmered low and slow
                  with heartfelt hospitality (<em>pendo la nyumbani</em>), filling every plate with
                  nourishing warmth and generous portions.
                </p>
              </div>

              <div className="values-list">
                <div className="value-item">
                  <span className="value-icon">
                    <Flame />
                  </span>
                  <div>
                    <h3>Iconic Kenyan Delicacies</h3>
                    <p>
                      Sizzling nyama choma, aromatic pilau, hearty stews, and coastal bites prepared
                      to time-tested recipes.
                    </p>
                  </div>
                </div>

                <div className="value-item">
                  <span className="value-icon">
                    <Leaf />
                  </span>
                  <div>
                    <h3>Farm-Fresh &amp; Wholesome</h3>
                    <p>
                      Daily handpicked greens (Sukuma Wiki &amp; Matoke), prime meats, and natural
                      spices with zero artificial shortcuts.
                    </p>
                  </div>
                </div>

                <div className="value-item">
                  <span className="value-icon">
                    <Heart />
                  </span>
                  <div>
                    <h3>Generous Kenyan Hospitality</h3>
                    <p>
                      Abundant, soul-satisfying portions served with genuine warmth (
                      <em>Ukarimu</em>) made to bring people together.
                    </p>
                  </div>
                </div>

                <div className="value-item">
                  <span className="value-icon">
                    <ChefHat />
                  </span>
                  <div>
                    <h3>Catering &amp; Weekly Meal Preps</h3>
                    <p>
                      From full-service chafing-dish banquet spreads for weddings and birthdays to
                      steaming weekly home meal packs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-cta-row">
                <Button className="button-primary" onClick={() => goTo("menu")}>
                  Explore Our Menu <ArrowRight size={14} />
                </Button>
                <Button
                  variant="outline"
                  className="button-secondary"
                  onClick={() => goTo("catering")}
                >
                  Catering &amp; Events
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="page-width contact-grid">
            <div className="contact-copy reveal">
              <p className="eyebrow eyebrow-light">
                <span /> COME ON IN
              </p>
              <h2>
                Let’s make something <em>delicious.</em>
              </h2>
              <p>
                Planning a gathering, a meal for the week, or just feeling hungry? We’d love to hear
                from you.
              </p>
              <div className="contact-phone">
                <span>PLACE YOUR ORDER</span>
                <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
                <a className="phone-action" href={PHONE_TEL}>
                  <Phone size={16} /> Call our kitchen ({PHONE_DISPLAY})
                </a>
              </div>
              <div className="contact-details">
                <div>
                  <MapPin />
                  <p>
                    <strong>Catering &amp; Orders</strong>
                    <span>Birthdays · Events · Parties · Meal Preps</span>
                  </p>
                </div>
                <div>
                  <Clock3 />
                  <p>
                    <strong>Fresh &amp; Made with Love</strong>
                    <span>All meals served hot &amp; made fresh daily</span>
                  </p>
                </div>
              </div>
              <Button variant="secondary" size="lg" asChild>
                <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
                  <WhatsAppMark size={17} /> Chat with us on WhatsApp
                </a>
              </Button>
            </div>
            <form
              className="contact-form reveal"
              onSubmit={submitInquiry}
              {...EXTENSION_IGNORE_ATTRS}
            >
              <div className="form-heading">
                <span>WE’RE ALL EARS</span>
                <h3>Send us a little note.</h3>
                <p>We’ll take it from here.</p>
              </div>
              {submitted && (
                <div className="form-success" role="status">
                  <Check size={18} /> Your message is ready in WhatsApp. Talk soon!
                </div>
              )}
              <label>
                Your name
                {formHydrated ? (
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="What should we call you?"
                    {...EXTENSION_IGNORE_ATTRS}
                    required
                  />
                ) : (
                  <span className="contact-field-placeholder" aria-hidden="true" />
                )}
              </label>
              <div className="form-two">
                <label>
                  Phone number
                  {formHydrated ? (
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="e.g. 0712 345 678"
                      {...EXTENSION_IGNORE_ATTRS}
                      required
                    />
                  ) : (
                    <span className="contact-field-placeholder" aria-hidden="true" />
                  )}
                </label>
                <label>
                  Event date
                  {formHydrated ? (
                    <input name="date" type="date" {...EXTENSION_IGNORE_ATTRS} required />
                  ) : (
                    <span className="contact-field-placeholder" aria-hidden="true" />
                  )}
                </label>
              </div>
              <label>
                Your message
                {formHydrated ? (
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us what you have in mind…"
                    {...EXTENSION_IGNORE_ATTRS}
                    required
                  />
                ) : (
                  <span
                    className="contact-field-placeholder contact-field-placeholder-area"
                    aria-hidden="true"
                  />
                )}
              </label>
              <Button type="submit" variant="default" size="lg">
                Send via WhatsApp <ArrowRight size={17} />
              </Button>
              <span className="form-note">Your message opens in WhatsApp to send.</span>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main page-width">
          <div className="footer-brand">
            <a
              href="#home"
              className="wordmark footer-wordmark"
              aria-label="Generic Food & Delicacies home"
            >
              <BrandWordmark />
            </a>
            <p>
              Taste of home.
              <br />
              Made with love. <Heart size={14} />
            </p>
          </div>
          <div className="footer-links">
            <span className="footer-label">FIND YOUR WAY</span>
            {navItems.map((item) => (
              <a href={`#${item.toLowerCase()}`} key={item}>
                {item}
              </a>
            ))}
          </div>
          <div className="footer-contact">
            <span className="footer-label">PLACE YOUR ORDER</span>
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            <a href="mailto:hello@genericfood.example">hello@genericfood.example</a>
            <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
              WhatsApp <ArrowRight size={13} />
            </a>
          </div>
          <p className="footer-signoff">
            Good food.
            <br />
            <em>Great moments.</em>
            <br />
            Lasting memories.
            <Heart size={17} />
          </p>
        </div>
        <div className="footer-bottom page-width">
          <span>© {new Date().getFullYear()} Generic Food &amp; Delicacies. Made with care.</span>
          <span>
            Kenyan at heart <Heart size={12} /> Made to be shared
          </span>
        </div>
      </footer>
      <div className="floating-actions">
        <Button
          variant="default"
          size="icon"
          className={`back-to-top${showTop ? " back-to-top-visible" : ""}`}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp />
        </Button>
        <a
          href={getWhatsAppUrl("Hello Generic Food & Delicacies! I'd love to talk to you now.")}
          className="wa-float"
          target="_blank"
          rel="noreferrer"
          aria-label="Talk to us now on WhatsApp"
        >
          <span className="wa-float-card">
            <span className="wa-float-eyebrow">
              <span className="wa-live-dot" aria-hidden="true" />
              GENERIC DIRECT
            </span>
            <span className="wa-float-title">Talk to us now</span>
          </span>
          <span className="wa-medallion" aria-label="Official WhatsApp chat">
            <WhatsAppMark size={33} />
          </span>
        </a>
      </div>

      {totalCartItems > 0 && (
        <button
          type="button"
          className="floating-cart-pill"
          onClick={() => setCartOpen(true)}
          aria-label={`View cart (${totalCartItems} items, total $${totalCartAmount.toLocaleString()})`}
        >
          <span className="floating-cart-count">
            <ShoppingBag size={14} />
            <strong>{totalCartItems}</strong>
          </span>
          <span>View Cart</span>
          <span className="floating-cart-total">${totalCartAmount.toLocaleString()}</span>
        </button>
      )}

      <div
        className={`cart-drawer-backdrop${cartOpen ? " is-open" : ""}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${cartOpen ? " is-open" : ""}`}
        aria-hidden={!cartOpen}
        role="dialog"
        aria-label="Your food order cart"
      >
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="text-forest" />
            <h3>Your Order</h3>
            <span className="cart-count-pill">
              {totalCartItems} {totalCartItems === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            className="cart-drawer-close"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <ShoppingBag size={30} />
              </div>
              <h4>Your cart is empty</h4>
              <p>Add some delicious Kenyan dishes from our menu to start your order.</p>
              <Button
                variant="default"
                onClick={() => {
                  setCartOpen(false);
                  goTo("menu");
                }}
              >
                Browse Menu <ArrowRight size={14} />
              </Button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.name} className="cart-item-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                    width={54}
                    height={54}
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <h5>{item.name}</h5>
                      <button
                        type="button"
                        className="cart-item-del"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.name)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <span className="cart-item-unit-price">
                      ${item.priceNum.toLocaleString()} each
                    </span>
                    <div className="cart-item-bottom">
                      <div className="cart-stepper">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.name, -1)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={11} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.name, 1)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <span className="cart-item-total">
                        ${(item.priceNum * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-notes-block">
              <input
                type="text"
                className="cart-input"
                placeholder="Your Name (optional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                type="text"
                className="cart-input"
                placeholder="Delivery Address / Table No. (optional)"
                value={customerLocation}
                onChange={(e) => setCustomerLocation(e.target.value)}
              />
              <input
                type="text"
                className="cart-input"
                placeholder="Special notes (e.g. extra kachumbari, less chilli)"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
              />
            </div>

            <div className="cart-bill-summary">
              <div className="cart-bill-row">
                <span>Items ({totalCartItems})</span>
                <span>${totalCartAmount.toLocaleString()}</span>
              </div>
              <div className="cart-bill-row cart-bill-total">
                <strong>Grand Total</strong>
                <strong>${totalCartAmount.toLocaleString()}</strong>
              </div>
            </div>

            <button
              type="button"
              className="cart-whatsapp-checkout-btn"
              onClick={handleCheckoutWhatsApp}
            >
              <WhatsAppMark size={19} />
              <span>Checkout via WhatsApp · ${totalCartAmount.toLocaleString()}</span>
            </button>

            <div className="cart-footer-aux">
              <button type="button" className="cart-clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <span className="cart-secure-note">
                <Check size={12} /> Direct kitchen WhatsApp checkout
              </span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
