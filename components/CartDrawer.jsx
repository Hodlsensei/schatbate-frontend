"use client";
import { useCart } from "./CartContext";

const SANS = "'Helvetica Neue', Arial, sans-serif";

export default function CartDrawer({ modelId, open, onClose, onCheckout }) {
  const { getCartForModel, updateQty, removeFromCart, getCartTotal } = useCart();
  const items = getCartForModel(modelId);
  const total = getCartTotal(modelId);
  const currency = items[0]?.currency || "tk";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          zIndex: 998, opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, height: "100%", width: 400,
        maxWidth: "100%", background: "#fff", zIndex: 999,
        display: "flex", flexDirection: "column", fontFamily: SANS,
        boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", borderBottom: "1px solid #eee",
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
            Your Bag {items.length > 0 && `(${items.reduce((s, i) => s + i.qty, 0)})`}
          </h3>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: "50%", border: "none",
            background: "rgba(0,0,0,0.06)", cursor: "pointer", fontSize: 18, color: "#111",
          }}>×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#999" }}>
              <p style={{ fontSize: 14, margin: 0 }}>Your bag is empty.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.lineId} style={{
                display: "flex", gap: 14, marginBottom: 20, paddingBottom: 20,
                borderBottom: "1px solid #f0f0f0",
              }}>
                <div style={{ width: 64, height: 78, background: "#f5f0eb", flexShrink: 0, overflow: "hidden" }}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 12, fontWeight: 500, textTransform: "uppercase", lineHeight: 1.4,
                    margin: "0 0 4px", color: "#111",
                    overflow: "hidden", textOverflow: "ellipsis",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  }}>{item.name}</p>
                  <p style={{ fontSize: 11, color: "#999", margin: "0 0 8px" }}>
                    {item.selectedSize && `Size: ${item.selectedSize}`}
                    {item.selectedColor && ` · ${item.selectedColor}`}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd" }}>
                      <button
                        onClick={() => updateQty(modelId, item.lineId, item.qty - 1)}
                        style={miniBtnStyle}
                      >−</button>
                      <span style={{ fontSize: 12, width: 28, textAlign: "center" }}>{item.qty}</span>
                      <button
                        onClick={() => updateQty(modelId, item.lineId, item.qty + 1)}
                        style={miniBtnStyle}
                      >+</button>
                    </div>
                    <span style={{ fontSize: 13, color: "#1a1aee" }}>
                      {(item.price * item.qty).toLocaleString()}{item.currency}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(modelId, item.lineId)}
                  style={{
                    border: "none", background: "none", cursor: "pointer",
                    color: "#bbb", fontSize: 16, height: 20, padding: 0,
                  }}
                  aria-label="Remove item"
                >×</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ borderTop: "1px solid #eee", padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 16 }}>
              <span style={{ fontWeight: 500 }}>Subtotal</span>
              <span style={{ fontWeight: 700 }}>{total.toLocaleString()}{currency}</span>
            </div>
            <button
              onClick={onCheckout}
              style={{
                width: "100%", background: "#111", color: "#fff", border: "none",
                padding: "16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em",
                cursor: "pointer", fontFamily: SANS,
              }}
            >
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const miniBtnStyle = {
  width: 26, height: 26, border: "none", background: "transparent",
  cursor: "pointer", fontSize: 13, color: "#111",
};