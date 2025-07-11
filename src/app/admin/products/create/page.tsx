"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TProduct } from "@/interface/product";
import { createProduct } from "@/services/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

// Add this helper function at the top of the file, after imports
const formatDateForInput = (date: Date | string | null): string => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

const formatDateForBackend = (dateString: string): string => {
  if (!dateString) return "";
  // Set time to 12:00 PM
  const date = new Date(dateString);
  date.setHours(12, 0, 0, 0);
  return date.toISOString();
};

// Define the form state type
interface ProductFormState {
  name: string;
  brand: string;
  price: string;
  image: File[];
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

export default function ProductCreatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ProductFormState>({
    name: "",
    brand: "",
    price: "",
    image: [],
    category: "",
    description: "",
    quantity: "",
    inStock: true,
    discountPercentage: "0",
    flashSale: false,
    flashSalePrice: "0",
    flashSaleEndTime: "",
    isFeatured: false,
    isNew: false,
    keyFeatures: [""],
    specifications: [""],
    warranty: "",
    isDeleted: false,
  } as ProductFormState);

  // Dynamic fields handlers
  const handleArrayChange = (
    field: "keyFeatures" | "specifications",
    idx: number,
    value: string
  ) => {
    setForm((prev) => {
      const arr = [...(prev[field] as string[])];
      arr[idx] = value;
      return { ...prev, [field]: arr };
    });
  };
  const addArrayField = (field: "keyFeatures" | "specifications") => {
    setForm((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };
  const removeArrayField = (
    field: "keyFeatures" | "specifications",
    idx: number
  ) => {
    setForm((prev) => {
      const arr = [...(prev[field] as string[])];
      arr.splice(idx, 1);
      return { ...prev, [field]: arr };
    });
  };

  // Image upload handler (multiple)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setForm((prev) => ({ ...prev, image: files }));
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert form data to match TProduct interface
      const productData = {
        name: form.name,
        brand: form.brand,
        price: Number(form.price),
        category: form.category as TProduct["category"],
        description: form.description,
        quantity: Number(form.quantity),
        inStock: form.inStock,
        discountPercentage: Number(form.discountPercentage),
        flashSale: form.flashSale,
        flashSalePrice: Number(form.flashSalePrice),
        flashSaleEndTime: form.flashSaleEndTime
          ? formatDateForBackend(form.flashSaleEndTime)
          : undefined,
        isFeatured: form.isFeatured,
        isNew: form.isNew,
        keyFeatures: form.keyFeatures.filter(
          (feature) => feature.trim() !== ""
        ),
        specifications: form.specifications.filter(
          (spec) => spec.trim() !== ""
        ),
        warranty: form.warranty,
        isDeleted: form.isDeleted,
      };

      // Convert File[] to actual File objects
      const imageFiles = form.image.map((file) => {
        if (file instanceof File) return file;
        // If it's a string (URL), create a File object from it
        return new File([], file);
      });

      await createProduct(productData as TProduct, imageFiles);
      toast.success("Product created successfully");
      router.push("/admin/products/view"); // Redirect to products list
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-2 py-8">
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-4 sm:p-8 md:p-12 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Create New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="font-medium mb-1 block">Product Name *</label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="font-medium mb-1 block">Brand *</label>
              <Input
                value={form.brand}
                onChange={(e) =>
                  setForm((f) => ({ ...f, brand: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="font-medium mb-1 block">Price ($) *</label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="font-medium mb-1 block">Quantity *</label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quantity: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="font-medium mb-1 block">Category *</label>
              <Select
                value={form.category}
                onValueChange={(val) =>
                  setForm((f) => ({ ...f, category: val }))
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
            </div>
            <div>
              <label className="font-medium mb-1 block">Warranty *</label>
              <Input
                value={form.warranty}
                onChange={(e) =>
                  setForm((f) => ({ ...f, warranty: e.target.value }))
                }
              />
            </div>
          </div>
          <div>
            <label className="font-medium mb-1 block">Description *</label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={3}
            />
          </div>
          <div>
            <label className="font-medium mb-1 block">Images *</label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            {form.image.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.image.map((file, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-muted px-2 py-1 rounded"
                  >
                    {file instanceof File ? file.name : String(file)}
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
                  setForm((f) => ({ ...f, inStock: val }))
                }
              />
              <span>In Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.isFeatured}
                onCheckedChange={(val) =>
                  setForm((f) => ({ ...f, isFeatured: val }))
                }
              />
              <span>Featured</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.isNew}
                onCheckedChange={(val) =>
                  setForm((f) => ({ ...f, isNew: val }))
                }
              />
              <span>New Arrival</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.isDeleted}
                onCheckedChange={(val) =>
                  setForm((f) => ({ ...f, isDeleted: val }))
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
                  setForm((f) => ({ ...f, discountPercentage: e.target.value }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.flashSale}
                onCheckedChange={(val) =>
                  setForm((f) => ({ ...f, flashSale: val }))
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
                    setForm((f) => ({ ...f, flashSalePrice: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flashSaleEndTime">Flash Sale End Date</Label>
                <Input
                  type="date"
                  id="flashSaleEndTime"
                  value={form.flashSaleEndTime}
                  onChange={(e) => {
                    const value = e.target.value;
                    setForm((f) => ({ ...f, flashSaleEndTime: value }));
                  }}
                  min={formatDateForInput(new Date())}
                  disabled={!form.flashSale}
                  onKeyDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.showPicker();
                  }}
                  style={{ cursor: "pointer" }}
                />
                <p className="text-sm text-gray-500">
                  Click to select the date when the flash sale should end (time
                  will be set to 12:00 PM)
                </p>
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
            {isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </div>
    </main>
  );
}
