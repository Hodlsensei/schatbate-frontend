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
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    isTip: Math.random() < 0.08,
    tipAmount: Math.floor(Math.random() * 200) + 10,
  };
}

export default function LiveChat({ username, onTipClick }) {
  const [messages, setMessages] = useState(() =>
    Array.from({ length: 12 }, randomMsg)
  );
  const [input, setInput]       = useState("");
  const [viewers, setViewers]   = useState(247);
  const bottomRef = useRef(null);
  const chatRef   = useRef(null);

  // Simulate incoming messages
  useEffect(() => {
    const id = setInterval(() => {
      setMessages(prev => {
        const next = [...prev, randomMsg()];
        return next.slice(-80); // keep last 80
      });
    }, 2200 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  // Animate viewer count
  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(10, v + Math.floor(Math.random() * 6) - 2));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      username: "You",
      color: "#e53935",
      message: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isTip: false,
      isMe: true,
    }]);
    setInput("");
  };

  return (
    <div style={{
      width: 300, flexShrink: 0,
      background: "#0f0f0f",
      borderLeft: "1px solid rgba(255,255,255,0.07)",
      display: "flex", flexDirection: "column",
      height: "calc(100vh - 50px)",
    }}>
      {/* Chat header */}
      <div style={{
        padding: "12px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Live Chat</span>
        <span style={{ fontSize: 11, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e53935", display: "inline-block", animation: "pulseDot 1.4s infinite" }} />
          {viewers} in chat
        </span>
      </div>

      {/* Messages */}
      <div ref={chatRef} style={{
        flex: 1, overflowY: "auto", padding: "10px 12px",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            animation: "fadeUp .2s ease both",
          }}>
            {msg.isTip ? (
              /* Tip message */
              <div style={{
                background: "linear-gradient(135deg, rgba(240,165,0,0.15), rgba(240,165,0,0.05))",
                border: "1px solid rgba(240,165,0,0.3)",
                borderRadius: 8, padding: "7px 10px",
                display: "flex", alignItems: "center", gap: 7,
              }}>
                <span style={{ fontSize: 16 }}>🪙</span>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#f0a500" }}>{msg.username}</span>
                  <span style={{ fontSize: 11, color: "#ccc" }}> tipped </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#f0a500" }}>{msg.tipAmount} tokens!</span>
                </div>
              </div>
            ) : (
              /* Regular message */
              <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: msg.color, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: "#fff", marginTop: 1,
                }}>
                  {msg.username[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: msg.isMe ? "#e53935" : msg.color }}>
                    {msg.username}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.08)", marginLeft: 4 }}>{msg.time}</span>
                  <div style={{ fontSize: 12, color: msg.isMe ? "#fff" : "rgba(255,255,255,0.75)", marginTop: 1, wordBreak: "break-word", lineHeight: 1.45 }}>
                    {msg.message}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick tip buttons */}
      <div style={{
        padding: "8px 12px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", gap: 5,
      }}>
        {[10, 25, 50, 100].map(amt => (
          <button key={amt} onClick={onTipClick} style={{
            flex: 1, background: "rgba(240,165,0,0.1)",
            border: "1px solid rgba(240,165,0,0.25)", color: "#f0a500",
            fontSize: 11, fontWeight: 700, padding: "5px 0", borderRadius: 5,
            cursor: "pointer", fontFamily: "inherit", transition: "background .15s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(240,165,0,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(240,165,0,0.1)"}
          >
            🪙{amt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: "10px 12px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", gap: 8,
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Say something..."
          maxLength={200}
          style={{
            flex: 1, background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7,
            padding: "8px 12px", color: "#fff", fontSize: 13,
            fontFamily: "inherit", outline: "none",
            transition: "border-color .15s",
          }}
          onFocus={e => e.target.style.borderColor = "rgba(229,57,53,0.5)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />
        <button
          onClick={sendMessage}
          style={{
            background: "#e53935", border: "none", color: "#fff",
            width: 36, height: 36, borderRadius: 7, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, flexShrink: 0, transition: "opacity .15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >➤</button>
      </div>
    </div>
  );
}