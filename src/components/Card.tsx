import { TProductResponse } from "@/types/productType";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

interface TProps {
  product: TProductResponse;
}
const CardSection: React.FC<TProps> = ({ product }) => {
  const navigate = useNavigate();

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
        <Card sx={{ margin: "auto", height: "100%" }}>
          <CardMedia
            sx={{ height: 230, borderRadius: 2 }}
            image={product.image}
            title="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ my: 1, height: 30 }}
            >
              {product.name}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ my: 1 }}
            >
              $-{product.price}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", height: 50 }}
            >
              {product.description}
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
              onClick={() => navigate(`/produc-detail/${product._id}`)}
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
