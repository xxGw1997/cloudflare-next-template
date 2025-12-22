"use client";

import { createContext, useContext } from "react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

export type AuthContextType = {
  session: ReturnType<typeof useSession>;
  user?: {
    id: string;
  } & User;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const session = useSession();
  const user = session.data?.user;

  return { session, user };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const userInfo = useAuth();

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const userInfo = useContext(AuthContext);
  if (!userInfo)
    throw new Error("useAuthContext must be used within an AuthProvider");

  return userInfo;
}
