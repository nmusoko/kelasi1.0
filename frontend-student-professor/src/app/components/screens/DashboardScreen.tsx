import { useNavigate } from "react-router";
import { Bell, ChevronRight, Clock, BookOpen, TrendingUp, Award } from "lucide-react";
import { StatusBar } from "../StatusBar";
import { courses, assignments, calendarEvents, currentUser } from "../../data/mockData";

function ProgressRing({ value, size = 80, strokeWidth = 8, color = "#4361EE" }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E8EAF0" strokeWidth={strokeWidth} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke={color} strokeWidth={strokeWidth} fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
}

export function DashboardScreen() {
  const navigate = useNavigate();
  const today = new Date();
  const greeting = today.getHours() < 12 ? "Bonjour" : today.getHours() < 18 ? "Bon après-midi" : "Bonsoir";

  const upcomingDeadlines = calendarEvents
    .filter((e) => e.type === "assignment")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  const allAssignments = Object.values(assignments).flat();
  const pending = allAssignments.filter((a) => a.status === "not_submitted").length;
  const submitted = allAssignments.filter((a) => a.status === "submitted").length;
  const graded = allAssignments.filter((a) => a.status === "graded").length;

  const getDaysLeft = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return "Demain";
    if (diff < 0) return "Dépassé";
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
      <div style={{ background: "linear-gradient(160deg, #3A0CA3 0%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="flex items-start justify-between px-5 pb-3 pt-1">
          <div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 1 }}>
              {greeting},
            </p>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "white", lineHeight: 1.2 }}>
              {currentUser.firstName} 👋
            </h1>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>
              {currentUser.year}
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
              className="absolute flex items-center justify-center"
              style={{
                top: 8,
                right: 8,
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#EF476F",
                border: "2px solid #4361EE",
              }}
            />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 20 }}>
        {/* Stats cards */}
        <div className="px-5 flex gap-3" style={{ marginTop: 18 }}>
          {[
            { label: "Cours actifs", value: courses.length, icon: BookOpen, color: "#4361EE", bg: "#EEF1FD" },
            { label: "En attente", value: pending, icon: Clock, color: "#FFB703", bg: "#FFF8E6" },
            { label: "Corrigés", value: graded, icon: Award, color: "#06D6A0", bg: "#E6FAF5" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4"
                style={{
                  background: "white",
                  borderRadius: 20,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{ width: 38, height: 38, borderRadius: 12, background: stat.bg }}
                >
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#1A1D2E", lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", lineHeight: 1.2 }}>
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Overall progress */}
        <div className="px-5 mt-4">
          <div
            className="flex items-center gap-4 p-4"
            style={{
              background: "white",
              borderRadius: 20,
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <div className="relative flex items-center justify-center">
              <ProgressRing value={65} size={72} strokeWidth={7} color="#4361EE" />
              <div className="absolute flex flex-col items-center">
                <span style={{ fontSize: 16, fontWeight: 800, color: "#1A1D2E", lineHeight: 1 }}>65%</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} style={{ color: "#06D6A0" }} />
                <span style={{ fontSize: 12, color: "#06D6A0", fontWeight: 600 }}>+5% ce mois</span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E" }}>Progression générale</p>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Semestre 5 — {courses.length} cours actifs</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1">
                  <div style={{ height: 4, background: "#F0F2FA", borderRadius: 2 }}>
                    <div style={{ width: "65%", height: "100%", background: "linear-gradient(90deg, #4361EE, #7B2FBE)", borderRadius: 2 }} />
                  </div>
                </div>
                <span style={{ fontSize: 11, color: "#6B7280", fontWeight: 500 }}>Moy: {currentUser.gpa}/20</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming deadlines */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1A1D2E" }}>Échéances à venir</h2>
            <button
              onClick={() => navigate("/app/calendar")}
              style={{ fontSize: 13, color: "#4361EE", fontWeight: 500 }}
            >
              Voir tout
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {upcomingDeadlines.map((event) => {
              const course = courses.find((c) => c.code === event.course);
              const daysLeft = getDaysLeft(event.date);
              const daysColor = getDaysColor(event.date);
              return (
                <div
                  key={event.id}
                  onClick={() => course && navigate(`/app/courses/${course.id}`)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  style={{
                    background: "white",
                    borderRadius: 16,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 13,
                      background: `${event.color}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} style={{ color: event.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1D2E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {event.title}
                    </p>
                    <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>{event.course}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: daysColor,
                        background: `${daysColor}18`,
                        padding: "2px 8px",
                        borderRadius: 8,
                      }}
                    >
                      {daysLeft}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* My courses */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3 px-5">
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1A1D2E" }}>Mes cours</h2>
            <button
              onClick={() => navigate("/app/courses")}
              style={{ fontSize: 13, color: "#4361EE", fontWeight: 500 }}
            >
              Voir tout
            </button>
          </div>
          <div className="flex gap-3 pl-5 overflow-x-auto" style={{ paddingRight: 20, paddingBottom: 4 }}>
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/app/courses/${course.id}`)}
                className="flex-shrink-0 flex flex-col cursor-pointer"
                style={{
                  width: 160,
                  background: "white",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
                }}
              >
                <div
                  style={{
                    height: 80,
                    background: course.gradient,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}
                  />
                  <div
                    className="absolute bottom-2 left-2 flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      borderRadius: 8,
                      padding: "2px 8px",
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: "white", letterSpacing: 1 }}>
                      {course.code}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3">
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#1A1D2E", lineHeight: 1.3 }}>
                    {course.shortName}
                  </p>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontSize: 10, color: "#9CA3AF" }}>Progression</span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: course.color }}>{course.progress}%</span>
                    </div>
                    <div style={{ height: 3, background: "#F0F2FA", borderRadius: 2 }}>
                      <div
                        style={{
                          width: `${course.progress}%`,
                          height: "100%",
                          background: course.color,
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}