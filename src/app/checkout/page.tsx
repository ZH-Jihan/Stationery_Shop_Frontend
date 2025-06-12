"use client";

import { Button } from "@/components/ui/button";
import type { CartItem } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
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
        paymentMethod === "cod" ? "Confirm Order" : "Proceed to Purchase";
    }
  }, [paymentMethod]);

  const handleApplyCoupon = () => {
    // Placeholder for coupon logic
    if (couponCode === "DISCOUNT10") {
      setDiscount(subtotal * 0.1); // 10% discount
      alert("Coupon applied successfully!");
    } else {
      setDiscount(0);
      alert("Invalid coupon code.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "cod") {
      console.log(paymentMethod,cartItems,formData)
      // Handle Cash on Delivery
      console.log("Processing Cash on Delivery order");
    } else {
      // Handle SSLCommerz payment
      console.log("Processing SSLCommerz payment");
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

  const subtotal = cartItems.reduce((total: number, item: CartItem) => {
    return total + item.price * item.quantity;
  }, 0);

  const total = subtotal - discount + shippingCost;

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
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
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
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            <span id="submitButtonText">Confirm Order</span>
          </button>
        </form>
      </div>
    </div>
  );
}
