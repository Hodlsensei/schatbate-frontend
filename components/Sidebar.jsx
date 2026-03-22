"use client";
import FreeTokensModal from "./FreeTokensModal";
import { useState, useEffect } from "react";

const IcoHome = ({ active }) => (<svg width="18" height="18" viewBox="0 0 24 24" fill={active?"#e5342a":"#666"}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>);
const IcoGallery = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#666"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/></svg>);
const IcoThumb = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#666"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>);
const IcoHeart = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#666"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>);
const IcoChat = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#666"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>);
const IcoClock = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#666"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>);
const IcoLightning = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="#f5c518"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>);
const IcoPaw = () => (<svg width="16" height="16" viewBox="0 0 100 100" fill="#666"><ellipse cx="20" cy="28" rx="10" ry="13"/><ellipse cx="44" cy="18" rx="10" ry="13"/><ellipse cx="68" cy="18" rx="10" ry="13"/><ellipse cx="82" cy="32" rx="10" ry="13"/><path d="M50 42c-18 0-32 12-32 28 0 12 8 20 20 22l12 3 12-3c12-2 20-10 20-22 0-16-14-28-32-28z"/></svg>);
const IcoTicket = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="#666"><path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-2 .89-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-2-3.46V6h16v2.54z"/></svg>);
const IcoToy = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="#666"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>);
const IcoMobile = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="#666"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>);
const IcoGrid = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="#777"><path d="M3 3h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4zM3 10h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4zM3 17h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4z"/></svg>);
const IcoGlobe = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="#888"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>);
const IcoSearch = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="#999"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>);
const IcoClose = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="#666"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>);

const CoinSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="17" fill="#f5a623" stroke="#d4881a" strokeWidth="1.5"/>
    <circle cx="18" cy="18" r="13" fill="#ffd54f"/>
    <text x="18" y="23" textAnchor="middle" fontSize="14" fontWeight="900" fill="#b8860b" fontFamily="serif">$</text>
  </svg>
);
const UKFlag = () => (<svg width="22" height="15" viewBox="0 0 60 40" style={{borderRadius:2,flexShrink:0,display:"block"}}><rect width="60" height="40" fill="#012169"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/><rect x="24" y="0" width="12" height="40" fill="#fff"/><rect x="0" y="14" width="60" height="12" fill="#fff"/><rect x="26" y="0" width="8" height="40" fill="#C8102E"/><rect x="0" y="16" width="60" height="8" fill="#C8102E"/></svg>);
const USFlag = () => (<svg width="22" height="15" viewBox="0 0 190 100" style={{borderRadius:2,flexShrink:0,display:"block"}}>{[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>(<rect key={i} x="0" y={i*(100/13)} width="190" height={100/13} fill={i%2===0?"#B22234":"#fff"}/>))}<rect x="0" y="0" width="76" height="54" fill="#3C3B6E"/>{[0,1,2,3,4].map(row=>[0,1,2,3,4,5].map(col=>(<circle key={`a${row}${col}`} cx={6+col*13} cy={6+row*10} r="2.8" fill="#fff"/>)))}{[0,1,2,3].map(row=>[0,1,2,3,4].map(col=>(<circle key={`b${row}${col}`} cx={12+col*13} cy={11+row*10} r="2.8" fill="#fff"/>)))}</svg>);
const UkrFlag = () => (<svg width="22" height="15" viewBox="0 0 22 15" style={{borderRadius:2,flexShrink:0,display:"block"}}><rect width="22" height="7.5" fill="#005BBB"/><rect y="7.5" width="22" height="7.5" fill="#FFD500"/></svg>);
const VRBadge = () => (<span style={{background:"#1565c0",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 5px",borderRadius:3,letterSpacing:".04em",flexShrink:0}}>VR</span>);
const Sparkle = () => <span style={{color:"#e91e8c",fontSize:11,marginLeft:2,flexShrink:0}}>✦✦</span>;

const navItems = [
  {id:"Home",iconType:"home",label:"Home"},
  {id:"Gallery",iconType:"gallery",label:"Gallery"},
  {id:"Recommended",iconType:"thumb",label:"Recommended"},
  {id:"My Favorites",iconType:"heart",label:"My Favorites"},
  {id:"Best for Privates",iconType:"chat",label:"Best for Privates"},
  {id:"Watch History",iconType:"clock",label:"Watch History"},
];
const specials = [
  {id:"United Kingdom",sType:"uk",label:"United Kingdom",count:203},
  {id:"United States",sType:"us",label:"United States",count:874},
  {id:"Ukrainian",sType:"ukr",label:"Ukrainian",count:159},
  {id:"New Models",sType:"lightning",label:"New Models",count:1203},
  {id:"VR Cams",sType:"vr",label:"VR Cams",count:164},
  {id:"BDSM",sType:"paw",label:"BDSM",count:88},
  {id:"Ticket Shows",sType:"ticket",label:"Ticket Shows",count:133},
];
const age=[["Teen 18+",1419],["Young 22+",3796],["MILF",1277],["Mature",231],["Granny",46]];
const ethnicity=[["Arab",129],["Asian",609],["Ebony",696],["Indian",514],["Latina",2711],["Mixed",272],["White",2378]];
const bodyType=[["Skinny",2421],["Athletic",717],["Medium",2335],["Curvy",1456],["BBW",355]];
const hair=[["Blonde",1131],["Black",1956],["Brunette",3427],["Redhead",357],["Colorful",343]];
const privateRows=[["8-12 tk",3271],["16-24 tk",2020],["32-60 tk",1582],["90+ tk",355],["Recordable Privates",5058],["Spy on Shows",338],["Video Call (Cam2Cam)",6820]];
const popular=[["Interactive Toy",4082,"toy",false],["Mobile",1596,"mobile",false],["Group Sex",91,null,false],["Big Tits",3064,null,false],["Hairy Pussy",1108,null,false],["Outdoor",1024,null,false],["Big Ass",4258,null,false],["Anal",2867,null,true],["Squirt",3332,null,false],["Fuck Machine",645,null,true],["Hardcore",264,null,false],["Blowjob",5161,null,true],["Pregnant",33,null,false],["Small Tits",2270,null,false],["Fisting",846,null,false],["Masturbation",5703,null,false],["Shaven",3773,null,false],["Deepthroat",4241,null,true],["Office",1020,null,false],["Foot Fetish",4583,null,true]];
const footerLinks=["About Stripchat","Blog","Support & FAQ","Billing Support","Report Content","Media Inquiries","Privacy Policy","Terms of Use","All Models","18 U.S.C. 2257 Record-Keeping Statement"];

function AllCategoriesModal({onClose}){
  const [search,setSearch]=useState("");
  const [tab,setTab]=useState("Main");
  const letters=["#","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const ColHead=({c})=>(<div style={{background:"#f0f0f0",color:"#888",fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",padding:"6px 12px",borderRadius:4,marginBottom:12}}>{c}</div>);
  const Item=({label,count})=>(<div style={{padding:"5px 0",cursor:"pointer",fontSize:14,color:"#111",transition:"color .1s"}} onMouseEnter={e=>e.currentTarget.style.color="#e5342a"} onMouseLeave={e=>e.currentTarget.style.color="#111"}><span style={{fontWeight:500}}>{label} </span><span style={{color:"#aaa",fontSize:12}}>{count?.toLocaleString()}</span></div>);
  return(
    <div style={{position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"stretch"}} onClick={onClose}>
      <div style={{width:"min(860px,96vw)",background:"#fff",overflowY:"auto",boxShadow:"4px 0 32px rgba(0,0,0,0.25)",flexShrink:0}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"18px 24px 14px",borderBottom:"1px solid #eee",position:"sticky",top:0,background:"#fff",zIndex:10}}>
          <span style={{fontSize:17,fontWeight:700,color:"#111",flex:1}}>All Categories</span>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#f2f2f2",borderRadius:20,padding:"6px 14px"}}><IcoSearch/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find categories" style={{border:"none",background:"transparent",outline:"none",fontSize:13,color:"#333",width:130}}/></div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",padding:4,display:"flex",alignItems:"center"}}><IcoClose/></button>
        </div>
        <div style={{display:"flex",padding:"8px 24px 0",borderBottom:"2px solid #eee",overflowX:"auto",scrollbarWidth:"none",position:"sticky",top:61,background:"#fff",zIndex:9}}>
          {["Main",...letters].map(t=>(<button key={t} onClick={()=>setTab(t)} style={{background:"none",border:"none",cursor:"pointer",padding:"5px 7px",fontSize:14,fontWeight:tab===t?700:400,color:tab===t?"#e5342a":"#555",borderBottom:tab===t?"2px solid #e5342a":"2px solid transparent",marginBottom:-2,whiteSpace:"nowrap",fontFamily:"inherit"}}>{t}</button>))}
        </div>
        <div style={{padding:"24px 24px 60px"}}>
          <div style={{fontSize:20,fontWeight:700,color:"#111",marginBottom:20}}>👁 Appearance</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"0 28px"}}>
            <div><ColHead c="Age"/>{[["Teen 18+",1458],["Young 22+",4033],["MILF",1265],["Mature",230],["Granny",46]].map(([l,c])=><Item key={l} label={l} count={c}/>)}</div>
            <div><ColHead c="Ethnicity"/>{[["Arab",135],["Asian",589],["Ebony",738],["Indian",465],["Latina",3001],["Mixed",277],["White",2400]].map(([l,c])=><Item key={l} label={l} count={c}/>)}</div>
            <div><ColHead c="Body Type"/>{[["Skinny",2554],["Athletic",725],["Medium",2402],["Curvy",1552],["BBW",355]].map(([l,c])=><Item key={l} label={l} count={c}/>)}</div>
            <div><ColHead c="Hair"/>{[["Blonde",1151],["Black",2065],["Brunette",3544],["Redhead",376],["Colorful",362]].map(([l,c])=><Item key={l} label={l} count={c}/>)}</div>
          </div>
          <div style={{height:1,background:"#eee",margin:"28px 0"}}/>
          <div style={{fontSize:20,fontWeight:700,color:"#111",marginBottom:18}}>🔥 Popular</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"0 28px"}}>
            {[["Big Ass",4353],["Big Tits",3093],["Blowjob",5161],["Anal",2867],["Squirt",3332],["Masturbation",5703],["Foot Fetish",4583],["Deepthroat",4241],["Hairy Pussy",1131],["Small Tits",2358],["Shaven",3930],["Outdoor",1024]].map(([l,c])=><Item key={l} label={l} count={c}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

const SLabel=({children})=>(<div style={{fontSize:11,fontWeight:600,letterSpacing:".09em",textTransform:"uppercase",color:"#aaa",padding:"14px 16px 5px"}}>{children}</div>);
function NavIconEl({type,active}){
  if(type==="home") return <IcoHome active={active}/>;
  if(type==="gallery") return <IcoGallery/>;
  if(type==="thumb") return <IcoThumb/>;
  if(type==="heart") return <IcoHeart/>;
  if(type==="chat") return <IcoChat/>;
  if(type==="clock") return <IcoClock/>;
  return null;
}
function SpecIcon({type}){
  if(type==="uk") return <UKFlag/>;
  if(type==="us") return <USFlag/>;
  if(type==="ukr") return <UkrFlag/>;
  if(type==="lightning") return <IcoLightning/>;
  if(type==="vr") return <VRBadge/>;
  if(type==="paw") return <IcoPaw/>;
  if(type==="ticket") return <IcoTicket/>;
  return null;
}
const NavRow=({item,active,onClick})=>(<div onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",margin:"1px 6px",borderRadius:7,cursor:"pointer",background:active?"rgba(229,52,42,0.12)":"transparent",transition:"background .1s"}} onMouseEnter={e=>{if(!active)e.currentTarget.style.background="rgba(0,0,0,0.04)";}} onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent";}}><span style={{width:20,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><NavIconEl type={item.iconType} active={active}/></span><span style={{fontSize:14,color:active?"#e5342a":"#222",fontWeight:active?600:400}}>{item.label}</span></div>);
const SpecRow=({item,active,onClick})=>(<div onClick={onClick} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 16px",cursor:"pointer",background:active?"rgba(229,52,42,0.08)":"transparent",transition:"background .1s"}} onMouseEnter={e=>{if(!active)e.currentTarget.style.background="rgba(0,0,0,0.04)";}} onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent";}}><span style={{width:22,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><SpecIcon type={item.sType}/></span><span style={{flex:1,fontSize:14,color:active?"#e5342a":"#222"}}>{item.label}</span><span style={{fontSize:13,color:"#bbb",minWidth:32,textAlign:"right"}}>{item.count.toLocaleString()}</span></div>);
const PlainRow=({label,count,ico,hot,active,onClick})=>(<div onClick={onClick} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 16px",cursor:"pointer",background:active?"rgba(229,52,42,0.08)":"transparent",transition:"background .1s"}} onMouseEnter={e=>{if(!active)e.currentTarget.style.background="rgba(0,0,0,0.04)";}} onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent";}}>{ico&&(<span style={{width:20,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{ico==="toy"&&<IcoToy/>}{ico==="mobile"&&<IcoMobile/>}</span>)}<span style={{flex:1,fontSize:14,color:active?"#e5342a":"#222"}}>{label}</span>{hot&&<Sparkle/>}<span style={{fontSize:13,color:"#bbb",minWidth:32,textAlign:"right"}}>{count?.toLocaleString()}</span></div>);

export default function Sidebar({ isOpen, onClose }) {
  const [active,setActive]=useState("Home");
  const [showCat,setShowCat]=useState(false);
  const [showFreeTokens,setShowFreeTokens]=useState(false);
  const [isMobile,setIsMobile]=useState(false);
  const s=id=>setActive(id);

  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<=768);
    check();
    window.addEventListener("resize",check);
    return ()=>window.removeEventListener("resize",check);
  },[]);

  const sidebarVisible = isMobile ? isOpen : true;

  return(
    <>
      {showCat&&<AllCategoriesModal onClose={()=>setShowCat(false)}/>}
      {showFreeTokens&&<FreeTokensModal onClose={()=>setShowFreeTokens(false)}/>}

      {/* Mobile overlay backdrop */}
      {isMobile && isOpen && (
        <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:998}}/>
      )}

      <aside style={{
        width:220,
        flexShrink:0,
        position:"fixed",
        top: isMobile ? 0 : 90,
        left:0,
        bottom:0,
        background:"#fff",
        borderRight:"1px solid #e8e8e8",
        fontFamily:"'Segoe UI',system-ui,-apple-system,sans-serif",
        display:"grid",
        gridTemplateRows:"auto 1fr",
        overflow:"hidden",
        zIndex: isMobile ? 999 : 100,
        transform: sidebarVisible ? "translateX(0)" : "translateX(-100%)",
        transition:"transform .25s ease",
        boxShadow: isMobile && isOpen ? "4px 0 20px rgba(0,0,0,0.2)" : "none",
      }}>

        {/* Mobile close button inside sidebar */}
        {isMobile && (
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px 4px"}}>
            <span style={{fontSize:14,fontWeight:700,color:"#222"}}>Menu</span>
            <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",padding:4,display:"flex"}}><IcoClose/></button>
          </div>
        )}

        {/* Fixed top */}
        <div style={{overflow:"hidden"}}>
          <div onClick={()=>setShowFreeTokens(true)} style={{margin:"10px 10px 6px",background:"linear-gradient(135deg,#6abf45 0%,#3a8c1c 100%)",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.9"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            <CoinSVG/>
            <div style={{lineHeight:1.25}}>
              <div><span style={{fontSize:22,fontWeight:900,color:"#fff",letterSpacing:"-0.5px"}}>50 </span><span style={{fontSize:14,fontWeight:700,color:"#fff"}}>Tokens</span></div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.9)"}}>to Win Now</div>
            </div>
          </div>
          <div style={{paddingTop:2}}>{navItems.map(item=><NavRow key={item.id} item={item} active={active===item.id} onClick={()=>{s(item.id);if(isMobile)onClose();}}/>)}</div>
          <SLabel>Specials</SLabel>
          {specials.map(item=><SpecRow key={item.id} item={item} active={active===item.id} onClick={()=>{s(item.id);if(isMobile)onClose();}}/>)}
          <div style={{padding:"10px 10px 8px"}}>
            <button onClick={()=>setShowCat(true)} style={{width:"100%",padding:"9px 0",borderRadius:20,background:"#f0f0f0",border:"1px solid #ddd",color:"#444",fontSize:11,fontWeight:700,letterSpacing:".07em",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,fontFamily:"inherit"}} onMouseEnter={e=>e.currentTarget.style.background="#e4e4e4"} onMouseLeave={e=>e.currentTarget.style.background="#f0f0f0"}>
              <IcoGrid/> ALL CATEGORIES
            </button>
          </div>
          <div style={{height:1,background:"#f0f0f0"}}/>
        </div>

        {/* Scrollable bottom */}
        <div style={{overflowY:"auto",overflowX:"hidden",scrollbarWidth:"thin",scrollbarColor:"#ddd transparent"}}>
          <SLabel>Age</SLabel>{age.map(([l,c])=><PlainRow key={l} label={l} count={c} active={active===l} onClick={()=>s(l)}/>)}
          <SLabel>Ethnicity</SLabel>{ethnicity.map(([l,c])=><PlainRow key={l} label={l} count={c} active={active===l} onClick={()=>s(l)}/>)}
          <SLabel>Body Type</SLabel>{bodyType.map(([l,c])=><PlainRow key={l} label={l} count={c} active={active===l} onClick={()=>s(l)}/>)}
          <SLabel>Hair</SLabel>{hair.map(([l,c])=><PlainRow key={l} label={l} count={c} active={active===l} onClick={()=>s(l)}/>)}
          <SLabel>Private Shows</SLabel>{privateRows.map(([l,c])=><PlainRow key={l} label={l} count={c} active={active===l} onClick={()=>s(l)}/>)}
          <SLabel>Popular</SLabel>{popular.map(([l,c,ico,hot])=><PlainRow key={l} label={l} count={c} ico={ico} hot={!!hot} active={active===l} onClick={()=>s(l)}/>)}
          <div style={{height:1,background:"#eee",margin:"10px 0 6px"}}/>
          {footerLinks.map(link=>(<div key={link} style={{padding:"5px 16px",fontSize:12,color:"#bbb",cursor:"pointer",lineHeight:1.6,transition:"color .1s"}} onMouseEnter={e=>e.currentTarget.style.color="#555"} onMouseLeave={e=>e.currentTarget.style.color="#bbb"}>{link}</div>))}
          <div style={{margin:"14px 12px 28px",display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderRadius:8,border:"1px solid #eee",cursor:"pointer",color:"#888",fontSize:14}} onMouseEnter={e=>e.currentTarget.style.borderColor="#ccc"} onMouseLeave={e=>e.currentTarget.style.borderColor="#eee"}>
            <IcoGlobe/><span style={{flex:1}}>English</span><span style={{fontSize:10,color:"#bbb"}}>▼</span>
          </div>
        </div>
      </aside>
    </>
  );
}