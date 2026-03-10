import { Outlet } from "react-router";
import { ProfBottomNav } from "../components/ProfBottomNav";
import { useWebMode } from "../contexts/WebModeContext";

export function ProfLayout() {
  const isWeb = useWebMode();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      {!isWeb && <ProfBottomNav />}
    </div>
  );
}