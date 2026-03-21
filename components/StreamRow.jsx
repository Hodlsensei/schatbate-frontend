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

export default function StreamRow({ title, category, vr, mobile, trending }) {
  const scrollRef = useRef(null);

  const cards = MOCK_NAMES.map((username, i) => ({
    username,
    viewers: Math.floor(Math.random() * 30000) + 500,
    isNew: trending || Math.random() < 0.2,
    vr: !!vr,
    mobile: !!mobile,
    hd: Math.random() > 0.4,
  }));

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 900, behavior: "smooth" });
  };

  // Split cards into 2 rows
  const row1 = cards.filter((_, i) => i % 2 === 0);
  const row2 = cards.filter((_, i) => i % 2 === 1);
  const pairs = row1.map((card, i) => [card, row2[i]]).filter(([a]) => a);

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

        {/* Left fade + arrow */}
        <button onClick={() => scroll(-1)} style={{
          position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 10, width: 36,
          background: "linear-gradient(to right, rgba(247,247,249,0.97) 60%, transparent)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--text)", fontSize: 24,
        }}>‹</button>

        {/* 2-row horizontal scroll container */}
        <div
          ref={scrollRef}
          style={{
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
          }}
        >
          {cards.map((streamer, i) => (
            <StreamCard key={i} streamer={streamer} index={i} gridMode={true} />
          ))}
        </div>

        {/* Right fade + arrow */}
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