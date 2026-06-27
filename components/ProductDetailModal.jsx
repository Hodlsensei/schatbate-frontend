"use client";
import { useState } from "react";
import { useCart } from "./CartContext";

const SANS = "'Helvetica Neue', Arial, sans-serif";

const DEFAULT_SIZES = ["S", "M", "L", "XL"];
const DEFAULT_COLORS = ["Black", "Skin", "Maroon"];

export default function ProductDetailModal({ product, modelId, onClose }) {
  const { addToCart, getCartCount } = useCart();

  const sizes = product.sizes || DEFAULT_SIZES;
  const colors = product.colors || DEFAULT_COLORS;

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(modelId, {
      productId: product.id,
      name: product.name,
      price: parsePrice(product.price),
      currency: currencySuffix(product.price),
      qty,
      selectedSize,
      selectedColor,
      image: product.image,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", maxWidth: 880, width: "100%", maxHeight: "90vh",
          overflowY: "auto", display: "flex", position: "relative",
          fontFamily: SANS, borderRadius: 4,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16, width: 32, height: 32,
            borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.06)",
            cursor: "pointer", fontSize: 18, lineHeight: 1, color: "#111", zIndex: 2,
          }}
        >×</button>

        {/* Image */}
        <div style={{ flex: "0 0 45%", background: "#f5f0eb" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 420 }}
          />
        </div>

        {/* Details */}
        <div style={{ flex: 1, padding: "48px 40px" }}>
          {product.badge && (
            <span style={{
              display: "inline-block", background: "#111", color: "#fff",
              fontSize: 11, fontWeight: 600, padding: "5px 10px", marginBottom: 16,
            }}>{product.badge}</span>
          )}

          <h2 style={{ fontSize: 18, fontWeight: 500, textTransform: "uppercase", margin: "0 0 10px", lineHeight: 1.4, color: "#111" }}>
            {product.name}
          </h2>
          <p style={{ fontSize: 16, color: "#1a1aee", margin: "0 0 28px" }}>{product.price}</p>

          {/* Color */}
          <div style={{ marginBottom: 24 }}>
            <p style={labelStyle}>Color</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{
                    padding: "8px 16px", fontSize: 13, cursor: "pointer",
                    border: `1px solid ${selectedColor === c ? "#111" : "#ddd"}`,
                    background: selectedColor === c ? "#111" : "#fff",
                    color: selectedColor === c ? "#fff" : "#111",
                    fontFamily: SANS, transition: "all 0.15s",
                  }}
                >{c}</button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div style={{ marginBottom: 24 }}>
            <p style={labelStyle}>
              Size {sizeError && <span style={{ color: "#e53935", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— please select a size</span>}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {sizes.map(s => (
                <button
                  key={s}
                  onClick={() => { setSelectedSize(s); setSizeError(false); }}
                  style={{
                    width: 44, height: 40, fontSize: 13, cursor: "pointer",
                    border: `1px solid ${selectedSize === s ? "#111" : sizeError ? "#e53935" : "#ddd"}`,
                    background: selectedSize === s ? "#111" : "#fff",
                    color: selectedSize === s ? "#fff" : "#111",
                    fontFamily: SANS, transition: "all 0.15s",
                  }}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div style={{ marginBottom: 32 }}>
            <p style={labelStyle}>Quantity</p>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", width: 120 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={qtyBtnStyle}>−</button>
              <span style={{ flex: 1, textAlign: "center", fontSize: 14 }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={qtyBtnStyle}>+</button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              width: "100%", background: justAdded ? "#1a7a3c" : "#111", color: "#fff",
              border: "none", padding: "16px", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.14em", cursor: "pointer", fontFamily: SANS,
              transition: "background 0.2s",
            }}
          >
            {justAdded ? "ADDED TO CART ✓" : "ADD TO CART"}
          </button>

          {product.description && (
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginTop: 24 }}>{product.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
  color: "#888", margin: "0 0 10px",
};

const qtyBtnStyle = {
  width: 36, height: 38, border: "none", background: "transparent",
  cursor: "pointer", fontSize: 16, color: "#111",
};

function parsePrice(priceStr) {
  if (typeof priceStr === "number") return priceStr;
  const num = parseFloat(String(priceStr).replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 0 : num;
}

function currencySuffix(priceStr) {
  if (typeof priceStr !== "string") return "tk";
  const match = priceStr.match(/^[^\d]+/);
  return match ? match[0].trim() : "tk";
}