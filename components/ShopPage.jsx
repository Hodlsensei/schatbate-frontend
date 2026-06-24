"use client";
import { useState, useEffect, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS  = "'Helvetica Neue', Arial, sans-serif";

const TEXT_LEFT = 60;
const C_WIDTH   = 76;
const RECT_LEFT = TEXT_LEFT + C_WIDTH;

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
  { id: 1, name: "PREMIUM QUALITY FRONT CLOSURE PADDED HIGH IMPACT SPORTS BRA WITH ADJUSTABLE WAIST BAND-Olive", price: "Rs.8,900.00", badge: "New" },
  { id: 2, name: "LOSHA WIRED LACE BRA - BRN", price: "Rs.5,100.00", badge: "New" },
  { id: 3, name: "LOSHA WAIST SHAPING BRA - BRN", price: "Rs.6,000.00", badge: "New" },
  { id: 4, name: "LOSHA FRONT CLOSURE BRA - BRN", price: "Rs.5,500.00", badge: "New" },
  { id: 5, name: "LOSHA GIRL PACK OF 3 NON WIRED LIGHTLY PADDED BRAS - LBLUE/WHITE/LAVENDER", price: "Rs.4,950.00", badge: "New" },
  { id: 6, name: "LOSHA TEENS PACK OF 4 SEAMLESS TRAINING BRAS - BPINK/WHITE/MINT/GREY", price: "Rs.4,400.00", badge: "New" },
  { id: 7, name: "LOSHA GIRL PACK OF 3 WIRED LIGHTLY PADDED BRAS - VPINK/SKIN/BPINK/WHITE", price: "Rs.4,950.00", badge: "New" },
  { id: 8, name: "LOSHA TEENS PACK OF 4 SEAMLESS TRAINING BRAS - VPINK/SKIN/WHITE/BPINK", price: "Rs.4,400.00", badge: "New" },
];

// ─── Nav dropdown data ─────────────────────────────────────────────────────────

const BANNER_SLIDES = [
  "FREE SHIPPING ON ALL ORDERS above $10",
  "BUY 2 GET 3RD FREE on selected items",
  "NEW ARRIVALS — Shop the latest collection now",
];

const NAV_ITEMS = [
  { label: "Offers ✳", dropdown: ["Clearance", "Buy 2 Get 3rd Free"] },
  { label: "New Arrivals", dropdown: ["Bras", "Panties", "Nails", "Maternity"] },
  { label: "Shop", dropdown: [] },
  { label: "Accessories", dropdown: ["Nails", "Menstrual Cups", "Nipple Covers", "Rabbit Bras", "Bra Storage", "Breast Tapes"] },
  { label: "By Type", dropdown: ["Plus Sizes", "Push-Up", "Double Layered Cups", "Sports Bras", "Front Open Bras", "Nursing Bras", "Bra Sets", "Wired Bras", "Wirefree Bras", "Wired Non-Padded", "Bralettes"] },
  { label: "Maternity", dropdown: ["Nursing Bra", "Nursing Pad", "Nursing Shirt"] },
  { label: "E-Gift Card", dropdown: [] },
];

// ─── Shop Header ──────────────────────────────────────────────────────────────

