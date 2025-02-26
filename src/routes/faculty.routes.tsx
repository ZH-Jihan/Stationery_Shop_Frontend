import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import CheckOutPage from "@/pages/CheckOutPage";
import Home from "@/pages/Home";
import AllProducts from "@/pages/Products/AllProducts";
import ProductDetails from "@/pages/Products/ProductsDetails";

export const normalUserPath = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    path: "/produc-detail/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/checkout/:productId",
    element: (
      <ProtectedRoute role="user">
        <CheckOutPage />
      </ProtectedRoute>
    ),
  },
  {
    name: "All Products",
    path: "/all-products",
    element: <AllProducts />,
  },
];
