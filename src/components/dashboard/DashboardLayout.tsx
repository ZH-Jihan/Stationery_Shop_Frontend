"use client";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  session: Session;
}

export function DashboardLayout({ children, session }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        session={session}
      />
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        )}
      >
        <DashboardHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
