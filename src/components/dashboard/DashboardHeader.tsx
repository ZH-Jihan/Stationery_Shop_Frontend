"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Bell,
  Home,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function DashboardHeader({
  isSidebarOpen,
  setIsSidebarOpen,
}: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center h-16 px-4 border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-300",
        isSidebarOpen ? "md:pl-4 md:pr-6" : "md:px-6"
      )}
    >
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden mr-4"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Breadcrumbs (for desktop) */}
      <div className="hidden md:flex flex-col">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          / Dashboard
        </span>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Search Input */}
      <div className="relative flex-1 mx-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Type here..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/" aria-label="Home">
            <Home className="w-5 h-5" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          aria-label="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
