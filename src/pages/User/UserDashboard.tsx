import { useGetAllProductQuery } from "@/redux/features/product/produtcApi";

const UserDashboard = () => {
  const { data } = useGetAllProductQuery(undefined);
  console.log(data);

  return <div>This is User Dashbord</div>;
};

export default UserDashboard;
