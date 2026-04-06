"use client";
import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const RELATED_ITEMS = [
  {
    id: 101,
    name: "Exclusive Photoset",
    price: 500,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s",
  },
  {
    id: 102,
    name: "New Rose Toy",
    price: 2500,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s",
  },
  {
    id: 103,
    name: "Feet Pic",
    price: 250,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s",
  },
  {
    id: 104,
    name: "Private Session",
    price: 1500,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s",
  },
  {
    id: 105,
    name: "Fan Club Membership",
    price: 1500,
    currency: "tk/month",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s",
  },
  {
    id: 106,
    name: "Personalized Video",
    price: 2000,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s",
  },
  {
    id: 107,
    name: "Exclusive Photoset",
    price: 500,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s",
  },
  {
    id: 108,
    name: "Used Lingerie",
    price: 3000,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s",
  },
  {
    id: 109,
    name: "Silk Bra Set",
    price: 2500,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s",
  },
  {
    id: 110,
    name: "Corset",
    price: 5500,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s",
  },
  {
    id: 111,
    name: "Thong Set",
    price: 1800,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s",
  },
  {
    id: 112,
    name: "Fishnet",
    price: 1200,
    currency: "tk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s",
  },
];

export default function ProductDetailPage({
  product,
  onBack,
  onViewCart,
  onAddToCart,
  onViewStorefront,
  onSelectProduct,
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleBuy = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    onAddToCart({ ...product, selectedSize, qty });
    setAdded(true);
  };

  const handleRelatedBuy = (e, item) => {
    e.stopPropagation();
    onAddToCart({ ...item, selectedSize: "One Size", qty: 1 });
    setAdded(true);
  };

  return (
    <div style={{
      minHeight: "100%",
      background: "#0d0d0d",
      color: "#fff",
      fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
    }}>

      {/* Back button */}
      <div style={{ padding: "16px 20px 0" }}>
        <button
          onClick={onBack}
          style={{
            background: "none", border: "none", color: "#aaa",
            fontSize: 13, cursor: "pointer", display: "flex",
            alignItems: "center", gap: 6, padding: 0, fontFamily: "inherit",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Shop
        </button>
      </div>

      {/* Main product section */}
      <div
        className="product-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, padding: "16px 20px 0" }}
      >
        {/* Image */}
        <div style={{
          aspectRatio: "1", background: "#1a1a1a",
          borderRadius: 10, overflow: "hidden", maxHeight: 340,
          cursor: "zoom-in",
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
        </div>

        {/* Info */}
        <div style={{ padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px", color: "#fff", lineHeight: 1.3 }}>
              {product.name}
            </h1>
            <div style={{ fontSize: 16, color: "#e53935", fontWeight: 700 }}>
              🪙 {product.price.toLocaleString()}{product.currency}
            </div>
          </div>

          {/* Model storefront link */}
          <button
            onClick={onViewStorefront}
            style={{
              background: "none", border: "none", color: "#888",
              fontSize: 12, cursor: "pointer", textAlign: "left",
              padding: 0, fontFamily: "inherit", display: "flex",
              alignItems: "center", gap: 6,
            }}
          >
            <div style={{
              width: 24, height: 24, borderRadius: "50%",
              background: "linear-gradient(135deg,#e53935,#8e24aa)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0,
            }}>A</div>
            <span style={{ textDecoration: "underline" }}>Alexa_Villia's Store</span>
          </button>

          {/* Size selector */}
          <div>
            <label style={{ fontSize: 12, color: "#aaa", display: "block", marginBottom: 8, letterSpacing: 0.5 }}>
              Size
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    padding: "6px 14px",
                    border: `1px solid ${selectedSize === s ? "#e53935" : "#333"}`,
                    borderRadius: 6,
                    background: selectedSize === s ? "rgba(229,57,53,0.12)" : "#1a1a1a",
                    color: selectedSize === s ? "#e53935" : "#aaa",
                    fontSize: 12, fontWeight: 600, cursor: "pointer",
                    fontFamily: "inherit", transition: "all 0.15s",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div>
            <label style={{ fontSize: 12, color: "#aaa", display: "block", marginBottom: 8, letterSpacing: 0.5 }}>
              Qty
            </label>
            <div style={{ display: "flex", alignItems: "center", width: "fit-content" }}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{
                  width: 32, height: 32, background: "#1a1a1a",
                  border: "1px solid #333", borderRadius: "6px 0 0 6px",
                  color: "#fff", fontSize: 16, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >−</button>
              <div style={{
                width: 40, height: 32, background: "#141414",
                border: "1px solid #333", borderLeft: "none", borderRight: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#fff",
              }}>{qty}</div>
              <button
                onClick={() => setQty(q => q + 1)}
                style={{
                  width: 32, height: 32, background: "#1a1a1a",
                  border: "1px solid #333", borderRadius: "0 6px 6px 0",
                  color: "#fff", fontSize: 16, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >+</button>
            </div>
          </div>

          {/* Buy Now */}
          <button
            onClick={handleBuy}
            style={{
              background: added ? "#2e7d32" : "#e53935",
              color: "#fff", border: "none", borderRadius: 8,
              padding: "13px", fontSize: 14, fontWeight: 700,
              cursor: "pointer", letterSpacing: 0.5,
              transition: "background 0.2s", fontFamily: "inherit",
            }}
            onMouseEnter={e => { if (!added) e.currentTarget.style.background = "#c62828"; }}
            onMouseLeave={e => { e.currentTarget.style.background = added ? "#2e7d32" : "#e53935"; }}
          >
            {added ? "✓ Added to Cart" : "BUY NOW"}
          </button>

          {/* View Cart — only shows after adding */}
          {added && (
            <button
              onClick={onViewCart}
              style={{
                background: "transparent", border: "1px solid #e53935",
                color: "#e53935", borderRadius: 8, padding: "10px",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                fontFamily: "inherit", transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#e53935";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#e53935";
              }}
            >
              View Cart →
            </button>
          )}
        </div>
      </div>

      {/* Description sections */}
      <div style={{ padding: "28px 20px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
          {[
            { label: "Description", text: product.description || "This is a lingerie set available in various colours" },
            { label: "Condition", text: "Worn/Unworn" },
            { label: "Model's Note", text: "The bottom has a hole where you can add accessories" },
            { label: "Shipping Information", text: "Only ships to the UK using the shipping information provided" },
          ].map(({ label, text }) => (
            <div key={label} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Items — 6 columns, fills rows */}
      <div style={{ padding: "24px 20px 40px" }}>
        <h2 style={{
          fontSize: 13, fontWeight: 700, letterSpacing: 3,
          color: "#fff", marginBottom: 16, textTransform: "uppercase",
        }}>
          Related Items
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {RELATED_ITEMS.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectProduct && onSelectProduct(item)}
              style={{
                background: "#141414", border: "1px solid #1e1e1e",
                borderRadius: 8, overflow: "hidden", cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#333"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e1e"}
            >
              <div style={{ aspectRatio: "1", background: "#1a1a1a", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              <div style={{ padding: "8px 8px 4px" }}>
                <div style={{ fontSize: 11, color: "#ddd", fontWeight: 600, marginBottom: 2, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: "#e53935", fontWeight: 700 }}>
                  {item.price.toLocaleString()}{item.currency}
                </div>
              </div>
              <div style={{ padding: "4px 8px 8px" }}>
                <button
                  onClick={(e) => handleRelatedBuy(e, item)}
                  style={{
                    background: "#e53935", color: "#fff", border: "none",
                    borderRadius: 6, padding: "6px", fontSize: 10,
                    fontWeight: 700, cursor: "pointer", width: "100%",
                    fontFamily: "inherit", letterSpacing: 0.5,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#c62828"}
                  onMouseLeave={e => e.currentTarget.style.background = "#e53935"}
                >BUY NOW</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}