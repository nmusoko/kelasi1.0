import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Star, MessageSquare, TrendingUp, Award } from "lucide-react";
import { StatusBar } from "../StatusBar";
import { courses, assignments } from "../../data/mockData";

function GradeCircle({ grade, maxGrade, color }: { grade: number; maxGrade: number; color: string }) {
  const pct = (grade / maxGrade) * 100;
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const letterGrade =
    pct >= 90 ? "A" : pct >= 80 ? "B+" : pct >= 70 ? "B" : pct >= 60 ? "C" : "D";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#F0F2FA" strokeWidth={strokeWidth} fill="none" />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            stroke={color} strokeWidth={strokeWidth} fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span style={{ fontSize: 28, fontWeight: 800, color: "#1A1D2E", lineHeight: 1 }}>{grade}</span>
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>/{maxGrade}</span>
        </div>
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color,
          background: `${color}18`,
          padding: "4px 16px",
          borderRadius: 20,
        }}
      >
        {letterGrade} — {pct.toFixed(0)}%
      </span>
    </div>
  );
}

export function GradeScreen() {
  const { courseId, assignmentId } = useParams<{ courseId: string; assignmentId: string }>();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === courseId);
  const courseAssignments = assignments[courseId!] || [];
  const assignment = courseAssignments.find((a) => a.id === assignmentId);

  if (!course || !assignment || assignment.status !== "graded") return null;

  const pct = ((assignment.grade || 0) / assignment.maxGrade) * 100;
  const gradeColor = pct >= 80 ? "#06D6A0" : pct >= 60 ? "#FFB703" : "#EF476F";

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      {/* Header */}
      <div style={{ background: course.gradient, position: "relative", overflow: "hidden" }}>
        <img
          src={course.thumbnail}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }}
        />
        <StatusBar light />
        <div className="px-4 pb-5 pt-1 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 mb-3"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <ArrowLeft size={18} />
            <span style={{ fontSize: 13 }}>Retour</span>
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div style={{ background: "#E6FAF5", borderRadius: 8, padding: "3px 10px" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#06D6A0" }}>✓ Corrigé</span>
            </div>
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "white", lineHeight: 1.3 }}>
            {assignment.title}
          </h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
            {course.code} — {course.professor}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4" style={{ paddingBottom: 80 }}>
        {/* Grade display */}
        <div
          className="flex flex-col items-center gap-4 p-6"
          style={{ background: "white", borderRadius: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}
        >
          <div className="flex items-center gap-2">
            <Award size={16} style={{ color: "#FFB703" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>Votre résultat</span>
          </div>
          <GradeCircle grade={assignment.grade || 0} maxGrade={assignment.maxGrade} color={gradeColor} />
          <div className="flex items-center gap-2 w-full px-4">
            <TrendingUp size={14} style={{ color: gradeColor }} />
            <div className="flex-1" style={{ height: 6, background: "#F0F2FA", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: gradeColor, borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: gradeColor }}>{pct.toFixed(0)}%</span>
          </div>
        </div>

        {/* Score breakdown */}
        <div
          style={{ background: "white", borderRadius: 20, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E", marginBottom: 12 }}>
            📊 Détail des points
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "Exactitude des algorithmes", pts: 7, max: 8 },
              { label: "Qualité du code", pts: 4, max: 4 },
              { label: "Analyse de complexité", pts: 3, max: 4 },
              { label: "Rapport et présentation", pts: 3, max: 4 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 12, color: "#4B5563" }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1A1D2E" }}>
                    {item.pts}/{item.max}
                  </span>
                </div>
                <div style={{ height: 5, background: "#F0F2FA", borderRadius: 3, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${(item.pts / item.max) * 100}%`,
                      height: "100%",
                      background: gradeColor,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professor feedback */}
        {assignment.feedback && (
          <div
            style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ background: "linear-gradient(90deg, #4361EE, #3A0CA3)" }}
            >
              <MessageSquare size={16} style={{ color: "white" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>
                Commentaire du professeur
              </span>
            </div>
            <div className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: "linear-gradient(135deg, #4361EE, #3A0CA3)",
                    fontSize: 11, fontWeight: 700, color: "white",
                  }}
                >
                  {course.professorAvatar}
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#1A1D2E" }}>{course.professor}</p>
                  <p style={{ fontSize: 11, color: "#9CA3AF" }}>
                    {new Date(assignment.dueDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                  </p>
                </div>
              </div>
              <div
                style={{
                  padding: "12px 14px",
                  background: "#F8F9FF",
                  borderRadius: 14,
                  borderLeft: "3px solid #4361EE",
                }}
              >
                <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.7 }}>
                  {assignment.feedback}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Class stats */}
        <div
          style={{ background: "white", borderRadius: 20, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E", marginBottom: 12 }}>
            📈 Statistiques de la classe
          </h3>
          <div className="flex gap-3">
            {[
              { label: "Votre note", value: `${assignment.grade}/${assignment.maxGrade}`, color: gradeColor },
              { label: "Moyenne classe", value: "13.4/20", color: "#9CA3AF" },
              { label: "Note max", value: "18/20", color: "#06D6A0" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex-1 flex flex-col items-center gap-1 py-3"
                style={{ background: "#F8F9FF", borderRadius: 12 }}
              >
                <span style={{ fontSize: 16, fontWeight: 800, color: stat.color }}>{stat.value}</span>
                <span style={{ fontSize: 10, color: "#9CA3AF", textAlign: "center", lineHeight: 1.3 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
