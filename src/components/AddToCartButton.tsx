"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/data";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const { addProduct } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addProduct(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAdd}
        className={`w-full py-5 px-8 font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-4 cursor-pointer ${
          added
            ? "bg-green-600 shadow-green-600/10 text-white"
            : "bg-primary hover:bg-primary-dark shadow-primary/10 text-white"
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={added ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {added ? "check_circle" : "shopping_bag"}
        </span>
        {added ? "Đã Thêm Vào Giỏ Hàng ✓" : "Thêm Vào Giỏ Hàng"}
      </button>
      <button className="w-full border border-stone-900 text-stone-900 py-5 px-8 font-bold text-sm tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-white transition-all duration-300 cursor-pointer">
        Mua Ngay
      </button>
    </div>
  );
}
