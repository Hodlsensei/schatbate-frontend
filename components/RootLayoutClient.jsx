"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import SidebarWrapper from "./SidebarWrapper";

const FULLSCREEN_ROUTES  = ["/watch"];
const NO_SIDEBAR_ROUTES  = ["/top-models","/categories","/about","/shop","/dashboard/vip","/checkout"];

/* Pages that get a permanent inline sidebar (like home) */
const INLINE_SIDEBAR_ROUTES = ["/", "/gallery", "/recommended", "/favorites", "/privates", "/history"];

const SIDEBAR_FULL = 220;
const SIDEBAR_ICON = 58;

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();

  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [ready, setReady]               = useState(false);
  const [isMobile, setIsMobile]         = useState(false);
  const [collapsed, setCollapsed]       = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const isFullscreen   = FULLSCREEN_ROUTES.some(r => pathname?.startsWith(r));
  const isNoSidebar    = NO_SIDEBAR_ROUTES.some(r => pathname?.startsWith(r));
  const isInlineSidebar = INLINE_SIDEBAR_ROUTES.some(r =>
    r === "/" ? pathname === "/" : pathname?.startsWith(r)
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSidebarVisible(false);
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

  const handleMenuToggle = () => {
    if (isMobile) {
      setMobileOpen(o => !o);
    } else if (isInlineSidebar) {
      setCollapsed(c => !c);
    } else {
      setSidebarVisible(v => !v);
    }
  };

  /* ── Overlay sidebar (non-inline pages + mobile) ── */
  const OverlaySidebar = ({ open, onClose }) => (
    <>
      {open && (
        <div onClick={onClose} style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "rgba(0,0,0,0.55)", cursor: "pointer",
        }} />
      )}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999,
        width: 260, height: "100vh",
        background: "#EEEEF0",
        overflowY: "auto", overflowX: "hidden",
        boxShadow: open ? "4px 0 24px rgba(0,0,0,0.22)" : "none",
        transform: open ? "translateX(0)" : "translateX(-260px)",
        transition: "transform 0.28s cubic-bezier(.4,0,.2,1), box-shadow 0.28s ease",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 10, right: 10, zIndex: 1,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 20, color: "#888", lineHeight: 1, padding: 4,
        }} aria-label="Close sidebar">✕</button>
        <SidebarWrapper collapsed={false} />
      </div>
    </>
  );

  /* ── Watch page (fullscreen) ── */
  if (isFullscreen) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Topbar onMenuToggle={handleMenuToggle} sidebarCollapsed={collapsed} />
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
      <OverlaySidebar
        open={isMobile ? mobileOpen : sidebarVisible}
        onClose={() => { setMobileOpen(false); setSidebarVisible(false); }}
      />
    </div>
  );

  /* ── No-sidebar pages ── */
  if (isNoSidebar) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Topbar onMenuToggle={handleMenuToggle} sidebarCollapsed={collapsed} />
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>{children}</div>
      <OverlaySidebar
        open={isMobile ? mobileOpen : sidebarVisible}
        onClose={() => { setMobileOpen(false); setSidebarVisible(false); }}
      />
    </div>
  );

  /* ── Normal pages ── */
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Topbar onMenuToggle={handleMenuToggle} sidebarCollapsed={collapsed} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>

        {isMobile ? (
          /* Mobile: always overlay */
          <OverlaySidebar
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
        ) : isInlineSidebar ? (
          /* Inline sidebar pages: home, gallery, recommended, favorites, etc. */
          <div style={{
            width: collapsed ? SIDEBAR_ICON : SIDEBAR_FULL,
            minWidth: collapsed ? SIDEBAR_ICON : SIDEBAR_FULL,
            flexShrink: 0,
            overflowY: "auto", overflowX: "hidden",
            borderRight: "1px solid #d8dadb",
            background: "#EEEEF0",
            height: "100%",
            transition: "width 0.28s cubic-bezier(.4,0,.2,1), min-width 0.28s cubic-bezier(.4,0,.2,1)",
          }}>
            <div style={{ width: collapsed ? SIDEBAR_ICON : SIDEBAR_FULL, height: "100%" }}>
              <SidebarWrapper collapsed={collapsed} />
            </div>
          </div>
        ) : (
          /* All other pages: overlay sidebar */
          <OverlaySidebar
            open={sidebarVisible}
            onClose={() => setSidebarVisible(false)}
          />
        )}

        <div style={{ flex: 1, minWidth: 0, overflowY: "auto", overflowX: "hidden", height: "100%", background: "#F5F5F5" }}>
          {children}
        </div>
      </div>
    </div>
  );
}