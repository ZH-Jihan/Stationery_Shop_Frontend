import Home from "@/pages/Home";
import AllProducts from "@/pages/Products/AllProducts";

export const normalUserPath = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "All Products",
    path: "/all-products",
    element: <AllProducts />,
  }
];
