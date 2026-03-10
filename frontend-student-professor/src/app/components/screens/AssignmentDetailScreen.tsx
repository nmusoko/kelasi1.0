import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, Upload, CheckCircle, FileText } from "lucide-react";
import { StatusBar } from "../StatusBar";
import { courses, assignments } from "../../data/mockData";

export function AssignmentDetailScreen() {
  const { courseId, assignmentId } = useParams<{ courseId: string; assignmentId: string }>();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === courseId);
  const courseAssignments = assignments[courseId!] || [];
  const assignment = courseAssignments.find((a) => a.id === assignmentId);

  if (!course || !assignment) return null;

  const daysLeft = Math.ceil((new Date(assignment.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const dueDateFormatted = new Date(assignment.dueDate).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const statusConfig = {
    not_submitted: { label: "Non soumis", color: "#FFB703", bg: "#FFF8E6" },
    submitted: { label: "Soumis", color: "#4361EE", bg: "#EEF1FD" },
    graded: { label: "Corrigé", color: "#06D6A0", bg: "#E6FAF5" },
  };
  const cfg = statusConfig[assignment.status];

  const renderInstructions = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <p key={i} style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E", marginTop: 12, marginBottom: 4 }}>
            {line.replace("## ", "")}
          </p>
        );
      }
      if (line.startsWith("- ") || line.match(/^\d+\./)) {
        return (
          <div key={i} className="flex items-start gap-2" style={{ marginLeft: 8 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4361EE", marginTop: 8, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.6 }}>
              {line.replace(/^- /, "").replace(/^\d+\. /, "")}
            </p>
          </div>
        );
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E" }}>{line.replace(/\*\*/g, "")}</p>
        );
      }
      if (line.trim() === "") return <div key={i} style={{ height: 4 }} />;
      return (
        <p key={i} style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.6 }}>
          {line}
        </p>
      );
    });
  };

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
            <span style={{ fontSize: 13 }}>Devoirs</span>
          </button>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: cfg.bg,
              borderRadius: 8,
              padding: "3px 10px",
              marginBottom: 8,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color }}>{cfg.label}</span>
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "white", lineHeight: 1.3 }}>
            {assignment.title}
          </h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
            {course.code} — {course.shortName}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: assignment.status === "not_submitted" ? 100 : 20 }}>
        {/* Due date card */}
        <div
          className="flex items-center gap-4 p-4"
          style={{
            background: "white",
            borderRadius: 18,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            borderLeft: `4px solid ${daysLeft <= 1 ? "#EF476F" : daysLeft <= 3 ? "#FFB703" : "#4361EE"}`,
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: 13,
              background: daysLeft <= 1 ? "#FFF0F3" : daysLeft <= 3 ? "#FFF8E6" : "#EEF1FD",
            }}
          >
            <Calendar size={20} style={{ color: daysLeft <= 1 ? "#EF476F" : daysLeft <= 3 ? "#FFB703" : "#4361EE" }} />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 12, color: "#9CA3AF" }}>Date limite de rendu</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E", marginTop: 1 }}>
              {dueDateFormatted}
            </p>
          </div>
          {assignment.status === "not_submitted" && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: daysLeft <= 1 ? "#EF476F" : daysLeft <= 3 ? "#FFB703" : "#4361EE",
                background: daysLeft <= 1 ? "#FFF0F3" : daysLeft <= 3 ? "#FFF8E6" : "#EEF1FD",
                padding: "4px 10px",
                borderRadius: 10,
              }}
            >
              J-{daysLeft}
            </span>
          )}
        </div>

        {/* Score info */}
        <div
          className="flex items-center gap-4 px-4 py-3"
          style={{ background: "white", borderRadius: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          <FileText size={18} style={{ color: "#9CA3AF" }} />
          <div className="flex-1">
            <p style={{ fontSize: 12, color: "#9CA3AF" }}>Barème</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E" }}>
              Noté sur {assignment.maxGrade} points
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div
          style={{
            background: "white",
            borderRadius: 18,
            padding: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E", marginBottom: 12 }}>
            📋 Instructions
          </h2>
          <div className="flex flex-col gap-1">
            {renderInstructions(assignment.instructions)}
          </div>
        </div>
      </div>

      {/* Bottom action */}
      {assignment.status === "not_submitted" && (
        <div className="px-4 py-4 flex-shrink-0" style={{ background: "#F0F2FA" }}>
          <button
            onClick={() => navigate(`/app/courses/${courseId}/assignments/${assignmentId}/submit`)}
            className="w-full flex items-center justify-center gap-3"
            style={{
              height: 54,
              borderRadius: 16,
              background: "linear-gradient(135deg, #4361EE, #3A0CA3)",
              color: "white",
              fontWeight: 700,
              fontSize: 15,
              boxShadow: "0 8px 24px rgba(67,97,238,0.4)",
            }}
          >
            <Upload size={18} />
            Soumettre le devoir
          </button>
        </div>
      )}

      {assignment.status === "submitted" && (
        <div className="px-4 py-4 flex-shrink-0" style={{ background: "white", borderTop: "1px solid #F0F2FA" }}>
          <div
            className="flex items-center justify-center gap-3"
            style={{
              height: 54,
              borderRadius: 16,
              background: "#E6FAF5",
              color: "#06D6A0",
            }}
          >
            <CheckCircle size={18} />
            <span style={{ fontWeight: 700, fontSize: 15 }}>Devoir soumis — En attente de correction</span>
          </div>
        </div>
      )}
    </div>
  );
}