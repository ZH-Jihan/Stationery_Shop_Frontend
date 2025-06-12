"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const initialCart = [
  {
    id: "1",
    name: "Smartphone",
    price: 499,
    image: "/products/phone.jpg",
    quantity: 1,
  },
  {
    id: "2",
    name: "Sneakers",
    price: 89,
    image: "/products/shoes.jpg",
    quantity: 2,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState("");

  const handleQuantity = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };
  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // For now, coupon does nothing

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-muted-foreground">
          Your cart is empty.{" "}
          <Link href="/products" className="underline">
            Shop now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-muted rounded-lg p-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-pink-600 font-bold">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantity(item.id, Number(e.target.value))
                    }
                    className="w-16 rounded px-2 py-1 border text-center"
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-80 bg-white dark:bg-gray-900 rounded-lg p-6 shadow flex flex-col gap-4">
            <h2 className="text-lg font-bold mb-2">Order Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <form
              className="flex gap-2 mb-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="rounded px-3 py-2 border flex-1"
              />
              <Button type="submit" variant="outline">
                Apply
              </Button>
            </form>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4">Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
