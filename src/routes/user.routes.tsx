import Profile from "@/pages/Profile";
import OrderListByUser from "@/pages/User/OrderListByUser";

export const userPath = [
  {
    name: "User Profile",
    path: "profile",
    element: <Profile />,
  },
  {
    name: "Tracking Order",
    path: `orderlist`,
    element: <OrderListByUser />,
  },
];
