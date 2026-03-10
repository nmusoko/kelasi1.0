import React, { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, BookOpen, Users, Calendar, ChevronRight, Filter } from "lucide-react";
import { useData } from "../../context/DataContext";

const DEPARTMENTS = ["Tous", "Informatique", "Mathématiques", "Physique", "Chimie"];
const SEMESTERS = ["Tous", "Semestre 1", "Semestre 2"];

export function CoursesList() {
  const { courses, professors } = useData();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("Tous");
  const [semFilter, setSemFilter] = useState("Tous");

  const filtered = courses.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "Tous" || c.department === deptFilter;
    const matchSem = semFilter === "Tous" || c.semester === semFilter;
    return matchSearch && matchDept && matchSem;
  });

  const getProfessor = (id: string | null) =>
    professors.find(p => p.id === id);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div>
          <h2 className="font-bold text-gray-900">Gestion des cours</h2>
          <p className="text-sm text-gray-500 mt-0.5">{courses.length} cours au total</p>
        </div>
        <Link
          to="/courses/new"
          className="sm:ml-auto flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus size={16} />
          Créer un cours
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Rechercher un cours..."
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
                value={semFilter}
                onChange={e => setSemFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
              >
                {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <BookOpen size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Aucun cours trouvé</p>
          <p className="text-gray-400 text-sm mt-1">Essayez de modifier vos filtres ou créez un nouveau cours</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(course => {
            const prof = getProfessor(course.professorId);
            return (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-teal-100 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                    <BookOpen size={18} className="text-teal-600" />
                  </div>
                  <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
                    {course.code}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">{course.name}</h3>
                <p className="text-xs text-gray-400 mb-4">{course.department}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} className="text-gray-400" />
                    {course.semester}
                    <span className="ml-auto text-gray-400">{course.credits} crédits</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users size={12} className="text-gray-400" />
                    {course.studentIds.length} étudiant{course.studentIds.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  {prof ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                        <span className="text-xs font-semibold text-violet-700">{prof.avatar}</span>
                      </div>
                      <span className="text-xs text-gray-600 truncate max-w-[130px]">{prof.name}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg font-medium">Non assigné</span>
                  )}
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-teal-500 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
