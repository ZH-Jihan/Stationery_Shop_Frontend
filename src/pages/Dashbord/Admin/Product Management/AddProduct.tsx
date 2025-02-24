import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/admin/productManagementApi";
import { useGetSIngleProductQuery } from "@/redux/features/product/produtcApi";
import {
  Box,
  Button,
  FormControl,
  Input,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
}));

const PreviewImage = styled("img")({
  maxWidth: "100%",
  height: "200px",
  objectFit: "contain",
  borderRadius: "8px",
  marginTop: "16px",
});

interface AddProductProps {
  productId?: string;
  onSuccess?: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ productId, onSuccess }) => {
  const isEditMode = !!productId;
  const { data: productData } = useGetSIngleProductQuery(productId || "", {
    skip: !productId,
  });

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [data, setData] = useState({
    name: "",
    brand: "",
    price: 0,
    image: null as File | string | null,
    category: "",
    description: "",
    quantity: 0,
    inStock: true,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && productData) {
      setData({
        name: productData.name,
        brand: productData.brand,
        price: productData.price,
        image: productData.image || null,
        category: productData.category,
        description: productData.description,
        quantity: productData.quantity,
        inStock: productData.inStock,
      });

      if (productData.image) {
        setImagePreview(productData.image);
      }
    }
  }, [productData, isEditMode]);

  const handleChange = (event) => {
    const { name, value, checked, type, files } = event.target;
    let inputValue;

    switch (type) {
      case "checkbox":
        inputValue = checked;
        break;
      case "file":
        inputValue = files?.[0] || null;
        if (files?.[0]) {
          setImagePreview(URL.createObjectURL(files[0]));
        }
        break;
      case "number":
        inputValue = Number(value);
        break;
      default:
        inputValue = value;
    }

    setData((prev) => ({ ...prev, [name]: inputValue }));
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const tostId = toast.loading("Please wait...");
    const formData = new FormData();
    const { image, ...restData } = data;

    // Append image only if it's a File (new upload)
    if (image instanceof File) {
      formData.append("file", image);
    }

    formData.append("data", JSON.stringify(restData));

    try {
      if (isEditMode) {
        console.log(formData);

        const res = await updateProduct({
          id: productId,
          body: formData,
        }).unwrap();
        toast.success(res.message, { id: tostId });
        console.log(res);
      } else {
        const res = await createProduct(formData).unwrap();
        if (res?.success === true) {
          toast.success(res.message, { id: tostId });
          console.log(res);

          event.target.value = null;
        }
      }
      onSuccess?.();
    } catch (error: any) {
      toast.success(`Error: ${error?.message}`, { id: tostId });
      console.error("Submission error:", error);
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        {isEditMode ? "Edit Product" : "Add New Product"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Product Name */}
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <FormLabel required sx={{ fontWeight: "bold", mb: 1 }}>
                Product Name
              </FormLabel>
              <Input
                name="name"
                value={data.name}
                onChange={handleChange}
                required
                sx={{ bgcolor: "background.paper", borderRadius: 1 }}
              />
            </FormControl>
          </Grid>

          {/* Brand */}
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <FormLabel required sx={{ fontWeight: "bold", mb: 1 }}>
                Brand
              </FormLabel>
              <Input
                name="brand"
                value={data.brand}
                onChange={handleChange}
                required
                sx={{ bgcolor: "background.paper", borderRadius: 1 }}
              />
            </FormControl>
          </Grid>

          {/* Category */}
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <FormLabel required sx={{ fontWeight: "bold", mb: 1 }}>
                Category
              </FormLabel>
              <Select
                name="category"
                value={data.category}
                onChange={handleChange}
                required
                sx={{ bgcolor: "background.paper", borderRadius: 1 }}
              >
                <MenuItem value="Writing">Writing</MenuItem>
                <MenuItem value="Office Supplies">Office Supplies</MenuItem>
                <MenuItem value="Art Supplies">Art Supplies</MenuItem>
                <MenuItem value="Educational">Educational</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Price */}
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <FormLabel required sx={{ fontWeight: "bold", mb: 1 }}>
                Price ($)
              </FormLabel>
              <Input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                required
                sx={{ bgcolor: "background.paper", borderRadius: 1 }}
              />
            </FormControl>
          </Grid>

          {/* Quantity */}
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <FormLabel required sx={{ fontWeight: "bold", mb: 1 }}>
                Quantity
              </FormLabel>
              <Input
                type="number"
                name="quantity"
                value={data.quantity}
                onChange={handleChange}
                required
                sx={{ bgcolor: "background.paper", borderRadius: 1 }}
              />
            </FormControl>
          </Grid>

          {/* In Stock */}
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="inStock"
                  checked={data.inStock}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  In Stock
                </Typography>
              }
            />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
              <FormLabel required sx={{ fontWeight: "bold", mb: 1 }}>
                Product Image
              </FormLabel>
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 2,
                  textAlign: "center",
                }}
              >
                <Input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  inputProps={{ accept: "image/*" }}
                  sx={{ display: "none" }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outlined" component="span">
                    Choose File
                  </Button>
                </label>
                {imagePreview ? (
                  <PreviewImage src={imagePreview} alt="Product Preview" />
                ) : typeof data.image === "string" ? (
                  <PreviewImage src={data.image} alt="Existing Product" />
                ) : (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    No file chosen
                  </Typography>
                )}
              </Box>
            </FormControl>
          </Grid>

          {/* Description */}
          <Grid item xs={12} md={6} lg={6}>
            <FormControl fullWidth>
              <FormLabel required sx={{ fontWeight: "bold", mb: 1 }}>
                Description
              </FormLabel>
              <Input
                name="description"
                value={data.description}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ bgcolor: "background.paper", borderRadius: 1 }}
              />
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ py: 1, fontWeight: "bold", fontSize: "1.1rem" }}
            >
              {isEditMode ? "Update Product" : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default AddProduct;
