import { useGetAllProductsQuery } from "@/redux/features/product/produtcApi";

const UserDashboard = () => {
  const { data } = useGetAllProductsQuery(undefined);
  console.log(data);

  return <div>This is User Dashbord</div>;
};

export default UserDashboard;
