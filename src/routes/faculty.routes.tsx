import CreateUser from "@/pages/Admin/User-Management/CreateUser";
import FacultyDashbord from "@/pages/Faculty/FacultyDashbord";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashbord />,
  },
  {
    name: "Student Management",
    children: [
      {
        name: "Create User",
        path: "create-user",
        element: <CreateUser />,
      },
    ],
  },
];
