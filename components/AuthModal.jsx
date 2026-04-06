"use client";
import { useState, useEffect } from "react";

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
const IcoEye = ({ show }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {show ? (
      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
    ) : (
      <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
    )}
  </svg>
);
const IcoStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#a78bfa" stroke="none">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
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

const SLIDE_IMAGES = [
  { url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80", name: "lianh_benet" },
  { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80", name: "aurora_x" },
  { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80", name: "kira_storm" },
  { url: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600&q=80", name: "luna_rose" },
  { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80", name: "violet_dream" },
  { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80", name: "scarlet_vr" },
];

const PERKS = [
  { icon: "💬", text: "Chat with ",     bold: "models" },
  { icon: "🎮", text: "Play with ",     bold: "interactive sex toys" },
  { icon: "❤️", text: "Have fun in ",   bold: "Private shows" },
  { icon: "🎁", text: "Take part in ",  bold: "giveaways" },
  { icon: "🔖", text: "Save favorite ", bold: "models & content" },
];

function CloudflareVerify({ verified, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      width: "100%", display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "13px 16px",
      background: "#2a1a1a", border: "1px solid #3a2a2a",
      borderRadius: 6, cursor: "pointer", boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 3,
          border: verified ? "none" : "2px solid #555",
          background: verified ? "#4caf50" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {verified && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <span style={{ fontSize: 13, color: "#ccc" }}>Verify you are human</span>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="22" height="16" viewBox="0 0 100 70">
            <path d="M78 44c0-8-6-14-14-14-1 0-2 0-3 1C59 24 52 18 44 18c-10 0-18 8-18 18 0 1 0 2 1 3C20 40 16 45 16 51c0 7 6 12 13 12h49c7 0 12-5 12-12 0-4-3-7-6-8l-6 1z" fill="#f6821f"/>
          </svg>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#aaa" }}>CLOUDFLARE</span>
        </div>
        <span style={{ fontSize: 9, color: "#666" }}>Privacy • Help</span>
      </div>
    </div>
  );
}

function SocialButtons() {
  return (
    <div style={{ width: "100%", display: "flex", gap: 10 }}>
      {[<GoogleIcon key="g"/>, <XIcon key="x"/>].map((Icon, i) => (
        <button key={i} style={{
          flex: 1, padding: "11px 0", borderRadius: 8, background: "#2a1a1a",
          border: "1px solid #3a2a2a", display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer",
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#555"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#3a2a2a"}
        >{Icon}</button>
      ))}
    </div>
  );
}

function RightPanel() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % SLIDE_IMAGES.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: "relative", overflow: "hidden",
      background: "#0d0d0d",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      minHeight: 300,
    }}>
      {SLIDE_IMAGES.map((img, i) => (
        <img key={img.url} src={img.url} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "top center",
          opacity: i === current ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
        }}/>
      ))}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.93) 100%)",
      }}/>
      <div style={{
        position: "absolute", top: 12, left: 0, right: 0, zIndex: 2,
        display: "flex", justifyContent: "center", gap: 5,
      }}>
        {SLIDE_IMAGES.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 20 : 6, height: 6, borderRadius: 3,
            background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
            cursor: "pointer", transition: "all 0.3s ease",
          }}/>
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 2, padding: "0 20px 28px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {PERKS.map(p => (
          <div key={p.bold} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9, width: "100%", justifyContent: "center" }}>
            <span style={{ fontSize: 16, flexShrink: 0, width: 22, textAlign: "center" }}>{p.icon}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontFamily: "Inter, -apple-system, sans-serif", minWidth: 0 }}>
              {p.text}<strong style={{ color: "#fff", fontWeight: 700 }}>{p.bold}</strong>
            </span>
          </div>
        ))}
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 8, marginBottom: 0 }}>
          Model on photo: {SLIDE_IMAGES[current].name}
        </p>
      </div>
    </div>
  );
}

function DarkInput({ placeholder, type = "text", value, onChange, rightIcon }) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          width: "100%", padding: "13px 44px 13px 16px",
          background: "#2a1a1a", border: "1px solid #3a2a2a",
          borderRadius: 8, color: "#fff", fontSize: 14, outline: "none",
          fontFamily: "inherit", boxSizing: "border-box",
        }}
        onFocus={e => e.target.style.borderColor = "#4caf50"}
        onBlur={e => e.target.style.borderColor = "#3a2a2a"}
      />
      {rightIcon && (
        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", cursor: rightIcon.onClick ? "pointer" : "default" }}
          onClick={rightIcon.onClick}>
          {rightIcon.node}
        </span>
      )}
    </div>
  );
}

