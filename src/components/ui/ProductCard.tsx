import { useDeleteProductMutation } from "@/redux/features/admin/productManagementApi";
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TProductResponse } from "@/types/productType";
import { verifyToken } from "@/utils/verifyToken";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface TProps {
  product: TProductResponse;
}

const ProductCard: React.FC<TProps> = ({ product }) => {
  console.log(product);
  
  const [openModal, setOpenModal] = useState(false);
  const token = useAppSelector(useCurrentToken);
  const user = token ? (verifyToken(token) as TUser) : null;
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProduct(id).unwrap();
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ margin: "auto", height: "100%", position: "relative" }}>
          <CardMedia
            component="img"
            sx={{
              height: 240,
              width: "100%",
              objectFit: "cover",
              borderRadius: "8px 8px 0 0",
            }}
            image={product?.image}
            alt={product?.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" height={60}>
              {product.description}
            </Typography>
            <Typography variant="h6" color="primary" mt={1}>
              ${product.price}
            </Typography>
          </CardContent>
          
          <CardActions sx={{ padding: 2 }}>
            {user?.role === "admin" ? (
              <>
                <Button
                  component={Link}
                  to={`/${user.role}/update-product/${product._id}`}
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setOpenModal(true)}
                  variant="contained"
                  color="error"
                  size="small"
                  fullWidth
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                >
                  Details
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpenModal(false);
              handleDelete(product._id);
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;