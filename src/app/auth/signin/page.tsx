"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowRight, Chrome, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignIn } from "@/types/authTypes";
import { signInSchema } from "@/validation/authValidation";
import { extractAxiosError } from "@/utils/helper";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignIn) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await axios.post("/api/auth/sign-in", data, {
        withCredentials: true,
      });

      toast.success(response.data?.message, { id: toastId });
      router.push("/dashboard");
    } catch (err) {
      toast.error(extractAxiosError(err), { id: toastId });
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-green-500/5 rounded-full blur-2xl animate-pulse delay-1000" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-conic from-green-500/5 via-transparent to-green-500/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "20s" }}
        />
      </div>

      <Card className="w-full max-w-[420px] bg-gray-900/80 border-gray-800 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-3 pb-5 pt-6 px-6">
          <CardTitle className="text-2xl font-bold text-white">
            Log In
          </CardTitle>
          <p className="text-gray-400 text-sm">Sign in to your Account</p>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-gray-300 flex items-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4 text-green-500" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                disabled={isSubmitting}
                className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 h-10"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label
                htmlFor="password"
                className="text-gray-300 flex items-center gap-2 text-sm"
              >
                <Lock className="w-4 h-4 text-green-500" /> Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  disabled={isSubmitting}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 h-10 pr-10"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -tran slate-y-1/2 text-gray-400 hover:text-green-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot */}
            <div className="flex items-center justify-between text-sm">
              <button
                className="text-green-400 hover:text-green-300 text-xs"
                disabled={isSubmitting}
                type="button"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 text-black font-semibold h-10 rounded-md shadow-lg hover:shadow-green-500/25"
            >
              {isSubmitting ? "Logging in..." : "Login"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <span className="flex-1 border-t border-gray-700" />
              <span className="text-gray-500 text-xs">OR</span>
              <span className="flex-1 border-t border-gray-700" />
            </div>

            {/* Google */}
            <Button
              type="button"
              disabled={isSubmitting}
              variant="outline"
              className="w-full bg-gray-800/50 border-gray-700 text-gray-300 hover:border-green-500 hover:text-white h-10 rounded-md"
            >
              <Chrome className="w-4 h-4 mr-3" />
              Continue with Google
            </Button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-4 text-xs">
            Don&apos;t have an account?{" "}
            <button className="text-green-400 hover:text-green-300 font-semibold text-xs">
              Sign up →
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
