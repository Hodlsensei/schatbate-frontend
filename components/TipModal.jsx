"use client";
import { useState } from "react";

const PRESETS = [20, 50, 100, 200, 300, 500];

const TIP_MENU = [
  { label: "SPANK ASS", tokens: 40 },
  { label: "PUT PANTY INSIDE MY ASSHOLE", tokens: 100 },
  { label: "FUCK ASSHOLE", tokens: 100 },
  { label: "SPREAD ASS", tokens: 40 },
  { label: "ANAL FART", tokens: 40 },
  { label: "ASS TO MOUTH", tokens: 50 },
  { label: "DIRTY SHOW EXCLUSIVE PVT", tokens: 350 },
  { label: "SPREAD ASSHOLE", tokens: 40 },
  { label: "OIL SHOW", tokens: 40 },
  { label: "SQUIRT", tokens: 200 },
];

export default function TipModal({ username, tokens, onClose, onTip, onBuyTokens }) {
  const [amount, setAmount] = useState(20);
  const notEnough = tokens < amount;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(0,0,0,0.4)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0,
          width: 460,
          background: "#1e1e1e",
          display: "flex", flexDirection: "column",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Send Tip</span>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "#aaa",
            fontSize: 20, cursor: "pointer", lineHeight: 1,
          }}>✕</button>
        </div>

        {/* Tab */}
        <div style={{
          padding: "10px 20px 0",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}>
          <div style={{
            display: "inline-block",
            fontSize: 13, fontWeight: 700, color: "#fff",
            paddingBottom: 10,
            borderBottom: "2px solid #fff",
          }}>Tip Menu</div>
        </div>

        {/* Tip Menu List */}
        <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "#333 transparent" }}>
          {TIP_MENU.map((item, i) => (
            <div
              key={i}
              onClick={() => setAmount(item.tokens)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "13px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                cursor: "pointer",
                background: amount === item.tokens ? "rgba(255,255,255,0.05)" : "transparent",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = amount === item.tokens ? "rgba(255,255,255,0.05)" : "transparent"}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "#ccc", letterSpacing: "0.03em" }}>
                {item.label}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#ccc", flexShrink: 0, marginLeft: 12 }}>
                {item.tokens}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom controls */}
        <div style={{
          padding: "14px 20px 20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}>
          {/* Preset buttons */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {PRESETS.map(p => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                style={{
                  flex: 1, padding: "10px 0",
                  borderRadius: 6, cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: amount === p ? "#4caf50" : "#2a2a2a",
                  color: "#fff",
                  fontSize: 13, fontWeight: amount === p ? 700 : 400,
                  fontFamily: "inherit",
                }}
              >{p}</button>
            ))}
            <button style={{
              padding: "10px 8px", borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "#2a2a2a", color: "#888", cursor: "pointer", fontSize: 16,
            }}>›</button>
          </div>

          {/* Custom amount */}
          <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Custom amount:</div>
          <input
            type="number" min={1}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            style={{
              width: "100%", background: "#111",
              border: "none", borderRadius: 4,
              padding: "10px 14px", color: "#fff", fontSize: 14,
              fontFamily: "inherit", outline: "none",
              boxSizing: "border-box", marginBottom: 14,
            }}
          />

          {/* Buy Tokens row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={onBuyTokens}
              style={{
                background: "#4caf50", border: "none", color: "#fff",
                fontSize: 13, fontWeight: 700, padding: "10px 18px",
                borderRadius: 6, cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
              }}
            >Buy Tokens</button>
            {notEnough && (
              <span style={{ fontSize: 13, color: "#aaa" }}>
                You need{" "}
                <span
                  onClick={onBuyTokens}
                  style={{ color: "#4caf50", fontWeight: 700, cursor: "pointer" }}
                >more tokens</span>
              </span>
            )}
          </div>

          <div style={{ marginTop: 12, fontSize: 11, color: "#555" }}>
            Get 50 free tokens in the hourly draw
          </div>
        </div>
      </div>
    </div>
  );
}