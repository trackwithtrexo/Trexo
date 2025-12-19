import { z } from "zod";
import { IncomeformSchema, ExpenseformSchema } from "@/validation/transactionValidation";

export type IncomeFormData = z.infer<typeof IncomeformSchema>;
export type ExpenseFormData = z.infer<typeof ExpenseformSchema>;