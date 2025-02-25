import CardSection from "@/components/Card";
import Loading from "@/components/Loading";
import { useGetAllProductQuery } from "@/redux/features/product/produtcApi";
import { Grid } from "@mui/system";
import { useState } from "react";

const AllProducts = () => {
  const [params, setParams] = useState({});
  const { data: allProduct, isLoading } = useGetAllProductQuery(params);
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          paddingTop: 70,
          width: "25%",
          margin: "auto",
        }}
      >
        <h1>All Products</h1>
      </div>
      {!allProduct || isLoading ? (
        <Loading variant="grid" />
      ) : (
        <Grid sx={{ my: 2, mx: 2 }} container spacing={2} columns={16}>
          {allProduct?.map((p) => (
            <CardSection key={p._id} product={p} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AllProducts;
