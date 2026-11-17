import React, { useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandWordmark, WhatsAppMark } from "@/components/brand-wordmark";
import { NAV_ITEMS, getWhatsAppUrl } from "@/data/restaurant-data";

type MobileNavigationProps = {
  open: boolean;
  active: string;
  onClose: () => void;
  onGoTo: (id: string) => void;
};

export const MobileNavigation = React.memo(function MobileNavigation({
  open,
  active,
  onClose,
  onGoTo,
}: MobileNavigationProps) {
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const desktopQuery = window.matchMedia("(min-width: 641px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onBreakpoint);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={`mobile-drawer-backdrop${open ? " is-open" : ""}`}
        aria-hidden="true"
        onClick={onClose}
      />
      <aside
        id="mobile-navigation-drawer"
        className={`mobile-drawer${open ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mobile-drawer-header">
          <a
            href="#home"
            className="wordmark mobile-drawer-brand"
            onClick={(event) => {
              event.preventDefault();
              onGoTo("home");
            }}
            aria-label="Generic Kitchen Delicacies home"
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
            onClick={onClose}
          >
            <X />
          </Button>
        </div>
        <nav className="mobile-drawer-nav" aria-label="Mobile sections">
          {NAV_ITEMS.map((item, idx) => {
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
                <span className="mobile-drawer-index">{String(idx + 1).padStart(2, "0")}</span>
                <span className="mobile-drawer-label">{item}</span>
                <ArrowRight className="mobile-drawer-arrow" size={16} />
              </a>
            );
          })}
        </nav>
        <div className="mobile-drawer-footer">
          <Button variant="default" size="lg" className="mobile-drawer-cta" asChild>
            <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" onClick={onClose}>
              <WhatsAppMark size={17} /> Let’s talk on WhatsApp
            </a>
          </Button>
          <p className="mobile-drawer-note">Taste of home · Made with love</p>
        </div>
      </aside>
    </>
  );
});
