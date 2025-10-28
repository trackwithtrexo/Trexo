import { JWT_KEY } from "@/config/config";
import { CookieType, JWTPayload, TokenData } from "@/types/authTypes";
import JWT from "jsonwebtoken";
import { cookies } from "next/headers";

export function generateJWT(payload: JWTPayload): string {
  const defaultOptions: JWT.SignOptions = { expiresIn: "1d" };
  return JWT.sign(payload, JWT_KEY, defaultOptions);
}

export async function tokenBuilder(
  data: TokenData
): Promise<{ accessToken: string; id: string }> {
  const accessToken = generateJWT({
    id: data.id,
    tokenType: "access",
  });

  return {
    accessToken,
    id: data.id,
  };
}

export async function setCookie({
  key,
  data,
  maxDays,
}: CookieType): Promise<void> {
  const cookieStore = await cookies();
  const expirationDate = new Date(Date.now() + maxDays * 1000);

  cookieStore.set(key, data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    expires: expirationDate,
    path: "/",
    // domain: ".spend-with-me-client.vercel.app",
  });
}

// const removeCookie = (res, key) => {
//   res.cookie(key, "", {
//     httpOnly: true,
//     expires: new Date(0),
//     secure: true,
//     sameSite: "Strict",
//     domain: ".spend-with-me-client.vercel.app",
//   });
// };
