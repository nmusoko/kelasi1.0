import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Megaphone, Plus, AlertCircle, Users } from "lucide-react";
import { StatusBar } from "../../StatusBar";
import { profAnnouncements, profCourses } from "../../../data/profMockData";

export function ProfAnnouncementsScreen() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCourse, setNewCourse] = useState("INF301");
  const [isImportant, setIsImportant] = useState(false);

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
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Annonces</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Communiquez avec vos étudiants</p>
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
        {/* New announcement form */}
        {showNew && (
          <div
            className="mb-5 p-4 flex flex-col gap-3"
            style={{ background: "white", borderRadius: 20, boxShadow: "0 8px 24px rgba(67,97,238,0.12)" }}
          >
            <div className="flex items-center gap-2">
              <Megaphone size={18} style={{ color: "#4361EE" }} />
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E" }}>Nouvelle annonce</p>
            </div>

            {/* Course selector */}
            <div className="flex flex-col gap-1">
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Cours destinataire</label>
              <div className="flex gap-2">
                {profCourses.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setNewCourse(c.code)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 600,
                      background: newCourse === c.code ? "#4361EE" : "#F3F4F6",
                      color: newCourse === c.code ? "white" : "#6B7280",
                    }}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Titre</label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Titre de l'annonce..."
                className="outline-none"
                style={{ height: 44, borderRadius: 12, border: "1.5px solid #E5E7EB", padding: "0 14px", fontSize: 13, color: "#1A1D2E", background: "#F9FAFB" }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Message</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Rédigez votre annonce..."
                rows={4}
                className="outline-none resize-none"
                style={{ borderRadius: 12, border: "1.5px solid #E5E7EB", padding: "12px 14px", fontSize: 13, color: "#1A1D2E", background: "#F9FAFB" }}
              />
            </div>

            <button
              onClick={() => setIsImportant(!isImportant)}
              className="flex items-center gap-3"
              style={{
                height: 44,
                borderRadius: 12,
                background: isImportant ? "#FEE2E8" : "#F3F4F6",
                padding: "0 14px",
              }}
            >
              <AlertCircle size={16} style={{ color: isImportant ? "#EF476F" : "#9CA3AF" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: isImportant ? "#EF476F" : "#6B7280" }}>
                Marquer comme urgent
              </span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setShowNew(false)}
                className="flex-1"
                style={{ height: 44, borderRadius: 12, background: "#F3F4F6", color: "#6B7280", fontSize: 13, fontWeight: 600 }}
              >
                Annuler
              </button>
              <button
                onClick={() => setShowNew(false)}
                className="flex-1"
                style={{ height: 44, borderRadius: 12, background: "linear-gradient(135deg, #4361EE, #3A0CA3)", color: "white", fontSize: 13, fontWeight: 700 }}
              >
                Publier
              </button>
            </div>
          </div>
        )}

        {/* Announcements list */}
        <div className="flex flex-col gap-3">
          {profAnnouncements.map((ann) => (
            <div
              key={ann.id}
              style={{
                background: "white",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  height: 4,
                  background: ann.important ? "#EF476F" : "#4361EE",
                }}
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {ann.important && (
                        <span style={{ fontSize: 9, fontWeight: 700, color: "#EF476F", background: "#FEE2E8", padding: "1px 6px", borderRadius: 6 }}>
                          URGENT
                        </span>
                      )}
                      <span style={{ fontSize: 10, color: "#9CA3AF" }}>{ann.courseCode}</span>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E", lineHeight: 1.3 }}>{ann.title}</p>
                  </div>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: ann.important ? "#FEE2E8" : "#EEF1FD",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Megaphone size={16} style={{ color: ann.important ? "#EF476F" : "#4361EE" }} />
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5, marginBottom: 10 }}>
                  {ann.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Users size={12} style={{ color: "#9CA3AF" }} />
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>{ann.recipients} étudiants</span>
                    <span style={{ fontSize: 11, color: "#D1D5DB" }}>·</span>
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>{ann.date}</span>
                  </div>
                  <button style={{ fontSize: 12, color: "#EF476F", fontWeight: 600 }}>Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
