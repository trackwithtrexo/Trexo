"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import * as z from "zod";
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
import { SignInSchema } from "@/validator/auth";

export default function SignInPage() {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    const loadingId = toast.loading("Signing in...");

    startTransition(async () => {
      try {
        const res = await fetch("/api/v1/user/auth/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = (await res.json()) as {
          message?: string;
          error?: string;
          joiningDate?: string | null;
        };

        if (!res.ok) {
          toast.error(data?.error ?? "Sign in failed", {
            id: loadingId,
            richColors: true,
            closeButton: true,
          });
          return;
        }

        toast.success(data?.message ?? "Signed in successfully", {
          id: loadingId,
          closeButton: true,
          richColors: true,
        });

        form.reset();

        router.replace("/dashboard");
      } catch (err) {
        toast.error("Network error. Please try again.", {
          id: loadingId,
          closeButton: true,
        });
        console.error(err);
      }
    });
  };

  const onGoogleClick = () => {
    if (isPending || googleLoading) return;
    googleLogin();
  };

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

        const res = await fetch("/api/v1/user/auth/google-signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: code }),
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
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  {...form.register("password")}
                  disabled={isPending || googleLoading}
                  placeholder="Enter password"
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
              {form.formState.errors.password && (
                <FieldError>
                  {form.formState.errors.password.message}
                </FieldError>
              )}
            </Field>

            {/* Forgot Password Link */}
            <div className="flex justify-start">
              <button
                type="button"
                className="text-xs text-green-600 hover:text-green-500 cursor-pointer transition-colors"
                disabled={isPending || googleLoading}
                onClick={() => router.push("/auth/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

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
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative ">
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
          Don&apos;t have an account?{" "}
          <button
            className="text-green-600 cursor-pointer hover:text-green-500 font-semibold"
            disabled={isPending || googleLoading}
            onClick={() => router.push("/auth/signup")}
          >
            Sign up →
          </button>
        </p>
      </Card>
    </div>
  );
}
