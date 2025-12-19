import { CategoryTypes } from "@/generated/prisma/client";
import { z } from "zod";

//** FORM VALIDATION SCHEMA **//
export const IncomeformSchema = z.object({
  description: z.string().optional(),
  amount: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be a valid number greater than 0",
    }),
  transactionDate: z.date(),
})

// form validation schema
export const ExpenseformSchema = z.object({
  description: z.string().optional(),
  amount: z
    .string()
    .refine(
      (val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) > 0,
      {
        message: "Amount must be a valid number greater than 0",
      }
    ),
  transactionDate: z.date(),
  category: z.nativeEnum(CategoryTypes),
})