"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FONT = "'Inter', Helvetica, Roboto, sans-serif";

const PHOTOS = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1502767882942-89f5af0ba7e9?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=267&fit=crop",
  "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=400&h=267&fit=crop",
];

const AFRICAN_PHOTOS = [
  "https://thumb-cdn77.xvideos-cdn.com/7cf709be-1545-4f75-b7b2-91a2bf3c5eff/0/xv_9_p.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/bcc3ad5f-e56d-4031-89dd-9e57b0fb8a66/0/xv_18_p.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/109c8f67-92b4-4462-a1ff-557a9c24fec9/0/xv_8_p.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/1270c747-9119-4cec-a851-5939b0fffb38/0/xv_30_p.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/31873630-628a-4817-990f-68f2b7f9c2a9/0/xv_27_p.jpg",
  "https://ic-nss.flixcdn.com/a/Yzg5MmRiZmM3Y2Q5MzgzODhjNWE3ZDYzMjk5ZTAwOWM/webp%2Cs%28w%3A704%2Ch%3A440%29/xc/nw/nwpmaQ/frame/original/18.jpg",
  "https://www.tongabonga.com/media/thumbs_200/1/320/20060.jpg",
  "https://thumb-cdn77.xvideos-cdn.com/1e1fdc91-f540-4f72-acd2-58ce81d27730/0/xv_4_t.jpg",
];

// Emoji flag → ISO 2-letter country code map
const EMOJI_TO_CODE = {
  "🇿🇦": "za", "🇺🇸": "us", "🇧🇷": "br", "🇨🇴": "co",
  "🇷🇺": "ru", "🇺🇦": "ua", "🇯🇵": "jp", "🇫🇷": "fr",
  "🇩🇪": "de", "🇬🇧": "gb", "🇲🇽": "mx", "🇳🇬": "ng",
  "🇹🇭": "th", "🇷🇴": "ro", "🇵🇱": "pl", "🇬🇷": "gr",
  "🇮🇹": "it", "🇪🇸": "es", "🇨🇿": "cz", "🇸🇪": "se",
  "🇦🇷": "ar", "🇰🇪": "ke", "🇨🇦": "ca", "🇵🇭": "ph",
  "🇮🇳": "in", "🇰🇷": "kr", "🇨🇳": "cn", "🇦🇺": "au",
};

function getFlagCode(flag) {
  if (!flag) return "us";
  // Already an ISO code (2 letters)
  if (typeof flag === "string" && flag.length === 2) return flag.toLowerCase();
  // Emoji flag
  return EMOJI_TO_CODE[flag] || "us";
}

function MobileIcon() {
  return (
    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width={10} height={10} viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" strokeWidth="0">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
  );
}

export default function StreamCard({ streamer, index = 0, gridMode = false, cardHeight }) {
  const router  = useRouter();
  const [viewers, setViewers] = useState(streamer?.viewers || Math.floor(Math.random() * 30000) + 500);

  const isAfrican = !!streamer?.photo && streamer.photo.includes("african");
  const photoPool = isAfrican ? AFRICAN_PHOTOS : PHOTOS;
  const photo      = streamer?.photo || photoPool[index % photoPool.length];
  const flag       = streamer?.region || "us";
  const flagCode   = getFlagCode(flag);
  const name       = streamer?.username || `Model_${index + 1}`;
  const isNew      = streamer?.isNew  || false;
  const isVR       = streamer?.vr     || false;
  const isMob      = streamer?.mobile || Math.random() < 0.35;
  const isHD       = streamer?.hd     !== undefined ? streamer.hd : Math.random() > 0.4;
  const hasPrivate = streamer?.hasPrivate !== undefined ? streamer.hasPrivate : Math.random() < 0.5;

  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(100, v + Math.floor(Math.random() * 20) - 9));
    }, 3000 + index * 100);
    return () => clearInterval(id);
  }, [index]);

  const imageContainerStyle = cardHeight
    ? { width: "100%", height: cardHeight, overflow: "hidden", position: "relative", background: "#1a1a1a" }
    : { width: "100%", aspectRatio: "3/2", overflow: "hidden", position: "relative", background: "#1a1a1a" };

  return (
    <div
      onClick={() => router.push(`/watch/${name}`)}
      style={{
        width: gridMode ? "100%" : 160,
        flexShrink: gridMode ? undefined : 0,
        borderRadius: 0,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        background: "#111",
        animation: `fadeUp .28s ${index * 0.025}s both`,
        transition: "transform .18s ease, box-shadow .18s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={imageContainerStyle}>
        <img
          src={photo}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={e => { e.currentTarget.style.display = "none"; }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.08) 45%,transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* TOP LEFT: mobile + plane + HD/VR badges */}
        <div style={{ position: "absolute", top: 5, left: 5, display: "flex", gap: 3, alignItems: "center" }}>
          {isMob && (
            <span style={{ background: "rgba(0,0,0,0.55)", borderRadius: 3, width: 18, height: 18,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MobileIcon />
            </span>
          )}
          {hasPrivate && (
            <span style={{ background: "rgba(0,0,0,0.55)", borderRadius: 3, width: 18, height: 18,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PlaneIcon />
            </span>
          )}
          {isHD && !isVR && (
            <span style={{
              background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.9)",
              fontSize: 8, fontWeight: 700, padding: "2px 4px", borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.2)", lineHeight: 1.2, fontFamily: FONT,
            }}>HD</span>
          )}
          {isVR && (
            <span style={{ background: "#1565c0", color: "#fff", fontSize: 8, fontWeight: 700,
              padding: "2px 5px", borderRadius: 3, fontFamily: FONT }}>VR</span>
          )}
        </div>

        {/* TOP RIGHT: NEW badge */}
        {isNew && (
          <div style={{
            position: "absolute", top: 5, right: 5,
            background: "#f0a500", color: "#000",
            fontSize: 8, fontWeight: 800, padding: "2px 6px", borderRadius: 3,
            letterSpacing: ".05em", lineHeight: 1.4, fontFamily: FONT,
          }}>NEW</div>
        )}

        {/* BOTTOM: username on left, real flag image on right — matching reference */}
        <div style={{
          position: "absolute",
          bottom: 6,
          left: 6,
          right: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}>
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
            fontFamily: FONT,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textShadow: "0 1px 4px rgba(0,0,0,0.9)",
          }}>
            {name}
          </span>
          <img
            src={`https://flagcdn.com/w20/${flagCode}.png`}
            width={16}
            height={11}
            alt={flagCode}
            style={{ borderRadius: 1, objectFit: "cover", flexShrink: 0, display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}