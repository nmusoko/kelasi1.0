import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Eye, EyeOff, Lock, Mail, ArrowRight, GraduationCap, BookOpen,
  User, Phone, Building2, ChevronLeft, CheckCircle2, AlertCircle,
  Sparkles, Shield, Zap,
} from "lucide-react";
import { StatusBar } from "../StatusBar";
import { motion, AnimatePresence } from "motion/react";
import kelasiLogo from "../../../assets/kelasi-logo.png";
import { useDeviceLayout } from "../../contexts/DeviceContext";
type Role = "student" | "professor";
type Screen = "login" | "register" | "success";

// ── shared input field ────────────────────────────────────────────────────────
function InputField({
  label, icon: Icon, type = "text", value, onChange, placeholder,
  onFocus, onBlur, focused, error, rightEl,
}: {
  label: string; icon: React.ElementType; type?: string;
  value: string; onChange: (v: string) => void; placeholder: string;
  onFocus: () => void; onBlur: () => void; focused: boolean;
  error?: string; rightEl?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: 0.4 }}>
        {label}
      </label>
      <div
        className="flex items-center gap-3 px-4"
        style={{
          height: 50,
          borderRadius: 14,
          border: `1.5px solid ${error ? "#EF476F" : focused ? "#4361EE" : "#E5E7EB"}`,
          background: error ? "#FFF5F7" : focused ? "#F5F7FF" : "#F9FAFB",
          transition: "all 0.2s",
        }}
      >
        <Icon size={17} style={{ color: error ? "#EF476F" : focused ? "#4361EE" : "#9CA3AF", flexShrink: 0 }} />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent"
          style={{ fontSize: 13, color: "#1A1D2E" }}
        />
        {rightEl}
      </div>
      {error && (
        <div className="flex items-center gap-1">
          <AlertCircle size={11} style={{ color: "#EF476F" }} />
          <p style={{ fontSize: 11, color: "#EF476F" }}>{error}</p>
        </div>
      )}
    </div>
  );
}

