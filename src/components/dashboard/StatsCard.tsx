import { cn } from "@/lib/utils";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: "dollar" | "shopping-cart" | "box" | "users";
}

const iconMap = {
  dollar: DollarSign,
  "shopping-cart": ShoppingCart,
  box: Package,
  users: Users,
};

const iconBgColors = {
  dollar: "bg-blue-500",
  "shopping-cart": "bg-orange-500",
  box: "bg-green-500",
  users: "bg-purple-500",
};

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const Icon = iconMap[icon];
  const bgColor = iconBgColors[icon];
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </h3>
        <p
          className={cn(
            "text-sm font-semibold",
            isPositive ? "text-green-500" : "text-red-500"
          )}
        >
          {change}
        </p>
      </div>
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center text-white",
          bgColor
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
