import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, Plus, Users, FileText, ChevronRight, Search } from "lucide-react";
import { StatusBar } from "../../StatusBar";
import { profCourses } from "../../../data/profMockData";

export function ProfCoursesScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = profCourses.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      <div style={{ background: "linear-gradient(160deg, #1a0533 0%, #3A0CA3 50%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="px-5 pb-5 pt-1">
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "white" }}>Mes cours</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
            {profCourses.length} cours · Semestre en cours
          </p>

          {/* Search */}
          <div
            className="flex items-center gap-3 px-4 mt-4"
            style={{
              height: 46,
              borderRadius: 14,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Search size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un cours..."
              className="flex-1 outline-none bg-transparent"
              style={{ fontSize: 14, color: "white" }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5" style={{ paddingBottom: 20 }}>
        <div className="flex flex-col gap-4">
          {filtered.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/prof/courses/${course.id}`)}
              style={{
                background: "white",
                borderRadius: 22,
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                cursor: "pointer",
              }}
            >
              {/* Course header */}
              <div style={{ height: 90, background: course.gradient, position: "relative" }}>
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }}
                />
                <div className="absolute inset-0 flex items-end p-4">
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "white",
                        background: "rgba(255,255,255,0.2)",
                        padding: "2px 8px",
                        borderRadius: 6,
                        letterSpacing: 1,
                      }}
                    >
                      {course.code}
                    </span>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "white", marginTop: 4, lineHeight: 1.2 }}>
                      {course.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex border-b" style={{ borderColor: "#F0F2FA" }}>
                {[
                  { label: "Étudiants", value: course.studentsCount, icon: Users, color: "#4361EE" },
                  { label: "Matériels", value: course.materialsCount, icon: FileText, color: "#7B2FBE" },
                  { label: "Devoirs", value: course.assignmentsCount, icon: ChevronRight, color: "#06D6A0" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex-1 flex flex-col items-center gap-0.5 py-3">
                      <span style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</span>
                      <span style={{ fontSize: 10, color: "#9CA3AF" }}>{s.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-2 p-3">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/prof/courses/${course.id}`); }}
                  className="flex-1 flex items-center justify-center gap-2"
                  style={{
                    height: 38,
                    borderRadius: 12,
                    background: "#EEF1FD",
                    color: "#4361EE",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <Upload size={14} />
                  Matériels
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/prof/students"); }}
                  className="flex-1 flex items-center justify-center gap-2"
                  style={{
                    height: 38,
                    borderRadius: 12,
                    background: "#E6FAF5",
                    color: "#06D6A0",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <Users size={14} />
                  Étudiants
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/prof/assignments"); }}
                  className="flex-1 flex items-center justify-center gap-2"
                  style={{
                    height: 38,
                    borderRadius: 12,
                    background: "#FFF8E6",
                    color: "#FFB703",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <Plus size={14} />
                  Devoir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}