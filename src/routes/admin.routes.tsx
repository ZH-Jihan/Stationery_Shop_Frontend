import AdminDashbord from "@/pages/Admin/AdminDashbord";
import CreateUser from "@/pages/Admin/User-Management/CreateUser";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashbord />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create User",
        path: "create-user",
        element: <CreateUser />,
      },
    ],
  },
];
