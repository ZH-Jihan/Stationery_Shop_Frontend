const mockProducts = [
  { id: "1", name: "Smartphone", price: 499 },
  { id: "2", name: "Sneakers", price: 89 },
];
const mockUsers = [
  { id: "1", name: "Admin User", email: "admin@demo.com", role: "admin" },
  { id: "2", name: "Demo User", email: "user@demo.com", role: "user" },
];
const mockOrders = [
  { id: "1001", user: "Demo User", total: 199.99, status: "Delivered" },
  { id: "1002", user: "Demo User", total: 89.5, status: "Processing" },
];

export default async function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-4">
        {/* Welcome, {session.user.name || session.user.email}! */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Product Management */}
        <div className="bg-muted rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <ul className="space-y-2">
            {mockProducts.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.name}</span>
                <span>${p.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="text-muted-foreground text-xs mt-4">
            Product management coming soon.
          </div>
        </div>
        {/* User Management */}
        <div className="bg-muted rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Users</h2>
          <ul className="space-y-2">
            {mockUsers.map((u) => (
              <li key={u.id} className="flex justify-between">
                <span>{u.name}</span>
                <span className="text-xs">{u.role}</span>
              </li>
            ))}
          </ul>
          <div className="text-muted-foreground text-xs mt-4">
            User management coming soon.
          </div>
        </div>
        {/* Order Management */}
        <div className="bg-muted rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Orders</h2>
          <ul className="space-y-2">
            {mockOrders.map((o) => (
              <li key={o.id} className="flex justify-between">
                <span>
                  #{o.id} ({o.user})
                </span>
                <span className="text-xs">{o.status}</span>
              </li>
            ))}
          </ul>
          <div className="text-muted-foreground text-xs mt-4">
            Order management coming soon.
          </div>
        </div>
      </div>
    </div>
  );
}
