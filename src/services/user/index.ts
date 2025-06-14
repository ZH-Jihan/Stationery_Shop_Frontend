import config from "@/config";
import { TUser } from "@/types/user";
import { getAuthHeaders } from "@/utils/auth";

export const getUserProfile = async () => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${config.dbUrl}/user/profile`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};

export const updateUserProfile = async (
  email: string,
  payload: Partial<TUser>
) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${config.dbUrl}/user/profile/${email}`, {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }

  return response.json();
};
