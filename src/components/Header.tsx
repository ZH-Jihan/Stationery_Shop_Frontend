"use client";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LucideMenu,
  Menu,
  Moon,
  ShoppingCart,
  Sun,
  User,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

const navItems = [
  {
    label: "Shop",
    dropdown: ["All Products", "New Arrivals", "Best Sellers", "Categories"],
  },
  { label: "Deals", dropdown: ["Flash Sale", "Coupons", "Clearance"] },
  { label: "Brands", dropdown: ["Top Brands", "New Brands"] },
  { label: "About", dropdown: ["Our Story", "Careers", "Contact"] },
  { label: "Support", dropdown: ["Help Center", "Returns", "Shipping"] },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cartItems, toggleCart } = useCart();

  return (
    <header
      className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border shadow-sm"
      suppressHydrationWarning
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4 gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-2xl tracking-tight text-primary"
        >
          e-comarze
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="font-medium text-base flex items-center gap-1"
                  suppressHydrationWarning
                >
                  {item.label}
                  <LucideMenu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {item.dropdown.map((sub) => (
                  <DropdownMenuItem key={sub}>{sub}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>
        {/* Desktop Search Bar */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-md border px-3 py-2 bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            suppressHydrationWarning
          />
        </div>
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
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
            aria-label="Cart"
            suppressHydrationWarning
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-1 text-sm font-medium">
              ({cartItems.length})
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="User menu"
                suppressHydrationWarning
              >
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user ? (
                <>
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    <div className="font-semibold">
                      {user.name || user.email}
                    </div>
                    <div className="capitalize">{user.role}</div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href={user.role ==="admin" ? "/admin/dashboard" : "/user/dashboard"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Mobile Hamburger, Cart, and User icons */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleCart}
            aria-label="Cart"
            className="inline-flex items-center justify-center p-2 rounded-full hover:bg-muted transition"
            suppressHydrationWarning
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-1 text-sm font-medium">
              ({cartItems.length})
            </span>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span
                className="inline-flex items-center justify-center p-2 rounded-full hover:bg-muted transition cursor-pointer"
                suppressHydrationWarning
              >
                <User className="w-5 h-5" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user ? (
                <>
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    <div className="font-semibold">
                      {user.name || user.email}
                    </div>
                    <div className="capitalize">{user.role}</div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                suppressHydrationWarning
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
                    e-comarze
                  </Link>
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  suppressHydrationWarning
                >
                  <X className="w-6 h-6" />
                </Button>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4 py-4">
                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full rounded-md border px-3 py-2 bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                  suppressHydrationWarning
                />
                {/* Nav Buttons with Dropdowns */}
                {navItems.map((item) => (
                  <div key={item.label} className="mb-2">
                    <div className="font-semibold text-base flex items-center gap-1 mb-1">
                      {item.label}
                    </div>
                    <div className="flex flex-col gap-1 pl-3">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub}
                          href="#"
                          className="text-sm text-muted-foreground hover:text-primary transition"
                          onClick={() => setOpen(false)}
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/cart" onClick={() => setOpen(false)}>
                      Cart
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={toggleTheme}
                    suppressHydrationWarning
                  >
                    {theme === "dark" ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <div className="mt-4 border-t pt-4">
                  {user ? (
                    <>
                      <div className="font-semibold mb-2">
                        {user.name || user.email}
                      </div>
                      <div className="capitalize text-xs mb-2">{user.role}</div>
                      <Button variant="ghost" className="w-full mb-2" asChild>
                        <Link href="/dashboard" onClick={() => setOpen(false)}>
                          Dashboard
                        </Link>
                      </Button>
                      {user.role === "admin" && (
                        <Button variant="ghost" className="w-full mb-2" asChild>
                          <Link href="/admin" onClick={() => setOpen(false)}>
                            Admin
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          setOpen(false);
                        }}
                        suppressHydrationWarning
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" className="w-full mb-2" asChild>
                        <Link
                          href="/auth/signin"
                          onClick={() => setOpen(false)}
                        >
                          Sign In
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full" asChild>
                        <Link
                          href="/auth/signup"
                          onClick={() => setOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
