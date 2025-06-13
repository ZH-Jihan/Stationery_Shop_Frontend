"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/carosol-1.webp",
    title: "Latest Smartphones",
    subtitle: "Discover the newest tech at unbeatable prices!",
  },
  {
    image: "/images/carosol-2.avif",
    title: "Trendy Fashion",
    subtitle: "Step up your style with our new arrivals.",
  },
  {
    image: "/images/carosol-3.jpg",
    title: "Home Comforts",
    subtitle: "Upgrade your space with cozy furniture.",
  },
];

export function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-[200px] md:h-[550px] overflow-hidden rounded-xl">
      {slides.map((item, index) => (
        <div
          key={item.title}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentIndex
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className=" z-10" />
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-primary w-6" : "bg-muted"
            )}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
