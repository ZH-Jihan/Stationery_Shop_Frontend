import config from "@/config";
import { getAuthHeaders } from "@/utils/auth";

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: "cod" | "sslcommerz";
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export const createOrder = async (orderData: OrderData) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${config.dbUrl}/orders`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
};

export const verifyPayment = async (orderId: string) => {
  const headers = await getAuthHeaders();
  const response = await fetch(
    `${config.dbUrl}/orders/verify-payment/${orderId}`,
    {
      method: "GET",
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to verify payment");
  }

  return response.json();
};

export const getAdminAllOrders = async () => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${config.dbUrl}/orders`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all orders");
  }

  return response.json();
};

export const getUserOrders = async () => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${config.dbUrl}/orders/won_order`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user orders");
  }

  return response.json();
};
