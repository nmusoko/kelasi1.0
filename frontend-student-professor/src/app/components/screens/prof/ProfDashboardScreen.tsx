import { useNavigate } from "react-router";
import { Bell, BookOpen, Users, ClipboardList, TrendingUp, ChevronRight, Clock, Megaphone } from "lucide-react";
import { StatusBar } from "../../StatusBar";
import { currentProfessor, profCourses, profAssignments, profAnnouncements } from "../../../data/profMockData";

export function ProfDashboardScreen() {
  const navigate = useNavigate();
  const today = new Date();
  const greeting = today.getHours() < 12 ? "Bonjour" : today.getHours() < 18 ? "Bon après-midi" : "Bonsoir";

  const totalStudents = profCourses.reduce((a, c) => a + c.studentsCount, 0);
  const pendingGrading = profCourses.reduce((a, c) => a + c.pendingGrading, 0);
  const totalAssignments = profAssignments.length;

  const getDaysLeft = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return "Demain";
    if (diff < 0) return "Clôturé";
    return `J-${diff}`;
  };

  const getDaysColor = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff <= 1) return "#EF476F";
    if (diff <= 3) return "#FFB703";
    return "#4361EE";
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #1a0533 0%, #3A0CA3 50%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="flex items-start justify-between px-5 pb-4 pt-1">
          <div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 1 }}>
              {greeting},
            </p>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "white", lineHeight: 1.2 }}>
              {currentProfessor.firstName} 👩‍🏫
            </h1>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>
              {currentProfessor.title} · {currentProfessor.department}
            </p>
          </div>
          <button
            className="flex items-center justify-center relative"
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              marginTop: 4,
            }}
          >
            <Bell size={20} style={{ color: "white" }} />
            <span
              className="absolute"
              style={{
                top: 8,
                right: 8,
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#EF476F",
                border: "2px solid #3A0CA3",
              }}
            />
          </button>
        </div>

        {/* Quick stats inside header */}
        <div className="flex gap-3 px-5 pb-5">
          {[
            { label: "Cours", value: profCourses.length, icon: BookOpen, color: "#4CC9F0" },
            { label: "Étudiants", value: totalStudents, icon: Users, color: "#06D6A0" },
            { label: "À corriger", value: pendingGrading, icon: ClipboardList, color: "#FFB703" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex-1 flex flex-col items-center gap-1 py-3"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Icon size={16} style={{ color: s.color }} />
                <span style={{ fontSize: 20, fontWeight: 800, color: "white", lineHeight: 1 }}>{s.value}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 20 }}>

        {/* My Courses */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3 px-5">
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1A1D2E" }}>Mes cours</h2>
            <button onClick={() => navigate("/prof/courses")} style={{ fontSize: 13, color: "#4361EE", fontWeight: 500 }}>
              Voir tout
            </button>
          </div>
          <div className="flex flex-col gap-3 px-5">
            {profCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/prof/courses/${course.id}`)}
                className="flex items-center gap-4 cursor-pointer"
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding: "14px 16px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: course.gradient,
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 800, color: "white", letterSpacing: 0.5 }}>
                    {course.code.slice(0, 3)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {course.name}
                  </p>
                  <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                    {course.studentsCount} étudiants · {course.schedule}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  {course.pendingGrading > 0 && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#EF476F",
                        background: "#FEE2E8",
                        padding: "2px 7px",
                        borderRadius: 8,
                      }}
                    >
                      {course.pendingGrading} à corriger
                    </span>
                  )}
                  <ChevronRight size={14} style={{ color: "#D1D5DB" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments to grade */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1A1D2E" }}>Devoirs en cours</h2>
            <button onClick={() => navigate("/prof/assignments")} style={{ fontSize: 13, color: "#4361EE", fontWeight: 500 }}>
              Gérer
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {profAssignments.slice(0, 3).map((a) => {
              const submissionRate = Math.round((a.submitted / a.totalStudents) * 100);
              return (
                <div
                  key={a.id}
                  onClick={() => navigate("/prof/assignments")}
                  className="cursor-pointer"
                  style={{
                    background: "white",
                    borderRadius: 18,
                    padding: "14px 16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E", lineHeight: 1.3 }}>
                        {a.title}
                      </p>
                      <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                        {a.courseCode} ·{" "}
                        <span style={{ color: getDaysColor(a.dueDate), fontWeight: 600 }}>
                          {getDaysLeft(a.dueDate)}
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        flexShrink: 0,
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: `${a.color}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Clock size={16} style={{ color: a.color }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ fontSize: 10, color: "#9CA3AF" }}>
                          {a.submitted}/{a.totalStudents} rendus
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: a.color }}>{submissionRate}%</span>
                      </div>
                      <div style={{ height: 4, background: "#F0F2FA", borderRadius: 2 }}>
                        <div style={{ width: `${submissionRate}%`, height: "100%", background: a.color, borderRadius: 2 }} />
                      </div>
                    </div>
                    {a.submitted - a.graded > 0 && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#FFB703",
                          background: "#FFF8E6",
                          padding: "2px 8px",
                          borderRadius: 8,
                          flexShrink: 0,
                        }}
                      >
                        {a.submitted - a.graded} à noter
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent announcements */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1A1D2E" }}>Annonces récentes</h2>
            <button onClick={() => navigate("/prof/announcements")} style={{ fontSize: 13, color: "#4361EE", fontWeight: 500 }}>
              Publier
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {profAnnouncements.slice(0, 2).map((ann) => (
              <div
                key={ann.id}
                onClick={() => navigate("/prof/announcements")}
                className="flex items-start gap-3 cursor-pointer"
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: "14px 16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: ann.important ? "#FEE2E8" : "#EEF1FD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Megaphone size={16} style={{ color: ann.important ? "#EF476F" : "#4361EE" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {ann.title}
                    </p>
                    {ann.important && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: "#EF476F", background: "#FEE2E8", padding: "1px 6px", borderRadius: 6, flexShrink: 0 }}>
                        URGENT
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                    {ann.courseCode} · {ann.date} · {ann.recipients} destinataires
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance overview */}
        <div className="px-5 mt-5">
          <div
            className="flex items-center gap-4 p-4"
            style={{
              background: "linear-gradient(135deg, #3A0CA3, #4361EE)",
              borderRadius: 20,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <TrendingUp size={22} style={{ color: "white" }} />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Taux de réussite global</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
                {totalStudents} étudiants · {totalAssignments} devoirs actifs
              </p>
              <div style={{ height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, marginTop: 8 }}>
                <div style={{ width: "72%", height: "100%", background: "#06D6A0", borderRadius: 2 }} />
              </div>
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "white" }}>72%</span>
          </div>
        </div>
      </div>
    </div>
  );
}