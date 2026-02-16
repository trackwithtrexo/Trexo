import { z } from "zod";
import {
  IncomeformSchema,
  ExpenseformSchema,
} from "@/validation/transactionValidation";
import { GroupSchema, JoinGroupSchema } from "@/validation/groupValidation";

export type IncomeFormData = z.infer<typeof IncomeformSchema>;
export type ExpenseFormData = z.infer<typeof ExpenseformSchema>;
export type GroupFormData = z.infer<typeof GroupSchema>;
export type JoinGroupFormData = z.infer<typeof JoinGroupSchema>;
