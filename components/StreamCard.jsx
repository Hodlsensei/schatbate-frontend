"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PHOTOS = [
  "https://pornstargold.com/wp-content/uploads/pornstar-pics/Carly-Rae-1.jpg",
  "https://img.doppiocdn.live/thumbs/1774136460/112450066",
  "https://img.doppiocdn.live/thumbs/1774136580/207387673",
  "https://img.doppiocdn.live/thumbs/1774136790/118068157",
  "https://img.doppiocdn.live/thumbs/1774136850/226211199",
  "https://img.doppiocdn.live/thumbs/1774136760/168358223",
  "https://img.doppiocdn.live/thumbs/1774136520/129641724",
  "https://img.doppiocdn.live/thumbs/1774136700/237147972",
  "https://img.doppiocdn.live/thumbs/1774136730/62705089",
  "https://img.doppiocdn.live/thumbs/1774136850/105248197",
  "https://img.doppiocdn.live/thumbs/1774137150/242271261",
  "https://lh6.googleusercontent.com/proxy/CzyslyxbMwpsBE-RYuj1vW5kVZ0dgEYza4dD9Ea9n2TOGGx6OY7Q4Fx6-f_J2yuiEktHIAZDKG3rrLsoFOawZ0afdkSeWCLQgZWT9Wd4a-ROWyhqv4c",
];

const FLAGS = ["🇿🇦","🇺🇸","🇧🇷","🇨🇴","🇷🇺","🇺🇦","🇯🇵","🇫🇷","🇩🇪","🇬🇧","🇲🇽","🇳🇬","🇹🇭","🇷🇴","🇵🇱"];

export default function StreamCard({ streamer, index=0, gridMode=false }) {
  const router=useRouter();
  const [hovered,setHovered]=useState(false);
  const [viewers,setViewers]=useState(streamer?.viewers||Math.floor(Math.random()*30000)+500);

  const photo=streamer?.photo||PHOTOS[index%PHOTOS.length];
  const flag=streamer?.region||FLAGS[index%FLAGS.length];
  const name=streamer?.username||`Model_${index+1}`;
  const isNew=streamer?.isNew||false;
  const isVR=streamer?.vr||false;
  const isMob=streamer?.mobile||false;
  const isHD=streamer?.hd!==undefined?streamer.hd:Math.random()>0.4;

  useEffect(()=>{
    const id=setInterval(()=>{setViewers(v=>Math.max(100,v+Math.floor(Math.random()*20)-9));},3000+index*100);
    return()=>clearInterval(id);
  },[index]);

  const fmtViewers=(n)=>n>=1000?`${(n/1000).toFixed(1)}k`:String(n);

  return(
    <div
      onClick={()=>router.push(`/watch/${name}`)}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        width:gridMode?"100%":160,
        flexShrink:gridMode?undefined:0,
        borderRadius:6,
        overflow:"hidden",
        position:"relative",
        cursor:"pointer",
        background:"#111",
        transform:hovered?"scale(1.03)":"scale(1)",
        boxShadow:hovered?"0 8px 28px rgba(0,0,0,0.7)":"none",
        transition:"transform .2s, box-shadow .2s",
        zIndex:hovered?10:1,
        animation:`fadeUp .3s ${index*0.03}s both`,
      }}
    >
      <div style={{width:"100%",aspectRatio:"3/2",overflow:"hidden",position:"relative"}}>
        <img src={photo} alt={name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transform:hovered?"scale(1.07)":"scale(1)",transition:"transform .3s ease"}}
          onError={e=>{e.currentTarget.style.display="none";e.currentTarget.parentElement.style.background=`hsl(${(index*47)%360},40%,25%)`;}}
        />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.1) 50%,transparent 100%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:5,left:5,display:"flex",gap:3}}>
          {isMob&&<span style={{background:"rgba(0,0,0,0.65)",color:"rgba(255,255,255,.7)",fontSize:9,padding:"1px 4px",borderRadius:3}}>📱</span>}
          {isHD&&!isVR&&<span style={{background:"rgba(0,0,0,0.65)",color:"rgba(255,255,255,.85)",fontSize:8,fontWeight:700,padding:"2px 4px",borderRadius:3,border:"1px solid rgba(255,255,255,0.2)"}}>HD</span>}
          {isVR&&<span style={{background:"#1565c0",color:"#fff",fontSize:8,fontWeight:700,padding:"2px 5px",borderRadius:3}}>VR</span>}
        </div>
        {isNew&&<div style={{position:"absolute",top:5,right:5,background:"#f0a500",color:"#000",fontSize:8,fontWeight:800,padding:"2px 5px",borderRadius:3,letterSpacing:".05em"}}>NEW</div>}
        <div style={{position:"absolute",bottom:20,left:6,display:"flex",alignItems:"center",gap:3}}>
          <span style={{width:5,height:5,borderRadius:"50%",background:"#e53935",display:"inline-block",animation:"pulseDot 1.4s infinite"}}/>
          <span style={{fontSize:9,color:"rgba(255,255,255,0.8)",fontWeight:600}}>{fmtViewers(viewers)}</span>
        </div>
        <div style={{position:"absolute",bottom:5,left:6,right:22,fontSize:10,fontWeight:600,color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textShadow:"0 1px 4px rgba(0,0,0,0.9)"}}>{name}</div>
        <div style={{position:"absolute",bottom:5,right:5,fontSize:11}}>{flag}</div>
      </div>
    </div>
  );
}