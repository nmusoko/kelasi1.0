import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Send, Search } from "lucide-react";
import { StatusBar } from "../../StatusBar";
import { profMessages } from "../../../data/profMockData";

const mockChat: { id: string; sender: "me" | "student"; text: string; time: string }[] = [
  { id: "c1", sender: "student", text: "Bonjour Dr. Dupont, j'ai une question sur le TP de tri.", time: "09:15" },
  { id: "c2", sender: "me", text: "Bonjour Beni ! Bien sûr, quelle est votre question ?", time: "09:20" },
  { id: "c3", sender: "student", text: "Je bloque sur la partie QuickSort, la partition ne fonctionne pas.", time: "09:42" },
  { id: "c4", sender: "me", text: "Regardez la diapositive 18 du cours 2, il y a un exemple détaillé de la fonction de partition.", time: "09:50" },
  { id: "c5", sender: "student", text: "Merci ! C'est beaucoup plus clair maintenant.", time: "10:05" },
  { id: "c6", sender: "student", text: "Bonjour Dr. Dupont, j'ai une question sur le TP.", time: "10:32" },
];

export function ProfMessagesScreen() {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const filtered = profMessages.filter((m) =>
    m.student.toLowerCase().includes(search.toLowerCase()) ||
    m.course.toLowerCase().includes(search.toLowerCase())
  );

  if (activeChat) {
    const chat = profMessages.find((m) => m.id === activeChat)!;
    return (
      <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
        <div style={{ background: "linear-gradient(160deg, #1a0533 0%, #3A0CA3 50%, #4361EE 100%)" }}>
          <StatusBar light />
          <div className="flex items-center gap-3 px-5 pb-4 pt-1">
            <button
              onClick={() => setActiveChat(null)}
              style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}
            >
              <ArrowLeft size={18} style={{ color: "white" }} />
            </button>
            <div
              className="flex items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #4361EE, #3A0CA3)" }}
            >
              <span style={{ fontSize: 12, fontWeight: 800, color: "white" }}>{chat.avatar}</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{chat.student}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                {chat.course} · {chat.online ? "En ligne" : "Hors ligne"}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {mockChat.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                style={{
                  maxWidth: "78%",
                  padding: "10px 14px",
                  borderRadius: msg.sender === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.sender === "me" ? "linear-gradient(135deg, #4361EE, #3A0CA3)" : "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <p style={{ fontSize: 13, color: msg.sender === "me" ? "white" : "#1A1D2E", lineHeight: 1.5 }}>
                  {msg.text}
                </p>
                <p style={{ fontSize: 10, color: msg.sender === "me" ? "rgba(255,255,255,0.6)" : "#9CA3AF", marginTop: 4, textAlign: "right" }}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: "white", borderTop: "1px solid #F0F2FA" }}
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Répondre à l'étudiant..."
            className="flex-1 outline-none"
            style={{
              height: 44,
              borderRadius: 14,
              border: "1.5px solid #E5E7EB",
              padding: "0 14px",
              fontSize: 14,
              color: "#1A1D2E",
              background: "#F9FAFB",
            }}
            onKeyDown={(e) => { if (e.key === "Enter") setMessage(""); }}
          />
          <button
            onClick={() => setMessage("")}
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "linear-gradient(135deg, #4361EE, #3A0CA3)",
              border: "none",
            }}
          >
            <Send size={18} style={{ color: "white" }} />
          </button>
        </div>
      </div>
    );
  }

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
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Messages</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Chat avec vos étudiants</p>
          </div>
          <div
            style={{ fontSize: 12, fontWeight: 700, color: "#EF476F", background: "#FEE2E8", padding: "3px 10px", borderRadius: 10 }}
          >
            {profMessages.reduce((a, m) => a + m.unread, 0)} non lus
          </div>
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
            placeholder="Rechercher..."
            className="flex-1 outline-none bg-transparent"
            style={{ fontSize: 13, color: "white" }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4" style={{ paddingBottom: 20 }}>
        <div className="flex flex-col gap-3">
          {filtered.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setActiveChat(msg.id)}
              className="flex items-center gap-3 text-left w-full"
              style={{
                background: "white",
                borderRadius: 18,
                padding: "14px 16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                border: "none",
              }}
            >
              <div className="relative flex-shrink-0">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${msg.color}, #3A0CA3)`,
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 800, color: "white" }}>{msg.avatar}</span>
                </div>
                {msg.online && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#06D6A0",
                      border: "2px solid white",
                    }}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1D2E" }}>{msg.student}</p>
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>{msg.time}</span>
                </div>
                <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 2 }}>{msg.course}</p>
                <p
                  style={{
                    fontSize: 12,
                    color: msg.unread > 0 ? "#374151" : "#9CA3AF",
                    fontWeight: msg.unread > 0 ? 600 : 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {msg.lastMessage}
                </p>
              </div>

              {msg.unread > 0 && (
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#EF476F",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{msg.unread}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