// ── web hero panel ────────────────────────────────────────────────────────────
function WebHeroPanel({ role }: { role: Role }) {
  const features = [
    { icon: Sparkles, text: "Accédez à tous vos cours et matériels en un clic" },
    { icon: Shield,   text: "Plateforme sécurisée et certifiée pour l'université" },
    { icon: Zap,      text: "Suivi en temps réel des devoirs et résultats" },
  ];

  return (
    <div
      className="flex flex-col justify-between"
      style={{
        background: "linear-gradient(160deg, #1a0533 0%, #3A0CA3 55%, #4361EE 100%)",
        padding: "48px 40px",
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Background decoration */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(67,97,238,0.2)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(114,9,183,0.2)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", left: "60%", width: 180, height: 180, borderRadius: "50%", background: "rgba(76,201,240,0.1)", pointerEvents: "none" }} />

      {/* Logo + name */}
      <div className="flex items-center gap-4" style={{ position: "relative" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: "rgba(255,255,255,0.95)",
            padding: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          <img src={kelasiLogo} alt="Kelasi" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div>
          <p style={{ fontSize: 22, fontWeight: 800, color: "white", lineHeight: 1 }}>Kelasi</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, marginTop: 3 }}>UNIVERSITY APP</p>
        </div>
      </div>

      {/* Center content */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 20,
            padding: "6px 14px",
            marginBottom: 24,
          }}
        >
          {role === "student" ? <GraduationCap size={14} style={{ color: "#4CC9F0" }} /> : <BookOpen size={14} style={{ color: "#4CC9F0" }} />}
          <span style={{ fontSize: 12, fontWeight: 700, color: "#4CC9F0", letterSpacing: 0.5 }}>
            {role === "student" ? "Espace Étudiant" : "Espace Professeur"}
          </span>
        </div>

        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            marginBottom: 14,
          }}
        >
          {role === "student"
            ? "Votre université\ndans votre poche"
            : "Gérez vos cours\nfacilement"}
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, maxWidth: 320 }}>
          {role === "student"
            ? "Suivez vos cours, consultez vos notes et restez connecté à votre campus depuis n'importe où."
            : "Publiez des cours, corrigez des devoirs et suivez la progression de vos étudiants en temps réel."}
        </p>

        {/* Feature list */}
        <div className="flex flex-col gap-3" style={{ marginTop: 32 }}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.text} className="flex items-center gap-3">
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={15} style={{ color: "rgba(255,255,255,0.85)" }} />
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{f.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ position: "relative" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}>
          Kelasi © 2026 · Université de Kinshasa
        </p>
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export function LoginScreen() {
  const navigate = useNavigate();
  const device = useDeviceLayout();
  const isWeb = device === "ipad" || device === "desktop";

  const [screen, setScreen] = useState<Screen>("login");
  const [role, setRole] = useState<Role>("student");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // login state
  const [loginEmail, setLoginEmail] = useState("beni.daniel@kelasi.com");
  const [loginPassword, setLoginPassword] = useState("••••••••");
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  // register state
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regDept, setRegDept] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setLoginEmail(newRole === "student" ? "beni.daniel@kelasi.com" : "marie.dupont@kelasi.com");
    setLoginPassword("••••••••");
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(role === "professor" ? "/prof/dashboard" : "/app/dashboard");
    }, 1500);
  };

  const validateRegister = () => {
    const e: Record<string, string> = {};
    if (!regFirstName.trim()) e.firstName = "Prénom requis";
    if (!regLastName.trim())  e.lastName  = "Nom requis";
    if (!regEmail.trim() || !regEmail.includes("@")) e.email = "Email invalide";
    if (role === "professor" && !regDept.trim()) e.dept = "Département requis";
    if (regPassword.length < 6) e.password = "6 caractères minimum";
    if (regPassword !== regConfirm) e.confirm = "Les mots de passe ne correspondent pas";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = () => {
    if (!validateRegister()) return;
    setRegLoading(true);
    setTimeout(() => { setRegLoading(false); setScreen("success"); }, 1800);
  };

  const focus = (f: string) => () => setFocusedField(f);
  const blur = () => setFocusedField(null);
  const isFocused = (f: string) => focusedField === f;

  const pwdStrength = (() => {
    if (!regPassword) return 0;
    let s = 0;
    if (regPassword.length >= 6)  s++;
    if (regPassword.length >= 10) s++;
    if (/[A-Z]/.test(regPassword)) s++;
    if (/[0-9]/.test(regPassword)) s++;
    if (/[^a-zA-Z0-9]/.test(regPassword)) s++;
    return s;
  })();
  const pwdColors = ["#EF476F", "#EF476F", "#FFB703", "#06D6A0", "#06D6A0"];
  const pwdLabels = ["Très faible", "Faible", "Moyen", "Fort", "Très fort"];

  // ── form panel (shared between mobile + web right column) ────────────────
  const FormPanel = (
    <AnimatePresence mode="wait">

      {/* LOGIN */}
      {screen === "login" && (
        <motion.div
          key="login"
          initial={{ opacity: 0, y: isWeb ? 0 : 20, x: isWeb ? 16 : 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="flex flex-col gap-5"
        >
          <div>
            <h2 style={{ fontSize: isWeb ? 26 : 20, fontWeight: 800, color: "#1A1D2E", lineHeight: 1.2 }}>
              {role === "student" ? "Connexion Étudiant" : "Espace Professeur"}
            </h2>
            <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 6 }}>
              {role === "student"
                ? "Connectez-vous à votre espace Kelasi"
                : "Accédez à votre tableau de bord enseignant"}
            </p>
          </div>

          {/* Role selector */}
          <div
            className="flex items-center"
            style={{
              background: "#F3F4F6",
              borderRadius: 14,
              padding: 4,
              border: "1px solid #E5E7EB",
            }}
          >
            {([
              { key: "student",   label: "Étudiant",   icon: GraduationCap },
              { key: "professor", label: "Professeur",  icon: BookOpen },
            ] as { key: Role; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleRoleChange(key)}
                className="flex-1 flex items-center justify-center gap-2"
                style={{
                  height: 40,
                  borderRadius: 11,
                  background: role === key ? "white" : "transparent",
                  color: role === key ? "#4361EE" : "#9CA3AF",
                  fontWeight: role === key ? 700 : 500,
                  fontSize: 13,
                  boxShadow: role === key ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.2s",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>

          <InputField
            label={role === "student" ? "IDENTIFIANT / EMAIL" : "EMAIL PROFESSEUR"}
            icon={Mail}
            value={loginEmail}
            onChange={setLoginEmail}
            placeholder={role === "student" ? "exemple@kelasi.app" : "prof@kelasi.app"}
            onFocus={focus("email")} onBlur={blur} focused={isFocused("email")}
          />

          <InputField
            label="MOT DE PASSE"
            icon={Lock}
            type={showLoginPwd ? "text" : "password"}
            value={loginPassword}
            onChange={setLoginPassword}
            placeholder="Votre mot de passe"
            onFocus={focus("password")} onBlur={blur} focused={isFocused("password")}
            rightEl={
              <button onClick={() => setShowLoginPwd(!showLoginPwd)}>
                {showLoginPwd ? <EyeOff size={17} style={{ color: "#9CA3AF" }} /> : <Eye size={17} style={{ color: "#9CA3AF" }} />}
              </button>
            }
          />

          <div className="flex justify-end" style={{ marginTop: -8 }}>
            <button style={{ fontSize: 13, color: "#4361EE", fontWeight: 600 }}>
              Mot de passe oublié ?
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3"
            style={{
              height: 54,
              borderRadius: 16,
              background: loading ? "#A5B4FC" : "linear-gradient(135deg, #4361EE, #3A0CA3)",
              color: "white",
              fontWeight: 700,
              fontSize: 15,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 24px rgba(67,97,238,0.35)",
            }}
          >
            {loading ? (
              <div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            ) : (
              <>
                {role === "student" ? "Se connecter" : "Accéder au tableau de bord"}
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="flex items-center gap-3">
            <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>ou</span>
            <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
          </div>

          <button
            onClick={() => setScreen("register")}
            className="flex items-center justify-center gap-2"
            style={{
              height: 50,
              borderRadius: 14,
              border: "1.5px solid #C7D2FE",
              background: "#F5F7FF",
              color: "#4361EE",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            <User size={16} />
            Créer un compte Kelasi
          </button>
        </motion.div>
      )}

      {/* REGISTER */}
      {screen === "register" && (
        <motion.div
          key="register"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="flex flex-col gap-4"
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setScreen("login"); setErrors({}); }}
              style={{
                width: 36, height: 36, borderRadius: 11,
                background: "#F3F4F6",
                display: "flex", alignItems: "center", justifyContent: "center", border: "none",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={18} style={{ color: "#6B7280" }} />
            </button>
            <div>
              <h2 style={{ fontSize: isWeb ? 22 : 18, fontWeight: 800, color: "#1A1D2E" }}>Créer un compte</h2>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                {role === "student" ? "Espace étudiant" : "Espace professeur"}
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: 0.4 }}>PRÉNOM</label>
            <div
              className="flex items-center gap-2 px-3"
              style={{
                height: 48, borderRadius: 13,
                border: `1.5px solid ${errors.firstName ? "#EF476F" : isFocused("fn") ? "#4361EE" : "#E5E7EB"}`,
                background: errors.firstName ? "#FFF5F7" : isFocused("fn") ? "#F5F7FF" : "#F9FAFB",
                transition: "all 0.2s",
              }}
            >
              <User size={15} style={{ color: errors.firstName ? "#EF476F" : isFocused("fn") ? "#4361EE" : "#9CA3AF", flexShrink: 0 }} />
              <input value={regFirstName} onChange={(e) => setRegFirstName(e.target.value)}
                onFocus={focus("fn")} onBlur={blur} placeholder="Beni"
                className="flex-1 outline-none bg-transparent" style={{ fontSize: 13, color: "#1A1D2E", minWidth: 0 }} />
            </div>
            {errors.firstName && <p style={{ fontSize: 10, color: "#EF476F" }}>{errors.firstName}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: 0.4 }}>NOM</label>
            <div
              className="flex items-center gap-2 px-3"
              style={{
                height: 48, borderRadius: 13,
                border: `1.5px solid ${errors.lastName ? "#EF476F" : isFocused("ln") ? "#4361EE" : "#E5E7EB"}`,
                background: errors.lastName ? "#FFF5F7" : isFocused("ln") ? "#F5F7FF" : "#F9FAFB",
                transition: "all 0.2s",
              }}
            >
              <User size={15} style={{ color: errors.lastName ? "#EF476F" : isFocused("ln") ? "#4361EE" : "#9CA3AF", flexShrink: 0 }} />
              <input value={regLastName} onChange={(e) => setRegLastName(e.target.value)}
                onFocus={focus("ln")} onBlur={blur} placeholder="Daniel"
                className="flex-1 outline-none bg-transparent" style={{ fontSize: 13, color: "#1A1D2E", minWidth: 0 }} />
            </div>
            {errors.lastName && <p style={{ fontSize: 10, color: "#EF476F" }}>{errors.lastName}</p>}
          </div>

          <InputField label="ADRESSE EMAIL" icon={Mail} value={regEmail} onChange={setRegEmail}
            placeholder={role === "student" ? "prenom.nom@kelasi.app" : "prof@universite.cd"}
            onFocus={focus("regemail")} onBlur={blur} focused={isFocused("regemail")} error={errors.email} />

          <InputField label="TÉLÉPHONE" icon={Phone} type="tel" value={regPhone} onChange={setRegPhone}
            placeholder="+243 81 000 0000" onFocus={focus("phone")} onBlur={blur} focused={isFocused("phone")} />

          {role === "professor" && (
            <InputField label="DÉPARTEMENT / FACULTÉ" icon={Building2} value={regDept} onChange={setRegDept}
              placeholder="Ex: Faculté d'Informatique" onFocus={focus("dept")} onBlur={blur} focused={isFocused("dept")} error={errors.dept} />
          )}

          {/* Password */}
          <div className="flex flex-col gap-2">
            <InputField label="MOT DE PASSE" icon={Lock} type={showRegPwd ? "text" : "password"}
              value={regPassword} onChange={setRegPassword} placeholder="6 caractères minimum"
              onFocus={focus("regpwd")} onBlur={blur} focused={isFocused("regpwd")} error={errors.password}
              rightEl={
                <button onClick={() => setShowRegPwd(!showRegPwd)}>
                  {showRegPwd ? <EyeOff size={16} style={{ color: "#9CA3AF" }} /> : <Eye size={16} style={{ color: "#9CA3AF" }} />}
                </button>
              } />
            {regPassword.length > 0 && (
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= pwdStrength ? pwdColors[pwdStrength - 1] : "#E5E7EB", transition: "background 0.3s" }} />
                  ))}
                </div>
                <p style={{ fontSize: 11, color: pwdStrength > 0 ? pwdColors[pwdStrength - 1] : "#9CA3AF", fontWeight: 600 }}>
                  {pwdStrength > 0 ? pwdLabels[pwdStrength - 1] : ""}
                </p>
              </div>
            )}
          </div>

          <InputField label="CONFIRMER LE MOT DE PASSE" icon={Lock} type={showConfirmPwd ? "text" : "password"}
            value={regConfirm} onChange={setRegConfirm} placeholder="Répéter le mot de passe"
            onFocus={focus("confirm")} onBlur={blur} focused={isFocused("confirm")} error={errors.confirm}
            rightEl={
              <button onClick={() => setShowConfirmPwd(!showConfirmPwd)}>
                {showConfirmPwd ? <EyeOff size={16} style={{ color: "#9CA3AF" }} /> : <Eye size={16} style={{ color: "#9CA3AF" }} />}
              </button>
            } />

          <p style={{ fontSize: 11, color: "#9CA3AF", lineHeight: 1.6 }}>
            En créant un compte, vous acceptez les{" "}
            <button style={{ color: "#4361EE", fontWeight: 600 }}>Conditions d'utilisation</button>{" "}
            et la{" "}
            <button style={{ color: "#4361EE", fontWeight: 600 }}>Politique de confidentialité</button>{" "}
            de Kelasi.
          </p>

          <button
            onClick={handleRegister}
            className="flex items-center justify-center gap-3"
            style={{
              height: 52, borderRadius: 16,
              background: regLoading ? "#A5B4FC" : "linear-gradient(135deg, #4361EE, #3A0CA3)",
              color: "white", fontWeight: 700, fontSize: 15, border: "none",
              cursor: regLoading ? "not-allowed" : "pointer",
              boxShadow: "0 8px 24px rgba(67,97,238,0.35)",
            }}
          >
            {regLoading
              ? <div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              : <><span>Créer mon compte</span><ArrowRight size={18} /></>}
          </button>

          <div className="flex items-center justify-center gap-1">
            <span style={{ fontSize: 13, color: "#9CA3AF" }}>Déjà inscrit ?</span>
            <button onClick={() => { setScreen("login"); setErrors({}); }} style={{ fontSize: 13, color: "#4361EE", fontWeight: 700 }}>
              Se connecter
            </button>
          </div>
        </motion.div>
      )}

      {/* SUCCESS */}
      {screen === "success" && (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, type: "spring", bounce: 0.3 }}
          className="flex flex-col items-center gap-6"
          style={{ textAlign: "center" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
            style={{
              width: 90, height: 90, borderRadius: "50%",
              background: "linear-gradient(135deg, #06D6A0, #0096C7)",
              boxShadow: "0 12px 32px rgba(6,214,160,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <CheckCircle2 size={44} style={{ color: "white" }} strokeWidth={2} />
          </motion.div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1A1D2E" }}>Compte créé !</h2>
            <p style={{ fontSize: 14, color: "#6B7280", marginTop: 8, lineHeight: 1.6 }}>
              Bienvenue sur Kelasi,{" "}
              <span style={{ color: "#4361EE", fontWeight: 700 }}>{regFirstName || "Utilisateur"}</span>.
              Votre compte {role === "student" ? "étudiant" : "professeur"} est prêt.
            </p>
          </div>

          <div className="w-full flex flex-col gap-2 p-4" style={{ background: "#F8F9FF", borderRadius: 16, border: "1px solid #E0E7FF" }}>
            {[
              { label: "Nom complet", value: `${regFirstName} ${regLastName}` },
              { label: "Email",       value: regEmail || "—" },
              { label: "Rôle",        value: role === "student" ? "Étudiant" : "Professeur" },
              ...(role === "professor" && regDept ? [{ label: "Département", value: regDept }] : []),
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center">
                <span style={{ fontSize: 12, color: "#9CA3AF" }}>{row.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1A1D2E" }}>{row.value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate(role === "professor" ? "/prof/dashboard" : "/app/dashboard")}
            className="w-full flex items-center justify-center gap-3"
            style={{
              height: 54, borderRadius: 16,
              background: "linear-gradient(135deg, #4361EE, #3A0CA3)",
              color: "white", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer",
              boxShadow: "0 8px 24px rgba(67,97,238,0.4)",
            }}
          >
            Accéder à Kelasi <ArrowRight size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ── WEB layout ───────────────────────────────────────────────────────────────
  if (isWeb) {
    return (
      <div
        className="flex"
        style={{ height: "100dvh", background: "#F0F2FA", overflow: "hidden" }}
      >
        {/* Left: hero panel */}
        <div style={{ flex: "0 0 45%", maxWidth: 520, height: "100%" }}>
          <WebHeroPanel role={role} />
        </div>

        {/* Right: form */}
        <div
          className="flex flex-col justify-center flex-1 overflow-y-auto"
          style={{ padding: "48px", background: "white" }}
        >
          <div style={{ maxWidth: 440, width: "100%", margin: "0 auto" }}>
            {FormPanel}
          </div>

          <p style={{ fontSize: 12, color: "#D1D5DB", textAlign: "center", marginTop: 32 }}>
            Kelasi © 2026 · Plateforme universitaire
          </p>
        </div>
      </div>
    );
  }

  // ── MOBILE layout ────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full" style={{ background: "#F0F2FA", overflowY: "auto" }}>
      {/* Gradient header */}
      <div
        style={{
          background: "linear-gradient(160deg, #3A0CA3 0%, #4361EE 100%)",
          paddingBottom: screen === "login" ? 48 : 32,
          borderRadius: "0 0 32px 32px",
          flexShrink: 0,
        }}
      >
        <StatusBar light />
        <div className="flex flex-col items-center pt-4 pb-2 gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center"
            style={{
              width: screen === "login" ? 84 : 60,
              height: screen === "login" ? 84 : 60,
              borderRadius: screen === "login" ? 24 : 18,
              background: "rgba(255,255,255,0.95)",
              border: "2px solid rgba(255,255,255,0.3)",
              boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
              padding: 6,
              transition: "all 0.4s",
            }}
          >
            <img src={kelasiLogo} alt="Kelasi" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Kelasi</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", letterSpacing: 2, marginTop: 2 }}>APPRENDS. ÉVOLUE. RÉUSSIS.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex items-center mt-1"
            style={{ background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: 4, border: "1px solid rgba(255,255,255,0.2)", width: 260 }}
          >
            {([
              { key: "student",   label: "Étudiant",   icon: GraduationCap },
              { key: "professor", label: "Professeur",  icon: BookOpen },
            ] as { key: Role; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleRoleChange(key)}
                className="flex-1 flex items-center justify-center gap-2"
                style={{
                  height: 38, borderRadius: 12,
                  background: role === key ? "white" : "transparent",
                  color: role === key ? "#4361EE" : "rgba(255,255,255,0.7)",
                  fontWeight: role === key ? 700 : 500,
                  fontSize: 13,
                  boxShadow: role === key ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                  transition: "all 0.2s",
                }}
              >
                <Icon size={15} />{label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Form card */}
      <div className="flex flex-col flex-1 px-6" style={{ marginTop: -24 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-5 p-6"
            style={{ background: "white", borderRadius: 24, boxShadow: "0 8px 32px rgba(67,97,238,0.12)" }}
          >
            {FormPanel}
          </motion.div>
        </AnimatePresence>

        {screen === "login" && (
          <div className="flex flex-col items-center gap-3 mt-5 pb-6">
            <p style={{ fontSize: 13, color: "#9CA3AF" }}>
              Problème de connexion ?{" "}
              <button style={{ color: "#4361EE", fontWeight: 600 }}>Contacter l'assistance</button>
            </p>
            <div className="flex items-center gap-2">
              <div style={{ width: 28, height: 1, background: "#E5E7EB" }} />
              <p style={{ fontSize: 11, color: "#D1D5DB" }}>Kelasi © 2026</p>
              <div style={{ width: 28, height: 1, background: "#E5E7EB" }} />
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}