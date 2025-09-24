import { getUserById } from "@/action/data/user";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_KEY,
} from "@/config/config";
import PRISMA from "@/utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { User as NextAuthUser } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { User } from "./generated/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(PRISMA),

  // ✅ JWT sessions only
  session: { strategy: "jwt" },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  providers: [
    // Example: Credentials provider
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user: User | null = await PRISMA.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user || !user.password) throw new Error("User not found");

        if (!user.isTwoFactorEnable) {
          throw new Error("2FA is not enabled for this user");
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) throw new Error("Invalid email or password");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        } as NextAuthUser;
      },
    }),

    // Example: Google OAuth
    Google({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // async jwt({ token, user }) {
    //   console.log("1 firsr call");
    //   if (user) {
    //     token.id = user.id as string;
    //     token.email = user.email as string;
    //   }

    //   const dbUser = token.id
    //     ? ((await PRISMA.user.findUnique({
    //         where: { id: token.id as string },
    //       })) as User)
    //     : null;

    //   if (dbUser) {
    //     token.isTwoFactorEnable = dbUser.isTwoFactorEnable;
    //   }

    //   return token;
    // },

    async jwt({ token }) {
      // token.sub has user id (USER table id )

      if (!token.sub) return token;

      try {
        const existingUser = await getUserById(token.sub);
        if (!existingUser) return token;
        token.isOAuth = !existingUser.password;
        token.name = existingUser.name as string;
        token.email = existingUser.email as string;
        token.isTwoFactorEnable = existingUser.isTwoFactorEnable;
        if (existingUser.emailVerified !== null) {
          token.joininDate = existingUser.emailVerified
            .toISOString()
            .split("T")[0];
        }

        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        return token;
      }
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.isTwoFactorEnable = token.isTwoFactorEnable as boolean;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await PRISMA.user.findUnique({
            where: { email: user?.email as string },
          });

          if (existingUser) {
            // Check if the Google account is already linked
            const alreadyLinked = await PRISMA.account.findFirst({
              where: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            });

            if (!alreadyLinked) {
              // Link Google account to existing user
              await PRISMA.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                },
              });
            }

            // Optionally update user info
            await PRISMA.user.update({
              where: { id: existingUser.id },
              data: {
                image: existingUser.image ?? (user?.image as string | null),
                emailVerified: existingUser.emailVerified ?? new Date(),
              },
            });

            return true; // Allow sign in
          }

          // No existing user, let NextAuth create a new user+account
          return true;
        } catch (err) {
          console.error("Error linking Google account:", err);
          return false;
        }
      }
      // For other providers or credentials, allow sign in as usual
      return true;
    },
  },

  secret: JWT_KEY,
});
