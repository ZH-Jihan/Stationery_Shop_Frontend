import AdminDashbord from "@/pages/Admin/AdminDashbord";
import AddProduct from "@/pages/Admin/Product-Management/AddProduct";
import DeleteProducet from "@/pages/Admin/Product-Management/DeleteProducet";
import UpdateProduct from "@/pages/Admin/Product-Management/UpdateProduct";
import Product from "@mui/icons-material/ManageHistoryTwoTone";
import Profole from "@mui/icons-material/Person";
import { ReactNode } from "react";
type TDesboardPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  icon?: ReactNode;
  kind?: "header" | "divider";
  children?: TDesboardPath[];
};
export const adminPaths: TDesboardPath[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashbord />,
    icon: <Profole />,
  },
  {
    kind: "header",
    name: "Product",
  },
  {
    path: "products",
    icon: <Product />,
    name: "Product Management",
    children: [
      {
        name: "Add New Product",
        path: "create-product",
        element: <AddProduct />,
      },
      {
        name: "Update Product",
        path: "update-product",
        element: <UpdateProduct />,
      },
      {
        name: "Delete Product",
        path: "delete-product",
        element: <DeleteProducet />,
      },
    ],
  },
];
