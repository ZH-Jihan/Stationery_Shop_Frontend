import App from "@/App";
import Dashboard from "@/components/layouts/Dashboard";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import SignIn from "@/pages/SignIn";
import { routeGenarator } from "@/utils/routesGeneroter";
import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import { normalUserPath } from "./faculty.routes";
import { userPath } from "./user.routes";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenarator(normalUserPath),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenarator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenarator(userPath),
  },

  {
    path: "/login",
    element: <SignIn />,
  },
]);
