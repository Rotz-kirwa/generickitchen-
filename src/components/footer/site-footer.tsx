import React from "react";
import { ArrowRight, Heart } from "lucide-react";
import { BrandWordmark } from "@/components/brand-wordmark";
import { NAV_ITEMS, PHONE_DISPLAY, PHONE_TEL, getWhatsAppUrl } from "@/data/restaurant-data";

export const SiteFooter = React.memo(function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-width">
        <div className="footer-brand">
          <a
            href="#home"
            className="wordmark footer-wordmark"
            aria-label="Generic Kitchen Delicacies home"
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
          {NAV_ITEMS.map((item) => (
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
        <span>© {new Date().getFullYear()} Generic Kitchen Delicacies. Made with care.</span>
        <span>
          Kenyan at heart <Heart size={12} /> Made to be shared
        </span>
      </div>
    </footer>
  );
});
