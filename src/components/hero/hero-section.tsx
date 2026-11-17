import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppMark } from "@/components/brand-wordmark";
import { HERO_SLIDE_INTERVAL_MS, getWhatsAppUrl, heroSlides } from "@/data/restaurant-data";
import { useCart } from "@/context/use-cart";

type HeroSectionProps = {
  onSelectCategory: (category: string) => void;
  onGoTo: (id: string) => void;
};

export const HeroSection = React.memo(function HeroSection({
  onSelectCategory,
  onGoTo,
}: HeroSectionProps) {
  const { addToCart, setCartOpen } = useCart();
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isHoveredOrFocused, setIsHoveredOrFocused] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Track slides that should have images rendered (active, next, and prev for smooth animation)
  const nextIdx = (heroSlideIndex + 1) % heroSlides.length;
  const prevIdx = (heroSlideIndex - 1 + heroSlides.length) % heroSlides.length;

  // Viewport intersection observer: pause rotation when hero is off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsInViewport(entry.isIntersecting);
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Page visibility listener: pause rotation when tab is hidden
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Automatic slide rotation
  useEffect(() => {
    if (isHoveredOrFocused || !isInViewport || !isTabVisible) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const timer = window.setInterval(() => {
      setHeroSlideIndex((curr) => (curr + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isHoveredOrFocused, isInViewport, isTabVisible]);

  const selectHeroSlide = useCallback((index: number) => {
    setHeroSlideIndex(((index % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }, []);

  const activeHeroSlide = heroSlides[heroSlideIndex] ?? heroSlides[0];

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      id="home"
      onMouseEnter={() => setIsHoveredOrFocused(true)}
      onMouseLeave={() => setIsHoveredOrFocused(false)}
      onFocus={() => setIsHoveredOrFocused(true)}
      onBlur={() => setIsHoveredOrFocused(false)}
    >
      <div
        className="hero-carousel-track"
        style={{ transform: `translate3d(-${heroSlideIndex * 100}%, 0, 0)` }}
      >
        {heroSlides.map((slide, idx) => {
          const isActive = idx === heroSlideIndex;
          const shouldRenderImage = idx === heroSlideIndex || idx === nextIdx || idx === prevIdx;
          const isLcp = idx === 0;

          return (
            <div
              className="hero-carousel-slide hero-standalone-slide"
              key={slide.name}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              {shouldRenderImage && (
                <img
                  className="hero-standalone-bg"
                  src={slide.image}
                  srcSet={
                    slide.image640 && slide.image960
                      ? `${slide.image640} 640w, ${slide.image960} 960w, ${slide.image} 1200w`
                      : undefined
                  }
                  sizes="100vw"
                  alt={slide.alt}
                  style={{ objectPosition: slide.position }}
                  width={1200}
                  height={900}
                  fetchPriority={isLcp ? "high" : "auto"}
                  loading={isLcp ? "eager" : "lazy"}
                  decoding={isLcp ? "sync" : "async"}
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
                          `Hello Generic Kitchen Delicacies! I'd like to order ${slide.name}.`,
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
                        onSelectCategory(slide.category);
                        onGoTo("menu");
                      }}
                    >
                      View {slide.category} <ArrowRight size={17} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hero-controls page-width hero-controls-dark">
        <div className="hero-controls-status" aria-live="polite">
          <span>{String(heroSlideIndex + 1).padStart(2, "0")}</span>
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
                aria-selected={heroSlideIndex === idx}
                aria-label={`Show ${slide.name}`}
                className={`hero-slider-dot${heroSlideIndex === idx ? " is-active" : ""}`}
                onClick={() => selectHeroSlide(idx)}
              />
            ))}
          </div>
          <a
            className="scroll-cue"
            href="#menu"
            aria-label="Scroll to the menu"
            onClick={(e) => {
              e.preventDefault();
              onGoTo("menu");
            }}
          >
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
      <div className="hero-bottom-rule" />
    </section>
  );
});
