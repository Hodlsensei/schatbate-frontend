"use client";
import { useState, useEffect } from "react";

const benefits = [
  { icon: "🔒", label: "Exclusive Private\nContent" },
  { icon: "🚫", label: "Ad-Free Viewing", customIcon: true },
  { icon: "🎧", label: "Priority Support" },
  { icon: "🏷️", label: "Exclusive\nDiscounts" },
];

const activities = [
  { name: "Watched Private Show (Alice)", time: "25 hours ago" },
  { name: "Redeemed Discount Code", time: "1 hours ago" },
  { name: "Contacted VIP Support", time: "12 hours ago" },
];

export default function VipDashboard() {
  const [showCancel, setShowCancel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{
      minHeight: "100%",
      background: "#0d0d0d",
      color: "#fff",
      fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
      padding: isMobile ? "20px 16px" : "32px 40px",
    }}>
      <h1 style={{ fontSize: isMobile ? 16 : 22, fontWeight: 700, letterSpacing: 3, marginBottom: isMobile ? 16 : 24, color: "#fff" }}>
        VIP MEMBERSHIP DASHBOARD
      </h1>

      {/* Status Card */}
      <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: isMobile ? 20 : 32, border: "1px solid #333", maxWidth: 700 }}>
        <div style={{
          background: "linear-gradient(135deg, #b8860b 0%, #ffd700 40%, #c0c0c0 70%, #a8a8a8 100%)",
          padding: isMobile ? "16px" : "20px 24px 14px",
        }}>
          <div style={{ fontSize: 11, color: "rgba(0,0,0,0.7)", letterSpacing: 2, fontWeight: 600 }}>CURRENT STATUS:</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: isMobile ? 22 : 32, fontWeight: 900, color: "#1a1a1a", letterSpacing: 1 }}>VIP GOLD</div>
            <div style={{ fontSize: isMobile ? 16 : 24, fontWeight: 900, color: "#1a1a1a", letterSpacing: 2 }}>PLATINUM</div>
          </div>
          <div style={{ height: 6, background: "rgba(0,0,0,0.2)", borderRadius: 3, margin: "12px 0" }}>
            <div style={{ height: "100%", width: "65%", background: "linear-gradient(90deg, #1a1a1a, #555)", borderRadius: 3 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: isMobile ? 10 : 12, color: "rgba(0,0,0,0.75)", fontWeight: 600, paddingBottom: 4 }}>
            <span>Member Since: 2023</span>
            <span>Next Billing: 01/03/2026</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div style={{ marginBottom: isMobile ? 20 : 32 }}>
        <h2 style={{ fontSize: isMobile ? 10 : 13, letterSpacing: 3, color: "#aaa", marginBottom: 14, fontWeight: 700 }}>YOUR BENEFITS</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, minmax(0, 160px))",
          gap: isMobile ? 10 : 12,
        }}>
          {benefits.map((b, i) => (
            <div key={i} style={{
              background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10,
              padding: isMobile ? "14px 10px" : "20px 12px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center",
            }}>
              <div style={{
                width: isMobile ? 36 : 48, height: isMobile ? 36 : 48, borderRadius: 10,
                background: "#252525", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: isMobile ? 18 : 24, color: "#c9a84c",
              }}>
                {i === 1 ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 9h18M9 21V9"/>
                    <line x1="4" y1="4" x2="20" y2="20" stroke="#c9a84c" strokeWidth="2"/>
                  </svg>
                ) : b.icon}
              </div>
              <div style={{ fontSize: isMobile ? 10 : 11, color: "#ccc", lineHeight: 1.4, fontWeight: 600, letterSpacing: 0.5 }}>
                {b.label.split("\n").map((line, j) => <div key={j}>{line}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity + Manage */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 320px",
        gap: isMobile ? 16 : 24,
        maxWidth: 900,
      }}>
        {/* Recent Activity */}
        <div>
          <h2 style={{ fontSize: isMobile ? 10 : 11, letterSpacing: 2, color: "#aaa", marginBottom: 14, fontWeight: 700 }}>RECENT VIP ACTIVITY</h2>
          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 8, overflow: "hidden" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr auto",
              padding: "10px 16px", borderBottom: "1px solid #222",
              fontSize: 11, color: "#666", fontWeight: 700, letterSpacing: 1,
            }}>
              <span>Name</span><span>Last Time</span>
            </div>
            {activities.map((a, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "12px 16px",
                borderBottom: i < activities.length - 1 ? "1px solid #1e1e1e" : "none",
                gap: 12,
              }}>
                <span style={{ fontSize: isMobile ? 11 : 13, color: "#ddd", lineHeight: 1.4 }}>{a.name}</span>
                <span style={{ fontSize: isMobile ? 10 : 11, color: "#666", whiteSpace: "nowrap" }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Manage Subscription */}
        <div>
          <h2 style={{ fontSize: isMobile ? 10 : 11, letterSpacing: 2, color: "#aaa", marginBottom: 14, fontWeight: 700 }}>MANAGE SUBSCRIPTION</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button style={{
              background: "#00e5ff", color: "#000", border: "none", borderRadius: 8,
              padding: "14px", fontSize: isMobile ? 13 : 14, fontWeight: 700, cursor: "pointer",
            }}>Upgrade Plan</button>
            <button style={{
              background: "transparent", color: "#00e5ff", border: "1px solid #00e5ff",
              borderRadius: 8, padding: "14px", fontSize: isMobile ? 13 : 14, fontWeight: 700, cursor: "pointer",
            }}>View Billing</button>
            <button onClick={() => setShowCancel(true)} style={{
              background: "transparent", color: "#ff4444", border: "1px solid #ff4444",
              borderRadius: 8, padding: "14px", fontSize: isMobile ? 13 : 14, fontWeight: 700, cursor: "pointer",
            }}>Cancel Subscription</button>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancel && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16,
        }}>
          <div style={{
            background: "#1a1a1a", border: "1px solid #333", borderRadius: 12,
            padding: 28, maxWidth: 320, width: "100%", textAlign: "center",
          }}>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Cancel Subscription?</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>You will lose all VIP benefits at the end of your billing period.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowCancel(false)} style={{
                flex: 1, background: "#252525", color: "#fff", border: "none",
                borderRadius: 8, padding: 12, cursor: "pointer", fontWeight: 600,
              }}>Keep VIP</button>
              <button style={{
                flex: 1, background: "#ff4444", color: "#fff", border: "none",
                borderRadius: 8, padding: 12, cursor: "pointer", fontWeight: 600,
              }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}