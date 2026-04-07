"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import { CategoryProvider } from "./CategoryContext";

export default function LayoutShell({ children, sidebar }) {
  const pathname = usePathname();
  const isTopModels = pathname?.startsWith("/top-models");
  const isHome = pathname === "/";

  const [liveCount, setLiveCount] = useState(11284);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto-open sidebar only on homepage (desktop), closed everywhere else
      if (!mobile) {
        setSidebarOpen(isHome && !isTopModels);
      } else {
        setSidebarOpen(false);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [isHome, isTopModels]);

  useEffect(() => {
    if (isTopModels) setSidebarOpen(false);
  }, [isTopModels]);

  useEffect(() => {
    fetch("http://localhost:4000/api/streams/meta/count")
      .then(r => r.json())
      .then(d => setLiveCount(d.liveCount))
      .catch(() => {});
  }, []);

  const showSidebar = sidebarOpen && !isTopModels;

  return (
    <CategoryProvider>
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: "#111",
        fontFamily: "Inter, system-ui, sans-serif",
      }}>

        <Topbar
          liveCount={liveCount}
          onMenuToggle={() => !isTopModels && setSidebarOpen(o => !o)}
        />

        <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>

          {isMobile && showSidebar && (
            <div
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0.6)", zIndex: 150,
              }}
            />
          )}

          {showSidebar && (
            <div style={{
              width: 220,
              flexShrink: 0,
              overflowY: "auto",
              overflowX: "hidden",
              borderRight: "1px solid #2a2a2a",
              height: "100%",
              background: "#1a1a1a",
              position: isMobile ? "absolute" : "relative",
              top: 0, left: 0, bottom: 0,
              zIndex: isMobile ? 200 : "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#333 transparent",
            }}>
              {sidebar}
            </div>
          )}

          <div style={{
            flex: 1,
            minWidth: 0,
            overflowY: "auto",
            overflowX: "hidden",
            height: "100%",
            background: "#111",
          }}>
            {children}
          </div>

        </div>
      </div>
    </CategoryProvider>
  );
}