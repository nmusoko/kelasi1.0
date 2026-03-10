import { useLocation, useNavigate } from "react-router";
import { Bell, Search, Menu, ChevronRight } from "lucide-react";
import { currentUser } from "../../data/mockData";
import { currentProfessor } from "../../data/profMockData";

interface WebTopBarProps {
  onMenuToggle: () => void;
  collapsed: boolean;
}

// Map paths to page titles + breadcrumbs
function getPageInfo(pathname: string): { title: string; crumbs: string[] } {
  const map: Record<string, { title: string; crumbs: string[] }> = {
    "/app/dashboard":   { title: "Tableau de bord", crumbs: ["Accueil"] },
    "/app/courses":     { title: "Mes cours",        crumbs: ["Accueil", "Cours"] },
    "/app/calendar":    { title: "Calendrier",        crumbs: ["Accueil", "Calendrier"] },
    "/app/messages":    { title: "Messages",           crumbs: ["Accueil", "Messages"] },
    "/app/profile":     { title: "Mon profil",         crumbs: ["Accueil", "Profil"] },
    "/prof/dashboard":  { title: "Tableau de bord",   crumbs: ["Espace Professeur"] },
    "/prof/courses":    { title: "Mes cours",          crumbs: ["Espace Professeur", "Cours"] },
    "/prof/materials":  { title: "Matériels",          crumbs: ["Espace Professeur", "Matériels"] },
    "/prof/announcements": { title: "Annonces",        crumbs: ["Espace Professeur", "Annonces"] },
    "/prof/assignments": { title: "Devoirs",           crumbs: ["Espace Professeur", "Devoirs"] },
    "/prof/students":   { title: "Étudiants",          crumbs: ["Espace Professeur", "Étudiants"] },
    "/prof/messages":   { title: "Messages",            crumbs: ["Espace Professeur", "Messages"] },
  };

  // exact match
  if (map[pathname]) return map[pathname];

  // Course hub
  if (pathname.match(/\/prof\/courses\/.+/)) return { title: "Hub du cours", crumbs: ["Espace Professeur", "Cours", "Hub"] };
  if (pathname.match(/\/app\/courses\/.+/)) return { title: "Détail du cours", crumbs: ["Accueil", "Cours", "Détail"] };

  return { title: "Kelasi", crumbs: [] };
}

export function WebTopBar({ onMenuToggle, collapsed }: WebTopBarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isProf = location.pathname.startsWith("/prof");
  const { title, crumbs } = getPageInfo(location.pathname);
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div
      className="flex items-center gap-4"
      style={{
        height: 64,
        background: "white",
        borderBottom: "1px solid #F0F2FA",
        padding: "0 24px",
        flexShrink: 0,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Menu toggle */}
      <button
        onClick={onMenuToggle}
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "#F3F4F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <Menu size={18} style={{ color: "#6B7280" }} />
      </button>

      {/* Breadcrumbs + title */}
      <div className="flex-1 min-w-0">
        {crumbs.length > 0 && (
          <div className="flex items-center gap-1" style={{ marginBottom: 1 }}>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>{c}</span>
                {i < crumbs.length - 1 && <ChevronRight size={10} style={{ color: "#D1D5DB" }} />}
              </span>
            ))}
          </div>
        )}
        <h1
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1A1D2E",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h1>
      </div>

      {/* Date — desktop only */}
      <div
        style={{
          padding: "5px 12px",
          borderRadius: 10,
          background: "#F8F9FF",
          border: "1px solid #E0E7FF",
        }}
      >
        <span style={{ fontSize: 12, color: "#6B7280", whiteSpace: "nowrap" }}>
          📅 {dateStr}
        </span>
      </div>

      {/* Search button */}
      <button
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "#F3F4F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <Search size={17} style={{ color: "#6B7280" }} />
      </button>

      {/* Notification bell */}
      <button
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "#F3F4F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <Bell size={17} style={{ color: "#6B7280" }} />
        <div
          style={{
            position: "absolute",
            top: 7,
            right: 7,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#EF476F",
            border: "1.5px solid white",
          }}
        />
      </button>

      {/* User avatar */}
      <button
        onClick={() => navigate(isProf ? "/prof/dashboard" : "/app/profile")}
        className="flex items-center gap-2.5"
        style={{
          padding: "6px 10px 6px 6px",
          borderRadius: 12,
          background: "#F8F9FF",
          border: "1px solid #E0E7FF",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 9,
            background: isProf
              ? "linear-gradient(135deg, #7B2FBE, #4361EE)"
              : "linear-gradient(135deg, #4361EE, #3A0CA3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, color: "white" }}>
            {isProf ? "MD" : "BD"}
          </span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1D2E" }}>
          {isProf ? currentProfessor.firstName : currentUser.firstName}
        </span>
      </button>
    </div>
  );
}