function LoginView({ onSwitch, onClose, isMobile }) {
  const [identifier, setIdentifier] = useState("");
  const [password,   setPassword]   = useState("");
  const [showPw,     setShowPw]     = useState(false);
  const [verified,   setVerified]   = useState(false);
  const ready = identifier.trim() && password.trim() && verified;

  return (
    <div style={{
      width: isMobile ? "94vw" : "min(480px,94vw)",
      background: "#1a0a0a", borderRadius: 14,
      padding: isMobile ? "40px 20px 28px" : "52px 40px 36px",
      position: "relative",
      fontFamily: "Inter, -apple-system, 'Segoe UI', sans-serif",
      maxHeight: "90vh", overflowY: "auto",
    }} onClick={e => e.stopPropagation()}>
      <button onClick={onClose} style={{
        position: "absolute", top: 14, right: 14,
        background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer",
        width: 32, height: 32, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}><IcoClose/></button>

      <h2 style={{ color: "#fff", fontSize: isMobile ? 18 : 22, fontWeight: 800, textAlign: "center", marginBottom: 20, marginTop: 0 }}>Log In</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DarkInput placeholder="Username or Email" value={identifier} onChange={e => setIdentifier(e.target.value)}/>
        <DarkInput placeholder="Password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
          rightIcon={{ node: <IcoEye show={showPw}/>, onClick: () => setShowPw(p => !p) }}/>
        <CloudflareVerify verified={verified} onToggle={() => setVerified(v => !v)} />
        <button style={{
          width: "100%", padding: "14px 0", borderRadius: 8,
          background: ready ? "linear-gradient(135deg,#4caf50,#2e7d32)" : "#2a1a1a",
          border: "none", color: ready ? "#fff" : "#555",
          fontSize: 15, fontWeight: 700, cursor: ready ? "pointer" : "not-allowed",
          fontFamily: "inherit",
        }}>Log In</button>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: 13, color: "#4caf50", cursor: "pointer", fontWeight: 500 }}>Forgot password?</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#333" }}/><span style={{ fontSize: 12, color: "#666" }}>or log in with</span><div style={{ flex: 1, height: 1, background: "#333" }}/>
        </div>
        <SocialButtons/>
        <button style={{
          width: "100%", padding: "11px 0", borderRadius: 8,
          background: "#2a1a1a", border: "1px solid #3a2a2a",
          color: "#bbb", fontSize: 13, cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}><IcoStar/>Log In without Password</button>
        <div style={{ fontSize: 13, color: "#888", textAlign: "center", marginTop: 4 }}>
          Don&apos;t have an account?{" "}
          <span style={{ color: "#4caf50", cursor: "pointer", fontWeight: 600 }} onClick={onSwitch}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

function RegisterView({ onSwitch, onClose, isMobile }) {
  const [username, setUsername] = useState("");
  const [verified, setVerified] = useState(false);

  return (
    <div style={{
      width: isMobile ? "94vw" : "min(860px,96vw)",
      background: "#1a0a0a", borderRadius: 14,
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      position: "relative",
      fontFamily: "Inter, -apple-system, 'Segoe UI', sans-serif",
      maxHeight: "90vh", overflowY: "auto",
    }} onClick={e => e.stopPropagation()}>

      <button onClick={onClose} style={{
        position: "absolute", top: 14, right: 14, zIndex: 10,
        background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer",
        width: 32, height: 32, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}><IcoClose/></button>

      {/* Form */}
      <div style={{ padding: isMobile ? "40px 20px 28px" : "48px 40px 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ color: "#fff", fontSize: isMobile ? 18 : 22, fontWeight: 800, marginBottom: 20, marginTop: 0, textAlign: "center" }}>
          Create Free Account
        </h2>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <DarkInput placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} rightIcon={{ node: <IcoWand/> }}/>
          <CloudflareVerify verified={verified} onToggle={() => setVerified(v => !v)} />
          <button style={{
            width: "100%", padding: "14px 0", borderRadius: 8,
            background: verified ? "linear-gradient(135deg,#4caf50,#2e7d32)" : "#2a1a1a",
            border: "none", color: verified ? "#fff" : "#555",
            fontSize: 15, fontWeight: 700, cursor: verified ? "pointer" : "not-allowed",
            fontFamily: "inherit",
          }}>Create Account</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: "#333" }}/><span style={{ fontSize: 12, color: "#666" }}>or continue with</span><div style={{ flex: 1, height: 1, background: "#333" }}/>
          </div>
          <SocialButtons/>
          <button style={{
            width: "100%", padding: "11px 0", borderRadius: 8,
            background: "#2a1a1a", border: "1px solid #3a2a2a",
            color: "#bbb", fontSize: 13, cursor: "pointer", fontFamily: "inherit",
          }}>Continue Without Email</button>
          <div style={{ fontSize: 13, color: "#888", textAlign: "center" }}>
            Already have an account?{" "}
            <span style={{ color: "#4caf50", cursor: "pointer", fontWeight: 600 }} onClick={onSwitch}>Log In</span>
          </div>
        </div>
      </div>

      {/* Right panel — hidden on mobile */}
      {!isMobile && <RightPanel/>}
    </div>
  );
}

export default function AuthModal({ onClose, defaultTab = "register" }) {
  const [view, setView] = useState(defaultTab);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "rgba(0,0,0,0.82)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: isMobile ? 8 : 16,
      overflowY: "auto",
    }} onClick={onClose}>
      {view === "login"
        ? <LoginView onSwitch={() => setView("register")} onClose={onClose} isMobile={isMobile}/>
        : <RegisterView onSwitch={() => setView("login")} onClose={onClose} isMobile={isMobile}/>
      }
    </div>
  );
}