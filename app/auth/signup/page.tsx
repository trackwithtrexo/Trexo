"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import * as z from "zod";
import zxcvbn from "zxcvbn";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { SignUpSchema } from "@/validator/auth";

export default function SignupPage() {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    if (passwordStrength.score < 3) {
      toast.warning("Please set a stronger password");
      return;
    }

    console.log("Submitting registration with values:");

    const loadingId = toast.loading("Registering user...");

    startTransition(async () => {
      try {
        console.log("Api Is calling");
        const res = await fetch("/api/v1/user/auth/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = (await res.json()) as { message?: string; error?: string };

        if (!res.ok) {
          toast.error(data?.error ?? "Registration failed", { id: loadingId });
          return;
        }

        toast.success(data?.message ?? "Registered successfully!", {
          id: loadingId,
        });
        form.reset();
      } catch (err) {
        console.error("Registration error:", err);
        toast.error("Network error. Please try again.", { id: loadingId });
      }
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const result = zxcvbn(password);
    setPasswordStrength({
      score: result.score,
      feedback: result.feedback.warning || result.feedback.suggestions[0] || "",
    });
  };

  const onGoogleClick = () => {
    if (isPending || googleLoading) return;
    googleLogin();
  };

  const getPasswordStrengthColor = useCallback(() => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-muted";
    }
  }, [passwordStrength.score]);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      const loadingToast = toast.loading("Signing in with Google...");
      setGoogleLoading(true);
      try {
        const code = codeResponse?.code;

        if (!code) {
          toast.error("No authorization code received", {
            richColors: true,
            closeButton: true,
            id: loadingToast,
          });
          return;
        }

        // ✅ Send authorization code to backend
        const res = await fetch("/api/v1/user/auth/google-signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: code }), // ✅ Sending auth code
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.error ?? "Google sign-in failed", {
            richColors: true,
            closeButton: true,
            id: loadingToast,
          });
          return;
        }

        toast.success(data?.message ?? "Signed in with Google", {
          richColors: true,
          closeButton: true,
          id: loadingToast,
        });
        router.push("/dashboard");
      } catch (e) {
        toast.error("Google sign-in error", {
          richColors: true,
          closeButton: true,
          id: loadingToast,
        });
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      toast.error("Google sign-in was cancelled or failed", {
        richColors: true,
        closeButton: true,
      });
    },
  });

  // Extract password register props to merge with our custom onChange
  const { onChange: formPasswordChange, ...restPasswordProps } =
    form.register("password");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl">
        {/* Header */}
        <CardHeader className="text-center pb-6">
          <CardTitle className="flex items-center justify-center text-xl font-bold">
            <Image
              src="/Logo.svg"
              alt="Trexo Logo"
              width={34}
              height={34}
              className="mr-2"
            />
            <span className="text-foreground">Trex</span>
            <span className="text-green-500">o</span>
          </CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <Field data-invalid={form.formState.errors.name ? "" : undefined}>
              <FieldLabel
                htmlFor="name"
                className="text-xs flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-green-500" /> Full Name
              </FieldLabel>
              <Input
                id="name"
                {...form.register("name")}
                disabled={isPending || googleLoading}
                placeholder="Enter full name"
                className="bg-background h-9"
              />
              {form.formState.errors.name && (
                <FieldError>{form.formState.errors.name.message}</FieldError>
              )}
            </Field>

            {/* Email Field */}
            <Field data-invalid={form.formState.errors.email ? "" : undefined}>
              <FieldLabel
                htmlFor="email"
                className="text-xs flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-green-500" /> Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                disabled={isPending || googleLoading}
                placeholder="your@email.com"
                className="bg-background h-9"
              />
              {form.formState.errors.email && (
                <FieldError>{form.formState.errors.email.message}</FieldError>
              )}
            </Field>

            {/* Password Field */}
            <Field
              data-invalid={form.formState.errors.password ? "" : undefined}
            >
              <FieldLabel
                htmlFor="password"
                className="text-xs flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-green-500" /> Password
              </FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...restPasswordProps}
                  disabled={isPending || googleLoading}
                  onChange={(e) => {
                    formPasswordChange(e);
                    handlePasswordChange(e);
                  }}
                  placeholder="Create password"
                  className="bg-background h-9 pr-10 [&::-ms-reveal]:hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isPending || googleLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-green-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {form.watch("password") && (
                <div className="mt-2 space-y-1.5">
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                    />
                  </div>
                  {passwordStrength.feedback && (
                    <p className="text-[11px] text-muted-foreground leading-tight">
                      {passwordStrength.feedback}
                    </p>
                  )}
                </div>
              )}
              {form.formState.errors.password && (
                <FieldError>
                  {form.formState.errors.password.message}
                </FieldError>
              )}
            </Field>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-green-500 hover:cursor-pointer to-green-600 dark:text-black hover:scale-105 text-white font-semibold h-9 rounded-md shadow-md hover:shadow-green-500/20 text-sm"
              disabled={isPending || googleLoading}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Mail className="w-4 h-4 mr-2" />
              )}
              Register
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center pt-1">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase pt-1">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button
            className="w-full h-9 m-0 p-0 cursor-pointer"
            onClick={() => onGoogleClick()}
            variant={theme == "dark" ? "ghost" : "outline"}
            disabled={isPending || googleLoading}
          >
            {googleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FcGoogle className="mr-2 h-4 w-4" />
            )}
            Google
          </Button>
        </CardContent>

        {/* Sign In Link */}
        <p className="text-gray-500 dark:text-gray-400 text-xs text-center pt-1">
          Already have an account?{" "}
          <button
            className="text-green-600 cursor-pointer hover:text-green-500 font-semibold"
            disabled={isPending || googleLoading}
            onClick={() => router.push("/auth/signin")}
          >
            Sign in →
          </button>
        </p>
      </Card>
    </div>
  );
}
