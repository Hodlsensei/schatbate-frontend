"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AllCategoriesModal from "./AllCategoriesModal";

const FONT   = "'Inter', Helvetica, Roboto, sans-serif";
const BG     = "#EEEEF0";
const HOVER  = "#E3E4E6";
const ACTIVE_BG  = "#fdecea";
const ACTIVE_CLR = "#e5192b";
const MUTED  = "#999";
const TEXT   = "#374151";

const Ico = ({ d, size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const NAV_ICONS = {
  home: (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  ),
  gallery: (
    <Ico d={<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>}/>
  ),
  recommend: (
    <Ico d={<><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></>}/>
  ),
  favorites: (
    <Ico d={<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>}/>
  ),
  privates: <Ico d={<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>}/>,
  history: (
    <Ico d={<><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/><polyline points="12 7 12 12 15 15"/></>}/>
  ),
  shop: (
    <Ico d={<><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></>}/>
  ),
  vip: (
    <Ico d={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>}/>
  ),
};

const NAV = [
  { label: "Home",              href: "/",              icon: "home"      },
  { label: "Gallery",           href: "/gallery",       icon: "gallery"   },
  { label: "Recommended",       href: "/recommended",   icon: "recommend" },
  { label: "My Favorites",      href: "/favorites",     icon: "favorites" },
  { label: "Shop",              href: "/shop",          icon: "shop"      },
  { label: "Best for Privates", href: "/privates",      icon: "privates"  },
  { label: "Watch History",     href: "/history",       icon: "history"   },
  { label: "VIP Membership",    href: "/dashboard/vip", icon: "vip"       },
];

const SPECIALS = [
  { label: "United State",   count: 120,  flagCode: "us"    },
  { label: "United Kingdom", count: 120,  flagCode: "gb"    },
  { label: "Ukrainian",      count: 120,  flagCode: "ua"    },
  { label: "New Models",     count: 1110, icon: "bolt"      },
  { label: "VR Cams",        count: 170,  vr: true          },
  { label: "BDSM",           count: 69,   icon: "bdsm"      },
  { label: "Ticket Shows",   count: 107,  icon: "ticket"    },
];
const AGE = [
  { label: "Teen 18+",  count: 1325 }, { label: "Young 22+", count: 3720 },
  { label: "MILF",      count: 1168 }, { label: "Mature",    count: 176  },
  { label: "Granny",    count: 34   },
];
const ETHNICITY = [
  { label: "Arab",   count: 84   }, { label: "Asian",  count: 941  },
  { label: "Ebony",  count: 619  }, { label: "Indian", count: 342  },
  { label: "Latina", count: 2045 }, { label: "Mixed",  count: 226  },
  { label: "White",  count: 2596 },
];
const BODY_TYPE = [
  { label: "Skinny",   count: 2333 }, { label: "Athletic", count: 599  },
  { label: "Medium",   count: 2281 }, { label: "Curvy",    count: 1343 },
  { label: "BBW",      count: 299  },
];
const HAIR = [
  { label: "Blonde",   count: 1157 }, { label: "Black",    count: 1792 },
  { label: "Brunette", count: 3144 }, { label: "Redhead",  count: 350  },
  { label: "Colorful", count: 346  },
];
const PRIVATE_SHOWS = [
  { label: "8–12 tk",              count: 2917 },
  { label: "16–24 tk",             count: 1961 },
  { label: "32–60 tk",             count: 1577 },
  { label: "90+ tk",               count: 342  },
  { label: "Recordable Privates",  count: 4556 },
  { label: "Spy on Shows",         count: 329  },
  { label: "Video Call (Cam2Cam)", count: 6443 },
];
const POPULAR = [
  { label: "Interactive Toy", count: 3983, icon: "toy"    },
  { label: "Mobile",          count: 1370, icon: "mobile" },
  { label: "Group Sex",       count: 61   },
  { label: "Big Tits",        count: 2793 },
  { label: "Hairy Pussy",     count: 946  },
  { label: "Outdoor",         count: 905  },
  { label: "Big Ass",         count: 3926 },
  { label: "Anal",            count: 2557, hot: true },
  { label: "Squirt",          count: 3034 },
  { label: "Fuck Machine",    count: 620,  hot: true },
  { label: "Hardcore",        count: 194  },
  { label: "Blowjob",         count: 4690, hot: true },
  { label: "Pregnant",        count: 22   },
  { label: "Small Tits",      count: 1995 },
  { label: "Fisting",         count: 714  },
  { label: "Masturbation",    count: 5257 },
  { label: "Shaven",          count: 3348 },
  { label: "Deepthroat",      count: 3745, hot: true },
  { label: "Office",          count: 1038 },
  { label: "Foot Fetish",     count: 4281, hot: true },
];
const FOOTER_LINKS = [
  { label: "About Us",                                 href: "/about" },
  { label: "Blog",                                     href: "#"      },
  { label: "Support & FAQ",                            href: "#"      },
  { label: "Billing Support",                          href: "#"      },
  { label: "Become a Model",                           href: "#"      },
  { label: "Affiliates",                               href: "#"      },
  { label: "Report Content",                           href: "#"      },
  { label: "Media Inquiries",                          href: "#"      },
  { label: "Privacy Policy",                           href: "#"      },
  { label: "Cookie Policy",                            href: "#"      },
  { label: "Terms of Use",                             href: "#"      },
  { label: "All Models",                               href: "#"      },
  { label: "Sitemap",                                  href: "#"      },
  { label: "18 U.S.C. 2257 Record-Keeping Statement", href: "#"      },
];

const LANGUAGES = [
  "English",
  "Deutsch",
  "Français",
  "Español",
  "Italiano",
  "Nederlands",
  "Português (EU)",
  "Português (BR)",
  "Ελληνικά",
  "Українська",
  "Polski",
  "Русский",
  "Română",
  "Magyar",
  "Čeština",
  "Hrvatski",
  "Slovenčina",
  "Norsk",
  "Svenska",
  "Dansk",
  "Suomi",
  "日本語",
  "한국어",
  "中文",
  "繁體中文",
  "ภาษาไทย",
  "বাংলা",
  "Bahasa Indonèsia",
  "Bahasa Melayu",
  "Tiếng Việt",
  "العربية",
  "Türkçe",
];

/* ─── Divider */
const Divider = () => (
  <div style={{ height: 1, background: "#D1D3D4", margin: "20px 0 18px" }} />
);

function SecLabel({ text }) {
  return (
    <div style={{
      padding: "12px 16px 5px",
      fontSize: 11, fontWeight: 700,
      letterSpacing: ".1em", textTransform: "uppercase",
      color: MUTED, fontFamily: FONT,
      lineHeight: 1.2,
    }}>
      {text}
    </div>
  );
}

function SpecialIcon({ flagCode, vr, type }) {
  if (flagCode) return (
    <img src={`https://flagcdn.com/w20/${flagCode}.png`}
      srcSet={`https://flagcdn.com/w40/${flagCode}.png 2x`}
      width={20} height={14} alt={flagCode}
      style={{ borderRadius: 2, objectFit: "cover", display: "block", flexShrink: 0 }}/>
  );
  if (vr) return (
    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 3,
      background: "#8b5cf6", color: "#fff", letterSpacing: ".03em", lineHeight: 1.5 }}>VR</span>
  );
  if (type === "bolt") return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );
  if (type === "toy") return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round">
      <circle cx="17" cy="7" r="3"/><path d="M14.5 9.5L3 21"/>
    </svg>
  );
  if (type === "mobile") return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  );
  return null;
}

