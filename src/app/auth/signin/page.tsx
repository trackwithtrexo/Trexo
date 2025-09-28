"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signInSchema } from "@/validation/authValidation";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const searchparams = useSearchParams();
  const callbackUrl = searchparams.get("callbackUrl");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    const loading = toast.loading("Signing in...");
    setDisabled(true);
    setGoogleLoading(true);

    startTransition(async () => {
      try {
        const res = await fetch("/api/v1/user/auth/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = (await res.json()) as { message?: string; error?: string };

        if (!res.ok) {
          toast.error(data?.error ?? "Sign in failed", {
            id: loading,
            closeButton: true,
          });
          return;
        }

        toast.success(data?.message ?? "Signed in successfully", {
          id: loading,
          closeButton: true,
        });

        form.reset();
        router.push("/dashboard");
      } catch (err) {
        toast.error("Network error", { id: loading, closeButton: true });
        console.error(err);
      } finally {
        setDisabled(false);
        setGoogleLoading(false);
      }
    });
  };

  const onGoogleClick = async () => {
    setGoogleLoading(true);
    try {
      await signIn("google", {
        callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      });
    } catch (e) {
      console.error("Error: ", e);
    }

    setGoogleLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 relative overflow-hidden">
      <Card className="w-full max-w-[360px] backdrop-blur-lg shadow-xl relative z-10">
        <CardHeader className="text-center space-y-1 pb-3 pt-4 px-4">
          <CardTitle className="flex items-center justify-center text-2xl font-bold text-white">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-black dark:text-white">Trex</span>
            <span className="text-green-500">o</span>
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Sign in to your account
          </p>
        </CardHeader>

        <CardContent className="px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white flex items-center gap-1 text-xs">
                      <Mail className="w-3 h-3 text-green-500" /> Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        disabled={isDisabled || googleLoading}
                        className="bg-white dark:text-white text-black mt-2 h-9 text-sm"
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
                    <FormLabel className="text-black dark:text-white flex items-center gap-1 text-xs">
                      <Lock className="w-3 h-3 text-green-500" /> Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          disabled={isDisabled || googleLoading}
                          className="bg-white dark:text-white text-black focus:border-green-500 mt-2 h-9 text-sm pr-8"
                        />
                      </FormControl>
                      <button
                        type="button"
                        disabled={isDisabled || googleLoading}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer text-gray-400 hover:text-green-400"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between text-xs">
                <button
                  className="text-green-600 hover:text-green-500 cursor-pointer"
                  disabled={isDisabled || googleLoading}
                  type="button"
                  onClick={() => router.push("/auth/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isDisabled || googleLoading}
                className="w-full bg-gradient-to-r dark:text-black from-green-500 to-green-600 hover:scale-105 text-white font-semibold h-9 rounded-md shadow-md hover:shadow-green-500/20 text-sm"
              >
                {isDisabled ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="flex items-center gap-2">
                <span className="flex-1 border-t border-gray-300 dark:border-gray-500/30" />
                <span className="text-gray-500 text-[11px] dark:text-gray-300/50">
                  OR
                </span>
                <span className="flex-1 border-t border-gray-300 dark:border-gray-500/30" />
              </div>
            </form>
          </Form>
          {/* <div className="grid grid-cols-1 w-full"> */}
            <Button
              className="my-3 w-full mb-2"
              onClick={() => onGoogleClick()}
              variant={theme == "dark" ? "ghost" : "outline"}
              disabled={isDisabled || googleLoading}
            >
              {googleLoading || isDisabled ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FcGoogle className="mr-2 h-4 w-4" />
              )}
              Google
            </Button>
          {/* </div> */}

          <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-3">
            Don&apos;t have an account?{" "}
            <button
              className="text-green-600 hover:cursor-pointer hover:text-green-500 font-semibold"
              disabled={isDisabled || googleLoading}
              onClick={() => router.push("/auth/signup")}
            >
              Sign up →
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
