"use client";
import { useState, useEffect, useRef } from "react";

const COLORS = ["#e53935","#8e24aa","#1e88e5","#00acc1","#43a047","#fb8c00","#f06292","#7986cb"];
const FAKE_USERS = ["Alex99","SunnyK","DarkRose","Viewer123","King_M","Luna__","ProUser","Ghost7","NightOwl","xXuser"];
const FAKE_MSGS  = [
  "You are so beautiful 😍","Hi from Brazil! 🇧🇷","Amazing show!","Keep going 🔥",
  "Sent 50 tokens!","You're the best 👑","Hello gorgeous","First time here, love it!",
  "💋💋💋","More please!","You're stunning","Great energy tonight!",
  "Hi from Ukraine 🇺🇦","Love your smile","You're incredible ⚡",
];

function randomMsg() {
  return {
    id: Date.now() + Math.random(),
    username: FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    message: FAKE_MSGS[Math.floor(Math.random() * FAKE_MSGS.length)],
    time: new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }),
    isTip: Math.random() < 0.08,
    tipAmount: Math.floor(Math.random() * 200) + 10,
  };
}

const FONT = "'DM Sans', 'Helvetica Neue', Helvetica, sans-serif";

function scrollToBottom(el, smooth = true) {
  if (!el) return;
  el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "instant" });
}

