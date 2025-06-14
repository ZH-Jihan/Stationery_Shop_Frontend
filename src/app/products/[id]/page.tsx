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
  const [selectedImage, setSelectedImage] = useState(0);
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
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Home &gt; {product.category} &gt; {product.name}
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column: Product Image Gallery */}
        <div>
          <div className="bg-gray-200 dark:bg-gray-700 h-96 flex items-center justify-center rounded-lg mb-4">
            <Image
              src={product.image[selectedImage]}
              alt={product.name}
              width={400}
              height={400}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          {/* Thumbnail Gallery */}
          {product.image.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
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
            {product.discountPercentage && product.discountPercentage > 0 && (
              <>
                <span className="text-gray-500 dark:text-gray-400 line-through mr-4">
                  {formatPrice(
                    product.price * (1 + product.discountPercentage / 100)
                  )}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Save: {product.discountPercentage}%
                </span>
              </>
            )}
          </div>

          {/* Product Status and Details */}
          <div className="mb-6 text-gray-800 dark:text-gray-200">
            <p className="mb-1">
              Status: {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p className="mb-1">Brand: {product.brand}</p>
            <p className="mb-1">Category: {product.category}</p>
            <p className="mb-1">Warranty: {product.warranty}</p>
            {product.isNew && (
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                New Arrival
              </span>
            )}
            {product.isFeatured && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2">
                Featured
              </span>
            )}
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              {product.keyFeatures.map((feature, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Flash Sale Info */}
          {product.flashSale && product.flashSalePrice && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                Flash Sale!
              </h3>
              <p className="text-red-700 dark:text-red-300">
                Special Price: {formatPrice(product.flashSalePrice)}
              </p>
              {product.flashSaleEndTime && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  Ends: {new Date(product.flashSaleEndTime).toLocaleString()}
                </p>
              )}
            </div>
          )}

          {/* Quantity and Buy Now Button */}
          <div className="flex items-center mb-6">
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
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="bg-green-600 hover:bg-green-700"
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <TableSection product={product} />
    </div>
  );
};

export default ProductDetailsPage;
