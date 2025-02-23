import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/system";
const CardSection = () => {
  return (
    <>
      <Grid
        size={{
          xs: 16,
          sm: 8,
          md: 8,
          lg: 4,
        }}
      >
        <Card sx={{ margin: "auto" }}>
          <CardMedia
            sx={{ height: 239, width: "auto", borderRadius: 2 }}
            image="https://atwork.woolworths.com.au/wp-content/uploads/2024/12/diaries-organisers-and-planners.png"
            title="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ my: 1 }}
            >
              Lizard
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions sx={{ paddingTop: "15px" }}>
            <Button
              variant="text"
              color="info"
              size="small"
              sx={{ minWidth: 0, border: "1px solid", boxShadow: 5 }}
            >
              Add to Cart
            </Button>
            <Button
              variant="text"
              color="primary"
              size="small"
              sx={{ minWidth: 0, border: "1px solid", boxShadow: 5 }}
            >
              Details
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default CardSection;
