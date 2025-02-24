export interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface TProductResponse {
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
}

export interface TAllProductResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: TMeta;
  data: TProductResponse[];
}
