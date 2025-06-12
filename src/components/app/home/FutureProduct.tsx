"use client";

import { ProductCard } from "@/components/ProductCard";
import { TProduct } from "@/interface/product";
import { getAllProducts } from "@/services/product";
import { useEffect, useState } from "react";

const ProductSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow flex flex-col items-center relative h-full animate-pulse">
      <div className="w-full flex justify-center items-center overflow-hidden rounded mb-2 h-40 bg-gray-200 dark:bg-gray-700" />
      <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="w-1/2 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded mt-auto" />
    </div>
  );
};

const FutureProduct = () => {
  const [allProducts, setAllProducts] = useState<TProduct[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setAllProducts(products.data);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="w-full mb-6 sm:mb-8">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 sm:mb-6 animate-pulse" />
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full mb-6 sm:mb-8 text-center text-red-500">
        Error: {error}
      </section>
    );
  }

  return (
    <section className="w-full mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {allProducts?.map((i: TProduct) => (
          <ProductCard key={i._id} product={i} />
        ))}
      </div>
    </section>
  );
};

export default FutureProduct;
