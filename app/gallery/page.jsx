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

const OVERLAY_TEXTS = [
  "come here now i wait for u in my room now",
  "Will you give me your milk in my mouth?",
  "you want to be my trainer at the gym?",
  "Guess what kind of mood I'm in tonight...",
  "Do you wish for me to be back or front for you?",
];

const AVATAR_COLORS = ["#e5192b","#9b59b6","#3498db","#e67e22","#1abc9c","#e91e63","#ff5722","#607d8b"];

function randomDuration() {
  const m = String(Math.floor(Math.random() * 12)).padStart(2,"0");
  const s = String(Math.floor(Math.random() * 59)).padStart(2,"0");
  return `${m}:${s}`;
}

let photoCounter = 0;
let videoCounter = 0;
let groupCounter = 0;

function makeCard() {
  const id = photoCounter++;
  return {
    id: `p-${id}`,
    src: REAL_IMAGES[id % REAL_IMAGES.length],
    isLive: Math.random() > 0.55,
    hasGridIcon: Math.random() > 0.5,
    overlayText: Math.random() > 0.8 ? OVERLAY_TEXTS[id % OVERLAY_TEXTS.length] : null,
  };
}

function generatePatternA() { return { type: "A", cards: Array.from({ length: 8 }, makeCard) }; }
function generatePatternB() { return { type: "B", cards: Array.from({ length: 7 }, makeCard) }; }
function generatePatternC() { return { type: "C", cards: Array.from({ length: 7 }, makeCard) }; }
function generatePatternD() { return { type: "D", cards: Array.from({ length: 7 }, makeCard) }; }

const PATTERN_FNS = [generatePatternB, generatePatternA, generatePatternC, generatePatternB, generatePatternD, generatePatternA];

function generateGroups(count = 3) {
  return Array.from({ length: count }, () => PATTERN_FNS[groupCounter++ % PATTERN_FNS.length]());
}

function generateVideoBatch(count = 8) {
  return Array.from({ length: count }, () => {
    const id = videoCounter++;
    return {
      id: `v-${id}`,
      src: VIDEO_IMAGES[id % VIDEO_IMAGES.length],
      title: VIDEO_TITLES[id % VIDEO_TITLES.length],
      name: NAMES[id % NAMES.length],
      duration: randomDuration(),
      isLive: Math.random() > 0.6,
      avatarColor: AVATAR_COLORS[id % AVATAR_COLORS.length],
    };
  });
}

const ROW_H = 230;
const GAP = 8;

/* ── Special For You Banner ── */
function SpecialBanner({ onClose }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: "linear-gradient(90deg, #c0392b, #e5192b)",
      padding: "12px 20px", gap: 16, position: "relative",
      margin: "0 0 0 0",
    }}>
      {/* Gift icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 8,
        background: "rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 22 }}>🎁</span>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: FONT }}>
          Special for You
        </span>
        <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontFamily: FONT }}>
          Get tokens now with{" "}
          <span style={{ color: "#ffd700", fontWeight: 700 }}>25% OFF!</span>
        </span>
      </div>

      <button style={{
        background: "#f5a623", color: "#fff",
        border: "none", borderRadius: 6, cursor: "pointer",
        padding: "8px 18px", fontSize: 13, fontWeight: 700, fontFamily: FONT,
        flexShrink: 0,
      }}>
        GET TOKENS
      </button>

      <button
        onClick={() => setVisible(false)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.7)", fontSize: 20, lineHeight: 1,
          padding: "0 4px", flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}

/* ── Join Bar (fixed bottom) ── */
function JoinBar() {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      zIndex: 100,
      background: "#e5192b",
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 16, padding: "12px 20px",
    }}>
      {/* Chat bubble icon */}
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="#fff">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </div>
      <span style={{
        color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: FONT,
      }}>
        Join Stripchatbate to interact with models!
      </span>
      <button style={{
        background: "#fff", color: "#e5192b",
        border: "none", borderRadius: 20, cursor: "pointer",
        padding: "8px 20px", fontSize: 13, fontWeight: 700, fontFamily: FONT,
        flexShrink: 0,
      }}>
        Join FREE
      </button>
    </div>
  );
}

/* ── Photo Card ── */
function PhotoCard({ item, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 10, overflow: "hidden", cursor: "pointer",
        position: "relative", background: "#e8e8e8",
        transform: hov ? "scale(1.015)" : "scale(1)",
        transition: "transform .2s, box-shadow .2s",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.18)" : "none",
        ...style,
      }}
    >
      <img src={item.src} alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>

      {hov && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "#e5192b", color: "#fff",
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
            background: "#e5192b", color: "#fff",
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

      {item.overlayText && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(transparent, rgba(0,0,0,0.82))",
          padding: "24px 10px 8px",
          color: "#fff", fontSize: 11, fontFamily: FONT, lineHeight: 1.4,
        }}>
          {item.overlayText}
        </div>
      )}
    </div>
  );
}

