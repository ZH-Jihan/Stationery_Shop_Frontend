import config from "@/config";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch(`${config.dbUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: true,
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      error: true,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      status: 500,
    };
  }
};

type Tpayload = {
  name: string;
  email: string;
  password: string;
};

export const regeister = async (payload: Tpayload) => {
  try {
    const response = await fetch(`${config.dbUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: true,
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: true,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      status: 500,
    };
  }
};
