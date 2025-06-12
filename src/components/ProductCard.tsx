

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { TProduct } from "@/interface/product";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: TProduct }) {
  const { addToCart } = useCart();
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow flex flex-col items-center relative h-full">
      {product.saveAmount && product.discountPercentage && (
        <div className="absolute top-0 left-0 bg-purple-700 text-white text-xs font-semibold px-2 py-1 rounded-tl-lg rounded-br-lg">
          Save:{" "}
          {product.saveAmount.toLocaleString("bn-BD", {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 0,
          })}{" "}
          ({product.discountPercentage}%)
        </div>
      )}
      <Link
        href={`/products/${product._id}`}
        className="flex flex-col items-center w-full cursor-pointer group flex-grow"
      >
        <div className="w-full flex justify-center items-center overflow-hidden rounded mb-2 h-40">
          <Image
            src={product.image}
            alt={product.name || "product image"}
            width={120}
            height={120}
            className="object-contain group-hover:scale-105 transition"
          />
        </div>
        <span className="font-semibold text-center mb-2 text-gray-800 dark:text-gray-200 h-12 line-clamp-2">
          {product.name}
        </span>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-pink-600 font-bold text-lg">
            {product.price.toLocaleString("bn-BD", {
              style: "currency",
              currency: "BDT",
              minimumFractionDigits: 0,
            })}
          </span>
          {product.saveAmount && product.saveAmount > 0 && (
            <span className="text-gray-500 line-through text-sm">
              {(product.price + product.saveAmount).toLocaleString("bn-BD", {
                style: "currency",
                currency: "BDT",
                minimumFractionDigits: 0,
              })}
            </span>
          )}
        </div>
      </Link>
      <Button className="w-full mt-auto" onClick={() => addToCart(product)}>
        Add to Cart
      </Button>
    </div>
  );
}
