"use client";
import { useState, useEffect } from "react";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtNum = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

// ── Mock Data ─────────────────────────────────────────────────────────────────
const WEEKLY_EARNINGS = [42, 78, 55, 91, 63, 110, 88];
const WEEKLY_LABELS   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const WEEKLY_VIEWERS  = [120, 340, 210, 480, 290, 610, 430];

const RECENT_TIPS = [
  { user: "Alex99",     amount: 100, time: "2 min ago",  msg: "You're amazing! 🔥" },
  { user: "DarkRose",   amount: 50,  time: "8 min ago",  msg: "Keep going!" },
  { user: "King_M",     amount: 200, time: "15 min ago", msg: "Best show ever 👑" },
  { user: "Viewer123",  amount: 25,  time: "22 min ago", msg: "" },
  { user: "NightOwl",   amount: 75,  time: "31 min ago", msg: "Love from Brazil 🇧🇷" },
  { user: "Ghost7",     amount: 500, time: "1 hr ago",   msg: "You deserve it all 💋" },
];

const NAV_ITEMS = [
  { id: "overview",  icon: "⊞",  label: "Overview"      },
  { id: "stream",    icon: "📡", label: "Stream Setup"  },
  { id: "earnings",  icon: "💰", label: "Earnings"      },
  { id: "viewers",   icon: "👥", label: "Viewers"       },
  { id: "goals",     icon: "🎯", label: "Goals"         },
  { id: "settings",  icon: "⚙️", label: "Settings"      },
];

// ── Sub components ────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{
      background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 12, padding: "18px 20px",
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", fontFamily: "var(--font-display)", marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--muted)" }}>{sub}</div>}
    </div>
  );
}

