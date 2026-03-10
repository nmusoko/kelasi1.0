import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Upload, File, X, CheckCircle, FileText, Film } from "lucide-react";
import { StatusBar } from "../StatusBar";
import { courses, assignments } from "../../data/mockData";

export function AssignmentSubmitScreen() {
  const { courseId, assignmentId } = useParams<{ courseId: string; assignmentId: string }>();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  const course = courses.find((c) => c.id === courseId);
  const courseAssignments = assignments[courseId!] || [];
  const assignment = courseAssignments.find((a) => a.id === assignmentId);

  if (!course || !assignment) return null;

  const simulateUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploadedFile({ name: "TP_Algorithmes_Tri_Benali.pdf", size: "1.8 MB", type: "pdf" });
      setUploading(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate(-1), 2000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 px-8" style={{ background: "#F0F2FA" }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: 100,
            height: 100,
            borderRadius: 30,
            background: "linear-gradient(135deg, #06D6A0, #059669)",
            boxShadow: "0 20px 50px rgba(6,214,160,0.4)",
          }}
        >
          <CheckCircle size={50} style={{ color: "white" }} />
        </div>
        <div className="text-center">
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1A1D2E" }}>Soumission réussie !</h2>
          <p style={{ fontSize: 14, color: "#9CA3AF", marginTop: 8, lineHeight: 1.6 }}>
            Votre devoir a été soumis avec succès.{"\n"}Le professeur le corrigera bientôt.
          </p>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: "12px 20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ fontSize: 13, color: "#9CA3AF", textAlign: "center" }}>
            Soumis le{" "}
            <span style={{ fontWeight: 700, color: "#1A1D2E" }}>
              {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
            </span>
          </p>
        </div>
        <p style={{ fontSize: 12, color: "#C4C9D4" }}>Redirection en cours...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #3A0CA3 0%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="px-4 pb-5 pt-1">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 mb-3"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <ArrowLeft size={18} />
            <span style={{ fontSize: 13 }}>Retour</span>
          </button>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "white" }}>Soumettre le devoir</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
            {assignment.title}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4" style={{ paddingBottom: 100 }}>
        {/* Assignment summary */}
        <div
          className="flex items-center gap-3 p-4"
          style={{ background: "white", borderRadius: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          <div
            style={{ width: 44, height: 44, borderRadius: 13, background: "#EEF1FD", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <FileText size={20} style={{ color: "#4361EE" }} />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E", lineHeight: 1.3 }}>{assignment.title}</p>
            <p style={{ fontSize: 11, color: "#9CA3AF" }}>
              Limite : {new Date(assignment.dueDate).toLocaleDateString("fr-FR")} — /{assignment.maxGrade} pts
            </p>
          </div>
        </div>

        {/* File upload area */}
        <div style={{ background: "white", borderRadius: 18, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E", marginBottom: 12 }}>
            📎 Fichier à soumettre
          </h3>

          {!uploadedFile ? (
            <button
              onClick={simulateUpload}
              disabled={uploading}
              className="w-full flex flex-col items-center justify-center gap-3 py-8"
              style={{
                border: "2px dashed #D1D5DB",
                borderRadius: 14,
                background: "#F9FAFB",
                cursor: uploading ? "not-allowed" : "pointer",
              }}
            >
              {uploading ? (
                <>
                  <div style={{ width: 32, height: 32, border: "3px solid #E5E7EB", borderTopColor: "#4361EE", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <p style={{ fontSize: 13, color: "#9CA3AF" }}>Téléversement en cours...</p>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background: "#EEF1FD",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Upload size={24} style={{ color: "#4361EE" }} />
                  </div>
                  <div className="text-center">
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1D2E" }}>
                      Appuyer pour ajouter un fichier
                    </p>
                    <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                      PDF, Word, PowerPoint, ZIP (max 50 MB)
                    </p>
                  </div>
                </>
              )}
            </button>
          ) : (
            <div
              className="flex items-center gap-3 p-3"
              style={{
                border: "1.5px solid #06D6A0",
                borderRadius: 14,
                background: "#E6FAF5",
              }}
            >
              <div
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "#FFF0F3",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <FileText size={20} style={{ color: "#EF476F" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {uploadedFile.name}
                </p>
                <p style={{ fontSize: 11, color: "#06D6A0", fontWeight: 600 }}>✓ {uploadedFile.size} — Prêt</p>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <X size={14} style={{ color: "#9CA3AF" }} />
              </button>
            </div>
          )}

          {/* Accepted formats */}
          <div className="flex gap-2 mt-3">
            {[
              { label: "PDF", color: "#EF476F", bg: "#FFF0F3" },
              { label: "DOCX", color: "#4361EE", bg: "#EEF1FD" },
              { label: "PPTX", color: "#FFB703", bg: "#FFF8E6" },
              { label: "ZIP", color: "#6B7280", bg: "#F3F4F6" },
            ].map((f) => (
              <span
                key={f.label}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: f.color,
                  background: f.bg,
                  padding: "3px 8px",
                  borderRadius: 6,
                }}
              >
                {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div style={{ background: "white", borderRadius: 18, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E", marginBottom: 10 }}>
            💬 Commentaire (optionnel)
          </h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ajouter un commentaire pour le professeur..."
            rows={3}
            className="w-full outline-none bg-transparent resize-none"
            style={{
              fontSize: 13,
              color: "#1A1D2E",
              lineHeight: 1.6,
              padding: "10px 12px",
              background: "#F9FAFB",
              borderRadius: 12,
              border: "1.5px solid #E5E7EB",
            }}
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="px-4 py-4 flex-shrink-0" style={{ background: "#F0F2FA" }}>
        <button
          onClick={handleSubmit}
          disabled={!uploadedFile}
          className="w-full flex items-center justify-center gap-3"
          style={{
            height: 54,
            borderRadius: 16,
            background: uploadedFile
              ? "linear-gradient(135deg, #4361EE, #3A0CA3)"
              : "#E5E7EB",
            color: uploadedFile ? "white" : "#9CA3AF",
            fontWeight: 700,
            fontSize: 15,
            boxShadow: uploadedFile ? "0 8px 24px rgba(67,97,238,0.4)" : "none",
            cursor: uploadedFile ? "pointer" : "not-allowed",
            transition: "all 0.3s",
          }}
        >
          <Upload size={18} />
          Confirmer la soumission
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}