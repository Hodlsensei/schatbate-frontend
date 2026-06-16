"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const FONT = "'Inter', Helvetica, Roboto, sans-serif";

const REAL_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQg12bOuJZTjq6W6dwjDZKsoscwlOyrqCFzQ&s",
  "https://thumb-cdn77.xvideos-cdn.com/c87994b8-60b1-4681-b77d-14f984bdc02e/0/xv_13_p.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/626a98b8-6808-46db-9045-744eb479fb88/0/xv_30_p.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/ffa116de-3e1d-4f05-b157-51275d1f8d09/0/xv_30_t.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/ad890255-5584-489c-b1e7-9dcfda4195ee/0/xv_27_p.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Rj9u7dxAHe4S1h1F1e13-159QIt4NfRm8A&s",
  "https://thumb-cdn77.xvideos-cdn.com/ff16428d-031c-46b8-81eb-e5ef463b9a4a/0/xv_12_t.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmSZMMbcIVexjN27xZsH_0lAhLATrc_fryCw&s",
  "https://tn.vxxx.com/contents/videos_screenshots/1480000/1480349/420x236/1.jpg",
  "https://videoxxx.tv/wp-content/uploads/2017/05/Watch-Hot-Blonde-Pornstar-XXX-Video-Porn-Fuck-On-Sofa.jpg",
];

const VIDEO_IMAGES = [
  "https://thumb-cdn77.xvideos-cdn.com/c87994b8-60b1-4681-b77d-14f984bdc02e/0/xv_13_p.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/626a98b8-6808-46db-9045-744eb479fb88/0/xv_30_p.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/ffa116de-3e1d-4f05-b157-51275d1f8d09/0/xv_30_t.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/ad890255-5584-489c-b1e7-9dcfda4195ee/0/xv_27_p.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/ff16428d-031c-46b8-81eb-e5ef463b9a4a/0/xv_12_t.jpg",
  "https://tn.vxxx.com/contents/videos_screenshots/1480000/1480349/420x236/1.jpg",
  "https://videoxxx.tv/wp-content/uploads/2017/05/Watch-Hot-Blonde-Pornstar-XXX-Video-Porn-Fuck-On-Sofa.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQg12bOuJZTjq6W6dwjDZKsoscwlOyrqCFzQ&s",
];

const NAMES = [
  "AuroraBliss","LunaRaven","CherryBlossom","MeilingHot","ScarletVR","IvyRose",
  "NubiaNights","KiraStorm","NatashaFire","VioletDream","RosePetal","CocoLove",
  "StellaX","EbonyQueen","MoonlightK","SilkDreams","RedVelvet","CrystalBlue",
];

const VIDEO_TITLES = [
  "Que Deus me perdoe Se e c...", "cream my ass with your cock",
  "I want to get my short shirt...", "BIG BOUNCE ASS",
  "Fucking my tight pussy with...", "TRAILER - Kulcsot kapott a...",
  "Fucking the gym trainer", "I like it when it bangs",
  "GIRLS", "pretty and thick", "give me more pleasure", "lip syncing",
  "[19 Apr 10:45] Public Show", "Squirting", "You busy this morning?",
  "sexy dance for you", "Squirt with sex machine", "Peach",
];

const AVATAR_COLORS = ["#D4622A","#9b59b6","#3498db","#e67e22","#1abc9c","#e91e63","#ff5722","#607d8b"];

function randomDuration() {
  const m = String(Math.floor(Math.random() * 12)).padStart(2,"0");
  const s = String(Math.floor(Math.random() * 59)).padStart(2,"0");
  return `${m}:${s}`;
}

const SHORT_H = 200; // px — height of one short/wide cell
const GAP     = 8;   // px — gap between cells
const RADIUS  = 8;

let imgCounter = 0;
function makeCard(type) {
  const id = imgCounter++;
  return {
    id: `c-${id}`,
    type,
    src: REAL_IMAGES[id % REAL_IMAGES.length],
    isLive: Math.random() > 0.6,
    hasGridIcon: Math.random() > 0.55,
  };
}

