import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { TProduct } from "@/interface/product";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ProductCard({ product }: { product: TProduct }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product._id}`}>
          {/* Discount Badge */}
          {/* {product.saveAmount && product.discountPercentage && (
            <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {product.discountPercentage}% OFF
            </div>
          )} */}

          {/* Wishlist Button */}
          <button
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all duration-300"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full">
            <Image
              src={product?.image[0]}
              alt={product.name || "product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Quick Add to Cart Button */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 p-3 transform transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <Button
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product._id}`} className="block">
          {/* Brand */}
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
            {product.brand}
          </span>

          {/* Product Name */}
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              (4.5)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
            </span>
            {/* {product.saveAmount && product.saveAmount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {(product.price + product.saveAmount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </span>
            )} */}
          </div>
        </Link>
      </div>
    </div>
  );
}
