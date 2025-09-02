"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangePassword } from "@/types/authTypes";
import axios from "axios";
import { extractAxiosError } from "@/utils/helper";



export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePassword>();

  const onSubmit = async (data: ChangePassword) => {
    
    const toastId = toast.loading("Resetting password...");
    try {
      setLoading(true);
      const response= await axios.post("/api/auth/change-password", data, {
        withCredentials: true,
      })
      toast.success(response.data?.message, { id: toastId });
      router.push("/auth/login");
    } catch (error) {
      toast.error(extractAxiosError(error), { id: toastId });
    } finally {
      setLoading(false);
    }
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
            Enter your new password
          </p>
        </CardHeader>

        <CardContent className="px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* New Password */}
            <div>
              <Label
                htmlFor="password"
                className="text-black flex dark:text-white items-center gap-1 text-xs"
              >
                <Lock className="w-3 h-3 text-green-500" /> New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-white dark:text-white text-black mt-2 h-9 text-sm pr-8"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-green-400"
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

            {/* Confirm Password */}
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-black flex dark:text-white items-center gap-1 text-xs"
              >
                <Lock className="w-3 h-3 text-green-500" /> Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-white dark:text-white text-black mt-2 h-9 text-sm pr-8"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-green-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-3 h-3" />
                  ) : (
                    <Eye className="w-3 h-3" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-[11px] mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r dark:text-black from-green-500 cursor-pointer to-green-600 text-white font-semibold h-9 rounded-md shadow-md hover:shadow-green-500/20 text-sm"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-3">
            Remembered your password?{" "}
            <button
              className="text-green-600 hover:cursor-pointer cursor-pointer hover:text-green-500 font-semibold"
              onClick={() => router.push("/auth/login")}
            >
              Back to Login →
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
