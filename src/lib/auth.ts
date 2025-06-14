import { signIn } from "@/services/auth";
import jwt from "jsonwebtoken";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface ExtendedUser extends User {
  role?: string;
  accessToken?: string;
}

interface ExtendedSession extends Session {
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await signIn(
            credentials?.email as string,
            credentials?.password as string
          );

          if (res.error || !res.data || !res.data.accessToken) {
            console.error(
              "Authentication Error:",
              res.message || "No access token received."
            );
            return null;
          }

          const accessToken = res.data.accessToken;

          // Decode the accessToken to get user details
          const decoded = jwt.decode(accessToken) as {
            _id?: string;
            email?: string;
            name?: string;
            role?: string;
            sub?: string;
          };

          if (decoded) {
            return {
              id: decoded._id,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              accessToken: accessToken,
            } as ExtendedUser;
          }
          return null;
        } catch (error) {
          console.error("Authorization failed:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-client-secret",
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.role) {
        (session.user as { role?: string }).role = token.role as string;
      }
      if (token?.accessToken) {
        (session as ExtendedSession).accessToken = token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: ExtendedUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      if (token.accessToken && !user) {
        try {
          const decoded = jwt.decode(token.accessToken as string) as {
            _id?: string;
            email?: string;
            name?: string;
            role?: string;
            sub?: string;
          };
          if (decoded) {
            token.id = decoded._id;
            token.email = decoded.email;
            token.name = decoded.name;
            token.role = decoded.role;
          }
        } catch (error) {
          console.error("Error decoding JWT token:", error);
        }
      }

      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "demo-secret",
};
