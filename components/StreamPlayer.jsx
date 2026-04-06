"use client";
import { useEffect, useRef, useState } from "react";

const HLS_BASE = "http://localhost:8888";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src; s.async = true;
    s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

const ctrlBtn = {
  background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
  width: 34, height: 34, borderRadius: "50%", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 15, flexShrink: 0, transition: "background .15s",
};

export default function StreamPlayer({ username, color, emoji, viewers }) {
  const videoRef        = useRef(null);
  const hlsRef          = useRef(null);
  const containerRef    = useRef(null);
  const controlTimer    = useRef(null);
  const [status, setStatus]             = useState("connecting");
  const [muted, setMuted]               = useState(true);
  const [volume, setVolume]             = useState(0.8);
  const [quality, setQuality]           = useState("auto");
  const [fullscreen, setFullscreen]     = useState(false);
  const [showControls, setShowControls] = useState(true);

  const streamUrl = `${HLS_BASE}/${username}/index.m3u8`;

  useEffect(() => {
    let hls;

    async function initPlayer() {
      if (!window.Hls) {
        await loadScript("https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js");
      }
      const Hls = window.Hls;
      const video = videoRef.current;
      if (!video) return;

      if (Hls.isSupported()) {
        hls = new Hls({
          liveSyncDurationCount: 3,
          liveMaxLatencyDurationCount: 6,
          lowLatencyMode: true,
        });
        hlsRef.current = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setStatus("live");
          video.play().catch(() => {});
        });
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            setStatus("offline");
            setTimeout(() => {
              hls.loadSource(streamUrl);
              hls.startLoad();
            }, 5000);
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = streamUrl;
        video.addEventListener("loadedmetadata", () => {
          setStatus("live");
          video.play().catch(() => {});
        });
        video.addEventListener("error", () => setStatus("offline"));
      } else {
        setStatus("error");
      }
    }

    initPlayer();
    return () => { if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; } };
  }, [streamUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted  = muted;
    }
  }, [volume, muted]);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlTimer.current);
    controlTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      style={{
        position: "relative",
        background: "#000",
        width: "100%",
        height: "100%",      // fills the explicit calc() height set by parent
        overflow: "hidden",
        cursor: showControls ? "default" : "none",
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay playsInline muted={muted}
        style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
      />

      {/* Offline / connecting overlay */}
      {status !== "live" && (
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 60% 40%, ${color}33 0%, #000 70%)`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 16,
        }}>
          <div style={{
            width: 90, height: 90, borderRadius: "50%", background: color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 38, fontWeight: 700, color: "#fff",
            border: "3px solid rgba(255,255,255,0.15)",
            boxShadow: `0 0 40px ${color}66`,
          }}>
            {username?.[0]?.toUpperCase()}
          </div>

          {status === "connecting" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
                <div style={{
                  width: 16, height: 16,
                  border: "2px solid rgba(255,255,255,0.2)",
                  borderTopColor: "#fff", borderRadius: "50%",
                  animation: "spin .7s linear infinite",
                }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Connecting to stream...</span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{streamUrl}</span>
            </div>
          )}

          {status === "offline" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: 6 }}>⏸ Stream is offline</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 14 }}>
                Waiting for {username} to go live...
              </div>
              <div style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: "10px 16px", fontSize: 11, color: "rgba(255,255,255,0.45)",
                lineHeight: 1.8,
              }}>
                OBS → Settings → Stream → Server:<br/>
                <span style={{ color: "#4caf50" }}>rtmp://localhost:1935/live</span><br/>
                Stream Key: <span style={{ color: "#4caf50" }}>{username}</span>
              </div>
            </div>
          )}

          {status === "error" && (
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textAlign: "center" }}>
              ❌ Stream unavailable<br/>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Make sure MediaMTX is running on port 8888</span>
            </div>
          )}
        </div>
      )}

      {/* LIVE badge */}
      {status === "live" && (
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: "#e53935", color: "#fff",
          fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4,
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "pulseDot 1.4s infinite" }} />
          LIVE
        </div>
      )}

      {/* Viewer count */}
      <div style={{
        position: "absolute", top: 12, right: 12,
        background: "rgba(0,0,0,0.65)", color: "#fff",
        fontSize: 12, padding: "4px 10px", borderRadius: 4,
        display: "flex", alignItems: "center", gap: 5,
        opacity: showControls ? 1 : 0, transition: "opacity .3s",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e53935", display: "inline-block" }} />
        {viewers?.toLocaleString()} watching
      </div>

      {/* Controls */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
        padding: "28px 16px 12px",
        display: "flex", alignItems: "center", gap: 10,
        opacity: showControls ? 1 : 0, transition: "opacity .3s",
        pointerEvents: showControls ? "auto" : "none",
      }}>
        <button onClick={() => setMuted(m => !m)} style={ctrlBtn}>
          {muted ? "🔇" : "🔊"}
        </button>

        <input
          type="range" min={0} max={1} step={0.05}
          value={muted ? 0 : volume}
          onChange={e => { setVolume(Number(e.target.value)); setMuted(Number(e.target.value) === 0); }}
          style={{ width: 70, accentColor: "#e53935", cursor: "pointer" }}
        />

        {status === "live" && (
          <div style={{
            background: "#e53935", color: "#fff",
            fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
          }}>● LIVE</div>
        )}

        <div style={{ flex: 1 }} />

        <select
          value={quality} onChange={e => setQuality(e.target.value)}
          style={{
            background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", fontSize: 11, padding: "4px 8px", borderRadius: 5,
            cursor: "pointer", outline: "none",
          }}
        >
          <option value="auto">Auto</option>
          <option value="1080p">1080p</option>
          <option value="720p">720p HD</option>
          <option value="480p">480p</option>
          <option value="360p">360p</option>
        </select>

        <button onClick={toggleFullscreen} style={ctrlBtn}>
          {fullscreen ? "⊡" : "⛶"}
        </button>
      </div>
    </div>
  );
}