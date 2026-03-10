import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft, FileText, Film, File, AlertCircle,
  ChevronRight, CheckCircle, Clock, Star, Download,
  Send, MessageCircle
} from "lucide-react";
import { StatusBar } from "../StatusBar";
import { courses, weeklyMaterials, announcements, assignments } from "../../data/mockData";

const tabs = ["Matériels", "Annonces", "Devoirs", "Discussion"];

function FileIcon({ type }: { type: string }) {
  const configs = {
    pdf: { icon: FileText, color: "#EF476F", bg: "#FFF0F3", label: "PDF" },
    word: { icon: File, color: "#4361EE", bg: "#EEF1FD", label: "DOC" },
    ppt: { icon: FileText, color: "#FFB703", bg: "#FFF8E6", label: "PPT" },
    video: { icon: Film, color: "#06D6A0", bg: "#E6FAF5", label: "VID" },
  };
  const cfg = configs[type as keyof typeof configs] || configs.pdf;
  const Icon = cfg.icon;
  return (
    <div
      className="flex flex-col items-center justify-center gap-0.5 flex-shrink-0"
      style={{ width: 40, height: 40, borderRadius: 12, background: cfg.bg }}
    >
      <Icon size={16} style={{ color: cfg.color }} />
      <span style={{ fontSize: 8, fontWeight: 700, color: cfg.color }}>{cfg.label}</span>
    </div>
  );
}

