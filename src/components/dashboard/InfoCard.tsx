"use client";

import { cn } from "@/lib/utils";

interface InfoCardProps {
  title: string;
  data: Record<string, number>;
  type: "status" | "payment" | "method";
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const paymentColors = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  cancelled: "bg-red-100 text-red-800",
};

const methodColors = {
  cod: "bg-blue-100 text-blue-800",
  sslcommerz: "bg-green-100 text-green-800",
};

export function InfoCard({ title, data, type }: InfoCardProps) {
  const colorMap = {
    status: statusColors,
    payment: paymentColors,
    method: methodColors,
  };

  const colors = colorMap[type];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium capitalize",
                colors[key as keyof typeof colors] ||
                  "bg-gray-100 text-gray-800"
              )}
            >
              {key}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
