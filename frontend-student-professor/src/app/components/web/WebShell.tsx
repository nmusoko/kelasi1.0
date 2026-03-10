import React, { useState } from "react";
import { WebSidebar } from "./WebSidebar";
import { WebTopBar } from "./WebTopBar";
import { WebModeContext } from "../../contexts/WebModeContext";

interface WebShellProps {
  children: React.ReactNode;
  deviceType: "ipad" | "desktop";
}

export function WebShell({ children, deviceType }: WebShellProps) {
  // iPad starts collapsed, desktop starts expanded
  const [collapsed, setCollapsed] = useState(deviceType === "ipad");

  return (
    <WebModeContext.Provider value={true}>
      <div
        className="flex"
        style={{
          height: "100dvh",
          width: "100%",
          background: "#F0F2FA",
          overflow: "hidden",
        }}
      >
        {/* ── Sidebar ── */}
        <WebSidebar collapsed={collapsed} />

        {/* ── Main area ── */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Top bar */}
          <WebTopBar
            onMenuToggle={() => setCollapsed((c) => !c)}
            collapsed={collapsed}
          />

          {/* Content area */}
          <div
            className="flex-1 overflow-y-auto"
            style={{
              background: "#F0F2FA",
            }}
          >
            {/* Inner content — max-width for readability on desktop */}
            <div
              style={{
                maxWidth: deviceType === "desktop" ? 960 : "100%",
                margin: "0 auto",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </WebModeContext.Provider>
  );
}
