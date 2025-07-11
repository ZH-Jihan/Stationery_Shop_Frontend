"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function CartContent() {
  const {
    isCartOpen,
    cartItems,
    toggleCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice =
      item.flashSale && item.flashSalePrice ? item.flashSalePrice : item.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const originalSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalDiscount = originalSubtotal - subtotal;

  const handleProceedToCheckout = () => {
    toggleCart(); // Close the cart sidebar
    router.push("/checkout"); // Navigate to the checkout page
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}
      `}
      style={{ zIndex: 1000 }} // Ensure it's on top
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Your Cart ({cartItems.length})
        </h2>
        <Button onClick={toggleCart} variant="ghost" size="icon">
          X
        </Button>
      </div>
      <div
        className="flex-grow p-4 overflow-y-auto"
        style={{ maxHeight: "calc(100% - 150px)" }}
      >
        {cartItems.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            Your cart is empty.
          </p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex items-center space-x-4 mb-4">
              <Image
                src={item.image[0]}
                alt={item.name}
                width={60}
                height={60}
                className="rounded object-cover"
              />
              <div className="flex-grow">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {item.name}
                </p>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => decreaseQuantity(item._id)}
                    className="px-2 py-0 h-auto"
                  >
                    -
                  </Button>
                  <span className="mx-1">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => increaseQuantity(item._id)}
                    className="px-2 py-0 h-auto"
                  >
                    +
                  </Button>
                  <div className="ml-2">
                    {item.flashSale && item.flashSalePrice ? (
                      <>
                        <span className="text-red-600">
                          {item.flashSalePrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <span className="line-through text-gray-500 ml-1">
                          {item.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </>
                    ) : (
                      <span>
                        {item.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => removeFromCart(item._id)}
                variant="ghost"
                size="icon"
              >
                Remove
              </Button>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              Original Price:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {originalSubtotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          {totalDiscount > 0 && (
            <div className="flex justify-between items-center text-green-600">
              <span>Total Savings:</span>
              <span>
                -
                {totalDiscount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Subtotal:
            </span>
            <span className="text-lg font-bold text-pink-600">
              {subtotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <Button className="w-full mb-2 mt-4" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </Button>
        <Button variant="outline" className="w-full" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export function CartSidebar() {
  return (
    <Suspense
      fallback={
        <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading cart...</p>
            </div>
          </div>
        </div>
      }
    >
      <CartContent />
    </Suspense>
  );
}
