import CustomizedProfile from "@/components/CustomizedProfile";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";

const UserProfile = () => {
  const { data: userOrder } = useGetUserOrdersQuery(undefined);
  return <CustomizedProfile order={userOrder} />;
};

export default UserProfile;
