import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/drizzle/schema";

import { createDb } from "./db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth(() => {
  const db = createDb();

  return {
    providers: [GoogleProvider],
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    session: {
      strategy: "jwt",
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      session: async ({ session, token }) => {
        if (token?.id) {
          session.user.id = token.id as string;
        }
        return session;
      },
    },
  };
});