/* ── Pattern A: 4+4 equal ── */
function GroupA({ cards }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginBottom: GAP }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: GAP }}>
        {cards.slice(0,4).map(c => <PhotoCard key={c.id} item={c} style={{ height: ROW_H }}/>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: GAP }}>
        {cards.slice(4,8).map(c => <PhotoCard key={c.id} item={c} style={{ height: ROW_H }}/>)}
      </div>
    </div>
  );
}

/* ── Pattern B: col2 tall spans both rows ── */
function GroupB({ cards }) {
  const totalH = ROW_H * 2 + GAP;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gridTemplateRows: `${ROW_H}px ${ROW_H}px`,
      gap: GAP, marginBottom: GAP,
    }}>
      <div style={{ gridColumn: 1, gridRow: 1 }}><PhotoCard item={cards[0]} style={{ height: ROW_H }}/></div>
      <div style={{ gridColumn: 2, gridRow: "1 / span 2" }}><PhotoCard item={cards[1]} style={{ height: totalH }}/></div>
      <div style={{ gridColumn: 3, gridRow: 1 }}><PhotoCard item={cards[2]} style={{ height: ROW_H }}/></div>
      <div style={{ gridColumn: 4, gridRow: 1 }}><PhotoCard item={cards[3]} style={{ height: ROW_H }}/></div>
      <div style={{ gridColumn: 1, gridRow: 2 }}><PhotoCard item={cards[4]} style={{ height: ROW_H }}/></div>
      <div style={{ gridColumn: 3, gridRow: 2 }}><PhotoCard item={cards[5]} style={{ height: ROW_H }}/></div>
      <div style={{ gridColumn: 4, gridRow: 2 }}><PhotoCard item={cards[6]} style={{ height: ROW_H }}/></div>
    </div>
  );
}

/* ── Pattern C: 4 top + bottom [normal][WIDE][normal] ── */
function GroupC({ cards }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginBottom: GAP }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: GAP }}>
        {cards.slice(0,4).map(c => <PhotoCard key={c.id} item={c} style={{ height: ROW_H }}/>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: GAP }}>
        <PhotoCard item={cards[4]} style={{ height: ROW_H }}/>
        <div style={{ gridColumn: "span 2" }}><PhotoCard item={cards[5]} style={{ height: ROW_H }}/></div>
        <PhotoCard item={cards[6]} style={{ height: ROW_H }}/>
      </div>
    </div>
  );
}

/* ── Pattern D: 4 top + bottom [normal][normal][WIDE] ── */
function GroupD({ cards }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginBottom: GAP }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: GAP }}>
        {cards.slice(0,4).map(c => <PhotoCard key={c.id} item={c} style={{ height: ROW_H }}/>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: GAP }}>
        <PhotoCard item={cards[4]} style={{ height: ROW_H }}/>
        <PhotoCard item={cards[5]} style={{ height: ROW_H }}/>
        <div style={{ gridColumn: "span 2" }}><PhotoCard item={cards[6]} style={{ height: ROW_H }}/></div>
      </div>
    </div>
  );
}

/* ── Video Card ── */
function VideoCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ cursor: "pointer" }}>
      <div style={{
        borderRadius: 8, overflow: "hidden", position: "relative",
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
              background: "#e5192b", color: "#fff", fontSize: 7, fontWeight: 700,
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

/* ── Main Page ── */
export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("Photos");
  const [groups, setGroups] = useState(() => generateGroups(3));
  const [videos, setVideos] = useState(() => generateVideoBatch(8));
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      if (activeTab === "Photos") {
        setGroups(prev => [...prev, ...generateGroups(2)]);
      } else {
        setVideos(prev => [...prev, ...generateVideoBatch(8)]);
      }
      setLoading(false);
    }, 700);
  }, [loading, activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: FONT, paddingBottom: 64 }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>

      {/* Special For You Banner — top, not sticky */}
      <SpecialBanner />

      {/* Header: Title + separate tab buttons */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "16px 20px 12px",
        textAlign: "center",
      }}>
        {/* Title */}
        <h1 style={{
          fontSize: 20, fontWeight: 700, color: "#111",
          margin: "0 0 14px", fontFamily: FONT, letterSpacing: "-.3px",
        }}>
          Nude Sex Pics with Girls
        </h1>

        {/* Two separate pill buttons — NOT a toggle switch */}
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

        {/* Grid icon top-right */}
        <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)" }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="#666">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
      </div>

      {/* PHOTOS */}
      {activeTab === "Photos" && (
        <div style={{ padding: 8, background: "#fff" }}>
          {groups.map((g, i) =>
            g.type === "A" ? <GroupA key={i} cards={g.cards} /> :
            g.type === "B" ? <GroupB key={i} cards={g.cards} /> :
            g.type === "C" ? <GroupC key={i} cards={g.cards} /> :
                             <GroupD key={i} cards={g.cards} />
          )}
        </div>
      )}

      {/* VIDEOS */}
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
                width: 8, height: 8, borderRadius: "50%", background: "#e5192b",
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}/>
            ))}
          </div>
        )}
      </div>

      {/* Join Bar — fixed at bottom */}
      <JoinBar />
    </div>
  );
}