/*
  LAYOUT LOGIC (row = one SHORT_H unit):

  Col 1 : short every row (1 short per row, forever)

  Col 2 : tall(span 2 rows) → short → short → short → tall → short → short → short → …
           Pattern cycle = [tall=2, s=1, s=1, s=1]  →  5 rows per cycle

  Col 3+4: share a repeating pattern of shorts and wides.
           Wide card spans cols 3+4 horizontally (1 row tall).
           Pattern of row-groups:
             3 shorts  → wide → 4 shorts → wide → 3 shorts → wide → 4 shorts → (repeat)
           That is 3+1+4+1+3+1+4 = 17 rows per cycle.
           During "short" groups, col3 and col4 each get an independent short card per row.
*/
function buildGalleryItems(totalRows = 50) {
  const items = [];

  // ── Column 1: one short per row ──
  for (let row = 1; row <= totalRows; row++) {
    items.push({ ...makeCard("short"), gridColumn: "1", gridRow: String(row) });
  }

  // ── Column 2: [tall=2rows, short, short, short] cycle ──
  {
    const pat = [
      { type: "tall",  span: 2 },
      { type: "short", span: 1 },
      { type: "short", span: 1 },
      { type: "short", span: 1 },
    ];
    let row = 1, pi = 0;
    while (row <= totalRows) {
      const { type, span } = pat[pi % pat.length];
      items.push({
        ...makeCard(type),
        gridColumn: "2",
        gridRow: span === 2 ? `${row} / span 2` : String(row),
      });
      row += span;
      pi++;
    }
  }

  // ── Columns 3+4: [3 shorts, wide, 4 shorts, wide, 3 shorts, wide, 4 shorts] cycle ──
  {
    // Each step is either a short-count (number) or "wide"
    const pat = [3, "wide", 4, "wide", 3, "wide", 4];
    let row = 1, pi = 0;
    while (row <= totalRows) {
      const step = pat[pi % pat.length];
      if (step === "wide") {
        // One wide card spanning cols 3+4
        items.push({
          ...makeCard("wide"),
          gridColumn: "3 / span 2",
          gridRow: String(row),
        });
        row += 1;
      } else {
        // `step` rows of independent shorts in col3 and col4
        for (let i = 0; i < step && row <= totalRows; i++, row++) {
          items.push({ ...makeCard("short"), gridColumn: "3", gridRow: String(row) });
          items.push({ ...makeCard("short"), gridColumn: "4", gridRow: String(row) });
        }
      }
      pi++;
    }
  }

  return items;
}

/* ── Photo Card ── */
function PhotoCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", height: "100%",
        borderRadius: RADIUS, overflow: "hidden",
        cursor: "pointer", position: "relative",
        background: "#ccc",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.18)" : "none",
        transition: "box-shadow .3s",
      }}
    >
      <img
        src={item.src} alt=""
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hov ? "scale(1.06)" : "scale(1)",
          transition: "transform .4s cubic-bezier(.4,0,.2,1)",
        }}
      />

      {hov && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "#D4622A", color: "#fff",
            padding: "7px 18px", borderRadius: 20,
            fontSize: 12, fontWeight: 700, fontFamily: FONT,
          }}>
            {item.isLive ? "Join Live" : "View"}
          </div>
        </div>
      )}

      {item.isLive && (
        <div style={{ position: "absolute", top: 8, left: 8 }}>
          <span style={{
            background: "#D4622A", color: "#fff",
            fontSize: 10, fontWeight: 700, padding: "2px 7px",
            borderRadius: 3, fontFamily: FONT,
          }}>LIVE</span>
        </div>
      )}

      {item.hasGridIcon && (
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <div style={{
            width: 22, height: 22, background: "rgba(0,0,0,0.45)",
            borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="#fff">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Video Card ── */
function VideoCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ cursor: "pointer" }}>
      <div style={{
        borderRadius: RADIUS, overflow: "hidden", position: "relative",
        paddingBottom: "56.25%", background: "#e8e8e8",
        transform: hov ? "scale(1.02)" : "scale(1)",
        transition: "transform .2s, box-shadow .2s",
        boxShadow: hov ? "0 6px 20px rgba(0,0,0,0.15)" : "none",
      }}>
        <img src={item.src} alt={item.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}/>
        <div style={{
          position: "absolute", bottom: 6, right: 6,
          background: "rgba(0,0,0,0.75)", color: "#fff",
          fontSize: 11, fontWeight: 600, padding: "2px 6px", borderRadius: 4, fontFamily: FONT,
        }}>{item.duration}</div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "8px 2px 4px", alignItems: "flex-start" }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: item.avatarColor, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, color: "#fff", fontWeight: 700, fontFamily: FONT, position: "relative",
        }}>
          {item.name[0]}
          {item.isLive && (
            <div style={{
              position: "absolute", bottom: -3, left: "50%", transform: "translateX(-50%)",
              background: "#D4622A", color: "#fff", fontSize: 7, fontWeight: 700,
              padding: "1px 3px", borderRadius: 3, fontFamily: FONT, whiteSpace: "nowrap",
            }}>LIVE</div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 12, fontWeight: 600, color: "#111", fontFamily: FONT,
            lineHeight: 1.35, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          }}>{item.title}</div>
          <div style={{ fontSize: 11, color: "#888", fontFamily: FONT }}>{item.name}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Age Gate ── */
function AgeGateOverlay({ onVerify }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.55)" }}/>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "40px 32px", maxWidth: 420 }}>
        <div style={{ fontSize: 52, marginBottom: 8 }}>🔥</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: "#fff", fontFamily: FONT, marginBottom: 16, lineHeight: 1 }}>18+</div>
        <p style={{ fontSize: 16, color: "#fff", fontFamily: FONT, lineHeight: 1.6, marginBottom: 28 }}>
          Watch the hottest livestreams, photos, and videos by verifying your age.
        </p>
        <button
          onClick={onVerify}
          style={{
            background: "#2979ff", border: "none", color: "#fff",
            fontWeight: 700, fontSize: 16, fontFamily: FONT,
            padding: "14px 48px", borderRadius: 999, cursor: "pointer",
            boxShadow: "0 4px 20px rgba(41,121,255,0.5)", transition: "opacity .15s", marginBottom: 14,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Verify Age
        </button>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: FONT, marginTop: 4 }}>
          ⚡ It takes just 30 seconds
        </div>
      </div>
    </div>
  );
}

