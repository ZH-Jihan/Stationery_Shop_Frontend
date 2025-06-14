import config from "@/config";
import { TProduct } from "@/interface/product";
import { getAuthHeaders } from "@/utils/auth";

export const createProduct = async (product: TProduct, files: File[]) => {
  try {
    const headers = await getAuthHeaders();
    console.log(headers);
    // Create FormData instance
    const formData = new FormData();

    // Append all files
    files.forEach((file) => {
      formData.append("files", file);
    });

    // Append product data as JSON string
    formData.append("data", JSON.stringify(product));

    const res = await fetch(`${config.dbUrl}/products`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create product");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getProductByID = async (id: string) => {
  try {
    const res = await fetch(`${config.dbUrl}/products/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const res = await fetch(`${config.dbUrl}/products`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  product: Partial<TProduct>,
  files?: File[]
) => {
  try {
    const headers = await getAuthHeaders();

    const formData = new FormData();

    // Append files if provided
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    // Append product data as JSON string
    formData.append("data", JSON.stringify(product));

    const res = await fetch(`${config.dbUrl}/products/${id}`, {
      method: "PUT",
      headers,
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update product");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(`${config.dbUrl}/products/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to delete product");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
