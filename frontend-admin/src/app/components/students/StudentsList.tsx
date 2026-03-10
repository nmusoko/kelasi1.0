import React, { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, GraduationCap, Mail, Filter, BookOpen } from "lucide-react";
import { useData } from "../../context/DataContext";

const DEPARTMENTS = ["Tous", "Informatique", "Mathématiques", "Physique", "Chimie"];
const LEVELS = ["Tous", "Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Doctorat"];

const levelColors: Record<string, string> = {
  "Licence 1": "bg-blue-50 text-blue-700",
  "Licence 2": "bg-blue-50 text-blue-700",
  "Licence 3": "bg-blue-50 text-blue-700",
  "Master 1": "bg-violet-50 text-violet-700",
  "Master 2": "bg-violet-50 text-violet-700",
  "Doctorat": "bg-amber-50 text-amber-700",
};

export function StudentsList() {
  const { students, courses } = useData();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("Tous");
  const [levelFilter, setLevelFilter] = useState("Tous");

  const filtered = students.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.matricule.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "Tous" || s.department === deptFilter;
    const matchLevel = levelFilter === "Tous" || s.level === levelFilter;
    return matchSearch && matchDept && matchLevel;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div>
          <h2 className="font-bold text-gray-900">Gestion des étudiants</h2>
          <p className="text-sm text-gray-500 mt-0.5">{students.length} étudiant(s) enregistré(s)</p>
        </div>
        <Link
          to="/students/new"
          className="sm:ml-auto flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus size={16} />
          Ajouter un étudiant
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
              <Filter size={14} className="text-gray-400" />
              <select
                value={deptFilter}
                onChange={e => setDeptFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
              >
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
              <select
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
              >
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Aucun étudiant trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Étudiant</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-4 hidden sm:table-cell">Matricule</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-4 hidden lg:table-cell">Email</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-4 hidden md:table-cell">Département</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-4">Niveau</th>
                  <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-4 hidden sm:table-cell">Cours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-amber-700">{student.avatar}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{student.name}</p>
                          <p className="text-xs text-gray-400 sm:hidden">{student.matricule}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">{student.matricule}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Mail size={12} className="text-gray-400 shrink-0" />
                        {student.email}
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm text-gray-600">{student.department}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${levelColors[student.level] || "bg-gray-100 text-gray-600"}`}>
                        {student.level}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-1.5">
                        <BookOpen size={13} className="text-teal-500" />
                        <span className="text-sm font-semibold text-gray-700">{student.enrolledCourses.length}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Affichage de {filtered.length} sur {students.length} étudiant(s)
          </p>
        </div>
      </div>
    </div>
  );
}
