import React from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { ArrowLeft, BookOpen, Save } from "lucide-react";
import { useData } from "../../context/DataContext";

interface FormValues {
  name: string;
  code: string;
  department: string;
  semester: string;
  professorId: string;
  credits: number;
}

const DEPARTMENTS = ["Informatique", "Mathématiques", "Physique", "Chimie", "Biologie", "Langues", "Sciences Sociales"];
const SEMESTERS = ["Semestre 1", "Semestre 2"];

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-700 mb-1.5">{children}</label>;
}

function InputClass(error?: boolean) {
  return `w-full border ${error ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"} rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100 transition-all`;
}

export function CourseForm() {
  const navigate = useNavigate();
  const { professors, addCourse } = useData();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: { credits: 3, semester: "Semestre 1", department: "Informatique" }
  });

  const onSubmit = (data: FormValues) => {
    addCourse({
      name: data.name,
      code: data.code,
      department: data.department,
      semester: data.semester,
      professorId: data.professorId || null,
      credits: Number(data.credits),
    });
    navigate("/courses");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/courses"
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={17} />
        </Link>
        <div>
          <h2 className="font-bold text-gray-900">Créer un cours</h2>
          <p className="text-sm text-gray-500">Remplissez les informations du nouveau cours</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center">
              <BookOpen size={17} className="text-teal-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Informations du cours</p>
              <p className="text-xs text-gray-400">Détails généraux</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="sm:col-span-2">
              <Label>Nom du cours *</Label>
              <input
                {...register("name", { required: "Le nom est requis" })}
                placeholder="ex: Algorithmique Avancée"
                className={InputClass(!!errors.name)}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            {/* Code */}
            <div>
              <Label>Code du cours *</Label>
              <input
                {...register("code", { required: "Le code est requis" })}
                placeholder="ex: INF-401"
                className={InputClass(!!errors.code)}
              />
              {errors.code && <p className="text-xs text-red-500 mt-1">{errors.code.message}</p>}
            </div>

            {/* Credits */}
            <div>
              <Label>Crédits *</Label>
              <input
                type="number"
                min={1}
                max={10}
                {...register("credits", { required: true, min: 1, max: 10 })}
                className={InputClass(!!errors.credits)}
              />
            </div>

            {/* Department */}
            <div>
              <Label>Département *</Label>
              <select
                {...register("department", { required: true })}
                className={InputClass(!!errors.department)}
              >
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Semester */}
            <div>
              <Label>Semestre *</Label>
              <select
                {...register("semester", { required: true })}
                className={InputClass(!!errors.semester)}
              >
                {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Professor */}
            <div className="sm:col-span-2">
              <Label>Professeur assigné</Label>
              <select
                {...register("professorId")}
                className={InputClass()}
              >
                <option value="">— Aucun professeur assigné —</option>
                {professors.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.department})</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">Vous pouvez assigner un professeur plus tard depuis le détail du cours.</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end">
          <Link
            to="/courses"
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <Save size={15} />
            Créer le cours
          </button>
        </div>
      </form>
    </div>
  );
}
