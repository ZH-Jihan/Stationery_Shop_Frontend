"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronDown,
  ChevronRight,
  Compare,
  Cpu,
  Flashlight,
  Gift,
  Laptop,
  Layers,
  Menu,
  Monitor,
  Phone,
  Search,
  ShoppingCart,
  Tablet,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    label: "Desktop",
    icon: <Monitor className="w-5 h-5" />,
    sub: [
      "Desktop Offer",
      "Star PC",
      "Gaming PC",
      "Brand PC",
      "All-in-One PC",
      "Mini PC",
      "Apple Mac",
    ],
  },
  {
    label: "Laptop",
    icon: <Laptop className="w-5 h-5" />,
    sub: [
      "All Laptop",
      "Gaming Laptop",
      "Premium Ultrabook",
      "Laptop Bag",
      "Laptop Accessories",
    ],
  },
  {
    label: "Component",
    icon: <Cpu className="w-5 h-5" />,
    sub: [
      "Processor",
      "Motherboard",
      "Graphics Card",
      "RAM",
      "SSD",
      "Casing",
      "Power Supply",
    ],
  },
  {
    label: "Monitor",
    icon: <Monitor className="w-5 h-5" />,
    sub: ["Gaming Monitor", "Curved Monitor", "4K Monitor", "Monitor Arm"],
  },
  {
    label: "Phone",
    icon: <Phone className="w-5 h-5" />,
    sub: [
      "iPhone",
      "Samsung",
      "Xiaomi",
      "OnePlus",
      "Feature Phone",
      "Accessories",
    ],
  },
  {
    label: "Tablet",
    icon: <Tablet className="w-5 h-5" />,
    sub: ["iPad", "Samsung", "Lenovo", "Graphics Tablet", "Accessories"],
  },
];

const offers = [
  { label: "Offers", icon: <Gift className="w-5 h-5" /> },
  { label: "Deals", icon: <Flashlight className="w-5 h-5" /> },
  { label: "PC Builder", icon: <Layers className="w-5 h-5" /> },
];

export function StarTechHeader() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-2 px-2 sm:px-4 gap-2">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl sm:text-2xl text-primary"
        >
          <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          Star Tech
        </Link>
        {/* Search Bar (desktop) */}
        <form className="hidden lg:flex flex-1 mx-6 max-w-2xl">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none"
          />
          <Button type="submit" className="rounded-l-none rounded-r-md px-4">
            <Search />
          </Button>
        </form>
        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/compare" aria-label="Compare">
              <Compare className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account" aria-label="Account">
              <User className="w-5 h-5" />
            </Link>
          </Button>
        </div>
        {/* Hamburger (mobile) */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={mobileMenu} onOpenChange={setMobileMenu}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[90vw] max-w-xs">
              <SheetHeader className="flex flex-row items-center justify-between px-4 py-3 border-b">
                <SheetTitle>
                  <Link
                    href="/"
                    className="font-bold text-xl tracking-tight text-primary"
                    onClick={() => setMobileMenu(false)}
                  >
                    <img
                      src="/logo.png"
                      alt="Logo"
                      className="h-8 w-8 object-contain inline mr-2"
                    />
                    Star Tech
                  </Link>
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenu(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </Button>
              </SheetHeader>
              <form className="flex gap-2 px-4 py-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 rounded-md border px-3 py-2"
                />
                <Button type="submit" className="px-4">
                  <Search />
                </Button>
              </form>
              <div className="flex flex-col gap-2 px-4">
                {offers.map((offer) => (
                  <Link
                    key={offer.label}
                    href={`/${offer.label.toLowerCase().replace(/ /g, "-")}`}
                    className="flex items-center gap-2 py-2 text-base font-medium hover:text-primary"
                  >
                    {offer.icon} {offer.label}
                  </Link>
                ))}
                <div className="border-t my-2" />
                {categories.map((cat, i) => (
                  <div key={cat.label}>
                    <div className="flex items-center gap-2 py-2 font-semibold">
                      {cat.icon} {cat.label}
                      <ChevronRight className="ml-auto w-4 h-4" />
                    </div>
                    <div className="pl-6 flex flex-col gap-1">
                      {cat.sub.map((sub) => (
                        <Link
                          key={sub}
                          href="#"
                          className="text-sm py-1 hover:text-primary"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 px-4 py-4 border-t mt-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/cart">Cart</Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/account">Account</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Mega Menu (desktop) */}
      <nav className="hidden md:block border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto flex items-center gap-2 px-2 sm:px-4">
          {offers.map((offer) => (
            <Link
              key={offer.label}
              href={`/${offer.label.toLowerCase().replace(/ /g, "-")}`}
              className="flex items-center gap-1 py-3 px-3 font-medium hover:text-primary"
            >
              {offer.icon} {offer.label}
            </Link>
          ))}
          <div className="relative group">
            <button
              className="flex items-center gap-1 py-3 px-3 font-medium hover:text-primary focus:outline-none"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              onFocus={() => setMegaOpen(true)}
              onBlur={() => setMegaOpen(false)}
            >
              Categories <ChevronDown className="w-4 h-4" />
            </button>
            {/* Mega menu dropdown */}
            <div
              className={`absolute left-0 top-full z-40 w-[900px] bg-white dark:bg-gray-950 shadow-lg rounded-b-xl border-t border-gray-200 dark:border-gray-800 p-6 flex gap-8 transition-all duration-200 ${
                megaOpen ? "block" : "hidden"
              }`}
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              {categories.map((cat, i) => (
                <div key={cat.label} className="min-w-[140px]">
                  <div className="flex items-center gap-2 font-semibold mb-2 text-primary">
                    {cat.icon} {cat.label}
                  </div>
                  <div className="flex flex-col gap-1">
                    {cat.sub.map((sub) => (
                      <Link
                        key={sub}
                        href="#"
                        className="text-sm py-1 hover:text-primary"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
