import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Users, Clock, BookOpen, ChevronRight } from "lucide-react";
import { StatusBar } from "../StatusBar";
import { courses } from "../../data/mockData";
import { useWebMode } from "../../contexts/WebModeContext";

export function CoursesScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const isWeb = useWebMode();

  const filtered = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.professor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #3A0CA3 0%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className={isWeb ? "px-8 pb-6 pt-4" : "px-5 pb-5 pt-1"}>
          <h1 style={{ fontSize: isWeb ? 28 : 24, fontWeight: 700, color: "white" }}>Mes Cours</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
            {courses.length} cours — Semestre 5
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className={isWeb ? "px-8 pt-5 pb-4" : "px-5 pt-4 pb-3"}>
        <div
          className="flex items-center gap-3 px-4"
          style={{
            height: isWeb ? 52 : 48,
            background: "white",
            borderRadius: 14,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            maxWidth: isWeb ? 560 : undefined,
          }}
        >
          <Search size={18} style={{ color: "#9CA3AF" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un cours..."
            className="flex-1 outline-none bg-transparent"
            style={{ fontSize: 14, color: "#1A1D2E" }}
          />
        </div>
      </div>

      {/* Course list / grid */}
      <div
        className="flex-1 overflow-y-auto pb-8"
        style={{
          padding: isWeb ? "0 32px 32px" : "0 20px 96px",
          display: isWeb ? "grid" : "flex",
          gridTemplateColumns: isWeb ? "repeat(auto-fill, minmax(360px, 1fr))" : undefined,
          gap: isWeb ? 24 : undefined,
          flexDirection: isWeb ? undefined : "column",
          alignContent: "start",
        }}
      >
        {!isWeb && <div style={{ height: 0 }} />}
        {filtered.map((course) => {
          const bannerHeight = isWeb ? 160 : 90;
          return (
            <div
              key={course.id}
              onClick={() => navigate(`/app/courses/${course.id}`)}
              className="flex flex-col cursor-pointer"
              style={{
                background: "white",
                borderRadius: 22,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                marginBottom: isWeb ? 0 : 16,
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                if (isWeb) {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(67,97,238,0.16)";
                }
              }}
              onMouseLeave={(e) => {
                if (isWeb) {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                }
              }}
            >
              {/* Course banner */}
              <div
                className="relative overflow-hidden"
                style={{ background: course.gradient, minHeight: bannerHeight }}
              >
                <img
                  src={course.thumbnail}
                  alt=""
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.15,
                  }}
                />

                {/* Top row: badge + chevron */}
                <div className="flex items-start justify-between relative z-10"
                  style={{ padding: isWeb ? "16px 20px 0" : "16px 16px 0" }}>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      height: isWeb ? 30 : 28,
                      paddingInline: isWeb ? 12 : 10,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.22)",
                      border: "1.5px solid rgba(255,255,255,0.35)",
                    }}
                  >
                    <span style={{ fontSize: isWeb ? 12 : 11, fontWeight: 800, color: "white", letterSpacing: 0.8 }}>
                      {course.code}
                    </span>
                  </div>
                  <ChevronRight size={isWeb ? 20 : 18} style={{ color: "rgba(255,255,255,0.7)" }} />
                </div>

                {/* Course name + professor */}
                <div className="relative z-10"
                  style={{ padding: isWeb ? "10px 20px 20px" : "8px 16px 16px" }}>
                  <h3
                    style={{
                      fontSize: isWeb
                        ? (course.name.length > 35 ? 16 : course.name.length > 25 ? 18 : 20)
                        : (course.name.length > 30 ? 14 : course.name.length > 20 ? 16 : 17),
                      fontWeight: 800,
                      color: "white",
                      lineHeight: 1.3,
                      letterSpacing: -0.3,
                      wordBreak: "break-word",
                    }}
                  >
                    {course.name}
                  </h3>
                  <p style={{ fontSize: isWeb ? 13 : 12, color: "rgba(255,255,255,0.78)", marginTop: 5, fontWeight: 500 }}>
                    {course.professor}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ background: "#F0F2FA", height: isWeb ? 10 : 8, width: "100%" }}>
                <div
                  style={{
                    width: `${course.progress}%`,
                    height: "100%",
                    background: course.gradient,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>

              {/* Bottom details */}
              <div className="flex flex-col gap-3"
                style={{ padding: isWeb ? "14px 20px 18px" : "12px 16px 16px" }}>
                {/* Progress label */}
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: isWeb ? 13 : 12, color: "#9CA3AF", fontWeight: 500 }}>Progression du cours</span>
                  <span style={{ fontSize: isWeb ? 15 : 13, fontWeight: 800, color: course.color }}>
                    {course.progress}%
                  </span>
                </div>

                {/* Meta info */}
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: isWeb ? "10px 14px" : "8px 12px",
                    background: "#F8F9FF",
                    borderRadius: 12,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Clock size={isWeb ? 13 : 12} style={{ color: "#9CA3AF" }} />
                      <span style={{ fontSize: isWeb ? 12 : 11, color: "#6B7280" }}>{course.schedule}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={isWeb ? 13 : 12} style={{ color: "#9CA3AF" }} />
                      <span style={{ fontSize: isWeb ? 12 : 11, color: "#6B7280" }}>{course.studentsCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={isWeb ? 13 : 12} style={{ color: "#9CA3AF" }} />
                      <span style={{ fontSize: isWeb ? 12 : 11, color: "#6B7280" }}>{course.credits} cr.</span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: isWeb ? 11 : 10,
                      fontWeight: 700,
                      color: course.color,
                      background: `${course.color}18`,
                      padding: isWeb ? "3px 10px" : "2px 8px",
                      borderRadius: 6,
                    }}
                  >
                    {course.semester}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-16" style={{ gridColumn: "1/-1" }}>
            <BookOpen size={48} style={{ color: "#D1D5DB" }} />
            <p style={{ fontSize: 15, color: "#9CA3AF" }}>Aucun cours trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}