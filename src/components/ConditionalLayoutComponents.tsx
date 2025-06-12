"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { usePathname } from "next/navigation";

export function ConditionalLayoutComponents({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/user");

  return (
    <>
      {!isDashboardRoute && <Header />} {/* Conditionally render Header */}
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
