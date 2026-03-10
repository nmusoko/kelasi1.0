import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { SplashScreen } from "./components/screens/SplashScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { DashboardScreen } from "./components/screens/DashboardScreen";
import { CoursesScreen } from "./components/screens/CoursesScreen";
import { CourseHubScreen } from "./components/screens/CourseHubScreen";
import { AssignmentDetailScreen } from "./components/screens/AssignmentDetailScreen";
import { AssignmentSubmitScreen } from "./components/screens/AssignmentSubmitScreen";
import { GradeScreen } from "./components/screens/GradeScreen";
import { FileViewerScreen } from "./components/screens/FileViewerScreen";
import { CalendarScreen } from "./components/screens/CalendarScreen";
import { MessagesScreen } from "./components/screens/MessagesScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { AppLayout } from "./layouts/AppLayout";
// Professor screens
import { ProfDashboardScreen } from "./components/screens/prof/ProfDashboardScreen";
import { ProfCoursesScreen } from "./components/screens/prof/ProfCoursesScreen";
import { ProfMaterialsScreen } from "./components/screens/prof/ProfMaterialsScreen";
import { ProfAnnouncementsScreen } from "./components/screens/prof/ProfAnnouncementsScreen";
import { ProfAssignmentsScreen } from "./components/screens/prof/ProfAssignmentsScreen";
import { ProfStudentsScreen } from "./components/screens/prof/ProfStudentsScreen";
import { ProfMessagesScreen } from "./components/screens/prof/ProfMessagesScreen";
import { ProfCourseHubScreen } from "./components/screens/prof/ProfCourseHubScreen";
import { ProfLayout } from "./layouts/ProfLayout";

function AppIndex() {
  return <Navigate to="/app/dashboard" replace />;
}

function ProfIndex() {
  return <Navigate to="/prof/dashboard" replace />;
}

function CatchAll() {
  return <Navigate to="/" replace />;
}

export const router = createBrowserRouter([
  {
    // Root layout wraps everything — handles web shell vs raw render
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: SplashScreen,
      },
      {
        path: "/login",
        Component: LoginScreen,
      },
      // Student routes
      {
        path: "/app",
        Component: AppLayout,
        children: [
          { index: true, Component: AppIndex },
          { path: "dashboard", Component: DashboardScreen },
          { path: "courses", Component: CoursesScreen },
          { path: "courses/:courseId", Component: CourseHubScreen },
          { path: "courses/:courseId/assignments/:assignmentId", Component: AssignmentDetailScreen },
          { path: "courses/:courseId/assignments/:assignmentId/submit", Component: AssignmentSubmitScreen },
          { path: "courses/:courseId/assignments/:assignmentId/grade", Component: GradeScreen },
          { path: "courses/:courseId/file/:fileId", Component: FileViewerScreen },
          { path: "calendar", Component: CalendarScreen },
          { path: "messages", Component: MessagesScreen },
          { path: "profile", Component: ProfileScreen },
        ],
      },
      // Professor routes
      {
        path: "/prof",
        Component: ProfLayout,
        children: [
          { index: true, Component: ProfIndex },
          { path: "dashboard", Component: ProfDashboardScreen },
          { path: "courses", Component: ProfCoursesScreen },
          { path: "courses/:courseId", Component: ProfCourseHubScreen },
          { path: "materials", Component: ProfMaterialsScreen },
          { path: "announcements", Component: ProfAnnouncementsScreen },
          { path: "assignments", Component: ProfAssignmentsScreen },
          { path: "students", Component: ProfStudentsScreen },
          { path: "messages", Component: ProfMessagesScreen },
        ],
      },
      {
        path: "*",
        Component: CatchAll,
      },
    ],
  },
]);
