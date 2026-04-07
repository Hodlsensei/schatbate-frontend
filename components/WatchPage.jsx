"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import StreamPlayer from "./StreamPlayer";
import LiveChat from "./LiveChat";
import TipModal from "./TipModal";
import PrivateShowModal from "./PrivateShowModal";
import BuyTokensModal from "./BuyTokensModal";
import ModelStorefront from "./ModelStorefront";
import ProductDetailPage from "./ProductDetailPage";
import CheckoutPage from "./CheckoutPage";

const COLORS = ["#c0392b","#8e24aa","#1e88e5","#00acc1","#43a047","#fb8c00"];
const FLAGS  = ["🇿🇦","🇺🇸","🇧🇷","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧"];

const RELATED = [
  "honeypot224","Benedicts","DOJAPATIENCE8","FAIBEJOJO19","kashAsia","choco_petite",
  "freak_naughty","Shaniko89","SWEET_LUELLA","BlackPearl_19","sexxyykittyy","MissBehave_",
];

const CATEGORIES_LIST = [
  "Erotic Dance","Twerk","Oil Show","Dildo or Vibrator","Fingering","Doggy Style",
  "Spanking","Topless","Sex Toys","Blowjob","Anal","Squirt","Flashing",
];

const CHAT_WIDTH  = 460;
const TOPBAR_H    = 48;
const NAVBAR_H    = 48;
const BANNER_H    = 52;
const ACTION_H    = 58;
const CHAT_TOP    = TOPBAR_H + NAVBAR_H;
const CHAT_BOTTOM = BANNER_H;

