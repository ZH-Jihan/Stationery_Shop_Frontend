import { TOrder } from "@/types/orderType";

export function getOrderStats(orders: TOrder[]) {
  // Initialize stats with default values
  const stats = {
    "Total Orders": orders?.length || 0,
    Wishlist: 0,
    "Return Requests": 0,
    Transactions: 0,
    Delivered: 0,
  };

  if (!orders) return stats;

  orders.forEach((order) => {
    // Count transactions (successful payments)
    if (order.payment?.toLowerCase() === "paid") {
      stats.Transactions += 1;
    }

    // Count delivered orders
    if (
      order.status?.toLowerCase() === "completed" ||
      order.status?.toLowerCase() === "delivered"
    ) {
      stats.Delivered += 1;
    }

    // Count return requests (modify this condition based on your actual return request status)
    if (order.status?.toLowerCase().includes("return")) {
      stats["Return Requests"] += 1;
    }
  });

  return stats;
}

export function getChartData(orders: TOrder[]) {
  if (!orders || !Array.isArray(orders)) {
    return [];
  }

  // Helper function to get the month name from a date string
  const getMonthName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "short" });
  };

  // Initialize an object with all months and set their amounts to 0
  const monthlyTotals = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  // Accumulate the total amount for each month
  orders.forEach((order) => {
    const month = getMonthName(order.createdAt); // Extract month from createdAt
    const amount = order.totalPrice || 0; // Use totalPrice for the amount

    // Update the total amount for the month
    if (monthlyTotals.hasOwnProperty(month)) {
      monthlyTotals[month] += amount;
    }
  });

  // Convert the monthly totals into the desired chartData format
  const chartData = Object.keys(monthlyTotals).map((month) => ({
    date: month,
    amount: monthlyTotals[month],
  }));

  // Sort the chartData by month (optional, if you want chronological order)
  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  chartData.sort(
    (a, b) => monthOrder.indexOf(a.date) - monthOrder.indexOf(b.date)
  );

  return chartData;
}
