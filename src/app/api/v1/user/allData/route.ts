import { loginUser } from "@/app/action/auth-action";
import PRISMA from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const user = await loginUser();

    const whereClause: {
      userId: string;
      date?: {
        gte: Date;
        lte: Date;
      };
    } = { userId: user };

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      whereClause.date = {
        gte: start,
        lte: end,
      };
    }

    const [expense, income] = await Promise.all([
      PRISMA.expense.findMany({
        where: whereClause,
      }),
      PRISMA.income.findMany({
        where: whereClause,
      }),
    ]);

    return NextResponse.json({ expense, income });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
