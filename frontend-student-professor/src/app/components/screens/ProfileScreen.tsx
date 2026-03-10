import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User, Mail, Phone, MapPin, BookOpen, Award,
  Bell, Shield, HelpCircle, LogOut, ChevronRight,
  Settings, GraduationCap, TrendingUp, Edit3
} from "lucide-react";
import { StatusBar } from "../StatusBar";
import { currentUser, courses } from "../../data/mockData";

function StatCard({ value, label, color }: { value: string | number; label: string; color: string }) {
  return (
    <div
      className="flex-1 flex flex-col items-center gap-1 py-4"
      style={{
        background: "white",
        borderRadius: 18,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <span style={{ fontSize: 22, fontWeight: 800, color }}>{value}</span>
      <span style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", lineHeight: 1.3 }}>{label}</span>
    </div>
  );
}

function SettingRow({
  icon: Icon,
  label,
  sublabel,
  color = "#4361EE",
  bg = "#EEF1FD",
  action,
  danger,
}: {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  color?: string;
  bg?: string;
  action?: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-3.5"
      style={{ borderBottom: "1px solid #F8F9FF" }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: 38, height: 38, borderRadius: 12, background: danger ? "#FFF0F3" : bg }}
      >
        <Icon size={18} style={{ color: danger ? "#EF476F" : color }} />
      </div>
      <div className="flex-1 text-left">
        <p style={{ fontSize: 14, fontWeight: 600, color: danger ? "#EF476F" : "#1A1D2E" }}>{label}</p>
        {sublabel && <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>{sublabel}</p>}
      </div>
      {action || <ChevronRight size={16} style={{ color: "#D1D5DB" }} />}
    </button>
  );
}

export function ProfileScreen() {
  const navigate = useNavigate();
  const [notificationsOn, setNotificationsOn] = useState(true);

  const avgGrade = currentUser.gpa;
  const gradeColor = avgGrade >= 16 ? "#06D6A0" : avgGrade >= 12 ? "#FFB703" : "#EF476F";
  const mention = avgGrade >= 16 ? "Très Bien" : avgGrade >= 14 ? "Bien" : avgGrade >= 12 ? "Assez Bien" : "Passable";

  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #3A0CA3 0%, #4361EE 100%)" }}>
        <StatusBar light />
        <div className="flex items-center justify-between px-5 pb-6 pt-2">
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "white" }}>Profil</h1>
          <button
            className="flex items-center justify-center"
            style={{
              width: 38, height: 38, borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Settings size={18} style={{ color: "white" }} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {/* Profile card */}
        <div className="px-4" style={{ marginTop: -20 }}>
          <div
            style={{
              background: "white",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(67,97,238,0.12)",
            }}
          >
            {/* Avatar section */}
            <div
              className="flex flex-col items-center gap-3 py-6"
              style={{
                background: "linear-gradient(180deg, #F5F7FF 0%, white 100%)",
              }}
            >
              <div className="relative">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 24,
                    background: "linear-gradient(135deg, #4361EE, #3A0CA3)",
                    boxShadow: "0 8px 24px rgba(67,97,238,0.4)",
                  }}
                >
                  <span style={{ fontSize: 28, fontWeight: 800, color: "white" }}>KB</span>
                </div>
                <button
                  className="absolute flex items-center justify-center"
                  style={{
                    bottom: -4, right: -4,
                    width: 26, height: 26, borderRadius: 8,
                    background: "#4361EE", border: "2px solid white",
                  }}
                >
                  <Edit3 size={12} style={{ color: "white" }} />
                </button>
              </div>
              <div className="text-center">
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1D2E" }}>{currentUser.name}</h2>
                <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{currentUser.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontSize: 11, fontWeight: 700,
                    color: "#4361EE", background: "#EEF1FD",
                    padding: "3px 10px", borderRadius: 8,
                  }}
                >
                  {currentUser.year}
                </span>
                <span
                  style={{
                    fontSize: 11, fontWeight: 700,
                    color: "#7B2FBE", background: "#F0E8FD",
                    padding: "3px 10px", borderRadius: 8,
                  }}
                >
                  {currentUser.faculty}
                </span>
              </div>
            </div>

            {/* Personal info */}
            <div className="flex flex-col px-5 py-4" style={{ borderTop: "1px solid #F0F2FA" }}>
              {[
                { icon: Mail, text: currentUser.email, color: "#4361EE" },
                { icon: Phone, text: currentUser.phone, color: "#7B2FBE" },
                { icon: MapPin, text: currentUser.address, color: "#EF476F" },
                { icon: GraduationCap, text: currentUser.department, color: "#06D6A0" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2.5"
                    style={{ borderBottom: i < 3 ? "1px solid #F8F9FF" : "none" }}
                  >
                    <Icon size={15} style={{ color: item.color, flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: "#4B5563" }}>{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 px-4 mt-4">
          <StatCard value={`${avgGrade}/20`} label="Moyenne générale" color={gradeColor} />
          <StatCard value={mention} label="Mention" color={gradeColor} />
          <StatCard value={`${currentUser.credits}`} label="Crédits ECTS" color="#4361EE" />
        </div>

        {/* Course grades */}
        <div className="px-4 mt-4">
          <div
            style={{
              background: "white",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-center gap-2 px-4 py-4">
              <TrendingUp size={16} style={{ color: "#4361EE" }} />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1D2E" }}>Mes notes par cours</h3>
            </div>
            {courses.map((course, i) => {
              const grade = [14.8, 13.4, 12.0, 15.5, 16.0][i] || 14;
              const gradeColor = grade >= 15 ? "#06D6A0" : grade >= 12 ? "#FFB703" : "#EF476F";
              return (
                <div
                  key={course.id}
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ borderTop: "1px solid #F8F9FF" }}
                >
                  <div
                    style={{ width: 8, height: 8, borderRadius: "50%", background: course.color, flexShrink: 0 }}
                  />
                  <p style={{ fontSize: 13, color: "#4B5563", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {course.shortName}
                  </p>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 14, fontWeight: 800, color: gradeColor }}>
                      {grade.toFixed(1)}
                    </span>
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>/20</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="px-4 mt-4">
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF", marginBottom: 8, paddingLeft: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>
            Paramètres
          </h3>
          <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <SettingRow
              icon={Bell}
              label="Notifications"
              sublabel="Activer les rappels et alertes"
              color="#FFB703"
              bg="#FFF8E6"
              action={
                <div
                  onClick={(e) => { e.stopPropagation(); setNotificationsOn(!notificationsOn); }}
                  style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: notificationsOn ? "#4361EE" : "#E5E7EB",
                    position: "relative", cursor: "pointer", transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      position: "absolute", top: 2,
                      left: notificationsOn ? 22 : 2,
                      width: 20, height: 20, borderRadius: "50%",
                      background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      transition: "left 0.2s",
                    }}
                  />
                </div>
              }
            />
            <SettingRow
              icon={Shield}
              label="Confidentialité"
              sublabel="Gérer vos données personnelles"
              color="#7B2FBE"
              bg="#F0E8FD"
            />
            <SettingRow
              icon={HelpCircle}
              label="Aide & Support"
              sublabel="FAQ et contact support"
              color="#06D6A0"
              bg="#E6FAF5"
            />
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 mt-4 mb-4">
          <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <SettingRow
              icon={LogOut}
              label="Se déconnecter"
              color="#EF476F"
              bg="#FFF0F3"
              danger
            />
          </div>
        </div>

        <p style={{ fontSize: 11, color: "#D1D5DB", textAlign: "center", paddingBottom: 16 }}>
          Kelasi v2.4.0 © 2026
        </p>
      </div>
    </div>
  );
}