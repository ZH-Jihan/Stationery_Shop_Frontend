import OrderListByUser from "@/pages/Dashbord/User/OrderListByUser";
import UserProfile from "@/pages/Dashbord/User/UserProfile";

export const userPath = [
  {
    name: "User Profile",
    path: "profile",
    element: <UserProfile />,
  },
  {
    name: "Tracking Order",
    path: `orderlist`,
    element: <OrderListByUser />,
  },
];
