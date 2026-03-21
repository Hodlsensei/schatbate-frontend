"use client";
import { useState } from "react";

const PRESETS = [10, 25, 50, 100, 200, 500];

export default function TipModal({ username, tokens, onClose, onTip }) {
  const [amount, setAmount]   = useState(25);
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);

  const handleTip = () => {
    if (amount > tokens) return;
    setSent(true);
    setTimeout(() => {
      onTip(amount);
    }, 1200);
  };

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Modal */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 14, padding: 28, width: "100%", maxWidth: 380,
          animation: "fadeUp .2s ease both",
        }}
      >
        {sent ? (
          /* Success state */
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>🎉</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
              Tip Sent!
            </div>
            <div style={{ fontSize: 14, color: "var(--muted)" }}>
              You sent <strong style={{ color: "#f0a500" }}>🪙 {amount} tokens</strong> to {username}
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Send a Tip</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>to {username}</div>
              </div>
              <button onClick={onClose} style={{
                background: "rgba(255,255,255,0.07)", border: "none", color: "#fff",
                width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
                fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
            </div>

            {/* Token balance */}
            <div style={{
              background: "rgba(240,165,0,0.08)", border: "1px solid rgba(240,165,0,0.2)",
              borderRadius: 8, padding: "10px 14px", marginBottom: 18,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Your balance</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#f0a500" }}>🪙 {tokens} tokens</span>
            </div>

            {/* Preset amounts */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>Choose amount</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {PRESETS.map(p => (
                  <button key={p} onClick={() => setAmount(p)} style={{
                    padding: "10px 0", borderRadius: 8, cursor: "pointer",
                    border: `1px solid ${amount === p ? "#f0a500" : "rgba(255,255,255,0.1)"}`,
                    background: amount === p ? "rgba(240,165,0,0.15)" : "rgba(255,255,255,0.04)",
                    color: amount === p ? "#f0a500" : "#ccc",
                    fontSize: 13, fontWeight: 600, fontFamily: "inherit",
                    transition: "all .15s",
                  }}>
                    🪙 {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom amount */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Or enter custom amount</div>
              <input
                type="number" min={1} max={tokens}
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
                  padding: "9px 14px", color: "#fff", fontSize: 14,
                  fontFamily: "inherit", outline: "none",
                }}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Add a message (optional)</div>
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Say something nice..."
                maxLength={100}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
                  padding: "9px 14px", color: "#fff", fontSize: 13,
                  fontFamily: "inherit", outline: "none",
                }}
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleTip}
              disabled={amount <= 0 || amount > tokens}
              style={{
                width: "100%", background: amount > tokens ? "#333" : "#e53935",
                border: "none", color: amount > tokens ? "#666" : "#fff",
                fontSize: 15, fontWeight: 700, padding: "13px 0", borderRadius: 8,
                cursor: amount > tokens ? "not-allowed" : "pointer",
                fontFamily: "inherit", transition: "opacity .15s",
                boxShadow: amount > tokens ? "none" : "0 2px 16px rgba(229,57,53,0.35)",
              }}
            >
              {amount > tokens ? "Not enough tokens" : `Send 🪙 ${amount} Tokens`}
            </button>

            {amount > tokens && (
              <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
                You need {amount - tokens} more tokens.{" "}
                <span style={{ color: "#f0a500", cursor: "pointer" }}>Get tokens →</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}