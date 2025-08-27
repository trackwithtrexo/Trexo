import { VerificationToken } from "@/types/authTypes";
import crypto from "crypto";
import PRISMA from "@/utils/prisma";
import { CLIENT_URL } from "@/config/config";

//*** CREATE RANDOM TOKEN ***//
export const createRandomToken = (bytes = 64): string => {
  return crypto.randomBytes(bytes).toString("hex");
};

//*** CREATE LINK FOR VERIFICATION ***
export const createLink = (token: string, type: string): string => {
  return `${CLIENT_URL}/${type}/${token}`;
};

//*** CREATE VERIFICATION TOKEN ***//
export const createVerificationToken = async ({
  email,
  type,
}: VerificationToken): Promise<string> => {
  try {
    // Generate a random token
    const token = createRandomToken();

    // Calculate the expiration date
    const expiresIn = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Save the token to the ForgotPassword model
    await PRISMA.token.create({
      data: {
        token,
        tokenType: type,
        expiresIn,
        email,
      },
    });

    return token;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Failed to create verification token");
  }
};
