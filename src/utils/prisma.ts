import { PrismaClient } from "@/generated/prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

const PRISMA = prisma;

export default PRISMA;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
