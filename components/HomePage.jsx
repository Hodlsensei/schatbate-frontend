"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import StreamRow from "./StreamRow";
import StreamCard from "./StreamCard";
import BuyTokensModal from "./BuyTokensModal";

function FeaturedGrid({ category }) {
  const [items,setItems]=useState([]);
  const [page,setPage]=useState(0);
  const [loading,setLoading]=useState(false);
  const [cols,setCols]=useState(4);
  const loaderRef=useRef(null);

  useEffect(()=>{
    const check=()=>setCols(window.innerWidth<=480?2:window.innerWidth<=768?3:4);
    check();
    window.addEventListener("resize",check);
    return()=>window.removeEventListener("resize",check);
  },[]);

  const loadMore=useCallback(async()=>{
    if(loading)return;
    setLoading(true);
    try{
      const res=await fetch(`https://stripchat-backend.onrender.com/api/streams?category=${category}&limit=20&offset=${page*20}`);
      const data=await res.json();
      const fetched=data.streams||[];
      const extras=Array.from({length:Math.max(0,20-fetched.length)},(_,i)=>({id:9000+page*20+i,username:`Model_${page*20+fetched.length+i+1}`,viewers:Math.floor(Math.random()*20000)+300,hd:Math.random()>0.4,isNew:Math.random()<0.15,region:["🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦","🇷🇴","🇩🇪","🇬🇧"][Math.floor(Math.random()*8)]}));
      setItems(prev=>[...prev,...fetched,...extras]);
      setPage(prev=>prev+1);
    }catch{
      const dummy=Array.from({length:20},(_,i)=>({id:9000+page*20+i,username:`Model_${page*20+i+1}`,viewers:Math.floor(Math.random()*20000)+300,hd:Math.random()>0.4,isNew:Math.random()<0.15,region:["🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦"][Math.floor(Math.random()*5)]}));
      setItems(prev=>[...prev,...dummy]);
      setPage(prev=>prev+1);
    }
    setLoading(false);
  },[loading,page,category]);

  useEffect(()=>{loadMore();},[]);// eslint-disable-line
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting)loadMore();},{rootMargin:"300px"});
    if(loaderRef.current)observer.observe(loaderRef.current);
    return()=>observer.disconnect();
  },[loadMore]);

  return(
    <div style={{padding:"0 8px"}}>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:4}}>
        {items.map((streamer,i)=><StreamCard key={`${streamer.id}-${i}`} streamer={streamer} index={i} gridMode={true}/>)}
      </div>
      <div ref={loaderRef} style={{height:40,display:"flex",alignItems:"center",justifyContent:"center",marginTop:16}}>
        {loading&&<div style={{display:"flex",gap:6}}>{[0,1,2].map(i=>(<div key={i} style={{width:8,height:8,borderRadius:"50%",background:"var(--red2)",animation:`pulseDot 1s ${i*0.2}s infinite`}}/>))}</div>}
      </div>
    </div>
  );
}

