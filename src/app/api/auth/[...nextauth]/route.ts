import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/config/config";
import { ROLE, User } from "@/generated/prisma";
import { setCookie, tokenBuilder } from "@/utils/authUtils";
import { Role } from "@/utils/enum";
import PRISMA from "@/utils/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) return true;
      try {
        const manualUser: User | null = await PRISMA.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        let userId: string;
        let role: ROLE;

        if (manualUser) {
          // 2) Ensure verified if previously unverified
          userId = manualUser.id;
          role = manualUser.role;
          if (!manualUser.picture) {
            await PRISMA.user.update({
              where: { id: manualUser.id },
              data: { status: true },
            });
          }
          if (!manualUser.status) {
            await PRISMA.user.update({
              where: { id: manualUser.id },
              data: { status: true },
            });
          }
        } else {
          // 3) If you still have GoogleUser model, upsert it; otherwise create a User (see alt below)
          const g = await PRISMA.googleUser.upsert({
            where: { email: user.email! },
            update: {
              name: user.name!,
              picture: user.image!,
            },
            create: {
              email: user.email!,
              name: user.name!,
              picture: user.image!,
            },
            select: { id: true, role: true },
          });
          userId = g.id;
          role = g.role;
        }

        // 4) Issue app token and persist only where needed
        const now = Math.floor(Date.now() / 1000); // Current time in seconds
        const exp = now + 86400; // Expiration in 1 day (86400 seconds)

        // 4) Issue app token and persist only where needed
        const token = await tokenBuilder({
          id: userId,
          role: role as Role,
          exp,
          iat: now,
        });

        if (manualUser) {
          await PRISMA.user.update({
            where: { id: userId },
            data: { jwtToken: token.accessToken },
          });
        } else {
          await PRISMA.googleUser.update({
            where: { id: userId },
            data: { jwtToken: token.accessToken },
          });
        }

        // Set cookie manually (same as manual login)
        await setCookie({
          key: "trexo",
          data: token.accessToken,
          maxDays: 1,
        });
        return true;
      } catch {
        return false;
      }
    },

    async jwt({ token, user }) {
      // Just pass through — no need for NextAuth to manage extra stuff
      return token;
    },

    async session({ session, token }) {
      // You don’t actually need NextAuth’s session anymore
      return session;
    },
  },
});

export { handler as GET, handler as POST };