function PlainRow({ label, count, hot, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={href} style={{
      display: "flex", alignItems: "center",
      padding: "7px 16px",
      fontSize: 13, fontFamily: FONT, fontWeight: 400,
      color: TEXT, textDecoration: "none",
      background: hov ? HOVER : "transparent",
      transition: "background .12s, transform .1s",
      transform: hov ? "translateX(2px)" : "none",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ flex: 1 }}>
        {label}
        {hot && <span style={{ color: "#f472b6", fontSize: 11, marginLeft: 4 }}>✦✦</span>}
      </span>
      <span style={{ fontSize: 12, color: MUTED, fontWeight: 500 }}>
        {count.toLocaleString()}
      </span>
    </Link>
  );
}

function IconRow({ label, count, flagCode, vr, icon, hot, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={href} style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "7px 16px",
      fontSize: 13, fontFamily: FONT, fontWeight: 400,
      color: TEXT, textDecoration: "none",
      background: hov ? HOVER : "transparent",
      transition: "background .12s, transform .1s",
      transform: hov ? "translateX(2px)" : "none",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ width: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <SpecialIcon flagCode={flagCode} vr={vr} type={icon}/>
      </span>
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
        {hot && <span style={{ color: "#f472b6", fontSize: 11, marginLeft: 4 }}>✦✦</span>}
      </span>
      <span style={{ fontSize: 12, color: MUTED, fontWeight: 500, flexShrink: 0 }}>
        {count.toLocaleString()}
      </span>
    </Link>
  );
}

