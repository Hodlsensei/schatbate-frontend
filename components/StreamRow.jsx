"use client";
import { useRef } from "react";
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
  "https://thumb-cdn77.xvideos-cdn.com/31873630-628a-4817-990f-68f2b7f9c2a9/0/xv_27_p.jpg",
  "https://pbs.twimg.com/media/FqxjJMDXoAMfRVN.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/1e1fdc91-f540-4f72-acd2-58ce81d27730/0/xv_4_t.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/07c57345-a6a1-4d10-9b75-8848037d9cb1/0/xv_10_p.jpg",
  "https://hub.afroporn.net/content/16/261_african_porno.jpg",
  "https://ei.phncdn.com/videos/202312/05/444203691/original/(m=eGNdHgaaaa)(mh=tAuz5ZntMvhGg582)1.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/26b7b3a7-1619-479b-8b40-29cb81bf64bb/0/xv_15_t.jpg",
];

export default function StreamRow({ title, category, vr, mobile, trending, african }) {
  const scrollRef = useRef(null);

  const names = african ? AFRICAN_NAMES : MOCK_NAMES;

  const cards = names.map((username, i) => ({
    username,
    viewers: Math.floor(Math.random() * 30000) + 500,
    isNew: trending || Math.random() < 0.2,
    vr: !!vr,
    mobile: !!mobile,
    hd: Math.random() > 0.4,
    photo: african ? AFRICAN_PHOTOS[i % AFRICAN_PHOTOS.length] : undefined,
  }));

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

        {/* Left arrow */}
        <button onClick={() => scroll(-1)} style={{
          position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 10, width: 36,
          background: "linear-gradient(to right, rgba(247,247,249,0.97) 60%, transparent)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--text)", fontSize: 24,
        }}>‹</button>

        {/* 2-row horizontal scroll */}
        <div ref={scrollRef} style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          gridAutoFlow: "column",
          gridAutoColumns: 175,
          gap: 4,
          overflowX: "scroll",
          overflowY: "hidden",
          padding: "0 16px 4px",
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}>
          {cards.map((streamer, i) => (
            <StreamCard key={i} streamer={streamer} index={i} gridMode={true} />
          ))}
        </div>

        {/* Right arrow */}
        <button onClick={() => scroll(1)} style={{
          position: "absolute", right: 0, top: 0, bottom: 0, zIndex: 10, width: 36,
          background: "linear-gradient(to left, rgba(247,247,249,0.97) 60%, transparent)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--text)", fontSize: 24,
        }}>›</button>

      </div>
    </div>
  );
}