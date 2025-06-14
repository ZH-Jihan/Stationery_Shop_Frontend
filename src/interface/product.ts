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
  image: string[];
  category:
    | "Electronics"
    | "Fashion"
    | "Home & Living"
    | "Beauty"
    | "Sports & Outdoors"
    | "Books & Media"
    | "Toys & Games"
    | "Health & Wellness"
    | "Automotive"
    | "Pet Supplies"
    | "Other";
  description: string;
  quantity: number;
  inStock?: boolean;
  discountPercentage?: number;
  flashSale?: boolean;
  flashSalePrice?: number;
  flashSaleEndTime?: Date;
  isFeatured?: boolean;
  isNew?: boolean;
  keyFeatures: string[];
  specifications: string[];
  warranty: string;
  isDeleted?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}
