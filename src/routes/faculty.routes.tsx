import CreateUser from "@/pages/Admin/User-Management/CreateUser";
import Home from "@/pages/Home";

export const normalUserPath = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Create User",
    path: "create-user",
    element: <CreateUser />,
  },
];
