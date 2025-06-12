import config from "@/config";

export const signIn = async (email: string, password: string) => {
  const response = await fetch(`${config.dbUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
  });
  return response.json();
};


