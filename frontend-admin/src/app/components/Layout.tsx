import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";
import kelasiLogo from "../../assets/kelasi-logo.png";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/courses", label: "Cours", icon: BookOpen },
  { to: "/professors", label: "Professeurs", icon: Users },
  { to: "/students", label: "Étudiants", icon: GraduationCap },
];

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, adminEmail } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getPageTitle = () => {
    if (location.pathname === "/") return "Tableau de bord";
    if (location.pathname.startsWith("/courses/new")) return "Créer un cours";
    if (location.pathname.startsWith("/courses/") && location.pathname !== "/courses") return "Détail du cours";
    if (location.pathname === "/courses") return "Cours";
    if (location.pathname === "/professors/new") return "Ajouter un professeur";
    if (location.pathname === "/professors") return "Professeurs";
    if (location.pathname === "/students/new") return "Ajouter un étudiant";
    if (location.pathname === "/students") return "Étudiants";
    return "KELASI";
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <img src={kelasiLogo} alt="KELASI" className="w-10 h-10 object-contain" />
          <div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">KELASI</span>
            <p className="text-xs text-gray-400 -mt-0.5">Plateforme Universitaire</p>
          </div>
          <button
            className="ml-auto lg:hidden text-gray-400 hover:text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin Info */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-teal-700">AD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Admin Principal</p>
              <p className="text-xs text-gray-400">{adminEmail}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
            Navigation
          </p>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? "text-teal-600" : "text-gray-400 group-hover:text-gray-600"} />
                  <span>{label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto text-teal-400" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-gray-100 space-y-1">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 w-full transition-all">
            <Settings size={18} className="text-gray-400" />
            <span>Paramètres</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-600 w-full transition-all"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 shrink-0">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56">
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
              />
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full"></span>
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">AD</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}