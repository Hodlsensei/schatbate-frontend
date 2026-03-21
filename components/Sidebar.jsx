"use client";
import { useState } from "react";

const navItems = [
  { icon: "🏠", label: "Home" },
  { icon: "🖼️", label: "Gallery" },
  { icon: "👍", label: "Recommended" },
  { icon: "❤️", label: "My Favorites" },
  { icon: "💬", label: "Best for Privates" },
  { icon: "🕑", label: "Watch History" },
];

const specials = [
  { flag: "🇬🇧", label: "United Kingdom", count: 203  },
  { flag: "🇺🇸", label: "United States",  count: 874  },
  { flag: "🇺🇦", label: "Ukrainian",      count: 167  },
  { icon: "⚡",   label: "New Models",     count: 1299 },
  { isVr: true,   label: "VR Cams",        count: 143  },
  { icon: "🦮",   label: "BDSM",           count: 97   },
  { icon: "🎟️",  label: "Ticket Shows",   count: 152  },
];

const age = [
  { label: "Teen 18+",  count: 1456 },
  { label: "Young 22+", count: 3961 },
  { label: "MILF",      count: 1337 },
  { label: "Mature",    count: 240  },
  { label: "Granny",    count: 41   },
];

const ethnicity = [
  { label: "Arab",   count: 115  },
  { label: "Asian",  count: 654  },
  { label: "Ebony",  count: 678  },
  { label: "Indian", count: 570  },
  { label: "Latina", count: 2910 },
  { label: "Mixed",  count: 270  },
  { label: "White",  count: 2519 },
];

const bodyType = [
  { label: "Skinny",   count: 2582 },
  { label: "Athletic", count: 741  },
  { label: "Medium",   count: 2502 },
  { label: "Curvy",    count: 1590 },
  { label: "BBW",      count: 351  },
];

const hair = [
  { label: "Blonde",   count: 1228 },
  { label: "Black",    count: 2046 },
  { label: "Brunette", count: 3620 },
  { label: "Redhead",  count: 381  },
  { label: "Colorful", count: 397  },
];

const privateShows = [
  { label: "8-12 tk",              count: 3496 },
  { label: "16-24 tk",             count: 2167 },
  { label: "32-60 tk",             count: 1621 },
  { label: "90+ tk",               count: 366  },
  { label: "Recordable Privates",  count: 5358 },
  { label: "Spy on Shows",         count: 353  },
  { label: "Video Call (Cam2Cam)", count: 7204 },
];

const popular = [
  { icon: "📳", label: "Interactive Toy", count: 4403 },
  { icon: "📱", label: "Mobile",          count: 1654 },
  { label: "Group Sex",      count: 84,   },
  { label: "Big Tits",       count: 3285  },
  { label: "Hairy Pussy",    count: 1185  },
  { label: "Outdoor",        count: 1124  },
  { label: "Big Ass",        count: 4617  },
  { label: "Anal",           count: 3053, hot: true },
  { label: "Squirt",         count: 3538  },
  { label: "Fuck Machine",   count: 654,  hot: true },
  { label: "Hardcore",       count: 249   },
  { label: "Blowjob",        count: 5491, hot: true },
  { label: "Pregnant",       count: 32    },
  { label: "Small Tits",     count: 2383  },
  { label: "Fisting",        count: 858   },
  { label: "Masturbation",   count: 6076  },
  { label: "Shaven",         count: 4126  },
  { label: "Deepthroat",     count: 4537, hot: true },
  { label: "Office",         count: 1100  },
  { label: "Foot Fetish",    count: 4986, hot: true },
];

const footerLinks = [
  "About Stripchatbate",
  "Blog",
  "Support & FAQ",
  "Billing Support",
  "Report Content",
  "Media Inquiries",
  "Privacy Policy",
  "Terms of Use",
  "All Models",
  "18 U.S.C. 2257 Record-Keeping Statement",
];

const SectionLabel = ({ children }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: ".1em",
    textTransform: "uppercase", color: "#555",
    padding: "14px 16px 5px",
  }}>
    {children}
  </div>
);

