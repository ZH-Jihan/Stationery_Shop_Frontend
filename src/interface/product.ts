export interface TAllProducts {
  success: boolean;
  statusCode: number;
  message: string;
  meta: TMeta;
  data: TProduct[];
}

export interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface TProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  originalPrice?: number;
  saveAmount?: number;
  discountPercentage?: number;
}
