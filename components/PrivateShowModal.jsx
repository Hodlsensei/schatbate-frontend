"use client";
import { useState } from "react";

const ACTIVITIES = [
  "Doggy Style","Ahegao","Spanking","Kissing","Rimming","Camel Toe",
  "Fingering","Blowjob","Tittyfuck","Footjob",
];

const EXCLUSIVE_EXTRAS = [
  "69 Position","Anal","Dildo or Vibrator","Rubbing","Deepthroat",
  "Glory Hole","Ejaculation","Facesitting","Facial",
];

// FIX: SVG heart icon to match the target screenshot (solid filled heart)
const HeartIcon = ({ color = "#fff", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// FIX: Camera icon for Cam2Cam (SVG instead of emoji)
const CamIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f0a500">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
  </svg>
);

// FIX: Block/no icon for "nobody can spy"
const BlockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#aaa">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
  </svg>
);

// FIX: Video/record icon
const VideoIcon = ({ color = "#aaa" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
  </svg>
);

export default function PrivateShowModal({ username, avatarUrl, avatarColor, privatePrice, onClose, onStart }) {
  const [selected, setSelected]             = useState("private");
  const [showMorePrivate, setShowMorePrivate]     = useState(false);
  const [showMoreExclusive, setShowMoreExclusive] = useState(false);

  const exclusivePrice = privatePrice * 2;
  const initial = username?.[0]?.toUpperCase() || "?";

  const handleStart = () => {
    onStart?.(selected, selected === "private" ? privatePrice : exclusivePrice);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:2000,
        background:"rgba(0,0,0,0.82)", backdropFilter:"blur(5px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background:"#1a1a1a", border:"1px solid rgba(255,255,255,0.1)",
          borderRadius:16, width:"100%", maxWidth:700,
          animation:"fadeUp .2s ease both", overflow:"hidden",
        }}
      >
        {/* ── HEADER ── */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"18px 24px", borderBottom:"1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            {/* FIX: Show real avatar image if provided */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={username}
                style={{
                  width:48, height:48, borderRadius:"50%", flexShrink:0,
                  objectFit:"cover", border:"2px solid rgba(255,255,255,0.15)",
                  position:"relative",
                }}
                onError={e => { e.currentTarget.style.display="none"; e.currentTarget.nextSibling.style.display="flex"; }}
              />
            ) : null}
            {/* Fallback letter avatar */}
            <div style={{
              width:48, height:48, borderRadius:"50%",
              background: avatarColor || "linear-gradient(135deg,#e53935,#8e24aa)",
              display: avatarUrl ? "none" : "flex",
              alignItems:"center", justifyContent:"center",
              fontSize:20, fontWeight:700, color:"#fff",
              border:"2px solid rgba(255,255,255,0.15)", flexShrink:0, position:"relative",
            }}>
              {initial}
              <div style={{
                position:"absolute", bottom:2, right:2,
                width:10, height:10, borderRadius:"50%",
                background:"#4caf50", border:"2px solid #1a1a1a",
              }}/>
            </div>

            <div>
              <div style={{ fontSize:12, color:"#888", marginBottom:2 }}>Start a Private show with</div>
              <div style={{ fontSize:17, fontWeight:700, color:"#fff" }}>{username}</div>
            </div>
          </div>

          {/* Rating + close */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:11, color:"#888", marginBottom:3 }}>12 ratings</div>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <span style={{ fontSize:20, fontWeight:700, color:"#fff" }}>4.8</span>
                <div style={{ display:"flex", gap:2 }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24"
                      fill={i <= 4 ? "#f0a500" : "none"}
                      stroke={i <= 4 ? "#f0a500" : "#555"}
                      strokeWidth="2"
                    >
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={onClose} style={{
              background:"rgba(255,255,255,0.07)", border:"none", color:"#aaa",
              width:34, height:34, borderRadius:"50%", cursor:"pointer",
              fontSize:16, display:"flex", alignItems:"center", justifyContent:"center",
              marginLeft:8,
            }}>✕</button>
          </div>
        </div>

        {/* ── TWO CARDS ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, padding:20 }}>

          {/* ── Private card ── */}
          <div
            onClick={() => setSelected("private")}
            style={{
              background: selected === "private" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
              border:`2px solid ${selected === "private" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
              borderRadius:12, padding:20, cursor:"pointer", transition:"all .2s",
            }}
          >
            {/* FIX: Solid SVG heart on grey circle — matches target screenshot */}
            <div style={{ textAlign:"center", marginBottom:14 }}>
              <div style={{
                width:60, height:60, borderRadius:"50%",
                background:"rgba(255,255,255,0.12)",
                display:"inline-flex", alignItems:"center", justifyContent:"center",
              }}>
                <HeartIcon color="#fff" size={26}/>
              </div>
            </div>

            <div style={{ textAlign:"center", fontSize:20, fontWeight:700, color:"#fff", marginBottom:16 }}>
              Private
            </div>

            <button
              onClick={handleStart}
              style={{
                width:"100%", background:"#f0a500", border:"none", color:"#000",
                fontSize:15, fontWeight:700, padding:"12px 0", borderRadius:30,
                cursor:"pointer", fontFamily:"inherit", marginBottom:8, transition:"opacity .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity=".88"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >
              Start {privatePrice} tk/min
            </button>

            <div style={{ textAlign:"center", fontSize:12, color:"#888", marginBottom:16 }}>
              Minimum <strong style={{ color:"#ccc" }}>10 min</strong>
              <span style={{ marginLeft:4, color:"#555", cursor:"pointer" }}>ⓘ</span>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, padding:"0 4px" }}>
              <VideoIcon color="#aaa"/>
              <span style={{ fontSize:13, color:"#aaa" }}>You get recording of show</span>
              <span style={{ color:"#555", cursor:"pointer", fontSize:12 }}>ⓘ</span>
            </div>

            <div style={{
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:8, padding:"14px 12px",
            }}>
              <div style={{ fontSize:12, color:"#888", marginBottom:8, textAlign:"center" }}>You can enjoy:</div>
              <div style={{ fontSize:12, color:"#ccc", lineHeight:1.8, textAlign:"center" }}>
                {(showMorePrivate ? ACTIVITIES : ACTIVITIES.slice(0, 6)).join(", ")}
              </div>
              <button
                onClick={e => { e.stopPropagation(); setShowMorePrivate(v => !v); }}
                style={{ background:"none", border:"none", color:"#888", fontSize:12, cursor:"pointer", marginTop:8, width:"100%", textDecoration:"underline", fontFamily:"inherit" }}
              >
                {showMorePrivate ? "Show less" : "Show more"}
              </button>
            </div>
          </div>

          {/* ── Exclusive Private card ── */}
          <div
            onClick={() => setSelected("exclusive")}
            style={{
              // FIX: Warm dark brown background matching the target screenshot
              background: selected === "exclusive" ? "rgba(240,165,0,0.10)" : "rgba(240,165,0,0.05)",
              border:`2px solid ${selected === "exclusive" ? "#f0a500" : "rgba(240,165,0,0.25)"}`,
              borderRadius:12, padding:20, cursor:"pointer", transition:"all .2s",
            }}
          >
            {/* FIX: Solid SVG heart on GOLD circle — key difference from Private card */}
            <div style={{ textAlign:"center", marginBottom:14 }}>
              <div style={{
                width:60, height:60, borderRadius:"50%",
                background:"#f0a500",  // ← solid gold background
                display:"inline-flex", alignItems:"center", justifyContent:"center",
              }}>
                <HeartIcon color="#fff" size={26}/>
              </div>
            </div>

            <div style={{ textAlign:"center", fontSize:20, fontWeight:700, color:"#f0a500", marginBottom:16 }}>
              Exclusive Private
            </div>

            <button
              onClick={handleStart}
              style={{
                width:"100%", background:"#f0a500", border:"none", color:"#000",
                fontSize:15, fontWeight:700, padding:"12px 0", borderRadius:30,
                cursor:"pointer", fontFamily:"inherit", marginBottom:8, transition:"opacity .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity=".88"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >
              Start {exclusivePrice} tk/min
            </button>

            <div style={{ textAlign:"center", fontSize:12, color:"#888", marginBottom:16 }}>
              Minimum <strong style={{ color:"#ccc" }}>10 min</strong>
              <span style={{ marginLeft:4, color:"#555", cursor:"pointer" }}>ⓘ</span>
            </div>

            {/* FIX: SVG icons instead of emoji */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16, padding:"0 4px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <CamIcon/>
                <span style={{ fontSize:13, color:"#f0a500" }}>Video call (Cam2Cam) available</span>
                <span style={{ color:"#555", cursor:"pointer", fontSize:12 }}>ⓘ</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                {/* FIX: Eye-slash / no-spy icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#aaa">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
                <span style={{ fontSize:13, color:"#aaa" }}>Nobody can spy on show</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <VideoIcon color="#aaa"/>
                <span style={{ fontSize:13, color:"#aaa" }}>Only you get recording of show</span>
                <span style={{ color:"#555", cursor:"pointer", fontSize:12 }}>ⓘ</span>
              </div>
            </div>

            <div style={{
              background:"rgba(240,165,0,0.07)", border:"1px solid rgba(240,165,0,0.18)",
              borderRadius:8, padding:"14px 12px",
            }}>
              <div style={{ fontSize:12, color:"#f0a500", marginBottom:8, textAlign:"center" }}>
                Enjoy all Private activities and also:
              </div>
              <div style={{ fontSize:12, color:"#ccc", lineHeight:1.8, textAlign:"center" }}>
                {(showMoreExclusive ? EXCLUSIVE_EXTRAS : EXCLUSIVE_EXTRAS.slice(0, 5)).join(", ")}
              </div>
              <button
                onClick={e => { e.stopPropagation(); setShowMoreExclusive(v => !v); }}
                style={{ background:"none", border:"none", color:"#888", fontSize:12, cursor:"pointer", marginTop:8, width:"100%", textDecoration:"underline", fontFamily:"inherit" }}
              >
                {showMoreExclusive ? "Show less" : "Show more"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}