"use client";

import TableSection from "@/components/app/productDetails/TableSection";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { TProduct } from "@/interface/product";
import { getProductByID } from "@/services/product";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

function ProductDetailsContent() {
  const params = useParams();
  const productId = params?.id as string;
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<TProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const data = await getProductByID(productId);
        setProduct(data);
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

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAddingToCart(true);
    try {
      await addToCart(product, quantity);
      toast.success("Added to cart successfully");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    setIsAddingToCart(true);
    try {
      addToCart(product, quantity);
      toast.success("Added to cart successfully");
      // Redirect to checkout
      router.push("/checkout");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
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

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

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
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage && product.discountPercentage > 0 && (
              <>
                <span className="text-gray-500 dark:text-gray-400 line-through mr-4">
                  {formatPrice(product.price)}
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
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={isAddingToCart}
                variant="default"
                className="flex-1"
              >
                {isAddingToCart ? "Processing..." : "Buy Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs Section */}
      <TableSection product={product} />
    </div>
  );
}
export default function ProductDetailsPage() {
  return (
    <main className="min-h-screen bg-background">
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
        <ProductDetailsContent />
      </Suspense>
    </main>
  );
}
