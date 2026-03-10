import { Outlet, useLocation } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { useWebMode } from "../contexts/WebModeContext";

// Routes that should show bottom navigation
const MAIN_ROUTES = [
  "/app/dashboard",
  "/app/courses",
  "/app/calendar",
  "/app/messages",
  "/app/profile",
];

function isMainRoute(pathname: string) {
  return MAIN_ROUTES.some((r) => pathname === r) || pathname === "/app" || pathname === "/app/";
}

export function AppLayout() {
  const location = useLocation();
  const showBottomNav = isMainRoute(location.pathname);
  const isWeb = useWebMode();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      {showBottomNav && !isWeb && <BottomNav />}
    </div>
  );
}