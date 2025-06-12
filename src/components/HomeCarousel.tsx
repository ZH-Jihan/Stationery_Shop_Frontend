"use client";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

const slides = [
  {
    image: "/products/phone.jpg",
    title: "Latest Smartphones",
    subtitle: "Discover the newest tech at unbeatable prices!",
  },
  {
    image: "/products/shoes.jpg",
    title: "Trendy Fashion",
    subtitle: "Step up your style with our new arrivals.",
  },
  {
    image: "/products/sofa.jpg",
    title: "Home Comforts",
    subtitle: "Upgrade your space with cozy furniture.",
  },
];

export function HomeCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const selectedIndex = emblaApi?.selectedScrollSnap() ?? 0;

  return (
    <div className="relative w-full h-64 mb-8" suppressHydrationWarning>
      <div className="overflow-hidden rounded-2xl h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div
              className="min-w-0 flex-[0_0_100%] h-full flex items-center justify-center bg-gradient-to-br from-fuchsia-100 via-pink-100 to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative"
              key={i}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                className="w-40 h-40 object-cover rounded-xl shadow-lg mr-8 hidden sm:block"
                width={160}
                height={160}
              />
              <div className="flex flex-col items-start gap-2">
                <h3 className="text-2xl font-bold text-primary drop-shadow-lg">
                  {slide.title}
                </h3>
                <p className="text-lg text-muted-foreground max-w-xs">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Arrows */}
      <div>
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-900 transition"
          onClick={scrollPrev}
          aria-label="Previous slide"
          suppressHydrationWarning
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-900 transition"
          onClick={scrollNext}
          aria-label="Next slide"
          suppressHydrationWarning
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              selectedIndex === i ? "bg-primary" : "bg-muted-foreground/40"
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            suppressHydrationWarning
          />
        ))}
      </div>
    </div>
  );
}
