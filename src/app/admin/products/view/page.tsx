"use client";

import { Button } from "@/components/ui/button";
import { TProduct } from "@/interface/product";
import { getAllProducts } from "@/services/product";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductsViewPage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        // TODO: Replace with your actual API call
        const res = await getAllProducts();
        setProducts(res.data || []);
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setDeletingId(id);
    try {
      // TODO: Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="p-4 sm:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">All Products</h1>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900">
        {loading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No products found.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Brand</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-right font-semibold">Price</th>
                <th className="px-4 py-3 text-right font-semibold">Stock</th>
                <th className="px-4 py-3 text-center font-semibold">
                  Featured
                </th>
                <th className="px-4 py-3 text-center font-semibold">New</th>
                <th className="px-4 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                >
                  <td className="px-4 py-3 whitespace-nowrap font-medium">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {product.brand}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    {product.inStock ? product.quantity : 0}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {product?.isFeatured ? (
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-green-500"
                        title="Featured"
                      />
                    ) : (
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"
                        title="Not featured"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {product?.isNew ? (
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-blue-500"
                        title="New"
                      />
                    ) : (
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"
                        title="Not new"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <Link href={`/admin/products/${product._id}/edit`}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="mr-2"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Delete"
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
