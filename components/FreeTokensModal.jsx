"use client";
import { useState } from "react";

const IcoClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#aaa">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);
const IcoWand = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#aaa">
    <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a1 1 0 00-1.41 0L1.29 18.96a1 1 0 000 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05a1 1 0 000-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/>
  </svg>
);
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// ── 50 FREE TOKENS graphic ────────────────────────────────────────────────────
const FreeTokensGraphic = () => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 0 10px" }}>
    {/* Big 50 with coins */}
    <div style={{ position:"relative", width:220, height:180, display:"flex", alignItems:"center", justifyContent:"center" }}>
      {/* Floating coins */}
      <div style={{ position:"absolute", top:10, left:20, fontSize:32 }}>🪙</div>
      <div style={{ position:"absolute", top:0, left:60, fontSize:26 }}>🪙</div>
      <div style={{ position:"absolute", top:5, right:25, fontSize:30 }}>🪙</div>
      <div style={{ position:"absolute", top:30, right:10, fontSize:22 }}>🪙</div>
      <div style={{ position:"absolute", bottom:30, left:10, fontSize:24 }}>🪙</div>
      <div style={{ position:"absolute", bottom:20, right:20, fontSize:28 }}>🪙</div>
      <div style={{ position:"absolute", bottom:10, left:50, fontSize:20 }}>🪙</div>
      {/* Big 50 text */}
      <div style={{
        fontSize: 120,
        fontWeight: 900,
        color: "#2e7d32",
        lineHeight: 1,
        textShadow: "4px 4px 0px #1b5e20, 8px 8px 0px rgba(0,0,0,0.3)",
        fontFamily: "Arial Black, Arial, sans-serif",
        letterSpacing: -4,
        zIndex: 1,
      }}>50</div>
    </div>

    {/* FREE TOKENS text */}
    <div style={{ textAlign:"center", marginTop:-10 }}>
      <div style={{ fontSize:28, fontWeight:900, color:"#4caf50", letterSpacing:2, fontFamily:"Arial Black, Arial, sans-serif" }}>FREE</div>
      <div style={{ fontSize:28, fontWeight:900, color:"#4caf50", letterSpacing:2, fontFamily:"Arial Black, Arial, sans-serif" }}>TOKENS</div>
      <div style={{ fontSize:14, color:"#aaa", fontStyle:"italic", marginTop:4 }}>in the hourly draw</div>
    </div>
  </div>
);

// ── Perks list ────────────────────────────────────────────────────────────────
const perks = [
  { icon:"💬", text:"Chat with", bold:"models" },
  { icon:"🎮", text:"Play with", bold:"interactive sex toys" },
  { icon:"❤️", text:"Have fun in", bold:"Private shows" },
  { icon:"🎁", text:"Take part in", bold:"giveaways" },
  { icon:"🔖", text:"Save favorite", bold:"models & content" },
];

