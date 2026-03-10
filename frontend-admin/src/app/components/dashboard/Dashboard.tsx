import React from "react";
import { Link } from "react-router";
import {
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
  Plus,
  ArrowRight,
  Building2,
  Calendar,
} from "lucide-react";
import { useData } from "../../context/DataContext";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  bg,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  sub: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center`}>
          <Icon size={20} className={color} />
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          <TrendingUp size={11} />
          +{Math.floor(Math.random() * 10) + 1}%
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}

export function Dashboard() {
  const { courses, professors, students } = useData();

  const departments = [...new Set([
    ...courses.map(c => c.department),
    ...professors.map(p => p.department),
    ...students.map(s => s.department),
  ])];

  const recentCourses = [...courses].slice(-4).reverse();
  const recentStudents = [...students].slice(-4).reverse();

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative">
          <p className="text-teal-100 text-sm font-medium mb-1">Bonjour, Administrateur 👋</p>
          <h2 className="text-2xl font-bold mb-1">Tableau de bord KELASI</h2>
          <p className="text-teal-200 text-sm">
            Gérez votre plateforme universitaire en un seul endroit.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <Link
              to="/courses/new"
              className="flex items-center gap-2 bg-white text-teal-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-50 transition-colors"
            >
              <Plus size={15} />
              Nouveau cours
            </Link>
            <Link
              to="/students/new"
              className="flex items-center gap-2 bg-teal-500/30 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-500/40 transition-colors border border-white/20"
            >
              <Plus size={15} />
              Nouvel étudiant
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpen}
          label="Cours actifs"
          value={courses.length}
          sub="Tous semestres"
          color="text-teal-600"
          bg="bg-teal-50"
        />
        <StatCard
          icon={Users}
          label="Professeurs"
          value={professors.length}
          sub="Corps enseignant"
          color="text-violet-600"
          bg="bg-violet-50"
        />
        <StatCard
          icon={GraduationCap}
          label="Étudiants"
          value={students.length}
          sub="Inscrits"
          color="text-amber-600"
          bg="bg-amber-50"
        />
        <StatCard
          icon={Building2}
          label="Départements"
          value={departments.length}
          sub="Unités d'enseignement"
          color="text-blue-600"
          bg="bg-blue-50"
        />
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Actions rapides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/courses/new"
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:border-teal-200 hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center group-hover:bg-teal-100 transition-colors">
              <BookOpen size={17} className="text-teal-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Créer un cours</p>
              <p className="text-xs text-gray-400">Ajouter un nouveau cours</p>
            </div>
            <ArrowRight size={15} className="text-gray-300 group-hover:text-teal-500 transition-colors" />
          </Link>
          <Link
            to="/professors/new"
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:border-violet-200 hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 bg-violet-50 rounded-lg flex items-center justify-center group-hover:bg-violet-100 transition-colors">
              <Users size={17} className="text-violet-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Ajouter un professeur</p>
              <p className="text-xs text-gray-400">Nouvel enseignant</p>
            </div>
            <ArrowRight size={15} className="text-gray-300 group-hover:text-violet-500 transition-colors" />
          </Link>
          <Link
            to="/students/new"
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:border-amber-200 hover:shadow-sm transition-all group"
          >
            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              <GraduationCap size={17} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Ajouter un étudiant</p>
              <p className="text-xs text-gray-400">Nouvel inscrit</p>
            </div>
            <ArrowRight size={15} className="text-gray-300 group-hover:text-amber-500 transition-colors" />
          </Link>
        </div>
      </div>

      {/* Recent content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Courses */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Cours récents</h3>
            <Link to="/courses" className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentCourses.map(course => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen size={15} className="text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{course.name}</p>
                  <p className="text-xs text-gray-400">{course.code} · {course.department}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-teal-600">{course.studentIds.length} étudiants</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                    <Calendar size={10} /> {course.semester}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Students */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Étudiants récents</h3>
            <Link to="/students" className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentStudents.map(student => (
              <div
                key={student.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-9 h-9 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-amber-700">{student.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{student.name}</p>
                  <p className="text-xs text-gray-400">{student.matricule}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg font-medium">{student.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
