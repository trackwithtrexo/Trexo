"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Chrome } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
   const router = useRouter()
  return (
    <div className="min-h-screen  flex items-center justify-center p-3 relative overflow-hidden">
     
      <Card className="w-full max-w-sm  backdrop-blur-md shadow-xl relative z-10">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center text-2xl font-bold text-white">
                <Image src="/Logo.png" alt="Logo" width={40} height={40} className="mr-2" />
                  Trex<span className="text-green-500">o</span>
          </CardTitle>
          <p className="text-gray-400 text-xs">Access your smart finance</p>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-1 text-xs">
                <Mail className="w-3.5 h-3.5 text-green-500" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 h-10 mt-2 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-300 flex items-center gap-1 text-xs">
                <Lock className="w-3.5 h-3.5 text-green-500" /> Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 mt-2 h-10 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex items-center justify-between text-xs">
              <button className="text-green-400 hover:text-green-300">Forgot Password?</button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:scale-[1.02] text-black font-semibold h-10 rounded-lg shadow-md hover:shadow-green-500/25 text-sm"
            >
              Login <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <span className="flex-1 border-t border-gray-700" />
              <span className="text-gray-500 text-[10px]">OR</span>
              <span className="flex-1 border-t border-gray-700" />
            </div>

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full bg-gray-800/50 border-gray-700 text-gray-300 hover:border-green-500 hover:text-white h-10 text-sm"
            >
              <Chrome className="w-4 h-4 mr-2" />
              Continue with Google
            </Button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-4">
            Don’t have an account?{" "}
            <button className="text-green-400 hover:text-green-300 font-medium"  onClick={() => router.push("/auth/signup")}>
              Sign up →
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
