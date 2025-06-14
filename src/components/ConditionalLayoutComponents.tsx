"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute =
    pathname.startsWith("/user") || pathname.startsWith("/admin");

  return (
    <>
      {!isDashboardRoute && <Header />} {/* Conditionally render Header */}
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}

export function ConditionalLayoutComponents({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}
