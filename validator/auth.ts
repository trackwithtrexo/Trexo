import z from "zod";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$#!%*?&]{8,}$/,
);

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[A-Za-z0-9]+$/, "Only letters and numbers allowed")
    .refine((val) => !/^[0-9]+$/.test(val), {
      message: "Enter both letters and numbers",
    }),
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
      "Password must contain at least one uppercase letter",
    )
    .refine(
      (val) => /[a-z]/.test(val),
      "Password must contain at least one lowercase letter",
    )
    .refine(
      (val) => /[0-9]/.test(val),
      "Password must contain at least one number",
    )
    .refine(
      (val) => /[^A-Za-z0-9]/.test(val),
      "Password must contain at least one special character",
    ),
});

export const SignInSchema = z.object({
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
