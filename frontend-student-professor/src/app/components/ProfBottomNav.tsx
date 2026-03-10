import { useNavigate, useLocation } from "react-router";
import { Home, BookOpen, ClipboardList, Users, MessageCircle } from "lucide-react";

const navItems = [
  { icon: Home, label: "Accueil", path: "/prof/dashboard" },
  { icon: BookOpen, label: "Cours", path: "/prof/courses" },
  { icon: ClipboardList, label: "Devoirs", path: "/prof/assignments" },
  { icon: Users, label: "Étudiants", path: "/prof/students" },
  { icon: MessageCircle, label: "Messages", path: "/prof/messages" },
];

export function ProfBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className="flex items-center justify-around px-2 bg-white border-t"
      style={{
        height: 72,
        borderTopColor: "#E8EAF0",
        paddingBottom: 8,
      }}
    >
      {navItems.map((item) => {
        const active = isActive(item.path);
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 transition-all"
            style={{ paddingTop: 8 }}
          >
            <div
              className="flex items-center justify-center rounded-2xl transition-all"
              style={{
                width: 44,
                height: 28,
                background: active ? "rgba(58,12,163,0.1)" : "transparent",
              }}
            >
              <Icon
                size={20}
                style={{ color: active ? "#3A0CA3" : "#9CA3AF" }}
                strokeWidth={active ? 2.5 : 1.8}
              />
            </div>
            <span
              className="text-center"
              style={{
                fontSize: 10,
                color: active ? "#3A0CA3" : "#9CA3AF",
                fontWeight: active ? 600 : 400,
                lineHeight: 1.2,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
