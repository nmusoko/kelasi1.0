import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Clock, BookOpen } from "lucide-react";
import { StatusBar } from "../StatusBar";
import { calendarEvents, courses } from "../../data/mockData";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  // Monday-based (0=Mon)
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function CalendarScreen() {
  const navigate = useNavigate();
  const today = new Date();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2); // March 2026 (0-indexed)
  const [selectedDay, setSelectedDay] = useState(4); // March 4

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const eventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return calendarEvents.filter((e) => e.date === dateStr);
  };

  const selectedDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
  const selectedEvents = calendarEvents.filter((e) => e.date === selectedDateStr);

  const typeConfig = {
    assignment: { label: "Devoir", color: "#FFB703", bg: "#FFF8E6" },
    class: { label: "Cours", color: "#4361EE", bg: "#EEF1FD" },
    exam: { label: "Examen", color: "#EF476F", bg: "#FFF0F3" },
  };

  const upcomingAssignments = calendarEvents
    .filter((e) => e.type === "assignment" && new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #3A0CA3 0%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="flex items-center justify-between px-5 pb-5 pt-1">
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "white" }}>Calendrier</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>
              {upcomingAssignments.length} échéances à venir
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 14,
              padding: "8px 14px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>
              S{Math.ceil(selectedDay / 7)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {/* Calendar widget */}
        <div
          className="mx-4 mt-4"
          style={{
            background: "white",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
          }}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between px-5 py-4">
            <button
              onClick={() => {
                if (month === 0) { setMonth(11); setYear(y => y - 1); }
                else setMonth(m => m - 1);
              }}
              className="flex items-center justify-center"
              style={{ width: 32, height: 32, borderRadius: 10, background: "#F0F2FA" }}
            >
              <ChevronLeft size={16} style={{ color: "#6B7280" }} />
            </button>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1A1D2E" }}>
              {MONTHS[month]} {year}
            </h2>
            <button
              onClick={() => {
                if (month === 11) { setMonth(0); setYear(y => y + 1); }
                else setMonth(m => m + 1);
              }}
              className="flex items-center justify-center"
              style={{ width: 32, height: 32, borderRadius: 10, background: "#F0F2FA" }}
            >
              <ChevronRight size={16} style={{ color: "#6B7280" }} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid px-3" style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {DAYS.map((d) => (
              <div key={d} className="flex items-center justify-center py-1">
                <span style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF" }}>{d}</span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid px-3 pb-4" style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {/* Empty cells */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selectedDay;
              const dayEvents = eventsForDay(day);
              const hasAssignment = dayEvents.some((e) => e.type === "assignment");
              const hasExam = dayEvents.some((e) => e.type === "exam");
              const hasClass = dayEvents.some((e) => e.type === "class");

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className="flex flex-col items-center gap-0.5 py-1"
                  style={{ borderRadius: 10 }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 32, height: 32, borderRadius: 10,
                      background: isSelected
                        ? "linear-gradient(135deg, #4361EE, #3A0CA3)"
                        : isToday
                        ? "#EEF1FD"
                        : "transparent",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: isSelected || isToday ? 700 : 400,
                        color: isSelected ? "white" : isToday ? "#4361EE" : "#1A1D2E",
                      }}
                    >
                      {day}
                    </span>
                  </div>
                  {/* Event dots */}
                  <div className="flex gap-0.5">
                    {hasAssignment && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FFB703" }} />}
                    {hasExam && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#EF476F" }} />}
                    {hasClass && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4361EE" }} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 px-5 py-3" style={{ borderTop: "1px solid #F0F2FA" }}>
            {[
              { label: "Cours", color: "#4361EE" },
              { label: "Devoir", color: "#FFB703" },
              { label: "Examen", color: "#EF476F" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected day events */}
        <div className="px-4 mt-4">
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E", marginBottom: 12 }}>
            {selectedDay} {MONTHS[month]}
            {selectedEvents.length === 0
              ? " — Aucun événement"
              : ` — ${selectedEvents.length} événement${selectedEvents.length > 1 ? "s" : ""}`}
          </h3>
          {selectedEvents.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-3 py-8"
              style={{ background: "white", borderRadius: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
            >
              <BookOpen size={36} style={{ color: "#D1D5DB" }} />
              <p style={{ fontSize: 14, color: "#9CA3AF" }}>Journée libre 🎉</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedEvents.map((event) => {
                const cfg = typeConfig[event.type as keyof typeof typeConfig];
                const course = courses.find((c) => c.code === event.course);
                return (
                  <button
                    key={event.id}
                    onClick={() => course && navigate(`/app/courses/${course.id}`)}
                    className="flex items-center gap-3 p-4 text-left"
                    style={{
                      background: "white",
                      borderRadius: 18,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      borderLeft: `4px solid ${event.color}`,
                    }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 44, height: 44, borderRadius: 13,
                        background: `${event.color}18`,
                      }}
                    >
                      {event.type === "assignment" ? (
                        <Clock size={20} style={{ color: event.color }} />
                      ) : (
                        <BookOpen size={20} style={{ color: event.color }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1D2E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {event.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: cfg.color,
                            background: cfg.bg,
                            padding: "1px 7px",
                            borderRadius: 5,
                          }}
                        >
                          {cfg.label}
                        </span>
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>
                          {event.time && event.time !== "23:59" ? event.time : "À minuit"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming deadlines section */}
        <div className="px-4 mt-5 mb-4">
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E", marginBottom: 12 }}>
            🔔 Prochaines échéances
          </h3>
          <div className="flex flex-col gap-2">
            {upcomingAssignments.slice(0, 5).map((event) => {
              const eventDate = new Date(event.date);
              const diff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              const urgency = diff <= 2 ? "#EF476F" : diff <= 5 ? "#FFB703" : "#4361EE";
              return (
                <div
                  key={event.id}
                  className="flex items-center gap-3 px-4 py-3"
                  style={{
                    background: "white",
                    borderRadius: 14,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: event.color, flexShrink: 0,
                    }}
                  />
                  <p style={{ fontSize: 12, color: "#4B5563", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {event.title}
                  </p>
                  <span
                    style={{
                      fontSize: 11, fontWeight: 700, color: urgency,
                      background: `${urgency}18`,
                      padding: "2px 8px", borderRadius: 6, flexShrink: 0,
                    }}
                  >
                    J-{diff}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