export default function WatchPage({ username }) {
  const router    = useRouter();
  const scrollRef = useRef(null);

  const [viewers, setViewers]             = useState(Math.floor(Math.random() * 20000) + 1000);
  const [showTip, setShowTip]             = useState(false);
  const [showPrivate, setShowPrivate]     = useState(false);
  const [showBuyTokens, setShowBuyTokens] = useState(false);
  const [following, setFollowing]         = useState(false);
  const [tokens, setTokens]               = useState(0);
  const [activeTab, setActiveTab]         = useState("Profile");
  const [goalAmount]                      = useState(Math.floor(Math.random() * 300) + 100);
  const [goalCurrent, setGoalCurrent]     = useState(Math.floor(Math.random() * 150) + 20);
  const [goalText]                        = useState("kepp going fuck anal very hard");
  const [privatePrice]                    = useState([8,16,32,60][Math.floor(Math.random()*4)]);
  const [showPip, setShowPip]             = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems]             = useState([]);

  const color   = COLORS[username?.charCodeAt(0) % COLORS.length] || "#c0392b";
  const flag    = FLAGS[username?.charCodeAt(0) % FLAGS.length]    || "🇺🇸";
  const goalPct = Math.min(100, Math.round((goalCurrent / goalAmount) * 100));

  const STORE_TABS = ["Store", "ProductDetail", "Checkout"];

  const openBuyTokens = () => {
    setShowTip(false);
    setShowPrivate(false);
    setShowBuyTokens(true);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(100, v + Math.floor(Math.random() * 20) - 9));
      setGoalCurrent(v => Math.min(goalAmount, v + Math.floor(Math.random() * 3)));
    }, 3000);
    return () => clearInterval(id);
  }, [goalAmount]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    const handleScroll = () => setShowPip(scrollEl.scrollTop > window.innerHeight - CHAT_TOP);
    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeTab]);

  const tabs = ["Profile", "Videos", "Photos", "Feed", "Store"];
  const VIDEO_H = `calc(100vh - ${TOPBAR_H + NAVBAR_H + BANNER_H + ACTION_H}px)`;

  return (
    <div style={{ height: "100%", background: "#111", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

      {/* ── INNER NAVBAR ── */}
      <div style={{
        height: NAVBAR_H, background: "#1a1a1a",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0,
      }}>
        <button onClick={()=>router.back()} style={{background:"none",border:"none",color:"#aaa",cursor:"pointer",padding:"4px 8px",fontSize:20,lineHeight:1}}>‹</button>

        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",border:"2px solid rgba(255,255,255,0.15)"}}>
            {username?.[0]?.toUpperCase()}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:14,fontWeight:700,color:"#fff"}}>{username}</span>
            <span style={{fontSize:12}}>{flag}</span>
            <span style={{background:"#e53935",color:"#fff",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:3,letterSpacing:".05em"}}>LIVE</span>
          </div>
        </div>

        <div style={{display:"flex",alignItems:"center",height:"100%",marginLeft:8,gap:2}}>
          {tabs.map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{
              background:"none", border:"none", cursor:"pointer",
              padding:"0 14px", height:"100%", fontSize:13,
              color: activeTab===tab || (tab==="Store" && STORE_TABS.includes(activeTab)) ? "#fff" : "#888",
              borderBottom: activeTab===tab || (tab==="Store" && STORE_TABS.includes(activeTab)) ? "2px solid #e53935" : "2px solid transparent",
              fontFamily:"inherit", fontWeight: activeTab===tab ? 600 : 400,
              transition:"color .15s",
              ...(tab === "Store" && !STORE_TABS.includes(activeTab) ? { color: "#e08080" } : {}),
            }}>
              {tab === "Store" ? "🛍 Store" : tab}
            </button>
          ))}
        </div>

        <button style={{
          marginLeft:4, background:"transparent", border:"1px solid #e53935",
          color:"#e53935", fontSize:12, fontWeight:700, padding:"6px 14px",
          borderRadius:20, cursor:"pointer", fontFamily:"inherit",
          display:"flex", alignItems:"center", gap:6, flexShrink:0,
        }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(229,57,53,0.1)"}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}
        >🤍 Join Fan Club</button>

        <div style={{flex:1}}/>

        <button onClick={()=>setFollowing(f=>!f)} style={{
          background: following?"rgba(229,57,53,0.15)":"transparent",
          border:`1px solid ${following?"#e53935":"rgba(255,255,255,0.2)"}`,
          color: following?"#e53935":"#aaa",
          fontSize:12, padding:"6px 14px", borderRadius:6,
          cursor:"pointer", fontFamily:"inherit", flexShrink:0,
        }}>
          {following ? "❤️ Following" : "🤍 Follow"}
        </button>

        <button onClick={()=>router.back()} style={{background:"none",border:"none",color:"#888",fontSize:13,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
          Next Model <span style={{fontSize:16}}>›</span>
        </button>

        <button style={{background:"none",border:"none",color:"#888",fontSize:13,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#888"><path d="M4 6h16v2H4zm3 5h10v2H7zm3 5h4v2h-4z"/></svg>
          Categories
        </button>
      </div>

      {/* ── STORE / PRODUCT DETAIL / CHECKOUT OVERLAY ── */}
      {STORE_TABS.includes(activeTab) && (
        <div style={{
          position: "fixed",
          top: CHAT_TOP,
          left: 0,
          right: 0,
          bottom: BANNER_H,
          zIndex: 300,
          overflowY: "auto",
          background: "#0d0d0d",
        }}>
          {activeTab === "Store" && (
            <ModelStorefront
              username={username}
              color={color}
              onBack={() => setActiveTab("Profile")}
              onBuy={(product) => {
                setSelectedProduct(product);
                setActiveTab("ProductDetail");
              }}
            />
          )}

          {activeTab === "ProductDetail" && selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              onBack={() => setActiveTab("Store")}
              onViewStorefront={() => setActiveTab("Store")}
              onSelectProduct={(product) => {
                setSelectedProduct(product);
              }}
              onAddToCart={(item) => {
                setCartItems(prev => [...prev, item]);
              }}
              onViewCart={() => setActiveTab("Checkout")}
            />
          )}

          {activeTab === "Checkout" && (
            <CheckoutPage
              orderItems={cartItems.length > 0 ? cartItems : undefined}
              onBack={() => setActiveTab("Store")}
            />
          )}
        </div>
      )}

      {/* ── SCROLLABLE LEFT CONTENT ── hidden when Store tabs are active */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: CHAT_WIDTH,
          paddingBottom: BANNER_H,
          scrollbarWidth: "thin",
          scrollbarColor: "#333 transparent",
          background: "#111",
          display: STORE_TABS.includes(activeTab) ? "none" : "block",
        }}
      >
        <>
          {/* Video */}
          <div style={{ background: "#000", width: "100%", height: VIDEO_H }}>
            <StreamPlayer username={username} color={color} emoji="😍" viewers={viewers} />
          </div>

          {/* Action bar */}
          <div style={{
            background: "#1a1a1a",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center",
            padding: "0 16px", gap: 12,
            height: ACTION_H,
          }}>
            <button onClick={()=>setFollowing(f=>!f)} style={{background:"none",border:"none",cursor:"pointer",padding:6,color:following?"#e53935":"#888",fontSize:20,lineHeight:1,flexShrink:0}}>
              {following ? "❤️" : "🤍"}
            </button>

            <span style={{fontSize:13,color:"#888",flexShrink:0}}>{viewers.toLocaleString()}</span>

            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <span style={{fontSize:11,color:"#888",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                  Goal: <span style={{color:"#f0a500",fontWeight:600}}>{goalCurrent} tk</span> {goalText}
                </span>
                <span style={{fontSize:11,color:"#888",flexShrink:0}}>{goalPct}%</span>
              </div>
              <div style={{width:"100%",height:4,background:"rgba(255,255,255,0.08)",borderRadius:4,overflow:"hidden"}}>
                <div style={{width:`${goalPct}%`,height:"100%",background:"#4caf50",borderRadius:4,transition:"width .5s"}}/>
              </div>
            </div>

            <div style={{flexShrink:0,fontSize:11,color:"#888",textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
              <span>King of the room:</span>
              <span style={{color:"#f0a500",fontWeight:600}}>🔥 TopFan</span>
            </div>

            <button onClick={()=>setShowPrivate(true)} style={{
              background:"transparent", border:"1px solid rgba(255,255,255,0.25)",
              color:"#fff", fontSize:13, fontWeight:600, padding:"8px 16px",
              borderRadius:6, cursor:"pointer", fontFamily:"inherit", flexShrink:0,
              display:"flex", alignItems:"center", gap:6,
            }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"}
            >
              Private Show <span style={{color:"#f0a500",fontWeight:700}}>{privatePrice} tk</span>
              <span style={{fontSize:12,color:"#888"}}>▼</span>
            </button>

            <button onClick={()=>setShowTip(true)} style={{
              background:"#4caf50", border:"none", color:"#fff",
              fontSize:13, fontWeight:700, padding:"8px 20px", borderRadius:6,
              cursor:"pointer", fontFamily:"inherit", flexShrink:0,
              display:"flex", alignItems:"center", gap:8,
            }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".88"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}
            >
              Send Tip
              <div style={{width:26,height:26,borderRadius:"50%",background:"rgba(0,0,0,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🪙</div>
            </button>
          </div>

          {/* ── RELATED GIRLS ── */}
          <div style={{padding:"24px 16px 8px"}}>
            <h3 style={{color:"#fff",fontSize:16,fontWeight:700,margin:"0 0 14px"}}>Related Girls</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}}>
              {RELATED.map((name,i)=>(
                <div key={name} onClick={()=>router.push(`/watch/${name}`)} style={{cursor:"pointer",borderRadius:6,overflow:"hidden",background:"#1a1a1a",position:"relative"}}>
                  <div style={{aspectRatio:"3/4",background:`hsl(${i*37},40%,20%)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{color:"rgba(255,255,255,0.3)",fontSize:28}}>👤</span>
                  </div>
                  {i < 2 && <div style={{position:"absolute",top:6,left:6,background:"#e53935",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:3}}>LIVE</div>}
                  <div style={{padding:"6px 8px"}}>
                    <div style={{fontSize:11,color:"#ccc",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CATEGORIES ── */}
          <div style={{padding:"20px 16px"}}>
            <h3 style={{color:"#fff",fontSize:16,fontWeight:700,margin:"0 0 12px"}}>{username}'s Categories</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {CATEGORIES_LIST.map(cat=>(
                <span key={cat} style={{
                  background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)",
                  color:"#ccc", fontSize:12, padding:"6px 14px", borderRadius:20, cursor:"pointer",
                }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.13)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"}
                >{cat}</span>
              ))}
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div style={{
            background:"#0d0d0d", borderTop:"1px solid rgba(255,255,255,0.06)",
            padding:"32px 24px", marginTop:8,
            display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:32,
          }}>
            <div>
              <div style={{fontSize:18,fontWeight:800,color:"#fff",marginBottom:12}}>
                <span style={{color:"#e53935"}}>STRIP</span>CHATBATE
              </div>
              <p style={{fontSize:12,color:"#666",lineHeight:1.7,margin:"0 0 16px"}}>
                The world's premier 18+ LIVE adult entertainment destination.
              </p>
              <p style={{fontSize:11,color:"#444",margin:0}}>All models are 18 years of age or older.</p>
            </div>
            {[
              { title:"STRIPCHATBATE", links:["About","Blog","Media Inquiries"] },
              { title:"LEGAL & SAFETY", links:["Privacy Policy","Terms of Use","DMCA Policy","Cookies Policy"] },
              { title:"WORK WITH US",  links:["Webcam Affiliate Program"] },
              { title:"HELP & SUPPORT",links:["Support & FAQ","Billing Support","DMCA Protection"] },
            ].map(col=>(
              <div key={col.title}>
                <div style={{fontSize:11,fontWeight:700,color:"#888",letterSpacing:"0.08em",marginBottom:12}}>{col.title}</div>
                {col.links.map(link=>(
                  <div key={link} style={{fontSize:12,color:"#555",marginBottom:8,cursor:"pointer"}}
                    onMouseEnter={e=>e.currentTarget.style.color="#ccc"}
                    onMouseLeave={e=>e.currentTarget.style.color="#555"}
                  >{link}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{background:"#0d0d0d",borderTop:"1px solid rgba(255,255,255,0.04)",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:11,color:"#444"}}>18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement</span>
            <span style={{fontSize:11,color:"#444"}}>© 2025 Stripchatbate</span>
          </div>
        </>
      </div>

      {/* ── FIXED CHAT PANEL ── hidden when Store tabs are active */}
      <div style={{
        position: "fixed",
        top: CHAT_TOP,
        right: 0,
        width: CHAT_WIDTH,
        bottom: CHAT_BOTTOM,
        zIndex: 200,
        display: STORE_TABS.includes(activeTab) ? "none" : "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#0f0f0f",
        borderLeft: "1px solid rgba(255,255,255,0.07)",
      }}>
        <LiveChat username={username} viewers={viewers} onTipClick={()=>setShowTip(true)}/>
      </div>

      {/* ── PiP ── only show when not on Store tabs ── */}
      {showPip && !STORE_TABS.includes(activeTab) && (
        <div style={{position:"fixed",bottom:80,left:16,zIndex:999,width:280,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.7)",border:"1px solid rgba(255,255,255,0.1)",background:"#000"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",background:"rgba(0,0,0,0.85)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:20,height:20,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#fff"}}>
                {username?.[0]?.toUpperCase()}
              </div>
              <span style={{fontSize:11,fontWeight:700,color:"#fff"}}>{username}</span>
              <span style={{background:"#e53935",color:"#fff",fontSize:8,fontWeight:700,padding:"1px 5px",borderRadius:3}}>LIVE</span>
            </div>
            <button onClick={()=>setShowPip(false)} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:16,lineHeight:1,padding:2}}>✕</button>
          </div>
          <div style={{aspectRatio:"16/9"}}>
            <StreamPlayer username={username} color={color} emoji="😍" viewers={viewers}/>
          </div>
        </div>
      )}

      {/* ── STICKY BOTTOM BANNER ── */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:1000,
        background:"#e53935", display:"flex", alignItems:"center", justifyContent:"center",
        gap:14, height:BANNER_H, boxShadow:"0 -2px 12px rgba(0,0,0,0.4)",
      }}>
        <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(0,0,0,0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </div>
        <span style={{color:"#fff",fontSize:14,fontWeight:600}}>Join Stripchatbate to interact with models!</span>
        <button style={{background:"#fff",border:"none",color:"#e53935",fontSize:13,fontWeight:700,padding:"8px 22px",borderRadius:20,cursor:"pointer",fontFamily:"inherit"}}
          onMouseEnter={e=>e.currentTarget.style.opacity=".88"}
          onMouseLeave={e=>e.currentTarget.style.opacity="1"}
        >Join FREE</button>
      </div>

      {/* ── MODALS ── */}
      {showPrivate && (
        <PrivateShowModal
          username={username}
          privatePrice={privatePrice}
          onClose={() => setShowPrivate(false)}
          onBuyTokens={openBuyTokens}
          onStart={() => { setShowPrivate(false); setShowBuyTokens(true); }}
        />
      )}

      {showBuyTokens && (
        <BuyTokensModal
          onClose={() => setShowBuyTokens(false)}
          username={username}
          avatarColor={color}
        />
      )}

      {showTip && (
        <TipModal
          username={username}
          tokens={tokens}
          onClose={() => setShowTip(false)}
          onBuyTokens={openBuyTokens}
          onTip={(amount) => {
            setTokens(t => Math.max(0, t - amount));
            setShowTip(false);
          }}
        />
      )}
    </div>
  );
}