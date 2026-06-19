"use client";
import { useState, useEffect, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS  = "'Helvetica Neue', Arial, sans-serif";

// The italic C of "Curves" at 138px is ~76px wide — rect left border sits at TEXT_LEFT + C_WIDTH
const TEXT_LEFT = 60;   // px from banner left edge where "Curves" C starts
const C_WIDTH   = 76;   // px — approx rendered width of italic C at 138px Georgia
const RECT_LEFT = TEXT_LEFT + C_WIDTH; // rect left border = 136px from edge

const placeholder = (w, h, label = "PRODUCT") =>
  `https://placehold.co/${w}x${h}/f0ece6/a08060?text=${encodeURIComponent(label)}`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const bannerSlides = [
  { bg: "#8b1a1a", modelBg: "#7a1515", modelColor: "#c4a882", modelText: "#8b6a4a", sub: "New & Improved Waist Watcher", subColor: "#e8c0b8", title: "Grab yours at", offerBg: "#f5c800", offerText: "#111", offer: "Flat 25% OFF", filmBg: "#111", thumbBg: "#c4a882", thumbColor: "#8b6a4a" },
  { bg: "#1a3a4a", modelBg: "#142e3a", modelColor: "#7a9eaa", modelText: "#2a5060", sub: "New Gym Wear Collection", subColor: "#a8d0dc", title: "Train in style", offerBg: "#fff", offerText: "#1a3a4a", offer: "Up to 30% OFF", filmBg: "#0d2530", thumbBg: "#7a9eaa", thumbColor: "#2a5060" },
  { bg: "#2d1a3a", modelBg: "#24142e", modelColor: "#9e7ab0", modelText: "#4a2060", sub: "Curvey Collection", subColor: "#d4b8e8", title: "Confident Curves", offerBg: "#d4b8e8", offerText: "#2d1a3a", offer: "Buy 2 Get 1 Free", filmBg: "#1a0d25", thumbBg: "#9e7ab0", thumbColor: "#4a2060" },
  { bg: "#1a3a1a", modelBg: "#142e14", modelColor: "#7aaa7a", modelText: "#2a5a2a", sub: "Top Picks — Season Sale", subColor: "#a8dca8", title: "Best of the best", offerBg: "#a8dca8", offerText: "#1a3a1a", offer: "Flat 20% OFF", filmBg: "#0d250d", thumbBg: "#7aaa7a", thumbColor: "#2a5a2a" },
  { bg: "#3a2a1a", modelBg: "#2e2014", modelColor: "#c4a060", modelText: "#6a4a20", sub: "Panties Pack — Limited Offer", subColor: "#e8d0a8", title: "Stock up & save", offerBg: "#e8a020", offerText: "#1a0d00", offer: "Pack of 5 — Rs.3,500", filmBg: "#1a1008", thumbBg: "#c4a060", thumbColor: "#6a4a20" },
];

const curveyProducts = [
  { id: 1, name: "LEONISA Stretch Cotton Posture Correcter Wireless Bra - Black", price: "Rs.6,500.00", badge: "New" },
  { id: 2, name: "Losha Curvy Lightly Padded Strapless Wired Bra - BLACK", price: "Rs.17,500.00", badge: "Buy 2 Get 1 Free" },
  { id: 3, name: "Leonisa Unlined Wireless Posture Corrector Bra - SKIN", price: "Rs.6,500.00", badge: "New" },
  { id: 4, name: "Losha Curvy Lightly Padded Strapless Wired Bra - SKIN", price: "Rs.6,500.00", badge: "Buy 2 Get 1 Free" },
  { id: 5, name: "Losha Curvy All Over Lace Cup Double Layered Wired Bra", price: "Rs.5,400.00", badge: "Buy 2 Get 1 Free" },
];

const gymWearProducts = [
  { id: 1, name: "PREMIUM QUALITY FRONT CLOSURE PADDED HIGH IMPACT SPORTS BRA WITH ADJUSTABLE WAIST BAND-RUST", price: "Rs.8,900.00", badge: "Restocked" },
  { id: 2, name: "HIGH IMPACT ZIP-FRONT SPORTS BRA - BLACK", price: "Rs.8,900.00", badge: "" },
  { id: 3, name: "CROSSBACK COMPRESSION SPORTS BRA - GREEN", price: "Rs.7,500.00", badge: "" },
];

const topPicks = [
  { id: 1, name: "LOSHA COTTON DOUBLE LAYERED MID HIGH PANEL NON WIRED PRINTED BRA - CANDY FLORAL PRINT", price: "Rs.3,200.00", badge: "Buy 2 Get 1 Free" },
  { id: 2, name: "SUPPER SOFT SIDE SUPPORT COTTON BRA WITH HIDDEN NIPPLE COVER - BLACK", price: "Rs.2,890.00", badge: "" },
  { id: 3, name: "COTTON DOUBLE LAYERED NON WIRED PRINTED BRA - BABY ROSE PRINT", price: "Rs.3,200.00", badge: "Buy 2 Get 1 Free" },
  { id: 4, name: "COTTON DOUBLE LAYERED NON WIRED PRINTED BRA - SALMON", price: "Rs.3,200.00", badge: "Buy 2 Get 1 Free" },
];

const pantiesPack = [
  { id: 1, name: "PACK OF 5 SUPER SOFT COTTON STRETCH PRINTED BIKINI BRIEFS - POLKA DOTS", price: "Rs.3,500.00", badge: "" },
  { id: 2, name: "PACK OF 5 SUPER SOFT COTTON STRETCH PRINTED BIKINI BRIEFS - RED HEARTS", price: "Rs.3,500.00", badge: "" },
  { id: 3, name: "PACK OF 5 SUPER SOFT COTTON STRETCH PRINTED BIKINI BRIEFS - GREEN ARMY", price: "Rs.3,500.00", badge: "Buy 2 Get 1 Free" },
  { id: 4, name: "PACK OF 5 SUPER SOFT COTTON STRETCH PRINTED BIKINI BRIEFS - FOOTBALL", price: "Rs.3,500.00", badge: "" },
];

const bras = [
  { id: 1, name: "PREMIUM QUALITY FRONT CLOSURE PADDED HIGH IMPACT SPORTS BRA - Olive", price: "Rs.8,900.00", badge: "New" },
  { id: 2, name: "LOSHA WIRED LACE BRA - BRN", price: "Rs.5,100.00", badge: "New" },
  { id: 3, name: "LOSHA WAIST SHAPING BRA - BRN", price: "Rs.6,000.00", badge: "New" },
  { id: 4, name: "LOSHA FRONT CLOSURE BRA - BRN", price: "Rs.5,500.00", badge: "New" },
  { id: 5, name: "LOSHA GIRL PACK OF 3 NON WIRED LIGHTLY PADDED BRAS - LBLUE/WHITE/LAVENDER", price: "Rs.4,950.00", badge: "New" },
  { id: 6, name: "LOSHA TEENS PACK OF 4 SEAMLESS TRAINING BRAS - BPINK/WHITE/MINT/GREY", price: "Rs.4,400.00", badge: "New" },
  { id: 7, name: "LOSHA GIRL PACK OF 3 WIRED LIGHTLY PADDED BRAS - VPINK/SKIN/BPINK/WHITE", price: "Rs.4,950.00", badge: "New" },
  { id: 8, name: "LOSHA TEENS PACK OF 4 SEAMLESS TRAINING BRAS - VPINK/SKIN/WHITE/BPINK", price: "Rs.4,400.00", badge: "New" },
];

// ─── Shared Components ────────────────────────────────────────────────────────

function Badge({ text }) {
  if (!text) return null;
  return (
    <span style={{
      position: "absolute", top: 0, left: 0, zIndex: 2,
      background: "#111", color: "#fff",
      fontSize: 10, fontWeight: 700, padding: "4px 8px", letterSpacing: "0.05em",
    }}>
      {text}
    </span>
  );
}

function ProductCard({ product, imgHeight = 240 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", minWidth: 200, maxWidth: 200 }}
    >
      <div style={{ position: "relative", overflow: "hidden", background: "#f5f0eb" }}>
        <Badge text={product.badge} />
        <img
          src={placeholder(200, imgHeight)}
          alt={product.name}
          style={{
            width: "100%", height: imgHeight, objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.35s ease",
          }}
        />
      </div>
      <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", margin: "8px 0 4px", lineHeight: 1.4, color: "#111" }}>
        {product.name}
      </p>
      <p style={{ fontSize: 12, color: "#444" }}>{product.price}</p>
    </div>
  );
}

function HScroll({ children }) {
  return (
    <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "thin", scrollbarColor: "#ccc #f0f0f0" }}>
      {children}
    </div>
  );
}

