interface TPopulatUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  city: string;
  image: string;
  status: string;
  password: string;
  isDeleted: boolean;
  __v: number;
}

export type TOrder = {
  _id: string;
  product: TPopulateProduct;
  quantity: number;
  totalPrice: number;
  user: TPopulatUser;
  status: "Pending" | "Processing" | "Shipped";
  payment: "Pending" | "Paid" | "Failed" | "Cancelled";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
interface TPopulateProduct {
  _id: string
  name: string
  brand: string
  price: number
  image: string
  category: string
  description: string
  quantity: number
  inStock: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
export interface TOrderTable {
  id: string;
  productName: string;
  productPrice: number;
  orderBy?: string;
  customerEmail?: string;
  quantity: number;
  totalPrice: number;
  orderDate: Date | string | number | undefined;
  status: string;
  payment: string;
  transaction: string | null;
}
