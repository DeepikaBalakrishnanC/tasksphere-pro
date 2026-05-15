import React from "react";

import {
  AuthContext,
  type AuthProfile,
  type User
} from "./AuthContextCore";

const readStoredUser = (): User | null => {
  const token =
    localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return {
    token,
    name:
      localStorage.getItem("name") || undefined,
    email:
      localStorage.getItem("email") || undefined
  };
};

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [user, setUser] =
    React.useState<User | null>(readStoredUser);

  const login = (
    token: string,
    profile?: AuthProfile
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    if (profile?.name) {
      localStorage.setItem(
        "name",
        profile.name
      );
    }

    if (profile?.email) {
      localStorage.setItem(
        "email",
        profile.email
      );
    }

    setUser({
      token,
      name:
        profile?.name || user?.name,
      email:
        profile?.email || user?.email
    });

  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "name"
    );

    localStorage.removeItem(
      "email"
    );

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};
