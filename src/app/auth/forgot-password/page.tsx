"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { extractAxiosError } from "@/utils/helper";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    const toastId = toast.loading("Sending reset link...");
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/forgot-password", data,{withCredentials: true});
      toast.success(response.data?.message, { id: toastId });
      
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
            Forgot your password? Enter your email.
          </p>
        </CardHeader>

        <CardContent className="px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-black dark:text-white flex items-center gap-1 text-xs"
              >
                <Mail className="w-3 h-3 text-green-500" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-white dark:text-white text-black mt-3 h-10 text-sm"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-400 text-[11px] mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r cursor-pointer dark:text-black from-green-500 to-green-600 mt-3 text-white font-semibold h-10 rounded-md shadow-md hover:shadow-green-500/20 text-sm"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-3">
            Remembered your password?{" "}
            <button
              className="text-green-600 hover:cursor-pointer cursor-pointer hover:text-green-500 font-semibold"
              onClick={() => router.push("/auth/signin")}
            >
              Back to Login →
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
