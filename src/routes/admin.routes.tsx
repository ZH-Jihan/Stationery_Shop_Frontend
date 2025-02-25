
import AddProduct from "@/pages/Dashbord/Admin/Product Management/AddProduct";
import SeeAllProduct from "@/pages/Dashbord/Admin/Product Management/SeeAllProduct";
import UpdateProduct from "@/pages/Dashbord/Admin/Product Management/UpdateProduct";
import Profile from "@/pages/Profile";
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
    element: <Profile />,
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
];
