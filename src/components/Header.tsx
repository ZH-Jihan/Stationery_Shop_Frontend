"use client";
import { useTheme } from "@/components/ThemeProvider";
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
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const navItems = [
  {
    label: "Shop",
    href: "/products",
    dropdown: [
      { label: "All Products", href: "/products" },
      { label: "New Arrivals", href: "/products?sort=newest" },
      { label: "Best Sellers", href: "/products?sort=featured" },
      { label: "Categories", href: "/categories" },
    ],
  },
  {
    label: "Categories",
    href: "/categories",
    dropdown: [
      { label: "Electronics", href: "/products?category=Electronics" },
      { label: "Fashion", href: "/products?category=Fashion" },
      { label: "Home & Living", href: "/products?category=Home" },
      { label: "Beauty", href: "/products?category=Beauty" },
      { label: "Sports", href: "/products?category=Sports" },
      { label: "Books", href: "/products?category=Books" },
      { label: "Toys", href: "/products?category=Toys" },
    ],
  },
  {
    label: "Deals",
    href: "/deals",
    dropdown: [
      { label: "Flash Sale", href: "/deals/flash-sale" },
      { label: "Clearance", href: "/deals/clearance" },
      { label: "Special Offers", href: "/deals/special-offers" },
    ],
  },
  {
    label: "Brands",
    href: "/brands",
    dropdown: [
      { label: "Apple", href: "/products?brand=Apple" },
      { label: "Samsung", href: "/products?brand=Samsung" },
      { label: "Sony", href: "/products?brand=Sony" },
      { label: "LG", href: "/products?brand=LG" },
      { label: "Nike", href: "/products?brand=Nike" },
      { label: "Adidas", href: "/products?brand=Adidas" },
    ],
  },
];

const userMenuItems = [
  { label: "My Account", href: "/account" },
  { label: "Orders", href: "/orders" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cartItems, toggleCart } = useCart();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(
        search.trim()
      )}`;
    }
  };

  return (
    <header
      className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border shadow-sm"
      suppressHydrationWarning
    >
      <div className="container mx-auto flex items-center justify-between py-2 px-2 sm:py-3 sm:px-4 gap-2 sm:gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl sm:text-2xl tracking-tight text-primary"
        >
          AuraShop
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Button
                variant="ghost"
                className="font-medium text-base flex items-center gap-1 group relative"
                suppressHydrationWarning
              >
                {item.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === item.label ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg py-1 z-50">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md mx-4"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border px-3 py-2 bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              suppressHydrationWarning
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCart}
            aria-label="Shopping cart"
            className="relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>

          {/* User Menu */}
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("user")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative group"
                aria-label="User menu"
              >
                <User className="w-5 h-5" />
              </Button>
              {openDropdown === "user" && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-background border rounded-md shadow-lg py-1 z-50">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={`/${user.role}${item.href}`}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}

          {/* Mobile menu button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[90vw] max-w-xs">
              <SheetHeader className="flex flex-row items-center justify-between px-4 py-3 border-b">
                <SheetTitle>
                  <Link
                    href="/"
                    className="font-bold text-xl tracking-tight text-primary"
                    onClick={() => setOpen(false)}
                  >
                    AuraShop
                  </Link>
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </Button>
              </SheetHeader>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="p-4 border-b">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <div className="p-4 space-y-4">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className="font-semibold text-base block mb-2"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <div className="pl-4 space-y-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="text-sm text-muted-foreground hover:text-primary block"
                          onClick={() => setOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Mobile User Menu */}
                {user ? (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">Account</h3>
                    <div className="pl-4 space-y-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.label}
                          href={`/${user.role}${item.href}`}
                          className="text-sm text-muted-foreground hover:text-primary block"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          setOpen(false);
                        }}
                        className="text-sm text-red-600 hover:text-red-700 block w-full text-left"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full" asChild>
                    <Link href="/auth/signin" onClick={() => setOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
