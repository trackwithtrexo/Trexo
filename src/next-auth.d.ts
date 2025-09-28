import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      isTwoFactorEnable: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    isTwoFactorEnable: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    isTwoFactorEnable: boolean;
  }
}
