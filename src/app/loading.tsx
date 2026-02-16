"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TrexoLoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing Trexo...");

  useEffect(() => {
    const loadingSteps = [
      { progress: 10, text: "Initializing Trexo..." },
      { progress: 25, text: "Securing your workspace..." },
      { progress: 40, text: "Organizing your expenses..." },
      { progress: 55, text: "Categorizing recent activity..." },
      { progress: 70, text: "Preparing your dashboard..." },
      { progress: 85, text: "Generating insights from your spending..." },
      { progress: 100, text: "Ready to track expenses!" },
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
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Soft gradient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-green-500/10" />
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      {/* Background pattern (kept, slightly refined placement) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
        <div className="absolute top-40 right-32 h-1 w-1 animate-pulse rounded-full bg-green-400 delay-300"></div>
        <div className="absolute bottom-32 left-40 h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 delay-700"></div>
        <div className="absolute bottom-20 right-20 h-2 w-2 animate-pulse rounded-full bg-green-400 delay-1000"></div>
      </div>

      <div className="z-10 w-full max-w-md px-6 text-center">
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 6, -6, 0] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <Image
            src="/Logo.png"
            alt="Trexo logo"
            width={260}
            height={260}
            priority
            className="drop-shadow-sm"
          />
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            Trex<span className="text-green-400">o</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Empower every rupee with clearer tracking.
          </p>
        </motion.div>

        {/* Loading animation with coin (UNCHANGED progress bar block) */}
        <div className="mb-8">
          <div className="relative mx-auto w-64 max-w-xs">
            {/* Progress bar background */}
            <div className="relative h-6 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-800">
              {/* Progress bar fill */}
              <div
                className="relative flex h-full items-center justify-end rounded-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* Coin at the end of progress bar */}
                {progress > 0 && (
                  <div className="mr-0.5 flex h-4 w-4 animate-pulse items-center justify-center rounded-full border border-yellow-300 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg">
                    {/* Rupee symbol */}
                    <span className="text-[8px] font-bold text-yellow-900">
                      ₹
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <p className="text-lg font-medium text-foreground">{loadingText}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Tip: Use groups to track shared expenses and settle faster.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
