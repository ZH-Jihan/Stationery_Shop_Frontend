"use client";
import OrderTable from "@/components/OrderTable";
import { Card } from "@/components/ui/card";
import { getUserOrders } from "@/services/order";
import { TOrder } from "@/types/order";
import { useEffect, useState } from "react";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data.data);
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Orders</h1>
      <Card className="p-6">
        {orders.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No orders found.
          </div>
        ) : (
          <OrderTable orders={orders} />
        )}
      </Card>
    </main>
  );
}
