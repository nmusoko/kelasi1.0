import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn, BookOpen, GraduationCap, Users, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import kelasiLogo from "../../../assets/kelasi-logo.png";

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

const CAMPUS_IMAGE = "https://images.unsplash.com/photo-1758413351776-cea82eed2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwbW9kZXJuJTIwYXJjaGl0ZWN0dXJlJTIwYWVyaWFsfGVufDF8fHx8MTc3MzE1NjI5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const STATS = [
  { icon: BookOpen, label: "Cours actifs", value: "120+" },
  { icon: Users, label: "Professeurs", value: "48" },
  { icon: GraduationCap, label: "Étudiants", value: "1 200+" },
];

export function LoginPage() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ defaultValues: { remember: false } });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setServerError("");
    const result = await login(data.email, data.password);
    setLoading(false);
    if (!result.success) {
      setServerError(result.error || "Une erreur est survenue.");
    }
  };

  const fillDemo = () => {
    setValue("email", "admin@kelasi.edu");
    setValue("password", "admin1234");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — image + branding */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col">
        {/* Background image */}
        <img
          src={CAMPUS_IMAGE}
          alt="Campus universitaire"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-teal-800/70 to-teal-600/50" />

        {/* Content over image */}
        <div className="relative z-10 flex flex-col h-full px-12 py-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <img src={kelasiLogo} alt="KELASI" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight">KELASI</span>
              <p className="text-xs text-teal-200 -mt-0.5">Plateforme Universitaire</p>
            </div>
          </div>

          {/* Main text */}
          <div className="mt-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-5">
              <ShieldCheck size={13} />
              Accès Administrateur Sécurisé
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
              Gérez votre<br />
              université en un<br />
              seul endroit.
            </h1>
            <p className="text-teal-100 text-sm leading-relaxed max-w-sm">
              Créez des cours, assignez des professeurs et suivez vos étudiants depuis un tableau de bord moderne et intuitif.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-8">
              {STATS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2 border border-white/20">
                    <Icon size={16} className="text-teal-100" />
                  </div>
                  <p className="text-white font-bold">{value}</p>
                  <p className="text-teal-200 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-teal-300 text-xs">
            © {new Date().getFullYear()} KELASI — Plateforme de gestion universitaire
          </p>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <img src={kelasiLogo} alt="KELASI" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold text-gray-900">KELASI</span>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-teal-100">
              <ShieldCheck size={13} />
              Administration
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Connexion</h2>
            <p className="text-sm text-gray-500">
              Connectez-vous à votre espace d'administration KELASI.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Server error */}
            {serverError && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                <AlertCircle size={15} className="shrink-0" />
                {serverError}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Adresse email
              </label>
              <input
                type="email"
                placeholder="admin@kelasi.edu"
                {...register("email", {
                  required: "L'email est requis",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email invalide" },
                })}
                className={`w-full border ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"} rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <button type="button" className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Le mot de passe est requis",
                    minLength: { value: 6, message: "Minimum 6 caractères" },
                  })}
                  className={`w-full border ${errors.password ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"} rounded-xl px-4 py-3 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
                className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                Se souvenir de moi
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-70 text-white py-3 rounded-xl text-sm font-semibold transition-colors shadow-sm mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-5 bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-700 mb-2 flex items-center gap-1.5">
              <ShieldCheck size={13} />
              Identifiants de démonstration
            </p>
            <div className="space-y-1 text-xs text-amber-700 font-mono">
              <p>Email : <span className="font-bold">admin@kelasi.edu</span></p>
              <p>Mot de passe : <span className="font-bold">admin1234</span></p>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-2.5 text-xs text-amber-700 bg-amber-100 hover:bg-amber-200 font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              Remplir automatiquement
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            © {new Date().getFullYear()} KELASI — Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
}
