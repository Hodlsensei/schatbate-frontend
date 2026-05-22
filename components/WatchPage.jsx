"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StreamPlayer from "./StreamPlayer";
import LiveChat from "./LiveChat";
import TipModal from "./TipModal";
import PrivateShowModal from "./PrivateShowModal";
import BuyTokensModal from "./BuyTokensModal";
import ModelStorefront from "./ModelStorefront";
import ProductDetailPage from "./ProductDetailPage";
import CheckoutPage from "./CheckoutPage";
import { MdOutlineUnfoldLessDouble } from "react-icons/md";
import { DiVim } from "react-icons/di";

/* ─── constants ─────────────────────────────────────── */
const FONT   = "'DM Sans', 'Helvetica Neue', Helvetica, sans-serif";
const COLORS = ["#c0392b","#8e24aa","#1e88e5","#00acc1","#43a047","#fb8c00"];
const FLAGS  = ["🇿🇦","🇺🇸","🇧🇷","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧"];

const RELATED  = ["Molliexo","Lwhite1","Amy01112","Catababa67","Scarlett_girlnextdoor","misstroubleme","siennadiamond","MelisaSwan611","MONA_W","MissLolly92"];
const FEATURED = ["Nisha_102","Lisabrown_","PervyboyXX","CurvyDesire1","Nimah_","Recura","michellycherryxx24","BonnyMolhada","SexyPetitex25","Freaky_CardiXX"];

const MY_SPECIFICS        = ["Mature","White","Medium","Blonde","Medium Hair","Leather","Jerk-off Instruction","Role Play","Cuckold","Mistress","Yoga","Foot Fetish","Nylon","Heels","Cock Rating"];
const I_DO_IN_SHOWS       = ["Topless","Twerk","Oil Show","Smoking","69 Position","Upskirt","Spanking","Handjob","Humiliation","Masturbation","Massage","Yoga"];
const EXCLUSIVELY_PRIVATE = ["Dirty Talk","Tittyfuck","Flashing","Foot Fetish","Footjob"];

const REVIEWS = [
  { stars:1, text:"she didn't do what I asked, not good use of my tokens",                                                                 date:"Apr 29, 2026", type:"Private"          },
  { stars:5, text:"fantastic love",                                                                                                         date:"Apr 25, 2026", type:"Exclusive Private" },
  { stars:5, text:"She was so hot and sexy, lovely lady, very responsive",                                                                  date:"Apr 18, 2026", type:"Private"          },
  { stars:1, text:"model hangs out in the chat and avoids tips — also uses a BOT to reply to DMs",                                         date:"Apr 14, 2026", type:"Private"          },
];

const SCHEDULE = [
  { day:"Monday",    slots:[]                                           },
  { day:"Tuesday",   slots:["8:30 AM – 12:30 PM"]                      },
  { day:"Wednesday", slots:["2:00 AM – 4:30 AM","10:00 AM – 11:45 AM"] },
  { day:"Thursday",  slots:[]                                           },
  { day:"Friday",    slots:["2:00 AM – 4:30 AM","9:45 AM – 12:30 PM"]  },
  { day:"Saturday",  slots:["2:00 AM – 4:30 AM","9:30 AM – 12:00 PM"]  },
  { day:"Sunday",    slots:["2:00 AM – 4:30 AM","9:00 AM – 12:00 PM"]  },
];

const TIP_MENU = [
  { label:"Hi Beautiful 💋",              tokens:3  },
  { label:"Hi Sexy 🥰",                   tokens:4  },
  { label:"Blow a Kiss 🤩",               tokens:7  },
  { label:"Love Your Outfit 🤩",          tokens:10 },
  { label:"💗 Appreciation Tip",          tokens:10 },
  { label:"Make Me Smile 😀",             tokens:11 },
  { label:"Lets see you Twirl 🥰",        tokens:15 },
];

/* layout dimensions */
const TOPBAR_H  = 52;
const NAVBAR_H  = 48;
const CHAT_TOP  = TOPBAR_H + NAVBAR_H;

/* ─── tiny helpers ──────────────────────────────────── */
function Stars({ n, size = 13 }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i<=n?"#f5a623":"none"} stroke={i<=n?"#f5a623":"#ddd"} strokeWidth="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  );
}

function Tag({ label }) {
  return (
    <span style={{
      background:"#f5f5f5", border:"1px solid #e8e8e8",
      color:"#666", fontSize:11, padding:"3px 10px",
      borderRadius:20, cursor:"pointer", fontFamily:FONT,
      transition:"border-color .15s, color .15s",
      display:"inline-block",
    }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor="#bbb"; e.currentTarget.style.color="#222"; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor="#e8e8e8"; e.currentTarget.style.color="#666"; }}
    >{label}</span>
  );
}

function SectionCard({ children, style }) {
  return (
    <div style={{
      background:"#ffffff",
      border:"1px solid #f0f0f0",
      borderRadius:10,
      padding:"18px 20px",
      ...style,
    }}>{children}</div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize:13, fontWeight:700, color:"#111",
      letterSpacing:".01em", marginBottom:14,
      display:"flex", alignItems:"center", gap:8,
    }}>{children}</div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════ */