function JoinBar() {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "#D4622A",
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 16, padding: "12px 20px",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="#fff">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </div>
      <span style={{ color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: FONT }}>
        Join Stripchatbate to interact with models!
      </span>
      <button style={{
        background: "#fff", color: "#D4622A", border: "none", borderRadius: 20, cursor: "pointer",
        padding: "8px 20px", fontSize: 13, fontWeight: 700, fontFamily: FONT, flexShrink: 0,
      }}>
        Join FREE
      </button>
    </div>
  );
}

/* ── Main Page ── */
export default function GalleryPage() {
  const [activeTab, setActiveTab]       = useState("Photos");
  const [galleryItems, setGalleryItems] = useState(() => buildGalleryItems(50));
  const [videos, setVideos]             = useState(() =>
    Array.from({ length: 8 }, (_, id) => ({
      id: `v-${id}`,
      src: VIDEO_IMAGES[id % VIDEO_IMAGES.length],
      title: VIDEO_TITLES[id % VIDEO_TITLES.length],
      name: NAMES[id % NAMES.length],
      duration: randomDuration(),
      isLive: Math.random() > 0.6,
      avatarColor: AVATAR_COLORS[id % AVATAR_COLORS.length],
    }))
  );
  const [loading, setLoading]           = useState(false);
  const [ageVerified, setAgeVerified]   = useState(false);
  const loaderRef    = useRef(null);
  const totalRowsRef = useRef(50);
  const videoCountRef = useRef(8);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      if (activeTab === "Photos") {
        totalRowsRef.current += 30;
        setGalleryItems(buildGalleryItems(totalRowsRef.current));
      } else {
        const start = videoCountRef.current;
        videoCountRef.current += 8;
        setVideos(prev => [
          ...prev,
          ...Array.from({ length: 8 }, (_, i) => {
            const id = start + i;
            return {
              id: `v-${id}`,
              src: VIDEO_IMAGES[id % VIDEO_IMAGES.length],
              title: VIDEO_TITLES[id % VIDEO_TITLES.length],
              name: NAMES[id % NAMES.length],
              duration: randomDuration(),
              isLive: Math.random() > 0.6,
              avatarColor: AVATAR_COLORS[id % AVATAR_COLORS.length],
            };
          }),
        ]);
      }
      setLoading(false);
    }, 600);
  }, [loading, activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  // Max row needed so CSS grid knows how many rows to create
  const maxRow = galleryItems.reduce((max, item) => {
    const r = parseInt(item.gridRow.split("/")[0].trim());
    return Math.max(max, r);
  }, 0);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: FONT, paddingBottom: 80 }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>

      {!ageVerified && <AgeGateOverlay onVerify={() => setAgeVerified(true)} />}

      <div style={{
        filter: ageVerified ? "none" : "blur(10px)",
        transition: "filter .4s",
        pointerEvents: ageVerified ? "auto" : "none",
      }}>
        {/* Sticky header */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          background: "#fff", borderBottom: "1px solid #eee",
          padding: "14px 20px 12px", textAlign: "center",
        }}>
          <h1 style={{
            fontSize: 20, fontWeight: 700, color: "#111",
            margin: "0 0 12px", fontFamily: FONT, letterSpacing: "-.3px",
          }}>
            Nude Sex Pics with Girls
          </h1>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {["Photos", "Videos"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 28px", borderRadius: 24,
                  border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 600, fontFamily: FONT,
                  background: activeTab === tab ? "#2a2a2a" : "#f0f0f0",
                  color: activeTab === tab ? "#fff" : "#555",
                  transition: "all .15s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)" }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="#666">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
        </div>

        {/* PHOTOS TAB */}
        {activeTab === "Photos" && (
          <div style={{ padding: "8px 16px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: `repeat(${maxRow}, ${SHORT_H}px)`,
              gap: `${GAP}px`,
            }}>
              {galleryItems.map(item => (
                <div
                  key={item.id}
                  style={{ gridColumn: item.gridColumn, gridRow: item.gridRow }}
                >
                  <PhotoCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIDEOS TAB */}
        {activeTab === "Videos" && (
          <div style={{
            padding: "16px", background: "#fff",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px 12px",
          }}>
            {videos.map(item => <VideoCard key={item.id} item={item} />)}
          </div>
        )}

        {/* Infinite scroll sentinel */}
        <div ref={loaderRef} style={{ padding: "24px 0", display: "flex", justifyContent: "center" }}>
          {loading && (
            <div style={{ display: "flex", gap: 6 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: "50%", background: "#D4622A",
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}/>
              ))}
            </div>
          )}
        </div>
      </div>

      <JoinBar />
    </div>
  );
}