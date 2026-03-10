import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Professor {
  id: string;
  name: string;
  email: string;
  department: string;
  coursesCount: number;
  avatar: string;
}

export interface Student {
  id: string;
  name: string;
  matricule: string;
  email: string;
  department: string;
  level: string;
  enrolledCourses: string[];
  avatar: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  semester: string;
  professorId: string | null;
  studentIds: string[];
  credits: number;
}

interface DataContextType {
  professors: Professor[];
  students: Student[];
  courses: Course[];
  addProfessor: (p: Omit<Professor, "id" | "coursesCount" | "avatar">) => void;
  addStudent: (s: Omit<Student, "id" | "enrolledCourses" | "avatar">) => void;
  addCourse: (c: Omit<Course, "id" | "studentIds">) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  assignProfessor: (courseId: string, professorId: string) => void;
  enrollStudent: (courseId: string, studentId: string) => void;
  removeStudentFromCourse: (courseId: string, studentId: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

const initialProfessors: Professor[] = [
  { id: "p1", name: "Dr. Sophie Martin", email: "s.martin@kelasi.edu", department: "Informatique", coursesCount: 3, avatar: "SM" },
  { id: "p2", name: "Prof. Jean Dupont", email: "j.dupont@kelasi.edu", department: "Mathématiques", coursesCount: 2, avatar: "JD" },
  { id: "p3", name: "Dr. Amina Koné", email: "a.kone@kelasi.edu", department: "Physique", coursesCount: 1, avatar: "AK" },
  { id: "p4", name: "Prof. Marc Lefebvre", email: "m.lefebvre@kelasi.edu", department: "Chimie", coursesCount: 2, avatar: "ML" },
];

const initialStudents: Student[] = [
  { id: "s1", name: "Alice Tremblay", matricule: "STU-2024-001", email: "a.tremblay@kelasi.edu", department: "Informatique", level: "Licence 3", enrolledCourses: ["c1", "c2"], avatar: "AT" },
  { id: "s2", name: "Boubacar Diallo", matricule: "STU-2024-002", email: "b.diallo@kelasi.edu", department: "Mathématiques", level: "Master 1", enrolledCourses: ["c2", "c3"], avatar: "BD" },
  { id: "s3", name: "Claire Fontaine", matricule: "STU-2024-003", email: "c.fontaine@kelasi.edu", department: "Informatique", level: "Licence 2", enrolledCourses: ["c1"], avatar: "CF" },
  { id: "s4", name: "David Osei", matricule: "STU-2024-004", email: "d.osei@kelasi.edu", department: "Physique", level: "Licence 1", enrolledCourses: ["c3"], avatar: "DO" },
  { id: "s5", name: "Emma Rousseau", matricule: "STU-2024-005", email: "e.rousseau@kelasi.edu", department: "Chimie", level: "Master 2", enrolledCourses: ["c1", "c4"], avatar: "ER" },
  { id: "s6", name: "Fatou Balde", matricule: "STU-2024-006", email: "f.balde@kelasi.edu", department: "Informatique", level: "Licence 3", enrolledCourses: ["c2"], avatar: "FB" },
];

const initialCourses: Course[] = [
  { id: "c1", name: "Algorithmique Avancée", code: "INF-401", department: "Informatique", semester: "Semestre 1", professorId: "p1", studentIds: ["s1", "s3", "s5"], credits: 4 },
  { id: "c2", name: "Algèbre Linéaire", code: "MAT-201", department: "Mathématiques", semester: "Semestre 1", professorId: "p2", studentIds: ["s1", "s2", "s6"], credits: 3 },
  { id: "c3", name: "Mécanique Quantique", code: "PHY-301", department: "Physique", semester: "Semestre 2", professorId: "p3", studentIds: ["s2", "s4"], credits: 4 },
  { id: "c4", name: "Chimie Organique", code: "CHI-202", department: "Chimie", semester: "Semestre 2", professorId: "p4", studentIds: ["s5"], credits: 3 },
  { id: "c5", name: "Base de Données", code: "INF-302", department: "Informatique", semester: "Semestre 1", professorId: "p1", studentIds: [], credits: 4 },
];

let nextId = 100;

export function DataProvider({ children }: { children: ReactNode }) {
  const [professors, setProfessors] = useState<Professor[]>(initialProfessors);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const addProfessor = (p: Omit<Professor, "id" | "coursesCount" | "avatar">) => {
    const initials = p.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    setProfessors(prev => [...prev, { ...p, id: `p${++nextId}`, coursesCount: 0, avatar: initials }]);
  };

  const addStudent = (s: Omit<Student, "id" | "enrolledCourses" | "avatar">) => {
    const initials = s.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    setStudents(prev => [...prev, { ...s, id: `s${++nextId}`, enrolledCourses: [], avatar: initials }]);
  };

  const addCourse = (c: Omit<Course, "id" | "studentIds">) => {
    setCourses(prev => [...prev, { ...c, id: `c${++nextId}`, studentIds: [] }]);
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const assignProfessor = (courseId: string, professorId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, professorId } : c));
  };

  const enrollStudent = (courseId: string, studentId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId && !c.studentIds.includes(studentId)) {
        return { ...c, studentIds: [...c.studentIds, studentId] };
      }
      return c;
    }));
    setStudents(prev => prev.map(s => {
      if (s.id === studentId && !s.enrolledCourses.includes(courseId)) {
        return { ...s, enrolledCourses: [...s.enrolledCourses, courseId] };
      }
      return s;
    }));
  };

  const removeStudentFromCourse = (courseId: string, studentId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, studentIds: c.studentIds.filter(id => id !== studentId) };
      }
      return c;
    }));
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, enrolledCourses: s.enrolledCourses.filter(id => id !== courseId) };
      }
      return s;
    }));
  };

  return (
    <DataContext.Provider value={{
      professors, students, courses,
      addProfessor, addStudent, addCourse, updateCourse,
      assignProfessor, enrollStudent, removeStudentFromCourse
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
