"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PHOTOS = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBOBur7enE5uhv8jQoD0AImxqy-GsGz98gw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpU7khTcheFyWCJIla_DxWLHomRTns_fGBQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBOBur7enE5uhv8jQoD0AImxqy-GsGz98gw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpU7khTcheFyWCJIla_DxWLHomRTns_fGBQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBOBur7enE5uhv8jQoD0AImxqy-GsGz98gw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpU7khTcheFyWCJIla_DxWLHomRTns_fGBQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBOBur7enE5uhv8jQoD0AImxqy-GsGz98gw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpU7khTcheFyWCJIla_DxWLHomRTns_fGBQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBOBur7enE5uhv8jQoD0AImxqy-GsGz98gw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpU7khTcheFyWCJIla_DxWLHomRTns_fGBQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBOBur7enE5uhv8jQoD0AImxqy-GsGz98gw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpU7khTcheFyWCJIla_DxWLHomRTns_fGBQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBOBur7enE5uhv8jQoD0AImxqy-GsGz98gw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpU7khTcheFyWCJIla_DxWLHomRTns_fGBQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBOBur7enE5uhv8jQoD0AImxqy-GsGz98gw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpU7khTcheFyWCJIla_DxWLHomRTns_fGBQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBOBur7enE5uhv8jQoD0AImxqy-GsGz98gw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpU7khTcheFyWCJIla_DxWLHomRTns_fGBQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBOBur7enE5uhv8jQoD0AImxqy-GsGz98gw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpU7khTcheFyWCJIla_DxWLHomRTns_fGBQ&s",
];

const FLAGS = ["🇿🇦","🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧","🇲🇽","🇳🇬","🇹🇭","🇷🇴","🇵🇱"];

// gridMode = true  → fills 2-column grid cell (width: 100%)
// gridMode = false → horizontal row card (fixed width: 200px)
export default function StreamCard({ streamer, index = 0, gridMode = false }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [viewers, setViewers] = useState(
    streamer?.viewers || Math.floor(Math.random() * 30000) + 500
  );

  const photo = PHOTOS[index % PHOTOS.length];
  const flag  = streamer?.region || FLAGS[index % FLAGS.length];
  const name  = streamer?.username || `Model_${index + 1}`;
  const isNew = streamer?.isNew || Math.random() < 0.2;
  const isVR  = streamer?.vr || false;
  const isMob = streamer?.mobile || false;
  const isHD  = streamer?.hd !== undefined ? streamer.hd : Math.random() > 0.4;

  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(100, v + Math.floor(Math.random() * 20) - 9));
    }, 3000 + index * 100);
    return () => clearInterval(id);
  }, [index]);

  const fmtViewers = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <div
      onClick={() => router.push(`/watch/${name}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: gridMode ? "100%" : 160,
        flexShrink: 0,
        flexShrink: gridMode ? undefined : 0,
        borderRadius: 6,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        background: "#111",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered ? "0 8px 28px rgba(0,0,0,0.7)" : "none",
        transition: "transform .2s, box-shadow .2s",
        zIndex: hovered ? 10 : 1,
        animation: `fadeUp .3s ${index * 0.03}s both`,
      }}
    >
      <div style={{ width: "100%", aspectRatio: "3/2", overflow: "hidden", position: "relative" }}>
        {/* Placeholder photo */}
        <img
          src={photo}
          alt={name}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform .3s ease",
          }}
        />

        {/* Bottom gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Top-left badges: HD / VR / Mobile */}
        <div style={{ position: "absolute", top: 6, left: 6, display: "flex", gap: 3 }}>
          {isMob && (
            <span style={{
              background: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,.7)",
              fontSize: 10, padding: "1px 4px", borderRadius: 3,
            }}>📱</span>
          )}
          {isHD && !isVR && (
            <span style={{
              background: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,.85)",
              fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.2)",
            }}>HD</span>
          )}
          {isVR && (
            <span style={{
              background: "#1565c0", color: "#fff",
              fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3,
            }}>VR</span>
          )}
        </div>

        {/* Top-right: NEW badge */}
        {isNew && (
          <div style={{
            position: "absolute", top: 6, right: 6,
            background: "#f0a500", color: "#000",
            fontSize: 9, fontWeight: 800, padding: "2px 6px",
            borderRadius: 3, letterSpacing: ".05em",
          }}>NEW</div>
        )}

        {/* Bottom-left: live dot + viewer count */}
        <div style={{
          position: "absolute", bottom: 22, left: 8,
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: "#e53935",
            display: "inline-block", animation: "pulseDot 1.4s infinite",
          }} />
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
            {fmtViewers(viewers)}
          </span>
        </div>

        {/* Bottom-left: username */}
        <div style={{
          position: "absolute", bottom: 6, left: 8, right: 28,
          fontSize: 11, fontWeight: 600, color: "#fff",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          textShadow: "0 1px 4px rgba(0,0,0,0.9)",
        }}>
          {name}
        </div>

        {/* Bottom-right: flag */}
        <div style={{ position: "absolute", bottom: 6, right: 6, fontSize: 12 }}>
          {flag}
        </div>
      </div>
    </div>
  );
}