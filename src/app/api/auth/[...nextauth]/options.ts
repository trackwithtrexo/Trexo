import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_KEY,
  NODE_ENV,
} from "@/config/config";
import { User } from "@/generated/prisma";
import PRISMA from "@/utils/prisma";
import type { User as NextAuthUser } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(PRISMA),
  session: { strategy: "jwt" },
  secret: JWT_KEY,
  // Add production-specific cookie settings
  cookies: {
    sessionToken: {
      name: `${
        NODE_ENV === "production" ? "__Secure-" : ""
      }next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: NODE_ENV === "production", // HTTPS only in production
        domain:
          NODE_ENV === "production"
            ? "https://trackwithtrexo.vercel.app"
            : undefined,
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("1 hiiiiii");
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user: User | null = await PRISMA.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user || !user.password) throw new Error("User not found");

        // if (!user.isTwoFactorEnable) {
        //   throw new Error("2FA is not enabled for this user");
        // }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) throw new Error("Invalid email or password");

        return {
          id: user.id as string,
          email: user.email as string,
          name: user.name as string,
        };
      },
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    // Auto-link Google to existing credential account with same email
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;

        const existingUser = await PRISMA.user.findUnique({
          where: { email: user.email },
        });

        // If a user already exists (manual signup) ensure Google account is linked
        if (existingUser) {
          // Check if Google account already linked
          const existingProvider = await PRISMA.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });

          if (!existingProvider) {
            // Link (create account row) manually; adapter normally does this if no conflict
            await PRISMA.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                id_token: account.id_token,
                token_type: account.token_type,
                scope: account.scope,
              },
            });
          }

          // Overwrite user.id so session/JWT attaches to existing user
          (user as NextAuthUser).id = existingUser.id;
        }
        // If no existing user, normal adapter flow will create one
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user && token) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authOptions;
