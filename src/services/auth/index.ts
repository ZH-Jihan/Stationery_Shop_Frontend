import config from "@/config";

export const signIn = async (email: string, password: string) => {
  const response = await fetch(`${config.dbUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

type Tpayload = {
  name: string;
  email: string;
  password: string;
};

export const regeister = async (payload: Tpayload) => {
  const res = await fetch(`${config.dbUrl}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};
