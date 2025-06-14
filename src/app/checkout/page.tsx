"use client";

import { Button } from "@/components/ui/button";
import type { CartItem } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { createOrder, type OrderData } from "@/services/order";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

function CheckoutContent() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "sslcommerz">(
    "cod"
  );
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const shippingCost = 5; // Fixed shipping cost
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    // Update button text based on payment method
    const submitButtonText = document.getElementById("submitButtonText");
    if (submitButtonText) {
      submitButtonText.textContent =
        paymentMethod === "cod" ? "Confirm Order" : "Proceed to Payment";
    }
  }, [paymentMethod]);

  const handleApplyCoupon = () => {
    // Placeholder for coupon logic
    if (couponCode === "DISCOUNT10") {
      setDiscount(subtotal * 0.1); // 10% discount
      toast.success("Coupon applied successfully!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value as "cod" | "sslcommerz");
  };
  const subtotal = cartItems.reduce((total: number, item: CartItem) => {
    const itemPrice =
      item.flashSale && item.flashSalePrice ? item.flashSalePrice : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  const originalSubtotal = cartItems.reduce((total: number, item: CartItem) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalDiscount = originalSubtotal - subtotal;

  const total = subtotal - discount + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Validate form data
      if (
        !formData.fullName ||
        !formData.phone ||
        !formData.address ||
        !formData.city ||
        !formData.postalCode ||
        !formData.country
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Create order data with all cart items
      const orderData: OrderData = {
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: total,
        paymentMethod,
        shippingAddress: formData,
      };
      const res = await createOrder(orderData);
      console.log(res);

      if (!res.data.url) {
        // For cash on delivery, clear cart and redirect to success page
        clearCart();
        toast.success("Order placed successfully!");
        // router.push("/order-success");
      } else {
        if (res.data?.url) {
          window.location.href = res.data.url;
        } else {
          throw new Error("Payment URL not received");
        }
      }
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item: CartItem) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  {item.flashSale && item.flashSalePrice ? (
                    <>
                      <p className="font-medium text-red-600">
                        {(item.flashSalePrice * item.quantity).toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          }
                        )}
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        {(item.price * item.quantity).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </>
                  ) : (
                    <p className="font-medium">
                      {(item.price * item.quantity).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between mb-2">
                <span>Original Price</span>
                <span>
                  {originalSubtotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Flash Sale Savings</span>
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
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  {subtotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>
                  {shippingCost.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Coupon Discount</span>
                  <span>
                    -
                    {discount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
        >
          <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>

          {/* Shipping Address Fields */}
          <div className="space-y-4 mb-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium mb-1"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium mb-1"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Coupon Field */}
          <div className="mb-6">
            <label
              htmlFor="couponCode"
              className="block text-sm font-medium mb-1"
            >
              Coupon Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="couponCode"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                onClick={handleApplyCoupon}
                variant="outline"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  className="h-4 w-4 text-blue-600"
                  defaultChecked
                  onChange={handlePaymentMethodChange}
                />
                <div>
                  <span className="font-medium">Cash on Delivery</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pay when you receive your order
                  </p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="sslcommerz"
                  className="h-4 w-4 text-blue-600"
                  onChange={handlePaymentMethodChange}
                />
                <div>
                  <span className="font-medium">Pay with SSLCommerz</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Secure online payment
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            <span id="submitButtonText">
              {isProcessing ? "Processing..." : "Confirm Order"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
