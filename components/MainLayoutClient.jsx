"use client";
import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import SidebarWrapper from "./SidebarWrapper";

export default function MainLayoutClient({ children }) {
  const pathname = usePathname();
  const hideSidebar = ["/shop", "/dashboard/vip"].includes(pathname);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "hidden",
    }}>
      <Topbar />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {!hideSidebar && (
          <div style={{
            width: 220,
            flexShrink: 0,
            overflowY: "auto",
            overflowX: "hidden",
            borderRight: "1px solid #e5e7eb",
            height: "100%",
          }}>
            <SidebarWrapper />
          </div>
        )}
        <div style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}