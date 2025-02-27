import OrderTable from "@/components/ui/Order Table/OrderTable";
import { useGetAllOrdersQuery } from "@/redux/features/admin/orderManagementApi";

const SeeAllOrderForAdmin = () => {
  const { data: allOrder } = useGetAllOrdersQuery(undefined);
  return <OrderTable order={allOrder} />;
};

export default SeeAllOrderForAdmin;
