"";

import { ModeToggle } from "@/components/ModeToggle";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      {/* Logo Section */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={45}
            height={20}
            className="h-auto w-10 sm:w-11.25"
          />
          <h1 className="whitespace-nowrap text-2xl font-semibold tracking-tight sm:text-3xl">
            Trex<span className="text-green-500">o</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ModeToggle />
          <Link href="/auth/signup">
            <Button className="h-9 rounded-lg bg-green-500 px-4 text-sm text-white transition-all duration-300 hover:scale-[1.03] hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/35 sm:h-10 sm:px-6 sm:text-base">
              <span className="hidden sm:inline">Get Started Now</span>
              <span className="sm:hidden">Start</span>
              <ArrowRight
                size={18}
                className="ml-1 transition-transform duration-300 group-hover/button:translate-x-0.5"
              />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
