import Loading from "@/components/Loading";
import ProductCard from "@/components/ui/ProductCard";
import { useGetAllProductQuery } from "@/redux/features/product/produtcApi";
import { Grid } from "@mui/system";

const SeeAllProduct = () => {
  const { data, isLoading } = useGetAllProductQuery(undefined);
  console.log(data);

  if (!data || isLoading) {
    return <Loading variant="grid" />;
  }
  return (
    <Grid sx={{ my: 2, mx: 2 }} container spacing={2}>
      {data?.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </Grid>
  );
};

export default SeeAllProduct;
