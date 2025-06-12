import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  percentageChange: string;
  percentageColor: string;
  icon: React.ElementType;
  iconBgColor: string;
}

export function StatsCard({
  title,
  value,
  percentageChange,
  percentageColor,
  icon: Icon,
  iconBgColor,
}: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </h3>
        <p className={cn("text-sm font-semibold", percentageColor)}>
          {percentageChange}
        </p>
      </div>
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center text-white",
          iconBgColor
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
