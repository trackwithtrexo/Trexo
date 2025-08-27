"use client";
import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Chrome } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
 

  

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-green-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-conic from-green-500/5 via-transparent to-green-500/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "20s" }}
        />
      </div>

     
      <Card className="w-full max-w-md bg-gray-900/80 border-gray-800 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4 pb-6">
         
          <CardTitle className="text-3xl font-bold text-white">Login In</CardTitle>
          <p className="text-gray-400 text-sm">Continue your smart financial journey</p>
        </CardHeader>

        <CardContent>
          <form  className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-green-500" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                
                className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 h-12"
              />
            
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-300 flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-green-500" /> Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                 
                  className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
             
            </div>

            { /*Forgot */}
            <div className="flex items-center justify-between text-sm">
             
              <button className="text-green-400 hover:text-green-300">Forgot Password?</button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 text-black font-semibold h-12 rounded-xl shadow-lg hover:shadow-green-500/25"
            >
              Login <ArrowRight className="w-5 h-5 ml-2" />
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
              variant="outline"
              className="w-full bg-gray-800/50 border-gray-700 text-gray-300 hover:border-green-500 hover:text-white h-12"
            >
              <Chrome className="w-5 h-5 mr-3" />
              Continue with Google
            </Button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don’t have an account?{" "}
            <button className="text-green-400 hover:text-green-300 font-semibold">
              Sign up →
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
