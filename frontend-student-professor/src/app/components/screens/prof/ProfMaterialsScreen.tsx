import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Upload, FileText, Film, Presentation, FileType, Plus, Trash2, Eye } from "lucide-react";
import { StatusBar } from "../../StatusBar";
import { profCourses } from "../../../data/profMockData";

const mockMaterials = [
  { id: "m1", courseCode: "INF301", week: 1, title: "Introduction aux Algorithmes", files: [
    { id: "f1", name: "Cours_Sem1_Introduction.pdf", type: "pdf", size: "2.4 MB", date: "12 Fév 2026", downloads: 38 },
    { id: "f2", name: "TP1_Exercices.pdf", type: "pdf", size: "0.8 MB", date: "12 Fév 2026", downloads: 41 },
    { id: "f3", name: "Présentation_S1.pptx", type: "ppt", size: "5.2 MB", date: "12 Fév 2026", downloads: 35 },
  ]},
  { id: "m2", courseCode: "INF301", week: 2, title: "Complexité et Notation Big-O", files: [
    { id: "f4", name: "Cours_Sem2_Complexite.pdf", type: "pdf", size: "3.1 MB", date: "19 Fév 2026", downloads: 40 },
    { id: "f5", name: "Exercices_Big-O.docx", type: "word", size: "0.5 MB", date: "19 Fév 2026", downloads: 36 },
  ]},
  { id: "m3", courseCode: "INF301", week: 3, title: "Listes, Piles et Files", files: [
    { id: "f6", name: "Cours_Sem3_Structures.pdf", type: "pdf", size: "4.0 MB", date: "26 Fév 2026", downloads: 32 },
  ]},
];

const typeConfig: Record<string, { color: string; bg: string; icon: React.ElementType; label: string }> = {
  pdf: { color: "#EF476F", bg: "#FEE2E8", icon: FileText, label: "PDF" },
  word: { color: "#4361EE", bg: "#EEF1FD", icon: FileType, label: "Word" },
  ppt: { color: "#FFB703", bg: "#FFF8E6", icon: Presentation, label: "PPT" },
  video: { color: "#06D6A0", bg: "#E6FAF5", icon: Film, label: "Vidéo" },
};

export function ProfMaterialsScreen() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("INF301");
  const [showUpload, setShowUpload] = useState(false);

  const courseMaterials = mockMaterials.filter((m) => m.courseCode === selectedCourse);

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      <div style={{ background: "linear-gradient(160deg, #1a0533 0%, #3A0CA3 50%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="flex items-center gap-3 px-5 pb-4 pt-1">
          <button
            onClick={() => navigate("/prof/dashboard")}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
          >
            <ArrowLeft size={18} style={{ color: "white" }} />
          </button>
          <div className="flex-1">
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Gestion des matériels</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Publiez et organisez vos ressources</p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
          >
            <Plus size={18} style={{ color: "white" }} />
          </button>
        </div>
      </div>

      {/* Course selector */}
      <div className="flex gap-2 px-5 pt-4 pb-2">
        {profCourses.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourse(c.code)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              background: selectedCourse === c.code ? "#4361EE" : "white",
              color: selectedCourse === c.code ? "white" : "#6B7280",
              border: selectedCourse === c.code ? "none" : "1px solid #E5E7EB",
              boxShadow: selectedCourse === c.code ? "0 4px 12px rgba(67,97,238,0.3)" : "none",
              transition: "all 0.2s",
            }}
          >
            {c.code}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-2" style={{ paddingBottom: 20 }}>
        {/* Upload button */}
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="w-full flex items-center justify-center gap-3 mb-4"
          style={{
            height: 50,
            borderRadius: 16,
            background: "white",
            border: "2px dashed #C7D2FE",
            color: "#4361EE",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <Upload size={18} />
          Ajouter des fichiers pour la semaine en cours
        </button>

        {showUpload && (
          <div
            className="mb-4 p-4 flex flex-col gap-3"
            style={{ background: "white", borderRadius: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}
          >
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E" }}>Nouvelle ressource</p>
            {[
              { label: "Titre du cours/semaine", placeholder: "Ex: Semaine 4 — Arbres et Graphes" },
              { label: "Description (optionnel)", placeholder: "Courte description..." },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{f.label}</label>
                <input
                  placeholder={f.placeholder}
                  className="outline-none"
                  style={{
                    height: 44,
                    borderRadius: 12,
                    border: "1.5px solid #E5E7EB",
                    padding: "0 14px",
                    fontSize: 13,
                    color: "#1A1D2E",
                    background: "#F9FAFB",
                  }}
                />
              </div>
            ))}
            <div
              className="flex items-center justify-center gap-2"
              style={{
                height: 80,
                borderRadius: 14,
                border: "2px dashed #E5E7EB",
                background: "#F9FAFB",
                color: "#9CA3AF",
                fontSize: 13,
              }}
            >
              <Upload size={18} />
              Glisser-déposer ou sélectionner des fichiers
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowUpload(false)}
                className="flex-1"
                style={{ height: 42, borderRadius: 12, background: "#F3F4F6", color: "#6B7280", fontSize: 13, fontWeight: 600 }}
              >
                Annuler
              </button>
              <button
                onClick={() => setShowUpload(false)}
                className="flex-1"
                style={{ height: 42, borderRadius: 12, background: "#4361EE", color: "white", fontSize: 13, fontWeight: 600 }}
              >
                Publier
              </button>
            </div>
          </div>
        )}

        {/* Materials list */}
        <div className="flex flex-col gap-4">
          {courseMaterials.map((week) => (
            <div key={week.id} style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #F0F2FA" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E" }}>Semaine {week.week}</p>
                  <p style={{ fontSize: 11, color: "#9CA3AF" }}>{week.title}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#4361EE", background: "#EEF1FD", padding: "2px 8px", borderRadius: 8 }}>
                  {week.files.length} fichiers
                </span>
              </div>
              <div className="flex flex-col">
                {week.files.map((file, i) => {
                  const config = typeConfig[file.type] || typeConfig.pdf;
                  const Icon = config.icon;
                  return (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 px-4 py-3"
                      style={{ borderTop: i > 0 ? "1px solid #F0F2FA" : "none" }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: config.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} style={{ color: config.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 12, fontWeight: 600, color: "#1A1D2E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</p>
                        <p style={{ fontSize: 10, color: "#9CA3AF" }}>{file.size} · {file.downloads} téléchargements</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button style={{ width: 28, height: 28, borderRadius: 8, background: "#EEF1FD", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Eye size={13} style={{ color: "#4361EE" }} />
                        </button>
                        <button style={{ width: 28, height: 28, borderRadius: 8, background: "#FEE2E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Trash2 size={13} style={{ color: "#EF476F" }} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