export default function FreeTokensModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [verified, setVerified] = useState(false);

  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:99999, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}
      onClick={onClose}
    >
      {/* Logo bar at top */}
      <div style={{ position:"fixed", top:0, left:0, right:0, height:50, display:"flex", alignItems:"center", justifyContent:"center", zIndex:100000, pointerEvents:"none" }}>
        <div style={{ background:"rgba(20,20,20,0.95)", padding:"6px 20px", borderRadius:8, display:"flex", alignItems:"center", gap:8 }}>
          {/* Stripchatbate logo */}
          <svg width="28" height="28" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#e5342a"/>
            <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff" fontFamily="Arial">SC</text>
          </svg>
          <span style={{ fontSize:16, fontWeight:800, color:"#fff", letterSpacing:0.5 }}>STRIPCHATBATE</span>
        </div>
      </div>

      <div
        style={{ width:"min(860px,96vw)", background:"#1a0a0a", borderRadius:14, overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 1fr", position:"relative" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14, background:"rgba(255,255,255,0.1)", border:"none", cursor:"pointer", width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10 }}
          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}
        >
          <IcoClose/>
        </button>

        {/* ── LEFT: Form ── */}
        <div style={{ padding:"48px 40px 40px", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:24, textAlign:"center" }}>
            Create Free Account
          </div>

          {/* Username */}
          <div style={{ position:"relative", width:"100%", marginBottom:14 }}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
              style={{ width:"100%", padding:"13px 44px 13px 16px", background:"#2a1a1a", border:"1px solid #3a2a2a", borderRadius:8, color:"#fff", fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
              onFocus={e => e.target.style.borderColor="#4caf50"}
              onBlur={e => e.target.style.borderColor="#3a2a2a"}
            />
            <span style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><IcoWand/></span>
          </div>

          {/* Cloudflare */}
          <div onClick={() => setVerified(!verified)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", background:"#2a1a1a", border:"1px solid #3a2a2a", borderRadius:6, marginBottom:14, cursor:"pointer", boxSizing:"border-box" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:20, height:20, borderRadius:3, border: verified?"none":"2px solid #555", background: verified?"#4caf50":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {verified && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontSize:13, color:"#ccc" }}>Verify you are human</span>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <svg width="22" height="16" viewBox="0 0 100 70"><path d="M78 44c0-8-6-14-14-14-1 0-2 0-3 1C59 24 52 18 44 18c-10 0-18 8-18 18 0 1 0 2 1 3C20 40 16 45 16 51c0 7 6 12 13 12h49c7 0 12-5 12-12 0-4-3-7-6-8l-6 1z" fill="#f6821f"/></svg>
                <span style={{ fontSize:10, fontWeight:700, color:"#aaa" }}>CLOUDFLARE</span>
              </div>
              <span style={{ fontSize:9, color:"#666" }}>Privacy • Help</span>
            </div>
          </div>

          {/* Create Account button */}
          <button style={{ width:"100%", padding:"14px 0", borderRadius:8, background: verified?"linear-gradient(135deg,#4caf50,#2e7d32)":"#2a1a1a", border:"none", color: verified?"#fff":"#555", fontSize:15, fontWeight:700, cursor: verified?"pointer":"not-allowed", fontFamily:"inherit", marginBottom:20, transition:"all .2s" }}>
            Create Account
          </button>

          {/* Divider */}
          <div style={{ width:"100%", display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
            <div style={{ flex:1, height:1, background:"#333" }}/>
            <span style={{ fontSize:12, color:"#666" }}>or continue with</span>
            <div style={{ flex:1, height:1, background:"#333" }}/>
          </div>

          {/* Social */}
          <div style={{ width:"100%", display:"flex", gap:10, marginBottom:14 }}>
            <button style={{ flex:1, padding:"11px 0", borderRadius:8, background:"#2a1a1a", border:"1px solid #3a2a2a", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
              onMouseEnter={e => e.currentTarget.style.borderColor="#555"}
              onMouseLeave={e => e.currentTarget.style.borderColor="#3a2a2a"}
            ><GoogleIcon/></button>
            <button style={{ flex:1, padding:"11px 0", borderRadius:8, background:"#2a1a1a", border:"1px solid #3a2a2a", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
              onMouseEnter={e => e.currentTarget.style.borderColor="#555"}
              onMouseLeave={e => e.currentTarget.style.borderColor="#3a2a2a"}
            ><XIcon/></button>
          </div>

          {/* Continue without email */}
          <button style={{ width:"100%", padding:"11px 0", borderRadius:8, background:"#2a1a1a", border:"1px solid #3a2a2a", color:"#bbb", fontSize:13, cursor:"pointer", fontFamily:"inherit", marginBottom:14 }}
            onMouseEnter={e => e.currentTarget.style.borderColor="#555"}
            onMouseLeave={e => e.currentTarget.style.borderColor="#3a2a2a"}
          >
            Continue Without Email
          </button>

          {/* Log in */}
          <div style={{ fontSize:13, color:"#888", textAlign:"center" }}>
            Already have an account?{" "}
            <span style={{ color:"#4caf50", cursor:"pointer", fontWeight:600 }}
              onMouseEnter={e => e.currentTarget.style.textDecoration="underline"}
              onMouseLeave={e => e.currentTarget.style.textDecoration="none"}
            >Log In</span>
          </div>
        </div>

        {/* ── RIGHT: 50 Free Tokens ── */}
        <div style={{ background:"linear-gradient(160deg, #3a0a0a 0%, #1a0505 60%, #0d1a0d 100%)", padding:"40px 32px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <FreeTokensGraphic/>

          {/* Perks */}
          <div style={{ width:"100%", marginTop:16, display:"flex", flexDirection:"column", gap:12 }}>
            {perks.map(p => (
              <div key={p.bold} style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:18, flexShrink:0 }}>{p.icon}</span>
                <span style={{ fontSize:14, color:"#ccc" }}>
                  {p.text} <strong style={{ color:"#fff" }}>{p.bold}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}