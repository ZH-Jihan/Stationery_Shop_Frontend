export type TUser = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  image?: string;
  role: "user" | "admin";
  status: "active" | "block";
  isDeleted: boolean;
};
