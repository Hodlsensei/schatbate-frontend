"use client";
import { useState, useEffect } from "react";
import Topbar from "./Topbar";
import StreamPlayer from "./StreamPlayer";
import LiveChat from "./LiveChat";
import TipModal from "./TipModal";

const COLORS = ["#c0392b","#8e24aa","#1e88e5","#00acc1","#43a047","#fb8c00"];
const EMOJIS = ["😍","🔥","💃","✨","👑","💋","🌹","⚡"];
const FLAGS  = ["🇿🇦","🇺🇸","🇧🇷","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧"];

export default function WatchPage({ username }) {
  const [viewers, setViewers]       = useState(Math.floor(Math.random() * 20000) + 1000);
  const [showTip, setShowTip]       = useState(false);
  const [following, setFollowing]   = useState(false);
  const [tokens, setTokens]         = useState(0);
  const [liveCount, setLiveCount]   = useState(11200);

  const color = COLORS[username?.charCodeAt(0) % COLORS.length] || "#c0392b";
  const emoji = EMOJIS[username?.charCodeAt(0) % EMOJIS.length] || "😍";
  const flag  = FLAGS [username?.charCodeAt(0) % FLAGS.length]  || "🇺🇸";

  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(100, v + Math.floor(Math.random() * 20) - 9));
      setLiveCount(v => Math.max(10000, v + Math.floor(Math.random() * 10) - 4));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#111", display: "flex", flexDirection: "column" }}>
      <Topbar liveCount={liveCount} />

      <div style={{ display: "flex", flex: 1, paddingTop: 50, height: "100vh" }}>

        {/* LEFT — Video + Info */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {/* Video Player */}
          <StreamPlayer username={username} color={color} emoji={emoji} viewers={viewers} />

          {/* Model Info Bar */}
          <div style={{
            background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "12px 20px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
          }}>
            {/* Avatar */}
            <div style={{
              width: 46, height: 46, borderRadius: "50%", background: color,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 700, color: "#fff", flexShrink: 0,
              border: "2px solid rgba(255,255,255,0.15)",
            }}>
              {username?.[0]?.toUpperCase()}
            </div>

            {/* Name + stats */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "var(--font-display)" }}>
                  {username}
                </span>
                <span style={{ fontSize: 12 }}>{flag}</span>
                <span style={{
                  background: "#e53935", color: "#fff", fontSize: 10, fontWeight: 700,
                  padding: "1px 7px", borderRadius: 4, letterSpacing: ".05em",
                }}>LIVE</span>
              </div>
              <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--muted)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e53935", display: "inline-block" }} />
                  {viewers.toLocaleString()} watching
                </span>
                <span>❤️ {Math.floor(Math.random() * 50000 + 1000).toLocaleString()} followers</span>
                <span>⭐ {(Math.random() * 2 + 3).toFixed(1)} rating</span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => setFollowing(f => !f)}
                style={{
                  background: following ? "rgba(229,57,53,0.15)" : "transparent",
                  border: `1px solid ${following ? "#e53935" : "rgba(255,255,255,0.2)"}`,
                  color: following ? "#e53935" : "#fff",
                  fontSize: 13, padding: "7px 18px", borderRadius: 6,
                  cursor: "pointer", fontFamily: "inherit", transition: "all .15s",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                {following ? "❤️ Following" : "🤍 Follow"}
              </button>

              <button
                onClick={() => setShowTip(true)}
                style={{
                  background: "#e53935", border: "none", color: "#fff",
                  fontSize: 13, fontWeight: 700, padding: "7px 18px", borderRadius: 6,
                  cursor: "pointer", fontFamily: "inherit",
                  boxShadow: "0 2px 12px rgba(229,57,53,0.35)",
                  transition: "opacity .15s", display: "flex", alignItems: "center", gap: 6,
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = ".88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                🪙 Send Tip
              </button>

              <button style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff", fontSize: 13, padding: "7px 18px", borderRadius: 6,
                cursor: "pointer", fontFamily: "inherit", transition: "background .15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                🔔 Notify Me
              </button>
            </div>
          </div>

          {/* Tags row */}
          <div style={{
            background: "#161616", padding: "10px 20px",
            display: "flex", gap: 6, flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            {["HD","lovense","squirt","blonde","interactive","18+","new"].map(tag => (
              <span key={tag} style={{
                fontSize: 11, padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.05)", color: "var(--muted)",
                border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer",
                transition: "all .15s",
              }}>{tag}</span>
            ))}
          </div>

          {/* Token balance bar */}
          <div style={{
            background: "#0d0d0d", padding: "10px 20px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              Your tokens: <strong style={{ color: "#f0a500" }}>🪙 {tokens}</strong>
            </span>
            <button
              onClick={() => setTokens(t => t + 100)}
              style={{
                background: "#f0a500", border: "none", color: "#000",
                fontSize: 12, fontWeight: 700, padding: "5px 14px",
                borderRadius: 6, cursor: "pointer", fontFamily: "inherit",
              }}
            >
              + Get Tokens
            </button>
            <span style={{ fontSize: 11, color: "#555", marginLeft: "auto" }}>
              Goal: Naked Show 🎯 <span style={{ color: "#4caf50" }}>247 / 500 tokens</span>
            </span>
            {/* Progress bar */}
            <div style={{ width: 120, height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: "49%", height: "100%", background: "#4caf50", borderRadius: 4 }} />
            </div>
          </div>
        </div>

        {/* RIGHT — Live Chat */}
        <LiveChat username={username} onTipClick={() => setShowTip(true)} />
      </div>

      {/* Tip Modal */}
      {showTip && (
        <TipModal
          username={username}
          tokens={tokens}
          onClose={() => setShowTip(false)}
          onTip={(amount) => {
            setTokens(t => Math.max(0, t - amount));
            setShowTip(false);
          }}
        />
      )}
    </div>
  );
}