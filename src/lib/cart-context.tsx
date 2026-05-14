"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product, CartItem } from "@/lib/data";
import { getCartItemKey, getCartItemTotal } from "@/lib/data";
import type { DesignDraft } from "@/types/design";

interface CartContextType {
  items: CartItem[];
  addProduct: (product: Product) => void;
  addDesign: (design: DesignDraft) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  cartBounce: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartBounce, setCartBounce] = useState(false);

  const triggerBounce = useCallback(() => {
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 600);
  }, []);

  const addProduct = useCallback(
    (product: Product) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.kind === "product" && i.product.slug === product.slug,
        );
        if (existing) {
          return prev.map((i) =>
            i.kind === "product" && i.product.slug === product.slug
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
        }
        return [...prev, { kind: "product", product, quantity: 1 }];
      });
      triggerBounce();
    },
    [triggerBounce],
  );

  const addDesign = useCallback(
    (design: DesignDraft) => {
      setItems((prev) => [...prev, { kind: "design", design, quantity: 1 }]);
      triggerBounce();
    },
    [triggerBounce],
  );

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => getCartItemKey(i) !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => getCartItemKey(i) !== key));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (getCartItemKey(i) === key ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + getCartItemTotal(i), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addProduct,
        addDesign,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        cartBounce,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
