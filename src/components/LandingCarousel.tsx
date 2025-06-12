"use client";
import Image from "next/image";
import { useState } from "react";
import { FaBalanceScale } from "react-icons/fa";

const slides = [
  {
    img: "/products/banner1.jpg", // Place your images in public/products/
    title: "High Current Gamer",
    subtitle: "HCG PRO PLATINUM SERIES",
    features: ["850W", "1000W", "1200W"],
    badge: "EXCLUSIVE: Antec Bag Pack and T-Shirt Free",
    bg: "#e3f0ff",
  },
  // Add more slides as needed
];

export default function LandingCarousel() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="w-full flex justify-center items-center bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row bg-white">
        {/* Banner Image with overlay */}
        <div className="relative md:w-2/3 w-full h-80 md:h-[28rem] flex-shrink-0">
          <Image
            src={slides[current].img}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
            style={{ filter: "brightness(0.85)" }}
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          {/* Overlayed Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-14 text-left z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-2">
              {slides[current].title}
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-4 drop-shadow">
              {slides[current].subtitle}
            </h3>
            <div className="flex gap-3 mb-4">
              {slides[current].features.map((f) => (
                <span
                  key={f}
                  className="bg-yellow-300/90 text-yellow-900 px-4 py-2 rounded-full text-lg font-bold shadow"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-2 bg-black/70 text-white px-6 py-3 rounded-lg text-lg font-medium shadow">
              {slides[current].badge}
            </div>
          </div>
        </div>
        {/* Side Panel */}
        <div className="md:w-1/3 w-full bg-white/90 flex flex-col justify-center items-center p-8 border-l border-gray-200 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <FaBalanceScale className="text-blue-600 text-2xl" />
            <h4 className="font-extrabold text-lg text-blue-900">
              Compare Products
            </h4>
          </div>
          <input
            className="mb-3 p-3 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Search and Select Product"
          />
          <input
            className="mb-5 p-3 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Search and Select Product"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow transition w-full text-lg">
            View Comparison
          </button>
        </div>
        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-4 h-4 rounded-full border-2 ${
                current === idx
                  ? "bg-blue-600 border-blue-600 scale-110"
                  : "bg-white border-blue-300 hover:bg-blue-200"
              } transition`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
