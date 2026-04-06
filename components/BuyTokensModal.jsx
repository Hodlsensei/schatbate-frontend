"use client";
import { useState } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IcoClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#aaa">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);
const IcoLock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#888">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);
const IcoBack = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
);
const IcoWallet = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#aaa"><path d="M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 00-2 2v8a2 2 0 002 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>);
const IcoWand   = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="#aaa"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a1 1 0 00-1.41 0L1.29 18.96a1 1 0 000 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05a1 1 0 000-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>);

const BadgeShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#666">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);
const BadgeLock = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#666">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/>
  </svg>
);
const BadgePrivacy = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#666">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"/>
  </svg>
);

const CoinStack = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" style={{ flexShrink:0 }}>
    <ellipse cx="26" cy="44" rx="18" ry="5" fill="#c87a0e"/>
    <rect x="8" y="30" width="36" height="14" fill="#e8920e"/>
    <ellipse cx="26" cy="30" rx="18" ry="5" fill="#ffd54f"/>
    <ellipse cx="26" cy="34" rx="18" ry="5" fill="#c87a0e"/>
    <rect x="8" y="20" width="36" height="14" fill="#e8920e"/>
    <ellipse cx="26" cy="20" rx="18" ry="5" fill="#ffd54f"/>
    <ellipse cx="26" cy="24" rx="18" ry="5" fill="#c87a0e"/>
    <rect x="8" y="10" width="36" height="14" fill="#e8920e"/>
    <ellipse cx="26" cy="10" rx="18" ry="5" fill="#ffd54f"/>
  </svg>
);