function MaterialsTab({ courseId }: { courseId: string }) {
  const navigate = useNavigate();
  const weeks = weeklyMaterials[courseId] || [];
  const [expanded, setExpanded] = useState<number[]>([1]);

  return (
    <div className="flex flex-col gap-3 p-4">
      {weeks.map((week) => (
        <div
          key={week.week}
          style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          <button
            onClick={() => setExpanded((prev) => prev.includes(week.week) ? prev.filter((w) => w !== week.week) : [...prev, week.week])}
            className="w-full flex items-center justify-between px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: "linear-gradient(135deg, #4361EE, #3A0CA3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 800, color: "white" }}>S{week.week}</span>
              </div>
              <div className="text-left">
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E" }}>{week.title}</p>
                <p style={{ fontSize: 11, color: "#9CA3AF" }}>{week.files.length} fichiers</p>
              </div>
            </div>
            <ChevronRight
              size={16}
              style={{
                color: "#9CA3AF",
                transform: expanded.includes(week.week) ? "rotate(90deg)" : "rotate(0)",
                transition: "transform 0.2s",
              }}
            />
          </button>
          {expanded.includes(week.week) && (
            <div className="flex flex-col" style={{ borderTop: "1px solid #F0F2FA" }}>
              {week.files.map((file, i) => (
                <button
                  key={file.id}
                  onClick={() => navigate(`/app/courses/${courseId}/file/${file.id}`)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  style={{ borderBottom: i < week.files.length - 1 ? "1px solid #F8F9FF" : "none" }}
                >
                  <FileIcon type={file.type} />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#1A1D2E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {file.name}
                    </p>
                    <p style={{ fontSize: 11, color: "#9CA3AF" }}>{file.size} — {file.date}</p>
                  </div>
                  <Download size={14} style={{ color: "#9CA3AF", flexShrink: 0 }} />
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      {weeks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <File size={40} style={{ color: "#D1D5DB" }} />
          <p style={{ fontSize: 14, color: "#9CA3AF" }}>Aucun matériel disponible</p>
        </div>
      )}
    </div>
  );
}

function AnnouncementsTab({ courseId }: { courseId: string }) {
  const items = announcements[courseId] || [];
  return (
    <div className="flex flex-col gap-3 p-4">
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            background: "white",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {item.important && (
            <div
              style={{
                background: "linear-gradient(90deg, #EF476F, #C9184A)",
                padding: "4px 16px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <AlertCircle size={12} style={{ color: "white" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "white", letterSpacing: 0.5 }}>
                IMPORTANT
              </span>
            </div>
          )}
          <div className="p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E", lineHeight: 1.4, flex: 1 }}>
                {item.title}
              </h3>
              <span style={{ fontSize: 11, color: "#9CA3AF", flexShrink: 0, marginTop: 2 }}>{item.date}</span>
            </div>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{item.content}</p>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <AlertCircle size={40} style={{ color: "#D1D5DB" }} />
          <p style={{ fontSize: 14, color: "#9CA3AF" }}>Aucune annonce</p>
        </div>
      )}
    </div>
  );
}

function AssignmentsTab({ courseId }: { courseId: string }) {
  const navigate = useNavigate();
  const items = assignments[courseId] || [];

  const statusConfig = {
    not_submitted: { label: "À rendre", color: "#FFB703", bg: "#FFF8E6", icon: Clock },
    submitted: { label: "Soumis", color: "#4361EE", bg: "#EEF1FD", icon: CheckCircle },
    graded: { label: "Corrigé", color: "#06D6A0", bg: "#E6FAF5", icon: Star },
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      {items.map((item) => {
        const cfg = statusConfig[item.status];
        const StatusIcon = cfg.icon;
        const daysLeft = Math.ceil((new Date(item.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return (
          <button
            key={item.id}
            onClick={() =>
              navigate(
                item.status === "graded"
                  ? `/app/courses/${courseId}/assignments/${item.id}/grade`
                  : `/app/courses/${courseId}/assignments/${item.id}`
              )
            }
            className="flex items-start gap-3 p-4 text-left"
            style={{
              background: "white",
              borderRadius: 18,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              borderLeft: `4px solid ${cfg.color}`,
            }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 40, height: 40, borderRadius: 12, background: cfg.bg }}
            >
              <StatusIcon size={18} style={{ color: cfg.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E", lineHeight: 1.4 }}>
                {item.title}
              </p>
              <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: cfg.color,
                    background: cfg.bg,
                    padding: "2px 8px",
                    borderRadius: 6,
                  }}
                >
                  {cfg.label}
                </span>
                {item.status === "graded" && item.grade !== undefined && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1D2E" }}>
                    {item.grade}/{item.maxGrade}
                  </span>
                )}
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>
                  {item.status !== "graded"
                    ? daysLeft > 0
                      ? `J-${daysLeft}`
                      : "Dépassé"
                    : new Date(item.dueDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                </span>
              </div>
            </div>
            <ChevronRight size={16} style={{ color: "#D1D5DB", marginTop: 4 }} />
          </button>
        );
      })}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <CheckCircle size={40} style={{ color: "#D1D5DB" }} />
          <p style={{ fontSize: 14, color: "#9CA3AF" }}>Aucun devoir</p>
        </div>
      )}
    </div>
  );
}

function DiscussionTab({ courseId }: { courseId: string }) {
  const [message, setMessage] = useState("");
  const msgs = [
    { id: 1, sender: "Léa Rousseau", avatar: "LR", text: "Est-ce que quelqu'un a compris l'exercice 3 du TP2 ?", time: "10:15", isMe: false },
    { id: 2, sender: "Moi", avatar: "KB", text: "Oui ! Il faut utiliser une approche récursive. Je peux t'expliquer si tu veux.", time: "10:22", isMe: true },
    { id: 3, sender: "Thomas Petit", avatar: "TP", text: "Merci pour l'explication ! La correction est maintenant plus claire.", time: "10:45", isMe: false },
    { id: 4, sender: "Dr. Marie Dupont", avatar: "MD", text: "Bonne discussion ! Pour info, la correction complète sera postée vendredi.", time: "11:00", isMe: false, isProf: true },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ maxHeight: 320 }}>
        {msgs.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.isMe ? "flex-row-reverse" : ""}`}>
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 32, height: 32, borderRadius: 10,
                background: msg.isProf ? "linear-gradient(135deg, #4361EE, #3A0CA3)" : msg.isMe ? "#06D6A0" : "#F0F2FA",
                fontSize: 10, fontWeight: 700,
                color: msg.isProf || msg.isMe ? "white" : "#6B7280",
              }}
            >
              {msg.avatar}
            </div>
            <div style={{ maxWidth: "72%" }}>
              {!msg.isMe && (
                <p style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 3, fontWeight: 600 }}>
                  {msg.sender} {msg.isProf && "👩‍🏫"}
                </p>
              )}
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: msg.isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: msg.isMe ? "linear-gradient(135deg, #4361EE, #3A0CA3)" : msg.isProf ? "#EEF1FD" : "white",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <p style={{ fontSize: 13, color: msg.isMe ? "white" : "#1A1D2E", lineHeight: 1.5 }}>
                  {msg.text}
                </p>
              </div>
              <p style={{ fontSize: 10, color: "#C4C9D4", marginTop: 3, textAlign: msg.isMe ? "right" : "left" }}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex items-center gap-3 px-4 py-3 mx-4 mb-3"
        style={{
          background: "white",
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrire un message..."
          className="flex-1 outline-none bg-transparent"
          style={{ fontSize: 13, color: "#1A1D2E" }}
        />
        <button
          className="flex items-center justify-center"
          style={{
            width: 36, height: 36, borderRadius: 12,
            background: message ? "linear-gradient(135deg, #4361EE, #3A0CA3)" : "#F0F2FA",
          }}
        >
          <Send size={15} style={{ color: message ? "white" : "#9CA3AF" }} />
        </button>
      </div>
    </div>
  );
}

export function CourseHubScreen() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const course = courses.find((c) => c.id === courseId);
  if (!course) return null;

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      {/* Header */}
      <div style={{ background: course.gradient, position: "relative", overflow: "hidden" }}>
        <img
          src={course.thumbnail}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }}
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
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 8,
                  padding: "2px 10px",
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: "white", letterSpacing: 1 }}>
                  {course.code}
                </span>
              </div>
              <h1 style={{ fontSize: 18, fontWeight: 800, color: "white", lineHeight: 1.3, marginBottom: 4 }}>
                {course.name}
              </h1>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{course.professor}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#06D6A0" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{course.schedule}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB703" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{course.room}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex px-4 gap-1 pt-3 pb-0"
        style={{ background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="flex-1 flex flex-col items-center pb-3 pt-1 gap-0.5"
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: activeTab === i ? 700 : 500,
                color: activeTab === i ? "#4361EE" : "#9CA3AF",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </span>
            {activeTab === i && (
              <div
                style={{
                  width: "70%",
                  height: 3,
                  background: "linear-gradient(90deg, #4361EE, #3A0CA3)",
                  borderRadius: "3px 3px 0 0",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {activeTab === 0 && <MaterialsTab courseId={courseId!} />}
        {activeTab === 1 && <AnnouncementsTab courseId={courseId!} />}
        {activeTab === 2 && <AssignmentsTab courseId={courseId!} />}
        {activeTab === 3 && <DiscussionTab courseId={courseId!} />}
      </div>
    </div>
  );
}
