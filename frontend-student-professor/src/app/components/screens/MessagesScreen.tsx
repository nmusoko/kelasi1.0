import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, ArrowLeft, Send, Phone, Video } from "lucide-react";
import { StatusBar } from "../StatusBar";
import { messages, chatMessages } from "../../data/mockData";

function Avatar({ initials, color, size = 48, online }: { initials: string; color: string; size?: number; online?: boolean }) {
  return (
    <div className="relative flex-shrink-0">
      <div
        className="flex items-center justify-center"
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.35,
          background: `${color}20`,
          border: `2px solid ${color}40`,
        }}
      >
        <span style={{ fontSize: size * 0.3, fontWeight: 700, color }}>{initials}</span>
      </div>
      {online !== undefined && (
        <div
          style={{
            position: "absolute",
            bottom: 1,
            right: 1,
            width: size * 0.25,
            height: size * 0.25,
            borderRadius: "50%",
            background: online ? "#06D6A0" : "#D1D5DB",
            border: "2px solid white",
          }}
        />
      )}
    </div>
  );
}

function MessagesList({ onSelect }: { onSelect: (id: string) => void }) {
  const [search, setSearch] = useState("");
  const filtered = messages.filter(
    (m) =>
      m.contact.toLowerCase().includes(search.toLowerCase()) ||
      m.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #3A0CA3 0%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="px-5 pb-5 pt-1">
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "white" }}>Messages</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
            {messages.filter((m) => m.unread > 0).length} message(s) non lu(s)
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <div
          className="flex items-center gap-3 px-4"
          style={{ height: 48, background: "white", borderRadius: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          <Search size={18} style={{ color: "#9CA3AF" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une conversation..."
            className="flex-1 outline-none bg-transparent"
            style={{ fontSize: 14, color: "#1A1D2E" }}
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2" style={{ paddingBottom: 80 }}>
        {filtered.map((msg) => (
          <button
            key={msg.id}
            onClick={() => onSelect(msg.id)}
            className="flex items-center gap-3 p-4 text-left"
            style={{
              background: msg.unread > 0 ? "white" : "white",
              borderRadius: 18,
              boxShadow: msg.unread > 0 ? "0 4px 12px rgba(67,97,238,0.12)" : "0 2px 8px rgba(0,0,0,0.05)",
              border: msg.unread > 0 ? "1.5px solid #EEF1FD" : "1.5px solid transparent",
            }}
          >
            <Avatar initials={msg.avatar} color={msg.color} size={48} online={msg.online} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p style={{ fontSize: 14, fontWeight: msg.unread > 0 ? 700 : 600, color: "#1A1D2E" }}>
                  {msg.contact}
                </p>
                <span style={{ fontSize: 11, color: msg.unread > 0 ? "#4361EE" : "#9CA3AF", fontWeight: msg.unread > 0 ? 600 : 400 }}>
                  {msg.time}
                </span>
              </div>
              <p style={{ fontSize: 11, color: msg.color, fontWeight: 600, marginBottom: 2 }}>{msg.course}</p>
              <div className="flex items-center justify-between">
                <p style={{
                  fontSize: 12,
                  color: msg.unread > 0 ? "#4B5563" : "#9CA3AF",
                  fontWeight: msg.unread > 0 ? 500 : 400,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 200,
                }}>
                  {msg.lastMessage}
                </p>
                {msg.unread > 0 && (
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: "#4361EE",
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{msg.unread}</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatDetail({ chatId, onBack }: { chatId: string; onBack: () => void }) {
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState(chatMessages[chatId] || []);
  const contact = messages.find((m) => m.id === chatId);
  if (!contact) return null;

  const send = () => {
    if (!input.trim()) return;
    setLocalMessages((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, sender: "me", text: input.trim(), time: "À l'instant" },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #3A0CA3 0%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="flex items-center gap-3 px-4 pb-4 pt-1">
          <button
            onClick={onBack}
            className="flex items-center justify-center"
            style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.15)" }}
          >
            <ArrowLeft size={18} style={{ color: "white" }} />
          </button>
          <Avatar initials={contact.avatar} color="white" size={38} online={contact.online} />
          <div className="flex-1">
            <p style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{contact.contact}</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>
              {contact.online ? "En ligne" : "Hors ligne"} — {contact.course}
            </p>
          </div>
          <div className="flex gap-2">
            {[Phone, Video].map((Icon, i) => (
              <button
                key={i}
                className="flex items-center justify-center"
                style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.15)" }}
              >
                <Icon size={16} style={{ color: "white" }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {/* Date */}
        <div className="flex justify-center">
          <span
            style={{
              fontSize: 11, color: "#9CA3AF", background: "white",
              borderRadius: 20, padding: "3px 12px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            Aujourd'hui
          </span>
        </div>
        {localMessages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
            {msg.sender !== "me" && (
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 30, height: 30, borderRadius: 9,
                  background: `${contact.color}20`,
                  fontSize: 10, fontWeight: 700, color: contact.color,
                }}
              >
                {contact.avatar}
              </div>
            )}
            <div style={{ maxWidth: "72%" }}>
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: msg.sender === "me" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.sender === "me"
                    ? "linear-gradient(135deg, #4361EE, #3A0CA3)"
                    : "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <p style={{ fontSize: 13, color: msg.sender === "me" ? "white" : "#1A1D2E", lineHeight: 1.5 }}>
                  {msg.text}
                </p>
              </div>
              <p style={{ fontSize: 10, color: "#C4C9D4", marginTop: 3, textAlign: msg.sender === "me" ? "right" : "left" }}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: "white",
          borderTop: "1px solid #F0F2FA",
          paddingBottom: 16,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Écrire un message..."
          className="flex-1 outline-none bg-transparent"
          style={{
            fontSize: 13, color: "#1A1D2E",
            padding: "10px 14px",
            background: "#F8F9FF",
            borderRadius: 14,
          }}
        />
        <button
          onClick={send}
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 42, height: 42, borderRadius: 13,
            background: input.trim()
              ? "linear-gradient(135deg, #4361EE, #3A0CA3)"
              : "#F0F2FA",
            transition: "all 0.2s",
          }}
        >
          <Send size={16} style={{ color: input.trim() ? "white" : "#9CA3AF" }} />
        </button>
      </div>
    </div>
  );
}

export function MessagesScreen() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  if (selectedChat) {
    return <ChatDetail chatId={selectedChat} onBack={() => setSelectedChat(null)} />;
  }
  return <MessagesList onSelect={setSelectedChat} />;
}
