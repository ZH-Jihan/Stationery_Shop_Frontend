"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UsersChartProps {
  data: Array<{
    date: string;
    activeUsers: number;
    newUsers: number;
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

export function UsersChart({ data }: UsersChartProps) {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Active Users",
        data: data.map((item) => item.activeUsers),
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1,
      },
      {
        label: "New Users",
        data: data.map((item) => item.newUsers),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const totalActiveUsers = data.reduce(
    (sum, item) => sum + item.activeUsers,
    0
  );
  const totalNewUsers = data.reduce((sum, item) => sum + item.newUsers, 0);
  const avgActiveUsers = totalActiveUsers / data.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        User Activity
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Active Users
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {totalActiveUsers.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total New Users
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {totalNewUsers.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Avg Active Users
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {avgActiveUsers.toFixed(1)}
          </p>
        </div>
      </div>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
