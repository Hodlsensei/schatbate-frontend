"use client";
import { useRef, useState, useEffect } from "react";
import StreamCard from "./StreamCard";

const MOCK_NAMES = [
  "AuroraBliss","KiraStorm","LunaRaven","NatashaFire","CherryBlossom",
  "VioletDream","MeiLing","ScarletVR","IvyRose","ZoeHot",
  "SofiaFire","AlexDream","DanteHot","MikeThunder","AlexGreek",
  "RosePetal","DaisyChain","SunnyDay","MoonLight","StarGazer",
  "CocoLove","JasmineFire","TigerLily","SilverFox","GoldenGirl",
];

const AFRICAN_NAMES = [
  "AfricanQueen","EbonyGlow","ZuluPrincess","NaijaBabe","AshaNairobi",
  "DiamondLagos","SaharaRose","NileDream","SerengatiGirl","KisumuBabe",
  "AccraDiva","AbujaStar","MombasaHeat","KinshasaLove","DakarQueen",
];

const AFRICAN_PHOTOS = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=400&h=267&fit=crop",
];

const CONTINENT_REGION_MAP = {
  AF: ["NG", "ZA", "KE", "GH", "ET", "TZ", "EG", "SN", "CM", "CI"],
  EU: ["RU", "UA", "RO", "PL", "DE", "FR", "GB", "IT", "ES", "GR"],
  NA: ["US", "MX", "CA"],
  SA: ["BR", "CO", "AR", "PE", "VE"],
  AS: ["JP", "TH", "KR", "CN", "IN", "PH"],
  OC: ["AU", "NZ"],
};

async function detectContinent() {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    return { continent: data.continent_code, country: data.country_code };
  } catch {
    return { continent: null, country: null };
  }
}

function geoSort(cards, continent) {
  if (!continent || !CONTINENT_REGION_MAP[continent]) return cards;
  const preferredRegions = CONTINENT_REGION_MAP[continent];
  const local  = cards.filter(c => preferredRegions.includes(c.region));
  const others = cards.filter(c => !preferredRegions.includes(c.region));
  return [...local, ...others];
}

export default function StreamRow({ title, category, vr, mobile, trending, african, userContinent }) {
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [continent, setContinent] = useState(userContinent || null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!userContinent) {
      detectContinent().then(({ continent: c }) => {
        if (c) setContinent(c);
      });
    }
  }, [userContinent]);

  const names = african ? AFRICAN_NAMES : MOCK_NAMES;
  const ALL_REGIONS = ["NG","ZA","US","BR","RU","UA","JP","FR","DE","GB","MX","KE","TH","RO","PL","CO","GR","IT","ES","GH"];

  const rawCards = names.map((username, i) => ({
    username,
    viewers: Math.floor(Math.random() * 30000) + 500,
    isNew: trending || Math.random() < 0.2,
    vr: !!vr,
    mobile: !!mobile,
    hd: Math.random() > 0.4,
    hasPrivate: Math.random() < 0.5,
    region: african
      ? ["NG","ZA","GH","KE","ET","TZ","EG","SN","CM","CI","NG","ZA","GH","KE","ET"][i % 15]
      : ALL_REGIONS[i % ALL_REGIONS.length],
    photo: african ? AFRICAN_PHOTOS[i % AFRICAN_PHOTOS.length] : undefined,
  }));

  const cards = geoSort(rawCards, continent);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 900, behavior: "smooth" });
  };

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", marginBottom: 8,
      }}>
        <span style={{ fontSize: 17, fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: title }} />
        <span style={{ fontSize: 12, color: "var(--muted)", cursor: "pointer" }}>See All</span>
      </div>

      {/* Scroll wrapper */}
      <div style={{ position: "relative" }}>

        {!isMobile && (
          <button onClick={() => scroll(-1)} style={{
            position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 10, width: 36,
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text)", fontSize: 24,
          }}>‹</button>
        )}

        <div ref={scrollRef} style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          gridAutoFlow: "column",
          gridAutoColumns: isMobile ? "calc(50% - 10px)" : 180,
          columnGap: 14,
          rowGap: 14,
          overflowX: "scroll",
          overflowY: "hidden",
          padding: isMobile ? "0 8px 4px" : "0 16px 4px",
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}>
          {cards.map((streamer, i) => (
            <StreamCard key={i} streamer={streamer} index={i} gridMode={true} />
          ))}
        </div>

        {!isMobile && (
          <button onClick={() => scroll(1)} style={{
            position: "absolute", right: 0, top: 0, bottom: 0, zIndex: 10, width: 36,
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text)", fontSize: 24,
          }}>›</button>
        )}

      </div>
    </div>
  );
}