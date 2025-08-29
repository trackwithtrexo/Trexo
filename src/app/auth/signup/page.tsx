"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, XCircle, Chrome } from 'lucide-react';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  
  });
  const router = useRouter()

  const handleSignup = () => {
    console.log('Signup:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <Card className="w-full max-w-sm  shadow-2xl relative z-10">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center text-2xl font-bold text-white">
            <Image src="/Logo.png" alt="Logo" width={40} height={40} className="mr-2" />
            Trex<span className="text-green-500">o</span>
          </CardTitle>
          <CardDescription className="text-gray-400 text-base">
            Create your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-gray-300 text-sm flex items-center gap-1">
              <User className="w-4 h-4 text-green-500" /> Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              placeholder="Enter full name"
              className="bg-gray-800/60 border-gray-700 mt-2 text-white h-10"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-gray-300 text-sm flex items-center gap-1">
              <Mail className="w-4 h-4 text-green-500" /> Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              placeholder="your@email.com"
              className="bg-gray-800/60 border-gray-700 mt-2 text-white h-10"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-gray-300 text-sm flex items-center gap-1">
              <Lock className="w-4 h-4 text-green-500" /> Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                placeholder="Create password"
                className="bg-gray-800/60 border-gray-700 mt-2 text-white h-10 pr-10"
                required
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

          

          {/* Signup Button */}
          <Button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold h-10 rounded-lg shadow-lg"
          >
            Create Account <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-gray-900 px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/* Google Button */}
          <Button
            variant="outline"
            className="w-full bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 h-10"
          >
            <Chrome className="w-4 h-4 mr-2" /> Continue with Google
          </Button>

          {/* Sign In Link */}
          <p className="text-gray-400 text-xs text-center pt-2">
            Already have an account?{" "}
            <button className="text-green-400 hover:text-green-300 font-semibold" onClick={() => router.push("/auth/login")}>
              Sign in →
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
