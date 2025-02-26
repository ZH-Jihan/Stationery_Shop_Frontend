import { useGetSIngleProductQuery } from "@/redux/features/product/produtcApi";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const { data: product } = useGetSIngleProductQuery(productId);
  const navigate = useNavigate();
  const theme = useTheme();
  //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <h1>{product?.name} Details</h1>
      </div>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "80%",
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "background.paper",
                boxShadow: 2,
                aspectRatio: "1 / 1",
              }}
            >
              <img
                src={product?.image}
                alt={product?.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: theme.spacing(2),
                }}
              />
              <Chip
                label={product?.category}
                color="secondary"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontWeight: "bold",
                }}
              />
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "80%" }}
            >
              <Typography variant="h3" component="h1" gutterBottom>
                {product?.name}
              </Typography>

              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                by {product?.brand}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                Category {product?.category}
              </Typography>

              <Typography
                variant="h4"
                color="primary"
                gutterBottom
                sx={{ mt: 2 }}
              >
                ${product?.price.toFixed(2)}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                {product?.description}
              </Typography>

              <Box sx={{ mt: "auto", mb: 2 }}>
                <Typography
                  variant="body2"
                  color={product?.inStock ? "success.main" : "error.main"}
                  sx={{ fontWeight: "bold" }}
                >
                  {product?.inStock
                    ? `${product.quantity} left in stock`
                    : "Out of Stock"}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    disabled={!product?.inStock}
                    sx={{ py: 1.5 }}
                  >
                    Add to Cart
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={() => navigate(`/checkout/${product?._id}`)}
                    startIcon={<CreditScoreIcon />}
                    disabled={!product?.inStock}
                    sx={{ py: 1.5 }}
                  >
                    Buy Now
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductDetails;
