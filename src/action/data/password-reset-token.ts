import PRISMA from "@/utils/prisma";

export const getpasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await PRISMA.tokens.findUnique({
      where: { token, type: "PasswordReset" },
    });

    return passwordResetToken;
  } catch (e) {
    return null;
  }
};

export const getpasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await PRISMA.tokens.findFirst({
      where: { email, type: "PasswordReset" },
    });

    return passwordResetToken;
  } catch (e) {
    return null;
  }
};
