import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$#!%*?&]{8,}$/
);

export const signInSchema = z.object({
  email: z
    .string()
    .min(5, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "password should be minmum 8 characters" })
    .regex(passwordValidation, {
      message:
        "Password should include digits(0-9),special symbols(@,#,&...),Uppercase (A-Z),lowercase(a-z) letters",
    }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email field is empty!" }),
  password: z
    .string()
    .min(6, { message: "Password is min 6 length" })
    .regex(passwordValidation, {
      message:
        "Password should include digits(0-9),special symbols(@,#,&...),Uppercase (A-Z),lowercase(a-z) letters",
    }),
  name: z.string().min(1, {
    message: "Name field is empty!",
  }),
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

export const emailTokenVerification = z.object({
  token: z.string().min(1, "Token is required"),
});

export const TokenVerification = z.object({
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
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters long")
    .max(128, "Confirm password must be less than 128 characters")
    .optional()
    .refine((val) => {
      if (!val) return true; // Skip validation if field is not provided
      return /[A-Z]/.test(val);
    }, "Confirm password must contain at least one uppercase letter")
    .refine((val) => {
      if (!val) return true; // Skip validation if field is not provided
      return /[a-z]/.test(val);
    }, "Confirm password must contain at least one lowercase letter")
    .refine((val) => {
      if (!val) return true; // Skip validation if field is not provided
      return /[0-9]/.test(val);
    }, "Confirm password must contain at least one number")
    .refine((val) => {
      if (!val) return true; // Skip validation if field is not provided
      return /[^A-Za-z0-9]/.test(val);
    }, "Confirm password must contain at least one special character"),
});

export const tokenverification = z.object({
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
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters long")
    .max(128, "Confirm password must be less than 128 characters")
    .optional()
    .refine((val) => {
      if (!val) return true; // Skip validation if field is not provided
      return /[A-Z]/.test(val);
    }, "Confirm password must contain at least one uppercase letter")
    .refine((val) => {
      if (!val) return true; // Skip validation if field is not provided
      return /[a-z]/.test(val);
    }, "Confirm password must contain at least one lowercase letter")
    .refine((val) => {
      if (!val) return true; // Skip validation if field is not provided
      return /[0-9]/.test(val);
    }, "Confirm password must contain at least one number")
    .refine((val) => {
      if (!val) return true; // Skip validation if field is not provided
      return /[^A-Za-z0-9]/.test(val);
    }, "Confirm password must contain at least one special character"),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is Required" }),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })