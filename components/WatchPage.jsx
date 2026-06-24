"use client";
import ShopPage from "./ShopPage";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import StreamPlayer from "./StreamPlayer";
import LiveChat from "./LiveChat";
import TipModal from "./TipModal";
import PrivateShowModal from "./PrivateShowModal";
import BuyTokensModal from "./BuyTokensModal";

/* ── constants ── */
const FONT = "'DM Sans', 'Helvetica Neue', Helvetica, sans-serif";
const COLORS = ["#c0392b","#8e24aa","#1e88e5","#00acc1","#43a047","#fb8c00"];
const FLAGS = ["🇬🇧","🇺🇸","🇧🇷","🇺🇦","🇯🇵","🇫🇷"];

const RELATED = ["Molliexo","Lwhite1","Amy01112","Catababa67","Scarlett_girlnextdoor","misstroubleme","siennadiamond","MelisaSwan611","MONA_W","MissLolly92","Nimah_","Recura","michellycherryxx24","BonnyMolhada","SexyPetitex25","Freaky_CardiXX"];
const FEATURED = ["Nisha_102","Lisabrown_","PervyboyXX","CurvyDesire1","Nimah_","Recura","michellycherryxx24","BonnyMolhada","SexyPetitex25","Freaky_CardiXX","Molliexo","Lwhite1","Amy01112","Catababa67","Scarlett_girlnextdoor","misstroubleme"];

const MY_SPECIFICS = ["UK Models","Mature","White","Medium","Blonde","Leather","Jerk-off Instruction","Role Play","Cuckold","Mistress","Yoga","Foot Fetish","Nylon","Heels","Cock Rating"];
const I_DO_IN_SHOWS = ["Topless","Twerk","Oil Show","Smoking","69 Position","Upskirt","Spanking","Handjob","Humiliation","Masturbation","Massage","Yoga"];
const EXCLUSIVELY_PRIVATE = ["Dirty Talk","Tittyfuck","Flashing","Foot Fetish","Footjob"];
const RELATED_MIXED = ["Interactive Toys with Mature","Mature HD","Mature Topless","Mature Spanking","Mature Facesitting","Mature Mistress","Mature Nylon","White Mature","Blonde Mature","Blonde Blowjob","Blonde Doggy Style","Blonde Upskirt","Blonde Handjob","Blonde Cuckold","Dirty Talk Blowjob"];

const INTEREST_EMOJI = {
  "Action":"🎬","Adventure":"✈️","Bars":"🍻","Beach":"🏖️","Cafes, Restaurants":"☕",
  "Coffee":"☕","Comedy":"🎭","Concerts":"🎤","Documentary":"🎬","Drama":"🎭",
  "Gin":"🍸","Meditation":"🧘","Picnics":"🧺","Seafood":"🦐","Shopping":"🛍️",
};

const REVIEWS = [
  { stars:5, text:"sweet, hot, so much fun", date:"Jun 12, 2026", type:"Exclusive Private" },
  { stars:5, text:"Absolutely incredible woman 😍!!!", date:"Jun 11, 2026", type:"Exclusive Private" },
  { stars:5, text:"Amazing private with this stunning, sexy lady...WOW.", date:"Jun 5, 2026", type:"Private" },
  { stars:5, text:"so sexy and beautiful I love role playing with you xx", date:"May 30, 2026", type:"Exclusive Private" },
  { stars:5, text:"superb", date:"May 27, 2026", type:"Exclusive Private" },
];

const SCHEDULE = [
  { day:"Monday", slots:["8:00 AM – 9:30 AM","3:00 PM – 5:30 PM"], today:false },
  { day:"Tuesday", slots:["7:00 AM – 10:00 AM","6:45 PM – 8:30 PM"], today:true },
  { day:"Wednesday", slots:["7:00 AM – 10:30 AM","4:00 PM – 6:00 PM"], today:false },
  { day:"Thursday", slots:["7:00 AM – 10:00 AM"], today:false },
  { day:"Friday", slots:["6:30 AM – 10:00 AM","1:30 PM – 4:00 PM"], today:false },
  { day:"Saturday", slots:["6:30 AM – 9:00 AM","8:30 PM – 10:15 PM"], today:false },
  { day:"Sunday", slots:["6:30 AM – 10:30 AM","3:00 PM – 6:00 PM","6:15 PM – 8:45 PM"], today:false },
];

const TIP_MENU = [
  { label:"HI", tokens:1 },
  { label:"Hi Beautiful 💋", tokens:3 },
  { label:"Ask a personal Question ?", tokens:4 },
  { label:"Hi SEXY 🤩", tokens:7 },
  { label:"Blow A Kiss 😘", tokens:7 },
  { label:"WOW 😛", tokens:8 },
  { label:"YOURE HOT 👌🏻", tokens:8 },
  { label:"Private Message 📩📩", tokens:10 },
  { label:"Love Your OutFit 🤩", tokens:10 },
  { label:"💝 Appreciation Tip", tokens:12 },
  { label:"Make Me Smile 😃", tokens:15 },
  { label:"Lets see you Twirl for me 😍", tokens:15 },
  { label:"Slow Lip Tease UPCLOSE 💋", tokens:17 },
  { label:"Don't Stop Monica 🥰🥰", tokens:20 },
  { label:"Close Up Tongue Tease 😝", tokens:20 },
  { label:"💝 Appreciation Tip", tokens:25 },
  { label:"YOURE HORNY 🤩", tokens:20 },
  { label:"Fap Tax", tokens:20 },
  { label:"YOU MAKE ME HORNY", tokens:25 },
  { label:"BIG Dick Tax 🍆", tokens:25 },
  { label:"SMALL Dick Tax 🤣", tokens:25 },
  { label:"Turn Around And TEASE 🥰", tokens:25 },
  { label:"Spanking TEASE x 5", tokens:30 },
  { label:"SlowBodyTease Reveal Something", tokens:50 },
  { label:"Ass To Cam TEASE", tokens:50 },
  { label:"Show Me Those Feet Monica 👀", tokens:50 },
  { label:"SHOW Those Legs Monica 👀", tokens:50 },
  { label:"Hands up Armpits up close 😛", tokens:55 },
  { label:"Naughty Licking on Toy 😛", tokens:65 },
  { label:"Quick Flash lingerie 👙", tokens:70 },
  { label:"Full Body TEASE", tokens:99 },
  { label:"Go out for Cappuccino ☕️", tokens:100 },
  { label:"Slow Squeeze BREASTS UP Close", tokens:100 },
  { label:"Dick Rating Out Loud 🍆", tokens:100 },
  { label:"Oil TEASE Bottom", tokens:110 },
  { label:"Remove Top Slooooowly 👙", tokens:120 },
  { label:"JOI HandJob Worship 🍆", tokens:150 },
  { label:"👙 SHOW OFF THOSE BIG BREASTS 👀", tokens:200 },
  { label:"Apero Spritz For You 🥂", tokens:200 },
  { label:"Heels on off guys", tokens:200 },
  { label:"CONTROL You Lead ME", tokens:200 },
  { label:"VIP Fantasy Moment 🥰", tokens:230 },
  { label:"Outfit Change 👙", tokens:250 },
  { label:"GO BUY THE LILLIES 💐", tokens:350 },
  { label:"Full control lovense 5 mins ☺️", tokens:500 },
  { label:"FULL Control 10 mins ☺️☺️☺️", tokens:999 },
  { label:"Snapchat 🔥", tokens:888 },
  { label:"Snapchat 10 mins video call", tokens:1000 },
  { label:"🥂 Spoil Me 🥰", tokens:1000 },
  { label:"TAKE A SPA DAY MONICA 🥰", tokens:2000 },
];

const KNIGHTS = [
  { name:"SXSAARFEND", level:87, league:"royal" },
  { name:"prankman1", level:39, league:"gold" },
  { name:"bat21Lubricant", level:85, league:"royal" },
  { name:"Stanley_the_m", level:85, league:"royal" },
  { name:"hammers1266", level:62, league:"diamond" },
  { name:"w1ldheart", level:83, league:"royal" },
];

const ALBUMS = [
  { label:"Public", likes:264, count:1, free:true, thumb:"linear-gradient(135deg,#4a6fa5,#2c4770)" },
  { label:"Just me", likes:36, count:9, price:99, locked:true },
  { label:"BLACK FRIDAY BUNDLE 2", likes:1, count:5, price:99, locked:true },
  { label:"BLACK FRIDAY! DRESS UP BUNDLE", likes:2, count:5, price:99, locked:true },
  { label:"Hot bikini day", likes:3, count:5, price:99, locked:true },
  { label:"Naughty!", likes:84, count:1, free:true, thumb:"linear-gradient(135deg,#5a5a4a,#33332a)" },
  { label:"Happy Feet video", likes:2, count:1, price:99, locked:true },
  { label:"Foot show", likes:2, count:5, price:66, locked:true },
  { label:"Get ready with me!", likes:6, count:5, price:66, locked:true },
];

const PANELS = [
  { col:0, title:"My schedule\n7 am to 10 am\nI'm a morning gal\n4pm to 7pm\nAnd sometimes MORE", body:"Just saying!\nI looooooove Flowers 🌺 especially Lillie's", thumb:"linear-gradient(135deg,#6a7a4a,#3a4a2a)" },
  { col:1, title:"Love summer Days Poolside", body:"One day I will take you to the lake or beach with me, Lush & Domi", thumb:"linear-gradient(135deg,#4a8aa5,#2a5570)" },
  { col:0, title:"Do You Like A Foot Show or Nylons too ?", thumb:"linear-gradient(135deg,#4a4a4a,#2a2a2a)" },
  { col:1, title:"Things I love & like ❤️", body:"Things I like, Cappuccino, apéro Spritz, flowers!\nRunning, 3 times London marathon 1 x Robin Hood but now I love trail running.\nAnd of course I love to be here with you !" },
  { col:0, title:"Always love a morning with you! But I try to find you later in the day too 😍😘" },
  { col:1, title:"See you tomorrow gorgeous guys 😍", body:"Can't wait!", thumb:"linear-gradient(135deg,#5a4a5a,#332a33)" },
];

/* ── Shop items ── */
const SHOP_ITEMS = [
  { id:1, label:"Exclusive Photos Pack", desc:"25 hot private photos", price:99, thumb:"linear-gradient(135deg,#5a3a5a,#2a1a2a)", tag:"PHOTOS" },
  { id:2, label:"Nylon & Heels Video", desc:"15 min full HD video", price:150, thumb:"linear-gradient(135deg,#3a4a6a,#1a2a4a)", tag:"VIDEO" },
  { id:3, label:"Personal Voice Note", desc:"30 sec personalised audio message", price:50, thumb:"linear-gradient(135deg,#5a4a2a,#2a2a1a)", tag:"AUDIO" },
  { id:4, label:"Signed Polaroid", desc:"Physical signed photo shipped to you", price:300, thumb:"linear-gradient(135deg,#4a2a2a,#2a1a1a)", tag:"MERCH" },
  { id:5, label:"Foot Fetish Bundle", desc:"30 photos + 5 min video", price:200, thumb:"linear-gradient(135deg,#3a5a3a,#1a2a1a)", tag:"BUNDLE" },
  { id:6, label:"Oil Show Video", desc:"10 min exclusive recording", price:180, thumb:"linear-gradient(135deg,#5a3a2a,#2a1a0a)", tag:"VIDEO" },
];

/* ── colours ── */
const BG = "#111111";
const CARD = "#1e1e1e";
const CARD2 = "#252525";
const BORDER = "#2e2e2e";
const TEXT = "#f0f0f0";
const MUTED = "#888";
const SUBTLE = "#555";
const RED = "#FCA311";
const GOLD = "#f5a623";
const GREEN = "#4caf50";
const PURPLE = "#8e24aa";

const LEAGUE_COLORS = {
  royal: "#FCA311",
  diamond: "#8e24aa",
  gold: "#f5a623",
  silver: "#b0bec5",
};

/* ── helpers ── */
function Stars({ n, size = 13 }) {
  return (
    <span style={{ display:"flex", gap:1 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i<=n?GOLD:"none"} stroke={i<=n?GOLD:SUBTLE} strokeWidth="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </span>
  );
}

function HexBadge({ level, league, size = 44 }) {
  const color = LEAGUE_COLORS[league] || "#888";
  return (
    <div style={{ position:"relative", width:size, height:size }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <path
          d="M43.7 2.9a12.7 12.7 0 0112.6 0l15.9 9.1 15.8 9a12.7 12.7 0 016.4 11.1L94.4 50l.04 18a12.7 12.7 0 01-6.4 11.1l-15.8 9-15.9 9.1a12.7 12.7 0 01-12.6 0l-15.9-9.1-15.8-9A12.7 12.7 0 015.6 68L5.6 50l-.04-18A12.7 12.7 0 0112 21l15.8-9 15.9-9.1z"
          fill={color}
          fillOpacity="0.9"
        />
        <text x="50" y="50" textAnchor="middle" dy="0.35em" fill="#fff" fontSize={level > 9 ? "30" : "36"} fontWeight="700" fontFamily="sans-serif">
          {level}
        </text>
      </svg>
    </div>
  );
}

function DiamondIcon({ size=18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 23L0 11L4.5 2H19.5L24 11L12 23ZM20.3 10.4L17.6 5H6.4L3.7 10.4L12 18.8L20.3 10.4ZM12 14.5L7.3 9.8L8.2 8H10.9L12 9.9L13.1 8H15.8L16.7 9.8L12 14.5Z"/>
    </svg>
  );
}

function LockedAlbumIcons({ size=15 }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#d63f9b">
        <path d="M12 23L0 11L4.5 2H19.5L24 11L12 23Z"/>
      </svg>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#FCA311">
        <path d="M12 23L0 11L4.5 2H19.5L24 11L12 23Z"/>
      </svg>
    </div>
  );
}

function Tag({ label, emoji, onClick }) {
  return (
    <a
      href="#"
      onClick={e => { e.preventDefault(); onClick && onClick(); }}
      style={{
        display:"inline-flex",
        alignItems:"center",
        gap:6,
        background:"transparent",
        border:`1px solid ${BORDER}`,
        color:"#ccc",
        fontSize:12,
        padding:"4px 12px",
        borderRadius:20,
        cursor:"pointer",
        fontFamily:FONT,
        textDecoration:"none",
        transition:"border-color .15s",
      }}
      onMouseEnter={e=>e.currentTarget.style.borderColor="#555"}
      onMouseLeave={e=>e.currentTarget.style.borderColor=BORDER}
    >
      {emoji && <span style={{ fontSize:13 }}>{emoji}</span>}
      {label}
    </a>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background:CARD, borderRadius:8, padding:"16px 18px", ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ fontSize:15, fontWeight:700, color:TEXT, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
      {children}
    </div>
  );
}

function HeartIcon({ filled, size=16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill={filled?"#FCA311":"none"} stroke={filled?"#FCA311":"currentColor"} strokeWidth="1.5">
      <path d="M15.5 3a4.5 4.5 0 014.5 4.5C20 12 11 19 11 19S2 12 2 7.5A4.5 4.5 0 016.5 3c1.74 0 3.41.81 4.5 2.08A5.48 5.48 0 0115.5 3z"/>
    </svg>
  );
}

function OrangeHeartIcon({ size=18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill={GOLD}>
      <path d="M15.5 3a4.5 4.5 0 014.5 4.5C20 12 11 19 11 19S2 12 2 7.5A4.5 4.5 0 016.5 3c1.74 0 3.41.81 4.5 2.08A5.48 5.48 0 0115.5 3z"/>
    </svg>
  );
}

function BellIcon({ size=16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor">
      <path d="M50.7 2.54a5.89 5.89 0 00-5.91 5.92c0 .28.19.48.19.76a23.86 23.86 0 00-18.15 23.2c0 12.51.1 23.97-10.02 31.7-4.87 4.11-7.93 10.03-7.93 16.05h83.55c0-5.92-3.05-11.84-7.83-16.04-10.12-7.74-10.12-19.2-10.12-31.7A23.87 23.87 0 0056.43 9.32c0-.29.2-.48.2-.77a5.97 5.97 0 00-5.92-6.01zM38.78 86.09a11.94 11.94 0 0023.87 0H38.77z"/>
    </svg>
  );
}

function UserPlusIcon({ size=16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path fillRule="evenodd" d="M10.18 8.22A2.91 2.91 0 1010.18 2.4a2.91 2.91 0 000 5.82zM3.64 6.76V4.58H2.18v2.18H0v1.46h2.18v2.18h1.46V8.22h2.18V6.76H3.64zM4.36 12.58c0-1.93 3.88-2.91 5.82-2.91 1.94 0 5.82.98 5.82 2.91V14H4.36v-1.42z"/>
    </svg>
  );
}

function MessageIcon({ size=16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor">
      <path d="M35.6 37.5L6.4 64.3l33.8-22.2 6.2 5 3.5 2.3 3.1-2.3 6.9-5.2 33.7 22.5-29.2-26.7 33.8-27.6.5 5.2v49.2c0 6.4-4.9 11.5-10.9 11.5H35.8L11.9 98.9V75.9C5.9 75.9 1 70.7 1 64.3V14.8l.5-4.6 35-27.4zM4.3 4.2C6.3 2.2 8.9 1 11.9 1h76.1c3 0 5.8 1.3 7.8 3.5L49.9 41.4 4.3 4.2z"/>
    </svg>
  );
}

function CalendarAddIcon({ size=14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17 17" fill="currentColor">
      <path fillRule="evenodd" d="M14.1 2.4h-.8V.8h-1.6v1.6H5.3V.8H3.7v1.6h-.8C2 2.4 1.3 3.1 1.3 4l-.01 9.6c0 .88.71 1.6 1.6 1.6H8.14A5.15 5.15 0 017.6 13.6H2.9V5.6H14.1v.93A5.14 5.14 0 0115.7 6.9V4c0-.88-.7-1.6-1.6-1.6z" clipRule="evenodd"/>
      <path d="M14.05 11.73V9H12.23v2.73H9.5v1.82h2.73v2.73h1.82v-2.73H16.77v-1.82h-2.72z"/>
    </svg>
  );
}

function MegaphoneIcon({ size=13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4.03v8.06A4.48 4.48 0 0016.5 12zM14 3.23v2.06a7 7 0 010 13.42v2.06a9 9 0 000-17.54z"/>
    </svg>
  );
}

function PlayThumb({ thumb, duration }) {
  return (
    <div style={{
      borderRadius:8, overflow:"hidden", position:"relative",
      aspectRatio:"16/9", background:thumb || "#222",
      marginBottom:8, cursor:"pointer",
    }}>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(2px)" }}>
          <span style={{ color:"#fff", fontSize:16, marginLeft:3 }}>▶</span>
        </div>
      </div>
      {duration && (
        <span style={{ position:"absolute", bottom:5, right:6, background:"rgba(0,0,0,0.75)", color:"#fff", fontSize:10, padding:"2px 5px", borderRadius:3 }}>{duration}</span>
      )}
    </div>
  );
}

/* ── Shop Section ── */
function ShopSection({ username }) {
  const TAG_COLORS = {
    PHOTOS: "#d63f9b",
    VIDEO: "#FCA311",
    AUDIO: "#8e24aa",
    MERCH: "#f5a623",
    BUNDLE: "#1e88e5",
  };

  return (
    <div style={{ background:BG, padding:"18px 20px" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
        <div>
          <h3 style={{ margin:0, fontSize:16, fontWeight:800, color:TEXT }}>{username}'s Store</h3>
          <p style={{ margin:"4px 0 0", fontSize:12, color:MUTED }}>Exclusive content & merch available for purchase</p>
        </div>
        <button style={{
          background:"transparent", border:`1px solid #444`,
          color:TEXT, fontSize:12, padding:"6px 16px",
          borderRadius:20, cursor:"pointer", fontFamily:FONT,
          display:"flex", alignItems:"center", gap:5,
        }}>
          🛍️ View All
        </button>
      </div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        {SHOP_ITEMS.map(item => (
          <div key={item.id} style={{
            background:CARD, borderRadius:10, overflow:"hidden",
            border:`1px solid ${BORDER}`, cursor:"pointer",
            transition:"border-color .15s",
          }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#555"}
            onMouseLeave={e=>e.currentTarget.style.borderColor=BORDER}
          >
            {/* Thumb */}
            <div style={{
              width:"100%", aspectRatio:"4/3",
              background:item.thumb, position:"relative",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <span style={{
                position:"absolute", top:8, left:8,
                background:TAG_COLORS[item.tag] || "#555",
                color:"#fff", fontSize:9, fontWeight:800,
                padding:"2px 7px", borderRadius:3, letterSpacing:".05em",
              }}>{item.tag}</span>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(255,255,255,0.25)">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>

            {/* Info */}
            <div style={{ padding:"10px 12px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:TEXT, marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.label}</div>
              <div style={{ fontSize:11, color:MUTED, marginBottom:10, lineHeight:1.4 }}>{item.desc}</div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ fontSize:13 }}>🪙</span>
                  <span style={{ fontSize:13, fontWeight:800, color:GOLD }}>{item.price} tk</span>
                </div>
                <button style={{
                  background:RED, border:"none", color:"#fff",
                  fontSize:11, fontWeight:700, padding:"5px 12px",
                  borderRadius:16, cursor:"pointer", fontFamily:FONT,
                }}>Buy</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo banner */}
      <div style={{
        marginTop:18, background:"linear-gradient(135deg,#1a0d1a,#2a1a0a)",
        border:`1px solid #3a2a1a`, borderRadius:10, padding:"14px 18px",
        display:"flex", alignItems:"center", gap:14,
      }}>
        <span style={{ fontSize:28 }}>🎁</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:GOLD, marginBottom:2 }}>Fan Club Members get 20% OFF everything in the store</div>
          <div style={{ fontSize:12, color:MUTED }}>Join the fan club to unlock exclusive discounts and early access to new drops</div>
        </div>
        <button style={{
          background:GOLD, border:"none", color:"#000",
          fontWeight:800, fontSize:12, padding:"8px 18px",
          borderRadius:20, cursor:"pointer", fontFamily:FONT, flexShrink:0,
        }}>Join Fan Club</button>
      </div>
    </div>
  );
}

const NAVBAR_H = 48;

/* ══ MAIN ══ */
export default function WatchPage({ username }) {
  const router = useRouter();
  const scrollRef = useRef(null);

  const [viewers, setViewers] = useState(Math.floor(Math.random()*8000)+2000);
  const [showTip, setShowTip] = useState(false);
  const [showPrivate, setShowPrivate] = useState(false);
  const [showBuyTokens, setShowBuyTokens] = useState(false);
  const [following, setFollowing] = useState(false);
  const [notifyLive, setNotifyLive] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [activeTab, setActiveTab] = useState("Profile");
  const [profileTab, setProfileTab] = useState("Profile");
  const [goalAmount] = useState(288);
  const [goalCurrent, setGoalCurrent] = useState(112);
  const [goalText] = useState("BEND OVER SPANK ASS X5");
  const [privatePrice] = useState(60);
  const [showPip, setShowPip] = useState(false);
  const [chatTab, setChatTab] = useState("Private");
  const [lotteryTime, setLotteryTime] = useState("16:30");
  const [tipMenuExpanded, setTipMenuExpanded] = useState(false);
  const [relatedPage, setRelatedPage] = useState(1);
  const [featuredPage, setFeaturedPage] = useState(1);
  const [epicGoal] = useState({ text:"Pay for my Car!", current:7, total:50000 });

  const [isLive] = useState(false);
  const [lastOnline] = useState("about 1 hour ago");

  const color = COLORS[username?.charCodeAt(0) % COLORS.length] || RED;
  const goalPct = Math.min(100, Math.round((goalCurrent / goalAmount) * 100));
  const epicPct = Math.min(100, Math.round((epicGoal.current / epicGoal.total) * 100));
  const openBuyTokens = () => { setShowTip(false); setShowPrivate(false); setShowBuyTokens(true); };

  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => Math.max(100, v + Math.floor(Math.random()*20)-9));
      setGoalCurrent(v => Math.min(goalAmount, v + Math.floor(Math.random()*2)));
    }, 3000);
    return () => clearInterval(id);
  }, [goalAmount]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const fn = () => setShowPip(el.scrollTop > window.innerHeight - NAVBAR_H);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [activeTab]);

  /* ── Tab list ── */
  const mainTabs = ["Profile","Videos 1","Photos 47","Feed","Shop"];

  const visibleTipMenu = tipMenuExpanded ? TIP_MENU : TIP_MENU.slice(0, 16);

  return (
    <div style={{ height:"100%", background:BG, display:"flex", flexDirection:"column", overflow:"hidden", fontFamily:FONT, color:TEXT }}>

      {/* ══ TOP NAV ══ */}
      <div style={{
        height:NAVBAR_H, background:"#0d0d0d",
        borderBottom:`1px solid ${BORDER}`,
        display:"flex", alignItems:"center",
        padding:"0 12px", gap:8, flexShrink:0, position:"relative", zIndex:100,
      }}>
        {/* Back */}
        <button onClick={()=>router.back()} style={{ background:"none", border:"none", color:MUTED, cursor:"pointer", fontSize:22, padding:"0 6px", lineHeight:1 }}>‹</button>

        {/* Avatar + name dropdown */}
        <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0, cursor:"pointer" }}>
          <div style={{ position:"relative" }}>
            <div style={{ width:26, height:26, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:"#fff" }}>
              {username?.[0]?.toUpperCase()}
            </div>
            <div style={{ position:"absolute", bottom:0, right:0, width:7, height:7, borderRadius:"50%", background:GREEN, border:"1.5px solid #0d0d0d" }}/>
          </div>
          <span style={{ fontSize:13, fontWeight:700, color:TEXT }}>{username}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill={MUTED}><path d="M7 10l5 5 5-5z"/></svg>
        </div>

        <div style={{ width:1, height:18, background:BORDER, flexShrink:0 }}/>

        {/* Page tabs */}
        <div style={{ display:"flex", alignItems:"center", height:"100%", gap:0 }}>
          {mainTabs.map(tab => {
            const base = tab.split(" ")[0];
            const active = activeTab === base || activeTab === tab;
            const count = tab.includes(" ") ? tab.split(" ")[1] : null;
            return (
              <button key={tab} onClick={()=>setActiveTab(base)} style={{
                background:"none", border:"none", cursor:"pointer",
                padding:"0 14px", height:"100%", fontSize:13,
                color:active ? TEXT : MUTED,
                borderBottom:active ? `2px solid ${RED}` : "2px solid transparent",
                fontFamily:FONT, fontWeight:active?600:400,
                display:"flex", alignItems:"center", gap:4, whiteSpace:"nowrap",
              }}>
                {base}
                {count && <span style={{ fontSize:11, color:MUTED }}>{count}</span>}
              </button>
            );
          })}
        </div>

        {/* Fan Club center */}
        <div style={{ flex:1, display:"flex", justifyContent:"center" }}>
          <button style={{
            background:"transparent", border:`1px solid #444`,
            color:TEXT, fontSize:12, fontWeight:600,
            padding:"5px 16px", borderRadius:20, cursor:"pointer",
            fontFamily:FONT, display:"flex", alignItems:"center", gap:6,
          }}>
            <DiamondIcon size={14}/> Join Fan Club
          </button>
        </div>

        {/* Right */}
        <button onClick={()=>router.back()} style={{ background:"none", border:"none", color:MUTED, fontSize:12, cursor:"pointer", fontFamily:FONT, display:"flex", alignItems:"center", gap:3, flexShrink:0, whiteSpace:"nowrap" }}>
          Next Model <span style={{ fontSize:14 }}>›</span>
        </button>
        <button style={{ background:"none", border:"none", color:MUTED, fontSize:12, cursor:"pointer", fontFamily:FONT, display:"flex", alignItems:"center", gap:5, flexShrink:0, marginLeft:6 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill={MUTED}>
            <rect width="6" height="6" rx="2"/><rect y="8" width="6" height="6" rx="2"/>
            <rect x="8" width="6" height="6" rx="2"/><rect x="8" y="8" width="6" height="6" rx="2"/>
          </svg>
          Categories
        </button>
      </div>

      {/* ══ SCROLL AREA ══ */}
      <div ref={scrollRef} style={{ flex:1, overflowY:"auto", overflowX:"hidden", scrollbarWidth:"thin", scrollbarColor:"#333 transparent" }}>

        {/* ── VIDEO + CHAT ROW ── */}
        <div style={{ display:"flex", height:`calc(100vh - ${NAVBAR_H}px)`, background:"#000", minHeight:400 }}>

          {/* Video — 60% */}
          <div style={{ flex:"0 0 60%", display:"flex", flexDirection:"column", position:"relative", background:"#000", minWidth:0 }}>

            <div style={{ flex:1, position:"relative", minHeight:0 }}>
              {isLive ? (
                <StreamPlayer username={username} color={color} emoji="😍" viewers={viewers}/>
              ) : (
                <div style={{
                  position:"absolute", inset:0,
                  background:`radial-gradient(circle at 50% 35%, ${color}22, #050505 75%)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  overflow:"hidden",
                }}>
                  <div style={{
                    position:"absolute", inset:0,
                    background:`linear-gradient(160deg, ${color}18, #0a0a0a 70%)`,
                    filter:"brightness(0.55)",
                  }}/>

                  <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:24 }}>
                    <span style={{
                      display:"inline-block", background:"#fff", color:"#111",
                      fontSize:11, fontWeight:800, letterSpacing:".05em",
                      padding:"4px 14px", borderRadius:4, marginBottom:14,
                    }}>OFFLINE</span>

                    <div style={{ fontSize:14, color:"rgba(255,255,255,0.65)", marginBottom:16 }}>
                      Was online {lastOnline}
                    </div>

                    <div style={{
                      display:"inline-flex", alignItems:"center", gap:8,
                      background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)",
                      borderRadius:24, padding:"8px 18px", marginBottom:14,
                      fontStyle:"italic", fontSize:13, color:"#fff",
                    }}>
                      <MegaphoneIcon size={13}/>
                      Thinking about you 😊
                    </div>
                    <br/>

                    <div style={{
                      display:"inline-flex", alignItems:"center", gap:10,
                      background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)",
                      borderRadius:24, padding:"7px 16px",
                    }}>
                      <BellIcon size={14}/>
                      <span style={{ fontSize:13, color:"#fff" }}>Notify when live:</span>
                      <div onClick={()=>setNotifyLive(n=>!n)} style={{
                        width:34, height:18, borderRadius:9, cursor:"pointer",
                        position:"relative", background:notifyLive?RED:"rgba(255,255,255,0.2)",
                        transition:"background .2s",
                      }}>
                        <div style={{
                          position:"absolute", top:2, left:notifyLive?16:2,
                          width:14, height:14, borderRadius:"50%", background:"#fff",
                          transition:"left .2s",
                        }}/>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{
              position:"relative", zIndex:2,
              display:"flex", alignItems:"center", padding:"10px 12px", gap:10,
              background: isLive ? "linear-gradient(transparent, rgba(0,0,0,0.8))" : "#0d0d0d",
            }}>
              <button onClick={()=>setFollowing(f=>!f)} style={{
                width:34, height:34, borderRadius:"50%",
                background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)",
                cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                color:following?RED:"#fff",
              }}>
                <HeartIcon filled={following} size={16}/>
              </button>
              <span style={{ fontSize:12, color:"#fff", fontWeight:600 }}>{viewers > 999 ? `${(viewers/1000).toFixed(1)}k` : viewers}</span>
              <div style={{ flex:1 }}/>
              <button onClick={()=>setShowTip(true)} style={{
                background:GOLD, border:"none", color:"#000",
                fontWeight:800, fontSize:13, padding:"9px 24px",
                borderRadius:24, cursor:"pointer", fontFamily:FONT,
              }}>Send Private Tip</button>
            </div>

            <div style={{
              position:"relative", zIndex:2,
              background:"#0d0d0d", borderTop:`1px solid ${BORDER}`,
              display:"flex", alignItems:"center", padding:"8px 12px", gap:8,
              flexWrap:"wrap",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:5, flexShrink:0 }}>
                <svg width="16" height="16" viewBox="0 0 22 22" fill={GREEN}><path d="M11 1C5.477 1 1 5.477 1 11a10 10 0 0020 0c0-1.16-.21-2.31-.61-3.39l-1.6 1.6c.14.59.21 1.19.21 1.79a8 8 0 11-8-8c.6 0 1.2.07 1.79.21L14.4 1.6C13.31 1.21 12.16 1 11 1zm7 0l-4 4v1.5l-2.55 2.55C11.3 9 11.15 9 11 9a2 2 0 102 2c0-.15 0-.3-.05-.45L15.5 8H17l4-4h-3V1zm-7 4a6 6 0 106 6h-2a4 4 0 11-4-4V5z"/></svg>
                <span style={{ fontSize:12, color:GREEN, fontWeight:700 }}>Goal:</span>
                <span style={{ fontSize:12, color:GOLD, fontWeight:700 }}>{goalCurrent} tk</span>
                <span style={{ fontSize:12, color:TEXT }}>{goalText}</span>
              </div>
              <div style={{ flex:1, height:4, background:"#333", borderRadius:4, overflow:"hidden", maxWidth:160, minWidth:60 }}>
                <div style={{ width:`${goalPct}%`, height:"100%", background:GREEN, borderRadius:4, transition:"width .5s" }}/>
              </div>
              <span style={{ fontSize:11, color:MUTED, flexShrink:0 }}>{goalPct}%</span>
              <div style={{ flex:1 }}/>
              <div style={{ fontSize:10, color:MUTED, textAlign:"right", flexShrink:0 }}>
                <div>King of the room:</div>
                <div style={{ color:GOLD, fontSize:11, fontWeight:700 }}>👑 Deleted Account</div>
              </div>
              <button style={{ background:"none", border:"none", color:MUTED, cursor:"pointer", fontSize:14, marginLeft:4 }}>∧</button>
            </div>

            <div style={{ position:"relative", zIndex:2, padding:"5px 12px", background:"#0d0d0d", borderTop:`1px solid ${BORDER}` }}>
              <span style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>New Model, Stream Virgin 💋 35 degrees of HOT!</span>
            </div>
          </div>

          {/* Chat — 40% */}
          <div style={{
            flex:"0 0 40%", display:"flex", flexDirection:"column",
            background:"#111", borderLeft:`1px solid ${BORDER}`,
            overflow:"hidden", height:"100%",
          }}>
            <div style={{
              display:"flex", alignItems:"center",
              borderBottom:`1px solid ${BORDER}`,
              height:44, flexShrink:0, background:"#111",
            }}>
              <button onClick={()=>setChatTab("Public")} style={{
                background:"none", border:"none", cursor:"pointer",
                padding:"0 14px", height:"100%", fontSize:12,
                color:chatTab==="Public"?TEXT:MUTED,
                borderBottom:chatTab==="Public"?`2px solid ${RED}`:"2px solid transparent",
                fontFamily:FONT, fontWeight:chatTab==="Public"?600:400,
                display:"flex", alignItems:"center", gap:5,
              }}>
                <svg width="13" height="13" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M85.5 0h-71A14.5 14.5 0 000 14.5v53.3a14.5 14.5 0 0014.5 14.5H25v17.2l23.5-17.2h37A14.5 14.5 0 00100 67.8V14.5A14.5 14.5 0 0085.5 0z"/>
                </svg>
                Public
              </button>

              <button onClick={()=>setChatTab("Private")} style={{
                background:"none", border:"none", cursor:"pointer",
                padding:"0 14px", height:"100%", fontSize:12,
                color:chatTab==="Private"?TEXT:MUTED,
                borderBottom:chatTab==="Private"?`2px solid ${RED}`:"2px solid transparent",
                fontFamily:FONT, fontWeight:chatTab==="Private"?600:400,
                display:"flex", alignItems:"center", gap:5,
              }}>
                <svg width="13" height="13" viewBox="0 0 19 13" fill="currentColor">
                  <path fillRule="evenodd" d="M7.7 0c3.7 0 6.8 2.57 6.8 5.72s-3 5.72-6.8 5.72c-1.16 0-2.3-.26-3.35-.76-2.41.97-3.64 1.43-3.68 1.4-.07-.06.39-1.11 1.4-3.14C1.3 8.04.9 6.9.9 5.72.9 2.57 3.94 0 7.7 0z" clipRule="evenodd"/>
                </svg>
                Private
              </button>

              <button style={{
                background:"none", border:"none", cursor:"pointer",
                padding:"0 10px", height:"100%", fontSize:12,
                color:MUTED, fontFamily:FONT,
                display:"flex", alignItems:"center", gap:4,
              }}>
                <svg width="14" height="14" viewBox="0 0 100 100" fill={MUTED}>
                  <path d="M92.6 77.4c-5.4-4.6-24.4-12.2-24.4-12.2s-12.1-6-6-12.2c2.4-2.4 3.9-6.9 4.7-11.7 1.4 0 3.3-3 4.3-7.2 1.1-4.3.8-8.1-.6-8.5-.7-.2-1.6.5-2.4 1.8v-4.8c0-6-6-18.2-18.2-18.2S31.8 16.6 31.8 22.6v4.8c-.8-1.3-1.7-2-2.4-1.8-1.4.4-1.7 4.2-.6 8.5 1 4.1 2.9 7.2 4.3 7.2.9 4.8 2.3 9.3 4.8 11.7 6 6.1-6.1 12.2-6.1 12.2s-19 7.6-24.3 12.2C2 81.9 1.4 95.6 1.4 95.6h97.2s-.7-13.7-6-18.2z"/>
                </svg>
                <span>10</span>
              </button>

              <button style={{
                background:"none", border:"none", cursor:"pointer",
                padding:"0 8px", height:"100%", color:MUTED, display:"flex", alignItems:"center",
              }}>
                <DiamondIcon size={16}/>
              </button>

              <div style={{ flex:1 }}/>
              <button style={{ background:"none", border:"none", color:MUTED, cursor:"pointer", padding:"0 12px", fontSize:18, display:"flex", alignItems:"center" }}>⋮</button>
            </div>

            {chatTab === "Public" ? (
              <LiveChat username={username} viewers={viewers} onTipClick={()=>setShowTip(true)} dark/>
            ) : (
              <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:20, overflowY:"auto" }}>
                <div style={{ textAlign:"center", maxWidth:300 }}>
                  <div style={{
                    width:76, height:76, borderRadius:"50%", margin:"0 auto 16px",
                    background:"radial-gradient(circle, #ff6b35 0%, #FCA311 100%)",
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:32,
                  }}>⭐</div>
                  <div style={{ fontSize:18, fontWeight:800, color:GOLD, marginBottom:4 }}>Go Ultimate</div>
                  <div style={{ fontSize:13, color:TEXT, marginBottom:18 }}>to chat privately with any model</div>
                  <div style={{ background:"#1a1a1a", borderRadius:8, padding:"14px 16px", marginBottom:16, textAlign:"left" }}>
                    {[
                      { icon:"💬", text:"Unlimited Private messages" },
                      { icon:"🔤", text:"Chat auto-translation", badge:"NEW" },
                      { icon:"📷", text:"Send photos to models" },
                      { icon:"😍", text:"Fun and naughty emoji" },
                    ].map((item,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:i<3?10:0 }}>
                        <span style={{ fontSize:16 }}>{item.icon}</span>
                        <span style={{ fontSize:12, color:TEXT }}>{item.text}</span>
                        {item.badge && (
                          <span style={{ background:GOLD, color:"#000", fontSize:8, fontWeight:800, padding:"2px 5px", borderRadius:3 }}>{item.badge}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize:11, color:MUTED, marginBottom:14 }}>
                    And many <span style={{ color:GOLD, cursor:"pointer" }}>other benefits!</span>
                  </div>
                  <button style={{
                    background:"transparent", border:`1px solid #555`,
                    color:TEXT, fontWeight:600, fontSize:13,
                    padding:"9px 28px", borderRadius:24, cursor:"pointer", fontFamily:FONT,
                  }}>Register to Chat</button>
                </div>
              </div>
            )}

            <div style={{ borderTop:`1px solid ${BORDER}`, background:"#111", flexShrink:0 }}>
              <button style={{
                width:"100%", background:"none", border:"none", cursor:"pointer",
                padding:"8px 12px", display:"flex", alignItems:"center", gap:8,
              }}>
                <svg width="26" height="26" viewBox="0 0 32 27" fill={GOLD}>
                  <path d="M11.16.57c-2.78 0-5.3.5-7.23 1.4C2.13 2.8.76 4.04.6 5.63L.57 17.37v3.76c0 1.73 1.45 3.08 3.36 3.97 1.92.89 4.45 1.4 7.23 1.4 2.57 0 4.91-.44 6.77-1.21 1.08.38 2.25.58 3.48.58 5.46 0 9.9-4.11 9.9-9.17 0-4.95-4.26-9-9.56-9.16v-1.9h-.02c-.17-1.6-1.55-2.84-3.34-3.67a17.54 17.54 0 00-7.23-1.4zm0 1.9c2.5 0 4.76.48 6.3 1.2 1.55.71 2.24 1.57 2.24 2.28S19 7.52 17.47 8.23c-1.54.72-3.8 1.2-6.31 1.2-2.5 0-4.76-.48-6.3-1.2-1.05-.59-2.14-1.32-2.23-2.37.06-.7.74-1.5 2.22-2.2 1.55-.71 3.8-1.2 6.31-1.2zM2.63 9.2c.4.27.84.52 1.3.73 1.92.89 4.45 1.4 7.23 1.4.8 0 1.58-.05 2.34-.13a9.05 9.05 0 00-1.24 1.98 15.63 15.63 0 01-7.4-1.16c-1.5-.69-2.19-1.51-2.23-2.2V9.2zm18.78.23c4.35 0 7.85 3.24 7.85 7.27 0 4.03-3.5 7.28-7.85 7.28s-7.86-3.25-7.86-7.28 3.5-7.27 7.86-7.27z"/>
                </svg>
                <div style={{ textAlign:"left", flex:1 }}>
                  <div style={{ fontSize:12, color:TEXT }}>
                    <span style={{ color:GREEN, fontWeight:600 }}>Get 50 free tokens</span> in the hourly draw
                  </div>
                  <div style={{ fontSize:11, color:MUTED }}>
                    Winners will be announced in <span style={{ color:TEXT, fontWeight:700, background:"#222", padding:"1px 6px", borderRadius:3 }}>{lotteryTime}</span>
                  </div>
                </div>
                <svg width="12" height="12" viewBox="0 0 100 100" fill={MUTED}><path d="M90 21l10 10.2-50 50L0 31l10-10 40 39.7"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ══ SHOP TAB — renders right after the stream row ══ */}
        {activeTab === "Shop" && <ShopPage />}

        {/* ══ PROFILE COVER — hidden when Shop tab is active ══ */}
        {activeTab !== "Shop" && (
          <div style={{ background:"#111", position:"relative" }}>
            <div style={{ width:"100%", height:180, position:"relative", overflow:"hidden", background:`linear-gradient(135deg, ${color}44 0%, #1a1a1a 100%)` }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 40%, #111 100%)" }}/>
              <button style={{ position:"absolute", top:10, right:10, background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:4, color:"#fff", padding:"4px 8px", cursor:"pointer", fontSize:11, display:"flex", alignItems:"center", gap:4 }}>
                <svg width="14" height="14" viewBox="0 0 100 100" fill="currentColor"><path d="M0 0v39h11V11h28V0H11zm11 61H0v39h39V89H11zm78 28H61v11h39V61H89zm0-89H61v11h28v28h11V0z"/></svg>
              </button>
            </div>

            <div style={{ display:"flex", alignItems:"flex-end", gap:14, padding:"0 20px 14px", marginTop:-56, position:"relative", zIndex:2 }}>
              <div style={{ position:"relative", flexShrink:0 }}>
                <div style={{
                  width:96, height:96, borderRadius:"50%",
                  background:color, border:"3px solid #111",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:36, fontWeight:800, color:"#fff",
                  cursor:"pointer",
                }}>{username?.[0]?.toUpperCase()}</div>
                <div style={{ position:"absolute", bottom:4, left:4, width:12, height:12, borderRadius:"50%", background:GREEN, border:"2px solid #111" }}/>
              </div>

              <div style={{ flex:1, paddingBottom:4 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                  <h2 style={{ fontSize:20, fontWeight:800, color:TEXT, margin:0 }}>{username}</h2>
                  <svg width="18" height="18" viewBox="0 0 100 100" fill="#d63f9b">
                    <path d="m50 24.1c14.3 0 26 11.6 26 25.9 0 13.2-9.8 24-22.5 25.7v5.7h5.5v5.5h-5.5v5.5h-6.8v-5.5h-5.5v-5.5h5.5v-5.7c-12.8-1.7-22.6-12.5-22.6-25.7 0-14.3 11.6-25.9 25.9-25.9zm0 6.8c-10.6 0-19.1 8.5-19.1 19.1s8.5 19.1 19.1 19.1 19.1-8.5 19.1-19.1-8.5-19.1-19.1-19.1z"/>
                  </svg>
                  <a href="#" style={{ display:"flex", alignItems:"center", gap:4, textDecoration:"none" }}>
                    <div style={{
                      display:"flex", alignItems:"center", gap:4,
                      background:"#1a1a1a", border:`1px solid ${BORDER}`,
                      borderRadius:20, padding:"2px 10px",
                    }}>
                      <HexBadge level={713} league="silver" size={22}/>
                      <span style={{ fontSize:11, color:TEXT, fontWeight:600 }}>713</span>
                    </div>
                  </a>
                </div>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:6, paddingBottom:4, flexWrap:"wrap", justifyContent:"flex-end" }}>
                <button style={{
                  background:"transparent", border:`1px solid #444`,
                  color:TEXT, fontSize:12, fontWeight:600,
                  padding:"6px 14px", borderRadius:20,
                  cursor:"pointer", fontFamily:FONT,
                  display:"flex", alignItems:"center", gap:5,
                }}>
                  <DiamondIcon size={13}/> Join Fan Club
                </button>
                <button onClick={()=>setFollowing(f=>!f)} style={{
                  width:34, height:34, borderRadius:6,
                  background:"transparent", border:`1px solid #444`,
                  color:following?RED:MUTED, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <HeartIcon filled={following} size={16}/>
                </button>
                <button onClick={()=>setNotifyLive(n=>!n)} style={{
                  width:34, height:34, borderRadius:6,
                  background:"transparent", border:`1px solid #444`,
                  color:notifyLive?RED:MUTED, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <BellIcon size={15}/>
                </button>
                <button style={{
                  width:34, height:34, borderRadius:6,
                  background:"transparent", border:`1px solid #444`,
                  color:MUTED, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <UserPlusIcon size={14}/>
                </button>
                <div style={{ width:1, height:20, background:BORDER }}/>
                <button style={{
                  width:34, height:34, borderRadius:6,
                  background:"transparent", border:`1px solid #444`,
                  color:MUTED, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <MessageIcon size={14}/>
                </button>
              </div>
            </div>

            {/* Profile sub-tabs */}
            <div style={{ display:"flex", padding:"0 20px", borderBottom:`1px solid ${BORDER}` }}>
              {[
                {label:"Profile", key:"Profile"},
                {label:"Videos", count:1, key:"Videos"},
                {label:"Photos", count:47, key:"Photos"},
                {label:"Fan Club & Feed", key:"Fan Club"},
              ].map(t => {
                const active = profileTab === t.key;
                return (
                  <button key={t.key} onClick={()=>setProfileTab(t.key)} style={{
                    background:"none", border:"none", cursor:"pointer",
                    padding:"10px 16px", fontSize:13, fontFamily:FONT,
                    color:active?TEXT:MUTED,
                    borderBottom:active?`2px solid ${RED}`:"2px solid transparent",
                    fontWeight:active?700:400,
                    display:"flex", alignItems:"center", gap:4,
                  }}>
                    {t.label}
                    {t.count && <span style={{ fontSize:11, color:MUTED }}>{t.count}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ PROFILE BODY — hidden when Shop tab is active ══ */}
        {activeTab !== "Shop" && (
          <div style={{ background:BG, padding:"18px 20px", display:"grid", gridTemplateColumns:"3fr 2fr", gap:16, alignItems:"start" }}>

            {/* LEFT */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

              <Card>
                <SectionTitle>Welcome to {username}'s webcam room!</SectionTitle>
                <div style={{ display:"grid", gridTemplateColumns:"120px 1fr", gap:"8px 0", fontSize:13 }}>
                  {[
                    ["Languages:", "English, French"],
                    ["Age:", "58 years old"],
                    ["Interested in:", "Everybody"],
                    ["Body type:", "Medium Build"],
                    ["Ethnicity:", "White"],
                    ["Eye color:", "Blue"],
                  ].map(([l,v],i) => (
                    <div key={i} style={{ display:"contents" }}>
                      <span style={{ color:MUTED, fontSize:12 }}>{l}</span>
                      <span style={{ color:"#ccc", fontSize:12 }}>{v}</span>
                    </div>
                  ))}
                  <span style={{ color:MUTED, fontSize:12, paddingTop:4 }}>Interests:</span>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5, paddingTop:3 }}>
                    {["Action","Adventure","Bars","Beach","Cafes, Restaurants","Coffee","Comedy","Concerts","Documentary","Drama","Gin","Meditation","Picnics","Seafood","Shopping"].map(i=>(
                      <Tag key={i} label={i} emoji={INTEREST_EMOJI[i]}/>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                      <OrangeHeartIcon size={18}/>
                      <span style={{ fontSize:14, fontWeight:700, color:TEXT }}>My Private Shows</span>
                    </div>
                    <span style={{ fontSize:12, color:GOLD, fontWeight:600 }}>from {privatePrice} tk/min</span>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:11, color:MUTED, marginBottom:4 }}>59 ratings</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:20, fontWeight:800, color:TEXT }}>4.4</span>
                      <Stars n={4} size={12}/>
                    </div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, background:"#1e1800", border:"1px solid #3a2e00", borderRadius:8, padding:"10px 12px", marginBottom:12 }}>
                  <span style={{ fontSize:18 }}>💎</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:GOLD, marginBottom:2 }}>Best for Privates</div>
                    <div style={{ fontSize:12, color:MUTED }}>One of the highest-rated models for Private shows</div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:7 }}>
                  <span style={{ fontSize:14 }}>🔥</span>
                  <span style={{ fontSize:13, fontWeight:700, color:TEXT }}>I Do in Private Shows</span>
                </div>
                <p style={{ color:MUTED, fontSize:12, lineHeight:1.9, margin:0 }}>
                  69 Position, Yoga, Upskirt, Twerk, Topless, Spanking, Smoking, Oil Show, Nylon, Handjob, Humiliation, Heels, Jerk-off Instruction, Massage, Masturbation, Cuckold, Flashing, Foot Fetish, Footjob, Tittyfuck, Mistress, Leather, Dirty Talk, Cock Rating, Blowjob, Doggy Style, Facesitting, Role Play, Striptease
                </p>
              </Card>

              <Card>
                <SectionTitle>
                  Users' Reviews <span style={{ color:MUTED, fontWeight:400, fontSize:13 }}>10</span>
                </SectionTitle>
                {REVIEWS.map((r,i) => (
                  <div key={i} style={{ paddingBottom:12, marginBottom:i<REVIEWS.length-1?12:0, borderBottom:i<REVIEWS.length-1?`1px solid ${BORDER}`:"none" }}>
                    <Stars n={r.stars} size={12}/>
                    <p style={{ color:"#ccc", fontSize:12, margin:"6px 0 3px", lineHeight:1.6 }}>{r.text}</p>
                    <span style={{ color:SUBTLE, fontSize:11 }}>{r.date} • <span style={{ color:MUTED }}>{r.type}</span></span>
                  </div>
                ))}
                <div style={{ display:"flex", alignItems:"center", margin:"12px 0 0" }}>
                  <div style={{ flex:1, height:"1px", background:BORDER }}/>
                  <button style={{
                    background:"transparent", border:"none", color:MUTED, fontSize:12,
                    cursor:"pointer", fontFamily:FONT, padding:"0 14px",
                    display:"flex", alignItems:"center", gap:4,
                  }}>
                    See More
                    <svg width="10" height="8" viewBox="0 0 10 8" fill={MUTED}><path d="m0 0 5 5 5-5z" opacity=".6"/></svg>
                  </button>
                  <div style={{ flex:1, height:"1px", background:BORDER }}/>
                </div>
              </Card>

              <Card>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:TEXT }}>{username}'s Epic Goal</span>
                  <span style={{ color:MUTED, cursor:"pointer", fontSize:12 }}>ⓘ</span>
                </div>
                <p style={{ color:PURPLE, fontSize:14, fontWeight:700, margin:"0 0 12px" }}>{epicGoal.text}</p>
                <div style={{ background:CARD2, border:`1px solid ${BORDER}`, borderRadius:8, padding:"10px 14px", marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ color:MUTED, fontSize:12 }}>{epicGoal.current} tk / {epicGoal.total.toLocaleString()} tk</span>
                    <span style={{ color:MUTED, fontSize:12 }}>{epicPct}%</span>
                  </div>
                  <div style={{ height:4, background:"#333", borderRadius:4, overflow:"hidden" }}>
                    <div style={{ width:`${epicPct}%`, height:"100%", background:PURPLE, borderRadius:4 }}/>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span style={{ color:MUTED, fontSize:12 }}>2 contributors</span>
                  <button style={{
                    background:GOLD, border:"none", color:"#000",
                    fontWeight:800, fontSize:12, padding:"7px 20px",
                    borderRadius:20, cursor:"pointer", fontFamily:FONT,
                  }}>Contribute</button>
                </div>
              </Card>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {PANELS.map((p, i) => (
                  <div key={i} style={{ background:CARD, borderRadius:8, overflow:"hidden", cursor:"pointer" }}>
                    {p.thumb && (
                      <div style={{ width:"100%", aspectRatio:"4/3", background:p.thumb }}/>
                    )}
                    <div style={{ padding:"10px 12px" }}>
                      <p style={{ color:TEXT, fontSize:12, fontWeight:p.thumb?400:600, margin:0, lineHeight:1.5, whiteSpace:"pre-line" }}>{p.title}</p>
                      {p.body && <p style={{ color:MUTED, fontSize:11, margin:"7px 0 0", lineHeight:1.7, whiteSpace:"pre-line" }}>{p.body}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <Card>
                <SectionTitle>{username}'s Categories</SectionTitle>
                {[
                  { label:"My Specifics:", tags:MY_SPECIFICS },
                  { label:"I Do in My Shows:", tags:I_DO_IN_SHOWS },
                  { label:"I Exclusively Do in Private:", tags:EXCLUSIVELY_PRIVATE },
                ].map(({label,tags}) => (
                  <div key={label} style={{ marginBottom:12 }}>
                    <span style={{ color:MUTED, fontSize:11, display:"block", marginBottom:6 }}>{label}</span>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                      {tags.map(t => <Tag key={t} label={t}/>)}
                    </div>
                  </div>
                ))}
                <div style={{ marginTop:4 }}>
                  <p style={{ color:TEXT, fontSize:13, fontWeight:600, marginBottom:8 }}>Related Mixed Categories</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {RELATED_MIXED.map(t => <Tag key={t} label={t}/>)}
                    <a href="#" style={{
                      display:"inline-block", background:"transparent",
                      border:`1px solid ${BORDER}`, color:MUTED,
                      fontSize:12, padding:"4px 12px", borderRadius:20,
                      cursor:"pointer", textDecoration:"none",
                    }}>ALL CATEGORIES +</a>
                  </div>
                </div>
              </Card>
            </div>

            {/* RIGHT */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

              <Card>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:14, fontWeight:700, color:TEXT }}>Videos</span>
                    <span style={{ color:MUTED, fontSize:12 }}>1</span>
                  </div>
                  <a href="#" style={{ background:"#2a2a2a", border:"none", color:"#ccc", fontSize:11, cursor:"pointer", padding:"4px 12px", borderRadius:20, fontFamily:FONT, textDecoration:"none", display:"flex", alignItems:"center", gap:3 }}>
                    See All <svg width="8" height="12" viewBox="0 0 8 13" fill="#ccc"><path d="M1 1.2a1 1 0 011.4 0L7 5.77A1 1 0 017 7.2l-4.6 4.6A1 1 0 111 10.36l3.87-3.89L1 2.6a1 1 0 010-1.4z"/></svg>
                  </a>
                </div>
                <PlayThumb thumb="linear-gradient(160deg,#9a8a6a 0%,#5a4a3a 45%,#2a2a2a 100%)" duration="00:14"/>
                <div style={{ fontSize:12, color:"#ccc", marginBottom:4 }}>I celebrate Me !</div>
                <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                  <HeartIcon size={13}/>
                  <span style={{ fontSize:11, color:MUTED }}>50</span>
                </div>
              </Card>

              <Card>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:14, fontWeight:700, color:TEXT }}>Albums</span>
                    <span style={{ color:MUTED, fontSize:12 }}>11</span>
                  </div>
                  <a href="#" style={{ background:"#2a2a2a", border:"none", color:"#ccc", fontSize:11, padding:"4px 12px", borderRadius:20, fontFamily:FONT, textDecoration:"none", display:"flex", alignItems:"center", gap:3 }}>
                    See All <svg width="8" height="12" viewBox="0 0 8 13" fill="#ccc"><path d="M1 1.2a1 1 0 011.4 0L7 5.77A1 1 0 017 7.2l-4.6 4.6A1 1 0 111 10.36l3.87-3.89L1 2.6a1 1 0 010-1.4z"/></svg>
                  </a>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7 }}>
                  {ALBUMS.map((album, i) => (
                    <div key={i} style={{ cursor:"pointer" }}>
                      <div style={{
                        borderRadius:6, overflow:"hidden",
                        position:"relative", aspectRatio:"4/3",
                        background:album.free ? album.thumb : "#1a1a1a",
                        display:"flex", alignItems:"center", justifyContent:"center", marginBottom:5,
                      }}>
                        {!album.free && (
                          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:6 }}>
                            <LockedAlbumIcons size={13}/>
                            <span style={{ color:MUTED, fontSize:9, textAlign:"center", marginTop:2 }}>Join Fan Club</span>
                            <span style={{ color:SUBTLE, fontSize:8 }}>or</span>
                            <div style={{ display:"flex", alignItems:"center", gap:2 }}>
                              <span style={{ fontSize:9 }}>🪙</span>
                              <span style={{ color:GOLD, fontSize:10, fontWeight:800 }}>{album.price} tk</span>
                            </div>
                          </div>
                        )}
                        <span style={{ position:"absolute", bottom:3, right:4, color:"rgba(255,255,255,0.5)", fontSize:9, fontWeight:600, textShadow:"0 1px 2px rgba(0,0,0,0.6)" }}>{album.count}</span>
                      </div>
                      <div style={{ fontSize:10, color:"#ccc", fontWeight:500, marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{album.label}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:2 }}>
                        <HeartIcon size={11}/>
                        <span style={{ fontSize:10, color:MUTED }}>{album.likes}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{
                  width:"100%", marginTop:12,
                  background:GREEN, border:"none", color:"#fff",
                  fontWeight:700, fontSize:12, padding:"10px",
                  borderRadius:8, cursor:"pointer", fontFamily:FONT,
                }}>See all 47 photos</button>
              </Card>

              <Card>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:3 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill={TEXT}><path d="M12 14h2v-2h-2zm-4 0h2v-2H8zm-4 0h2v-2H4zm8-4h2V8h-2zm-4 0h2V8H8zm-4 0h2V8H4zm12 6H2V6h14zm0-14h-1V0h-2v2H5V0H3v2H2C.89 2 .01 2.9.01 4L0 16a2 2 0 002 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                    <span style={{ fontSize:13, fontWeight:700, color:TEXT }}>Broadcast Schedule</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:10, color:MUTED }}>Notify when live:</span>
                    <div onClick={()=>setNotifyLive(n=>!n)} style={{
                      width:34, height:18, borderRadius:9, cursor:"pointer",
                      position:"relative", background:notifyLive?RED:"#444",
                      transition:"background .2s", flexShrink:0,
                    }}>
                      <div style={{
                        position:"absolute", top:2, left:notifyLive?16:2,
                        width:14, height:14, borderRadius:"50%", background:"#fff",
                        transition:"left .2s",
                      }}/>
                    </div>
                  </div>
                </div>
                <p style={{ color:SUBTLE, fontSize:10, margin:"0 0 10px" }}>All slots are in your time zone — GMT+01:00 12:32 AM</p>
                {SCHEDULE.map(({day,slots,today},i) => (
                  <div key={day} style={{
                    display:"flex", alignItems:"flex-start", justifyContent:"space-between",
                    padding:"7px 0", borderBottom:i<SCHEDULE.length-1?`1px solid ${BORDER}`:"none",
                    gap:8,
                  }}>
                    <span style={{
                      fontSize:12, minWidth:78,
                      color:today?"#4caf50":"#ccc",
                      fontWeight:today?700:400, flexShrink:0,
                    }}>
                      {today && <span style={{ fontSize:9, color:GREEN, display:"block" }}>TODAY</span>}
                      {day}
                    </span>
                    <div style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"flex-end" }}>
                      {slots.map(s => (
                        <button key={s} style={{
                          background:today?"rgba(76,175,80,0.08)":CARD2,
                          border:`1px solid ${today?"rgba(76,175,80,0.3)":BORDER}`,
                          color:today?GREEN:"#ccc", fontSize:10, padding:"2px 7px", borderRadius:4,
                          display:"flex", alignItems:"center", gap:4, cursor:"pointer", fontFamily:FONT,
                          whiteSpace:"nowrap",
                        }}>
                          {s}
                          <CalendarAddIcon size={11}/>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </Card>

              <Card>
                <SectionTitle>Knights</SectionTitle>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                  {KNIGHTS.map(k => (
                    <div key={k.name} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, cursor:"pointer" }}>
                      <HexBadge level={k.level} league={k.league} size={56}/>
                      <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                        <span style={{ color:GOLD, fontSize:10 }}>⭐</span>
                        <span style={{ color:MUTED, fontSize:10, textAlign:"center", maxWidth:70, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{k.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:12 }}>
                  <svg width="16" height="16" viewBox="0 0 22 24" fill={TEXT}>
                    <path d="M7 4a4 4 0 108 0 4 4 0 00-8 0z"/>
                    <path fill="currentColor" fillOpacity=".6" d="M22 14c.003.218-.102.381-.316.491L11.608 18.27a1.97 1.97 0 01-.608.094v5.486c.5 0 1.5-.35 1.5-.35l9.133-3.845a.6.6 0 00.367-.553V14z"/>
                    <path fill="currentColor" fillOpacity=".4" d="M0 14c-.003.218.102.381.316.491l10.076 3.779c.195.063.397.094.608.094v5.486c-.5 0-1.5-.35-1.5-.35L.367 19.655A.6.6 0 010 19.102V14z"/>
                    <path fill="#D4D4D4" d="M.35 13.494l9.652-3.619V14a1 1 0 102 0V9.875l9.652 3.62a.54.54 0 010 1.01l-9.95 3.732a1.54 1.54 0 01-1.404 0L.35 14.506a.54.54 0 010-1.012zm5.4 1.406c.966 0 1.75-.403 1.75-.9s-.784-.9-1.75-.9S4 13.503 4 14s.784.9 1.75.9z"/>
                  </svg>
                  <span style={{ fontSize:14, fontWeight:700, color:TEXT }}>{username}'s Tip Menu</span>
                </div>
                <div style={{ position:"relative" }}>
                  {visibleTipMenu.map((item,i) => (
                    <div key={i} style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"8px 0",
                      borderBottom:i<visibleTipMenu.length-1?`1px solid ${BORDER}`:"none",
                    }}>
                      <span style={{ color:"#ccc", fontSize:12 }}>{item.label}</span>
                      <span style={{ color:TEXT, fontSize:12, fontWeight:700 }}>{item.tokens}</span>
                    </div>
                  ))}
                </div>
                {!tipMenuExpanded && (
                  <button onClick={()=>setTipMenuExpanded(true)} style={{
                    width:"100%", marginTop:10, background:"transparent",
                    border:"none", color:MUTED, fontSize:12, cursor:"pointer",
                    fontFamily:FONT, display:"flex", alignItems:"center", justifyContent:"center", gap:4,
                    padding:"6px 0",
                  }}>
                    Show More
                    <svg width="8" height="12" viewBox="0 0 8 13" fill={MUTED}><path d="M1 1.2a1 1 0 011.4 0L7 5.77A1 1 0 017 7.2l-4.6 4.6A1 1 0 111 10.36l3.87-3.89L1 2.6a1 1 0 010-1.4z"/></svg>
                  </button>
                )}
              </Card>
            </div>
          </div>
        )}

        {/* ── RELATED GIRLS — hidden when Shop tab is active ── */}
        {activeTab !== "Shop" && (
          <>
            <ModelGrid title="Related Girls" models={RELATED} page={relatedPage} setPage={setRelatedPage} onModel={name=>router.push(`/watch/${name}`)}/>
            <ModelGrid title="Featured Girls" models={FEATURED} page={featuredPage} setPage={setFeaturedPage} onModel={name=>router.push(`/watch/${name}`)} showDots/>
          </>
        )}

        {/* FOOTER */}
        <footer style={{ background:"#0d0d0d", borderTop:`1px solid ${BORDER}`, padding:"32px 24px 0" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:32, marginBottom:28 }}>
            <div>
              <div style={{ fontSize:16, fontWeight:900, marginBottom:10, display:"flex", alignItems:"center", gap:2 }}>
                <img src="/images/logo.jpg" alt="Stripchatbate" style={{ height: 28, objectFit: "contain" }} />
              </div>
              <p style={{ fontSize:12, color:MUTED, lineHeight:1.8, margin:"0 0 12px" }}>
                The world's premier 18+ LIVE adult entertainment destination for real connection and adult play.
              </p>
              <p style={{ fontSize:10, color:SUBTLE, margin:0 }}>All models are 18 years of age or older.</p>
            </div>
            {[
              { title:"STRIPCHATBATE", links:["About","Blog","Media Inquiries"] },
              { title:"LEGAL & SAFETY", links:["Privacy Policy","Terms of Use","DMCA Policy","Cookies Policy"] },
              { title:"WORK WITH US", links:["Become a Model","Studio Signup","Webcam Affiliate Program"] },
              { title:"HELP & SUPPORT", links:["Support & FAQ","Billing Support","DMCA Protection"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize:9, fontWeight:800, color:SUBTLE, letterSpacing:".1em", marginBottom:10 }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ fontSize:12, color:SUBTLE, marginBottom:7, cursor:"pointer" }}
                    onMouseEnter={e=>e.currentTarget.style.color="#aaa"}
                    onMouseLeave={e=>e.currentTarget.style.color=SUBTLE}
                  >{link}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:`1px solid ${BORDER}`, padding:"14px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontSize:10, color:SUBTLE }}>18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement</span>
            <span style={{ fontSize:10, color:SUBTLE }}>© 2026 Stripchatbate.com</span>
          </div>
        </footer>
      </div>

      {/* PiP */}
      {showPip && (
        <div style={{
          position:"fixed", bottom:80, left:14, zIndex:999,
          width:240, borderRadius:8, overflow:"hidden",
          boxShadow:"0 8px 32px rgba(0,0,0,0.5)",
          border:`1px solid ${BORDER}`, background:"#111",
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"5px 10px", background:"#0d0d0d", borderBottom:`1px solid ${BORDER}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:16, height:16, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:7, fontWeight:800, color:"#fff" }}>
                {username?.[0]?.toUpperCase()}
              </div>
              <span style={{ fontSize:11, fontWeight:700, color:TEXT }}>{username}</span>
              <span style={{ background:RED, color:"#fff", fontSize:7, fontWeight:800, padding:"1px 4px", borderRadius:2 }}>LIVE</span>
            </div>
            <button onClick={()=>setShowPip(false)} style={{ background:"none", border:"none", color:MUTED, cursor:"pointer", fontSize:13 }}>✕</button>
          </div>
          <div style={{ aspectRatio:"16/9" }}>
            <StreamPlayer username={username} color={color} emoji="😍" viewers={viewers}/>
          </div>
        </div>
      )}

      {/* MODALS */}
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

/* ── ModelGrid ── */
function ModelGrid({ title, models, page, setPage, onModel, showDots }) {
  const perPage = 8;
  const visible = models.slice(0, perPage);

  return (
    <div style={{ padding:"20px", background:"#0d0d0d", borderTop:`1px solid ${BORDER}` }}>
      <div style={{ fontSize:13, fontWeight:800, color:TEXT, marginBottom:12, textTransform:"none" }}>{title}</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:4 }}>
        {visible.map((name,i) => (
          <div key={name} onClick={()=>onModel(name)} style={{
            cursor:"pointer", overflow:"hidden", borderRadius:6,
            border:`1px solid ${BORDER}`, background:"#1a1a1a",
          }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#555"}
            onMouseLeave={e=>e.currentTarget.style.borderColor=BORDER}
          >
            <div style={{
              aspectRatio:"3/4",
              background:`hsl(${i*37+20},14%,16%)`,
              display:"flex", alignItems:"center", justifyContent:"center", position:"relative",
            }}>
              <span style={{ color:"rgba(255,255,255,0.05)", fontSize:24 }}>👤</span>
              {i===1 && (
                <div style={{
                  position:"absolute", top:4, left:4,
                  background:"#1565c0", color:"#fff",
                  fontSize:7, fontWeight:800, padding:"2px 5px",
                  borderRadius:3, display:"flex", alignItems:"center", gap:2,
                }}>
                  👥 Group
                </div>
              )}
            </div>
            <div style={{ padding:"4px 6px" }}>
              <span style={{ fontSize:10, color:"#999", display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{name}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, marginTop:14 }}>
        {[1,2,3,4,5].map(n => (
          <button key={n} onClick={()=>setPage(n)} style={{
            width:28, height:28, borderRadius:5,
            border:`1px solid ${BORDER}`, cursor:"pointer",
            background:page===n?RED:"#1a1a1a",
            color:page===n?"#fff":MUTED,
            fontSize:12, fontWeight:page===n?700:400,
            fontFamily:FONT,
          }}>{n}</button>
        ))}
        {showDots && <>
          <span style={{ color:SUBTLE, fontSize:12, padding:"0 2px" }}>…</span>
          <button style={{ width:28, height:28, borderRadius:5, border:`1px solid ${BORDER}`, cursor:"pointer", background:"#1a1a1a", color:MUTED, fontSize:11, fontFamily:FONT }}>100</button>
        </>}
        <button style={{
          background:"#1a1a1a", border:`1px solid ${BORDER}`,
          color:MUTED, fontSize:11, padding:"5px 12px",
          borderRadius:5, cursor:"pointer", fontFamily:FONT,
          display:"flex", alignItems:"center", gap:3,
        }}>
          Next <svg width="8" height="12" viewBox="0 0 8 13" fill={MUTED}><path d="M1 1.2a1 1 0 011.4 0L7 5.77A1 1 0 017 7.2l-4.6 4.6A1 1 0 111 10.36l3.87-3.89L1 2.6a1 1 0 010-1.4z"/></svg>
        </button>
      </div>
    </div>
  );
}