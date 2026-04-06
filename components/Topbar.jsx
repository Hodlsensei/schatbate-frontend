"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import { useCategory } from "./CategoryContext";

const GENDER_TABS = ["Girls", "Couples", "Guys", "Trans"];

export default function Topbar({ liveCount, onMenuToggle }) {
  const router   = useRouter();
  const pathname = usePathname();
  const isTopModels = pathname?.startsWith("/top-models");

  const [query, setQuery]           = useState("");
  const [showAuth, setShowAuth]     = useState(false);
  const [authTab, setAuthTab]       = useState("login");
  const [user, setUser]             = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile]     = useState(false);
  const inputRef = useRef(null);

  const { category, setCategory } = useCategory();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const hideGenderTabs =
    isTopModels ||
    pathname?.startsWith("/about") ||
    pathname?.startsWith("/watch") ||
    pathname?.startsWith("/shop") ||
    pathname?.startsWith("/dashboard/vip") ||
    pathname?.startsWith("/checkout");

  return (
    <>
      <style>{`
        .search-input::placeholder { color: rgba(255,255,255,0.45); }
        .search-input { caret-color: #fff; }
        .search-input-light::placeholder { color: #aaa; }
        .search-input-light { caret-color: #222; }
      `}</style>

      <div style={{
        position: "relative", top: 0, zIndex: 1000, flexShrink: 0,
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      }}>
        {/* ── MAIN BAR ── */}
        <header style={{
          height: isMobile ? 48 : 52, background: "#fff",
          display: "flex", alignItems: "center", padding: "0 12px", gap: 0,
        }}>
          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12, flexShrink: 0 }}>
            <div onClick={onMenuToggle} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, padding: "6px 4px", flexShrink: 0 }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 18, height: 2, background: "#222", display: "block", borderRadius: 2 }}/>)}
            </div>
            <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", flexShrink: 0, cursor: "pointer" }}>
              <img src="/stripchatbate-rd.png" alt="Stripchatbate" style={{ height: isMobile ? 24 : 30, objectFit: "contain" }}/>
            </div>
            {!isMobile && <div style={{ width: 1, height: 20, background: "#e5e7eb", flexShrink: 0 }}/>}
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: isMobile ? 10 : 12, fontWeight: 700, color: "#222", flexShrink: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf50", display: "inline-block" }}/>
              {(liveCount ?? 11304).toLocaleString()} LIVE
            </div>
            {!isMobile && (
              <>
                <div style={{ width: 1, height: 20, background: "#e5e7eb", flexShrink: 0 }}/>
                <div onClick={() => router.push("/top-models")} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#222", cursor: "pointer", flexShrink: 0, fontWeight: 600, padding: "0 4px" }}
                  onMouseEnter={e => e.currentTarget.style.opacity="0.65"}
                  onMouseLeave={e => e.currentTarget.style.opacity="1"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="1" y="11" width="6" height="10" rx="1"/><rect x="9" y="3" width="6" height="18" rx="1"/><rect x="17" y="8" width="6" height="13" rx="1"/>
                  </svg>
                  Top Models
                </div>
              </>
            )}
          </div>

          {/* MOBILE SEARCH */}
          {isMobile ? (
            <>
              {showSearch ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#7a1515", borderRadius: 20, height: 32, marginLeft: 8, overflow: "hidden" }}>
                  <div style={{ padding: "0 6px 0 10px", display: "flex", alignItems: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  </div>
                  <input className="search-input" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleSearch} placeholder="Find anything you want" autoFocus
                    style={{ background: "none", border: "none", outline: "none", fontSize: 12, fontFamily: "inherit", flex: 1, color: "#fff" }}/>
                  <button onClick={() => { setShowSearch(false); setQuery(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: 14, padding: "0 8px" }}>✕</button>
                </div>
              ) : (
                <button onClick={() => setShowSearch(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", marginLeft: "auto" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
              )}
            </>
          ) : (
            /* DESKTOP SEARCH */
            <>
              <div style={{ flex: 1 }} />
              <div style={{ display: "flex", alignItems: "center", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 24, height: 38, width: 460, flexShrink: 0, overflow: "hidden", cursor: "text", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }} onClick={() => inputRef.current?.focus()}>
                <div style={{ padding: "0 8px 0 14px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <input ref={inputRef} className="search-input-light" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleSearch} placeholder="Find anything you want"
                  style={{ background: "none", border: "none", outline: "none", fontSize: 13, fontFamily: "inherit", flex: 1, color: "#222", minWidth: 0 }}/>
                <div style={{ padding: "0 10px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/><circle cx="7" cy="6" r="2.2" fill="#fff" stroke="#999" strokeWidth="2"/><circle cx="15" cy="12" r="2.2" fill="#fff" stroke="#999" strokeWidth="2"/><circle cx="10" cy="18" r="2.2" fill="#fff" stroke="#999" strokeWidth="2"/></svg>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#e53935", borderRadius: 20, padding: "0 10px 0 9px", height: 28, margin: "0 5px", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", transition: "background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background="#c62828"}
                  onMouseLeave={e => e.currentTarget.style.background="#e53935"}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C12 2 13.2 8.8 14.2 9.8C15.2 10.8 22 12 22 12C22 12 15.2 13.2 14.2 14.2C13.2 15.2 12 22 12 22C12 22 10.8 15.2 9.8 14.2C8.8 13.2 2 12 2 12C2 12 8.8 10.8 9.8 9.8C10.8 8.8 12 2 12 2Z"/></svg>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Magic Search</span>
                  <span style={{ background: "rgba(0,0,0,0.3)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "0 5px", borderRadius: 8, lineHeight: "17px", display: "inline-block", minWidth: 17, textAlign: "center" }}>3</span>
                </div>
              </div>
              <div style={{ flex: 1 }} />
            </>
          )}

          {/* RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10, flexShrink: 0 }}>
            {!isMobile && (
              <span onClick={() => router.push("/about")} style={{ fontSize: 12, color: "#888", cursor: "pointer", whiteSpace: "nowrap", marginRight: 2, transition: "color .15s" }}
                onMouseEnter={e => e.currentTarget.style.color="#222"}
                onMouseLeave={e => e.currentTarget.style.color="#888"}
              >About Stripchatbate</span>
            )}
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: isMobile ? 26 : 30, height: isMobile ? 26 : 30, borderRadius: "50%", background: "linear-gradient(135deg,#e53935,#8e24aa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 10 : 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {user.username?.[0]?.toUpperCase()}
                </div>
                {!isMobile && <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid #ddd", color: "#666", fontSize: 11, padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>Log Out</button>}
              </div>
            ) : (
              <>
                {!isMobile && (
                  <button onClick={openRegister} style={{ background: "#e53935", border: "none", color: "#fff", fontSize: 12, padding: "6px 16px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", fontWeight: 700, transition: "background .15s" }}
                    onMouseEnter={e => e.currentTarget.style.background="#c62828"}
                    onMouseLeave={e => e.currentTarget.style.background="#e53935"}
                  >Create Free Account</button>
                )}
                <button onClick={openLogin} style={{ background: "transparent", border: "1px solid #e5e7eb", color: "#222", fontSize: isMobile ? 11 : 12, padding: isMobile ? "4px 10px" : "5px 14px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Log In</button>
              </>
            )}
          </div>
        </header>

        {/* GENDER TABS */}
        {!hideGenderTabs && (
          <div style={{ background: "#fff", borderTop: "1px solid #f0f0f0", display: "flex", alignItems: "center", padding: "0 12px", gap: isMobile ? 0 : 4, height: 38, overflowX: "auto" }}>
            {GENDER_TABS.map(tab => {
              const key = tab.toLowerCase();
              const active = category === key;
              return (
                <button key={tab} onClick={() => setCategory(key)} style={{
                  background: "none", border: "none",
                  borderBottom: active ? "3px solid #e53935" : "3px solid transparent",
                  color: active ? "#e53935" : "#555",
                  fontSize: isMobile ? 13 : 14, fontWeight: active ? 700 : 500,
                  padding: isMobile ? "0 12px" : "0 14px", height: "100%",
                  cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
                  transition: "color .15s, border-color .15s",
                }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color="#222"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color="#555"; }}
                >{tab}</button>
              );
            })}
          </div>
        )}
      </div>

      {showAuth && <AuthModal defaultTab={authTab} onClose={handleAuthClose}/>}
    </>
  );
}