export function SalesChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Sales Overview
      </h2>
      <p className="text-sm text-green-500 font-semibold mb-4">
        ↑ 4% more in 2021
      </p>
      <div className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-600">
        {/* Placeholder for Sales Chart */}
        Sales Chart goes here
      </div>
    </div>
  );
}
