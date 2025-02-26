import App from "@/App";
import FDashboard from "@/components/layouts/Dashboard/FDashboard";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SingUp";
import VerifyPage from "@/pages/VerifyPage";
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
        <FDashboard />
      </ProtectedRoute>
    ),
    children: routeGenarator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <FDashboard />
      </ProtectedRoute>
    ),
    children: routeGenarator(userPath),
  },
  {
    path: "/orders/verify",
    element: <VerifyPage />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/singup",
    element: <SignUp />,
  },
]);
