import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, MessageCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { StatusBar } from "../../StatusBar";
import { profStudents, profCourses } from "../../../data/profMockData";

const statusConfig = {
  excellent: { label: "Excellent", color: "#06D6A0", bg: "#E6FAF5" },
  good: { label: "Bien", color: "#4361EE", bg: "#EEF1FD" },
  average: { label: "Moyen", color: "#FFB703", bg: "#FFF8E6" },
  risk: { label: "En difficulté", color: "#EF476F", bg: "#FEE2E8" },
};

export function ProfStudentsScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("INF301");
  const [filter, setFilter] = useState<"all" | "excellent" | "risk">("all");

  const filtered = profStudents
    .filter((s) => s.course === selectedCourse)
    .filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((s) => {
      if (filter === "excellent") return s.status === "excellent";
      if (filter === "risk") return s.status === "risk";
      return true;
    });

  const avg = Math.round(profStudents.filter(s => s.course === selectedCourse).reduce((a, s) => a + s.grade, 0) / profStudents.filter(s => s.course === selectedCourse).length * 10) / 10;

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      <div style={{ background: "linear-gradient(160deg, #1a0533 0%, #3A0CA3 50%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="flex items-center gap-3 px-5 pb-3 pt-1">
          <button
            onClick={() => navigate("/prof/dashboard")}
            style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}
          >
            <ArrowLeft size={18} style={{ color: "white" }} />
          </button>
          <div className="flex-1">
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Étudiants</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Suivi et performances</p>
          </div>
        </div>

        {/* Course filter */}
        <div className="flex gap-2 px-5 pb-3">
          {profCourses.map((c) => (
            <button
              key={c.code}
              onClick={() => setSelectedCourse(c.code)}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 600,
                background: selectedCourse === c.code ? "white" : "rgba(255,255,255,0.12)",
                color: selectedCourse === c.code ? "#4361EE" : "rgba(255,255,255,0.7)",
                border: "none",
              }}
            >
              {c.code}
            </button>
          ))}
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-3 mx-5 mb-4 px-4"
          style={{ height: 44, borderRadius: 14, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <Search size={15} style={{ color: "rgba(255,255,255,0.6)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un étudiant..."
            className="flex-1 outline-none bg-transparent"
            style={{ fontSize: 13, color: "white" }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 20 }}>
        {/* Stats */}
        <div className="flex gap-3 px-5 pt-4 mb-4">
          {[
            { label: "Étudiants", value: profStudents.filter(s => s.course === selectedCourse).length, color: "#4361EE", bg: "#EEF1FD" },
            { label: "Moy. classe", value: `${avg}/20`, color: "#06D6A0", bg: "#E6FAF5" },
            { label: "En difficulté", value: profStudents.filter(s => s.course === selectedCourse && s.status === "risk").length, color: "#EF476F", bg: "#FEE2E8" },
          ].map((s) => (
            <div key={s.label} className="flex-1 flex flex-col items-center gap-0.5 py-3" style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: s.color }}>{s.value}</span>
              <span style={{ fontSize: 10, color: "#9CA3AF", textAlign: "center" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 px-5 mb-3">
          {[
            { key: "all", label: "Tous" },
            { key: "excellent", label: "Excellents" },
            { key: "risk", label: "En difficulté" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              style={{
                padding: "5px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                background: filter === f.key ? "#4361EE" : "white",
                color: filter === f.key ? "white" : "#6B7280",
                border: filter === f.key ? "none" : "1px solid #E5E7EB",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Students list */}
        <div className="flex flex-col gap-3 px-5">
          {filtered.map((student) => {
            const status = statusConfig[student.status as keyof typeof statusConfig];
            const TrendIcon = student.grade >= 14 ? TrendingUp : student.grade >= 10 ? Minus : TrendingDown;
            const trendColor = student.grade >= 14 ? "#06D6A0" : student.grade >= 10 ? "#FFB703" : "#EF476F";

            return (
              <div
                key={student.id}
                style={{ background: "white", borderRadius: 18, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: "linear-gradient(135deg, #4361EE, #3A0CA3)",
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 800, color: "white" }}>{student.avatar}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E" }}>{student.name}</p>
                    <p style={{ fontSize: 11, color: "#9CA3AF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {student.email}
                    </p>
                  </div>

                  {/* Grade & status */}
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <TrendIcon size={13} style={{ color: trendColor }} />
                      <span style={{ fontSize: 16, fontWeight: 800, color: "#1A1D2E" }}>{student.grade}</span>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>/20</span>
                    </div>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: status.color,
                        background: status.bg,
                        padding: "2px 7px",
                        borderRadius: 6,
                      }}
                    >
                      {status.label.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: 10 }}>
                  <div style={{ height: 4, background: "#F0F2FA", borderRadius: 2 }}>
                    <div
                      style={{
                        width: `${(student.grade / 20) * 100}%`,
                        height: "100%",
                        background: status.color,
                        borderRadius: 2,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigate("/prof/messages")}
                    className="flex-1 flex items-center justify-center gap-1.5"
                    style={{ height: 34, borderRadius: 10, background: "#EEF1FD", color: "#4361EE", fontSize: 12, fontWeight: 600 }}
                  >
                    <MessageCircle size={13} />
                    Message
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5"
                    style={{ height: 34, borderRadius: 10, background: "#E6FAF5", color: "#06D6A0", fontSize: 12, fontWeight: 600 }}
                  >
                    <TrendingUp size={13} />
                    Résultats
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
