import { signIn } from "@/services/auth";
import jwt from "jsonwebtoken";
import NextAuth, { Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
            sub?: string; // JWT subject, often used for user ID
          };

          if (decoded) {
            return {
              id: decoded._id,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              accessToken: accessToken,
            } as User & { role: string; accessToken: string };
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
        (session as Session & { accessToken?: string }).accessToken =
          token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // Initial sign in from authorize callback
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as User & { role?: string }).role;
        token.accessToken = (
          user as User & { accessToken?: string }
        ).accessToken;
      }

      // Subsequent requests: decode JWT from accessToken if it exists and user is not new
      if (token.accessToken && !user) {
        try {
          const decoded = jwt.decode(token.accessToken as string) as {
            _id?: string;
            email?: string;
            name?: string;
            role?: string;
            sub?: string; // JWT subject, often used for user ID
          };
          if (decoded) {
            token.id = decoded._id;
            token.email = decoded.email;
            token.name = decoded.name;
            token.role = decoded.role; // Assuming 'role' is in your JWT payload
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
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET || "demo-secret",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
