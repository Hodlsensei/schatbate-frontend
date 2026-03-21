"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const NAMES = [
  "Scarlettxx21","C1eopatra","hottiebaeboo","sexyBellaXXXa","AngieKapangie",
  "Cocoa-Honey12","TemptedAngel","Curvy_Takatso","Sexyzmiranda_207","-Miss-K",
  "DarkBerry_xxx","Random_cummer","GrippingCoochie","WaywardLady","AuroraBliss",
  "KiraWild","MiaNova","SofiaFire","LunaRaven","ZoeHot","NatashaXX","AlexDream",
  "CherryBabe","VioletXXX","DanteHot","TigerQueen","MeiLing","ScarletVR",
  "IvyRose","BubbleAngel","DarkDivva18","xxJuicyLipsx01","HottestEbonyBitch",
];
const COLORS = ["#1a0a2e","#0a1a2e","#2e0a1a","#0a2e0a","#2e1a0a","#0a0a2e","#2e0a2e","#0a2e2e"];
const EMOJIS = ["😍","🔥","💃","✨","👑","💋","🌹","⚡","🎭","💫","🦋","🌸"];
const FLAGS  = ["🇿🇦","🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧","🇲🇽","🇳🇬"];

let globalIdx = 0;
function makeItem() {
  const idx = globalIdx++;
  return {
    id: idx,
    name:  NAMES [idx % NAMES.length],
    color: COLORS[idx % COLORS.length],
    emoji: EMOJIS[idx % EMOJIS.length],
    flag:  FLAGS [idx % FLAGS.length],
    isNew: Math.random() < 0.3,
    hd:    Math.random() > 0.4,
  };
}

export default function InfiniteGrid() {
  const [items, setItems]     = useState(() => Array.from({ length: 15 }, makeItem));
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setItems(prev => [...prev, ...Array.from({ length: 15 }, makeItem)]);
      setLoading(false);
    }, 600);
  }, [loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: "200px" }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
        gap: 4, padding: "0 16px",
      }}>
        {items.map((item, i) => (
          <InfCard key={item.id} item={item} delay={i < 15 ? i * 0.03 : 0} />
        ))}
      </div>

      {/* Sentinel */}
      <div ref={sentinelRef} style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--muted)", fontSize: 13 }}>
        {loading && (
          <>
            <div style={{
              width: 16, height: 16,
              border: "2px solid var(--border)", borderTopColor: "var(--red2)",
              borderRadius: "50%", animation: "spin .7s linear infinite",
            }} />
            Loading more...
          </>
        )}
      </div>
    </>
  );
}

function InfCard({ item, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 6, overflow: "hidden", position: "relative",
        cursor: "pointer", background: "#222", aspectRatio: "3/2",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered ? "0 6px 24px rgba(0,0,0,.5)" : "none",
        transition: "transform .2s, box-shadow .2s",
        zIndex: hovered ? 10 : 1,
        animation: `fadeUp .3s ${delay}s both`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div style={{
        width: "100%", height: "100%",
        background: `radial-gradient(ellipse at 60% 40%, ${item.color}cc, #111 80%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 30,
        transform: hovered ? "scale(1.06)" : "scale(1)",
        transition: "transform .3s",
      }}>{item.emoji}</div>

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 55%)", pointerEvents: "none" }} />

      {item.isNew && (
        <div style={{ position: "absolute", top: 6, right: 6, background: "#f0a500", color: "#000", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 3 }}>NEW</div>
      )}
      {item.hd && (
        <div style={{ position: "absolute", top: 6, left: 6, background: "rgba(0,0,0,.55)", color: "rgba(255,255,255,.7)", fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 3 }}>HD</div>
      )}

      <div style={{ position: "absolute", bottom: 6, left: 8, right: 24, fontSize: 11, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {item.name}
      </div>
      <div style={{ position: "absolute", bottom: 6, right: 8, fontSize: 12 }}>{item.flag}</div>
    </div>
  );
}