export default function LiveChat({ username, viewers, onTipClick }) {
  const [messages,   setMessages]   = useState(() => Array.from({ length: 14 }, randomMsg));
  const [input,      setInput]      = useState("");
  const [chatTab,    setChatTab]    = useState("Public");
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMessages(prev => [...prev, randomMsg()].slice(-80));
    }, 2200 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom(messagesRef.current);
    }
  }, [messages, autoScroll]);

  const handleScroll = () => {
    const el = messagesRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    setAutoScroll(isAtBottom);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      username: "You",
      color: "#e53935",
      message: input.trim(),
      time: new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }),
      isTip: false,
      isMe: true,
    }]);
    setInput("");
    setAutoScroll(true);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
      background: "#ffffff",
      fontFamily: FONT,
    }}>

      {/* ── HEADER ── */}
      <div style={{
        display: "flex", alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
        padding: "0 14px", height: 44, flexShrink: 0, gap: 2,
      }}>
        {["Public","Private"].map(tab => (
          <button key={tab} onClick={() => setChatTab(tab)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "0 12px", height: "100%", fontSize: 13,
            color: chatTab === tab ? "#111" : "#bbb",
            borderBottom: chatTab === tab ? "2px solid #e53935" : "2px solid transparent",
            fontFamily: "inherit", fontWeight: chatTab === tab ? 700 : 400,
            transition: "color .15s", letterSpacing: ".01em",
          }}>{tab}</button>
        ))}

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#bbb" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#ccc">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          {viewers?.toLocaleString() || "0"}
        </div>
        <button style={{
          background: "none", border: "none", color: "#ccc",
          cursor: "pointer", padding: "4px 6px", fontSize: 18, lineHeight: 1,
        }}>⋮</button>
      </div>

      {/* ── MESSAGES ── */}
      <div
        ref={messagesRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          scrollbarWidth: "thin",
          scrollbarColor: "#eee transparent",
          background: "#ffffff",
        }}
      >
        {chatTab === "Private" ? (
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "24px 16px", gap: 18,
          }}>
            <div style={{
              width: 68, height: 68, borderRadius: "50%",
              background: "radial-gradient(circle,#e53935 0%,#7a0000 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 28px rgba(229,57,53,0.2)",
            }}>
              <span style={{ fontSize: 30 }}>⭐</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#e53935", marginBottom: 4 }}>Go Ultimate</div>
              <div style={{ fontSize: 12, color: "#aaa", fontWeight: 500 }}>to chat privately with any model</div>
            </div>
            <div style={{
              background: "#f9f9f9", border: "1px solid #eee",
              borderRadius: 10, padding: "16px", width: "100%", maxWidth: 270,
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              {[
                { icon: "💬", label: "Unlimited Private messages", badge: null },
                { icon: "🔤", label: "Chat auto-translation",      badge: "NEW" },
                { icon: "📷", label: "Send photos to models",      badge: null },
                { icon: "😍", label: "Fun and naughty emoji",      badge: null },
              ].map(({ icon, label, badge }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: "#666", flex: 1 }}>{label}</span>
                  {badge && (
                    <span style={{
                      background: "#f5a623", color: "#000",
                      fontSize: 8, fontWeight: 800, padding: "2px 6px",
                      borderRadius: 3, letterSpacing: ".05em",
                    }}>{badge}</span>
                  )}
                </div>
              ))}
            </div>
            <button style={{
              background: "transparent", border: "1px solid #ddd",
              color: "#888", fontSize: 12, fontWeight: 600,
              padding: "9px 26px", borderRadius: 20, cursor: "pointer",
              fontFamily: "inherit", transition: "border-color .15s, color .15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#aaa"; e.currentTarget.style.color = "#333"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#888"; }}
            >Register to Chat</button>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ flexShrink: 0, animation: "fadeUp .18s ease both" }}>
              {msg.isTip ? (
                <div style={{
                  background: "rgba(245,166,35,0.06)",
                  border: "1px solid rgba(245,166,35,0.2)",
                  borderRadius: 6, padding: "6px 10px",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span style={{ fontSize: 13 }}>🪙</span>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#c48a0a" }}>{msg.username}</span>
                    <span style={{ fontSize: 11, color: "#aaa" }}> tipped </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#c48a0a" }}>{msg.tipAmount} tokens!</span>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                  <div style={{
                    background: msg.color, borderRadius: 3,
                    padding: "1px 6px", fontSize: 10,
                    fontWeight: 700, color: "#fff", flexShrink: 0,
                    marginTop: 2, maxWidth: 76,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{msg.username}</div>
                  <div style={{
                    flex: 1, minWidth: 0,
                    fontSize: 12, lineHeight: 1.55,
                    color: msg.isMe ? "#222" : "#555",
                    wordBreak: "break-word",
                  }}>{msg.message}</div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ── SCROLL NUDGE ── */}
      {!autoScroll && chatTab === "Public" && (
        <div style={{
          textAlign: "center", padding: "5px 0",
          background: "#fafafa", borderTop: "1px solid #f0f0f0", flexShrink: 0,
        }}>
          <button
            onClick={() => {
              setAutoScroll(true);
              scrollToBottom(messagesRef.current);
            }}
            style={{
              background: "#f5f5f5", border: "1px solid #e0e0e0", color: "#666",
              fontSize: 11, fontWeight: 600, padding: "4px 14px",
              borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
            }}
          >↓ New messages</button>
        </div>
      )}

      {/* ── GOAL PROGRESS ── */}
      <div style={{
        padding: "8px 12px", borderTop: "1px solid #f0f0f0",
        display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
        background: "#fafafa",
      }}>
        <div style={{
          width: 20, height: 20, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#4caf50",
            boxShadow: "0 0 6px rgba(76,175,80,0.4)",
          }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, color: "#aaa", marginBottom: 3 }}>
            New goal – <span style={{ color: "#c48a0a", fontWeight: 700 }}>222 tk</span>
          </div>
          <div style={{ height: 3, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              width: "45%", height: "100%",
              background: "linear-gradient(90deg,#1e88e5,#4caf50)",
              borderRadius: 3,
            }} />
          </div>
        </div>
        <button onClick={onTipClick} style={{
          background: "#1a6b2a", border: "1px solid #2d9c42",
          color: "#fff", fontSize: 11, fontWeight: 700,
          padding: "4px 10px", borderRadius: 6,
          cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
          display: "flex", alignItems: "center", gap: 4,
        }}>Tip ›</button>
      </div>

      {/* ── INPUT ── */}
      <div style={{
        padding: "10px 12px", borderTop: "1px solid #f0f0f0",
        display: "flex", gap: 8, flexShrink: 0, background: "#ffffff",
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Public message..."
          maxLength={200}
          style={{
            flex: 1, background: "#f5f5f5",
            border: "1px solid #e8e8e8", borderRadius: 20,
            padding: "8px 14px", color: "#333", fontSize: 12,
            fontFamily: "inherit", outline: "none",
            transition: "border-color .15s",
          }}
          onFocus={e => e.target.style.borderColor = "#ccc"}
          onBlur={e => e.target.style.borderColor = "#e8e8e8"}
        />
        <button style={{
          background: "none", border: "none", color: "#ccc",
          cursor: "pointer", padding: 4, fontSize: 17, lineHeight: 1, flexShrink: 0,
        }}>😊</button>
        <button onClick={sendMessage} style={{
          background: "#e53935", border: "none", color: "#fff",
          width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, flexShrink: 0, transition: "opacity .15s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = ".8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >➤</button>
      </div>

    </div>
  );
}