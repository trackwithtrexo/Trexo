"use server";

import { IncomeFormData } from "@/types/allTypes";
import PRISMA from "@/utils/prisma";
import { loginUser } from "./auth-action";
import { revalidatePath } from "next/cache";

export const newIncome = async ({
  amount,
  transactionDate,
  description,
}: IncomeFormData): Promise<string> => {
  try {
    const userId: string = await loginUser();

    await PRISMA.income.create({
      data: { userId, amount, date: transactionDate, description },
    });

    revalidatePath("/dashboard");

    return "success";
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return "Failed to add income";
    }
  }
};