function SectionHeader({ title, showViewAll }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
      <h2 style={{ fontSize: 22, fontWeight: 400, color: "#111", margin: 0, fontFamily: SANS }}>{title}</h2>
      {showViewAll && (
        <button style={{ border: "1px solid #111", background: "transparent", padding: "6px 18px", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", color: "#111", fontFamily: SANS }}>
          VIEW ALL
        </button>
      )}
    </div>
  );
}

// ─── Hero Banner Carousel ─────────────────────────────────────────────────────

function HeroBannerCarousel() {
  const [cur, setCur] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => setCur(c => (c + 1) % bannerSlides.length), 7000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const navigate = (n) => {
    clearInterval(timerRef.current);
    setCur((n + bannerSlides.length) % bannerSlides.length);
    startTimer();
  };

  const s = bannerSlides[cur];

  return (
    <div style={{ position: "relative", width: "100%", height: 700, background: s.bg, display: "flex", overflow: "hidden", transition: "background 0.5s ease" }}>

      {/* Model column */}
      <div style={{ flex: "0 0 260px", background: s.modelBg, display: "flex", alignItems: "flex-end", justifyContent: "center", transition: "background 0.5s ease" }}>
        <div style={{ width: 230, height: 520, background: s.modelColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: s.modelText, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: SANS }}>
          Model
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 64px", gap: 14 }}>
        <p style={{ color: s.subColor, fontSize: 16, fontFamily: SERIF, letterSpacing: "0.05em", margin: 0 }}>{s.sub}</p>
        <p style={{ color: "#fff", fontSize: 52, fontFamily: SERIF, fontWeight: 400, lineHeight: 1.1, margin: 0 }}>{s.title}</p>
        <div style={{ background: s.offerBg, padding: "14px 32px", width: "fit-content" }}>
          <span style={{ fontSize: 44, fontWeight: 900, color: s.offerText, letterSpacing: "-0.02em", fontFamily: SANS }}>{s.offer}</span>
        </div>
        <div style={{ display: "inline-flex", background: s.filmBg, padding: 8, gap: 6, width: "fit-content" }}>
          {[0, 1].map(i => (
            <div key={i} style={{ width: 100, height: 80, background: s.thumbBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: s.thumbColor, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: SANS }}>
              Product
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      {[{ id: "prev", label: "‹", target: cur - 1, side: "left" }, { id: "next", label: "›", target: cur + 1, side: "right" }].map(({ id, label, target, side }) => (
        <button key={id} onClick={() => navigate(target)} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", [side]: 12, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.35)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", zIndex: 10 }}>
          {label}
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
        {bannerSlides.map((_, i) => (
          <button key={i} onClick={() => navigate(i)} style={{ width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", background: i === cur ? "#fff" : "rgba(255,255,255,0.45)", transition: "background 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

// ─── Confident Curves Banner ──────────────────────────────────────────────────
//
// Layout (all positions are px, measured from banner edges):
//
//  TEXT_LEFT (60px) ← "C" starts here
//  RECT_LEFT (136px) ← rect left border — "C" breaks through, "urves" + "Confident" stay right of it
//  Model image fills right 52%, covering the rect's right border naturally
//
//  Rectangle is drawn as 4 separate lines so the left side can be split
//  (gap where text crosses through it).

function ConfidentCurvesBanner() {
  const BANNER_H   = 600;
  const RECT_TOP   = 30;
  const RECT_BOTTOM = 30;
  const LINE_COLOR = "#1a1a1a";
  const LINE_W     = 1.5;

  // The text block vertically spans roughly 35%–68% of the banner height
  // Left border is split: top segment ends at 35%, bottom segment starts at 68%
  const LEFT_GAP_START = "35%";
  const LEFT_GAP_END   = "68%";

  const lineStyle = (overrides) => ({
    position: "absolute",
    background: LINE_COLOR,
    pointerEvents: "none",
    ...overrides,
  });

  return (
    <div style={{ position: "relative", width: "100%", height: BANNER_H, background: "#faf8f5", overflow: "hidden", margin: "12px 0 24px" }}>

      {/* Organic blob background */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
        <path d="M100,100 C250,-20 620,30 780,190 C940,350 1080,110 1240,195 C1400,280 1390,490 1210,545 C1030,600 700,575 490,510 C280,445 -50,450 100,100Z" fill="#e8ddd0" opacity="0.5" />
      </svg>

      {/* ── Rectangle border (4 separate lines) ── */}

      {/* Top horizontal */}
      <div style={lineStyle({ top: RECT_TOP, left: RECT_LEFT, right: "48%", height: LINE_W })} />

      {/* Bottom horizontal */}
      <div style={lineStyle({ bottom: RECT_BOTTOM, left: RECT_LEFT, right: "48%", height: LINE_W })} />

      {/* Left vertical — top segment (above text gap) */}
      <div style={lineStyle({ top: RECT_TOP, left: RECT_LEFT, width: LINE_W, height: LEFT_GAP_START })} />

      {/* Left vertical — bottom segment (below text gap) */}
      <div style={lineStyle({ top: LEFT_GAP_END, left: RECT_LEFT, width: LINE_W, bottom: RECT_BOTTOM })} />

      {/* Right vertical — sits behind model image (zIndex: 0), covered naturally */}
      <div style={lineStyle({ top: RECT_TOP, right: "48%", width: LINE_W, bottom: RECT_BOTTOM, zIndex: 0 })} />

      {/* ── Typography ── */}
      {/*
        "Curves" starts at TEXT_LEFT (60px).
        "Confident" is offset right by C_WIDTH (76px) so it aligns with the "u".
        Both sit at zIndex 3 so they paint over the left border line.
      */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: TEXT_LEFT,
        transform: "translateY(-50%)",
        lineHeight: 1,
        zIndex: 3,
      }}>
        <div style={{ fontFamily: SERIF, fontSize: 50, fontWeight: 400, letterSpacing: "0.18em", color: "#111", paddingLeft: C_WIDTH, marginBottom: 0 }}>
          Confident
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 138, fontStyle: "italic", fontWeight: 700, color: "#111", lineHeight: 0.95 }}>
          Curves
        </div>
      </div>

      {/* ── Model placeholder — right 52%, covers rect's right border ── */}
      {/* 
        TO USE THE REAL IMAGE:
        1. Right-click the model image on losha.pk and "Save image as"
        2. Upload it to your project's /public folder as "curvy-model.jpg"
        3. Replace the src below with "/curvy-model.jpg"
      */}
      <img
        src="https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg?auto=compress&cs=tinysrgb&w=700&h=600&fit=crop"
        alt="Model"
        style={{
          position: "absolute", top: 0, right: 0,
          width: "52%", height: "100%",
          objectFit: "cover", objectPosition: "top center",
          display: "block", zIndex: 1,
        }}
      />

      {/* ── SHOP NOW ── */}
      <button
        style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          zIndex: 4, background: "#111", color: "#fff", border: "none",
          padding: "13px 52px", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.2em", cursor: "pointer", fontFamily: SANS,
        }}
      >
        SHOP NOW
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const section = { padding: "32px 40px" };

export default function ShopPage() {
  return (
    <div style={{ fontFamily: SANS, background: "#fff", color: "#111" }}>

      <HeroBannerCarousel />

      <div style={{ padding: "28px 40px 0" }}>
        <p style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>Curvey Collection</p>
      </div>

      <ConfidentCurvesBanner />

      <div style={{ padding: "0 40px 36px" }}>
        <HScroll>{curveyProducts.map(p => <ProductCard key={p.id} product={p} />)}</HScroll>
      </div>

      {/* Gym Wear */}
      <div style={{ ...section, background: "#fafafa" }}>
        <SectionHeader title="Gym Wear" />
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 360px", position: "relative", background: "#2a2a2a", height: 320, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <p style={{ color: "#fff", fontSize: 28, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center", opacity: 0.9, margin: 0, fontFamily: SANS }}>
              GYM<br />WEAR
            </p>
            {[[58, 38], [38, 54], [72, 64], [52, 72]].map(([l, t], i) => (
              <button key={i} style={{ position: "absolute", top: `${t}%`, left: `${l}%`, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.8)", border: "none", cursor: "pointer", color: "#fff", fontSize: 14 }}>🛍</button>
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            {gymWearProducts.map(p => (
              <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ position: "relative", flex: "0 0 100px" }}>
                  <Badge text={p.badge} />
                  <img src={placeholder(100, 120)} alt={p.name} style={{ width: 100, height: 120, objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ paddingTop: p.badge ? 20 : 0 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", lineHeight: 1.4, margin: "0 0 4px" }}>{p.name}</p>
                  <p style={{ fontSize: 12, color: "#444", margin: 0 }}>{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Picks */}
      <div style={section}>
        <SectionHeader title="Top Picks" showViewAll />
        <HScroll>{topPicks.map(p => <ProductCard key={p.id} product={p} />)}</HScroll>
      </div>

      {/* Panties Pack */}
      <div style={{ ...section, background: "#fafafa" }}>
        <SectionHeader title="Panties Pack" showViewAll />
        <HScroll>{pantiesPack.map(p => <ProductCard key={p.id} product={p} />)}</HScroll>
      </div>

      {/* Bras Grid */}
      <div style={section}>
        <SectionHeader title="Bras" showViewAll />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {bras.map(p => (
            <div key={p.id} style={{ cursor: "pointer" }}>
              <div style={{ position: "relative", background: "#f5f0eb" }}>
                <Badge text={p.badge} />
                <img src={placeholder(200, 220)} alt={p.name} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
              </div>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", margin: "8px 0 4px", lineHeight: 1.4 }}>{p.name}</p>
              <p style={{ fontSize: 12, color: "#444", margin: 0 }}>{p.price}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button style={{ background: "#111", color: "#fff", border: "none", padding: "14px 48px", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", cursor: "pointer", fontFamily: SANS }}>
            VIEW ALL
          </button>
        </div>
      </div>

    </div>
  );
}