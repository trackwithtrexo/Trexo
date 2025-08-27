"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, XCircle, Chrome, Sparkles, Users, TrendingUp } from 'lucide-react';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });

  

  const handleSignup = () => {
    console.log('Signup:', formData);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex flex-col items-center justify-center p-4 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] border border-green-500/10 rounded-full animate-spin" style={{animationDuration: '30s'}}></div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
              <span className="text-black text-3xl font-bold">T</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
          </div>
        </div>
        
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-6 py-2 mb-6">
          <Sparkles className="w-4 h-4 mr-2" />
          Join the Revolution
        </Badge>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Welcome to <span className="text-green-500">Trexo</span>
        </h1>
        
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Create your account and start tracking expenses smarter than ever
        </p>
      </div>

      {/* Signup Card */}
      <Card className="w-full max-w-lg bg-gray-900/90 border-gray-800 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-white">Create Your Account</CardTitle>
          <CardDescription className="text-gray-400">
            Get started with your financial journey
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300 flex items-center gap-2 text-sm font-medium">
                <User className="w-4 h-4 text-green-500" />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                
                className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20 h-12 transition-all duration-200"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-2 text-sm font-medium">
                <Mail className="w-4 h-4 text-green-500" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                
                className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20 h-12 transition-all duration-200"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 flex items-center gap-2 text-sm font-medium">
                <Lock className="w-4 h-4 text-green-500" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  
                  className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20 h-12 pr-12 transition-all duration-200"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300 flex items-center gap-2 text-sm font-medium">
                <Lock className="w-4 h-4 text-green-500" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  
                  className="bg-gray-800/60 border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20 h-12 pr-12 transition-all duration-200"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-sm flex items-center gap-2 mt-2">
                  <XCircle className="w-4 h-4" />
                  Passwords don't match
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <Button 
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold h-13 rounded-xl transition-all duration-200 hover:scale-105 shadow-xl shadow-green-500/20"
            >
              <span className="flex items-center justify-center gap-2 text-base">
                Create Account
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-4 text-gray-500">Or sign up with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white h-12 transition-all duration-200"
            >
              <Chrome className="w-5 h-5 mr-3" />
              Continue with Google
            </Button>
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-800">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <button className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                  Sign in here →
                </button>
              </p>
            </div>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-green-400 hover:text-green-300 underline decoration-green-500/30">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-green-400 hover:text-green-300 underline decoration-green-500/30">Privacy Policy</a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Proof */}
      <div className="mt-12 flex items-center justify-center gap-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {['H', 'D', 'A', 'K'].map((letter, i) => (
              <div key={i} className={`w-10 h-10 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-white ${
                i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-purple-500' : 'bg-orange-500'
              }`}>
                {letter}
              </div>
            ))}
          </div>
          <div className="text-gray-400 text-sm">
            <span className="text-green-400 font-semibold">10,000+</span> users joined this month
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;