function NavItem({ item, active, collapsed }) {
  const [hov, setHov] = useState(false);
  const isVip = item.icon === "vip";
  const clr   = isVip ? "#b8860b" : active ? ACTIVE_CLR : hov ? "#222" : TEXT;
  const bg    = active ? (isVip ? "#fffbeb" : ACTIVE_BG) : hov ? HOVER : "transparent";

  return (
    <Link href={item.href} title={collapsed ? item.label : undefined} style={{
      display: "flex", alignItems: "center",
      gap: collapsed ? 0 : 10,
      justifyContent: collapsed ? "center" : "flex-start",
      padding: collapsed ? "11px 0" : "9px 16px",
      color: clr, fontWeight: active ? 700 : 400,
      fontSize: 13, fontFamily: FONT,
      textDecoration: "none", whiteSpace: "nowrap",
      background: bg, position: "relative",
      transition: "background .15s, color .15s, transform .12s",
      transform: (!active && hov && !collapsed) ? "translateX(3px)" : "none",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {active && !collapsed && (
        <span style={{
          position: "absolute", left: 0, top: "10%", bottom: "10%",
          width: 3, borderRadius: "0 3px 3px 0",
          background: isVip ? "#b8860b" : ACTIVE_CLR,
          animation: "activePulse 2.2s ease-in-out infinite",
        }}/>
      )}
      <span style={{
        flexShrink: 0, display: "flex", alignItems: "center",
        justifyContent: "center", width: 18,
        color: active || isVip ? clr : "#555",
      }}>
        {NAV_ICONS[item.icon]}
      </span>
      {!collapsed && (
        <span style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
          {item.label}
          {isVip && (
            <span style={{
              fontSize: 9, fontWeight: 800, padding: "1px 5px", borderRadius: 3,
              background: "linear-gradient(135deg,#b8860b,#ffd700)", color: "#fff",
              letterSpacing: ".05em",
            }}>GOLD</span>
          )}
        </span>
      )}
    </Link>
  );
}

function FooterLink({ label, href = "#" }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={href} style={{
      display: "block", padding: "4px 16px",
      fontSize: 12, fontFamily: FONT,
      color: hov ? TEXT : "#6b7280",
      textDecoration: "none", transition: "color .12s",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {label}
    </Link>
  );
}

function TokensBanner({ collapsed, onClick }) {
  const [hov, setHov] = useState(false);
  if (collapsed) return null;
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        margin: "10px 10px 8px", borderRadius: 8,
        background: hov
          ? "linear-gradient(135deg,#2e7d32,#43a047)"
          : "linear-gradient(135deg,#388e3c,#4caf50)",
        padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
        cursor: "pointer",
        transform: hov ? "translateY(-1px)" : "none",
        boxShadow: hov ? "0 5px 14px rgba(76,175,80,0.4)" : "0 2px 8px rgba(76,175,80,0.3)",
        transition: "all .2s",
      }}>
      <svg width={38} height={38} viewBox="0 0 38 38" fill="none" style={{ flexShrink: 0 }}>
        <ellipse cx="19" cy="29" rx="11" ry="5" fill="#e6a817"/>
        <rect x="8" y="24" width="22" height="5" fill="#e6a817"/>
        <ellipse cx="19" cy="24" rx="11" ry="5" fill="#fdd835"/>
        <ellipse cx="19" cy="21" rx="11" ry="5" fill="#e6a817"/>
        <rect x="8" y="16" width="22" height="5" fill="#e6a817"/>
        <ellipse cx="19" cy="16" rx="11" ry="5" fill="#fdd835"/>
        <ellipse cx="19" cy="13" rx="11" ry="5" fill="#e6a817"/>
        <rect x="8" y="8" width="22" height="5" fill="#e6a817"/>
        <ellipse cx="19" cy="8" rx="11" ry="5" fill="#fdd835"/>
        <ellipse cx="19" cy="8" rx="8" ry="3.2" fill="#f9a825"/>
      </svg>
      <div style={{ lineHeight: 1.3 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: "-.5px", fontFamily: FONT }}>
          50 <span style={{ fontSize: 13, fontWeight: 600 }}>Tokens</span>
        </div>
        <div style={{ color: "rgba(255,255,255,.85)", fontSize: 11, fontFamily: FONT }}>to Win Now</div>
      </div>
    </div>
  );
}

