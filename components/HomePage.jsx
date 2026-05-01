"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import StreamCard from "./StreamCard";
import { useCategory } from "./CategoryContext";

const FONT = "'Inter', Helvetica, Roboto, sans-serif";

/* ── Photo pools ──────────────────────────────────────────── */
const PHOTO_POOLS = {
  african: [
    "https://cdni.pornpics.com/460/7/106/78051532/78051532_184_aa54.jpg",
    "https://video.damplips.com/pics/wp-content/uploads/2023/08/busty-hot-blonde.jpg",
    "https://video.damplips.com/pics/wp-content/uploads/2018/09/naked-pornstars-brazzers-orgy.jpg",
    "https://nudeyoga.net/contents/videos_screenshots/1000/1965/330x248/1.jpg",
    "https://erowall.com/wallpapers/original/10747.jpg",
    "https://adultsiteranking.com/fhg/galleries/1918/16.jpg",
    "https://static-ca-cdn.eporner.com/gallery/VV/7L/hQP9PUb7LVV/27211498-alexis-monroe-porn-star-blonde-naked-nude-boo.jpg",
    "https://fi1-ph.ypncdn.com/videos/202212/20/421730251/original/(m=eGM68f)(mh=WE-lfUOZ5LJOaRwR)14.jpg",
  ],
  top: [
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://ei-ph.rdtcdn.com/videos/202011/29/374970362/original/(m=eag28f)(mh=hcHGTXVg6minXVAC)15.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6402/360x240/6.jpg",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPQK3lCD49XqZlAAXSVYy57sPJtOhDlFGxw&s",
  ],
  couples: [
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6402/360x240/6.jpg",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://ei-ph.rdtcdn.com/videos/202011/29/374970362/original/(m=eag28f)(mh=hcHGTXVg6minXVAC)15.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPQK3lCD49XqZlAAXSVYy57sPJtOhDlFGxw&s",
  ],
  mobile: [
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6402/360x240/6.jpg",
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
  ],
  trending: [
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
  ],
  vr: [
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
  ],
  featured: [
    "https://cdni.pornpics.com/460/7/63/91904270/91904270_064_e2e2.jpg",
    "https://thepornlinks.com/storage/2022/09/Stella-Cox1.jpeg",
    "https://cdni.pornpics.com/460/7/365/76559543/76559543_011_dc39.jpg",
    "https://ei-ph.rdtcdn.com/videos/202011/29/374970362/original/(m=eag28f)(mh=hcHGTXVg6minXVAC)15.jpg",
    "https://cdni.pornpics.com/460/7/284/63140195/63140195_093_8298.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6402/360x240/6.jpg",
    "https://cdni.pornpics.com/460/7/764/26553342/26553342_060_0a5f.jpg",
    "https://cdni.pornpics.de/460/7/349/19684933/19684933_054_ac5c.jpg",
    "https://cdni.pornpics.com/460/7/837/64902410/64902410_052_5e18.jpg",
    "https://cdni.pornpics.com/460/7/246/32095369/32095369_121_3e72.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/7cf709be-1545-4f75-b7b2-91a2bf3c5eff/0/xv_9_p.jpg",
    "https://thumb-cdn77.xvideos-cdn.com/bcc3ad5f-e56d-4031-89dd-9e57b0fb8a66/0/xv_18_p.jpg",
    "https://cdn1.44sex.com/upload/photos/2025/04/INCREDIBLE%20SEX%20South%20African%20Porn%20Star%20German%20Machine%20Drilled%20Pussy%20Melani%20xgmtl%20%5B44sex.com%5D.jpg",
    "https://m.theartporn.com/contents/videos_screenshots/6000/6477/360x240/32.jpg",
  ],
};

