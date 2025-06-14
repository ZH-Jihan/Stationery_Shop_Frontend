import { TOrder } from "@/types/order";
import { format } from "date-fns";

interface OrderTableProps {
  orders: TOrder[];
  showUserColumn?: boolean;
}

const OrderTable = ({ orders, showUserColumn = false }: OrderTableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gray-100 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Order ID</th>
            {showUserColumn && (
              <th className="px-4 py-3 text-left font-semibold">User Email</th>
            )}
            {showUserColumn && (
              <th className="px-4 py-3 text-left font-semibold">
                Customer Number
              </th>
            )}
            <th className="px-4 py-3 text-left font-semibold">Total Price</th>
            <th className="px-4 py-3 text-left font-semibold">
              Payment Method
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              Payment Status
            </th>
            <th className="px-4 py-3 text-left font-semibold">Order Date</th>
            <th className="px-4 py-3 text-left font-semibold">
              Transaction ID
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
            >
              <td className="px-4 py-3 whitespace-nowrap font-medium break-words">
                {order._id}
              </td>
              {showUserColumn && (
                <td className="px-4 py-3 whitespace-nowrap break-words">
                  {order.user?.email || "N/A"}
                </td>
              )}
              {showUserColumn && (
                <td className="px-4 py-3 whitespace-nowrap break-words">
                  {order.shippingAddress?.phone || "N/A"}
                </td>
              )}
              <td className="px-4 py-3 whitespace-nowrap">
                ${order.totalPrice.toFixed(2)}{" "}
                {order.payment.transaction?.currency || ""}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {order.payment.method.toUpperCase()}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {order.payment.status.toUpperCase()}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {format(
                  new Date(
                    order.payment.transaction?.paidAt || order.createdAt
                  ),
                  "PPP"
                )}
              </td>
              <td className="px-4 py-3 whitespace-nowrap break-words">
                {order.payment.transaction?.id || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
