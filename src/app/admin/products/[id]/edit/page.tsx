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
import { useEffect, useState } from "react";
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
}

export default function ProductEditPage() {
  const params = useParams();
  const productId = params?.id as string;

  const [form, setForm] = useState<ProductFormState | null>(null);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product data by ID
  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        // TODO: Replace with your actual API call
        const res = await getProductByID(productId);
        const p = res;
        setForm({
          name: p.name || "",
          brand: p.brand || "",
          price: String(p.price ?? ""),
          image: p.image || [],
          category: p.category || "",
          description: p.description || "",
          quantity: String(p.quantity ?? ""),
          inStock: p.inStock ?? true,
          discountPercentage: String(p.discountPercentage ?? "0"),
          flashSale: p.flashSale ?? false,
          flashSalePrice: String(p.flashSalePrice ?? "0"),
          flashSaleEndTime: p.flashSaleEndTime
            ? new Date(p.flashSaleEndTime).toISOString().slice(0, 16)
            : "",
          isFeatured: p.isFeatured ?? false,
          isNew: p.isNew ?? false,
          keyFeatures:
            p.keyFeatures && p.keyFeatures.length > 0 ? p.keyFeatures : [""],
          specifications:
            p.specifications && p.specifications.length > 0
              ? p.specifications
              : [""],
          warranty: p.warranty || "",
          isDeleted: p.isDeleted ?? false,
        });
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) fetchProduct();
  }, [productId]);

  // Dynamic fields handlers
  const handleArrayChange = (
    field: "keyFeatures" | "specifications",
    idx: number,
    value: string
  ) => {
    if (!form) return;
    setForm((prev) => {
      if (!prev) return prev;
      const arr = [...(prev[field] as string[])];
      arr[idx] = value;
      return { ...prev, [field]: arr };
    });
  };
  const addArrayField = (field: "keyFeatures" | "specifications") => {
    if (!form) return;
    setForm((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: [...(prev[field] as string[]), ""] };
    });
  };
  const removeArrayField = (
    field: "keyFeatures" | "specifications",
    idx: number
  ) => {
    if (!form) return;
    setForm((prev) => {
      if (!prev) return prev;
      const arr = [...(prev[field] as string[])];
      arr.splice(idx, 1);
      return { ...prev, [field]: arr };
    });
  };

  // Image upload handler (multiple)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setForm((prev) => (prev ? { ...prev, image: files } : prev));
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form) return;
    setIsSubmitting(true);
    setErrors({});
    // Basic validation
    const newErrors: ProductFormErrors = {};
    if (!form.name) newErrors.name = "Product name is required";
    if (!form.brand) newErrors.brand = "Brand is required";
    if (!form.price || isNaN(Number(form.price)))
      newErrors.price = "Valid price is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.quantity || isNaN(Number(form.quantity)))
      newErrors.quantity = "Valid quantity is required";
    if (!form.warranty) newErrors.warranty = "Warranty is required";
    if (form.image.length === 0)
      newErrors.image = "At least one image is required";
    if (
      form.flashSale &&
      (!form.flashSalePrice || isNaN(Number(form.flashSalePrice)))
    )
      newErrors.flashSalePrice = "Valid flash sale price is required";
    if (form.flashSale && !form.flashSaleEndTime)
      newErrors.flashSaleEndTime = "Flash sale end time is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }
    // TODO: Submit to API
    toast.success("Product updated successfully (mock)");
    setIsSubmitting(false);
    // Optionally redirect
    // router.push('/admin/products');
  };

  if (isLoading || !form) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-2 py-8">
        <div className="text-lg text-muted-foreground">Loading product...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-2 py-8">
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-4 sm:p-8 md:p-12 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Update Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="font-medium mb-1 block">Product Name *</label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => (f ? { ...f, name: e.target.value } : f))
                }
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="font-medium mb-1 block">Brand *</label>
              <Input
                value={form.brand}
                onChange={(e) =>
                  setForm((f) => (f ? { ...f, brand: e.target.value } : f))
                }
              />
              {errors.brand && (
                <p className="text-red-500 text-xs mt-1">{errors.brand}</p>
              )}
            </div>
            <div>
              <label className="font-medium mb-1 block">Price ($) *</label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => (f ? { ...f, price: e.target.value } : f))
                }
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="font-medium mb-1 block">Quantity *</label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  setForm((f) => (f ? { ...f, quantity: e.target.value } : f))
                }
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>
            <div>
              <label className="font-medium mb-1 block">Category *</label>
              <Select
                value={form.category}
                onValueChange={(val) =>
                  setForm((f) => (f ? { ...f, category: val } : f))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="font-medium mb-1 block">Warranty *</label>
              <Input
                value={form.warranty}
                onChange={(e) =>
                  setForm((f) => (f ? { ...f, warranty: e.target.value } : f))
                }
              />
              {errors.warranty && (
                <p className="text-red-500 text-xs mt-1">{errors.warranty}</p>
              )}
            </div>
          </div>
          <div>
            <label className="font-medium mb-1 block">Description *</label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => (f ? { ...f, description: e.target.value } : f))
              }
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <label className="font-medium mb-1 block">Images *</label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
            {form.image.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {(form.image as (File | string)[]).map((file, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-muted px-2 py-1 rounded"
                  >
                    {typeof file === "string" ? file : file.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center gap-2">
              <Switch
                checked={form.inStock}
                onCheckedChange={(val) =>
                  setForm((f) => (f ? { ...f, inStock: val } : f))
                }
              />
              <span>In Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.isFeatured}
                onCheckedChange={(val) =>
                  setForm((f) => (f ? { ...f, isFeatured: val } : f))
                }
              />
              <span>Featured</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.isNew}
                onCheckedChange={(val) =>
                  setForm((f) => (f ? { ...f, isNew: val } : f))
                }
              />
              <span>New Arrival</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.isDeleted}
                onCheckedChange={(val) =>
                  setForm((f) => (f ? { ...f, isDeleted: val } : f))
                }
              />
              <span>Deleted</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="font-medium mb-1 block">Discount (%)</label>
              <Input
                type="number"
                value={form.discountPercentage}
                onChange={(e) =>
                  setForm((f) =>
                    f ? { ...f, discountPercentage: e.target.value } : f
                  )
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.flashSale}
                onCheckedChange={(val) =>
                  setForm((f) => (f ? { ...f, flashSale: val } : f))
                }
              />
              <span>Flash Sale</span>
            </div>
          </div>
          {form.flashSale && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="font-medium mb-1 block">
                  Flash Sale Price
                </label>
                <Input
                  type="number"
                  value={form.flashSalePrice}
                  onChange={(e) =>
                    setForm((f) =>
                      f ? { ...f, flashSalePrice: e.target.value } : f
                    )
                  }
                />
                {errors.flashSalePrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.flashSalePrice}
                  </p>
                )}
              </div>
              <div>
                <label className="font-medium mb-1 block">
                  Flash Sale End Time
                </label>
                <Input
                  type="datetime-local"
                  value={form.flashSaleEndTime}
                  onChange={(e) =>
                    setForm((f) =>
                      f ? { ...f, flashSaleEndTime: e.target.value } : f
                    )
                  }
                />
                {errors.flashSaleEndTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.flashSaleEndTime}
                  </p>
                )}
              </div>
            </div>
          )}
          <div>
            <label className="font-medium mb-1 block">Key Features</label>
            {form.keyFeatures.map((feature, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={feature}
                  onChange={(e) =>
                    handleArrayChange("keyFeatures", idx, e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeArrayField("keyFeatures", idx)}
                  disabled={form.keyFeatures.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => addArrayField("keyFeatures")}
            >
              Add Feature
            </Button>
          </div>
          <div>
            <label className="font-medium mb-1 block">Specifications</label>
            {form.specifications.map((spec, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={spec}
                  onChange={(e) =>
                    handleArrayChange("specifications", idx, e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeArrayField("specifications", idx)}
                  disabled={form.specifications.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() => addArrayField("specifications")}
            >
              Add Specification
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Update Product"}
          </Button>
        </form>
      </div>
    </main>
  );
}
