import { createContext, useContext } from "react";
import type { CartItem } from "@/types/restaurant";

export type CartContextType = {
  cart: CartItem[];
  totalCartItems: number;
  totalCartAmount: number;
  cartMap: Map<string, CartItem>;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: {
    name: string;
    price: string;
    priceNum: number;
    image: string;
    category?: string;
  }) => void;
  updateQuantity: (name: string, delta: number) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
