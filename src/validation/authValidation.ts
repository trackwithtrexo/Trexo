import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(5, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(128, "Password must be less than 128 characters")
    .refine(
      (val) => /[A-Z]/.test(val),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (val) => /[a-z]/.test(val),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (val) => /[0-9]/.test(val),
      "Password must contain at least one number"
    )
    .refine(
      (val) => /[^A-Za-z0-9]/.test(val),
      "Password must contain at least one special character"
    ),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[A-Za-z0-9]+$/, "Name must contain only letters and numbers")
    .refine(
      (val) => /[A-Za-z]/.test(val) || /[0-9]/.test(val),
      "Name must contain both letters and numbers"
    ),
  email: z
    .string()
    .min(5, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(128, "Password must be less than 128 characters")
    .refine(
      (val) => /[A-Z]/.test(val),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (val) => /[a-z]/.test(val),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (val) => /[0-9]/.test(val),
      "Password must contain at least one number"
    )
    .refine(
      (val) => /[^A-Za-z0-9]/.test(val),
      "Password must contain at least one special character"
    ),
});

export const emailVerification = z.object({
  email: z
    .string()
    .min(5, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Invalid email address"),
});

export const tokenVerification = z.object({
  token: z.string().min(1, "Token is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(128, "Password must be less than 128 characters")
    .refine(
      (val) => /[A-Z]/.test(val),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (val) => /[a-z]/.test(val),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (val) => /[0-9]/.test(val),
      "Password must contain at least one number"
    )
    .refine(
      (val) => /[^A-Za-z0-9]/.test(val),
      "Password must contain at least one special character"
    ),
});
