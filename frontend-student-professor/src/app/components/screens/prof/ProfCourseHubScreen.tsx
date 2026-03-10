import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  Users,
  ClipboardList,
  Megaphone,
  ChevronRight,
  Clock,
  MapPin,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { StatusBar } from "../../StatusBar";
import { profCourses, profAssignments, profAnnouncements, profStudents } from "../../../data/profMockData";

export function ProfCourseHubScreen() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const course = profCourses.find((c) => c.id === courseId);
  if (!course) {
    return (
      <div className="flex items-center justify-center h-full" style={{ background: "#F0F2FA" }}>
        <p style={{ color: "#9CA3AF" }}>Cours introuvable.</p>
      </div>
    );
  }

  const courseAssignments = profAssignments.filter((a) => a.courseCode === course.code);
  const courseAnnouncements = profAnnouncements.filter((a) => a.courseCode === course.code);
  const courseStudents = profStudents.filter((s) => s.course === course.code);
  const pendingGrading = courseAssignments.reduce((acc, a) => acc + (a.submitted - a.graded), 0);
  const avgGrade =
    courseStudents.length > 0
      ? Math.round((courseStudents.reduce((a, s) => a + s.grade, 0) / courseStudents.length) * 10) / 10
      : 0;

  const sections = [
    {
      key: "materials",
      icon: BookOpen,
      label: "Matériels",
      description: "Notes de cours, PDF, présentations et vidéos",
      badge: `${course.materialsCount} fichiers`,
      badgeColor: "#4361EE",
      badgeBg: "#EEF1FD",
      iconBg: "linear-gradient(135deg, #4361EE, #3A0CA3)",
      path: "/prof/materials",
      accent: "#4361EE",
    },
    {
      key: "students",
      icon: Users,
      label: "Étudiants",
      description: "Liste des inscrits, notes et suivi individuel",
      badge: `${course.studentsCount} inscrits`,
      badgeColor: "#06D6A0",
      badgeBg: "#E6FAF5",
      iconBg: "linear-gradient(135deg, #06D6A0, #0096C7)",
      path: "/prof/students",
      accent: "#06D6A0",
    },
    {
      key: "assignments",
      icon: ClipboardList,
      label: "Devoirs",
      description: "Créer, publier et corriger les évaluations",
      badge: pendingGrading > 0 ? `${pendingGrading} à corriger` : `${courseAssignments.length} devoirs`,
      badgeColor: pendingGrading > 0 ? "#FFB703" : "#7B2FBE",
      badgeBg: pendingGrading > 0 ? "#FFF8E6" : "#F3E8FF",
      iconBg: "linear-gradient(135deg, #FFB703, #FB8500)",
      path: "/prof/assignments",
      accent: "#FFB703",
    },
    {
      key: "announcements",
      icon: Megaphone,
      label: "Annonces",
      description: "Publier des messages pour toute la classe",
      badge: `${courseAnnouncements.length} publiées`,
      badgeColor: "#EF476F",
      badgeBg: "#FEE2E8",
      iconBg: "linear-gradient(135deg, #EF476F, #C9184A)",
      path: "/prof/announcements",
      accent: "#EF476F",
    },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      {/* Header */}
      <div style={{ background: course.gradient, position: "relative", overflow: "hidden" }}>
        {/* Background image */}
        <img
          src={course.thumbnail}
          alt={course.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.15,
          }}
        />
        <div style={{ position: "relative" }}>
          <StatusBar light />
          <div className="flex items-center gap-3 px-5 pt-1">
            <button
              onClick={() => navigate("/prof/courses")}
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ArrowLeft size={18} style={{ color: "white" }} />
            </button>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: 1.5, fontWeight: 700 }}>
                {course.code}
              </p>
            </div>
          </div>

          {/* Course title block */}
          <div className="px-5 pt-3 pb-5">
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "white",
                lineHeight: 1.25,
                marginBottom: 10,
              }}
            >
              {course.name}
            </h1>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { icon: Clock, label: course.schedule },
                { icon: MapPin, label: course.room },
                { icon: Calendar, label: course.semester },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="flex items-center gap-1.5"
                    style={{
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <Icon size={11} style={{ color: "rgba(255,255,255,0.75)" }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                      {m.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick stats strip */}
            <div
              className="flex gap-0"
              style={{
                background: "rgba(255,255,255,0.12)",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.18)",
                overflow: "hidden",
              }}
            >
              {[
                { label: "Étudiants", value: course.studentsCount, icon: Users },
                { label: "Matériels", value: course.materialsCount, icon: BookOpen },
                { label: "Moy. /20", value: avgGrade, icon: TrendingUp },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex-1 flex flex-col items-center py-3 gap-0.5"
                    style={{
                      borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.15)" : "none",
                    }}
                  >
                    <Icon size={13} style={{ color: "rgba(255,255,255,0.6)", marginBottom: 2 }} />
                    <span style={{ fontSize: 18, fontWeight: 800, color: "white", lineHeight: 1 }}>
                      {s.value}
                    </span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5" style={{ paddingBottom: 24 }}>
        {/* Section label */}
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#9CA3AF",
            letterSpacing: 1.5,
            marginBottom: 14,
          }}
        >
          SECTIONS DU COURS
        </p>

        {/* Navigation cards — 2×2 grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.key}
                onClick={() => navigate(section.path)}
                className="flex flex-col text-left"
                style={{
                  background: "white",
                  borderRadius: 22,
                  padding: "18px 16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
                onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {/* Subtle corner accent */}
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    right: -12,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: section.accent,
                    opacity: 0.06,
                  }}
                />

                {/* Icon */}
                <div
                  className="flex items-center justify-center mb-3"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    background: section.iconBg,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} style={{ color: "white" }} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#1A1D2E",
                    marginBottom: 4,
                    lineHeight: 1.2,
                  }}
                >
                  {section.label}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: 11,
                    color: "#9CA3AF",
                    lineHeight: 1.45,
                    marginBottom: 10,
                    flex: 1,
                  }}
                >
                  {section.description}
                </p>

                {/* Badge */}
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: section.badgeColor,
                      background: section.badgeBg,
                      padding: "3px 9px",
                      borderRadius: 8,
                    }}
                  >
                    {section.badge}
                  </span>
                  <ChevronRight size={14} style={{ color: "#D1D5DB" }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Recent activity */}
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#9CA3AF",
            letterSpacing: 1.5,
            marginBottom: 12,
          }}
        >
          ACTIVITÉ RÉCENTE
        </p>

        <div className="flex flex-col gap-3">
          {/* Latest assignment */}
          {courseAssignments[0] && (
            <button
              onClick={() => navigate("/prof/assignments")}
              className="flex items-center gap-3 w-full text-left"
              style={{
                background: "white",
                borderRadius: 18,
                padding: "14px 16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "#FFF8E6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ClipboardList size={18} style={{ color: "#FFB703" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E" }}>
                  {courseAssignments[0].title}
                </p>
                <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>
                  {courseAssignments[0].submitted}/{courseAssignments[0].totalStudents} rendus ·{" "}
                  <span style={{ color: "#FFB703", fontWeight: 600 }}>
                    {courseAssignments[0].submitted - courseAssignments[0].graded} à corriger
                  </span>
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "#D1D5DB", flexShrink: 0 }} />
            </button>
          )}

          {/* Latest announcement */}
          {courseAnnouncements[0] && (
            <button
              onClick={() => navigate("/prof/announcements")}
              className="flex items-center gap-3 w-full text-left"
              style={{
                background: "white",
                borderRadius: 18,
                padding: "14px 16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: courseAnnouncements[0].important ? "#FEE2E8" : "#EEF1FD",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Megaphone
                  size={18}
                  style={{ color: courseAnnouncements[0].important ? "#EF476F" : "#4361EE" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1A1D2E",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {courseAnnouncements[0].title}
                </p>
                <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>
                  {courseAnnouncements[0].date} · {courseAnnouncements[0].recipients} destinataires
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "#D1D5DB", flexShrink: 0 }} />
            </button>
          )}

          {/* Student performance teaser */}
          <button
            onClick={() => navigate("/prof/students")}
            className="flex items-center gap-3 w-full text-left"
            style={{
              background: "white",
              borderRadius: 18,
              padding: "14px 16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "#E6FAF5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <TrendingUp size={18} style={{ color: "#06D6A0" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E" }}>
                Performance de la classe
              </p>
              <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>
                Moyenne : <span style={{ color: "#06D6A0", fontWeight: 700 }}>{avgGrade}/20</span>{" "}
                · {courseStudents.filter((s) => s.status === "excellent").length} excellents ·{" "}
                {courseStudents.filter((s) => s.status === "risk").length} en difficulté
              </p>
            </div>
            <ChevronRight size={16} style={{ color: "#D1D5DB", flexShrink: 0 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