export default function WatchPage({ username }) {
  const router    = useRouter();
  const scrollRef = useRef(null);

  const [viewers,       setViewers]       = useState(Math.floor(Math.random()*15000)+2000);
  const [showTip,       setShowTip]       = useState(false);
  const [showPrivate,   setShowPrivate]   = useState(false);
  const [showBuyTokens, setShowBuyTokens] = useState(false);
  const [following,     setFollowing]     = useState(false);
  const [notifyLive,    setNotifyLive]    = useState(false);
  const [tokens,        setTokens]        = useState(0);
  const [activeTab,     setActiveTab]     = useState("Profile");
  const [profileTab,    setProfileTab]    = useState("Profile");
  const [goalAmount]                      = useState(Math.floor(Math.random()*300)+100);
  const [goalCurrent,   setGoalCurrent]   = useState(Math.floor(Math.random()*100)+10);
  const [goalText]                        = useState("keep going, fuck anal very hard 🔥");
  const [privatePrice]                    = useState([8,16,32,60][Math.floor(Math.random()*4)]);
  const [showPip,       setShowPip]       = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems,     setCartItems]     = useState([]);
  const [epicGoal]                        = useState({ text:"Pay for my Car!", current:5, total:50000 });
  const [relatedPage,   setRelatedPage]   = useState(1);
  const [featuredPage,  setFeaturedPage]  = useState(1);

  const color   = COLORS[username?.charCodeAt(0) % COLORS.length] || "#c0392b";
  const flag    = FLAGS[username?.charCodeAt(0)  % FLAGS.length]   || "🇺🇸";
  const goalPct = Math.min(100, Math.round((goalCurrent / goalAmount) * 100));
  const epicPct = Math.min(100, Math.round((epicGoal.current / epicGoal.total) * 100));

  const STORE_TABS = ["Store","ProductDetail","Checkout"];

  const openBuyTokens = () => { setShowTip(false); setShowPrivate(false); setShowBuyTokens(true); };

  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(100, v + Math.floor(Math.random()*20)-9));
      setGoalCurrent(v => Math.min(goalAmount, v + Math.floor(Math.random()*3)));
    }, 3000);
    return () => clearInterval(id);
  }, [goalAmount]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const fn = () => setShowPip(el.scrollTop > window.innerHeight - CHAT_TOP);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [activeTab]);

  const mainTabs = ["Profile","Videos","Photos","Feed","Store"];

  /* ── button helpers ── */
  const ghostBtn = (active, ac="#e53935") => ({
    background: active ? `${ac}12` : "transparent",
    border: `1px solid ${active ? ac : "#ddd"}`,
    color: active ? ac : "#666",
    fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:6,
    cursor:"pointer", fontFamily:FONT, flexShrink:0,
    display:"flex", alignItems:"center", gap:6, transition:"all .15s",
  });

  const iconBtn = (active, ac="#f5a623") => ({
    background: active ? `${ac}12` : "transparent",
    border: `1px solid ${active ? ac : "#ddd"}`,
    color: active ? ac : "#aaa",
    width:34, height:34, borderRadius:8, cursor:"pointer",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:15, fontFamily:FONT, transition:"all .15s", flexShrink:0,
  });

  return (
    <div style={{
      height:"100%",
      background:"#ffffff",
      display:"flex",
      flexDirection:"column",
      overflow:"hidden",
      position:"relative",
      fontFamily:FONT,
    }}>

      {/* ══════════════════════════════
          MODEL SUB-NAV
      ══════════════════════════════ */}
      <div style={{
        height: NAVBAR_H, background:"#ffffff",
        borderBottom:"1px solid #eeeeee",
        display:"flex", alignItems:"center",
        padding:"0 16px", gap:10, flexShrink:0,
      }}>
        {/* Back */}
        <button onClick={()=>router.back()} style={{
          background:"none", border:"none", color:"#aaa",
          cursor:"pointer", fontSize:18, lineHeight:1, padding:"4px 6px",
        }}>‹</button>

        {/* Avatar + name + badge */}
        <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
          <div style={{
            width:30, height:30, borderRadius:"50%",
            background:color, display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:12, fontWeight:800, color:"#fff",
            border:"2px solid #eee",
          }}>
            {username?.[0]?.toUpperCase()}
          </div>
          <span style={{ fontSize:14, fontWeight:700, color:"#111" }}>{username}</span>
          <span style={{ fontSize:13 }}>{flag}</span>
          <span style={{
            background:"#e53935", color:"#fff", fontSize:9,
            fontWeight:800, padding:"2px 7px", borderRadius:4,
            letterSpacing:".06em",
          }}>LIVE</span>
        </div>

        {/* Divider */}
        <div style={{ width:1, height:20, background:"#eee", flexShrink:0 }}/>

        {/* Page tabs */}
        <div style={{ display:"flex", alignItems:"center", height:"100%", gap:2 }}>
          {mainTabs.map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{
              background:"none", border:"none", cursor:"pointer",
              padding:"0 14px", height:"100%", fontSize:13,
              color: activeTab===tab||(tab==="Store"&&STORE_TABS.includes(activeTab)) ? "#111" : "#aaa",
              borderBottom: activeTab===tab||(tab==="Store"&&STORE_TABS.includes(activeTab))
                ? "2px solid #e53935" : "2px solid transparent",
              fontFamily:"inherit", fontWeight:activeTab===tab?600:400,
              transition:"color .15s", letterSpacing:".01em",
            }}>{tab==="Store"?"🛍 Store":tab}</button>
          ))}
        </div>

        {/* Fan Club */}
        <button style={{
          marginLeft:4, background:"transparent",
          border:"1px solid #e53935", color:"#e53935",
          fontSize:12, fontWeight:700, padding:"5px 14px",
          borderRadius:20, cursor:"pointer", fontFamily:"inherit",
          display:"flex", alignItems:"center", gap:6, flexShrink:0,
          transition:"background .15s",
        }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(229,57,53,0.06)"}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}
        >🤍 Join Fan Club</button>

        {/* VIP */}
        <Link href="/dashboard/vip" style={{
          background:"linear-gradient(135deg,#a67700,#f5a623)",
          border:"none", color:"#fff", fontSize:12, fontWeight:700,
          padding:"5px 14px", borderRadius:20, cursor:"pointer",
          fontFamily:"inherit", display:"flex", alignItems:"center",
          gap:6, flexShrink:0, textDecoration:"none",
          boxShadow:"0 2px 10px rgba(245,166,35,0.25)",
        }}>
          ⭐ VIP
          <span style={{
            fontSize:9, fontWeight:800, padding:"1px 5px",
            borderRadius:3, background:"rgba(0,0,0,0.2)",
            color:"#fff", letterSpacing:".05em",
          }}>GOLD</span>
        </Link>

        <div style={{ flex:1 }}/>

        <button onClick={()=>setFollowing(f=>!f)} style={ghostBtn(following)}>
          {following ? "❤️ Following" : "🤍 Follow"}
        </button>

        <button onClick={()=>router.back()} style={{
          background:"none", border:"none", color:"#aaa",
          fontSize:13, cursor:"pointer", fontFamily:"inherit",
          display:"flex", alignItems:"center", gap:4, flexShrink:0,
        }}>
          Next Model <span style={{ fontSize:16 }}>›</span>
        </button>

        <button style={{
          background:"none", border:"none", color:"#aaa",
          fontSize:13, cursor:"pointer", fontFamily:"inherit",
          display:"flex", alignItems:"center", gap:5, flexShrink:0,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#bbb">
            <path d="M4 6h16v2H4zm3 5h10v2H7zm3 5h4v2h-4z"/>
          </svg>
          Categories
        </button>
      </div>

      {/* ══════════════════════════════
          STORE OVERLAY
      ══════════════════════════════ */}
      {STORE_TABS.includes(activeTab) && (
        <div style={{
          position:"fixed", top:CHAT_TOP, left:0, right:0, bottom:0,
          zIndex:300, overflowY:"auto", background:"#ffffff",
        }}>
          {activeTab==="Store" && (
            <ModelStorefront username={username} color={color}
              onBack={()=>setActiveTab("Profile")}
              onBuy={p=>{setSelectedProduct(p);setActiveTab("ProductDetail");}}/>
          )}
          {activeTab==="ProductDetail" && selectedProduct && (
            <ProductDetailPage product={selectedProduct}
              onBack={()=>setActiveTab("Store")}
              onViewStorefront={()=>setActiveTab("Store")}
              onSelectProduct={p=>setSelectedProduct(p)}
              onAddToCart={item=>setCartItems(prev=>[...prev,item])}
              onViewCart={()=>setActiveTab("Checkout")}/>
          )}
          {activeTab==="Checkout" && (
            <CheckoutPage orderItems={cartItems.length>0?cartItems:undefined}
              onBack={()=>setActiveTab("Store")}/>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MAIN AREA — ONE scroll container
      ══════════════════════════════════════════════════════ */}
      <div ref={scrollRef} style={{
        flex:1,
        overflowY:"auto",
        overflowX:"hidden",
        scrollbarWidth:"thin",
        scrollbarColor:"#eee transparent",
        visibility:STORE_TABS.includes(activeTab)?"hidden":"visible",
      }}>

        {/* ── TOP ROW: Video (left) + Chat (right) — EQUAL 50/50 split ── */}
        <div style={{
          display:"flex",
          height:`calc(100vh - ${CHAT_TOP}px)`,
          background:"#ffffff",
        }}>

          {/* Video — flex:1 (50%) */}
          <div style={{ flex:1, position:"relative", background:"#000", minWidth:0 }}>
            <StreamPlayer username={username} color={color} emoji="😍" viewers={viewers}/>
          </div>

          {/* Chat panel — flex:1 (50%) for equal split */}
          <div style={{
            flex:1,
            display:"flex",
            flexDirection:"column",
            background:"#ffffff",
            borderLeft:"1px solid #eeeeee",
            overflow:"hidden",
            height:"100%",
          }}>
            <LiveChat username={username} viewers={viewers} onTipClick={()=>setShowTip(true)}/>
          </div>

        </div>

        {/* ════ ACTION BAR ════ */}
        <div style={{
          background:"#ffffff", borderTop:"1px solid #eeeeee",
          borderBottom:"1px solid #eeeeee",
          display:"flex", alignItems:"center",
          padding:"0 16px", gap:12, height:54, flexShrink:0,
        }}>
          {/* Viewers */}
          <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#e53935" }}/>
            <span style={{ fontSize:13, color:"#555", fontWeight:500 }}>
              {viewers.toLocaleString()}
            </span>
          </div>

          {/* Goal */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{
              display:"flex", alignItems:"center",
              justifyContent:"space-between", marginBottom:4,
            }}>
              <span style={{ fontSize:11, color:"#aaa", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                🎯 {goalText}
              </span>
              <span style={{ fontSize:11, color:"#bbb", flexShrink:0, marginLeft:8 }}>
                <span style={{ color:"#f5a623", fontWeight:700 }}>{goalCurrent}</span>
                <span style={{ color:"#bbb" }}> / {goalAmount} tk · {goalPct}%</span>
              </span>
            </div>
            <div style={{ width:"100%", height:3, background:"#eee", borderRadius:4, overflow:"hidden" }}>
              <div style={{
                width:`${goalPct}%`, height:"100%",
                background:"linear-gradient(90deg,#1e88e5,#00acc1)",
                borderRadius:4, transition:"width .5s",
              }}/>
            </div>
          </div>

          {/* King */}
          <div style={{
            display:"flex", flexDirection:"column",
            alignItems:"flex-end", flexShrink:0,
          }}>
            <span style={{ fontSize:10, color:"#bbb" }}>King of the room</span>
            <span style={{ fontSize:12, color:"#f5a623", fontWeight:700 }}>🔥 TopFan</span>
          </div>

          {/* Private show */}
          <button onClick={()=>setShowPrivate(true)} style={{
            background:"transparent",
            border:"1px solid #ddd",
            color:"#444", fontSize:12, fontWeight:600,
            padding:"7px 14px", borderRadius:8,
            cursor:"pointer", fontFamily:"inherit", flexShrink:0,
            display:"flex", alignItems:"center", gap:6,
            transition:"border-color .15s",
          }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#aaa"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="#ddd"}
          >
            Private Show
            <span style={{ color:"#f5a623", fontWeight:800 }}>{privatePrice} tk</span>
            <span style={{ fontSize:10, color:"#bbb" }}>▼</span>
          </button>

          {/* Send Tip */}
          <button onClick={()=>setShowTip(true)} style={{
            background:"#1a6b2a",
            border:"1px solid #2d9c42",
            color:"#fff", fontSize:13, fontWeight:700,
            padding:"8px 20px", borderRadius:8,
            cursor:"pointer", fontFamily:"inherit", flexShrink:0,
            display:"flex", alignItems:"center", gap:8,
            transition:"opacity .15s",
          }}
            onMouseEnter={e=>e.currentTarget.style.opacity=".85"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}
          >
            Send Tip
            <div style={{
              width:24, height:24, borderRadius:"50%",
              background:"rgba(255,255,255,0.15)",
              display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:13,
            }}>🪙</div>
          </button>
        </div>

        {/* ════ PROFILE BANNER ════ */}
        <div style={{ background:"#ffffff" }}>

          {/* Cover photo area */}
          <div style={{
            width:"100%", height:140, position:"relative",
            background:`linear-gradient(135deg,${color}18 0%,#f8f8f8 100%)`,
            overflow:"hidden",
          }}>
            <div style={{
              position:"absolute", inset:0,
              background:"linear-gradient(to bottom, transparent 30%, rgba(255,255,255,0.9) 100%)",
            }}/>
          </div>

          {/* Avatar + info row */}
          <div style={{
            display:"flex", alignItems:"flex-end", gap:16,
            padding:"0 24px 20px", marginTop:-50,
            position:"relative", zIndex:2,
          }}>
            {/* Avatar */}
            <div style={{
              width:88, height:88, borderRadius:"50%",
              background:color, flexShrink:0,
              border:"3px solid #ffffff",
              display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:34,
              fontWeight:800, color:"#fff",
              boxShadow:`0 0 0 1px ${color}33, 0 8px 24px rgba(0,0,0,0.12)`,
            }}>
              {username?.[0]?.toUpperCase()}
            </div>

            {/* Name + stats */}
            <div style={{ flex:1, paddingBottom:4 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                <span style={{ fontSize:22, fontWeight:800, color:"#111" }}>{username}</span>
                <span style={{ fontSize:14, color:"#bbb" }}>♀</span>
                <span style={{ fontSize:14 }}>{flag}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{
                  display:"flex", alignItems:"center", gap:5,
                  background:"#f5f5f5", border:"1px solid #eee",
                  borderRadius:20, padding:"3px 12px",
                }}>
                  <span style={{ fontSize:12, color:"#f5a623" }}>⚙</span>
                  <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>353</span>
                </div>
                <div style={{
                  display:"flex", alignItems:"center", gap:5,
                  background:"#f5f5f5", border:"1px solid #eee",
                  borderRadius:20, padding:"3px 12px",
                }}>
                  <span style={{ fontSize:12, color:"#aaa" }}>👁</span>
                  <span style={{ fontSize:12, color:"#888" }}>{viewers.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display:"flex", alignItems:"center", gap:8, paddingBottom:4 }}>
              <button style={{
                background:"transparent", border:"1px solid #e53935",
                color:"#e53935", fontSize:12, fontWeight:700,
                padding:"7px 16px", borderRadius:20,
                cursor:"pointer", fontFamily:"inherit",
                display:"flex", alignItems:"center", gap:6,
                transition:"background .15s",
              }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(229,57,53,0.06)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >🤍 Join Fan Club</button>

              <button onClick={()=>setFollowing(f=>!f)} style={iconBtn(following,"#e53935")}>
                {following?"❤️":"🤍"}
              </button>
              <button onClick={()=>setNotifyLive(n=>!n)} style={iconBtn(notifyLive,"#f5a623")}>
                🔔
              </button>
              <button style={iconBtn(false)}>👤</button>
              <button style={iconBtn(false)}>✉️</button>
            </div>
          </div>

          {/* Profile sub-tabs */}
          <div style={{
            display:"flex", padding:"0 24px",
            borderBottom:"1px solid #eeeeee", gap:0,
          }}>
            {["Profile","Photos 27","Fan Club & Feed"].map(t => (
              <button key={t} onClick={()=>setProfileTab(t)} style={{
                background:"none", border:"none", cursor:"pointer",
                padding:"11px 18px", fontSize:13, fontFamily:"inherit",
                color:profileTab===t?"#111":"#aaa",
                borderBottom:profileTab===t?"2px solid #e53935":"2px solid transparent",
                fontWeight:profileTab===t?700:400, transition:"color .15s",
                letterSpacing:".01em",
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* ════ PROFILE BODY ════ */}
        <div style={{
          background:"#f7f7f7", padding:"20px 24px",
          display:"grid", gridTemplateColumns:"3fr 2fr",
          gap:20, alignItems:"start",
        }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

            {/* Bio */}
            <SectionCard>
              <SectionTitle>Welcome to {username}'s room!</SectionTitle>
              <div style={{
                display:"grid", gridTemplateColumns:"120px 1fr",
                gap:"10px 0", fontSize:13,
              }}>
                {[
                  ["Languages:","English, French"],
                  ["Age:","58 years old"],
                  ["Interested in:","Everybody"],
                  ["Body type:","Medium Build"],
                  ["Ethnicity:","White"],
                  ["Eye color:","Blue"],
                ].map(([l,v],i) => (
                  <div key={i} style={{ display:"contents" }}>
                    <span style={{ color:"#aaa", alignSelf:"center", fontSize:12 }}>{l}</span>
                    <span style={{ color:"#333", fontSize:13 }}>{v}</span>
                  </div>
                ))}
                <span style={{ color:"#aaa", alignSelf:"start", paddingTop:6, fontSize:12 }}>Interests:</span>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, paddingTop:4 }}>
                  {["Action","Adventure","Bars","Beach","Coffee","Comedy","Concerts","Documentary","Drama","Gin","Meditation","Picnics","Seafood","Shopping"].map(i=>(
                    <Tag key={i} label={i}/>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Private shows info */}
            <SectionCard>
              {/* Header row: title + rating */}
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                    <span style={{ fontSize:18 }}>🪙</span>
                    <span style={{ fontSize:14, fontWeight:700, color:"#111" }}>My Private Shows</span>
                  </div>
                  <span style={{ fontSize:12, color:"#f5a623", fontWeight:600 }}>from {privatePrice} tk/min</span>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:11, color:"#aaa", marginBottom:4 }}>35 ratings</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:18, fontWeight:800, color:"#111" }}>4.3</span>
                    <Stars n={4}/>
                  </div>
                </div>
              </div>
              {/* Best for Privates badge */}
              <div style={{
                display:"flex", alignItems:"flex-start", gap:10,
                background:"#fffbf0", border:"1px solid #f0e0a0",
                borderRadius:8, padding:"10px 14px", marginBottom:12,
              }}>
                <span style={{ fontSize:20, flexShrink:0 }}>💎</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#f5a623", marginBottom:2 }}>Best for Privates</div>
                  <div style={{ fontSize:12, color:"#888" }}>One of the highest-rated models for Private shows</div>
                </div>
              </div>
              {/* I Do in Private Shows */}
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                <span style={{ fontSize:15 }}>🔥</span>
                <span style={{ fontSize:13, fontWeight:700, color:"#111" }}>I Do in Private Shows</span>
              </div>
              <p style={{ color:"#888", fontSize:12, lineHeight:2, margin:0 }}>
                69 Position, Yoga, Upskirt, Twerk, Topless, Spanking, Smoking, Oil Show, Nylon, Handjob,
                Humiliation, Heels, Jerk-off Instruction, Massage, Masturbation, Cuckold, Flashing,
                Foot Fetish, Footjob, Tittyfuck, Mistress, Leather, Dirty Talk, Cock Rating,
                Blowjob, Doggy Style, Facesitting, Role Play, Striptease
              </p>
            </SectionCard>

            {/* Reviews */}
            <SectionCard>
              <SectionTitle>
                Users' Reviews
                <span style={{ color:"#bbb", fontWeight:400, fontSize:12 }}>4</span>
              </SectionTitle>
              {REVIEWS.map((r,i) => (
                <div key={i} style={{
                  paddingBottom:14, marginBottom:i<REVIEWS.length-1?14:0,
                  borderBottom:i<REVIEWS.length-1?"1px solid #f5f5f5":"none",
                }}>
                  <Stars n={r.stars}/>
                  <p style={{ color:"#333", fontSize:13, margin:"7px 0 4px", lineHeight:1.6 }}>
                    {r.text}
                  </p>
                  <span style={{ color:"#bbb", fontSize:11 }}>
                    {r.date} · <span style={{ color:"#aaa" }}>{r.type}</span>
                  </span>
                </div>
              ))}
            </SectionCard>

            {/* Epic Goal */}
            <SectionCard>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <SectionTitle style={{ marginBottom:0 }}>{username}'s Epic Goal</SectionTitle>
                <span style={{ color:"#bbb", cursor:"pointer", fontSize:13, marginTop:-1 }}>ⓘ</span>
              </div>
              <p style={{ color:"#8e24aa", fontSize:14, fontWeight:700, margin:"0 0 14px" }}>
                {epicGoal.text}
              </p>
              <div style={{
                background:"#f9f9f9", border:"1px solid #f0f0f0",
                borderRadius:8, padding:"12px 16px", marginBottom:14,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                  <span style={{ color:"#888", fontSize:12 }}>
                    {epicGoal.current} tk / {epicGoal.total.toLocaleString()} tk
                  </span>
                  <span style={{ color:"#bbb", fontSize:12 }}>{epicPct}%</span>
                </div>
                <div style={{ height:5, background:"#eee", borderRadius:4, overflow:"hidden" }}>
                  <div style={{
                    width:`${epicPct}%`, height:"100%",
                    background:"#8e24aa", borderRadius:4,
                  }}/>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ color:"#bbb", fontSize:12 }}>1 contributor</span>
                <button style={{
                  background:"#f5a623", border:"none",
                  color:"#000", fontWeight:800, fontSize:13,
                  padding:"8px 22px", borderRadius:20,
                  cursor:"pointer", fontFamily:"inherit",
                }}>Contribute</button>
              </div>
            </SectionCard>

            {/* Categories */}
            <SectionCard>
              <SectionTitle>{username}'s Categories</SectionTitle>
              {[
                { label:"My Specifics:",                tags:MY_SPECIFICS        },
                { label:"I Do in My Shows:",            tags:I_DO_IN_SHOWS       },
                { label:"I Exclusively Do in Private:", tags:EXCLUSIVELY_PRIVATE },
              ].map(({label,tags}) => (
                <div key={label} style={{ marginBottom:14 }}>
                  <span style={{ color:"#aaa", fontSize:11, display:"block", marginBottom:8 }}>
                    {label}
                  </span>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {tags.map(t => <Tag key={t} label={t}/>)}
                  </div>
                </div>
              ))}
            </SectionCard>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

            {/* Albums */}
            <SectionCard>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:15, fontWeight:700, color:"#111" }}>Albums</span>
                  <span style={{ fontSize:13, color:"#bbb" }}>6</span>
                </div>
                <button style={{
                  background:"none", border:"1px solid #eee", color:"#555",
                  fontSize:12, cursor:"pointer", fontFamily:"inherit",
                  padding:"4px 12px", borderRadius:20,
                  display:"flex", alignItems:"center", gap:3,
                }}>See All ›</button>
              </div>
              {/* Row 1 */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:8 }}>
                {[
                  { label:"Public", count:6, likes:191, free:true },
                  { label:"Happy Feet video", count:1, likes:1, price:99 },
                  { label:"Foot show", count:5, likes:1, price:66 },
                ].map((album, i) => (
                  <div key={i} style={{ cursor:"pointer" }}>
                    <div style={{
                      borderRadius:8, overflow:"hidden",
                      position:"relative", aspectRatio:"4/3",
                      background: album.free
                        ? `linear-gradient(135deg,${color}22,#e8e8e8)`
                        : "#1a1a1a",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      marginBottom:6,
                    }}>
                      {album.free ? (
                        <span style={{ fontSize:32, opacity:0.4 }}>📷</span>
                      ) : (
                        <div style={{
                          display:"flex", flexDirection:"column",
                          alignItems:"center", gap:5, padding:10,
                        }}>
                          <div style={{ display:"flex", gap:4 }}>
                            {["#1565c0","#8e24aa","#e53935"].map((c,j) => (
                              <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill={c}>
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            ))}
                          </div>
                          <span style={{ color:"#aaa", fontSize:10, textAlign:"center" }}>Join Fan Club</span>
                          <span style={{ color:"#666", fontSize:9 }}>or</span>
                          <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                            <span style={{ fontSize:12 }}>🪙</span>
                            <span style={{ color:"#f5a623", fontSize:12, fontWeight:800 }}>{album.price} tk</span>
                          </div>
                        </div>
                      )}
                      {/* count badge */}
                      <span style={{
                        position:"absolute", bottom:5, right:7,
                        color: album.free ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.4)",
                        fontSize:10, fontWeight:600,
                      }}>{album.count}</span>
                    </div>
                    {/* label + likes */}
                    <div style={{ fontSize:11, color:"#333", fontWeight:500, marginBottom:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{album.label}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ color:"#e53935", fontSize:11 }}>♥</span>
                      <span style={{ fontSize:11, color:"#aaa" }}>{album.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Row 2 */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                {[
                  { label:"Get ready with me!", likes:1, price:66 },
                  { label:"Morning Wake Up", likes:2, price:66 },
                  { label:"Sunday morning breakfast", likes:2, price:60 },
                ].map((album, i) => (
                  <div key={i} style={{ cursor:"pointer" }}>
                    <div style={{
                      borderRadius:8, overflow:"hidden",
                      position:"relative", aspectRatio:"4/3",
                      background:"#1a1a1a",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      marginBottom:6,
                    }}>
                      <div style={{
                        display:"flex", flexDirection:"column",
                        alignItems:"center", gap:5, padding:10,
                      }}>
                        <div style={{ display:"flex", gap:4 }}>
                          {["#1565c0","#8e24aa","#e53935"].map((c,j) => (
                            <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill={c}>
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <span style={{ color:"#aaa", fontSize:10, textAlign:"center" }}>Join Fan Club</span>
                        <span style={{ color:"#666", fontSize:9 }}>or</span>
                        <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                          <span style={{ fontSize:12 }}>🪙</span>
                          <span style={{ color:"#f5a623", fontSize:12, fontWeight:800 }}>{album.price} tk</span>
                        </div>
                      </div>
                      <span style={{
                        position:"absolute", bottom:5, right:7,
                        color:"rgba(255,255,255,0.4)", fontSize:10, fontWeight:600,
                      }}>5</span>
                    </div>
                    <div style={{ fontSize:11, color:"#333", fontWeight:500, marginBottom:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{album.label}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ color:"#e53935", fontSize:11 }}>♥</span>
                      <span style={{ fontSize:11, color:"#aaa" }}>{album.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Broadcast Schedule */}
            <SectionCard>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:15 }}>📅</span>
                  <span style={{ fontSize:14, fontWeight:700, color:"#111" }}>Broadcast Schedule</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:11, color:"#bbb" }}>Notify live:</span>
                  <div onClick={()=>setNotifyLive(n=>!n)} style={{
                    width:36, height:20, borderRadius:10,
                    cursor:"pointer", position:"relative",
                    background:notifyLive?"#e53935":"#e0e0e0",
                    transition:"background .2s", flexShrink:0,
                  }}>
                    <div style={{
                      position:"absolute", top:3,
                      left:notifyLive?17:3,
                      width:14, height:14,
                      borderRadius:"50%", background:"#fff",
                      transition:"left .2s",
                      boxShadow:"0 1px 3px rgba(0,0,0,0.2)",
                    }}/>
                  </div>
                </div>
              </div>
              <p style={{ color:"#bbb", fontSize:11, margin:"0 0 14px" }}>
                All times in your timezone — GMT-07:00
              </p>
              {SCHEDULE.map(({day,slots},i) => (
                <div key={day} style={{
                  display:"flex", alignItems:"center",
                  justifyContent:"space-between",
                  padding:"8px 0",
                  borderBottom:i<SCHEDULE.length-1?"1px solid #f5f5f5":"none",
                }}>
                  <span style={{
                    fontSize:13,
                    color:day==="Friday"?"#e53935":"#555",
                    fontWeight:day==="Friday"?700:400, minWidth:100,
                  }}>{day}</span>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap", justifyContent:"flex-end" }}>
                    {slots.length===0
                      ? <span style={{ fontSize:12, color:"#ccc" }}>No broadcasts</span>
                      : slots.map(s => (
                          <span key={s} style={{
                            background:"#f5f5f5", border:"1px solid #eee",
                            color:"#666", fontSize:11, padding:"3px 8px", borderRadius:4,
                          }}>{s}</span>
                        ))
                    }
                  </div>
                </div>
              ))}
            </SectionCard>

            {/* Knights */}
            <SectionCard>
              <SectionTitle>Knights</SectionTitle>
              <div style={{ display:"flex", gap:20 }}>
                {[
                  { name:"SXSAARFEND", count:86, ring:"#e53935" },
                  { name:"prankman1",  count:39, ring:"#f5a623" },
                ].map(k => (
                  <div key={k.name} style={{
                    display:"flex", flexDirection:"column",
                    alignItems:"center", gap:8,
                  }}>
                    <div style={{ position:"relative" }}>
                      <div style={{
                        width:56, height:56, borderRadius:"50%",
                        border:`2px solid ${k.ring}`,
                        background:"#f5f5f5",
                        display:"flex", alignItems:"center",
                        justifyContent:"center", fontSize:20,
                        fontWeight:800, color:"#333",
                      }}>{k.name[0]}</div>
                      <div style={{
                        position:"absolute", bottom:-2, right:-2,
                        background:k.ring, borderRadius:"50%",
                        width:20, height:20,
                        display:"flex", alignItems:"center",
                        justifyContent:"center", fontSize:9,
                        fontWeight:800, color:"#fff",
                        border:"2px solid #fff",
                      }}>{k.count}</div>
                    </div>
                    <span style={{ color:"#aaa", fontSize:11 }}>{k.name}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Tip Menu */}
            <SectionCard>
              <SectionTitle>🎰 {username}'s Tip Menu</SectionTitle>
              {TIP_MENU.map((item,i) => (
                <div key={i} style={{
                  display:"flex", alignItems:"center",
                  justifyContent:"space-between",
                  padding:"9px 0",
                  borderBottom:i<TIP_MENU.length-1?"1px solid #f5f5f5":"none",
                }}>
                  <span style={{ color:"#444", fontSize:13 }}>{item.label}</span>
                  <span style={{
                    color:"#f5a623", fontSize:13, fontWeight:800,
                    background:"#fffbf0", border:"1px solid #f0e0a0",
                    borderRadius:20, padding:"2px 10px",
                  }}>{item.tokens} tk</span>
                </div>
              ))}
            </SectionCard>

          </div>
        </div>

        {/* ════ RELATED GIRLS ════ */}
        <ModelGrid
          title="Related Girls"
          models={RELATED}
          page={relatedPage}
          setPage={setRelatedPage}
          onModel={name=>router.push(`/watch/${name}`)}
        />

        {/* ════ FEATURED GIRLS ════ */}
        <ModelGrid
          title="Featured Girls"
          models={FEATURED}
          page={featuredPage}
          setPage={setFeaturedPage}
          onModel={name=>router.push(`/watch/${name}`)}
          showDots
        />

        {/* ── FOOTER ── */}
        <div style={{
          background:"#f5f5f5", borderTop:"1px solid #eee",
          padding:"36px 24px",
          display:"grid",
          gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",
          gap:32,
        }}>
          <div>
            <div style={{ fontSize:17, fontWeight:900, marginBottom:12 }}>
              <span style={{ color:"#e53935" }}>STRIP</span>
              <span style={{ color:"#111" }}>CHATBATE</span>
            </div>
            <p style={{ fontSize:12, color:"#aaa", lineHeight:1.8, margin:"0 0 16px" }}>
              The world's premier 18+ LIVE adult entertainment destination.
            </p>
            <p style={{ fontSize:11, color:"#ccc", margin:0 }}>
              All models are 18 years of age or older.
            </p>
          </div>
          {[
            { title:"STRIPCHATBATE",  links:["About","Blog","Media Inquiries"] },
            { title:"LEGAL & SAFETY", links:["Privacy Policy","Terms of Use","DMCA Policy","Cookies"] },
            { title:"WORK WITH US",   links:["Webcam Affiliate Program"] },
            { title:"HELP",           links:["Support & FAQ","Billing Support","DMCA Protection"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize:10, fontWeight:800, color:"#ccc", letterSpacing:".1em", marginBottom:12 }}>
                {col.title}
              </div>
              {col.links.map(link => (
                <div key={link} style={{
                  fontSize:12, color:"#ccc", marginBottom:8,
                  cursor:"pointer", transition:"color .15s",
                }}
                  onMouseEnter={e=>e.currentTarget.style.color="#666"}
                  onMouseLeave={e=>e.currentTarget.style.color="#ccc"}
                >{link}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          background:"#f5f5f5", borderTop:"1px solid #eee",
          padding:"14px 24px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <span style={{ fontSize:10, color:"#ccc" }}>
            18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement
          </span>
          <span style={{ fontSize:10, color:"#ccc" }}>© 2025 Stripchatbate</span>
        </div>

      </div>{/* ── end scrollRef ── */}


      {/* ── PiP ── */}
      {showPip && !STORE_TABS.includes(activeTab) && (
        <div style={{
          position:"fixed", bottom:80, left:16, zIndex:999,
          width:260, borderRadius:10, overflow:"hidden",
          boxShadow:"0 8px 40px rgba(0,0,0,0.15)",
          border:"1px solid #eee", background:"#fff",
        }}>
          <div style={{
            display:"flex", alignItems:"center",
            justifyContent:"space-between",
            padding:"6px 10px", background:"#fff",
            borderBottom:"1px solid #f0f0f0",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{
                width:18, height:18, borderRadius:"50%",
                background:color, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:8, fontWeight:800, color:"#fff",
              }}>{username?.[0]?.toUpperCase()}</div>
              <span style={{ fontSize:11, fontWeight:700, color:"#111" }}>{username}</span>
              <span style={{
                background:"#e53935", color:"#fff",
                fontSize:8, fontWeight:800, padding:"1px 5px", borderRadius:3,
              }}>LIVE</span>
            </div>
            <button onClick={()=>setShowPip(false)} style={{
              background:"none", border:"none", color:"#bbb",
              cursor:"pointer", fontSize:15, lineHeight:1, padding:2,
            }}>✕</button>
          </div>
          <div style={{ aspectRatio:"16/9" }}>
            <StreamPlayer username={username} color={color} emoji="😍" viewers={viewers}/>
          </div>
        </div>
      )}

      {/* ── MODALS ── */}
      {showPrivate && (
        <PrivateShowModal username={username} privatePrice={privatePrice}
          onClose={()=>setShowPrivate(false)} onBuyTokens={openBuyTokens}
          onStart={()=>{ setShowPrivate(false); setShowBuyTokens(true); }}/>
      )}
      {showBuyTokens && (
        <BuyTokensModal onClose={()=>setShowBuyTokens(false)} username={username} avatarColor={color}/>
      )}
      {showTip && (
        <TipModal username={username} tokens={tokens}
          onClose={()=>setShowTip(false)} onBuyTokens={openBuyTokens}
          onTip={amount=>{ setTokens(t=>Math.max(0,t-amount)); setShowTip(false); }}/>
      )}

    </div>
  );
}

/* ─── ModelGrid sub-component ─────────────────────── */
function ModelGrid({ title, models, page, setPage, onModel, showDots }) {
  return (
    <div style={{
      padding:"24px",
      background:"#f9f9f9",
      borderTop:"1px solid #eee",
    }}>
      <div style={{
        fontSize:14, fontWeight:800, color:"#111",
        letterSpacing:".01em", marginBottom:14,
      }}>{title}</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:4 }}>
        {models.map((name,i) => (
          <div key={name} onClick={()=>onModel(name)} style={{
            cursor:"pointer", overflow:"hidden", borderRadius:6,
            border:"1px solid #eee", transition:"border-color .15s",
            background:"#fff",
          }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#ccc"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="#eee"}
          >
            <div style={{
              aspectRatio:"3/4",
              background:`hsl(${i*37+i*13},8%,94%)`,
              display:"flex", alignItems:"center",
              justifyContent:"center", position:"relative",
            }}>
              <span style={{ color:"rgba(0,0,0,0.08)", fontSize:34 }}>👤</span>
              {i===1 && (
                <div style={{
                  position:"absolute", top:6, left:6,
                  background:"#1565c0", color:"#fff",
                  fontSize:8, fontWeight:800, padding:"2px 6px",
                  borderRadius:3, display:"flex", alignItems:"center", gap:3,
                }}>
                  <span style={{ fontSize:7 }}>👥</span> Group Show
                </div>
              )}
            </div>
            <div style={{ padding:"6px 8px", background:"#fff" }}>
              <span style={{
                fontSize:11, color:"#555", fontWeight:600,
                overflow:"hidden", textOverflow:"ellipsis",
                whiteSpace:"nowrap", display:"block",
              }}>{name}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div style={{
        display:"flex", alignItems:"center",
        justifyContent:"center", gap:5, marginTop:18,
      }}>
        {[1,2,3,4,5].map(n => (
          <button key={n} onClick={()=>setPage(n)} style={{
            width:30, height:30, borderRadius:6,
            border:"1px solid #eee",
            cursor:"pointer",
            background:page===n?"#e53935":"#fff",
            color:page===n?"#fff":"#aaa",
            fontSize:12, fontWeight:page===n?700:400,
            fontFamily:"'DM Sans',sans-serif",
            transition:"all .15s",
          }}>{n}</button>
        ))}
        {showDots && (
          <>
            <span style={{ color:"#ddd", fontSize:13, padding:"0 2px" }}>…</span>
            <button style={{
              width:30, height:30, borderRadius:6,
              border:"1px solid #eee", cursor:"pointer",
              background:"#fff", color:"#aaa", fontSize:12,
              fontFamily:"'DM Sans',sans-serif",
            }}>100</button>
          </>
        )}
        <button style={{
          background:"#fff", border:"1px solid #eee",
          color:"#888", fontSize:12, padding:"6px 14px",
          borderRadius:6, cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif",
          display:"flex", alignItems:"center", gap:4,
        }}>Next ›</button>
      </div>
    </div>
  );
}     