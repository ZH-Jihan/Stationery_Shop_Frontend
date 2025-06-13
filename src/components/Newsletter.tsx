"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with your actual newsletter subscription API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground dark:from-zinc-900 dark:to-zinc-800 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-primary-foreground/80 text-lg dark:text-zinc-200">
              Get exclusive offers, new product announcements, and updates
              delivered straight to your inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row sm:gap-4 max-w-md mx-auto items-stretch"
          >
            <div className="flex-1 relative flex flex-col">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-black dark:text-white dark:bg-zinc-900 dark:border-zinc-700 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-primary/60"
                disabled={isLoading}
              />
              <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 text-left">
                We respect your privacy. Unsubscribe at any time.
              </div>
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto px-8 bg-primary text-white hover:bg-primary/90 dark:bg-blue-600 dark:text-white dark:hover:bg-primary/80 rounded-md mt-2 sm:mt-0 disabled:bg-primary disabled:text-white dark:disabled:bg-primary dark:disabled:text-white"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-300">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Weekly Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Exclusive Offers</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>No Spam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
