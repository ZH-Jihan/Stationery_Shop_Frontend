"use client";

import { InfoCard } from "@/components/dashboard/InfoCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  getUserDashboardStats,
  UserDashboardStats,
} from "@/services/dashboard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [stats, setStats] = useState<UserDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUserDashboardStats();
        setStats(data);
      } catch (err) {
        setError("Failed to load dashboard statistics");
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name || user?.email}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Spent"
          value={`$${stats.totalSpent.toFixed(2)}`}
          change={stats.spentChange}
          icon="dollar"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          change={stats.ordersChange}
          icon="shopping-cart"
        />
        <StatsCard
          title="Wishlist Items"
          value={stats.wishlistCount.toString()}
          change={stats.wishlistChange}
          icon="box"
        />
        <StatsCard
          title="Cart Items"
          value={stats.cartItems.toString()}
          change={stats.cartChange}
          icon="users"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <InfoCard
          title="Recent Orders"
          data={stats.orderStatusCounts}
          type="status"
        />
        <InfoCard
          title="Wishlist Items"
          data={stats.wishlistItems.reduce((acc, item) => {
            acc[item.name] = item.price;
            return acc;
          }, {} as Record<string, number>)}
          type="status"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-1 aspect-h-1 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-cover rounded-lg w-full h-48"
                  />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
