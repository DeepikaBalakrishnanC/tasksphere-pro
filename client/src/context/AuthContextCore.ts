import React from "react";

export type User = {
  token: string;
  name?: string;
  email?: string;
};

export type AuthProfile = {
  name?: string;
  email?: string;
};

export type AuthContextType = {
  user: User | null;
  login: (token: string, profile?: AuthProfile) => void;
  logout: () => void;
};

export const AuthContext =
  React.createContext<AuthContextType | null>(null);
