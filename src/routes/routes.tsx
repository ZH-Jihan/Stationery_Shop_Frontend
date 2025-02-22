import App from "@/App";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import RootLayout from "@/components/layouts/RootLayout";
import SignIn from "@/pages/SignIn";
import { routeGenarator } from "@/utils/routesGeneroter";
import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { userPath } from "./user.routes";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <RootLayout />
      </ProtectedRoute>
    ),
    children: routeGenarator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <RootLayout />
      </ProtectedRoute>
    ),
    children: routeGenarator(facultyPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <RootLayout />
      </ProtectedRoute>
    ),
    children: routeGenarator(userPath),
  },

  {
    path: "/login",
    element: <SignIn />,
  },
]);
