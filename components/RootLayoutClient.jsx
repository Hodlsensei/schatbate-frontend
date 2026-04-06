"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import SidebarWrapper from "./SidebarWrapper";

const FULLSCREEN_ROUTES = ["/watch"];

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ready, setReady]               = useState(false);
  const [isMobile, setIsMobile]         = useState(false);
  const [sidebarOpen, setSidebarOpen]   = useState(false);

  const isFullscreen = FULLSCREEN_ROUTES.some(r => pathname?.startsWith(r));

  // Pages where sidebar is inline (not overlay) on desktop
  const NO_SIDEBAR_ROUTES = ["/top-models", "/categories", "/about", "/shop", "/dashboard/vip", "/checkout"];
  const isNoSidebar = NO_SIDEBAR_ROUTES.some(r => pathname?.startsWith(r));

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const confirmed = localStorage.getItem("ageConfirmed") === "true";
    setAgeConfirmed(confirmed);
    setReady(true);
    const interval = setInterval(() => {
      setAgeConfirmed(localStorage.getItem("ageConfirmed") === "true");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (!ready || !ageConfirmed) return <>{children}</>;

  const toggle = () => setSidebarOpen(o => !o);

  // ── Sidebar overlay — rendered on EVERY page ──
  const SidebarOverlay = () => (
    <>
      {/* Dark backdrop */}
      {sidebarOpen && (
        <div
          onClick={toggle}
          style={{
            position: "fixed", inset: 0, zIndex: 9998,
            background: "rgba(0,0,0,0.55)",
            cursor: "pointer",
          }}
        />
      )}

      {/* Sidebar drawer */}
      <div style={{
        position:   "fixed",
        top:        0,
        left:       0,
        zIndex:     9999,
        width:      260,
        height:     "100vh",
        background: "#fff",
        overflowY:  "auto",
        overflowX:  "hidden",
        boxShadow:  sidebarOpen ? "4px 0 24px rgba(0,0,0,0.22)" : "none",
        transform:  sidebarOpen ? "translateX(0)" : "translateX(-260px)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}>
        {/* Close button inside sidebar */}
        <button
          onClick={toggle}
          style={{
            position:   "absolute",
            top:        10,
            right:      10,
            zIndex:     1,
            background: "none",
            border:     "none",
            cursor:     "pointer",
            fontSize:   20,
            color:      "#888",
            lineHeight: 1,
            padding:    4,
          }}
          aria-label="Close sidebar"
        >✕</button>

        <SidebarWrapper />
      </div>
    </>
  );

  // ── Watch page (fullscreen) ──
  if (isFullscreen) {
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden" }}>
        <Topbar onMenuToggle={toggle} sidebarOpen={sidebarOpen} />
        <div style={{ flex:1, minHeight:0, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          {children}
        </div>
        <SidebarOverlay />
      </div>
    );
  }

  // ── No-sidebar pages (shop, vip, checkout, etc.) ──
  if (isNoSidebar) {
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden" }}>
        <Topbar onMenuToggle={toggle} sidebarOpen={sidebarOpen} />
        <div style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}>
          {children}
        </div>
        <SidebarOverlay />
      </div>
    );
  }

  // ── Normal pages — sidebar inline on desktop, overlay on mobile ──
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden" }}>
      <Topbar onMenuToggle={toggle} sidebarOpen={sidebarOpen} />

      <div style={{ display:"flex", flex:1, overflow:"hidden", minHeight:0 }}>

        {isMobile ? (
          // Mobile: full overlay drawer
          <SidebarOverlay />
        ) : (
          // Desktop: inline collapsible sidebar
          <div style={{
            width:      sidebarOpen ? 220 : 0,
            minWidth:   sidebarOpen ? 220 : 0,
            flexShrink: 0,
            overflowY:  "auto",
            overflowX:  "hidden",
            borderRight: sidebarOpen ? "1px solid #e5e7eb" : "none",
            background: "#fff",
            height:     "100%",
            transition: "width 0.25s ease, min-width 0.25s ease",
          }}>
            <div style={{ width: 220, height: "100%" }}>
              <SidebarWrapper />
            </div>
          </div>
        )}

        {/* Page content */}
        <div style={{ flex:1, minWidth:0, overflowY:"auto", overflowX:"hidden", height:"100%" }}>
          {children}
        </div>
      </div>
    </div>
  );
}