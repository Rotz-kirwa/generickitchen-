import React from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import type { Product } from "@/types/restaurant";
import { getWhatsAppUrl } from "@/data/restaurant-data";

type MenuCardProps = {
  item: Product;
  index: number;
  productNumber: number;
  quantity: number;
  onAddToCart: (item: Product) => void;
  onUpdateQuantity: (name: string, delta: number) => void;
};

export const MenuCard = React.memo(function MenuCard({
  item,
  index,
  productNumber,
  quantity,
  onAddToCart,
  onUpdateQuantity,
}: MenuCardProps) {
  const isInCart = quantity > 0;

  return (
    <article className="menu-card" style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}>
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
        <span className="menu-number">{String(productNumber).padStart(2, "0")}</span>
      </div>
      <div className="menu-card-copy">
        <div className="menu-title-row">
          <h3>{item.name}</h3>
          <span className="menu-price">{item.price}</span>
        </div>
        <p>{item.description}</p>
        <div className="menu-card-footer">
          {isInCart ? (
            <div className="menu-stepper">
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.name, -1)}
                aria-label={`Decrease ${item.name} quantity`}
              >
                <Minus size={12} />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.name, 1)}
                aria-label={`Increase ${item.name} quantity`}
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button type="button" className="menu-add-cart-btn" onClick={() => onAddToCart(item)}>
              <Plus size={13} /> Add to Cart
            </button>
          )}
          <a
            className="menu-order"
            href={getWhatsAppUrl(
              `Hello Generic Kitchen Delicacies! I'd like to ask about ${item.name}.`,
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
  );
});