const LogoBox = ({ children, width = 44 }) => (
  <div style={{ background:"#fff", borderRadius:4, width, height:28, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
    {children}
  </div>
);
const CardLogos = () => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
    <LogoBox width={44}><svg width="34" height="14" viewBox="0 0 34 14"><text x="0" y="12" fontSize="13" fontWeight="900" fill="#1a1f71" fontFamily="Arial,sans-serif">VISA</text></svg></LogoBox>
    <LogoBox width={44}><svg width="36" height="22" viewBox="0 0 36 22"><circle cx="13" cy="11" r="10" fill="#eb001b"/><circle cx="23" cy="11" r="10" fill="#f79e1b"/><path d="M18 4.5C19.7 5.9 20.7 8 20.7 11s-1 5.1-2.7 6.5C16.3 16.1 15.3 14 15.3 11s1-5.1 2.7-6.5z" fill="#ff5f00"/></svg></LogoBox>
    <LogoBox width={44}><svg width="36" height="22" viewBox="0 0 36 22"><circle cx="13" cy="11" r="10" fill="#0099df"/><circle cx="23" cy="11" r="10" fill="#e31837" opacity="0.9"/><path d="M18 4.5C19.7 5.9 20.7 8 20.7 11s-1 5.1-2.7 6.5C16.3 16.1 15.3 14 15.3 11s1-5.1 2.7-6.5z" fill="#6c2ecc" opacity="0.7"/></svg></LogoBox>
    <LogoBox width={44}><svg width="40" height="22" viewBox="0 0 40 22"><text x="1" y="10" fontSize="6.5" fontWeight="700" fill="#231f20" fontFamily="Arial,sans-serif">DISCOVER</text><circle cx="30" cy="14" r="7" fill="#f76f20"/></svg></LogoBox>
  </div>
);
const CryptoLogos = () => (
  <div style={{ background:"#fff", borderRadius:6, padding:"4px 8px", display:"flex", alignItems:"center", gap:4 }}>
    <div style={{ width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,#f7931a,#e07b10)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:"#fff", fontSize:11, fontWeight:900 }}>₿</span></div>
    <div style={{ width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,#627eea,#4a5dc7)", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="12" height="14" viewBox="0 0 12 14"><polygon points="6,0 12,7 6,9 0,7" fill="rgba(255,255,255,0.9)"/><polygon points="6,10 12,7 6,14 0,7" fill="rgba(255,255,255,0.6)"/></svg></div>
    <div style={{ width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,#26a17b,#1a7a5c)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:"#fff", fontSize:11, fontWeight:900 }}>₮</span></div>
  </div>
);
const PaypalLogo    = () => (<LogoBox width={72}><svg width="58" height="18" viewBox="0 0 58 18"><text x="0" y="14" fontSize="14" fontWeight="900" fill="#003087" fontFamily="Arial,sans-serif">Pay</text><text x="22" y="14" fontSize="14" fontWeight="900" fill="#009cde" fontFamily="Arial,sans-serif">Pal</text></svg></LogoBox>);
const SkrillLogo    = () => (<LogoBox width={60}><svg width="46" height="18" viewBox="0 0 46 18"><text x="1" y="14" fontSize="13" fontWeight="700" fill="#892cd2" fontFamily="Arial,sans-serif">Skrill</text></svg></LogoBox>);
const PayAttitudeLogo = () => (<LogoBox width={88}><svg width="76" height="16" viewBox="0 0 76 16"><text x="1" y="12" fontSize="10" fontWeight="700" fill="#e63946" fontFamily="Arial,sans-serif">payAttitude</text></svg></LogoBox>);
const BankLogo      = () => (<LogoBox width={44}><svg width="24" height="22" viewBox="0 0 24 22" fill="#2ecc71"><path d="M12 0L1 5v2h22V5L12 0zM3 9v8H1v2h22v-2h-2V9h-3v8h-4V9H9v8H6V9H3z"/></svg></LogoBox>);
const GoogleIcon    = () => (<svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>);
const XIcon         = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);

const paymentMethods = [
  { id:"bank",   label:"Local Online Bank Transfer" },
  { id:"card",   label:"Credit/Debit Card" },
  { id:"paypal", label:"PayPal" },
  { id:"skrill", label:"Skrill" },
  { id:"payatt", label:"PayAttitude" },
  { id:"crypto", label:"USDT, BTC, ETH, USDC, etc." },
];

const tokenPackages = [
  { id:"45",   tokens:45,   price:4.99,   originalPrice:null,  discount:null,           save:null },
  { id:"90",   tokens:90,   price:9.99,   originalPrice:null,  discount:null,           save:null },
  { id:"200",  tokens:200,  price:15.99,  originalPrice:20.99, discount:"25% discount", save:null },
  { id:"540",  tokens:540,  price:49.99,  originalPrice:null,  discount:null,           save:"Save $10" },
  { id:"765",  tokens:765,  price:69.99,  originalPrice:null,  discount:null,           save:"Save $15" },
  { id:"1350", tokens:1350, price:119.99, originalPrice:null,  discount:null,           save:"Save $30" },
  { id:"2350", tokens:2350, price:199.99, originalPrice:null,  discount:null,           save:"Save $61" },
];

function PaymentLogo({ id }) {
  if (id === "bank")   return <BankLogo/>;
  if (id === "card")   return <CardLogos/>;
  if (id === "paypal") return <PaypalLogo/>;
  if (id === "skrill") return <SkrillLogo/>;
  if (id === "payatt") return <PayAttitudeLogo/>;
  if (id === "crypto") return <CryptoLogos/>;
  return null;
}

function paymentDesc(id) {
  if (id === "bank")   return "Pay directly from your bank account using online banking or your bank's app.";
  if (id === "card")   return "Pay securely with Visa, Mastercard, Maestro or Discover.";
  if (id === "paypal") return "Fast and secure checkout with your PayPal account.";
  if (id === "skrill") return "Pay instantly using your Skrill digital wallet.";
  if (id === "payatt") return "Pay with your PayAttitude card or mobile app.";
  if (id === "crypto") return "Pay with USDT, BTC, ETH, USDC or other cryptocurrencies.";
  return "";
}

const Radio = ({ selected, color="#4caf50" }) => (
  <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${selected ? color : "#555"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
    {selected && <div style={{ width:8, height:8, borderRadius:"50%", background:color }}/>}
  </div>
);

const SecurityBadges = () => (
  <div style={{ padding:"16px 28px 22px", borderTop:"1px solid #222", display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
    <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#555" }}>
      <IcoLock/>
      <span>You will be securely billed once. No recurring charges.</span>
    </div>
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:40 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <BadgeShield/>
        <div>
          <div style={{ fontSize:12, fontWeight:800, color:"#666", letterSpacing:"0.03em" }}>COMODO</div>
          <div style={{ fontSize:10, color:"#555", letterSpacing:"0.04em" }}>SECURE™</div>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <BadgeLock/>
        <div>
          <div style={{ fontSize:12, fontWeight:800, color:"#666" }}>256 bit</div>
          <div style={{ fontSize:10, color:"#555", letterSpacing:"0.03em" }}>SSL ENCRYPTION</div>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <BadgePrivacy/>
        <div>
          <div style={{ fontSize:12, fontWeight:800, color:"#666" }}>PRIVACY</div>
          <div style={{ fontSize:10, color:"#555" }}>in bank statement</div>
        </div>
      </div>
    </div>
  </div>
);

// ── STEP 1 ─────────────────────────────────────────────────────────────────────
// FIX: Accept avatarUrl prop and render <img> when available
function Step1({ username, avatarColor, avatarUrl, selectedPayment, setSelectedPayment, selectedPackage, setSelectedPackage, showAll, setShowAll, onContinue }) {
  const visible = showAll ? tokenPackages : tokenPackages.slice(0, 3);
  const initial = username?.[0]?.toUpperCase() || "?";

  return (
    <div>
      {/* ── Hero ── */}
      <div style={{
        display:"flex", alignItems:"center", gap:18,
        padding:"22px 32px 20px",
        borderBottom:"1px solid #222",
      }}>
        {/* FIX: Show real avatar image if available, fall back to letter circle */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={username}
            style={{
              width:54, height:54, borderRadius:"50%", flexShrink:0,
              objectFit:"cover",
              border:"2px solid rgba(255,255,255,0.12)",
            }}
            onError={e => {
              // If image fails to load, hide it and show the fallback below
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        {/* Fallback letter avatar — always rendered but hidden when avatarUrl loads */}
        <div style={{
          width:54, height:54, borderRadius:"50%", flexShrink:0,
          background: avatarColor || "linear-gradient(135deg,#c0392b,#8e24aa)",
          display: avatarUrl ? "none" : "flex",
          alignItems:"center", justifyContent:"center",
          fontSize:22, fontWeight:700, color:"#fff",
          border:"2px solid rgba(255,255,255,0.12)",
        }}>
          {initial}
        </div>

        <div>
          <div style={{ fontSize:17, fontWeight:700, color:"#fff", marginBottom:4 }}>
            Step into{" "}
            <span style={{ color:"#4caf50" }}>{username}</span>
            's private space!
          </div>
          <div style={{ fontSize:13, color:"#888" }}>
            Add tokens to enjoy your personal fun in the Private show.
          </div>
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:380 }}>

        {/* LEFT: Payment Methods */}
        <div style={{ padding:"22px 28px", borderRight:"1px solid #222" }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:14 }}>Payment Method</div>
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {paymentMethods.map(pm => (
              <div key={pm.id}
                onClick={() => setSelectedPayment(pm.id)}
                style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"12px 16px", borderRadius:8, cursor:"pointer",
                  border: selectedPayment===pm.id ? "1.5px solid #4caf50" : "1px solid #2e2e2e",
                  background: selectedPayment===pm.id ? "rgba(76,175,80,0.08)" : "#222",
                  transition:"all .12s",
                }}
                onMouseEnter={e => { if(selectedPayment!==pm.id) e.currentTarget.style.borderColor="#444"; }}
                onMouseLeave={e => { if(selectedPayment!==pm.id) e.currentTarget.style.borderColor="#2e2e2e"; }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <Radio selected={selectedPayment===pm.id} color="#4caf50"/>
                  <span style={{ fontSize:13, color: selectedPayment===pm.id ? "#fff" : "#bbb" }}>{pm.label}</span>
                </div>
                <div style={{ flexShrink:0, marginLeft:10 }}>
                  <PaymentLogo id={pm.id}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Token Packages */}
        <div style={{ padding:"22px 28px" }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:6 }}>Token Package</div>
          <div style={{ fontSize:12, color:"#888", marginBottom:16, lineHeight:1.5 }}>{paymentDesc(selectedPayment)}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {visible.map(pkg => (
              <div key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"13px 16px", borderRadius:8, cursor:"pointer",
                  border: selectedPackage===pkg.id ? "1.5px solid #c0392b" : "1px solid #2e2e2e",
                  background: selectedPackage===pkg.id ? "rgba(120,0,0,0.35)" : "#222",
                  transition:"all .12s",
                }}
                onMouseEnter={e => { if(selectedPackage!==pkg.id) e.currentTarget.style.borderColor="#444"; }}
                onMouseLeave={e => { if(selectedPackage!==pkg.id) e.currentTarget.style.borderColor="#2e2e2e"; }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <Radio selected={selectedPackage===pkg.id} color="#e5342a"/>
                  <span style={{ fontSize:14, color: selectedPackage===pkg.id ? "#fff" : "#ccc", fontWeight: selectedPackage===pkg.id ? 600 : 400 }}>
                    {pkg.tokens.toLocaleString()} tokens
                  </span>
                </div>
                <div style={{ textAlign:"right" }}>
                  {pkg.originalPrice && <div style={{ fontSize:11, color:"#888", textDecoration:"line-through" }}>${pkg.originalPrice.toFixed(2)}</div>}
                  <div style={{ fontSize:14, fontWeight:700, color: selectedPackage===pkg.id ? "#fff" : "#ccc" }}>${pkg.price.toFixed(2)}</div>
                  {pkg.discount && <div style={{ fontSize:11, color:"#4caf50", fontWeight:600 }}>{pkg.discount}</div>}
                  {pkg.save     && <div style={{ fontSize:11, color:"#4caf50", fontWeight:600 }}>{pkg.save}</div>}
                </div>
              </div>
            ))}
          </div>
          {!showAll && (
            <div
              onClick={() => setShowAll(true)}
              style={{ marginTop:14, fontSize:13, color:"#4caf50", cursor:"pointer", textAlign:"center" }}
              onMouseEnter={e => e.currentTarget.style.textDecoration="underline"}
              onMouseLeave={e => e.currentTarget.style.textDecoration="none"}
            >
              Show more token packages
            </div>
          )}
        </div>
      </div>

      {/* Continue button */}
      <div style={{ padding:"18px 28px 14px", borderTop:"1px solid #222", display:"flex", justifyContent:"center" }}>
        <button
          onClick={onContinue}
          style={{
            width:"min(340px,100%)", padding:"14px 0", borderRadius:30,
            background:"linear-gradient(135deg,#6abf45,#3a8c1c)",
            border:"none", color:"#fff", fontSize:16, fontWeight:700,
            cursor:"pointer", fontFamily:"inherit",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity="0.88"}
          onMouseLeave={e => e.currentTarget.style.opacity="1"}
        >
          Continue
        </button>
      </div>

      <SecurityBadges/>
    </div>
  );
}

// ── STEP 2 ─────────────────────────────────────────────────────────────────────
function Step2({ pkg, username, avatarUrl, avatarColor }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [verified, setVerified] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const initial = username?.[0]?.toUpperCase() || "?";

  return (
    <div style={{ padding:"32px 28px", display:"flex", flexDirection:"column", alignItems:"center" }}>

      {/* ── Model context banner — matches screenshot 7/8 header ── */}
      <div style={{
        display:"flex", alignItems:"center", gap:14, marginBottom:28,
        width:"100%", maxWidth:560, padding:"16px 20px",
        background:"rgba(255,255,255,0.04)", borderRadius:10,
        border:"1px solid rgba(255,255,255,0.06)",
      }}>
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={username}
            style={{ width:46, height:46, borderRadius:"50%", objectFit:"cover", flexShrink:0, border:"2px solid rgba(255,255,255,0.1)" }}
            onError={e => { e.currentTarget.style.display="none"; e.currentTarget.nextSibling.style.display="flex"; }}
          />
        ) : null}
        <div style={{
          width:46, height:46, borderRadius:"50%", flexShrink:0,
          background: avatarColor || "linear-gradient(135deg,#c0392b,#8e24aa)",
          display: avatarUrl ? "none" : "flex",
          alignItems:"center", justifyContent:"center",
          fontSize:19, fontWeight:700, color:"#fff",
          border:"2px solid rgba(255,255,255,0.1)",
        }}>{initial}</div>

        <div>
          <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:2 }}>
            <span style={{ color:"#4caf50" }}>{username}</span>'s Private is almost yours!
          </div>
          <div style={{ fontSize:12, color:"#888" }}>
            You're one step from a show made for you — Register for free to unlock it.
          </div>
        </div>
      </div>

      {/* ── Token summary ── */}
      <div style={{
        display:"flex", alignItems:"center", gap:16, marginBottom:28,
        width:"100%", maxWidth:560, padding:"18px 22px",
        background:"rgba(255,255,255,0.04)", borderRadius:10,
      }}>
        <CoinStack/>
        <div>
          <div style={{ fontSize:15, color:"#fff", lineHeight:1.6 }}>
            You've chosen{" "}
            <span style={{ color:"#4caf50", fontWeight:700 }}>{pkg.tokens.toLocaleString()} tk</span>
            {" "}for{" "}
            <span style={{ fontWeight:700 }}>${pkg.price.toFixed(2)}</span>
            {pkg.discount && <span style={{ color:"#4caf50", fontWeight:600 }}> ({pkg.discount})</span>}
          </div>
          <div style={{ fontSize:12, color:"#888", marginTop:4 }}>
            For the tokens to be added to your account, you will need to sign up (it's free and fast) or log in.
          </div>
        </div>
      </div>

      <div style={{ width:"100%", maxWidth:380 }}>
        {!showLogin ? (
          /* ── CREATE ACCOUNT ── */
          <>
            <div style={{ fontSize:20, fontWeight:700, color:"#fff", textAlign:"center", marginBottom:22 }}>Create Free Account</div>

            <div style={{ position:"relative", marginBottom:14 }}>
              <input
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="Username"
                style={{ width:"100%", padding:"13px 44px 13px 16px", background:"#2a2a2a", border:"1px solid #3a3a3a", borderRadius:8, color:"#fff", fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
                onFocus={e => e.target.style.borderColor="#4caf50"}
                onBlur={e => e.target.style.borderColor="#3a3a3a"}
              />
              <span style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><IcoWand/></span>
            </div>

            <div
              onClick={() => setVerified(!verified)}
              style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", background:"#2a2a2a", border:"1px solid #3a3a3a", borderRadius:6, marginBottom:14, cursor:"pointer" }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:20, height:20, borderRadius:3, border: verified?"none":"2px solid #555", background: verified?"#4caf50":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {verified && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize:13, color:"#ccc" }}>Verify you are human</span>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <svg width="22" height="18" viewBox="0 0 100 80"><path d="M78 54c0-8-6-14-14-14-1 0-2 0-3 1C59 34 52 28 44 28c-10 0-18 8-18 18 0 1 0 2 1 3C20 50 16 55 16 61c0 7 6 12 13 12h49c7 0 12-5 12-12 0-4-3-7-6-8l-6 1z" fill="#f6821f"/></svg>
                  <span style={{ fontSize:11, fontWeight:700, color:"#aaa" }}>CLOUDFLARE</span>
                </div>
                <span style={{ fontSize:9, color:"#666" }}>Privacy • Help</span>
              </div>
            </div>

            <button style={{
              width:"100%", padding:"14px 0", borderRadius:30,
              background: verified ? "linear-gradient(135deg,#6abf45,#3a8c1c)" : "#2a2a2a",
              border:"none", color: verified ? "#fff" : "#555",
              fontSize:16, fontWeight:700,
              cursor: verified ? "pointer" : "not-allowed",
              fontFamily:"inherit", marginBottom:16, transition:"all .2s",
            }}>
              Continue
            </button>

            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <div style={{ flex:1, height:1, background:"#333" }}/>
              <span style={{ fontSize:12, color:"#666" }}>or</span>
              <div style={{ flex:1, height:1, background:"#333" }}/>
            </div>

            <div style={{ display:"flex", gap:12, marginBottom:18 }}>
              <button style={{ flex:1, padding:"12px 0", borderRadius:8, background:"#2a2a2a", border:"1px solid #3a3a3a", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#555"}
                onMouseLeave={e => e.currentTarget.style.borderColor="#3a3a3a"}
              ><GoogleIcon/></button>
              <button style={{ flex:1, padding:"12px 0", borderRadius:8, background:"#2a2a2a", border:"1px solid #3a3a3a", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#555"}
                onMouseLeave={e => e.currentTarget.style.borderColor="#3a3a3a"}
              ><XIcon/></button>
            </div>

            <div style={{ textAlign:"center", fontSize:13, color:"#888" }}>
              Already have an account?{" "}
              <span
                onClick={() => setShowLogin(true)}
                style={{ color:"#4caf50", cursor:"pointer", fontWeight:600 }}
                onMouseEnter={e => e.currentTarget.style.textDecoration="underline"}
                onMouseLeave={e => e.currentTarget.style.textDecoration="none"}
              >Log In</span>
            </div>
          </>
        ) : (
          /* ── LOG IN ── */
          <>
            <div style={{ fontSize:20, fontWeight:700, color:"#fff", textAlign:"center", marginBottom:22 }}>Log In</div>

            <div style={{ position:"relative", marginBottom:12 }}>
              <input
                placeholder="Username or Email"
                style={{ width:"100%", padding:"13px 16px", background:"#2a2a2a", border:"1px solid #3a3a3a", borderRadius:8, color:"#fff", fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
                onFocus={e => e.target.style.borderColor="#4caf50"}
                onBlur={e => e.target.style.borderColor="#3a3a3a"}
              />
            </div>

            <div style={{ position:"relative", marginBottom:14 }}>
              <input
                type="password"
                placeholder="Password"
                style={{ width:"100%", padding:"13px 16px", background:"#2a2a2a", border:"1px solid #3a3a3a", borderRadius:8, color:"#fff", fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
                onFocus={e => e.target.style.borderColor="#4caf50"}
                onBlur={e => e.target.style.borderColor="#3a3a3a"}
              />
            </div>

            <button style={{
              width:"100%", padding:"14px 0", borderRadius:30,
              background:"linear-gradient(135deg,#6abf45,#3a8c1c)",
              border:"none", color:"#fff",
              fontSize:16, fontWeight:700,
              cursor:"pointer",
              fontFamily:"inherit", marginBottom:16,
            }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >
              Continue
            </button>

            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <div style={{ flex:1, height:1, background:"#333" }}/>
              <span style={{ fontSize:12, color:"#666" }}>or</span>
              <div style={{ flex:1, height:1, background:"#333" }}/>
            </div>

            <div style={{ display:"flex", gap:12, marginBottom:18 }}>
              <button style={{ flex:1, padding:"12px 0", borderRadius:8, background:"#2a2a2a", border:"1px solid #3a3a3a", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#555"}
                onMouseLeave={e => e.currentTarget.style.borderColor="#3a3a3a"}
              ><GoogleIcon/></button>
              <button style={{ flex:1, padding:"12px 0", borderRadius:8, background:"#2a2a2a", border:"1px solid #3a3a3a", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#555"}
                onMouseLeave={e => e.currentTarget.style.borderColor="#3a3a3a"}
              ><XIcon/></button>
            </div>

            <div style={{ textAlign:"center", fontSize:13, color:"#888" }}>
              Don't have an account?{" "}
              <span
                onClick={() => setShowLogin(false)}
                style={{ color:"#4caf50", cursor:"pointer", fontWeight:600 }}
                onMouseEnter={e => e.currentTarget.style.textDecoration="underline"}
                onMouseLeave={e => e.currentTarget.style.textDecoration="none"}
              >Create free account</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
// FIX: Added avatarUrl prop — pass the model's profile image URL from WatchPage
export default function BuyTokensModal({ onClose, username, avatarColor, avatarUrl }) {
  const [step, setStep]                       = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("bank");
  const [selectedPackage, setSelectedPackage] = useState("200");
  const [showAll, setShowAll]                 = useState(false);

  const chosenPackage = tokenPackages.find(p => p.id === selectedPackage);

  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:99999, background:"rgba(0,0,0,0.88)", display:"flex", alignItems:"center", justifyContent:"center", padding:"12px" }}
      onClick={onClose}
    >
      <div
        style={{ width:"min(1000px,98vw)", maxHeight:"96vh", background:"#1a1a1a", borderRadius:12, overflow:"hidden", display:"flex", flexDirection:"column" }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Modal top bar ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 24px", borderBottom:"1px solid #222", flexShrink:0 }}>
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              style={{ background:"none", border:"none", cursor:"pointer", color:"#aaa", fontSize:13, display:"flex", alignItems:"center", gap:6, padding:0, fontFamily:"inherit" }}
              onMouseEnter={e => e.currentTarget.style.color="#fff"}
              onMouseLeave={e => e.currentTarget.style.color="#aaa"}
            ><IcoBack/> Back</button>
          ) : (
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <IcoWallet/>
              <span style={{ fontSize:16, fontWeight:700, color:"#fff" }}>Buy Tokens</span>
            </div>
          )}
          <button
            onClick={onClose}
            style={{ background:"none", border:"none", cursor:"pointer", padding:6, display:"flex", borderRadius:"50%" }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background="none"}
          ><IcoClose/></button>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"thin", scrollbarColor:"#333 transparent" }}>
          {step === 1
            ? <Step1
                username={username}
                avatarColor={avatarColor}
                avatarUrl={avatarUrl}
                selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment}
                selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage}
                showAll={showAll} setShowAll={setShowAll}
                onContinue={() => setStep(2)}
              />
            : <Step2
                pkg={chosenPackage}
                username={username}
                avatarUrl={avatarUrl}
                avatarColor={avatarColor}
              />
          }
        </div>
      </div>
    </div>
  );
}