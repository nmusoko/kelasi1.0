import React from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { ArrowLeft, GraduationCap, Save } from "lucide-react";
import { useData } from "../../context/DataContext";

interface FormValues {
  name: string;
  matricule: string;
  email: string;
  department: string;
  level: string;
}

const DEPARTMENTS = ["Informatique", "Mathématiques", "Physique", "Chimie", "Biologie", "Langues", "Sciences Sociales"];
const LEVELS = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Doctorat"];

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-700 mb-1.5">{children}</label>;
}

function inputCls(error?: boolean) {
  return `w-full border ${error ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"} rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100 transition-all`;
}

export function StudentForm() {
  const navigate = useNavigate();
  const { addStudent, students } = useData();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      department: "Informatique",
      level: "Licence 1",
      matricule: `STU-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, "0")}`,
    }
  });

  const onSubmit = (data: FormValues) => {
    addStudent(data);
    navigate("/students");
  };

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/students"
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={17} />
        </Link>
        <div>
          <h2 className="font-bold text-gray-900">Ajouter un étudiant</h2>
          <p className="text-sm text-gray-500">Inscrire un nouvel étudiant sur la plateforme</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
              <GraduationCap size={17} className="text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Informations de l'étudiant</p>
              <p className="text-xs text-gray-400">Identité et affectation académique</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="sm:col-span-2">
              <Label>Nom complet *</Label>
              <input
                {...register("name", { required: "Le nom est requis" })}
                placeholder="ex: Alice Tremblay"
                className={inputCls(!!errors.name)}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            {/* Matricule */}
            <div>
              <Label>Numéro matricule *</Label>
              <input
                {...register("matricule", { required: "Le matricule est requis" })}
                placeholder="ex: STU-2024-001"
                className={inputCls(!!errors.matricule)}
              />
              {errors.matricule && <p className="text-xs text-red-500 mt-1">{errors.matricule.message}</p>}
            </div>

            {/* Email */}
            <div>
              <Label>Adresse email *</Label>
              <input
                type="email"
                {...register("email", {
                  required: "L'email est requis",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email invalide" }
                })}
                placeholder="ex: a.tremblay@kelasi.edu"
                className={inputCls(!!errors.email)}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Department */}
            <div>
              <Label>Département *</Label>
              <select
                {...register("department", { required: true })}
                className={inputCls(!!errors.department)}
              >
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Level */}
            <div>
              <Label>Niveau d'études *</Label>
              <select
                {...register("level", { required: true })}
                className={inputCls(!!errors.level)}
              >
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end">
          <Link
            to="/students"
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <Save size={15} />
            Ajouter l'étudiant
          </button>
        </div>
      </form>
    </div>
  );
}
