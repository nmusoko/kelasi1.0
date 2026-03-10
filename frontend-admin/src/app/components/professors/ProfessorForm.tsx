import React from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { ArrowLeft, Users, Save } from "lucide-react";
import { useData } from "../../context/DataContext";

interface FormValues {
  name: string;
  email: string;
  department: string;
}

const DEPARTMENTS = ["Informatique", "Mathématiques", "Physique", "Chimie", "Biologie", "Langues", "Sciences Sociales"];

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-700 mb-1.5">{children}</label>;
}

function inputCls(error?: boolean) {
  return `w-full border ${error ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"} rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 transition-all`;
}

export function ProfessorForm() {
  const navigate = useNavigate();
  const { addProfessor } = useData();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: { department: "Informatique" }
  });

  const onSubmit = (data: FormValues) => {
    addProfessor(data);
    navigate("/professors");
  };

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/professors"
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={17} />
        </Link>
        <div>
          <h2 className="font-bold text-gray-900">Ajouter un professeur</h2>
          <p className="text-sm text-gray-500">Enregistrer un nouvel enseignant</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
              <Users size={17} className="text-violet-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Informations du professeur</p>
              <p className="text-xs text-gray-400">Coordonnées et affectation</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <Label>Nom complet *</Label>
            <input
              {...register("name", { required: "Le nom est requis" })}
              placeholder="ex: Dr. Sophie Martin"
              className={inputCls(!!errors.name)}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
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
              placeholder="ex: s.martin@kelasi.edu"
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
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end">
          <Link
            to="/professors"
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <Save size={15} />
            Ajouter le professeur
          </button>
        </div>
      </form>
    </div>
  );
}
