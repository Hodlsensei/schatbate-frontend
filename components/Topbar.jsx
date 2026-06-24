"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import { useCategory } from "./CategoryContext";

const FONT = "'Inter', Helvetica, Roboto, sans-serif";
const GENDER_TABS = ["Girls", "Couples", "Guys", "Trans"];

export default function Topbar({ liveCount, onMenuToggle, sidebarCollapsed }) {
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
    pathname?.startsWith("/about")        ||
    pathname?.startsWith("/watch")        ||
    pathname?.startsWith("/shop")         ||
    pathname?.startsWith("/dashboard/vip") ||
    pathname?.startsWith("/checkout");

  return (
    <>
      <style>{`
        .sc-search-input::placeholder { color: #bbb; }
        .sc-search-input { caret-color: #222; }
        .sc-search-mob::placeholder { color: rgba(255,255,255,0.5); }
        .sc-search-mob { caret-color: #fff; }

        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(76,175,80,0.5); }
          60%       { box-shadow: 0 0 0 5px rgba(76,175,80,0); }
        }
        @keyframes starSpin {
          0%, 100% { transform: scale(1)   rotate(0deg);  }
          50%       { transform: scale(1.25) rotate(20deg); }
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #4caf50; display: inline-block; flex-shrink: 0;
          animation: livePulse 2s ease-in-out infinite;
        }
        .magic-star {
          animation: starSpin 3s ease-in-out infinite;
          display: inline-flex; align-items: center;
        }
        .hamburger-line {
          display: block; width: 18px; height: 2px;
          background: #333; border-radius: 2px;
          transition: transform 0.22s ease, opacity 0.22s ease;
        }
        .gender-tab {
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          padding: 0;
          height: 100%;
          cursor: pointer;
          white-space: nowrap;
          font-family: ${FONT};
          transition: color .15s, border-color .15s;
          display: inline-flex;
          align-items: center;
        }
        .gender-tab.active {
          border-bottom-color: #FCA311;
        }
      `}</style>

      <div style={{
        position: "relative", top: 0, zIndex: 1000, flexShrink: 0,
        fontFamily: FONT,
      }}>

        {/* ── MAIN BAR ── */}
        <header style={{
          height: isMobile ? 48 : 52, background: "#fff",
          borderBottom: "none",
          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
          display: "flex", alignItems: "center", padding: "0 12px", gap: 0,
        }}>

          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12, flexShrink: 0 }}>
            <button
              onClick={onMenuToggle}
              title={sidebarCollapsed ? "Expand menu" : "Collapse menu"}
              style={{
                display: "flex", flexDirection: "column", gap: 4,
                padding: "6px 4px", flexShrink: 0,
                background: "none", border: "none", cursor: "pointer",
              }}
              aria-label="Toggle sidebar"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>

            <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", flexShrink: 0, cursor: "pointer" }}>
              <img src="/stripchatbate-rd.png" alt="Stripchatbate"
                style={{ height: isMobile ? 24 : 30, objectFit: "contain" }} />
            </div>

            {!isMobile && <div style={{ width: 1, height: 20, background: "#e5e7eb", flexShrink: 0 }} />}

            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: isMobile ? 10 : 12, fontWeight: 700, color: "#222", flexShrink: 0 }}>
              <span className="live-dot" />
              {(liveCount ?? 11304).toLocaleString()} LIVE
            </div>

            {!isMobile && (
              <>
                <div style={{ width: 1, height: 20, background: "#e5e7eb", flexShrink: 0 }} />
                <div
                  onClick={() => router.push("/top-models")}
                  style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#222",
                    cursor: "pointer", flexShrink: 0, fontWeight: 600, padding: "0 4px",
                    transition: "opacity .15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.65"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                    <rect x="1" y="11" width="6" height="10" rx="1"/>
                    <rect x="9" y="3"  width="6" height="18" rx="1"/>
                    <rect x="17" y="8" width="6" height="13" rx="1"/>
                  </svg>
                  Top Models
                </div>
              </>
            )}
          </div>

          {/* CENTRE: search */}
          {isMobile ? (
            <>
              {showSearch ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", background: "",
                  borderRadius: 20, height: 32, marginLeft: 8, overflow: "hidden" }}>
                  <div style={{ padding: "0 6px 0 10px", display: "flex", alignItems: "center" }}>
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                  <input className="sc-search-mob" value={query} onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleSearch} placeholder="Find anything you want" autoFocus
                    style={{ background: "none", border: "none", outline: "none", fontSize: 12, fontFamily: FONT, flex: 1, color: "#fff" }} />
                  <button onClick={() => { setShowSearch(false); setQuery(""); }} style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,0.7)", fontSize: 14, padding: "0 8px",
                  }}>✕</button>
                </div>
              ) : (
                <button onClick={() => setShowSearch(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", marginLeft: "auto" }}>
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
              )}
            </>
          ) : (
            <>
              <div style={{ flex: 1 }} />
              <div
                onClick={() => inputRef.current?.focus()}
                style={{
                  display: "flex", alignItems: "center", background: "#fff",
                  border: "1px solid #e5e7eb", borderRadius: 24, height: 38,
                  width: 460, flexShrink: 0, overflow: "hidden", cursor: "text",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  transition: "box-shadow .2s, border-color .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#ccc"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e7eb"}
              >
                <div style={{ padding: "0 8px 0 14px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <input ref={inputRef} className="sc-search-input" value={query}
                  onChange={e => setQuery(e.target.value)} onKeyDown={handleSearch}
                  placeholder="Find anything you want"
                  style={{ background: "none", border: "none", outline: "none", fontSize: 13,
                    fontFamily: FONT, flex: 1, color: "#222", minWidth: 0 }} />
                <div style={{ padding: "0 10px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                    <circle cx="7" cy="6" r="2.2" fill="#fff" stroke="#999" strokeWidth="2"/>
                    <circle cx="15" cy="12" r="2.2" fill="#fff" stroke="#999" strokeWidth="2"/>
                    <circle cx="10" cy="18" r="2.2" fill="#fff" stroke="#999" strokeWidth="2"/>
                  </svg>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 5, background: "#FCA311",
                    borderRadius: 20, padding: "0 10px 0 9px", height: 28, margin: "0 5px",
                    cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", transition: "background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FCA311"}
                  onMouseLeave={e => e.currentTarget.style.background = "#FCA311"}
                >
                  <span className="magic-star">
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="#fff">
                      <path d="M12 2C12 2 13.2 8.8 14.2 9.8C15.2 10.8 22 12 22 12C22 12 15.2 13.2 14.2 14.2C13.2 15.2 12 22 12 22C12 22 10.8 15.2 9.8 14.2C8.8 13.2 2 12 2 12C2 12 8.8 10.8 9.8 9.8C10.8 8.8 12 2 12 2Z"/>
                    </svg>
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: FONT }}>Magic Search</span>
                  <span style={{ background: "rgba(0,0,0,0.3)", color: "#fff", fontSize: 11, fontWeight: 800,
                    padding: "0 5px", borderRadius: 8, lineHeight: "17px", display: "inline-block",
                    minWidth: 17, textAlign: "center" }}>3</span>
                </div>
              </div>
              <div style={{ flex: 1 }} />
            </>
          )}

          {/* RIGHT: auth */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10, flexShrink: 0 }}>
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: isMobile ? 26 : 30, height: isMobile ? 26 : 30,
                  borderRadius: "50%", background: "linear-gradient(135deg,#FCA311,#8e24aa)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isMobile ? 10 : 12, fontWeight: 700, color: "#fff", flexShrink: 0,
                }}>
                  {user.username?.[0]?.toUpperCase()}
                </div>
                {!isMobile && (
                  <button onClick={handleLogout} style={{
                    background: "transparent", border: "1px solid #ddd", color: "#666",
                    fontSize: 11, padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontFamily: FONT,
                  }}>Log Out</button>
                )}
              </div>
            ) : (
              <>
                {!isMobile && (
                  <button onClick={openRegister} style={{
                    background: "#FCA311", border: "none", color: "#fff", fontSize: 12,
                    padding: "6px 16px", borderRadius: 20, cursor: "pointer", fontFamily: FONT,
                    whiteSpace: "nowrap", fontWeight: 700, transition: "background .15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FCA311"}
                  onMouseLeave={e => e.currentTarget.style.background = "#FCA311"}>
                    Create Free Account
                  </button>
                )}
                <button onClick={openLogin} style={{
                  background: "transparent", border: "1px solid #e5e7eb", color: "#222",
                  fontSize: isMobile ? 11 : 12, padding: isMobile ? "4px 10px" : "5px 14px",
                  borderRadius: 20, cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap",
                }}>Log In</button>
              </>
            )}
          </div>
        </header>

        {/* ── GENDER TABS ── */}
        {!hideGenderTabs && (
          <div style={{
            width: "100%", boxSizing: "border-box",
            background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center",
            height: 42, padding: "0 12px",
            gap: isMobile ? 20 : 45,
          }}>
            {GENDER_TABS.map(tab => {
              const key    = tab.toLowerCase();
              const active = category === key;
              return (
                <button
                  key={tab}
                  onClick={() => setCategory(key)}
                  className={`gender-tab${active ? " active" : ""}`}
                  style={{
                    color: active ? "#FCA311" : "#555",
                    fontSize: isMobile ? 13 : 14,
                    fontWeight: active ? 700 : 500,
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#222"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#555"; }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {showAuth && <AuthModal defaultTab={authTab} onClose={handleAuthClose} />}
    </>
  );
}