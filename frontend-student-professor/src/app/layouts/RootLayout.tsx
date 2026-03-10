import { Outlet, useLocation } from "react-router";
import { useDeviceLayout } from "../contexts/DeviceContext";
import { WebSidebar } from "../components/web/WebSidebar";
import { WebTopBar } from "../components/web/WebTopBar";
import { WebModeContext } from "../contexts/WebModeContext";
import { useState } from "react";

// Routes that should NOT show the web shell (full-screen pages)
const FULLSCREEN_ROUTES = ["/", "/login"];

export function RootLayout() {
  const device = useDeviceLayout();
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname);
  const isWeb = device === "ipad" || device === "desktop";

  const [collapsed, setCollapsed] = useState(device === "ipad");

  // Mobile / phone-frame → just render children, no web chrome
  if (!isWeb || isFullscreen) {
    return (
      <WebModeContext.Provider value={false}>
        <Outlet />
      </WebModeContext.Provider>
    );
  }

  // iPad / Desktop → full web layout with sidebar
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
        {/* Sidebar */}
        <WebSidebar collapsed={collapsed} />

        {/* Main area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Top bar */}
          <WebTopBar
            onMenuToggle={() => setCollapsed((c) => !c)}
            collapsed={collapsed}
          />

          {/* Content */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ background: "#F0F2FA" }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </WebModeContext.Provider>
  );
}