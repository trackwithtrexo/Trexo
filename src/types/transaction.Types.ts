import { z } from "zod";
import { formSchema } from "@/validation/transactionValidation";

export type IncomeFormData = z.infer<typeof formSchema>;