const SidebarItem = ({ icon, label, count, isVr, hot, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "7px 16px", fontSize: 13,
      color: active ? "var(--text)" : "#555",
      cursor: "pointer",
      background: active ? "rgba(239,59,71,0.08)" : "transparent",
      borderLeft: active ? "3px solid var(--red2)" : "3px solid transparent",
      transition: "all .12s",
    }}
    onMouseEnter={e => {
      if (!active) {
        e.currentTarget.style.background = "rgba(0,0,0,0.04)";
        e.currentTarget.style.color = "var(--text)";
      }
    }}
    onMouseLeave={e => {
      if (!active) {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "#555";
      }
    }}
  >
    {isVr
      ? <span style={{ background: "#1565c0", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 5px", borderRadius: 3, flexShrink: 0 }}>VR</span>
      : icon
        ? <span style={{ fontSize: 14, width: 20, textAlign: "center", flexShrink: 0 }}>{icon}</span>
        : <span style={{ width: 20, flexShrink: 0 }} />
    }
    <span style={{ flex: 1 }}>{label}</span>
    {hot && <span style={{ fontSize: 11, color: "#e91e8c" }}>✦</span>}
    {count !== undefined && (
      <span style={{ fontSize: 11, color: "#555", marginLeft: 4 }}>{count.toLocaleString()}</span>
    )}
  </div>
);

export default function Sidebar() {
  const [active, setActive] = useState("Home");
  const handle = (label) => setActive(label);

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      position: "fixed", top: 90, left: 0, bottom: 0,
      background: "var(--sidebar)",
      borderRight: "1px solid var(--border)",
      overflowY: "auto", padding: "0 0 8px",
      display: "flex", flexDirection: "column",
      scrollbarWidth: "thin",
      scrollbarColor: "#ccc transparent",
    }}>

      {/* 50 Tokens Banner */}
      <div style={{
        margin: "10px 10px 6px",
        background: "linear-gradient(135deg, #4caf50, #2e7d32)",
        borderRadius: 8, padding: "10px 14px",
        display: "flex", alignItems: "center", gap: 10,
        cursor: "pointer",
      }}>
        <span style={{ fontSize: 22 }}>🪙</span>
        <div>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>50 </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Tokens</span>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>to Win Now</div>
        </div>
      </div>

      {/* Main Nav */}
      {navItems.map(({ icon, label }) => (
        <SidebarItem key={label} icon={icon} label={label} active={active === label} onClick={() => handle(label)} />
      ))}

      {/* Specials */}
      <SectionLabel>Specials</SectionLabel>
      {specials.map(({ flag, icon, label, count, isVr }) => (
        <SidebarItem key={label} icon={flag || icon} label={label} count={count} isVr={isVr} active={active === label} onClick={() => handle(label)} />
      ))}

      {/* Age */}
      <SectionLabel>Age</SectionLabel>
      {age.map(({ label, count }) => (
        <SidebarItem key={label} label={label} count={count} active={active === label} onClick={() => handle(label)} />
      ))}

      {/* Ethnicity */}
      <SectionLabel>Ethnicity</SectionLabel>
      {ethnicity.map(({ label, count }) => (
        <SidebarItem key={label} label={label} count={count} active={active === label} onClick={() => handle(label)} />
      ))}

      {/* Body Type */}
      <SectionLabel>Body Type</SectionLabel>
      {bodyType.map(({ label, count }) => (
        <SidebarItem key={label} label={label} count={count} active={active === label} onClick={() => handle(label)} />
      ))}

      {/* Hair */}
      <SectionLabel>Hair</SectionLabel>
      {hair.map(({ label, count }) => (
        <SidebarItem key={label} label={label} count={count} active={active === label} onClick={() => handle(label)} />
      ))}

      {/* Private Shows */}
      <SectionLabel>Private Shows</SectionLabel>
      {privateShows.map(({ label, count }) => (
        <SidebarItem key={label} label={label} count={count} active={active === label} onClick={() => handle(label)} />
      ))}

      {/* Popular */}
      <SectionLabel>Popular</SectionLabel>
      {popular.map(({ icon, label, count, hot }) => (
        <SidebarItem key={label} icon={icon} label={label} count={count} hot={hot} active={active === label} onClick={() => handle(label)} />
      ))}

      {/* All Categories Button */}
      <div style={{ margin: "12px 14px 16px" }}>
        <button style={{
          width: "100%", padding: "9px 14px", borderRadius: 8,
          background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)",
          fontSize: 12, fontWeight: 600, color: "var(--text)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          fontFamily: "inherit", letterSpacing: ".04em", transition: "background .15s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
        >
          ⊞ &nbsp;ALL CATEGORIES
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)", margin: "0 0 10px" }} />

      {/* Footer Links */}
      {footerLinks.map((link) => (
        <div key={link} style={{
          padding: "5px 16px", fontSize: 12, color: "#555", cursor: "pointer",
          transition: "color .12s", lineHeight: 1.5,
        }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--muted)"}
          onMouseLeave={e => e.currentTarget.style.color = "#555"}
        >
          {link}
        </div>
      ))}

      {/* Language Selector */}
      <div style={{
        margin: "12px 14px 24px",
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 12px", borderRadius: 8,
        border: "1px solid var(--border)",
        cursor: "pointer", color: "var(--muted)", fontSize: 13,
      }}>
        <span>🌐</span>
        <span style={{ flex: 1 }}>English</span>
        <span style={{ fontSize: 10 }}>▼</span>
      </div>

    </aside>
  );
}