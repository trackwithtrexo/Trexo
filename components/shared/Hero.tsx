"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Track Expenses
            <br />
            <span className="text-green-500">Smarter Than Ever</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            From chai to EMI, Trexo helps you organize spending, set budgets,
            and understand your money through clear insights.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link href="/auth/signup">
              <Button className="h-10 rounded-lg bg-green-500 px-5 text-white transition-all duration-300 hover:scale-[1.03] hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/35 sm:h-11 sm:px-6">
                Get Started Now
                <ArrowRight
                  size={18}
                  className="ml-1 transition-transform duration-300 group-hover/button:translate-x-0.5"
                />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-radial from-green-500/15 via-transparent to-transparent blur-2xl" />
          <Image
            src="/finance-app-1-67.svg"
            alt="Trexo finance dashboard preview"
            width={620}
            height={420}
            priority
            className="mx-auto h-auto w-full max-w-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
