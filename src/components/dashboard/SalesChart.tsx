"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesChartProps {
  data: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

export function SalesChart({ data }: SalesChartProps) {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Revenue",
        data: data.map((item) => item.revenue),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4,
      },
      {
        label: "Orders",
        data: data.map((item) => item.orders),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Sales Overview
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Revenue
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Orders
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {totalOrders.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Avg Order Value
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            ${avgOrderValue.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
