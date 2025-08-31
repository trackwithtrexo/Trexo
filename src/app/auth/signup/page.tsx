"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUp } from "@/types/authTypes";
import { extractAxiosError } from "@/utils/helper";
import { signUpSchema } from "@/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false); // add
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
      const response = await axios.post("/api/auth/sign-up", data, {
        withCredentials: true,
      });
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

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit(handleSignup)}>
          {/* Name */}
          <div>
            <Label
              htmlFor="name"
              className="text-black dark:text-white  text-xs flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5 text-green-500" /> Full Name
            </Label>
            <Input
              id="name"
              type="text"
              disabled={isSubmitting}
              placeholder="Enter full name"
              className="bg-white dark:text-white  text-black mt-2 text-sm  h-9"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-400 text-[11px] mt-0.5">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              className="text-black text-xs dark:text-white flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5 text-green-500" /> Email
            </Label>
            <Input
              id="email"
              type="email"
              disabled={isSubmitting}
              placeholder="your@email.com"
              className="bg-white dark:text-white  text-black mt-2 text-sm h-9"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-400 text-[11px] mt-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label
              htmlFor="password"
              className="text-black dark:text-white  text-xs flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5 text-green-500" /> Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                disabled={isSubmitting}
                placeholder="Create password"
                className="bg-white dark:text-white  text-black mt-2 text-sm  h-9 pr-9"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 
                hover:cursor-pointer  hover:text-green-400"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-[11px] mt-0.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Signup Button */}
          <Button
            className="w-full bg-gradient-to-r from-green-500 hover:cursor-pointer to-green-600 dark:text-black hover:scale-105 text-white font-semibold h-9 rounded-md shadow-md hover:shadow-green-500/20 text-sm"
            disabled={isSubmitting || googleLoading}
          >
            {isSubmitting ? "Creating..." : "Create Account"}{" "}
            {/* <ArrowRight className="w-4 h-4 ml-1" /> */}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <span className="flex-1 border-t border-gray-300 dark:border-gray-500/30" />
          <span className="text-gray-500 text-[11px] dark:text-gray-300/50">
            OR
          </span>
          <span className="flex-1 border-t border-gray-300 dark:border-gray-500/30" />
        </div>

        {/* Google Button */}
        <Button
          type="button"
          disabled={isSubmitting || googleLoading}
          onClick={async () => {
            try {
              setGoogleLoading(true);
              await signIn("google", { callbackUrl: "/dashboard" });
              // no need to set false; redirect will occur
            } catch {
              setGoogleLoading(false);
            }
          }}
          variant="outline"
          className="w-full bg-white text-black dark:text-white dark:border-accent cursor-pointer h-9 rounded-md text-sm"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-1"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          Google
        </Button>

        {/* Sign In Link */}
        <p className="text-gray-500 dark:text-gray-400 text-xs text-center pt-1">
          Already have an account?{" "}
          <button
            className="text-green-600 cursor-pointer hover:text-green-500 font-semibold"
            disabled={isSubmitting || googleLoading}
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
