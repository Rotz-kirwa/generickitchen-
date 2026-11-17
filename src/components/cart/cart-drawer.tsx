import React, { useEffect, useState } from "react";
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppMark } from "@/components/brand-wordmark";
import { getWhatsAppUrl } from "@/data/restaurant-data";
import { useCart } from "@/context/use-cart";

type CartDrawerProps = {
  onGoTo: (id: string) => void;
};

export const CartDrawer = React.memo(function CartDrawer({ onGoTo }: CartDrawerProps) {
  const {
    cart,
    totalCartItems,
    totalCartAmount,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  useEffect(() => {
    if (!cartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, setCartOpen]);

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    const itemsSummary = cart.map(
      (item) =>
        `• ${item.quantity}x ${item.name} ($${item.priceNum} each) = $${item.quantity * item.priceNum}`,
    );

    const messageLines = [
      "Hello Generic Kitchen Delicacies! I'd like to place an order from your website:",
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

  return (
    <>
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
                  onGoTo("menu");
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
                    loading="lazy"
                    decoding="async"
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
    </>
  );
});
