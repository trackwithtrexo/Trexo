"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowRight, Chrome, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
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
   <div className="min-h-screen flex items-center justify-center p-2 relative overflow-hidden">
  <Card className="w-full max-w-[360px] backdrop-blur-lg shadow-xl relative z-10">
    <CardHeader className="text-center space-y-1 pb-3 pt-4 px-4">
      <CardTitle className="flex items-center justify-center text-2xl font-bold text-white">
                  <Image src="/Logo.png" alt="Logo" width={40} height={40} className="mr-2" />
                  Trex<span className="text-green-500">o</span>
                </CardTitle>
      <p className="text-gray-400 text-xs">Sign in to your account</p>
    </CardHeader>

    <CardContent className="px-4 pb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Email */}
        <div>
          <Label
            htmlFor="email"
            className="text-gray-300 flex items-center gap-1 text-xs"
          >
            <Mail className="w-3 h-3 text-green-500" /> Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            disabled={isSubmitting}
            className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 mt-2 h-9 text-sm"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-400 text-[11px] mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label
            htmlFor="password"
            className="text-gray-300 flex items-center gap-1 text-xs"
          >
            <Lock className="w-3 h-3 text-green-500" /> Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              disabled={isSubmitting}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 mt-2 h-9 text-sm pr-8"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer  text-gray-400 hover:text-green-400"
            >
              {showPassword ? (
                <EyeOff className="w-3 h-3" />
              ) : (
                <Eye className="w-3 h-3" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-[11px] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot */}
        <div className="flex items-center justify-between text-xs">
          <button
            className="text-green-400 hover:text-green-300"
            disabled={isSubmitting}
            type="button"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-500 hover:cursor-pointer to-green-600 hover:scale-105 text-black font-semibold h-9 rounded-md shadow-md hover:shadow-green-500/20 text-sm"
        >
          {isSubmitting ? "Logging in..." : "Login"}
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <span className="flex-1 border-t border-gray-700" />
          <span className="text-gray-500 text-[11px]">OR</span>
          <span className="flex-1 border-t border-gray-700" />
        </div>

        {/* Google */}
        <Button
          type="button"
          disabled={isSubmitting}
          variant="outline"
          className="w-full bg-gray-800/50 border-gray-700 text-gray-300 hover:border-green-500 hover:text-white h-9 rounded-md text-sm"
        >
          <Chrome className="w-3 h-3 mr-2" />
          Google
        </Button>
      </form>

      <p className="text-center text-gray-400 text-xs mt-3">
        Don&apos;t have an account?{" "}
        <button
          className="text-green-400 hover:cursor-pointer hover:text-green-300 font-semibold"
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
