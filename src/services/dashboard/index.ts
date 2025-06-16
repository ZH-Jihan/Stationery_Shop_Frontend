import config from "@/config";
import { getAuthHeaders } from "@/utils/auth";

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  revenueChange: string;
  ordersChange: string;
  productsChange: string;
  usersChange: string;
  orderStatusCounts: Record<string, number>;
  paymentStatusCounts: Record<string, number>;
  paymentMethodCounts: Record<string, number>;
  recentOrders: Array<{
    id: string;
    user: string;
    total: number;
    status: string;
    date: string;
    paymentStatus: string;
    paymentMethod: string;
  }>;
  topProducts: Array<{
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    sales: number;
  }>;
  salesData: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  userActivity: Array<{
    date: string;
    activeUsers: number;
    newUsers: number;
  }>;
}

export interface UserDashboardStats {
  totalSpent: number;
  totalOrders: number;
  wishlistCount: number;
  cartItems: number;
  spentChange: string;
  ordersChange: string;
  wishlistChange: string;
  cartChange: string;
  orderStatusCounts: Record<string, number>;
  recentOrders: Array<{
    id: string;
    date: string;
    total: number;
    status: string;
    items: number;
  }>;
  wishlistItems: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
  recommendedProducts: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    category: string;
    stock: number;
  }>;
  salesData: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  userActivity: Array<{
    date: string;
    activeUsers: number;
    newUsers: number;
  }>;
}

export const getAdminDashboardStats = async (): Promise<DashboardStats> => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${config.dbUrl}/dashboard/admin`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin dashboard stats");
  }

  const data = await response.json();
  return data.data;
};

export const getUserDashboardStats = async (): Promise<UserDashboardStats> => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${config.dbUrl}/dashboard/user`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user dashboard stats");
  }

  const data = await response.json();
  return data.data;
};
