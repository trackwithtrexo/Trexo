"use server";

import { JWT_KEY } from "@/config/config";
import PRISMA from "@/utils/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const loginUser = async (): Promise<string> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("trackwithtrexo")?.value;
  if (!token) {
    throw new Error("Auth token missing");
  }

  const tokenData: { id: string; tokenType: string } = verify(
    token,
    JWT_KEY
  ) as { id: string; tokenType: string };

  if (tokenData.tokenType !== "access") {
    throw new Error("Invalid token type");
  }

  const user = await PRISMA.user.findUnique({
    where: { id: tokenData.id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // if (token !== user.token) {
  //   throw new Error("Your session has expired. Please log in again.");
  // }

  return tokenData.id;
};
