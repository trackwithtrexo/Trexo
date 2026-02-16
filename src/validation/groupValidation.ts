import z from "zod";

export const GroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().max(50, "Group description is too long").default("").optional(),
})

export const JoinGroupSchema = z.object({
  code: z
    .string()
    .min(1, "Group code is required")
    .length(6, "Invalid Group Code!")
    .regex(/[A-Za-z0-9]{6}/, "Invalid Group Code!"),
})

