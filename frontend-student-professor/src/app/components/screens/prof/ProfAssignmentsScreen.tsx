import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, ClipboardList, Clock, CheckCircle, Users, Upload, X, FileText, Film, Paperclip, File } from "lucide-react";
import { StatusBar } from "../../StatusBar";
import { profAssignments, profCourses } from "../../../data/profMockData";

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "word" | "ppt" | "video" | "other";
}

const fileTypeConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  pdf:   { color: "#EF476F", bg: "#FEE2E8", icon: FileText },
  word:  { color: "#4361EE", bg: "#EEF1FD", icon: FileText },
  ppt:   { color: "#FFB703", bg: "#FFF8E6", icon: File },
  video: { color: "#06D6A0", bg: "#E6FAF5", icon: Film },
  other: { color: "#7B2FBE", bg: "#F3E8FF", icon: Paperclip },
};

function getFileType(name: string): AttachedFile["type"] {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (["doc", "docx"].includes(ext)) return "word";
  if (["ppt", "pptx"].includes(ext)) return "ppt";
  if (["mp4", "mov", "avi", "mkv"].includes(ext)) return "video";
  return "other";
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function ProfAssignmentsScreen() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCourse, setNewCourse] = useState("INF301");
  const [newDue, setNewDue] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newMaxGrade, setNewMaxGrade] = useState("20");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles: AttachedFile[] = Array.from(files).map((f) => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: formatSize(f.size),
      type: getFileType(f.name),
    }));
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleReset = () => {
    setShowNew(false);
    setNewTitle("");
    setNewDue("");
    setNewDesc("");
    setNewMaxGrade("20");
    setAttachedFiles([]);
  };

  const getDaysLeft = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return "Demain";
    if (diff < 0) return "Clôturé";
    return `J-${diff}`;
  };

  const getDaysColor = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return "#9CA3AF";
    if (diff <= 2) return "#EF476F";
    if (diff <= 5) return "#FFB703";
    return "#4361EE";
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      <div style={{ background: "linear-gradient(160deg, #1a0533 0%, #3A0CA3 50%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="flex items-center gap-3 px-5 pb-4 pt-1">
          <button
            onClick={() => navigate("/prof/dashboard")}
            style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}
          >
            <ArrowLeft size={18} style={{ color: "white" }} />
          </button>
          <div className="flex-1">
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Devoirs</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Créez et gérez les évaluations</p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}
          >
            <Plus size={18} style={{ color: "white" }} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5" style={{ paddingBottom: 20 }}>
        {/* New assignment form */}
        {showNew && (
          <div
            className="mb-5 flex flex-col gap-0"
            style={{ background: "white", borderRadius: 22, boxShadow: "0 8px 32px rgba(67,97,238,0.14)", overflow: "hidden" }}
          >
            {/* Form header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: "linear-gradient(135deg, #4361EE, #3A0CA3)" }}
            >
              <div className="flex items-center gap-2.5">
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ClipboardList size={17} style={{ color: "white" }} />
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "white" }}>Nouveau devoir</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>Remplissez tous les champs</p>
                </div>
              </div>
              <button
                onClick={handleReset}
                style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}
              >
                <X size={15} style={{ color: "white" }} />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-5">
              {/* Course selector */}
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: 0.5 }}>COURS</label>
                <div className="flex gap-2 flex-wrap">
                  {profCourses.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setNewCourse(c.code)}
                      style={{
                        padding: "5px 14px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        background: newCourse === c.code ? "#4361EE" : "#F3F4F6",
                        color: newCourse === c.code ? "white" : "#6B7280",
                        border: newCourse === c.code ? "none" : "1px solid #E5E7EB",
                        boxShadow: newCourse === c.code ? "0 3px 10px rgba(67,97,238,0.3)" : "none",
                        transition: "all 0.2s",
                      }}
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: 0.5 }}>TITRE DU DEVOIR</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: TP Noté — Algorithmes de tri"
                  className="outline-none"
                  style={{ height: 46, borderRadius: 13, border: "1.5px solid #E5E7EB", padding: "0 14px", fontSize: 13, color: "#1A1D2E", background: "#F9FAFB" }}
                />
              </div>

              {/* Date + Max grade row */}
              <div className="flex gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: 0.5 }}>DATE LIMITE</label>
                  <input
                    type="date"
                    value={newDue}
                    onChange={(e) => setNewDue(e.target.value)}
                    className="outline-none"
                    style={{ height: 46, borderRadius: 13, border: "1.5px solid #E5E7EB", padding: "0 12px", fontSize: 13, color: "#1A1D2E", background: "#F9FAFB" }}
                  />
                </div>
                <div className="flex flex-col gap-1.5" style={{ width: 90 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: 0.5 }}>NOTE /</label>
                  <input
                    type="number"
                    value={newMaxGrade}
                    onChange={(e) => setNewMaxGrade(e.target.value)}
                    min={1}
                    max={100}
                    className="outline-none text-center"
                    style={{ height: 46, borderRadius: 13, border: "1.5px solid #E5E7EB", fontSize: 16, fontWeight: 700, color: "#1A1D2E", background: "#F9FAFB" }}
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: 0.5 }}>INSTRUCTIONS</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Décrivez les consignes, les livrables attendus et les critères d'évaluation..."
                  rows={4}
                  className="outline-none resize-none"
                  style={{ borderRadius: 13, border: "1.5px solid #E5E7EB", padding: "12px 14px", fontSize: 13, color: "#1A1D2E", background: "#F9FAFB", lineHeight: 1.6 }}
                />
              </div>

              {/* File upload zone */}
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: 0.5 }}>FICHIERS JOINTS</label>

                {/* Drop zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFiles(e.dataTransfer.files);
                  }}
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                  style={{
                    height: 110,
                    borderRadius: 16,
                    border: `2px dashed ${isDragging ? "#4361EE" : "#C7D2FE"}`,
                    background: isDragging ? "#EEF1FD" : "#F8F9FF",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: isDragging ? "#4361EE" : "#EEF1FD",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    <Upload size={18} style={{ color: isDragging ? "white" : "#4361EE" }} />
                  </div>
                  <div className="text-center">
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#4361EE" }}>
                      {isDragging ? "Déposez ici" : "Cliquer ou glisser-déposer"}
                    </p>
                    <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                      PDF, Word, PPT, vidéo — Taille max : 100 Mo
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.avi"
                    className="hidden"
                    style={{ display: "none" }}
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>

                {/* Attached files list */}
                {attachedFiles.length > 0 && (
                  <div className="flex flex-col gap-2 mt-1">
                    {attachedFiles.map((file) => {
                      const cfg = fileTypeConfig[file.type];
                      const Icon = cfg.icon;
                      return (
                        <div
                          key={file.id}
                          className="flex items-center gap-3"
                          style={{
                            background: "#F9FAFB",
                            borderRadius: 13,
                            padding: "10px 12px",
                            border: "1px solid #E5E7EB",
                          }}
                        >
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 10,
                              background: cfg.bg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={16} style={{ color: cfg.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#1A1D2E",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {file.name}
                            </p>
                            <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 1 }}>{file.size}</p>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: 8,
                              background: "#FEE2E8",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "none",
                              flexShrink: 0,
                              cursor: "pointer",
                            }}
                          >
                            <X size={12} style={{ color: "#EF476F" }} />
                          </button>
                        </div>
                      );
                    })}

                    {/* Add more button */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-2"
                      style={{
                        height: 38,
                        borderRadius: 12,
                        border: "1.5px dashed #C7D2FE",
                        background: "transparent",
                        color: "#4361EE",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={14} />
                      Ajouter d'autres fichiers
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={handleReset}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 14,
                    background: "#F3F4F6",
                    color: "#6B7280",
                    fontSize: 14,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2"
                  style={{
                    flex: 2,
                    height: 48,
                    borderRadius: 14,
                    background: "linear-gradient(135deg, #4361EE, #3A0CA3)",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(67,97,238,0.35)",
                  }}
                >
                  <ClipboardList size={16} />
                  Créer le devoir
                  {attachedFiles.length > 0 && (
                    <span
                      style={{
                        background: "rgba(255,255,255,0.25)",
                        borderRadius: 8,
                        padding: "1px 7px",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {attachedFiles.length} fichier{attachedFiles.length > 1 ? "s" : ""}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assignments list */}
        <div className="flex flex-col gap-4">
          {profAssignments.map((a) => {
            const submissionRate = Math.round((a.submitted / a.totalStudents) * 100);
            const gradingRate = Math.round((a.graded / a.totalStudents) * 100);
            const pending = a.submitted - a.graded;

            return (
              <div
                key={a.id}
                style={{
                  background: "white",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ height: 4, background: a.color }} />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: "white",
                            background: a.color,
                            padding: "1px 8px",
                            borderRadius: 6,
                          }}
                        >
                          {a.courseCode}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: getDaysColor(a.dueDate),
                          }}
                        >
                          {getDaysLeft(a.dueDate)}
                        </span>
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E", lineHeight: 1.3 }}>
                        {a.title}
                      </p>
                    </div>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: `${a.color}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Clock size={18} style={{ color: a.color }} />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-3 mb-3">
                    {[
                      { icon: Users, label: "Total", value: a.totalStudents, color: "#6B7280" },
                      { icon: ClipboardList, label: "Rendus", value: a.submitted, color: "#4361EE" },
                      { icon: CheckCircle, label: "Notés", value: a.graded, color: "#06D6A0" },
                    ].map((s) => {
                      const Icon = s.icon;
                      return (
                        <div key={s.label} className="flex-1 flex flex-col items-center gap-0.5 py-2" style={{ background: "#F9FAFB", borderRadius: 10 }}>
                          <span style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.value}</span>
                          <span style={{ fontSize: 9, color: "#9CA3AF" }}>{s.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress bars */}
                  <div className="flex flex-col gap-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span style={{ fontSize: 10, color: "#9CA3AF" }}>Taux de rendu</span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#4361EE" }}>{submissionRate}%</span>
                      </div>
                      <div style={{ height: 5, background: "#F0F2FA", borderRadius: 3 }}>
                        <div style={{ width: `${submissionRate}%`, height: "100%", background: "#4361EE", borderRadius: 3 }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span style={{ fontSize: 10, color: "#9CA3AF" }}>Taux de correction</span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#06D6A0" }}>{gradingRate}%</span>
                      </div>
                      <div style={{ height: 5, background: "#F0F2FA", borderRadius: 3 }}>
                        <div style={{ width: `${gradingRate}%`, height: "100%", background: "#06D6A0", borderRadius: 3 }} />
                      </div>
                    </div>
                  </div>

                  {pending > 0 && (
                    <button
                      className="w-full mt-3 flex items-center justify-center gap-2"
                      style={{
                        height: 38,
                        borderRadius: 12,
                        background: "linear-gradient(135deg, #FFB703, #FB8500)",
                        color: "white",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      Corriger {pending} copie{pending > 1 ? "s" : ""}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}