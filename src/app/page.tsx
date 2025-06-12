"use client";

import { HomeCarousel } from "@/components/HomeCarousel";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgePercent, Star, Truck, Users } from "lucide-react";
import dynamic from "next/dynamic";

const FutureProduct = dynamic(
  () => import("@/components/app/home/FutureProduct"),
  { ssr: false }
);

function SaleBanner() {
  return (
    <section className="w-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 text-white py-6 sm:py-8 px-4 sm:px-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between shadow-lg mb-6 sm:mb-8 gap-4 animate-fade-in">
      <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold">
        <BadgePercent className="w-7 h-7 sm:w-8 sm:h-8" />
        Flash Sale! Up to <span className="text-yellow-200">70% OFF</span>
      </div>
      <Button
        className="bg-white text-pink-600 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow hover:bg-pink-100 transition text-sm sm:text-base"
        size="lg"
        suppressHydrationWarning
      >
        Shop Now <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </section>
  );
}

function Categories() {
  const cats = [
    { name: "Electronics", icon: <Star className="w-6 h-6" /> },
    { name: "Fashion", icon: <Users className="w-6 h-6" /> },
    { name: "Home", icon: <Truck className="w-6 h-6" /> },
    { name: "Beauty", icon: <BadgePercent className="w-6 h-6" /> },
  ];
  return (
    <section className="w-full mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {cats.map((cat) => (
          <div
            key={cat.name}
            className="bg-muted rounded-2xl p-5 sm:p-8 flex flex-col items-center gap-2 font-semibold shadow hover:scale-105 hover:bg-primary/10 transition-transform cursor-pointer border border-transparent hover:border-primary"
          >
            <div className="mb-2 text-primary">{cat.icon}</div>
            {cat.name}
          </div>
        ))}
      </div>
    </section>
  );
}

function FlashSale() {
  return (
    <section className="w-full mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-yellow-600 dark:text-yellow-400">
        Flash Sale
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-yellow-100 dark:bg-yellow-900 rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col items-center border border-yellow-200 dark:border-yellow-800 hover:scale-105 transition-transform"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-200 dark:bg-yellow-700 rounded-xl mb-2 flex items-center justify-center">
              <BadgePercent className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-700 dark:text-yellow-200" />
            </div>
            <span className="font-semibold mb-1 text-sm sm:text-base">
              Sale Product {i}
            </span>
            <span className="text-yellow-700 font-bold mb-2 text-sm sm:text-base">
              $49.99
            </span>
            <Button className="w-full text-xs sm:text-base" variant="outline">
              Buy Now
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="w-full mb-6 sm:mb-8">
      <div className="bg-gradient-to-r from-primary to-pink-500 text-white rounded-2xl p-5 sm:p-8 flex flex-col items-center shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Subscribe to our Newsletter
        </h2>
        <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 rounded px-3 py-2 text-black text-sm sm:text-base"
          />
          <Button
            type="submit"
            className="bg-white text-primary font-semibold px-4 sm:px-6 py-2 rounded shadow hover:bg-gray-100 text-sm sm:text-base"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 flex flex-col gap-6 sm:gap-8 animate-fade-in">
      {/* <LandingCarousel /> */}
      <SaleBanner />
      <HomeCarousel />
      <Categories />
      <FutureProduct />
      <FlashSale />
      <TestimonialsCarousel />
      <Newsletter />
    </div>
  );
}
