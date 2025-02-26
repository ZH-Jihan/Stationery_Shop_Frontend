import { useCreateOrdersMutation } from "@/redux/features/order/orderApi";
import { useGetSIngleProductQuery } from "@/redux/features/product/produtcApi";
import { TError } from "@/types/globelType";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Alert,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: 1200,
    margin: "0 auto",
  },
  productImage: {
    width: "100%",
    maxWidth: 300,
    height: 200,
    borderRadius: theme.shape.borderRadius,
  },
  section: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));

type Discount = number | ((subtotal: number) => number);

const validCoupons: { [key: string]: Discount } = {
  DISCOUNT20: (subtotal) => subtotal * 0.2,
  SAVE10: 10,
  // Add other coupons as needed
};

const CheckOutPage = () => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const { productId } = useParams();
  const { data: product } = useGetSIngleProductQuery(productId);
  const [createOrder, { isSuccess, data }] = useCreateOrdersMutation();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleApplyCoupon = () => {
    if (validCoupons[couponCode]) {
      setDiscount(validCoupons[couponCode]);
      setIsCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setDiscount(0);
      setIsCouponApplied(false);
    }
  };

  const calculateSubtotal = () => product?.price * quantity;
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    let discountAmount = 0;

    if (typeof discount === "number") {
      discountAmount = discount;
    } else if (typeof discount === "function") {
      discountAmount = discount(subtotal);
    }

    return subtotal + 20 - discountAmount;
  };

  const handlePayment = async () => {
    const data = {
      product: product?._id,
      quantity: quantity,
      totalPrice: calculateTotal(),
    };
    try {
      await createOrder(data).unwrap();
    } catch (error) {
      console.log(error);
      const typedError = error as TError;
      const errorMessage =
        typedError?.errorSources?.[0]?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isSuccess && data?.data) {
      window.location.href = data.data;
    }
  }, [data, isSuccess]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Paper className={classes.section} elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img
              src={product?.image}
              alt={product?.name}
              className={classes.productImage}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              ${product?.price.toFixed(2)}
            </Typography>

            <div className={classes.quantityControl}>
              <Typography variant="body1">Quantity:</Typography>
              <IconButton onClick={() => handleQuantityChange(quantity - 1)}>
                <RemoveIcon />
              </IconButton>
              <TextField
                value={quantity}
                type="number"
                inputProps={{ min: 1 }}
                variant="outlined"
                size="small"
                style={{ width: 80 }}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              />
              <IconButton onClick={() => handleQuantityChange(quantity + 1)}>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.section} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6" gutterBottom>
              Price Details
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Typography>Subtotal ({quantity} items):</Typography>
              <Typography>${calculateSubtotal().toFixed(2)}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Delivery Charge:</Typography>
              <Typography>${20}</Typography>
            </Grid>
            {discount > 0 && (
              <Grid container justifyContent="space-between">
                <Typography color="secondary">Discount:</Typography>
                <Typography color="secondary">
                  -${discount.toFixed(2)}
                </Typography>
              </Grid>
            )}
            <Divider style={{ margin: "16px 0" }} />
            <Grid container justifyContent="space-between">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">
                ${calculateTotal().toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.section} elevation={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Coupon Code"
              variant="filled"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={isCouponApplied}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleApplyCoupon}
              disabled={isCouponApplied}
            >
              {isCouponApplied ? "Coupon Applied" : "Apply Coupon"}
            </Button>
          </Grid>
          {couponError && (
            <Grid item xs={12}>
              <Alert severity="error">{couponError}</Alert>
            </Grid>
          )}
        </Grid>
      </Paper>

      <Button
        fullWidth
        onClick={handlePayment}
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: 16 }}
      >
        Proceed to Payment
      </Button>
    </div>
  );
};

export default CheckOutPage;
