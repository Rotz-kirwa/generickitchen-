import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/context/cart-context";
import { SiteHeader } from "@/components/header/site-header";
import { MobileNavigation } from "@/components/header/mobile-navigation";
import { HeroSection } from "@/components/hero/hero-section";
import { MenuSection } from "@/components/menu/menu-section";
import { CateringSection } from "@/components/catering/catering-section";
import { GallerySection } from "@/components/gallery/gallery-section";
import { AboutSection } from "@/components/about/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { FloatingActions } from "@/components/floating/floating-actions";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { nyamaChoma, nyamaChoma640, nyamaChoma960 } from "@/data/restaurant-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Generic Kitchen Delicacies — Taste of Home, Made with Love" },
      {
        name: "description",
        content:
          "Discover the warm, authentic flavours of Kenya at Generic Kitchen Delicacies. Sizzling nyama choma, aromatic Swahili pilau, hearty stews, and full-service event catering.",
      },
      {
        property: "og:title",
        content: "Generic Kitchen Delicacies — Taste of Home, Made with Love",
      },
      {
        property: "og:description",
        content:
          "Authentic Kenyan cuisine, sizzling nyama choma, rich stews, and event catering, prepared fresh with love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: nyamaChoma,
        imageSrcSet: `${nyamaChoma640} 640w, ${nyamaChoma960} 960w, ${nyamaChoma} 1200w`,
        imageSizes: "100vw",
        fetchPriority: "high",
      },
    ],
  }),
  component: GenericHomeRoot,
});

function GenericHomeContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [category, setCategory] = useState("All");

  const goTo = useCallback((id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Section observer & reveal observer
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => sectionObserver.observe(section));

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

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="generic-site">
      <SiteHeader
        active={active}
        mobileOpen={mobileOpen}
        onToggleMobile={toggleMobile}
        onGoTo={goTo}
      />

      <MobileNavigation open={mobileOpen} active={active} onClose={closeMobile} onGoTo={goTo} />

      <main>
        <HeroSection onSelectCategory={setCategory} onGoTo={goTo} />
        <MenuSection category={category} onSelectCategory={setCategory} />
        <CateringSection onGoTo={goTo} />
        <GallerySection />
        <AboutSection onGoTo={goTo} />
        <ContactSection />
      </main>

      <SiteFooter />
      <FloatingActions />
      <CartDrawer onGoTo={goTo} />
    </div>
  );
}

function GenericHomeRoot() {
  return (
    <CartProvider>
      <GenericHomeContent />
    </CartProvider>
  );
}
