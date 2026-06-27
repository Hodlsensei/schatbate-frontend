"use client";
import { createContext, useContext, useState, useCallback, useMemo } from "react";

/**
 * Cart is scoped per-model: { [modelId]: CartItem[] }
 * CartItem: { lineId, productId, name, price, currency, qty, selectedSize, selectedColor, image, modelId }
 *
 * lineId uniquely identifies a product+size+color combination, so adding the
 * same product with a different size creates a separate line item, while
 * adding the same product+size+color again just increments qty.
 */

const CartContext = createContext(null);

function makeLineId(productId, selectedSize, selectedColor) {
  return [productId, selectedSize || "-", selectedColor || "-"].join("::");
}

export function CartProvider({ children }) {
  // { [modelId]: { [lineId]: CartItem } }
  const [cartsByModel, setCartsByModel] = useState({});

  const addToCart = useCallback((modelId, product) => {
    const {
      productId, name, price, currency = "tk",
      qty = 1, selectedSize = null, selectedColor = null, image,
    } = product;

    const lineId = makeLineId(productId, selectedSize, selectedColor);

    setCartsByModel(prev => {
      const modelCart = prev[modelId] || {};
      const existing = modelCart[lineId];

      const nextLine = existing
        ? { ...existing, qty: existing.qty + qty }
        : { lineId, productId, name, price, currency, qty, selectedSize, selectedColor, image, modelId };

      return {
        ...prev,
        [modelId]: { ...modelCart, [lineId]: nextLine },
      };
    });
  }, []);

  const removeFromCart = useCallback((modelId, lineId) => {
    setCartsByModel(prev => {
      const modelCart = { ...(prev[modelId] || {}) };
      delete modelCart[lineId];
      return { ...prev, [modelId]: modelCart };
    });
  }, []);

  const updateQty = useCallback((modelId, lineId, qty) => {
    setCartsByModel(prev => {
      const modelCart = prev[modelId] || {};
      const existing = modelCart[lineId];
      if (!existing) return prev;

      if (qty <= 0) {
        const next = { ...modelCart };
        delete next[lineId];
        return { ...prev, [modelId]: next };
      }

      return {
        ...prev,
        [modelId]: { ...modelCart, [lineId]: { ...existing, qty } },
      };
    });
  }, []);

  const clearCart = useCallback((modelId) => {
    setCartsByModel(prev => ({ ...prev, [modelId]: {} }));
  }, []);

  const getCartForModel = useCallback((modelId) => {
    const modelCart = cartsByModel[modelId] || {};
    return Object.values(modelCart);
  }, [cartsByModel]);

  const getCartCount = useCallback((modelId) => {
    const modelCart = cartsByModel[modelId] || {};
    return Object.values(modelCart).reduce((sum, item) => sum + item.qty, 0);
  }, [cartsByModel]);

  const getCartTotal = useCallback((modelId) => {
    const modelCart = cartsByModel[modelId] || {};
    return Object.values(modelCart).reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cartsByModel]);

  const value = useMemo(() => ({
    addToCart, removeFromCart, updateQty, clearCart,
    getCartForModel, getCartCount, getCartTotal,
  }), [addToCart, removeFromCart, updateQty, clearCart, getCartForModel, getCartCount, getCartTotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}