function AllCatsBtn({ collapsed, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
      width: "100%", padding: collapsed ? "9px 0" : "8px 14px",
      border: `1.5px solid ${hov ? ACTIVE_CLR : "#C4C6C8"}`,
      borderRadius: 20,
      background: hov ? ACTIVE_BG : "#F0F1F2",
      color: hov ? ACTIVE_CLR : TEXT,
      fontSize: 11, fontWeight: 700, fontFamily: FONT,
      cursor: "pointer", textTransform: "uppercase", letterSpacing: ".07em",
      transition: "all .15s", boxSizing: "border-box",
    }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <svg width={13} height={13} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2.5}>
        <rect x="3" y="3"   width="7" height="7"/>
        <rect x="14" y="3"  width="7" height="7"/>
        <rect x="3" y="14"  width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
      </svg>
      {!collapsed && "All Categories"}
    </button>
  );
}

/* ─── Language Selector ──────────────────────────────────── */
function LanguageSelector({ collapsed }) {
  const [open, setOpen]   = useState(false);
  const [lang, setLang]   = useState("English");
  const wrapRef           = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  if (collapsed) return (
    <div style={{ padding: "10px 0", textAlign: "center", fontSize: 16 }}>🌐</div>
  );

  return (
    <div ref={wrapRef} style={{ position: "relative", padding: "4px 12px 14px" }}>
      {/* Trigger button */}
      <button onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", gap: 8, width: "100%",
        padding: "8px 10px",
        background: open ? HOVER : "transparent",
        border: "none", borderRadius: 6, cursor: "pointer",
        fontSize: 13, fontFamily: FONT, color: TEXT,
        transition: "background .15s",
      }}>
        <span style={{ fontSize: 15 }}>🌐</span>
        <span style={{ flex: 1, textAlign: "left" }}>{lang}</span>
        <svg width={11} height={11} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2.5}
          style={{ transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Dropdown — opens downward, white bg, checkmark for selected */}
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% - 4px)",
          left: 12, right: 12,
          background: "#ffffff",
          borderRadius: 8,
          zIndex: 200,
          boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
          border: "1px solid #e5e7eb",
          maxHeight: 260,
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#bbb transparent",
        }}>
          {LANGUAGES.map(l => {
            const sel = l === lang;
            return (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 14px",
                  border: "none",
                  cursor: "pointer",
                  background: "transparent",
                  color: sel ? ACTIVE_CLR : TEXT,
                  fontWeight: sel ? 600 : 400,
                  fontSize: 13,
                  fontFamily: FONT,
                  transition: "background .1s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#f3f4f6"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                <span>{l}</span>
                {sel && (
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
                    stroke={ACTIVE_CLR} strokeWidth={2.5}
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Main Sidebar ─────────────────────────────────────────── */
export default function Sidebar({ onOpenAuth, collapsed = false }) {
  const pathname = usePathname();
  const [showCats, setShowCats] = useState(false);

  const openCats  = () => { history.pushState({ cats: true }, "", "#categories"); setShowCats(true); };
  const closeCats = () => { if (location.hash === "#categories") history.back(); else setShowCats(false); };

  useEffect(() => {
    const h = () => { if (showCats) setShowCats(false); };
    window.addEventListener("popstate", h);
    return () => window.removeEventListener("popstate", h);
  }, [showCats]);

  return (
    <>
      <style>{`
        @keyframes activePulse {
          0%,100% { opacity:1; transform:scaleY(1);   }
          50%      { opacity:.5; transform:scaleY(.8); }
        }
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #bbb; border-radius: 4px; }
        .lang-dropdown::-webkit-scrollbar { width: 4px; }
        .lang-dropdown::-webkit-scrollbar-track { background: transparent; }
        .lang-dropdown::-webkit-scrollbar-thumb { background: #bbb; border-radius: 4px; }
      `}</style>

      {showCats && <AllCategoriesModal onClose={closeCats}/>}

      <aside style={{
        width: "100%", height: "100%",
        background: BG,
        display: "flex", flexDirection: "column",
        overflow: "hidden", fontFamily: FONT,
      }}>
        <div
          className="sidebar-scroll"
          style={{
            flex: 1, overflowY: "auto", overflowX: "hidden",
            padding: "8px 0 0",
            scrollbarWidth: "thin", scrollbarColor: "#bbb transparent",
          }}
        >
          <TokensBanner collapsed={collapsed} onClick={onOpenAuth}/>

          {NAV.map(item => (
            <NavItem key={item.href} item={item}
              active={pathname === item.href} collapsed={collapsed}/>
          ))}

          <Divider/>
          {!collapsed && <SecLabel text="Specials"/>}
          {SPECIALS.map(s =>
            collapsed
              ? (
                <div key={s.label} style={{ padding: "8px 0", textAlign: "center" }}>
                  {s.flagCode
                    ? <img src={`https://flagcdn.com/w20/${s.flagCode}.png`} width={20} height={14} alt={s.flagCode} style={{ borderRadius: 2, display: "inline-block" }}/>
                    : s.vr
                      ? <span style={{ fontSize:10,fontWeight:700,padding:"1px 3px",borderRadius:3,background:"#8b5cf6",color:"#fff" }}>VR</span>
                      : s.icon==="bolt"
                        ? <span style={{ color:"#f59e0b",fontSize:14 }}>⚡</span>
                        : null}
                </div>
              )
              : <IconRow key={s.label} label={s.label} count={s.count}
                  flagCode={s.flagCode} vr={s.vr} icon={s.icon}/>
          )}

          {!collapsed && (
            <>
              {/* AGE */}
              <Divider/>
              <SecLabel text="Age"/>
              {AGE.map(s => <PlainRow key={s.label} {...s}/>)}

              {/* ETHNICITY */}
              <div style={{ marginTop: 12 }}>
               <SecLabel text="Ethnicity"/>
              </div>
              {ETHNICITY.map(s => <PlainRow key={s.label} {...s}/>)}

              {/* BODY TYPE */}
              <div style={{ marginTop: 12 }}>
               <SecLabel text="Body Type"/>
              </div> 
              {BODY_TYPE.map(s => <PlainRow key={s.label} {...s}/>)}

              {/* HAIR */}
              <div style={{ marginTop: 12 }}>
               <SecLabel text="Hair"/>
              </div> 
              {HAIR.map(s => <PlainRow key={s.label} {...s}/>)}

              {/* PRIVATE SHOWS */}
              <div style={{ marginTop: 12 }}>
               <SecLabel text="Private Shows"/>
              </div> 
              {PRIVATE_SHOWS.map(s => <PlainRow key={s.label} {...s}/>)}

              {/* POPULAR */}
              <div style={{ marginTop: 12 }}>
               <SecLabel text="Popular"/>
              </div> 
              {POPULAR.map(s =>
                s.icon
                  ? <IconRow key={s.label} {...s}/>
                  : <PlainRow key={s.label} label={s.label} count={s.count} hot={s.hot}/>
              )}

              {/* ALL CATEGORIES — sticky */}
              <div style={{
                position: "sticky",
                bottom: -25,
                zIndex: 20,
                background: BG,
                padding: "10px 12px 30px",
                marginTop: 10,
                boxShadow: '0 20px 0 20px ${BG}',
              }}>
                <AllCatsBtn collapsed={false} onClick={openCats}/>
                <div style={{ height: 1, background: "#D1D3D4", marginTop: 60 }}/>
              </div>

              {/* FOOTER LINKS */}
              <div style={{ marginTop: 20, paddingTop: 20 }}>
                {FOOTER_LINKS.map(l => <FooterLink key={l.label} label={l.label} href={l.href}/>)}
              </div>

              {/* LANGUAGE SELECTOR — above footer links */}
              <Divider/>
              <div style={{  paddingBottom: 140}}>
              <LanguageSelector collapsed={false}/>
              </div>
            </>
          )}

          {collapsed && (
            <div style={{ padding: "10px 6px" }}>
              <AllCatsBtn collapsed={true} onClick={openCats}/>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}