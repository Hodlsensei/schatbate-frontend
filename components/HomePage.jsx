"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import StreamRow from "./StreamRow";
import StreamCard from "./StreamCard";

// ─── Infinite 2-column grid (Featured Live Sex Shows only) ──────────────────
function FeaturedGrid({ category }) {
  const [items, setItems] = useState([]);
  const [page, setPage]   = useState(0);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res  = await fetch(
        `http://localhost:4000/api/streams?category=${category}&limit=20&offset=${page * 20}`
      );
      const data = await res.json();
      const fetched = data.streams || [];

      // If API returns fewer than 20, generate extras so grid never runs out
      const extras = Array.from({ length: Math.max(0, 20 - fetched.length) }, (_, i) => ({
        id: 9000 + page * 20 + i,
        username: `Model_${page * 20 + fetched.length + i + 1}`,
        viewers: Math.floor(Math.random() * 20000) + 300,
        hd: Math.random() > 0.4,
        isNew: Math.random() < 0.15,
        region: ["🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦","🇷🇴","🇩🇪","🇬🇧"][Math.floor(Math.random()*8)],
      }));

      setItems(prev => [...prev, ...fetched, ...extras]);
      setPage(prev => prev + 1);
    } catch {
      // fallback: generate 20 dummy cards
      const dummy = Array.from({ length: 20 }, (_, i) => ({
        id: 9000 + page * 20 + i,
        username: `Model_${page * 20 + i + 1}`,
        viewers: Math.floor(Math.random() * 20000) + 300,
        hd: Math.random() > 0.4,
        isNew: Math.random() < 0.15,
        region: ["🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦"][Math.floor(Math.random()*5)],
      }));
      setItems(prev => [...prev, ...dummy]);
      setPage(prev => prev + 1);
    }
    setLoading(false);
  }, [loading, page, category]);

  // Initial load
  useEffect(() => { loadMore(); }, []); // eslint-disable-line

  // Intersection observer — load more when sentinel comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: "300px" }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div style={{ padding: "0 16px" }}>
      {/* 6-column infinite grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 4,
      }}>
        {items.map((streamer, i) => (
          <StreamCard key={`${streamer.id}-${i}`} streamer={streamer} index={i} gridMode={true} />
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={loaderRef} style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16 }}>
        {loading && (
          <div style={{ display: "flex", gap: 6 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%", background: "var(--red2)",
                animation: `pulseDot 1s ${i * 0.2}s infinite`,
              }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── HomePage ────────────────────────────────────────────────────────────────
export default function HomePage({ defaultCategory = "girls" }) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [liveCount, setLiveCount]           = useState(11162);
  const [showPromo, setShowPromo]           = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setLiveCount(v => Math.max(10000, v + Math.floor(Math.random() * 10) - 4));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Topbar liveCount={liveCount} />

      {/* Gender tabs */}
      <div style={{
        position: "fixed", top: 50, left: 0, right: 0, zIndex: 999,
        background: "#fff", borderBottom: "2px solid var(--border)",
        display: "flex", alignItems: "center", paddingLeft: 220, height: 40,
      }}>
        {["girls","couples","guys","trans"].map(tab => (
          <div key={tab} onClick={() => setActiveCategory(tab)} style={{
            padding: "0 20px", height: "100%", display: "flex", alignItems: "center",
            fontSize: 14, fontWeight: 500, cursor: "pointer",
            color: activeCategory === tab ? "var(--text)" : "var(--muted)",
            borderBottom: activeCategory === tab ? "2px solid var(--red2)" : "2px solid transparent",
            marginBottom: -2, textTransform: "capitalize",
            transition: "color .15s",
          }}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", paddingTop: 90 }}>
        <Sidebar />

        <main style={{ marginLeft: 220, flex: 1, minWidth: 0, padding: "0 0 80px" }}>

          {/* Promo banner */}
          {showPromo && (
            <div style={{
              margin: "16px 16px 20px",
              background: "linear-gradient(135deg,#7b1010,#a00,#7b1010)",
              borderRadius: 10, padding: "14px 18px",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span style={{ fontSize: 26 }}>🎁</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Special for You</div>
                <div style={{ fontSize: 12, color: "#ffcdd2" }}>
                  Get tokens now with <span style={{ color: "#ffeb3b", fontWeight: 700 }}>25% OFF!</span>
                </div>
              </div>
              <button style={{
                background: "#f5a623", border: "none", color: "#000",
                fontSize: 12, fontWeight: 700, padding: "8px 16px",
                borderRadius: 6, cursor: "pointer", fontFamily: "inherit",
              }}>GET TOKENS</button>
              <button onClick={() => setShowPromo(false)} style={{
                background: "none", border: "none", color: "rgba(255,255,255,0.5)",
                fontSize: 18, cursor: "pointer", padding: 4,
              }}>✕</button>
            </div>
          )}

          {/* Horizontal scroll rows — NO infinite scroll */}
          <StreamRow title="Today's Recommendations for You" category={activeCategory} />
          <StreamRow title="African"                          category={activeCategory} />
          <StreamRow title="Top Free Live Sex Cams"           category={activeCategory} />
          <StreamRow title="Couples Live Sex Cams"            category="couples" />
          <StreamRow title="Mobile Live Sex Cams"             category={activeCategory} mobile />
          <StreamRow title="New &amp; Trending"               category={activeCategory} trending />
          <StreamRow title="VR Cams"                          category={activeCategory} vr />

          {/* ── Featured Live Sex Shows — 2-col infinite grid ── */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 16px", marginBottom: 12,
            }}>
              <span style={{ fontSize: 17, fontWeight: 600 }}>Featured Live Sex Shows</span>
              <span style={{ fontSize: 12, color: "var(--muted)", cursor: "pointer" }}>See All</span>
            </div>
            <FeaturedGrid category={activeCategory} />
          </div>

        </main>
      </div>

      {/* Bottom join banner */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 500,
        background: "var(--red2)", padding: "10px 20px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
      }}>
        <span style={{ fontSize: 20 }}>💬</span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Join Stripchatbate to interact with models!</span>
        <button style={{
          background: "#fff", color: "#c0392b", fontSize: 13, fontWeight: 700,
          padding: "7px 20px", borderRadius: 20, border: "none", cursor: "pointer",
          fontFamily: "inherit",
        }}>Join FREE</button>
      </div>
    </div>
  );
}