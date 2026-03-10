import { useNavigate, useLocation } from "react-router";
import {
  Home, BookOpen, Calendar, MessageCircle, User,
  LayoutDashboard, FileText, Megaphone, ClipboardList,
  Users, LogOut, ChevronRight, GraduationCap,
} from "lucide-react";
import kelasiLogo from "../../../assets/kelasi-logo.png";
import { currentUser } from "../../data/mockData";
import { currentProfessor } from "../../data/profMockData";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

const studentNav: NavItem[] = [
  { icon: Home,          label: "Tableau de bord", path: "/app/dashboard" },
  { icon: BookOpen,      label: "Mes cours",        path: "/app/courses" },
  { icon: Calendar,      label: "Calendrier",       path: "/app/calendar" },
  { icon: MessageCircle, label: "Messages",          path: "/app/messages" },
  { icon: User,          label: "Mon profil",        path: "/app/profile" },
];

const profNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Tableau de bord", path: "/prof/dashboard" },
  { icon: BookOpen,        label: "Mes cours",        path: "/prof/courses" },
  { icon: FileText,        label: "Matériels",        path: "/prof/materials" },
  { icon: Megaphone,       label: "Annonces",         path: "/prof/announcements" },
  { icon: ClipboardList,   label: "Devoirs",          path: "/prof/assignments", badge: 3 },
  { icon: Users,           label: "Étudiants",        path: "/prof/students" },
  { icon: MessageCircle,   label: "Messages",          path: "/prof/messages" },
];

interface WebSidebarProps {
  collapsed: boolean;
}

export function WebSidebar({ collapsed }: WebSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isProf = location.pathname.startsWith("/prof");
  const navItems = isProf ? profNav : studentNav;
  const user = isProf ? currentProfessor : currentUser;
  const roleLabel = isProf ? "Professeur" : "Étudiant";
  const roleColor = isProf ? "#7B2FBE" : "#4361EE";
  const roleBg = isProf ? "#F3E8FF" : "#EEF1FD";

  const isActive = (path: string) => {
    if (path === "/app/dashboard") return location.pathname === "/app/dashboard" || location.pathname === "/app";
    if (path === "/prof/dashboard") return location.pathname === "/prof/dashboard" || location.pathname === "/prof";
    return location.pathname.startsWith(path);
  };

  const sidebarW = collapsed ? 72 : 240;

  return (
    <div
      className="flex flex-col h-full"
      style={{
        width: sidebarW,
        minWidth: sidebarW,
        background: "linear-gradient(180deg, #1a0533 0%, #0f0c29 100%)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        transition: "width 0.3s ease",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* ── Logo area ── */}
      <div
        className="flex items-center gap-3"
        style={{
          height: 64,
          padding: collapsed ? "0 16px" : "0 20px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 11,
            background: "rgba(255,255,255,0.95)",
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <img src={kelasiLogo} alt="Kelasi" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        {!collapsed && (
          <div>
            <p style={{ fontSize: 17, fontWeight: 800, color: "white", lineHeight: 1.1 }}>Kelasi</p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1.5 }}>UNIVERSITY APP</p>
          </div>
        )}
      </div>

      {/* ── Role badge ── */}
      {!collapsed && (
        <div style={{ padding: "12px 16px 4px" }}>
          <div
            className="flex items-center gap-2"
            style={{
              padding: "6px 12px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <GraduationCap size={13} style={{ color: roleColor }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: roleColor, letterSpacing: 0.5 }}>
              {roleLabel}
            </span>
          </div>
        </div>
      )}

      {/* ── Nav items ── */}
      <nav className="flex flex-col gap-1" style={{ padding: "12px 10px", flex: 1, overflowY: "auto" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : undefined}
              className="flex items-center gap-3 relative"
              style={{
                height: 44,
                borderRadius: 12,
                padding: collapsed ? "0 14px" : "0 14px",
                background: active
                  ? "linear-gradient(135deg, rgba(67,97,238,0.25), rgba(58,12,163,0.15))"
                  : "transparent",
                border: active ? "1px solid rgba(67,97,238,0.3)" : "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.18s",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Active indicator */}
              {active && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: 20,
                    borderRadius: "0 3px 3px 0",
                    background: "#4361EE",
                  }}
                />
              )}
              <Icon
                size={18}
                style={{ color: active ? "#818CF8" : "rgba(255,255,255,0.45)", flexShrink: 0 }}
                strokeWidth={active ? 2.2 : 1.7}
              />
              {!collapsed && (
                <>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: active ? 700 : 400,
                      color: active ? "white" : "rgba(255,255,255,0.55)",
                      flex: 1,
                      textAlign: "left",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "white",
                        background: "#EF476F",
                        borderRadius: 6,
                        padding: "1px 6px",
                        minWidth: 18,
                        textAlign: "center",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {active && (
                    <ChevronRight size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
                  )}
                </>
              )}
              {/* Badge on collapsed */}
              {collapsed && item.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#EF476F",
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 10px" }} />

      {/* ── User footer ── */}
      <div
        className="flex items-center gap-3"
        style={{
          padding: collapsed ? "14px 0" : "14px 16px",
          justifyContent: collapsed ? "center" : "flex-start",
          flexShrink: 0,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 11,
            background: isProf
              ? "linear-gradient(135deg, #7B2FBE, #4361EE)"
              : "linear-gradient(135deg, #4361EE, #3A0CA3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>
            {isProf
              ? currentProfessor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
              : "BD"}
          </span>
        </div>

        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "white",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {isProf ? currentProfessor.name : user.name}
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {isProf ? currentProfessor.email : currentUser.email}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              title="Se déconnecter"
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "rgba(239,71,111,0.15)",
                border: "1px solid rgba(239,71,111,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <LogOut size={14} style={{ color: "#EF476F" }} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
