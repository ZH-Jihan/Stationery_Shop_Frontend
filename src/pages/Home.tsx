import CardSection from "@/components/Card";
import Carousol from "@/components/Carousol";
import { Grid } from "@mui/system";

const Home = () => {
  return (
    <>
      <Carousol />
      <Grid sx={{ my: 2, mx: 2 }} container spacing={2} columns={16}>
        <CardSection />
      </Grid>
    </>
  );
};

export default Home;
