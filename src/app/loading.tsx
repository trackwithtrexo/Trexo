"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
export default function TrexoLoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Trexo...');

  useEffect(() => {
    const loadingSteps = [
      { progress: 25, text: 'Initializing Trexo...' },
      { progress: 50, text: 'Setting up your workspace...' },
      { progress: 75, text: 'Preparing your dashboard...' },
      { progress: 100, text: 'Ready to track expenses!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setProgress(loadingSteps[currentStep].progress);
        setLoadingText(loadingSteps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="min-h-screen  flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="text-center z-10">
        {/* Logo */}
        <div className=" flex items-center justify-center animate-pulse">
            {/* Logo background with subtle glow */}
            <Image src="/Logo.png" alt="Logo" width={300} height={300} className="mr-2" />
             
        </div>

       
        <div className="mb-8">
        <h1 className="text-3xl  md:text-4xl font-bold mb-2">
            Trex<span className="text-green-400">o</span>
          </h1>
          
        </div>

        {/* Loading animation with coin */}
        <div className="mb-8">
          <div className="relative w-64 max-w-xs mx-auto">
            {/* Progress bar background */}
            <div className="h-6 bg-gray-300 dark:bg-gray-800 rounded-full overflow-hidden relative">
              {/* Progress bar fill */}
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 ease-out relative flex items-center justify-end"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full"></div>
                
                {/* Coin at the end of progress bar */}
                {progress > 0 && (
                  <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border border-yellow-300 shadow-lg flex items-center justify-center mr-0.5 animate-pulse">
                    {/* Rupee symbol */}
                    <span className="text-[8px] font-bold text-yellow-900">₹</span>
                  </div>
                )}
              </div>
            </div>
            
           
          
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-12">
          <p className=" text-lg font-medium ">
            {loadingText}
          </p>
        </div>

      
        
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20   rounded-full animate-spin duration-[20s]"></div>
      <div className="absolute bottom-1/4 right-10 w-16 h-16  rounded-full animate-spin duration-[15s] direction-reverse"></div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-32 "></div>
      <div className="absolute bottom-0 left-0 w-full h-32 "></div>
    </div>
  );
}