import { cn } from "@/lib/utils";
import {
  ChevronDown,
  LayoutDashboard,
  Rocket,
  ShoppingBasket,
  Table,
  User,
  X,
} from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  session: Session;
}

const userNav = [
  { icon: ShoppingBasket, label: "Orders", href: "/user/orders" },
  { icon: User, label: "Profile", href: "/profile" },
];

const adminNav = [
  { icon: ShoppingBasket, label: "All Orders", href: "/admin/orders" },
  {
    icon: Table,
    label: "Products",
    subNav: [
      { label: "View Products", href: "/admin/products/view" },
      { label: "Create Product", href: "/admin/products/create" },
    ],
  },
  { icon: User, label: "Profile", href: "/profile" },
];

export function Sidebar({ isOpen, setIsOpen, session }: SidebarProps) {
  const [productsOpen, setProductsOpen] = useState(true);
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
        isOpen ? "w-64" : "w-20 md:w-64", // On mobile, sidebar is always full width when open
        "md:translate-x-0", // On desktop, sidebar is always visible
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <Link
          href={
            session?.user?.role === "admin"
              ? "/admin/dashboard"
              : "/user/dashboard"
          }
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Rocket className="w-6 h-6" />
          {isOpen && `${session?.user?.role} Dashboard`}
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          aria-label="Toggle sidebar"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <SidebarLink
          icon={LayoutDashboard}
          label="Dashboard"
          href={
            session?.user?.role === "admin"
              ? "/admin/dashboard"
              : "/user/dashboard"
          }
          isOpen={isOpen}
        />
        {session?.user?.role === "admin"
          ? adminNav?.map((nav) =>
              nav.subNav ? (
                <div key={nav.label} className="mb-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 font-semibold px-3 py-2 w-full focus:outline-none"
                    onClick={() => setProductsOpen((open) => !open)}
                  >
                    <nav.icon className="w-5 h-5" />
                    <span>{nav.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 ml-auto transition-transform",
                        productsOpen ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>
                  {productsOpen && (
                    <div className="ml-8 flex flex-col gap-1 border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                      {nav.subNav.map((sub) => (
                        <SidebarLink
                          key={sub.label}
                          href={sub.href}
                          label={sub.label}
                          className="text-sm font-normal text-gray-600 dark:text-gray-300 hover:text-primary"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <SidebarLink
                  key={nav.label}
                  icon={nav.icon}
                  label={nav.label}
                  href={nav.href}
                  isOpen={isOpen}
                />
              )
            )
          : userNav?.map((nav) => (
              <SidebarLink
                key={nav.label}
                icon={nav.icon}
                label={nav.label}
                href={nav.href}
                isOpen={isOpen}
              />
            ))}

        {/* <SidebarLink icon={Table} label="Tables" href="#" isOpen={isOpen} />
        <SidebarLink icon={Wallet} label="Billing" href="#" isOpen={isOpen} />
        <SidebarLink
          icon={Cuboid}
          label="Virtual Reality"
          href="#"
          isOpen={isOpen}
        />
        <SidebarLink icon={ChevronRight} label="RTL" href="#" isOpen={isOpen} /> */}

        <div className="pt-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
          {isOpen && "Account Pages"}
        </div>
        <SidebarLink icon={User} label="Profile" href="#" isOpen={isOpen} />
      </nav>
    </div>
  );
}

interface SidebarLinkProps {
  icon?: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  isOpen?: boolean;
  className?: string;
}

function SidebarLink({
  icon: Icon,
  label,
  href,
  active,
  isOpen,
  className,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-blue-500 text-white shadow-md"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
        isOpen === false && "justify-center",
        className
      )}
    >
      {Icon && (
        <div
          className={cn(
            "p-2 rounded-md",
            active
              ? "bg-white text-blue-500"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      )}
      {(isOpen === undefined || isOpen) && label}
    </Link>
  );
}

export { SidebarLink };