function ShopHeader() {
  const [openMenu, setOpenMenu] = useState(null);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setBannerIdx(i => (i + 1) % BANNER_SLIDES.length);
        setFade(true);
      }, 400);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handle = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={headerRef} style={{ fontFamily: SANS, background: "#fff", position: "relative", zIndex: 100 }}>

      {/* Sliding top banner */}
      <div style={{ background: "#f2b8c6", textAlign: "center", padding: "11px 16px", fontSize: 13, letterSpacing: "0.08em", color: "#111", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, minHeight: 40 }}>
        <button onClick={() => setBannerIdx(i => (i - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#111", padding: 0 }}>‹</button>
        <div style={{ opacity: fade ? 1 : 0, transition: "opacity 0.4s ease", minWidth: 360, textAlign: "center", fontWeight: 500 }}>
          {BANNER_SLIDES[bannerIdx]}
        </div>
        <button onClick={() => setBannerIdx(i => (i + 1) % BANNER_SLIDES.length)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#111", padding: 0 }}>›</button>
      </div>

      {/* Social icons row */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "6px 40px", gap: 14, borderBottom: "1px solid #eee" }}>
        {[
          { name: "instagram", svg: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="#111" stroke="none"/></svg> },
          { name: "facebook", svg: <svg width={18} height={18} viewBox="0 0 24 24" fill="#111"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
          { name: "youtube", svg: <svg width={18} height={18} viewBox="0 0 24 24" fill="#111"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg> },
          { name: "snapchat", svg: <svg width={18} height={18} viewBox="0 0 24 24" fill="#111"><path d="M12 2C8.5 2 6 4.5 6 8v1.5c-.5.2-1.5.5-2 1 0 .5.2 1 .5 1.3-.3.8-1 2.2-2.5 2.7 0 .5.3 1 1 1.2.3.1.6.1.8.2.2.4.1.9.5 1.1.5.2 1.2-.1 2-.1.6 0 1.3.3 2.2.8.5.3 1 .5 2 .5s1.5-.2 2-.5c.9-.5 1.6-.8 2.2-.8.8 0 1.5.3 2 .1.4-.2.3-.7.5-1.1.2-.1.5-.1.8-.2.7-.2 1-.7 1-1.2-1.5-.5-2.2-1.9-2.5-2.7.3-.3.5-.8.5-1.3-.5-.5-1.5-.8-2-1V8c0-3.5-2.5-6-6-6z"/></svg> },
        ].map(({ name, svg }) => (
          <span key={name} style={{ cursor: "pointer", display: "flex", alignItems: "center", opacity: 0.8 }}>{svg}</span>
        ))}
      </div>

      {/* Main nav — no logo, centered links */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", borderBottom: "1px solid #eee" }}>

        {/* Nav links centered */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 36, flex: 1 }}>
          {NAV_ITEMS.map((item, i) => {
            const hasDropdown = item.dropdown.length > 0;
            const isOpen = openMenu === i;
            return (
              <div key={item.label} style={{ position: "relative" }}
                onMouseEnter={() => hasDropdown && setOpenMenu(i)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <span style={{
                  fontSize: 15, cursor: "pointer",
                  color: isOpen ? "#FCA311" : "#111",
                  letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 4,
                  whiteSpace: "nowrap", transition: "color 0.2s", fontFamily: SANS, fontWeight: 500,
                  borderBottom: isOpen ? "2px solid #111" : "2px solid transparent", paddingBottom: 2,
                }}>
                  {item.label}
                  {hasDropdown && (
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  )}
                </span>
                {hasDropdown && isOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 12px)", left: 0,
                    background: "#fff", border: "1px solid #eee", borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)", minWidth: 210, zIndex: 200, padding: "8px 0",
                  }}>
                    {item.dropdown.map((subItem) => (
                      <div key={subItem}
                        style={{ padding: "11px 22px", fontSize: 14, color: "#111", cursor: "pointer", fontFamily: SANS, transition: "color 0.15s", whiteSpace: "nowrap" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#FCA311"}
                        onMouseLeave={e => e.currentTarget.style.color = "#111"}
                      >{subItem}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Shared Components ────────────────────────────────────────────────────────

function Badge({ text, corner = "left" }) {
  if (!text) return null;
  return (
    <span style={{
      position: "absolute", top: 12, [corner === "right" ? "right" : "left"]: 12, zIndex: 2,
      background: "#111", color: "#fff",
      fontSize: 11, fontWeight: 600, padding: "5px 10px", letterSpacing: "0.02em",
      borderRadius: 2,
    }}>
      {text}
    </span>
  );
}

function GridCard({ product, imgHeight = 360 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", width: "100%" }}
    >
      <div style={{ position: "relative", overflow: "hidden", background: "#f5f0eb" }}>
        <Badge text={product.badge} corner="right" />
        <img
          src="/images/images.jpg"
          alt={product.name}
          style={{
            width: "100%", height: imgHeight, objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.35s ease",
          }}
        />
      </div>
      <p style={{ fontSize: 12, fontWeight: 400, textTransform: "uppercase", margin: "12px 0 6px", lineHeight: 1.45, color: "#111", letterSpacing: "0.01em" }}>
        {product.name}
      </p>
      <p style={{ fontSize: 13, color: "#1a1aee", margin: 0 }}>{product.price}</p>
    </div>
  );
}

function ProductCard({ product, imgHeight = 240 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", minWidth: 240, maxWidth: 240 }}
    >
      <div style={{ position: "relative", overflow: "hidden", background: "#f5f0eb", borderRadius: 2 }}>
        <Badge text={product.badge} corner="right" />
        <img
          src="/images/images.jpg"
          alt={product.name}
          style={{
            width: "100%", height: imgHeight, objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.35s ease",
          }}
        />
      </div>
      <p style={{ fontSize: 13, fontWeight: 400, margin: "12px 0 6px", lineHeight: 1.4, color: "#111" }}>
        {product.name}
      </p>
      <p style={{ fontSize: 13, color: "#1a1aee", margin: 0 }}>{product.price}</p>
    </div>
  );
}

function HScroll({ children }) {
  return (
    <div style={{ display: "flex", gap: 24, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "thin", scrollbarColor: "#ccc #f0f0f0" }}>
      {children}
    </div>
  );
}

function SectionHeader({ title, showViewAll, align = "left", font = SANS, fontSize = 22 }) {
  return (
    <div style={{ display: "flex", justifyContent: align === "center" ? "center" : "space-between", alignItems: "center", marginBottom: 20 }}>
      <h2 style={{ fontSize, fontWeight: 400, color: "#111", margin: 0, fontFamily: font, textAlign: align }}>{title}</h2>
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
      <div style={{ flex: "0 0 260px", background: s.modelBg, display: "flex", alignItems: "flex-end", justifyContent: "center", transition: "background 0.5s ease" }}>
        <div style={{ width: 230, height: 520, background: s.modelColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: s.modelText, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: SANS }}>
          Model
        </div>
      </div>
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
      {[{ id: "prev", label: "‹", target: cur - 1, side: "left" }, { id: "next", label: "›", target: cur + 1, side: "right" }].map(({ id, label, target, side }) => (
        <button key={id} onClick={() => navigate(target)} style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", [side]: 12, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.35)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", zIndex: 10 }}>
          {label}
        </button>
      ))}
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
        {bannerSlides.map((_, i) => (
          <button key={i} onClick={() => navigate(i)} style={{ width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", background: i === cur ? "#fff" : "rgba(255,255,255,0.45)", transition: "background 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

// ─── Confident Curves Banner ──────────────────────────────────────────────────

function ConfidentCurvesBanner() {
  const BANNER_H    = 600;
  const RECT_TOP    = 30;
  const RECT_BOTTOM = 30;
  const LINE_COLOR  = "#1a1a1a";
  const LINE_W      = 1.5;

  const bannerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const lineStyle = (overrides) => ({
    position: "absolute",
    background: LINE_COLOR,
    pointerEvents: "none",
    zIndex: 2,
    ...overrides,
  });

  return (
    <div ref={bannerRef} style={{ width: "100%", overflow: "hidden", margin: "12px 0 24px" }}>
      <div style={{
        position: "relative", width: "100%", height: BANNER_H, background: "#faf8f5",
        overflow: "hidden",
        transform: visible ? "translateX(0)" : "translateX(100%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease",
      }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
          <path d="M100,100 C250,-20 620,30 780,190 C940,350 1080,110 1240,195 C1400,280 1390,490 1210,545 C1030,600 700,575 490,510 C280,445 -50,450 100,100Z" fill="#e8ddd0" opacity="0.5" />
        </svg>
        <div style={lineStyle({ top: RECT_TOP, left: RECT_LEFT, right: "48%", height: LINE_W })} />
        <div style={lineStyle({ bottom: RECT_BOTTOM, left: RECT_LEFT, right: "48%", height: LINE_W })} />
        <div style={lineStyle({ top: RECT_TOP, left: RECT_LEFT, width: LINE_W, bottom: RECT_BOTTOM })} />
        <div style={{ position: "absolute", top: "50%", left: TEXT_LEFT, transform: "translateY(-50%)", lineHeight: 1, zIndex: 3 }}>
          <div style={{ fontFamily: SERIF, fontSize: 50, fontWeight: 400, letterSpacing: "0.18em", color: "#111", paddingLeft: C_WIDTH, marginBottom: 0, background: "#faf8f5" }}>
            Confident
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 138, fontStyle: "italic", fontWeight: 700, color: "#111", lineHeight: 0.95, background: "#faf8f5" }}>
            Curves
          </div>
        </div>
        <img src="/images/images.jpg" alt="Model" style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", zIndex: 1 }} />
        <button style={{
          position: "absolute",
          bottom: RECT_BOTTOM - 21,
          left: `calc(${RECT_LEFT}px + (100% - 48% - ${RECT_LEFT}px) / 2)`,
          transform: "translateX(-50%)",
          zIndex: 4,
          background: "#111", color: "#fff", border: "none",
          padding: "13px 52px", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.2em", cursor: "pointer", fontFamily: SANS,
          whiteSpace: "nowrap",
        }}>
          SHOP NOW
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const section = { padding: "32px 40px" };

export default function ShopPage() {
  return (
    <div style={{ fontFamily: SANS, background: "#fff", color: "#111" }}>

      <ShopHeader />

      <HeroBannerCarousel />

      <div style={{ padding: "48px 40px 32px" }}>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontStyle: "normal", fontWeight: 400, fontSize: 43, lineHeight: "43px", color: "rgb(0, 0, 0)", margin: 0 }}>Curvey Collection</h2>
      </div>

      <ConfidentCurvesBanner />

      <div style={{ padding: "0 40px 48px" }}>
        <HScroll>{curveyProducts.map(p => <ProductCard key={p.id} product={p} />)}</HScroll>
      </div>

      {/* Gym Wear */}
      <div style={{ ...section, background: "#fafafa" }}>
        <SectionHeader title="Gym Wear" align="center" font="'Bricolage Grotesque', sans-serif" fontSize={40} />
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 60%", position: "relative", background: "#1a1a1a", height: 680, overflow: "hidden" }}>
            <img src="/images/images.jpg" alt="Gym Wear" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85 }} />
            <p style={{ position: "absolute", top: "12%", left: 0, right: 0, fontFamily: SANS, fontWeight: 800, fontSize: 56, lineHeight: "56px", color: "#fff", margin: 0, textTransform: "uppercase", textAlign: "center", letterSpacing: "0.01em" }}>
              GYM WEAR
            </p>
            {[[18, 78], [38, 68], [72, 68], [55, 82]].map(([l, t], i) => (
              <button key={i} style={{ position: "absolute", top: `${t}%`, left: `${l}%`, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.85)", border: "2px solid #fff", cursor: "pointer", color: "#fff", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>🛍</button>
            ))}
          </div>
          {gymWearProducts[0] && (
            <div style={{ flex: "0 0 320px", position: "sticky", top: "calc(50vh - 170px)", background: "#fff" }}>
              {gymWearProducts[0].badge && (
                <span style={{ position: "absolute", top: 16, right: 16, zIndex: 2, background: "#111", color: "#fff", fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 2 }}>
                  {gymWearProducts[0].badge}
                </span>
              )}
              <img src="/images/images.jpg" alt={gymWearProducts[0].name} style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "16px 4px 0" }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", lineHeight: 1.4, margin: "0 0 6px" }}>{gymWearProducts[0].name}</p>
                <p style={{ fontSize: 13, color: "#444", margin: 0 }}>{gymWearProducts[0].price}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Picks */}
      <div style={section}>
        <SectionHeader title="Top Picks" showViewAll font="'Bricolage Grotesque', sans-serif" fontSize={40} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {topPicks.map(p => <GridCard key={p.id} product={p} imgHeight={380} />)}
        </div>
      </div>

      {/* Panties Pack */}
      <div style={{ ...section, background: "#fafafa" }}>
        <SectionHeader title="Panties Pack" showViewAll font="'Bricolage Grotesque', sans-serif" fontSize={40} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {pantiesPack.map(p => <GridCard key={p.id} product={p} imgHeight={380} />)}
        </div>
      </div>

      {/* Bras */}
      <div style={section}>
        <SectionHeader title="Bras" showViewAll font="'Bricolage Grotesque', sans-serif" fontSize={40} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {bras.map(p => <GridCard key={p.id} product={p} imgHeight={340} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button style={{ background: "#111", color: "#fff", border: "none", padding: "14px 48px", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", cursor: "pointer", fontFamily: SANS }}>
            VIEW ALL
          </button>
        </div>
      </div>

    </div>
  );
}