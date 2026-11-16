import { useEffect, useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
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
  Phone,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import nyamaChoma from "@/assets/twala-nyama-choma.jpg";
import chapatiSamosa from "@/assets/twala-chapati-samosa.jpg";
import mahamri from "@/assets/twala-mahamri.jpg";
import kenyanPlate from "@/assets/twala-kenyan-plate.jpg";
import pilau from "@/assets/twala-pilau.jpg";
import githeri from "@/assets/twala-githeri.jpg";
import bhajia from "@/assets/twala-bhajia.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Twala Kitchen — Taste of Home, Made with Love" },
      {
        name: "description",
        content:
          "Discover the warm, authentic flavours of Kenya at Twala Kitchen. Explore our menu, plan your event, and get in touch.",
      },
      { property: "og:title", content: "Twala Kitchen — Taste of Home, Made with Love" },
      {
        property: "og:description",
        content: "Kenyan street food and traditional meals, prepared fresh and made with love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TwalaHome,
});

const navItems = ["Home", "Menu", "Catering", "About", "Contact"];
const HERO_SLIDE_INTERVAL_MS = 3500;

type HeroSlide = {
  name: string;
  scriptSubtitle: string;
  category: string;
  price: string;
  description: string;
  image: string;
  position: string;
  alt: string;
};

const heroSlides: [HeroSlide, ...HeroSlide[]] = [
  {
    name: "Nyama Choma",
    scriptSubtitle: "Smoky, generous, unforgettable",
    category: "Mains",
    price: "KSh [price]",
    description:
      "Smoky grilled nyama choma, served with vibrant kachumbari and all the joy of the shared table.",
    image: nyamaChoma,
    position: "center",
    alt: "Nyama choma with fresh tomato and red onion kachumbari",
  },
  {
    name: "Kenyan Beef Pilau",
    scriptSubtitle: "Fragrant coastal spices",
    category: "Mains",
    price: "KSh [price]",
    description:
      "Basmati rice slow-cooked with caramelized beef, whole cardamom, cumin, and fresh tomato kachumbari.",
    image: pilau,
    position: "center",
    alt: "Aromatic Kenyan beef pilau served with fresh kachumbari",
  },
  {
    name: "Chapati & Beef Samosas",
    scriptSubtitle: "Hot off the pan",
    category: "Street food",
    price: "KSh [price]",
    description:
      "Soft, golden-layered chapatis paired with crisp spiced beef samosas and fresh herb kachumbari.",
    image: chapatiSamosa,
    position: "center",
    alt: "Freshly folded chapati with golden crispy samosas",
  },
  {
    name: "Traditional Githeri",
    scriptSubtitle: "Hearty home comfort",
    category: "Mains",
    price: "KSh [price]",
    description:
      "Slow-simmered golden maize and red kidney beans in savoury tomato-onion gravy with ripe sliced avocado.",
    image: githeri,
    position: "center",
    alt: "Steaming traditional Kenyan githeri with sliced avocado",
  },
  {
    name: "Coastal Mahamri & Chai",
    scriptSubtitle: "Mildly sweet & fluffy",
    category: "Snacks",
    price: "KSh [price]",
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
    price: "KSh [price]",
    description:
      "Golden turmeric-battered potato slices fried crisp and served with tangy tamarind ukwaju chutney.",
    image: bhajia,
    position: "center",
    alt: "Crispy Kenyan potato bhajias with tamarind ukwaju chutney",
  },
  {
    name: "All Kenyan Comfort Plate",
    scriptSubtitle: "A little bit of home",
    category: "Mains",
    price: "KSh [price]",
    description:
      "Rich slow-braised Kenyan beef stew alongside fluffy white rice, sautéed sukuma wiki, and zesty kachumbari.",
    image: kenyanPlate,
    position: "center",
    alt: "Kenyan beef stew plate with white rice, sukuma wiki, and kachumbari",
  },
];

const products = [
  {
    name: "Nyama Choma",
    category: "Mains",
    image: nyamaChoma,
    position: "center",
    description: "Tender, juicy, and full of smoky flavour.",
    price: "KSh [price]",
  },
  {
    name: "Kenyan Beef Pilau",
    category: "Mains",
    image: pilau,
    position: "center",
    description: "Fragrant basmati rice slow-cooked with spiced beef & kachumbari.",
    price: "KSh [price]",
  },
  {
    name: "Traditional Githeri",
    category: "Mains",
    image: githeri,
    position: "center",
    description: "Slow-simmered maize and beans finished with herbs & avocado.",
    price: "KSh [price]",
  },
  {
    name: "All Kenyan Foods",
    category: "Mains",
    image: kenyanPlate,
    position: "center",
    description: "A little of everything we call home.",
    price: "KSh [price]",
  },
  {
    name: "Mahamri",
    category: "Snacks",
    image: mahamri,
    position: "10% center",
    description: "Soft, fluffy, and mildly sweet with coastal cardamom.",
    price: "KSh [price]",
  },
  {
    name: "Mandazi",
    category: "Snacks",
    image: mahamri,
    position: "60% center",
    description: "Sweet, warm, and simply irresistible.",
    price: "KSh [price]",
  },
  {
    name: "Viazi Karai & Bhajias",
    category: "Snacks",
    image: bhajia,
    position: "center",
    description: "Crispy spiced potato bites served with tangy tamarind ukwaju.",
    price: "KSh [price]",
  },
  {
    name: "Chapati",
    category: "Street food",
    image: chapatiSamosa,
    position: "12% center",
    description: "Soft, flaky, and perfect every time.",
    price: "KSh [price]",
  },
  {
    name: "Samosa",
    category: "Street food",
    image: chapatiSamosa,
    position: "88% center",
    description: "Crispy outside, tasty spiced beef inside.",
    price: "KSh [price]",
  },
];
const categories = ["All", "Mains", "Snacks", "Street food"];

function WhatsAppMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="whatsapp-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 3C8.82 3 3 8.6 3 15.5c0 2.52.78 4.87 2.13 6.84L3.6 28.5l6.43-1.66A13.3 13.3 0 0 0 16 28c7.18 0 13-5.6 13-12.5S23.18 3 16 3Z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        d="M21.95 18.75c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.15-.2.31-.8 1-.98 1.21-.18.21-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.52.1-.2.05-.39-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.54.08-.82.39-.28.3-1.08 1.06-1.08 2.58s1.11 2.99 1.26 3.2c.15.2 2.18 3.33 5.29 4.67.74.32 1.32.51 1.77.65.74.24 1.42.2 1.95.12.6-.09 1.82-.74 2.08-1.46.26-.72.26-1.33.18-1.46-.08-.13-.28-.21-.59-.36Z"
        fill="currentColor"
      />
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

const EXTENSION_IGNORE_ATTRS = {
  "data-lpignore": "true",
  "data-1p-ignore": "true",
  "data-bwignore": "true",
  "data-form-type": "other",
} as const;

const subscribeNoop = () => () => {};

function TwalaHome() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [category, setCategory] = useState("All");
  const [showTop, setShowTop] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formHydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const visibleProducts = useMemo(
    () => (category === "All" ? products : products.filter((item) => item.category === category)),
    [category],
  );
  const activeHeroSlide = heroSlides[heroSlideIndex] ?? heroSlides[0];
  const activeHeroIndex = heroSlideIndex;

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

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "Hello Twala Kitchen! I'd love to make an enquiry.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Event date: ${data.get("date")}`,
      `Message: ${data.get("message")}`,
    ].join("\n");
    setSubmitted(true);
    window.open(
      `https://wa.me/254000000000?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    form.reset();
  }

  const goTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="twala-site">
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#home"
            className="wordmark"
            onClick={() => setMobileOpen(false)}
            aria-label="Twala Kitchen home"
          >
            <PotMark />
            <span className="wordmark-type">
              <span className="wordmark-name">
                Twala<span className="wordmark-dot">.</span>
              </span>
              <small>KITCHEN &amp; DELICACY</small>
            </span>
          </a>
          <nav className={`main-nav${mobileOpen ? " nav-open" : ""}`} aria-label="Main navigation">
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
              <a href="https://wa.me/254000000000" target="_blank" rel="noreferrer">
                <WhatsAppMark size={16} /> Let’s talk
              </a>
            </Button>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-toggle"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <MenuIcon />}
          </Button>
        </div>
      </header>

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
                <img
                  className="hero-standalone-bg"
                  src={slide.image}
                  alt={slide.alt}
                  style={{ objectPosition: slide.position }}
                  width={1440}
                  height={1080}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
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
                      <Button variant="secondary" size="lg" asChild>
                        <a
                          href={`https://wa.me/254000000000?text=${encodeURIComponent(`Hello Twala Kitchen! I'd like to order ${slide.name}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <WhatsAppMark size={17} /> Order {slide.name}
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
          <div
            className="hero-controls page-width hero-controls-dark"
          >
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
                Made fresh, every day <Heart size={14} />
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
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <div className="menu-image-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ objectPosition: item.position }}
                      width={1200}
                      height={1000}
                      loading="lazy"
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
                    <a
                      className="menu-order"
                      href="https://wa.me/254000000000"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ask us about this <ArrowRight size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="catering" className="catering-section section-pad">
          <div className="page-width">
            <div className="catering-heading reveal">
              <p className="eyebrow eyebrow-light">
                <span /> BRING EVERYONE TO THE TABLE
              </p>
              <h2>
                We cater for <em>moments.</em>
              </h2>
              <p>Big days, busy weeks, and everything worth sharing.</p>
            </div>
            <div className="catering-grid">
              <article className="catering-item reveal">
                <span className="service-icon">
                  <CalendarDays />
                </span>
                <span className="service-number">01</span>
                <h3>Birthdays</h3>
                <p>
                  Make your special day a little more delicious. We’ll take care of the good food.
                </p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo("contact");
                  }}
                >
                  Plan a celebration <ArrowRight size={14} />
                </a>
              </article>
              <article className="catering-item reveal">
                <span className="service-icon">
                  <Users />
                </span>
                <span className="service-number">02</span>
                <h3>Events</h3>
                <p>
                  Weddings, parties, work gatherings, and family get-togethers. Let’s make it
                  memorable.
                </p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo("contact");
                  }}
                >
                  Tell us about it <ArrowRight size={14} />
                </a>
              </article>
              <article className="catering-item reveal">
                <span className="service-icon">
                  <ChefHat />
                </span>
                <span className="service-number">03</span>
                <h3>Meal preps</h3>
                <p>
                  Fresh, thoughtful meals prepared for your week, so good food is always close by.
                </p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo("contact");
                  }}
                >
                  Make life easier <ArrowRight size={14} />
                </a>
              </article>
              <aside className="love-seal">
                <span>MADE FRESH</span>
                <span className="seal-accent">MADE WITH LOVE</span>
                <span>MADE FOR YOU</span>
                <Heart />
              </aside>
            </div>
          </div>
        </section>

        <section className="gallery-strip" aria-label="A little more from our kitchen">
          <img
            src={kenyanPlate}
            alt="A colourful Kenyan beef stew and greens plate"
            width={1200}
            height={1000}
            loading="lazy"
          />
          <img
            src={pilau}
            alt="Fragrant Kenyan beef pilau served with kachumbari"
            width={1200}
            height={896}
            loading="lazy"
          />
          <img
            src={githeri}
            alt="Slow-simmered Kenyan githeri with sliced avocado"
            width={1200}
            height={896}
            loading="lazy"
          />
          <img
            src={bhajia}
            alt="Crispy Kenyan potato bhajias with tangy ukwaju chutney"
            width={1200}
            height={896}
            loading="lazy"
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
                alt="A lovingly prepared plate of Kenyan comfort food"
                width={1200}
                height={1000}
                loading="lazy"
              />
              <div className="about-photo-stamp">
                <PotMark small />
                <span>
                  OUR TABLE
                  <br />
                  IS YOURS
                </span>
              </div>
              <span className="about-photo-count">MADE TO BE SHARED · 2026</span>
            </div>
            <div className="about-copy reveal">
              <p className="eyebrow">
                <span /> A STORY WITH HEART
              </p>
              <h2>
                A little bit of <em>home.</em>
              </h2>
              <p className="about-story">
                [Add the founder’s story here: where the love of Kenyan food began, the memories
                behind the recipes, and the people Twala brings to the table.]
              </p>
              <div className="values-list">
                <div className="value-item">
                  <span className="value-icon">
                    <Leaf />
                  </span>
                  <div>
                    <h3>Fresh, always</h3>
                    <p>Good ingredients. Thoughtfully prepared.</p>
                  </div>
                </div>
                <div className="value-item">
                  <span className="value-icon">
                    <Heart />
                  </span>
                  <div>
                    <h3>Made with love</h3>
                    <p>Because the little things are the big things.</p>
                  </div>
                </div>
                <div className="value-item">
                  <span className="value-icon">
                    <Sparkles />
                  </span>
                  <div>
                    <h3>Made for you</h3>
                    <p>Generous flavours, served just how they should be.</p>
                  </div>
                </div>
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
                <span>GIVE US A RING</span>
                <a href="tel:+254000000000">+254 000 000 000</a>
                <a className="phone-action" href="tel:+254000000000">
                  <Phone size={16} /> Call Twala
                </a>
              </div>
              <div className="contact-details">
                <div>
                  <MapPin />
                  <p>
                    <strong>Find our kitchen</strong>
                    <span>[Add your address here]</span>
                  </p>
                </div>
                <div>
                  <Clock3 />
                  <p>
                    <strong>Kitchen hours</strong>
                    <span>[Add opening days and hours]</span>
                  </p>
                </div>
              </div>
              <Button variant="secondary" size="lg" asChild>
                <a href="https://wa.me/254000000000" target="_blank" rel="noreferrer">
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
            <a href="#home" className="wordmark footer-wordmark">
              <PotMark />
              <span className="wordmark-type">
                <span className="wordmark-name">
                  Twala<span className="wordmark-dot">.</span>
                </span>
                <small>KITCHEN &amp; DELICACY</small>
              </span>
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
            <span className="footer-label">SAY HELLO</span>
            <a href="tel:+254000000000">+254 000 000 000</a>
            <a href="mailto:hello@twala.example">hello@twala.example</a>
            <a href="https://wa.me/254000000000" target="_blank" rel="noreferrer">
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
          <span>© {new Date().getFullYear()} Twala Kitchen. Made with care.</span>
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
          href={`https://wa.me/254000000000?text=${encodeURIComponent("Hello Twala Kitchen! I'd love to talk to you now.")}`}
          className="wa-float"
          target="_blank"
          rel="noreferrer"
          aria-label="Talk to us now on WhatsApp"
        >
          <span className="wa-float-card">
            <span className="wa-float-eyebrow">
              <span className="wa-live-dot" aria-hidden="true" />
              TWALA DIRECT
            </span>
            <span className="wa-float-title">Talk to us now</span>
          </span>
          <span className="wa-medallion" aria-hidden="true">
            <span className="wa-medallion-ring" />
            <WhatsAppMark size={26} />
          </span>
        </a>
      </div>
    </div>
  );
}