export default function HomePage({ defaultCategory="girls" }) {
  const [activeCategory,setActiveCategory]=useState(defaultCategory);
  const [liveCount,setLiveCount]=useState(11162);
  const [showPromo,setShowPromo]=useState(true);
  const [showTokens,setShowTokens]=useState(false);
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [isMobile,setIsMobile]=useState(false);

  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<=768);
    check();
    window.addEventListener("resize",check);
    return()=>window.removeEventListener("resize",check);
  },[]);

  useEffect(()=>{
    const id=setInterval(()=>{setLiveCount(v=>Math.max(10000,v+Math.floor(Math.random()*10)-4));},3000);
    return()=>clearInterval(id);
  },[]);

  const mainLeft = isMobile ? 0 : 220;
  const mainTop  = isMobile ? 90 : 90; // topbar(50) + tabs(40)

  return(
    <div style={{position:"fixed",inset:0,background:"var(--bg)"}}>
      {showTokens&&<BuyTokensModal onClose={()=>setShowTokens(false)}/>}

      {/* Topbar */}
      <Topbar liveCount={liveCount} onMenuToggle={()=>setSidebarOpen(o=>!o)}/>

      {/* Gender tabs */}
      <div style={{
        position:"fixed", top:50, left:0, right:0, zIndex:998,
        background:"#fff", borderBottom:"2px solid var(--border)",
        display:"flex", alignItems:"center",
        paddingLeft: isMobile ? 8 : 220,
        height:40, overflowX:"auto", scrollbarWidth:"none",
      }}>
        {["girls","couples","guys","trans"].map(tab=>(
          <div key={tab} onClick={()=>setActiveCategory(tab)} style={{
            padding:"0 16px", height:"100%", display:"flex", alignItems:"center",
            fontSize:14, fontWeight:500, cursor:"pointer", whiteSpace:"nowrap",
            color:activeCategory===tab?"var(--text)":"var(--muted)",
            borderBottom:activeCategory===tab?"2px solid var(--red2)":"2px solid transparent",
            marginBottom:-2, textTransform:"capitalize", transition:"color .15s",
          }}>
            {tab.charAt(0).toUpperCase()+tab.slice(1)}
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={()=>setSidebarOpen(false)}/>

      {/* Main */}
      <main style={{
        position:"fixed",
        top: mainTop,
        left: mainLeft,
        right:0,
        bottom:0,
        overflowY:"auto",
        overflowX:"hidden",
        paddingBottom:70,
        background:"var(--bg)",
        transition:"left .25s ease",
      }}>

        {/* Promo banner */}
        {showPromo&&(
          <div style={{margin:"12px 12px 16px",background:"linear-gradient(135deg,#7b1010,#a00,#7b1010)",borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>🎁</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:2,color:"#fff"}}>Special for You</div>
              <div style={{fontSize:11,color:"#ffcdd2"}}>Get tokens with <span style={{color:"#ffeb3b",fontWeight:700}}>25% OFF!</span></div>
            </div>
            <button onClick={()=>setShowTokens(true)} style={{background:"#f5a623",border:"none",color:"#000",fontSize:11,fontWeight:700,padding:"7px 12px",borderRadius:6,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>GET TOKENS</button>
            <button onClick={()=>setShowPromo(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:18,cursor:"pointer",padding:4,flexShrink:0}}>✕</button>
          </div>
        )}

        <StreamRow title="Today's Recommendations for You" category={activeCategory}/>
        <StreamRow title="African" category={activeCategory} african/>
        <StreamRow title="Top Free Live Sex Cams" category={activeCategory}/>
        <StreamRow title="Couples Live Sex Cams" category="couples"/>
        <StreamRow title="Mobile Live Sex Cams" category={activeCategory} mobile/>
        <StreamRow title="New &amp; Trending" category={activeCategory} trending/>
        <StreamRow title="VR Cams" category={activeCategory} vr/>

        <div style={{marginBottom:28}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 12px",marginBottom:10}}>
            <span style={{fontSize:16,fontWeight:600}}>Featured Live Sex Shows</span>
            <span style={{fontSize:12,color:"var(--muted)",cursor:"pointer"}}>See All</span>
          </div>
          <FeaturedGrid category={activeCategory}/>
        </div>
      </main>

      {/* Bottom join banner */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:500,background:"var(--red2)",padding:isMobile?"8px 12px":"10px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:isMobile?8:16}}>
        <span style={{fontSize:isMobile?16:20}}>💬</span>
        <span style={{fontSize:isMobile?12:14,fontWeight:500}}>
          {isMobile?"Join to interact with models!":"Join Stripchatbate to interact with models!"}
        </span>
        <button style={{background:"#fff",color:"#c0392b",fontSize:isMobile?11:13,fontWeight:700,padding:isMobile?"5px 14px":"7px 20px",borderRadius:20,border:"none",cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>Join FREE</button>
      </div>
    </div>
  );
}