const SECTIONS_BY_CATEGORY = {
  girls: [
    { key: "african",  title: "USA"                         },
    { key: "top",      title: "Top Free Live Sex Cams"      },
    { key: "couples",  title: "Couples Live Sex Cams"       },
    { key: "mobile",   title: "Mobile Live Sex Cams"        },
    { key: "trending", title: "New Trending Live Sex Cams"  },
    { key: "vr",       title: "VR Cams"                     },
  ],
  couples: [
    { key: "couples",  title: "Top Couples Live Now"        },
    { key: "trending", title: "Trending Couples"            },
    { key: "mobile",   title: "Mobile Couples"              },
    { key: "vr",       title: "Couples VR Cams"             },
    { key: "african",  title: "USA Couples"                 },
  ],
  guys: [
    { key: "top",      title: "Top Guys Live Now"           },
    { key: "trending", title: "Trending Guys"               },
    { key: "mobile",   title: "Mobile Guys"                 },
    { key: "vr",       title: "Guys VR Cams"                },
    { key: "african",  title: "USA Guys"                    },
  ],
  trans: [
    { key: "top",      title: "Top Trans Live Now"          },
    { key: "trending", title: "Trending Trans"              },
    { key: "mobile",   title: "Mobile Trans"                },
    { key: "vr",       title: "Trans VR Cams"               },
    { key: "couples",  title: "Trans Couples"               },
  ],
};

const FEATURED_TITLE = {
  girls:   "Featured Live Sex Shows",
  couples: "Featured Couples Live Shows",
  guys:    "Featured Guys Live Shows",
  trans:   "Featured Trans Live Shows",
};

const FLAGS = ["🇿🇦","🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧","🇲🇽","🇳🇬","🇹🇭","🇷🇴","🇵🇱","🇬🇷","🇮🇹","🇪🇸","🇨🇿","🇸🇪"];
const CATS  = ["girls","girls","girls","guys","couples","trans"];
const NAMES = [
  "AuroraBliss","KiraStorm","LunaRaven","NatashaFire","CherryBlossom","VioletDream",
  "MeiLingHot","RosePetal","ScarletVR","CocoLove","IvyRose","StellaX","NubiaNights",
  "EbonyQueen","SaharaHot","ZuluPrincess","BongoBeauty","LagosLove","CairoNights",
  "MobileQueen","PhoneFlirt","TrendingNow","HotNew2024","ViralStar","FreshFace",
  "VRQueenX","VirtualVixen","VRStar360","ImmersiveAlex","MetaLove","FireAndIce",
  "HoneyAndBear","JadeAndRex","AlexAndMia","TokyoCouple","RioNights","MadridPair",
  "MikeThunder","AlexGreek","DanteXXX","StarBoy","GuyOnPhone","NovaMale",
  "ZoeTransQueen","TransMobile","JustStarted","NewcomerX","BreakoutStar","FreshHeat",
];

function generateCard(tag, index) {
  const pool = PHOTO_POOLS[tag] || PHOTO_POOLS.featured;
  const name = NAMES[index % NAMES.length] + (index >= NAMES.length ? `_${Math.floor(index / NAMES.length)}` : "");
  return {
    id:         `${tag}_${index}`,
    username:   name,
    photo:      pool[index % pool.length],
    region:     FLAGS[index % FLAGS.length],
    category:   CATS[index % CATS.length],
    viewers:    Math.max(300, 35000 - index * 79 + (index % 7) * 1100),
    isNew:      index % 9 === 0,
    hd:         index % 3 !== 0,
    mobile:     index % 5 === 0,
    hasPrivate: index % 4 !== 0,
    vr:         tag === "vr",
    tags:       [tag],
  };
}

const GAP            = 6;
const BATCH_H        = 12;
const BATCH_V        = 24;
const CARD_W_DEFAULT = 175;
const CARD_H_DEFAULT = 131;
const CARD_W_MOBILE  = 162;
const CARD_H_MOBILE  = 248;

function SectionHeader({ title, showSeeAll = true }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginBottom: 8, paddingBottom: 8,
      borderBottom: "2px solid #e8e8e8",
    }}>
      <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", fontFamily: FONT }}>
        {title}
      </span>
      {showSeeAll && (
        <button style={{
          background: "none", border: "1px solid #ddd", cursor: "pointer",
          color: "#e53935", fontSize: 12, fontFamily: FONT,
          padding: "3px 12px", borderRadius: 20, fontWeight: 600,
          transition: "border-color .15s, background .15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#fdecea"; e.currentTarget.style.borderColor = "#e53935"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "#ddd"; }}>
          See All
        </button>
      )}
    </div>
  );
}

