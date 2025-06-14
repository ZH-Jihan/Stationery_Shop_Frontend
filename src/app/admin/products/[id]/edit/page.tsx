"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getProductByID } from "@/services/product";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

const CATEGORY_OPTIONS = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports & Outdoors",
  "Books & Media",
  "Toys & Games",
  "Health & Wellness",
  "Automotive",
  "Pet Supplies",
  "Other",
];

interface ProductFormState {
  name: string;
  brand: string;
  price: string;
  image: File[] | string[];
  category: string;
  description: string;
  quantity: string;
  inStock: boolean;
  discountPercentage: string;
  flashSale: boolean;
  flashSalePrice: string;
  flashSaleEndTime: string;
  isFeatured: boolean;
  isNew: boolean;
  keyFeatures: string[];
  specifications: string[];
  warranty: string;
  isDeleted: boolean;
}

interface ProductFormErrors {
  name?: string;
  brand?: string;
  price?: string;
  image?: string;
  category?: string;
  description?: string;
  quantity?: string;
  warranty?: string;
  flashSalePrice?: string;
  flashSaleEndTime?: string;
  discountPercentage?: string;
}

function ProductEditContent() {
  const params = useParams();
  const productId = params?.id as string;
  const [formData, setFormData] = useState<ProductFormState>({
    name: "",
    brand: "",
    price: "",
    image: [],
    category: "",
    description: "",
    quantity: "",
    inStock: true,
    discountPercentage: "",
    flashSale: false,
    flashSalePrice: "",
    flashSaleEndTime: "",
    isFeatured: false,
    isNew: false,
    keyFeatures: [],
    specifications: [],
    warranty: "",
    isDeleted: false,
  });
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const data = await getProductByID(productId);
        setFormData({
          name: data.name,
          brand: data.brand,
          price: data.price.toString(),
          image: data.image,
          category: data.category,
          description: data.description,
          quantity: data.quantity.toString(),
          inStock: data.inStock ?? true,
          discountPercentage: data.discountPercentage?.toString() ?? "",
          flashSale: data.flashSale ?? false,
          flashSalePrice: data.flashSalePrice?.toString() ?? "",
          flashSaleEndTime: data.flashSaleEndTime
            ? new Date(data.flashSaleEndTime).toISOString().slice(0, 16)
            : "",
          isFeatured: data.isFeatured ?? false,
          isNew: data.isNew ?? false,
          keyFeatures: data.keyFeatures,
          specifications: data.specifications,
          warranty: data.warranty,
          isDeleted: data.isDeleted ?? false,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ProductFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleKeyFeatureChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newKeyFeatures = [...prev.keyFeatures];
      newKeyFeatures[index] = value;
      return {
        ...prev,
        keyFeatures: newKeyFeatures,
      };
    });
  };

  const handleSpecificationChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newSpecifications = [...prev.specifications];
      newSpecifications[index] = value;
      return {
        ...prev,
        specifications: newSpecifications,
      };
    });
  };

  const addKeyFeature = () => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, ""],
    }));
  };

  const removeKeyFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index),
    }));
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, ""],
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        image: Array.from(files),
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ProductFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
    }
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (
      isNaN(Number(formData.quantity)) ||
      Number(formData.quantity) < 0
    ) {
      newErrors.quantity = "Quantity must be a non-negative number";
    }
    if (!formData.warranty.trim()) {
      newErrors.warranty = "Warranty is required";
    }
    if (formData.flashSale) {
      if (!formData.flashSalePrice.trim()) {
        newErrors.flashSalePrice = "Flash sale price is required";
      } else if (
        isNaN(Number(formData.flashSalePrice)) ||
        Number(formData.flashSalePrice) <= 0
      ) {
        newErrors.flashSalePrice = "Flash sale price must be a positive number";
      }
      if (!formData.flashSaleEndTime) {
        newErrors.flashSaleEndTime = "Flash sale end time is required";
      }
    }
    if (formData.discountPercentage) {
      const discount = Number(formData.discountPercentage);
      if (isNaN(discount) || discount < 0 || discount > 100) {
        newErrors.discountPercentage = "Discount must be between 0 and 100";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement update product API call
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium mb-2">
            Brand
          </label>
          <Input
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            error={errors.brand}
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2">
            Price
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            error={errors.price}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <Select
            name="category"
            value={formData.category}
            onValueChange={(value) =>
              handleInputChange({
                target: { name: "category", value },
              } as React.ChangeEvent<HTMLSelectElement>)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-2">
            Quantity
          </label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={formData.quantity}
            onChange={handleInputChange}
            error={errors.quantity}
          />
        </div>

        <div>
          <label htmlFor="warranty" className="block text-sm font-medium mb-2">
            Warranty
          </label>
          <Input
            id="warranty"
            name="warranty"
            value={formData.warranty}
            onChange={handleInputChange}
            error={errors.warranty}
          />
        </div>

        <div>
          <label
            htmlFor="discountPercentage"
            className="block text-sm font-medium mb-2"
          >
            Discount Percentage
          </label>
          <Input
            id="discountPercentage"
            name="discountPercentage"
            type="number"
            min="0"
            max="100"
            value={formData.discountPercentage}
            onChange={handleInputChange}
            error={errors.discountPercentage}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="inStock"
              checked={formData.inStock}
              onCheckedChange={(checked) =>
                handleSwitchChange("inStock", checked)
              }
            />
            <label htmlFor="inStock" className="text-sm font-medium">
              In Stock
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="flashSale"
              checked={formData.flashSale}
              onCheckedChange={(checked) =>
                handleSwitchChange("flashSale", checked)
              }
            />
            <label htmlFor="flashSale" className="text-sm font-medium">
              Flash Sale
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) =>
                handleSwitchChange("isFeatured", checked)
              }
            />
            <label htmlFor="isFeatured" className="text-sm font-medium">
              Featured Product
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isNew"
              checked={formData.isNew}
              onCheckedChange={(checked) =>
                handleSwitchChange("isNew", checked)
              }
            />
            <label htmlFor="isNew" className="text-sm font-medium">
              New Product
            </label>
          </div>
        </div>

        {formData.flashSale && (
          <>
            <div>
              <label
                htmlFor="flashSalePrice"
                className="block text-sm font-medium mb-2"
              >
                Flash Sale Price
              </label>
              <Input
                id="flashSalePrice"
                name="flashSalePrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.flashSalePrice}
                onChange={handleInputChange}
                error={errors.flashSalePrice}
              />
            </div>

            <div>
              <label
                htmlFor="flashSaleEndTime"
                className="block text-sm font-medium mb-2"
              >
                Flash Sale End Time
              </label>
              <Input
                id="flashSaleEndTime"
                name="flashSaleEndTime"
                type="datetime-local"
                value={formData.flashSaleEndTime}
                onChange={handleInputChange}
                error={errors.flashSaleEndTime}
              />
            </div>
          </>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          error={errors.description}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Key Features</label>
        <div className="space-y-2">
          {formData.keyFeatures.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeKeyFeature(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addKeyFeature}>
            Add Feature
          </Button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Specifications</label>
        <div className="space-y-2">
          {formData.specifications.map((spec, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={spec}
                onChange={(e) =>
                  handleSpecificationChange(index, e.target.value)
                }
                placeholder={`Specification ${index + 1}`}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeSpecification(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addSpecification}>
            Add Specification
          </Button>
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-2">
          Images
        </label>
        <Input
          id="image"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          error={errors.image}
        />
        {formData.image.length > 0 && (
          <div className="mt-2 grid grid-cols-4 gap-4">
            {formData.image.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt={`Product image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Product"}
        </Button>
      </div>
    </form>
  );
}

export default function ProductEditPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading product...</p>
            </div>
          </div>
        }
      >
        <ProductEditContent />
      </Suspense>
    </main>
  );
}
