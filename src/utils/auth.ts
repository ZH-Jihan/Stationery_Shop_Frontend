import { getSession } from "next-auth/react";

export const getAuthToken = async () => {
  try {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error("No access token found");
    }
    return session.accessToken;
  } catch (error) {
    console.error("Error getting auth token:", error);
    throw error;
  }
};

export const getAuthHeaders = async () => {
  const token = await getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};
