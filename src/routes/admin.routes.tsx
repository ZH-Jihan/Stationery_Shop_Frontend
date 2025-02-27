import AdminProfile from "@/pages/Dashbord/Admin/AdminProfile";
import SeeAllOrderForAdmin from "@/pages/Dashbord/Admin/Order Management/SeeAllOrderAdmin";
import AddProduct from "@/pages/Dashbord/Admin/Product Management/AddProduct";
import SeeAllProduct from "@/pages/Dashbord/Admin/Product Management/SeeAllProduct";
import UpdateProduct from "@/pages/Dashbord/Admin/Product Management/UpdateProduct";
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
    name: "Profile",
    path: "profile",
    element: <AdminProfile />,
    icon: <Profole />,
  },
  {
    kind: "header",
    name: "Product",
  },
  {
    icon: <Product />,
    name: "Product Management",
    children: [
      {
        name: "Vew all Products",
        path: "all-products",
        element: <SeeAllProduct />,
      },
      {
        name: "Add New Product",
        path: "create-product",
        element: <AddProduct />,
      },
      {
        path: "update-product/:productId",
        element: <UpdateProduct />,
      },
    ],
  },
  {
    icon: <Product />,
    name: "Order Management",
    children: [
      {
        name: "All Order",
        path: "allorders",
        element: <SeeAllOrderForAdmin />,
      },
    ],
  },
];