function BarChart({ data, labels, color, height = 120 }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height }}>
      {data.map((val, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
            <div style={{
              width: "100%",
              height: `${(val / max) * 100}%`,
              background: color,
              borderRadius: "4px 4px 0 0",
              minHeight: 4,
              transition: "height .3s ease",
              opacity: i === data.length - 1 ? 1 : 0.6,
            }} />
          </div>
          <span style={{ fontSize: 9, color: "var(--muted)" }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ── SECTIONS ──────────────────────────────────────────────────────────────────

function Overview({ isLive, setIsLive, viewers }) {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Overview</h2>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
        <StatCard icon="🪙" label="Today's Earnings"  value="$88.40"   sub="+12% from yesterday"  color="#f0a500" />
        <StatCard icon="👁️" label="Current Viewers"   value={fmtNum(viewers)} sub="Live right now"  color="#e53935" />
        <StatCard icon="❤️" label="Total Followers"   value="12.4k"    sub="+84 this week"         color="#e91e8c" />
        <StatCard icon="⭐" label="Rating"            value="4.8"      sub="Based on 2,341 votes"  color="#7986cb" />
        <StatCard icon="📅" label="Shows This Month"  value="18"       sub="Avg 2.1 hrs each"      color="#43a047" />
        <StatCard icon="💰" label="This Month"        value="$624"     sub="Payout on 1st"         color="#00acc1" />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
        <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Weekly Earnings ($)</div>
          <BarChart data={WEEKLY_EARNINGS} labels={WEEKLY_LABELS} color="#f0a500" />
        </div>
        <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Weekly Viewers</div>
          <BarChart data={WEEKLY_VIEWERS} labels={WEEKLY_LABELS} color="#e53935" />
        </div>
      </div>

      {/* Recent tips */}
      <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Recent Tips</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {RECENT_TIPS.map((tip, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 14px", borderRadius: 8,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: `hsl(${i * 60}, 60%, 40%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
              }}>{tip.user[0]}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{tip.user}</span>
                {tip.msg && <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 8 }}>"{tip.msg}"</span>}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f0a500" }}>🪙 {tip.amount}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{tip.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StreamSetup({ isLive, setIsLive }) {
  const [streamKey] = useState("sk_live_xK9mP2qR7nL4wZ8vT3jY6hC");
  const [showKey, setShowKey] = useState(false);
  const [title, setTitle] = useState("Welcome to my show! 💋");
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText(streamKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Stream Setup</h2>

      {/* Go Live button */}
      <div style={{
        background: isLive ? "rgba(229,57,53,0.1)" : "rgba(76,175,80,0.1)",
        border: `1px solid ${isLive ? "#e53935" : "#4caf50"}`,
        borderRadius: 12, padding: 24, marginBottom: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
            {isLive ? "🔴 You are LIVE" : "⚫ You are Offline"}
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>
            {isLive ? "Your stream is visible to viewers" : "Start streaming from OBS then go live"}
          </div>
        </div>
        <button
          onClick={() => setIsLive(l => !l)}
          style={{
            background: isLive ? "#e53935" : "#4caf50",
            border: "none", color: "#fff",
            fontSize: 14, fontWeight: 700, padding: "12px 28px",
            borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
            boxShadow: `0 2px 16px ${isLive ? "rgba(229,57,53,0.4)" : "rgba(76,175,80,0.4)"}`,
            transition: "opacity .15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = ".88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          {isLive ? "End Stream" : "Go Live"}
        </button>
      </div>

      {/* Stream info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* RTMP URL */}
        <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>RTMP URL</div>
          <div style={{
            background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 7, padding: "10px 14px", fontSize: 12,
            color: "#4caf50", fontFamily: "monospace", wordBreak: "break-all",
          }}>
            rtmp://stream.yourdomain.com/live
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>Paste this into OBS → Settings → Stream → Server</div>
        </div>

        {/* Stream Key */}
        <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>Stream Key</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{
              flex: 1, background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 7, padding: "10px 14px", fontSize: 12,
              color: "#fff", fontFamily: "monospace", overflow: "hidden",
              textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {showKey ? streamKey : "••••••••••••••••••••••••••"}
            </div>
            <button onClick={() => setShowKey(s => !s)} style={{
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff", borderRadius: 7, padding: "0 12px", cursor: "pointer", fontSize: 13,
            }}>{showKey ? "🙈" : "👁️"}</button>
            <button onClick={copyKey} style={{
              background: copied ? "rgba(76,175,80,0.2)" : "rgba(255,255,255,0.07)",
              border: `1px solid ${copied ? "#4caf50" : "rgba(255,255,255,0.1)"}`,
              color: copied ? "#4caf50" : "#fff",
              borderRadius: 7, padding: "0 12px", cursor: "pointer", fontSize: 12, fontWeight: 600,
              fontFamily: "inherit", transition: "all .15s",
            }}>{copied ? "✓ Copied" : "Copy"}</button>
          </div>
          <div style={{ fontSize: 11, color: "#e53935", marginTop: 8 }}>⚠️ Never share your stream key with anyone</div>
        </div>
      </div>

      {/* Stream title */}
      <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 14 }}>Stream Title</div>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            width: "100%", background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
            padding: "10px 14px", color: "#fff", fontSize: 14,
            fontFamily: "inherit", outline: "none", marginBottom: 12,
          }}
        />
        <button style={{
          background: "#e53935", border: "none", color: "#fff",
          fontSize: 13, fontWeight: 700, padding: "9px 24px",
          borderRadius: 7, cursor: "pointer", fontFamily: "inherit",
        }}>Save Title</button>
      </div>

      {/* OBS setup guide */}
      <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 14 }}>📋 OBS Setup Guide</div>
        {[
          "Download OBS from obsproject.com",
          "Open OBS → Settings → Stream",
          'Set Service to "Custom"',
          "Paste the RTMP URL into Server field",
          "Paste your Stream Key into the key field",
          "Click Apply → OK",
          'Click "Start Streaming" in OBS',
          'Then click "Go Live" button above',
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%", background: "#e53935",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0,
            }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Earnings() {
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Earnings</h2>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 14, marginBottom: 24 }}>
        <StatCard icon="💵" label="This Month"    value="$624.80"  sub="Payout on 1st"       color="#4caf50" />
        <StatCard icon="📆" label="Last Month"    value="$511.20"  sub="+22% growth"          color="#f0a500" />
        <StatCard icon="🏦" label="Total Earned"  value="$8,240"   sub="Since joining"        color="#7986cb" />
        <StatCard icon="⏳" label="Pending"       value="$88.40"   sub="Today's earnings"     color="#00acc1" />
      </div>

      {/* Earnings chart */}
      <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Earnings This Week ($)</div>
        <BarChart data={WEEKLY_EARNINGS} labels={WEEKLY_LABELS} color="#4caf50" height={140} />
      </div>

      {/* Payout info */}
      <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Payout Settings</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          {[
            { label: "Payout Method", value: "Bank Transfer" },
            { label: "Payout Schedule", value: "Monthly (1st)" },
            { label: "Minimum Payout", value: "$50.00" },
            { label: "Revenue Share", value: "60% to you" },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "#0d0d0d", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{value}</div>
            </div>
          ))}
        </div>
        <button style={{
          background: "#e53935", border: "none", color: "#fff",
          fontSize: 13, fontWeight: 700, padding: "10px 24px",
          borderRadius: 7, cursor: "pointer", fontFamily: "inherit",
        }}>Request Payout</button>
      </div>
    </div>
  );
}

function Goals() {
  const [goals, setGoals] = useState([
    { id: 1, title: "Naked Show",      target: 500,  current: 247, color: "#e53935" },
    { id: 2, title: "Oil Show",        target: 1000, current: 430, color: "#f0a500" },
    { id: 3, title: "Special Dance",   target: 300,  current: 300, color: "#4caf50" },
  ]);
  const [newGoal, setNewGoal] = useState("");
  const [newTarget, setNewTarget] = useState(500);

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals(g => [...g, { id: Date.now(), title: newGoal, target: newTarget, current: 0, color: "#7986cb" }]);
    setNewGoal(""); setNewTarget(500);
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Goals</h2>

      {/* Current goals */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        {goals.map(goal => {
          const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const done = pct >= 100;
          return (
            <div key={goal.id} style={{
              background: "#1a1a1a", border: `1px solid ${done ? "#4caf50" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 12, padding: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>
                  {done ? "✅ " : "🎯 "}{goal.title}
                </span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  🪙 {goal.current} / {goal.target}
                </span>
              </div>
              <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 8, overflow: "hidden", marginBottom: 6 }}>
                <div style={{
                  width: `${pct}%`, height: "100%",
                  background: done ? "#4caf50" : goal.color,
                  borderRadius: 8, transition: "width .4s ease",
                }} />
              </div>
              <div style={{ fontSize: 11, color: done ? "#4caf50" : "var(--muted)" }}>
                {done ? "Goal reached! 🎉" : `${pct}% — ${goal.target - goal.current} tokens remaining`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add new goal */}
      <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 14 }}>Add New Goal</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={newGoal}
            onChange={e => setNewGoal(e.target.value)}
            placeholder="Goal title (e.g. Special Show)"
            style={{
              flex: 2, minWidth: 200, background: "#0d0d0d",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
              padding: "9px 14px", color: "#fff", fontSize: 13,
              fontFamily: "inherit", outline: "none",
            }}
          />
          <input
            type="number" value={newTarget}
            onChange={e => setNewTarget(Number(e.target.value))}
            placeholder="Token target"
            style={{
              flex: 1, minWidth: 120, background: "#0d0d0d",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
              padding: "9px 14px", color: "#fff", fontSize: 13,
              fontFamily: "inherit", outline: "none",
            }}
          />
          <button onClick={addGoal} style={{
            background: "#e53935", border: "none", color: "#fff",
            fontSize: 13, fontWeight: 700, padding: "9px 24px",
            borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
          }}>Add Goal</button>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  const [name, setName]     = useState("AuroraBliss");
  const [bio, setBio]       = useState("Welcome to my show! I love connecting with my fans 💋");
  const [saved, setSaved]   = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Profile Settings</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Display Name", value: name, setter: setName, type: "text" },
            { label: "Email", value: "aurora@example.com", setter: () => {}, type: "email" },
            { label: "Date of Birth", value: "1999-03-15", setter: () => {}, type: "date" },
            { label: "Country", value: "Russia", setter: () => {}, type: "text" },
          ].map(({ label, value, setter, type }) => (
            <div key={label}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 600 }}>{label}</div>
              <input type={type} defaultValue={value} onChange={e => setter(e.target.value)} style={{
                width: "100%", background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
                padding: "10px 14px", color: "#fff", fontSize: 13,
                fontFamily: "inherit", outline: "none",
              }} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Avatar */}
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, fontWeight: 600 }}>Profile Photo</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg,#e53935,#8e24aa)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, fontWeight: 700, color: "#fff",
                border: "3px solid rgba(255,255,255,0.15)",
              }}>A</div>
              <button style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", fontSize: 13, padding: "8px 18px", borderRadius: 7,
                cursor: "pointer", fontFamily: "inherit",
              }}>Upload Photo</button>
            </div>
          </div>

          {/* Bio */}
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 600 }}>Bio</div>
            <textarea
              value={bio} onChange={e => setBio(e.target.value)} rows={4}
              style={{
                width: "100%", background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
                padding: "10px 14px", color: "#fff", fontSize: 13,
                fontFamily: "inherit", outline: "none", resize: "vertical",
              }}
            />
          </div>

          {/* Notifications */}
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, fontWeight: 600 }}>Notifications</div>
            {["Email me when I get a tip", "Email me new followers", "Daily earnings summary"].map(opt => (
              <label key={opt} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: "#e53935", width: 15, height: 15 }} />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
        <button onClick={save} style={{
          background: saved ? "#4caf50" : "#e53935", border: "none", color: "#fff",
          fontSize: 14, fontWeight: 700, padding: "11px 32px", borderRadius: 8,
          cursor: "pointer", fontFamily: "inherit", transition: "background .2s",
        }}>{saved ? "✓ Saved!" : "Save Changes"}</button>
        <button style={{
          background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "var(--muted)",
          fontSize: 14, padding: "11px 24px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
        }}>Cancel</button>
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [isLive, setIsLive]       = useState(false);
  const [viewers, setViewers]     = useState(1842);

  useEffect(() => {
    if (!isLive) return;
    const id = setInterval(() => {
      setViewers(v => Math.max(100, v + Math.floor(Math.random() * 30) - 12));
    }, 3000);
    return () => clearInterval(id);
  }, [isLive]);

  return (
    <div style={{ minHeight: "100vh", background: "#111", display: "flex" }}>

      {/* Sidebar */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: "#0d0d0d", borderRight: "1px solid rgba(255,255,255,0.07)",
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0,
      }}>
        {/* Logo */}
        <div style={{
          padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ width: 28, height: 28, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="17" height="17" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="9" fill="#c62828"/>
              <path d="M7 11c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <circle cx="11" cy="11" r="1.5" fill="#fff"/>
            </svg>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "#fff" }}>
            STRIP<span style={{ fontWeight: 300, color: "#bbb" }}>CHAT</span>
          </div>
        </div>

        {/* Model info */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg,#e53935,#8e24aa)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 700, color: "#fff",
            }}>A</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>AuroraBliss</div>
              <div style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: isLive ? "#4caf50" : "#555", display: "inline-block" }} />
                <span style={{ color: isLive ? "#4caf50" : "var(--muted)" }}>{isLive ? "Live" : "Offline"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 0" }}>
          {NAV_ITEMS.map(({ id, icon, label }) => (
            <div key={id} onClick={() => setActiveNav(id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 20px", fontSize: 13, cursor: "pointer",
              color: activeNav === id ? "#fff" : "var(--muted)",
              background: activeNav === id ? "rgba(229,57,53,0.12)" : "transparent",
              borderLeft: activeNav === id ? "3px solid #e53935" : "3px solid transparent",
              transition: "all .12s",
            }}
              onMouseEnter={e => { if (activeNav !== id) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#fff"; }}}
              onMouseLeave={e => { if (activeNav !== id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; }}}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{icon}</span>
              {label}
            </div>
          ))}
        </nav>

        {/* Back to site */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <a href="/" style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 13, color: "var(--muted)", cursor: "pointer",
            transition: "color .15s", textDecoration: "none",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
          >
            ← Back to Site
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 220, flex: 1, padding: 28, minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 28,
        }}>
          <div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 2 }}>Model Dashboard</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "var(--font-display)" }}>
              Welcome back, AuroraBliss 👋
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {isLive && (
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(229,57,53,0.12)", border: "1px solid #e53935",
                borderRadius: 8, padding: "6px 14px", fontSize: 12, color: "#e53935", fontWeight: 700,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e53935", display: "inline-block", animation: "pulseDot 1.4s infinite" }} />
                LIVE · {viewers.toLocaleString()} viewers
              </div>
            )}
            <button onClick={() => setActiveNav("stream")} style={{
              background: isLive ? "#e53935" : "#4caf50",
              border: "none", color: "#fff", fontSize: 13, fontWeight: 700,
              padding: "8px 20px", borderRadius: 7, cursor: "pointer", fontFamily: "inherit",
            }}>
              {isLive ? "⏹ End Stream" : "▶ Go Live"}
            </button>
          </div>
        </div>

        {/* Page content */}
        {activeNav === "overview"  && <Overview isLive={isLive} setIsLive={setIsLive} viewers={viewers} />}
        {activeNav === "stream"    && <StreamSetup isLive={isLive} setIsLive={setIsLive} />}
        {activeNav === "earnings"  && <Earnings />}
        {activeNav === "viewers"   && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Viewers</h2>
            <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Viewers This Week</div>
              <BarChart data={WEEKLY_VIEWERS} labels={WEEKLY_LABELS} color="#1e88e5" height={140} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 14 }}>
              <StatCard icon="👁️" label="Peak Viewers"     value="1,284"  sub="Last Saturday"       color="#1e88e5" />
              <StatCard icon="⏱️" label="Avg Watch Time"   value="18 min" sub="Per session"          color="#00acc1" />
              <StatCard icon="🔄" label="Return Viewers"   value="64%"    sub="Come back weekly"     color="#43a047" />
              <StatCard icon="🌍" label="Top Country"      value="USA"    sub="32% of viewers"       color="#f0a500" />
            </div>
          </div>
        )}
        {activeNav === "goals"     && <Goals />}
        {activeNav === "settings"  && <Settings />}
      </main>
    </div>
  );
}