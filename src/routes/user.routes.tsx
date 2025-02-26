import OrderListByUser from "@/pages/Dashbord/User/OrderListByUser";
import CustomerDashboard from "@/pages/Profile1";

export const userPath = [
  {
    name: "User Profile",
    path: "profile",
    element: <CustomerDashboard />,
  },
  {
    name: "Tracking Order",
    path: `orderlist`,
    element: <OrderListByUser />,
  },
];