function HorizontalSection({ title, tag }) {
  const scrollRef   = useRef(null);
  const sentinelRef = useRef(null);
  const loadingRef  = useRef(false);
  const nextRef     = useRef(BATCH_H);

  const isMobileSection = tag === "mobile";
  const CARD_W = isMobileSection ? CARD_W_MOBILE : CARD_W_DEFAULT;
  const CARD_H = isMobileSection ? CARD_H_MOBILE : CARD_H_DEFAULT;

  const [cards,   setCards]   = useState(() => Array.from({ length: BATCH_H * 2 }, (_, i) => generateCard(tag, i)));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    const sentinel  = sentinelRef.current;
    if (!container || !sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setLoading(true);
          setTimeout(() => {
            const start = nextRef.current;
            const batch = Array.from({ length: BATCH_H }, (_, i) => generateCard(tag, start + i));
            nextRef.current = start + BATCH_H;
            setCards(prev => [...prev, ...batch]);
            setLoading(false);
            loadingRef.current = false;
          }, 250);
        }
      },
      { root: container, rootMargin: "0px 400px 0px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [tag]);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: (CARD_W + GAP) * 6, behavior: "smooth" });
  };

  const colCount = Math.ceil(cards.length / 2);

  return (
    <div style={{ marginBottom: 28 }}>
      <SectionHeader title={title} />
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div ref={scrollRef} style={{ overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>{`
            .hscroll::-webkit-scrollbar { display: none; }
            @keyframes shimmer {
              0%   { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(10px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div className="hscroll" style={{
            display: "grid",
            gridTemplateRows: "repeat(2, auto)",
            gridAutoFlow: "column",
            gridAutoColumns: CARD_W,
            gap: GAP,
            width: colCount * CARD_W + (colCount - 1) * GAP,
          }}>
            {cards.map(s => (
              <div key={s.id} style={{ width: CARD_W }}>
                <StreamCard streamer={s} gridMode cardHeight={CARD_H} />
              </div>
            ))}
            {loading && Array.from({ length: BATCH_H }).map((_, i) => (
              <div key={`sk-${i}`} style={{
                width: CARD_W, height: CARD_H, borderRadius: 4,
                background: "linear-gradient(90deg,#ebebeb 25%,#e0e0e0 50%,#ebebeb 75%)",
                backgroundSize: "200% 100%", animation: "shimmer 1.2s infinite",
              }} />
            ))}
            <div ref={sentinelRef} style={{ width: 1, height: "100%", gridRow: "1 / span 2" }} />
          </div>
        </div>
        <button onClick={scrollRight} style={{
          position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.92)", border: "1px solid #ddd",
          borderRadius: "50%", width: 28, height: 28,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          transition: "background .15s, box-shadow .15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.2)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.92)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)"; }}
        aria-label="Scroll right">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function FeaturedSection({ cols, title }) {
  const [cards,    setCards]   = useState(() => Array.from({ length: BATCH_V }, (_, i) => generateCard("featured", i)));
  const [loading,  setLoading] = useState(false);
  const nextRef    = useRef(BATCH_V);
  const loadingRef = useRef(false);
  const sentinelRef= useRef(null);

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setTimeout(() => {
      const start = nextRef.current;
      const batch = Array.from({ length: BATCH_V }, (_, i) => generateCard("featured", start + i));
      nextRef.current = start + BATCH_V;
      setCards(prev => [...prev, ...batch]);
      setLoading(false);
      loadingRef.current = false;
    }, 300);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin: "0px 0px 600px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div>
      <SectionHeader title={title} showSeeAll={false} />
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: GAP }}>
        {cards.map(s => (
          <StreamCard key={s.id} streamer={s} gridMode cardHeight={CARD_H_DEFAULT} />
        ))}
      </div>
      <div ref={sentinelRef} style={{ height: 1, marginTop: 8 }} aria-hidden="true" />
      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: GAP, marginTop: 8 }}>
          {Array.from({ length: BATCH_V }).map((_, i) => (
            <div key={`sk-${i}`} style={{
              height: CARD_H_DEFAULT, borderRadius: 4,
              background: "linear-gradient(90deg,#ebebeb 25%,#e0e0e0 50%,#ebebeb 75%)",
              backgroundSize: "200% 100%", animation: "shimmer 1.2s infinite",
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main HomePage ─────────────────────────────────────────── */
export default function HomePage() {
  const { category }    = useCategory();
  const [isMobile,  setIsMobile]  = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [showVerify, setShowVerify] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 820);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sections      = SECTIONS_BY_CATEGORY[category] ?? SECTIONS_BY_CATEGORY.girls;
  const featuredTitle = FEATURED_TITLE[category] ?? FEATURED_TITLE.girls;

  return (
    <div style={{
      background: "#F5F5F5",
      minHeight: "100%", color: "#1a1a1a",
      fontFamily: FONT, fontSize: 13,
    }}>
      <main style={{ padding: isMobile ? "12px 8px 80px" : "16px 24px 80px" }}>

        {/* ── Verify Age Banner ── */}
        {showVerify && (
          <div style={{
            background: "linear-gradient(90deg, #1565c0 0%, #1976d2 100%)",
            borderRadius: 6, marginBottom: 12,
            display: "flex", alignItems: "center",
            padding: isMobile ? "8px 12px" : "10px 16px",
            gap: 12,
          }}>
            {/* Shield icon */}
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: "#fff", fontFamily: FONT, lineHeight: 1.3 }}>
                Verify your age to unlock{" "}
                <span style={{ color: "#ffe082" }}>18+ content</span>
              </div>
              {!isMobile && (
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.78)", fontFamily: FONT, marginTop: 2 }}>
                  Required by{" "}
                  <img src="https://flagcdn.com/w20/gb.png" width={14} height={10}
                    alt="UK" style={{ borderRadius: 1, verticalAlign: "middle", margin: "0 3px" }}/>
                  UK law. It's fast and we don't store personal data
                </div>
              )}
            </div>

            {/* Verify Age button */}
            <button style={{
              background: "linear-gradient(135deg, #f9a825, #f57f17)",
              border: "none", color: "#fff",
              fontWeight: 700, fontSize: isMobile ? 12 : 13, fontFamily: FONT,
              padding: isMobile ? "6px 14px" : "9px 24px",
              borderRadius: 6, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              transition: "opacity .15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Verify Age
            </button>
          </div>
        )}

        {/* ── Promo banner ── */}
        {showPromo && (
          <div style={{
            background: "linear-gradient(90deg,#b71c1c 0%,#e53935 30%,#e53935 70%,#b71c1c 100%)",
            borderRadius: 6, padding: "9px 12px",
            marginBottom: 20, display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 2px 8px rgba(229,57,53,0.22)",
          }}>
            <div style={{
              background: "linear-gradient(135deg,#f57c00,#ff8f00)",
              borderRadius: 6, width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: 18,
            }}>🎁</div>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#fff", whiteSpace: "nowrap", flexShrink: 0, fontFamily: FONT }}>
              Special for You
            </span>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", whiteSpace: "nowrap", marginRight: 10, fontFamily: FONT }}>
              Get tokens now with{" "}
              <span style={{ fontWeight: 700, color: "#ffe082" }}>25% OFF!</span>
            </span>
            <button style={{
              background: "transparent", border: "1.5px solid rgba(255,255,255,0.7)",
              color: "#fff", fontWeight: 700, fontSize: 12, fontFamily: FONT,
              padding: "5px 16px", borderRadius: 20, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              GET TOKENS
            </button>
            <div style={{ flex: 1 }} />
            <button onClick={() => setShowPromo(false)} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.6)",
              cursor: "pointer", fontSize: 14, padding: 0, fontFamily: FONT, flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>✕</button>
          </div>
        )}

        {/* ── Horizontal sections ── */}
        {sections.map(sec => (
          <HorizontalSection
            key={`${category}-${sec.key}-${sec.title}`}
            title={sec.title}
            tag={sec.key}
          />
        ))}

        {/* ── Vertical featured grid ── */}
        <FeaturedSection key={category} cols={isMobile ? 2 : 6} title={featuredTitle} />

      </main>

      {/* ── Bottom join banner ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
        background: "#e53935", padding: "9px 20px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        boxShadow: "0 -2px 12px rgba(229,57,53,0.3)",
      }}>
        <span style={{ fontSize: 17 }}>💬</span>
        <span style={{ color: "#fff", fontWeight: 600, fontSize: 13, fontFamily: FONT }}>
          Join Stripchatbate to interact with models!
        </span>
        <button style={{
          background: "#fff", border: "none", color: "#e53935",
          fontWeight: 700, fontSize: 13, fontFamily: FONT,
          padding: "5px 18px", borderRadius: 20, cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          transition: "transform .15s, box-shadow .15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)"; }}>
          Join FREE
        </button>
      </div>
    </div>
  );
}