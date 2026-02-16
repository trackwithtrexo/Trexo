"use client";

import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import zxcvbn from "zxcvbn";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "next-themes";

const SignupPage = () => {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    if (passwordStrength.score < 3) {
      toast.warning("Please set a stronger password");
      return;
    }

    const loading = toast.loading("Registering user...");

    startTransition(async () => {
      try {
        const res = await fetch("/api/v1/user/auth/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = (await res.json()) as { message?: string; error?: string };

        if (!res.ok) {
          toast.error(data?.error ?? "Registration failed", {
            richColors: true,
            closeButton: true,
            id: loading,
          });
          return;
        }

        toast.success(data?.message ?? "Registered", {
          richColors: true,
          closeButton: true,
          id: loading,
        });
      } catch (err) {
        toast.error("Network error", {
          closeButton: true,
          id: loading,
          richColors: true,
        });
      } finally {
        form.reset();
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
        return "bg-gray-300";
    }
  }, [passwordStrength.score]);

  const googleLogin = useGoogleLogin({
    flow: "auth-code", // ✅ Use authorization code flow
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

  const onGoogleClick = () => {
    if (isPending || googleLoading) return;
    googleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 ">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl p-5">
        {/* Header */}
        <CardHeader className="text-center pb-3">
          <CardTitle className="flex items-center justify-center text-xl font-bold text-white">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={34}
              height={34}
              className="mr-1"
            />
            <span className="text-black dark:text-white">Trex</span>
            <span className="text-green-500">o</span>
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400 text-sm">
            Create your account
          </CardDescription>
        </CardHeader>

        {/* Form (shadcn form) */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white text-xs flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-green-500" /> Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      disabled={isPending || googleLoading}
                      placeholder="Enter full name"
                      className="bg-white dark:text-white text-black mt-2 text-sm h-9"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black text-xs dark:text-white flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-green-500" /> Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      disabled={isPending || googleLoading}
                      placeholder="your@email.com"
                      className="bg-white dark:text-white text-black mt-2 text-sm h-9"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white text-xs flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-green-500" /> Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        disabled={isPending || googleLoading}
                        onChange={(e) => {
                          field.onChange(e);
                          handlePasswordChange(e);
                        }}
                        placeholder="Create password"
                        className="bg-white dark:text-white text-black mt-2 text-sm h-9 pr-9"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isPending || googleLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer hover:text-green-400"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    {field.value && (
                      <div className="mt-2">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{
                              width: `${(passwordStrength.score + 1) * 20}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-sm mt-1">
                          {passwordStrength.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 hover:cursor-pointer to-green-600 dark:text-black hover:scale-105 text-white font-semibold h-9 rounded-md shadow-md hover:shadow-green-500/20 text-sm"
              disabled={isPending || googleLoading}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                </>
              ) : (
                <Mail />
              )}
              Register
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-0">
          <span className="flex-1 border-t border-gray-300 dark:border-gray-500/30" />
          <span className="text-gray-500 text-[11px] dark:text-gray-300/50">
            OR
          </span>
          <span className="flex-1 border-t border-gray-300 dark:border-gray-500/30" />
        </div>

        {/* Social (Google) */}
        <div className="grid grid-cols-1 w-full m-0">
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
        </div>

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
};

export default SignupPage;
