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

/* Dimensions from spec */
const TALL_W   = 254;
const TALL_H   = 526;
const SQ_W     = 256;
const SQ_H     = 257;
const GAP      = 8;
const RADIUS   = 8;

let photoCounter = 0;
let videoCounter = 0;

function makeCard() {
  const id = photoCounter++;
  return {
    id: `p-${id}`,
    src: REAL_IMAGES[id % REAL_IMAGES.length],
    isLive: Math.random() > 0.6,
    hasGridIcon: Math.random() > 0.55,
    overlayText: Math.random() > 0.82 ? OVERLAY_TEXTS[id % OVERLAY_TEXTS.length] : null,
  };
}

/* Each "block" = 1 tall + 6 squares = 7 cards */
function makeBlock() {
  return Array.from({ length: 7 }, makeCard);
}

function generateBlocks(count = 3) {
  return Array.from({ length: count }, makeBlock);
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

/* ── Photo Card ── */
function PhotoCard({ item, width, height }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: width || "100%",
        height,
        borderRadius: RADIUS,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        background: "#ddd",
        boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.18)" : "none",
        transition: "box-shadow .3s",
        isolation: "isolate",
      }}
    >
      <img
        src={item.src} alt=""
        className={hov ? "gallery-img-hov" : "gallery-img"}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
        }}
      />

      {/* Hover overlay */}
      {hov && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)",
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

      {/* LIVE badge */}
      {item.isLive && (
        <div style={{ position: "absolute", top: 8, left: 8 }}>
          <span style={{
            background: "#e5192b", color: "#fff",
            fontSize: 10, fontWeight: 700, padding: "2px 7px",
            borderRadius: 3, fontFamily: FONT,
          }}>LIVE</span>
        </div>
      )}

      {/* Grid icon */}
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

      {/* Overlay text */}
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

/*
 * ── GalleryBlock ──
 * Reference layout (each block, left→right):
 *
 * Col:   1 (sq)  |  2 (tall)  |  3 (sq)  |  4 (sq)
 * Row 1: sq         tall         sq          sq
 * Row 2: sq         tall         sq          sq
 *
 * cards[0] = top-left sq
 * cards[1] = TALL (spans both rows, col 2)
 * cards[2] = top col3 sq
 * cards[3] = top col4 sq
 * cards[4] = bottom-left sq
 * cards[5] = bottom col3 sq
 * cards[6] = bottom col4 sq
 *
 * The tall card is always in column 2. We alternate which column
 * is tall per block so it doesn't look monotonous:
 * block 0 → col 2, block 1 → col 3, block 2 → col 1, etc.
 */
function GalleryBlock({ cards, blockIndex }) {
  const tallCol = blockIndex % 4; // rotate across all 4 columns
  const tall    = cards[0];
  const sqs     = cards.slice(1); // 6 squares
  const sqCols  = [0,1,2,3].filter(c => c !== tallCol); // 3 cols × 2 rows = 6

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: `${SQ_H}px ${SQ_H}px`,
      gap: GAP,
      marginBottom: GAP,
    }}>
      {/* Tall card spans both rows */}
      <div style={{ gridColumn: tallCol + 1, gridRow: "1 / span 2" }}>
        <PhotoCard item={tall} width="100%" height={TALL_H} />
      </div>

      {/* Square cards */}
      {sqCols.map((col, ci) => (
        <>
          <div key={`${blockIndex}-${ci}-top`} style={{ gridColumn: col + 1, gridRow: 1 }}>
            <PhotoCard item={sqs[ci * 2]}     width="100%" height={SQ_H} />
          </div>
          <div key={`${blockIndex}-${ci}-bot`} style={{ gridColumn: col + 1, gridRow: 2 }}>
            <PhotoCard item={sqs[ci * 2 + 1]} width="100%" height={SQ_H} />
          </div>
        </>
      ))}
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

/* ── Join Bar ── */
function JoinBar() {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "#e5192b",
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 16, padding: "12px 20px",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "rgba(255,255,255,0.2)",
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
        background: "#fff", color: "#e5192b",
        border: "none", borderRadius: 20, cursor: "pointer",
        padding: "8px 20px", fontSize: 13, fontWeight: 700, fontFamily: FONT, flexShrink: 0,
      }}>
        Join FREE
      </button>
    </div>
  );
}

/* ── Main Page ── */
export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("Photos");
  const [blocks,    setBlocks]    = useState(() => generateBlocks(3));
  const [videos,    setVideos]    = useState(() => generateVideoBatch(8));
  const [loading,   setLoading]   = useState(false);
  const loaderRef  = useRef(null);
  const blockCount = useRef(3);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      if (activeTab === "Photos") {
        const newBlocks = generateBlocks(2);
        blockCount.current += 2;
        setBlocks(prev => [...prev, ...newBlocks]);
      } else {
        setVideos(prev => [...prev, ...generateVideoBatch(8)]);
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

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: FONT, paddingBottom: 80 }}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        .gallery-img {
          transform: scale(1.12);
          transition: transform .5s cubic-bezier(.4,0,.2,1);
        }
        .gallery-img-hov {
          transform: scale(1);
          transition: transform .5s cubic-bezier(.4,0,.2,1);
        }
      `}</style>

      {/* Sticky header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "#fff", borderBottom: "1px solid #eee",
        padding: "14px 20px 12px",
        textAlign: "center",
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

      {/* PHOTOS */}
      {activeTab === "Photos" && (
        <div style={{ padding: GAP, background: "#fff" }}>
          {blocks.map((cards, i) => (
            <GalleryBlock key={i} cards={cards} blockIndex={i} />
          ))}
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

      <JoinBar />
    </div>
  );
}