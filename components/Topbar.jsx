"use client";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

export default function Topbar({ liveCount }) {
  const [query, setQuery]       = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab]   = useState("login");
  const [user, setUser]         = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  const openLogin    = () => { setAuthTab("login");    setShowAuth(true); };
  const openRegister = () => { setAuthTab("register"); setShowAuth(true); };

  const handleAuthClose = (loggedInUser) => {
    setShowAuth(false);
    if (loggedInUser) setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 50, background: "#fff",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", padding: "0 16px", gap: 12,
      }}>
        {/* Hamburger */}
        <div style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, padding: 6, flexShrink: 0 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ width: 18, height: 2, background: "var(--text)", display: "block", borderRadius: 2 }} />
          ))}
        </div>

        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
          <img src="/stripchatbate-rd.png" alt="Stripchatbate" style={{ height: 32, objectFit: "contain" }} />
        </a>

        {/* Live count */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf50", display: "inline-block", animation: "pulseDot 1.5s infinite" }} />
          {liveCount?.toLocaleString()} LIVE
        </div>

        {/* Top Models */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--muted)", cursor: "pointer", padding: "4px 8px", borderRadius: 6, flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Top Models
        </div>

        {/* Search */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "0 12px", height: 34, width: 280,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Find anything you want"
              style={{ background: "none", border: "none", outline: "none", color: "var(--text)", fontSize: 13, fontFamily: "inherit", width: "100%" }}
            />
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "0 12px", height: 34, cursor: "pointer", fontSize: 12, flexShrink: 0,
          }}>
            ✨ Magic Search
            <span style={{ background: "var(--red2)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 10 }}>3</span>
          </div>
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: "var(--muted)", cursor: "pointer", whiteSpace: "nowrap" }}>About Stripchatbate</span>

          {user ? (
            <>
              <a href="/dashboard" style={{
                background: "rgba(229,57,53,0.12)", border: "1px solid rgba(229,57,53,0.3)",
                color: "#e53935", fontSize: 12, fontWeight: 600,
                padding: "5px 14px", borderRadius: 6, cursor: "pointer",
                textDecoration: "none", whiteSpace: "nowrap",
              }}>
                📡 Dashboard
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "linear-gradient(135deg,#e53935,#8e24aa)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0,
                }}>
                  {user.username?.[0]?.toUpperCase()}
                </div>
                <span style={{ fontSize: 12, color: "var(--text)", whiteSpace: "nowrap" }}>
                  {user.username}
                </span>
                <button onClick={handleLogout} style={{
                  background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                  color: "var(--muted)", fontSize: 11, padding: "4px 10px",
                  borderRadius: 6, cursor: "pointer", fontFamily: "inherit",
                  transition: "all .15s", whiteSpace: "nowrap",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={openRegister} style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.25)", color: "var(--text)",
                fontSize: 12, padding: "5px 14px", borderRadius: 6, cursor: "pointer",
                fontFamily: "inherit", whiteSpace: "nowrap", transition: "background .15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                Create Free Account
              </button>
              <button onClick={openLogin} style={{
                background: "transparent", border: "1px solid var(--red2)", color: "var(--text)",
                fontSize: 12, padding: "5px 14px", borderRadius: 6, cursor: "pointer",
                fontFamily: "inherit", whiteSpace: "nowrap", transition: "background .15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(229,57,53,0.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </header>

      {showAuth && (
        <AuthModal defaultTab={authTab} onClose={handleAuthClose} />
      )}
    </>
  );
}