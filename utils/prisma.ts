import { DIRECT_URL } from "@/config/config";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: DIRECT_URL });
const PRISMA = new PrismaClient({ adapter });

export default PRISMA;
