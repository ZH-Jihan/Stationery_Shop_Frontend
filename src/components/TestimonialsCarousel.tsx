"use client";
import useEmblaCarousel from "embla-carousel-react";
import { User } from "lucide-react";

const testimonials = [
  {
    name: "Alice Johnson",
    avatar: "/avatar1.png",
    review: "Amazing products and fast delivery! Highly recommend this store.",
  },
  {
    name: "Bob Smith",
    avatar: "/avatar2.png",
    review: "Customer service was top-notch. Will shop again!",
  },
  {
    name: "Carla Lee",
    avatar: "/avatar3.png",
    review: "Great quality and prices. My go-to for online shopping.",
  },
];

export function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const selectedIndex = emblaApi?.selectedScrollSnap() ?? 0;

  return (
    <div className="relative w-full" suppressHydrationWarning>
      <div className="overflow-hidden rounded-2xl">
        <div className="flex" ref={emblaRef}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.review}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              selectedIndex === i ? "bg-primary" : "bg-muted-foreground/40"
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            suppressHydrationWarning
          />
        ))}
      </div>
    </div>
  );
}
