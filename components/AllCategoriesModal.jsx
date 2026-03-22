"use client";
import { useState } from "react";

/* ─── Data ───────────────────────────────────────────────────── */
const appearance = {
  AGE: [
    { label: "Teen 18+",  count: 1653 },
    { label: "Young 22+", count: 4181 },
    { label: "MILF",      count: 1431 },
    { label: "Mature",    count: 238  },
    { label: "Granny",    count: 51   },
  ],
  ETHNICITY: [
    { label: "Arab",   count: 118  },
    { label: "Asian",  count: 823  },
    { label: "Ebony",  count: 697  },
    { label: "Indian", count: 572  },
    { label: "Latina", count: 3213 },
    { label: "Mixed",  count: 243  },
    { label: "White",  count: 2427 },
  ],
  "BODY TYPE": [
    { label: "Skinny",   count: 2746 },
    { label: "Athletic", count: 705  },
    { label: "Medium",   count: 2636 },
    { label: "Curvy",    count: 1605 },
    { label: "BBW",      count: 356  },
  ],
  HAIR: [
    { label: "Blonde",   count: 1242 },
    { label: "Black",    count: 2317 },
    { label: "Brunette", count: 3601 },
    { label: "Redhead",  count: 393  },
    { label: "Colorful", count: 411  },
  ],
  "BODY TRAITS": [
    { label: "Bald",         count: 16   },
    { label: "Big Ass",      count: 4656 },
    { label: "Big Clit",     count: 1679 },
    { label: "Big Nipples",  count: 2306 },
    { label: "Big Tits",     count: 3232 },
    { label: "Hairy armpits",count: 532  },
    { label: "Hairy Pussy",  count: 1216 },
    { label: "Shaven",       count: 4255 },
    { label: "Small Tits",   count: 2585 },
    { label: "Trimmed",      count: 1906 },
  ],
};

const activity = {
  POPULAR: [
    { label: "Anal",           count: 2965 },
    { label: "Big Ass",        count: 4742 },
    { label: "Blowjob",        count: 5692 },
    { label: "Deepthroat",     count: 4644 },
    { label: "Foot Fetish",    count: 5191 },
    { label: "Fuck Machine",   count: 781  },
    { label: "Group Sex",      count: 80   },
    { label: "Interactive Toy",count: 4563 },
    { label: "Masturbation",   count: 6275 },
    { label: "Mobile",         count: 1613 },
    { label: "Outdoor",        count: 1141 },
    { label: "Squirt",         count: 3579 },
  ],
  "PRIVATE SHOWS": [
    { label: "8-12 tk",              count: 3793 },
    { label: "16-24 tk",             count: 2220 },
    { label: "32-60 tk",             count: 1554 },
    { label: "90+ tk",               count: 409  },
    { label: "Recordable Privates",  count: 5630 },
    { label: "Spy on Shows",         count: 371  },
    { label: "Video Call (Cam2Cam)", count: 7527 },
  ],
  SPECIALS: [
    { label: "BDSM",         count: 91   },
    { label: "New Models",   count: 1476 },
    { label: "Ticket Shows", count: 172  },
    { label: "VR Cams",      count: 209  },
  ],
};

const alphabet = ["#", "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

/* ─── Sub-components ─────────────────────────────────────────── */
const ColHeader = ({ children }) => (
  <div style={{
    background: "#1e1e1e", borderRadius: 6,
    padding: "6px 12px", marginBottom: 12,
    fontSize: 11, fontWeight: 700,
    letterSpacing: ".1em", color: "#777",
    textTransform: "uppercase",
  }}>
    {children}
  </div>
);

const CatItem = ({ label, count }) => (
  <div style={{
    display: "flex", alignItems: "baseline", gap: 6,
    padding: "4px 0", cursor: "pointer",
    transition: "color .1s",
  }}
    onMouseEnter={e => e.currentTarget.style.color = "#e53935"}
    onMouseLeave={e => e.currentTarget.style.color = "inherit"}
  >
    <span style={{ fontSize: 14, color: "#e0e0e0", fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 12, color: "#555" }}>{count?.toLocaleString()}</span>
  </div>
);

/* ─── Main Modal ─────────────────────────────────────────────── */
export default function AllCategoriesModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("Main");
  const [activeLetter, setActiveLetter] = useState("Main");
  const [search, setSearch] = useState("");

  return (
    /* Overlay */
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        overflowY: "auto",
      }}
    >
      {/* Panel */}
      <div style={{
        minHeight: "100vh",
        background: "#111",
        marginLeft: 220, /* sidebar width */
        padding: "32px 40px 60px",
      }}>

        {/* Close btn */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 24,
            background: "none", border: "none",
            color: "#666", fontSize: 22, cursor: "pointer",
            lineHeight: 1,
          }}
        >✕</button>

        {/* ── Header row ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: 20,
          flexWrap: "wrap", gap: 12,
        }}>
          <h1 style={{
            fontSize: 24, fontWeight: 700, color: "#fff", margin: 0,
          }}>
            All Categories – Cam Girls on Live Sex Chat
          </h1>

          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#1e1e1e", borderRadius: 20,
            padding: "8px 16px", border: "1px solid #2a2a2a",
            minWidth: 220,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Find categories"
              style={{
                background: "none", border: "none", outline: "none",
                color: "#ccc", fontSize: 13, width: "100%",
              }}
            />
          </div>
        </div>

        {/* ── Alphabet tabs ── */}
        <div style={{
          display: "flex", gap: 2, flexWrap: "wrap",
          borderBottom: "1px solid #222", marginBottom: 28,
          paddingBottom: 0,
        }}>
          {alphabet.map(l => (
            <button
              key={l}
              onClick={() => { setActiveLetter(l); setActiveTab(l); }}
              style={{
                background: "none", border: "none",
                padding: "8px 10px",
                fontSize: 14, fontWeight: activeLetter === l ? 700 : 400,
                color: activeLetter === l ? "#e53935" : "#777",
                cursor: "pointer",
                borderBottom: activeLetter === l ? "2px solid #e53935" : "2px solid transparent",
                transition: "color .12s",
                marginBottom: -1,
              }}
              onMouseEnter={e => { if (activeLetter !== l) e.currentTarget.style.color = "#ccc"; }}
              onMouseLeave={e => { if (activeLetter !== l) e.currentTarget.style.color = "#777"; }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* ── Appearance Section ── */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
          }}>
            {/* Eye icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Appearance</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 24,
          }}>
            {Object.entries(appearance).map(([section, items]) => (
              <div key={section}>
                <ColHeader>{section}</ColHeader>
                {items
                  .filter(i => !search || i.label.toLowerCase().includes(search.toLowerCase()))
                  .map(i => <CatItem key={i.label} {...i} />)}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#1e1e1e", marginBottom: 40 }} />

        {/* ── Activity Section ── */}
        <div>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
          }}>
            {/* Lightning icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>Activity</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 24,
          }}>
            {Object.entries(activity).map(([section, items]) => (
              <div key={section}>
                <ColHeader>{section}</ColHeader>
                {items
                  .filter(i => !search || i.label.toLowerCase().includes(search.toLowerCase()))
                  .map(i => <CatItem key={i.label} {...i} />)}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}