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

export default function LiveChat({ username, viewers, onTipClick }) {
  const [messages, setMessages] = useState(() => Array.from({ length: 12 }, randomMsg));
  const [input, setInput]       = useState("");
  const [chatTab, setChatTab]   = useState("Public");
  const bottomRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMessages(prev => [...prev, randomMsg()].slice(-80));
    }, 2200 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>

      {/* ── HEADER ── */}
      <div style={{
        display: "flex", alignItems: "center",
        borderBottom: "1px solid #e8e8e8",
        padding: "0 14px", height: 44, flexShrink: 0, gap: 4,
      }}>
        {["Public","Private"].map(tab => (
          <button key={tab} onClick={()=>setChatTab(tab)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "0 12px", height: "100%", fontSize: 13,
            color: chatTab===tab ? "#1a1a1a" : "#aaa",
            borderBottom: chatTab===tab ? "2px solid #e53935" : "2px solid transparent",
            fontFamily: "inherit", fontWeight: chatTab===tab ? 600 : 400,
            transition: "color .15s",
          }}>{tab}</button>
        ))}

        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#888"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#aaa"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          {viewers?.toLocaleString() || "0"}
        </div>
        <button style={{background:"none",border:"none",color:"#bbb",cursor:"pointer",padding:"4px 6px",fontSize:18,lineHeight:1}}>⋮</button>
      </div>

      {/* ── MESSAGES ── */}
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        scrollbarWidth: "thin",
        scrollbarColor: "#ddd transparent",
      }}>
        {chatTab === "Private" ? (
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#aaa",fontSize:13,textAlign:"center",padding:20}}>
            Private messages are only available during a private show
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{animation:"fadeUp .2s ease both", flexShrink: 0}}>
              {msg.isTip ? (
                <div style={{
                  background:"rgba(240,165,0,0.06)", border:"1px solid rgba(240,165,0,0.25)",
                  borderRadius:6, padding:"6px 10px", display:"flex", alignItems:"center", gap:8,
                }}>
                  <span style={{fontSize:14}}>🪙</span>
                  <div>
                    <span style={{fontSize:11,fontWeight:700,color:"#d4820a"}}>{msg.username}</span>
                    <span style={{fontSize:11,color:"#888"}}> tipped </span>
                    <span style={{fontSize:11,fontWeight:700,color:"#d4820a"}}>{msg.tipAmount} tokens!</span>
                  </div>
                </div>
              ) : (
                <div style={{display:"flex",gap:6,alignItems:"flex-start"}}>
                  <div style={{
                    background:msg.color, borderRadius:3, padding:"1px 6px",
                    fontSize:11, fontWeight:700, color:"#fff", flexShrink:0,
                    marginTop:2, maxWidth:80, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                  }}>
                    {msg.username}
                  </div>
                  <div style={{flex:1,minWidth:0,fontSize:12,color:msg.isMe?"#1a1a1a":"#333",lineHeight:1.5,wordBreak:"break-word"}}>
                    {msg.message}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={bottomRef}/>
      </div>

      {/* ── TIP GOAL PROGRESS ── */}
      <div style={{
        padding: "8px 12px", borderTop: "1px solid #e8e8e8",
        display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
        background: "#fafafa",
      }}>
        <div style={{width:20,height:20,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#4caf50"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:10,color:"#888",marginBottom:3}}>New goal – <span style={{color:"#d4820a",fontWeight:700}}>222 tk</span></div>
          <div style={{height:3,background:"#e8e8e8",borderRadius:3,overflow:"hidden"}}>
            <div style={{width:"45%",height:"100%",background:"#4caf50",borderRadius:3}}/>
          </div>
        </div>
        <button onClick={onTipClick} style={{
          background:"#4caf50", border:"none", color:"#fff",
          fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:4,
          cursor:"pointer", fontFamily:"inherit", flexShrink:0,
          display:"flex", alignItems:"center", gap:4,
        }}>Tip ›</button>
      </div>

      {/* ── INPUT ── */}
      <div style={{
        padding: "10px 12px", borderTop: "1px solid #e8e8e8",
        display: "flex", gap: 8, flexShrink: 0,
        background: "#fff",
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Public message..."
          maxLength={200}
          style={{
            flex:1, background:"#f5f5f5",
            border:"1px solid #e0e0e0", borderRadius:20,
            padding:"8px 14px", color:"#1a1a1a", fontSize:12,
            fontFamily:"inherit", outline:"none", transition:"border-color .15s",
          }}
          onFocus={e => e.target.style.borderColor="#e53935"}
          onBlur={e  => e.target.style.borderColor="#e0e0e0"}
        />
        <button style={{background:"none",border:"none",color:"#bbb",cursor:"pointer",padding:4,fontSize:18,lineHeight:1,flexShrink:0}}>😊</button>
        <button onClick={sendMessage} style={{
          background:"#e53935", border:"none", color:"#fff",
          width:34, height:34, borderRadius:"50%", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:14, flexShrink:0, transition:"opacity .15s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity=".85"}
          onMouseLeave={e => e.currentTarget.style.opacity="1"}
        >➤</button>
      </div>

    </div>
  );
}