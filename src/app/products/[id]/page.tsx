"use client";

import TableSection from "@/components/app/productDetails/TableSection";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { TProduct } from "@/interface/product";
import { getProductByID } from "@/services/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const ProductDetailsPage = (props: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<TProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const params = use(props.params);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByID(params.id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      router.push("/checkout");
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs Placeholder */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Home &gt; {product.category} &gt; {product.name}
      </div>

      {/* Main content area - adjust grid/flex for responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column: Product Image Gallery */}
        <div>
          <div className="bg-gray-200 dark:bg-gray-700 h-96 flex items-center justify-center rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Right column: Product Info and Add to Cart */}
        <div>
          {/* Product Title and Price */}
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {product.name}
          </h1>
          <div className="text-gray-800 dark:text-gray-200 mb-4">
            <span className="text-pink-600 dark:text-pink-400 text-2xl font-semibold mr-2">
              {formatPrice(product.price)}
            </span>
            {product.saveAmount && product.saveAmount > 0 && (
              <>
                <span className="text-gray-500 dark:text-gray-400 line-through mr-4">
                  {formatPrice(product.price + product.saveAmount)}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Save: {formatPrice(product.saveAmount)} (
                  {product.discountPercentage}%)
                </span>
              </>
            )}
          </div>
          <div className="mb-6 text-gray-800 dark:text-gray-200">
            <p className="mb-1">
              Status: {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p className="mb-1">Product Code: {product._id}</p>
            <p className="mb-1">Brand: {product.brand}</p>
          </div>

          {/* Key Features */}
          <div className="mb-6 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside ml-4">
              <li>Category: {product.category}</li>
              <li>Description: {product.description}</li>
              <li>Available Quantity: {product.quantity}</li>
            </ul>
          </div>

          {/* View More Info Link */}
          <div className="mb-6">
            <a
              href="#specification-content"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View More Info
            </a>
          </div>

          {/* Quantity and Buy Now Button */}
          <div className="flex items-center mb-6">
            {/* Quantity selector with plus/minus buttons */}
            <div className="mr-4 flex items-center border rounded-md border-gray-300 dark:border-gray-600">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-md focus:outline-none"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                className="w-12 text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md focus:outline-none"
              >
                +
              </button>
            </div>
            {/* Add to Cart and Buy Now buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="bg-green-600 hover:bg-green-700"
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Save and Add to Compare */}
          <div className="flex space-x-6 text-blue-600 dark:text-blue-400 text-sm font-semibold">
            <button className="hover:underline focus:outline-none">Save</button>
            <button className="hover:underline focus:outline-none">
              Add to Compare
            </button>
            <p className="text-orange-600">- This tow feature coming soon</p>
          </div>
        </div>
      </div>

      {/* Tabs Section (Specification, Description, Questions, Reviews) */}
      <TableSection />

      {/* Related Product Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Related Products
        </h2>
        {/* Related products grid/list placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              Related Product 1
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              Related Product 2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
