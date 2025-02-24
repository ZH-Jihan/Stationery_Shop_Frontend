import ProductCard from "@/components/ui/ProductCard";
import { useGetAllProductQuery } from "@/redux/features/product/produtcApi";

const SeeAllProduct = () => {
  const { data, isLoading, error } = useGetAllProductQuery(undefined);
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data?.map((p) => <ProductCard key={p._id} p={p} />)}
    </div>
  );
};

export default SeeAllProduct;
