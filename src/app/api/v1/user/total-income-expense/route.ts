import { loginUser } from "@/app/action/auth-action";
import PRISMA from "@/utils/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await loginUser();

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

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

    const [expenseData, incomeData] = await Promise.all([
      PRISMA.expense.aggregate({
        _sum: { amount: true },
        where: whereClause,
      }),
      PRISMA.income.aggregate({
        _sum: { amount: true },
        where: whereClause,
      }),
    ]);

    // if expense or income is null, set it to 0
    expenseData._sum.amount = expenseData._sum.amount || new Decimal(0);
    incomeData._sum.amount = incomeData._sum.amount || new Decimal(0);

    const expense = expenseData._sum.amount.toNumber();
    const income = incomeData._sum.amount.toNumber();

    return NextResponse.json({ expense, income });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
