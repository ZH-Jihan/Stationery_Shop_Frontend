"use client";

import { Product, ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { useState } from "react";

const categories = ["All", "Electronics", "Fashion", "Home", "Beauty"];

const products: Product[] = [
  {
    id: "1",
    name: "Smartphone",
    price: 499,
    image: "/products/phone.jpg",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Sneakers",
    price: 89,
    image: "/products/shoes.jpg",
    category: "Fashion",
  },
  {
    id: "3",
    name: "Sofa",
    price: 799,
    image: "/products/sofa.jpg",
    category: "Home",
  },
  {
    id: "4",
    name: "Lipstick",
    price: 19,
    image: "/products/lipstick.jpg",
    category: "Beauty",
  },
  {
    id: "5",
    name: "Headphones",
    price: 129,
    image: "/products/headphones.jpg",
    category: "Electronics",
  },
  {
    id: "6",
    name: "Dress",
    price: 59,
    image: "/products/dress.jpg",
    category: "Fashion",
  },
];

export default function ProductsPage() {
  const [selected, setSelected] = useState("All");
  const filtered =
    selected === "All"
      ? products
      : products.filter((p) => p.category === selected);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="flex gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full font-medium border transition-colors ${
              selected === cat
                ? "bg-primary text-white"
                : "bg-muted text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
