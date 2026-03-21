"use client";
import { useState } from "react";

export default function AuthModal({ onClose, defaultTab = "login" }) {
  const [tab, setTab]             = useState(defaultTab);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");

  // Login fields
  const [loginEmail, setLoginEmail]       = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw]     = useState(false);

  // Register fields
  const [regUsername, setRegUsername]   = useState("");
  const [regEmail, setRegEmail]         = useState("");
  const [regPassword, setRegPassword]   = useState("");
  const [regConfirm, setRegConfirm]     = useState("");
  const [showRegPw, setShowRegPw]       = useState(false);
  const [regRole, setRegRole]           = useState("viewer");
  const [agreed, setAgreed]             = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!loginEmail || !loginPassword) return setError("Please fill in all fields.");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSuccess(`Welcome back, ${data.user.username}! 👋`);
      setTimeout(() => onClose(data.user), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!regUsername || !regEmail || !regPassword || !regConfirm)
      return setError("Please fill in all fields.");
    if (regPassword !== regConfirm)
      return setError("Passwords do not match.");
    if (regPassword.length < 6)
      return setError("Password must be at least 6 characters.");
    if (!agreed)
      return setError("You must agree to the Terms of Use.");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: regUsername, email: regEmail, password: regPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSuccess(`Account created! Welcome, ${data.user.username} 🎉`);
      setTimeout(() => onClose(data.user), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Modal box */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#161616",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16, width: "100%", maxWidth: 420,
          animation: "fadeUp .25s ease both",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px 0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, background: "#fff", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="17" height="17" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="9" fill="#c62828"/>
                <path d="M7 11c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                <circle cx="11" cy="11" r="1.5" fill="#fff"/>
              </svg>
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "#fff" }}>
              STRIP<span style={{ fontWeight: 300, color: "#bbb" }}>CHAT</span>
            </span>
          </div>

          {/* Close */}
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.07)", border: "none", color: "#fff",
            width: 30, height: 30, borderRadius: "50%", cursor: "pointer",
            fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background .15s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
          >✕</button>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", margin: "18px 24px 0",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 10, padding: 4,
        }}>
          {["login","register"].map(t => (
            <button key={t} onClick={() => { setTab(t); setError(""); setSuccess(""); }} style={{
              flex: 1, padding: "9px 0", borderRadius: 7, border: "none",
              background: tab === t ? "#e53935" : "transparent",
              color: tab === t ? "#fff" : "var(--muted)",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit", transition: "all .15s",
              textTransform: "capitalize",
            }}>
              {t === "login" ? "Log In" : "Create Account"}
            </button>
          ))}
        </div>

        {/* Form area */}
        <div style={{ padding: "20px 24px 24px" }}>

          {/* Error / Success messages */}
          {error && (
            <div style={{
              background: "rgba(229,57,53,0.12)", border: "1px solid rgba(229,57,53,0.3)",
              borderRadius: 8, padding: "10px 14px", marginBottom: 16,
              fontSize: 13, color: "#ff6b6b", display: "flex", alignItems: "center", gap: 7,
            }}>
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div style={{
              background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.3)",
              borderRadius: 8, padding: "10px 14px", marginBottom: 16,
              fontSize: 13, color: "#81c784", display: "flex", alignItems: "center", gap: 7,
            }}>
              ✅ {success}
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {tab === "login" && (
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
              />
              <PasswordField
                label="Password"
                placeholder="Your password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                show={showLoginPw}
                toggle={() => setShowLoginPw(s => !s)}
              />

              <div style={{ textAlign: "right", marginTop: -6 }}>
                <span style={{ fontSize: 12, color: "#e53935", cursor: "pointer" }}>
                  Forgot password?
                </span>
              </div>

              <SubmitBtn loading={loading} label="Log In" />

              <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>
                Don't have an account?{" "}
                <span onClick={() => setTab("register")} style={{ color: "#e53935", cursor: "pointer", fontWeight: 600 }}>
                  Create one free
                </span>
              </div>
            </form>
          )}

          {/* ── REGISTER FORM ── */}
          {tab === "register" && (
            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Role selector */}
              <div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, fontWeight: 600 }}>I want to join as</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { id: "viewer",  label: "👁️ Viewer",  desc: "Watch streams" },
                    { id: "model",   label: "🎥 Model",   desc: "Go live & earn" },
                  ].map(r => (
                    <button key={r.id} type="button" onClick={() => setRegRole(r.id)} style={{
                      flex: 1, padding: "10px 8px", borderRadius: 8, border: "none",
                      background: regRole === r.id ? "rgba(229,57,53,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${regRole === r.id ? "#e53935" : "rgba(255,255,255,0.08)"}`,
                      color: regRole === r.id ? "#fff" : "var(--muted)",
                      cursor: "pointer", fontFamily: "inherit", transition: "all .15s",
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{r.label}</div>
                      <div style={{ fontSize: 10, opacity: .7 }}>{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Field
                label="Username"
                type="text"
                placeholder="Choose a username"
                value={regUsername}
                onChange={e => setRegUsername(e.target.value)}
              />
              <Field
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
              />
              <PasswordField
                label="Password"
                placeholder="At least 6 characters"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                show={showRegPw}
                toggle={() => setShowRegPw(s => !s)}
              />
              <PasswordField
                label="Confirm Password"
                placeholder="Repeat your password"
                value={regConfirm}
                onChange={e => setRegConfirm(e.target.value)}
                show={showRegPw}
                toggle={() => setShowRegPw(s => !s)}
              />

              {/* Age + Terms */}
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox" checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  style={{ accentColor: "#e53935", width: 15, height: 15, marginTop: 2, flexShrink: 0 }}
                />
                <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
                  I confirm I am 18+ years old and agree to the{" "}
                  <span style={{ color: "#e53935" }}>Terms of Use</span> and{" "}
                  <span style={{ color: "#e53935" }}>Privacy Policy</span>
                </span>
              </label>

              <SubmitBtn loading={loading} label="Create Free Account" />

              <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>
                Already have an account?{" "}
                <span onClick={() => setTab("login")} style={{ color: "#e53935", cursor: "pointer", fontWeight: 600 }}>
                  Log in
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Reusable field components ─────────────────────────────────────────────────

function Field({ label, type, placeholder, value, onChange }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      <input
        type={type} value={value} onChange={onChange}
        placeholder={placeholder} required
        style={{
          width: "100%", background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
          padding: "10px 14px", color: "#fff", fontSize: 13,
          fontFamily: "inherit", outline: "none", transition: "border-color .15s",
        }}
        onFocus={e => e.target.style.borderColor = "rgba(229,57,53,0.6)"}
        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
      />
    </div>
  );
}

function PasswordField({ label, placeholder, value, onChange, show, toggle }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          value={value} onChange={onChange}
          placeholder={placeholder} required
          style={{
            width: "100%", background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
            padding: "10px 42px 10px 14px", color: "#fff", fontSize: 13,
            fontFamily: "inherit", outline: "none", transition: "border-color .15s",
          }}
          onFocus={e => e.target.style.borderColor = "rgba(229,57,53,0.6)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />
        <button type="button" onClick={toggle} style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", color: "var(--muted)",
          cursor: "pointer", fontSize: 15, padding: 0, lineHeight: 1,
        }}>{show ? "🙈" : "👁️"}</button>
      </div>
    </div>
  );
}

function SubmitBtn({ loading, label }) {
  return (
    <button type="submit" disabled={loading} style={{
      width: "100%", background: loading ? "#555" : "#e53935",
      border: "none", color: "#fff", fontSize: 14, fontWeight: 700,
      padding: "13px 0", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer",
      fontFamily: "inherit", transition: "opacity .15s",
      boxShadow: loading ? "none" : "0 2px 16px rgba(229,57,53,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    }}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = ".88"; }}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >
      {loading && (
        <div style={{
          width: 16, height: 16,
          border: "2px solid rgba(255,255,255,0.3)",
          borderTopColor: "#fff", borderRadius: "50%",
          animation: "spin .7s linear infinite",
        }} />
      )}
      {loading ? "Please wait..." : label}
    </button>
  );
}