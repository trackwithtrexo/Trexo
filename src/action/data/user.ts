import PRISMA from "@/utils/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await PRISMA.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (e) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await PRISMA.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (e) {
    return null;
  }
};
