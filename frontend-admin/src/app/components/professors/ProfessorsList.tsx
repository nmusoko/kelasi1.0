import React, { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Users, Mail, BookOpen, Building2 } from "lucide-react";
import { useData } from "../../context/DataContext";

export function ProfessorsList() {
  const { professors, courses } = useData();
  const [search, setSearch] = useState("");

  const filtered = professors.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.department.toLowerCase().includes(search.toLowerCase())
  );

  const getProfessorCoursesCount = (profId: string) =>
    courses.filter(c => c.professorId === profId).length;

  const deptColors: Record<string, string> = {
    "Informatique": "bg-teal-50 text-teal-700",
    "Mathématiques": "bg-blue-50 text-blue-700",
    "Physique": "bg-violet-50 text-violet-700",
    "Chimie": "bg-amber-50 text-amber-700",
    "Biologie": "bg-emerald-50 text-emerald-700",
  };

  const getColor = (dept: string) => deptColors[dept] || "bg-gray-100 text-gray-700";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div>
          <h2 className="font-bold text-gray-900">Corps enseignant</h2>
          <p className="text-sm text-gray-500 mt-0.5">{professors.length} professeur(s) enregistré(s)</p>
        </div>
        <Link
          to="/professors/new"
          className="sm:ml-auto flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus size={16} />
          Ajouter un professeur
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher un professeur..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Aucun professeur trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Professeur</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-4 hidden sm:table-cell">Email</th>
                  <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-4 hidden md:table-cell">Département</th>
                  <th className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-4">Cours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(prof => (
                  <tr key={prof.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-violet-700">{prof.avatar}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{prof.name}</p>
                          <p className="text-xs text-gray-400 sm:hidden">{prof.email}</p>
                          <p className={`text-xs font-medium px-2 py-0.5 rounded-lg inline-block mt-0.5 md:hidden ${getColor(prof.department)}`}>
                            {prof.department}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={13} className="text-gray-400" />
                        {prof.email}
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${getColor(prof.department)}`}>
                        {prof.department}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center">
                          <BookOpen size={13} className="text-teal-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{getProfessorCoursesCount(prof.id)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["Informatique", "Mathématiques", "Physique", "Chimie"].map(dept => {
          const count = professors.filter(p => p.department === dept).length;
          return (
            <div key={dept} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <div className={`w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center ${getColor(dept).replace("text-", "text-").split(" ")[0]} bg-opacity-50`}>
                <Building2 size={15} className={getColor(dept).split(" ")[1]} />
              </div>
              <p className="text-xl font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">{dept}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
