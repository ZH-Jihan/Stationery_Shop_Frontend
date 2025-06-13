"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070",
    count: 120,
    description:
      "Latest gadgets, smartphones, laptops, and electronic accessories",
    subcategories: ["Smartphones", "Laptops", "Accessories", "Audio"],
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071",
    count: 85,
    description: "Trendy clothing, shoes, and accessories for all styles",
    subcategories: ["Men's Fashion", "Women's Fashion", "Kids", "Accessories"],
  },
  {
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=2074",
    count: 65,
    description: "Furniture, decor, and everything for your perfect home",
    subcategories: ["Furniture", "Decor", "Kitchen", "Bath"],
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080",
    count: 45,
    description:
      "Skincare, makeup, and beauty products for your self-care routine",
    subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances"],
  },
  {
    name: "Sports & Outdoors",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070",
    count: 55,
    description:
      "Equipment and gear for sports enthusiasts and outdoor adventures",
    subcategories: ["Fitness", "Outdoor Gear", "Team Sports", "Yoga"],
  },
  {
    name: "Books & Media",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070",
    count: 75,
    description: "Books, movies, music, and digital content for entertainment",
    subcategories: ["Books", "Movies", "Music", "Digital Content"],
  },
  {
    name: "Toys & Games",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070",
    count: 40,
    description: "Toys, games, and entertainment for all ages",
    subcategories: ["Toys", "Board Games", "Video Games", "Educational"],
  },
  {
    name: "Health & Wellness",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=2070",
    count: 60,
    description: "Health supplements, fitness equipment, and wellness products",
    subcategories: ["Supplements", "Fitness", "Wellness", "Medical"],
  },
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "count":
          return b.count - a.count;
        default:
          return 0;
      }
    });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Categories</h1>
        <p className="text-muted-foreground">
          Browse through our wide range of product categories
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="count">Product Count</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <Link
            key={category.name}
            href={`/products?category=${category.name}`}
            className="group"
          >
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                      {category.count} Products
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No categories found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter to find what you&apos;re looking
            for
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSortBy("name");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </main>
  );
}
