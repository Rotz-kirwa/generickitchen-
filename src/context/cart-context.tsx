import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem } from "@/types/restaurant";
import { CartContext } from "@/context/use-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("generic_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("generic_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const totalCartItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const totalCartAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * item.priceNum, 0),
    [cart],
  );

  const cartMap = useMemo(() => {
    const map = new Map<string, CartItem>();
    for (const item of cart) {
      map.set(item.name, item);
    }
    return map;
  }, [cart]);

  const addToCart = useCallback(
    (product: {
      name: string;
      price: string;
      priceNum: number;
      image: string;
      category?: string;
    }) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.name === product.name);
        if (existing) {
          return prev.map((item) =>
            item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }
        return [
          ...prev,
          {
            name: product.name,
            price: product.price,
            priceNum: product.priceNum,
            quantity: 1,
            image: product.image,
            category: product.category,
          },
        ];
      });
    },
    [],
  );

  const updateQuantity = useCallback((name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.name === name) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  }, []);

  const removeFromCart = useCallback((name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      totalCartItems,
      totalCartAmount,
      cartMap,
      cartOpen,
      setCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      cart,
      totalCartItems,
      totalCartAmount,
      cartMap,
      cartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
