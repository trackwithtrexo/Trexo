"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Chrome } from "lucide-react";
import { SignUp } from "@/types/authTypes";
import { signUpSchema } from "@/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import { extractAxiosError } from "@/utils/helper";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUp>({ resolver: zodResolver(signUpSchema) });

  const router = useRouter();

  const handleSignup = async (data: SignUp) => {
    const toastId = toast.loading("Signing up...");
    try {
      const response = await axios.post("/api/auth/sign-up", data, { withCredentials: true });
      toast.success(response.data?.message, { id: toastId });
      router.push("/auth/signin");
    } catch (err) {
      toast.error(extractAxiosError(err), { id: toastId });
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 ">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl p-5">
        {/* Header */}
        <CardHeader className="text-center pb-3">
          <CardTitle className="flex items-center justify-center text-xl font-bold text-white">
            <Image src="/Logo.png" alt="Logo" width={34} height={34} className="mr-1" />
            Trex<span className="text-green-500">o</span>
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm">
            Create your account
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit(handleSignup)}>
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-gray-300 text-xs flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-green-500" /> Full Name
            </Label>
            <Input
              id="name"
              type="text"
              disabled={isSubmitting}
              placeholder="Enter full name"
              className="bg-gray-800 border-gray-700 mt-2 text-sm text-white h-9"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-400 text-[11px] mt-0.5">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-gray-300 text-xs flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-green-500" /> Email
            </Label>
            <Input
              id="email"
              type="email"
              disabled={isSubmitting}
              placeholder="your@email.com"
              className="bg-gray-800 border-gray-700 mt-2 text-sm text-white h-9"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-400 text-[11px] mt-0.5">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-gray-300 text-xs flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-green-500" /> Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                disabled={isSubmitting}
                placeholder="Create password"
                className="bg-gray-800 border-gray-700 mt-2 text-sm text-white h-9 pr-9"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-[11px] mt-0.5">{errors.password.message}</p>}
          </div>

          {/* Signup Button */}
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-green-600 mt-2 hover:from-green-600 hover:to-green-700 text-black font-semibold text-sm h-9 rounded-lg shadow-md"
          >
            Create Account <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-[11px]">
            <span className="bg-gray-900 px-2 text-gray-500">Or</span>
          </div>
        </div>

        {/* Google Button */}
        <Button
          variant="outline"
          className="w-full bg-gray-800/70 border-gray-700 text-gray-300 hover:bg-gray-700 h-9 text-sm"
        >
          <Chrome className="w-4 h-4 mr-1" /> Continue with Google
        </Button>

        {/* Sign In Link */}
        <p className="text-gray-400 text-xs text-center pt-1">
          Already have an account?{" "}
          <button
            className="text-green-400 hover:text-green-300 font-semibold"
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
