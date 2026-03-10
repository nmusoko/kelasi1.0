import React, { useEffect } from "react";
import { createBrowserRouter, useNavigate } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/dashboard/Dashboard";
import { CoursesList } from "./components/courses/CoursesList";
import { CourseForm } from "./components/courses/CourseForm";
import { CourseDetail } from "./components/courses/CourseDetail";
import { ProfessorsList } from "./components/professors/ProfessorsList";
import { ProfessorForm } from "./components/professors/ProfessorForm";
import { StudentsList } from "./components/students/StudentsList";
import { StudentForm } from "./components/students/StudentForm";
import { LoginPage } from "./components/auth/LoginPage";
import { useAuth } from "./context/AuthContext";

function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-6xl font-bold text-gray-100 mb-4">404</p>
      <p className="text-gray-500">Page introuvable</p>
    </div>
  );
}

// Guard: redirect unauthenticated users to /login
function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;
  return <Layout />;
}

// Guard: redirect authenticated users away from login
function GuestLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;
  return <LoginPage />;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: GuestLayout,
  },
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "courses", Component: CoursesList },
      { path: "courses/new", Component: CourseForm },
      { path: "courses/:id", Component: CourseDetail },
      { path: "professors", Component: ProfessorsList },
      { path: "professors/new", Component: ProfessorForm },
      { path: "students", Component: StudentsList },
      { path: "students/new", Component: StudentForm },
      { path: "*", Component: NotFound },
    ],
  },
]);
