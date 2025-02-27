import CustomizedProfile from "@/components/CustomizedProfile";
import { useGetAllOrdersQuery } from "@/redux/features/admin/orderManagementApi";

const AdminProfile = () => {
  const { data: allOrder } = useGetAllOrdersQuery(undefined);
  return <CustomizedProfile order={allOrder} />;
};

export default AdminProfile;
