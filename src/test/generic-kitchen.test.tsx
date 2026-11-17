import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CartProvider } from "@/context/cart-context";
import { HeroSection } from "@/components/hero/hero-section";
import { MenuSection } from "@/components/menu/menu-section";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { FloatingActions } from "@/components/floating/floating-actions";
import { SiteHeader } from "@/components/header/site-header";
import { MobileNavigation } from "@/components/header/mobile-navigation";
import { heroSlides, products, categories, getWhatsAppUrl } from "@/data/restaurant-data";
import { useState } from "react";

function TestApp() {
  const [category, setCategory] = useState("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  return (
    <CartProvider>
      <SiteHeader
        active={active}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
        onGoTo={(id) => setActive(id)}
      />
      <MobileNavigation
        open={mobileOpen}
        active={active}
        onClose={() => setMobileOpen(false)}
        onGoTo={(id) => setActive(id)}
      />
      <HeroSection onSelectCategory={setCategory} onGoTo={(id) => setActive(id)} />
      <MenuSection category={category} onSelectCategory={setCategory} />
      <FloatingActions />
      <CartDrawer onGoTo={(id) => setActive(id)} />
    </CartProvider>
  );
}

describe("Generic Kitchen Delicacies Comprehensive Functional Tests", () => {
  it("preserves all 7 hero slides and all 27 menu products", () => {
    expect(heroSlides).toHaveLength(7);
    expect(heroSlides[0].name).toBe("Nyama Choma");
    expect(heroSlides[0].price).toBe("$28");
    expect(heroSlides[0].priceNum).toBe(28);

    expect(products).toHaveLength(27);
    expect(categories).toContain("Staples");
    expect(categories).toContain("Meat Dishes");
    expect(categories).toContain("Vegetables & Sides");
    expect(categories).toContain("Soups");
    expect(categories).toContain("Snacks");
    expect(categories).toContain("Sweets");
    expect(categories).toContain("Hot Drinks");
  });

  it("adds item to cart from hero and opens cart drawer", async () => {
    render(<TestApp />);

    // Hero title is visible
    expect(screen.getAllByText("Nyama Choma")[0]).toBeDefined();

    // Find and click "Add to Cart ($28)" button
    const heroAddBtn = screen.getByText(/Add to Cart \(\$28\)/i);
    fireEvent.click(heroAddBtn);

    // Cart drawer should now be visible with 1 item
    expect(screen.getByText("Your Order")).toBeDefined();
    expect(screen.getByText(/Items \(1\)/i)).toBeDefined();
    expect(screen.getAllByText("$28").length).toBeGreaterThan(0);

    // Increment item
    const plusButtons = screen.getAllByRole("button", { name: /Increase Nyama Choma quantity/i });
    expect(plusButtons[0]).toBeDefined();
    fireEvent.click(plusButtons[0]!);

    // Total should now be $56
    expect(screen.getByText(/Items \(2\)/i)).toBeDefined();
    expect(screen.getAllByText("$56").length).toBeGreaterThan(0);

    // Decrement item
    const minusButtons = screen.getAllByRole("button", { name: /Decrease Nyama Choma quantity/i });
    expect(minusButtons[0]).toBeDefined();
    fireEvent.click(minusButtons[0]!);
    expect(screen.getByText(/Items \(1\)/i)).toBeDefined();

    // Clear cart
    const clearBtn = screen.getByText("Clear Cart");
    fireEvent.click(clearBtn);

    expect(screen.getByText("Your cart is empty")).toBeDefined();
  });

  it("filters menu by category", async () => {
    render(<TestApp />);

    // Click "Sweets" filter
    const sweetsBtn = screen.getByRole("button", { name: "Sweets" });
    fireEvent.click(sweetsBtn);

    // Should show Kaimati, Mahamri, Mandazi, Sweet Potato
    expect(screen.getByText("Kaimati")).toBeDefined();
    expect(screen.getAllByText("Mahamri").length).toBeGreaterThan(0);

    // Should not show Nyama Choma in menu
    const menuSection = document.getElementById("menu");
    expect(menuSection?.textContent).toContain("Kaimati");
    expect(menuSection?.textContent).not.toContain("Nyama Choma (Beef)");
  });

  it("generates correct WhatsApp checkout URLs", () => {
    const url = getWhatsAppUrl("Hello Generic Kitchen");
    expect(url).toContain("https://wa.me/61455433391?text=Hello%20Generic%20Kitchen");
  });

  it("has correct updated prices for all requested dishes", () => {
    const findProduct = (name: string) => products.find((p) => p.name === name);

    expect(findProduct("Chapati")).toEqual(expect.objectContaining({ price: "$3", priceNum: 3 }));
    expect(findProduct("Mandazi")).toEqual(
      expect.objectContaining({ price: "$1.50", priceNum: 1.5 }),
    );
    expect(findProduct("Samosa")).toEqual(
      expect.objectContaining({ price: "$3.50", priceNum: 3.5 }),
    );
    expect(findProduct("Mahamri")).toEqual(
      expect.objectContaining({ price: "$1.50", priceNum: 1.5 }),
    );
    expect(findProduct("Kaimati")).toEqual(expect.objectContaining({ price: "$2", priceNum: 2 }));
    expect(findProduct("Chai (Kenyan Tea)")).toEqual(
      expect.objectContaining({ price: "$3.50", priceNum: 3.5 }),
    );
    expect(findProduct("Beef Stew")).toEqual(
      expect.objectContaining({ price: "$28", priceNum: 28 }),
    );
    expect(findProduct("Goat Stew")).toEqual(
      expect.objectContaining({ price: "$30", priceNum: 30 }),
    );
    expect(findProduct("Liver Fry")).toEqual(
      expect.objectContaining({ price: "$25", priceNum: 25 }),
    );
    expect(findProduct("Traditional Githeri")).toEqual(
      expect.objectContaining({ price: "$20", priceNum: 20 }),
    );

    const githeriSlide = heroSlides.find((s) => s.name === "Traditional Githeri");
    expect(githeriSlide).toEqual(expect.objectContaining({ price: "$20", priceNum: 20 }));
  });

  it("toggles mobile navigation drawer", async () => {
    render(<TestApp />);

    const toggleBtn = screen.getByLabelText(/Open navigation/i);
    fireEvent.click(toggleBtn);

    // Drawer should have is-open
    const drawer = document.getElementById("mobile-navigation-drawer");
    expect(drawer?.className).toContain("is-open");

    // Close button
    const closeBtns = screen.getAllByLabelText(/Close navigation/i);
    expect(closeBtns[0]).toBeDefined();
    fireEvent.click(closeBtns[0]!);
    expect(drawer?.className).not.toContain("is-open");
  });
});
