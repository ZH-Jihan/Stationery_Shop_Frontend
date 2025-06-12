import { AppProviders } from "@/components/AppProviders";
import ClientCartWrapper from "@/components/ClientCartWrapper";
import { ConditionalLayoutComponents } from "@/components/ConditionalLayoutComponents";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "e-comarze - Shop the latest products",
  description:
    "Your one-stop shop for electronics, fashion, home goods, and beauty products. Discover new arrivals, best sellers, and exclusive deals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <CartProvider>
          <AppProviders>
            <ConditionalLayoutComponents>
              {children}
            </ConditionalLayoutComponents>
          </AppProviders>
          <ClientCartWrapper />
        </CartProvider>
      </body>
    </html>
  );
}
