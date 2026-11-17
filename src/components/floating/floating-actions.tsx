import React, { useEffect, useState } from "react";
import { ArrowUp, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppWidget } from "@/components/floating/whatsapp-widget";
import { useCart } from "@/context/use-cart";

export const FloatingActions = React.memo(function FloatingActions() {
  const { totalCartItems, totalCartAmount, setCartOpen } = useCart();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 520;
          setShowTop((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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
        <WhatsAppWidget />
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
    </>
  );
});
