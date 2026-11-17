import React from "react";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandWordmark, WhatsAppMark } from "@/components/brand-wordmark";
import { NAV_ITEMS, getWhatsAppUrl } from "@/data/restaurant-data";
import { useCart } from "@/context/use-cart";

type SiteHeaderProps = {
  active: string;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onGoTo: (id: string) => void;
};

export const SiteHeader = React.memo(function SiteHeader({
  active,
  mobileOpen,
  onToggleMobile,
  onGoTo,
}: SiteHeaderProps) {
  const { totalCartItems, setCartOpen } = useCart();

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          href="#home"
          className="wordmark"
          onClick={(event) => {
            event.preventDefault();
            onGoTo("home");
          }}
          aria-label="Generic Kitchen Delicacies home"
        >
          <BrandWordmark />
        </a>
        <div className="header-actions">
          <nav className="main-nav" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const id = item.toLowerCase();
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={active === id ? "nav-active" : ""}
                  onClick={(event) => {
                    event.preventDefault();
                    onGoTo(id);
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
            onClick={onToggleMobile}
          >
            {mobileOpen ? <X /> : <MenuIcon />}
          </Button>
        </div>
      </div>
    </header>
  );
});
