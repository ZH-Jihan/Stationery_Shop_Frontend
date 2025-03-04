import CardSection from "@/components/Card";
import Carousol from "@/components/Carousol";
import Loading from "@/components/Loading";
import { useGetAllProductQuery } from "@/redux/features/product/produtcApi";
import { Grid } from "@mui/system";

const Home = () => {
  const { data: allProduct, isLoading } = useGetAllProductQuery({ limit: 4 });

  return (
    <>
      <Carousol />

      {!allProduct || isLoading ? (
        <Loading variant="grid" />
      ) : (
        <Grid sx={{ my: 2, mx: 2 }} container spacing={2} columns={16}>
          {allProduct?.map((p) => (
            <CardSection key={p._id} product={p} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Home;
