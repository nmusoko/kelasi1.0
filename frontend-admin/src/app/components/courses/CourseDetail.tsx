import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  Users,
  Calendar,
  Award,
  UserCheck,
  UserPlus,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { useData } from "../../context/DataContext";

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, professors, students, assignProfessor, enrollStudent, removeStudentFromCourse } = useData();

  const course = courses.find(c => c.id === id);
  const [selectedProfId, setSelectedProfId] = useState(course?.professorId || "");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  if (!course) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Cours introuvable.</p>
        <Link to="/courses" className="text-teal-600 text-sm font-medium mt-2 inline-block">← Retour aux cours</Link>
      </div>
    );
  }

  const assignedProfessor = professors.find(p => p.id === course.professorId);
  const enrolledStudents = students.filter(s => course.studentIds.includes(s.id));
  const availableStudents = students.filter(s => !course.studentIds.includes(s.id));

  const handleAssignProfessor = () => {
    if (selectedProfId) {
      assignProfessor(course.id, selectedProfId);
    }
  };

  const handleEnrollStudent = () => {
    if (selectedStudentId) {
      enrollStudent(course.id, selectedStudentId);
      setSelectedStudentId("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Back + header */}
      <div className="flex items-center gap-3">
        <Link
          to="/courses"
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={17} />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-900">{course.name}</h2>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg">{course.code}</span>
          </div>
          <p className="text-sm text-gray-500">{course.department} · {course.semester}</p>
        </div>
      </div>

      {/* Course Info Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
            <BookOpen size={18} className="text-teal-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Informations du cours</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Award, label: "Code", value: course.code, color: "text-teal-600", bg: "bg-teal-50" },
            { icon: Calendar, label: "Semestre", value: course.semester, color: "text-blue-600", bg: "bg-blue-50" },
            { icon: BookOpen, label: "Crédits", value: `${course.credits} crédits`, color: "text-violet-600", bg: "bg-violet-50" },
            { icon: Users, label: "Étudiants", value: `${course.studentIds.length} inscrit(s)`, color: "text-amber-600", bg: "bg-amber-50" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
                <Icon size={14} className={color} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Assign Professor */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
              <UserCheck size={17} className="text-violet-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Professeur assigné</p>
              <p className="text-xs text-gray-400">Enseignant responsable du cours</p>
            </div>
          </div>

          {assignedProfessor ? (
            <div className="flex items-center gap-3 bg-violet-50 rounded-xl p-3">
              <div className="w-10 h-10 rounded-full bg-violet-200 flex items-center justify-center">
                <span className="text-sm font-bold text-violet-700">{assignedProfessor.avatar}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{assignedProfessor.name}</p>
                <p className="text-xs text-gray-500">{assignedProfessor.email}</p>
                <p className="text-xs text-violet-600 font-medium mt-0.5">{assignedProfessor.department}</p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
              <p className="text-sm text-amber-600 font-medium">Aucun professeur assigné</p>
            </div>
          )}

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-medium text-gray-500 mb-2">
              {assignedProfessor ? "Changer le professeur" : "Assigner un professeur"}
            </p>
            <div className="flex gap-2">
              <select
                value={selectedProfId}
                onChange={e => setSelectedProfId(e.target.value)}
                className="flex-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              >
                <option value="">Sélectionner un professeur</option>
                {professors.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button
                onClick={handleAssignProfessor}
                disabled={!selectedProfId}
                className="bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Assigner
              </button>
            </div>
          </div>
        </div>

        {/* Enroll Student */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
              <UserPlus size={17} className="text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Ajouter un étudiant</p>
              <p className="text-xs text-gray-400">Inscrire un étudiant à ce cours</p>
            </div>
          </div>

          {availableStudents.length > 0 ? (
            <div className="flex gap-2">
              <select
                value={selectedStudentId}
                onChange={e => setSelectedStudentId(e.target.value)}
                className="flex-1 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              >
                <option value="">Sélectionner un étudiant</option>
                {availableStudents.map(s => (
                  <option key={s.id} value={s.id}>{s.name} — {s.level}</option>
                ))}
              </select>
              <button
                onClick={handleEnrollStudent}
                disabled={!selectedStudentId}
                className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Ajouter
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-sm text-gray-500">Tous les étudiants sont déjà inscrits</p>
            </div>
          )}
        </div>
      </div>

      {/* Enrolled Students */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center">
              <Users size={17} className="text-teal-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Étudiants inscrits</p>
              <p className="text-xs text-gray-400">{enrolledStudents.length} étudiant(s)</p>
            </div>
          </div>
        </div>

        {enrolledStudents.length === 0 ? (
          <div className="text-center py-8">
            <Users size={32} className="text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Aucun étudiant inscrit pour le moment</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">Étudiant</th>
                  <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">Matricule</th>
                  <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">Niveau</th>
                  <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">Département</th>
                  <th className="text-right text-xs font-semibold text-gray-400 pb-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {enrolledStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-semibold text-amber-700">{student.avatar}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{student.name}</p>
                          <p className="text-xs text-gray-400">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{student.matricule}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg font-medium">{student.level}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-gray-600">{student.department}</span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => removeStudentFromCourse(course.id, student.id)}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-600 transition-all ml-auto"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
