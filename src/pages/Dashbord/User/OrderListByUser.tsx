import OrderTable from "@/components/ui/Order Table/OrderTable";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";

const OrderListByUser = () => {
  const { data: userOrder } = useGetUserOrdersQuery(undefined);
  return <OrderTable order={userOrder} />;
};

export default OrderListByUser;
