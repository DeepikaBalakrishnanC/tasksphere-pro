const API =
  "http://localhost:5001/api/auth";

export type AuthUser = {
  name?: string;
  email?: string;
};

export type AuthResponse = {
  success?: boolean;
  token?: string;
  user?: AuthUser;
  message?: string;
};

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const requestAuth = async (
  endpoint: "register" | "login",
  data: RegisterData | LoginData
): Promise<AuthResponse> => {
  const res =
    await fetch(
      `${API}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body:
          JSON.stringify(data)
      }
    );

  const payload =
    await res.json() as AuthResponse;

  if (!res.ok || payload.success === false) {
    throw new Error(
      payload.message || "Authentication failed"
    );
  }

  return payload;
};

export const registerUser =
  async (
    data: RegisterData
  ) => requestAuth("register", data);

export const loginUser =
  async (
    data: LoginData
  ) => requestAuth("login", data);
