"use client";
import Image from "next/image";
import { useState } from "react";
import Darkmode from "@/components/darkmode";
import { UserRound, Menu, X, Home, History, Wallet, Users } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigationItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "History", icon: History, href: "/history" },
    { name: "Budget", icon: Wallet, href: "/budget" },
    { name: "Group", icon: Users, href: "/group" },
  ];

  return (
    <>
      {/* 🌿 Professional Floating Header */}
      <header className="sticky top-4 z-30 mx-[5%] lg:mx-[10%] transition-all duration-500">
        <div className="rounded-2xl backdrop-blur-xl border shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-300 px-6 h-16 lg:h-20 flex items-center justify-between">

          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <Image
                src={"/Logo.png"}
                alt="Trexo logo"
                height={42}
                width={42}
                className="relative rounded-xl transition-transform duration-500 group-hover:rotate-[5deg] group-hover:scale-110"
              />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-300">
              Trex<span className="text-green-500 dark:text-green-400">o</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:text-green-600"
              >
                <span className="flex items-center gap-2.5 relative z-10">
                  <item.icon size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span className="text-sm tracking-wide">{item.name}</span>
                </span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <div className="p-1">
              <Darkmode />
            </div>

            {/* Profile Button with Border */}
            <Link
              href="/profile"
              className="relative group overflow-hidden rounded-full p-0.5 border border-slate-200 dark:border-white/10 hover:border-green-500 transition-all duration-500"
            >
              <div className="h-10 w-10 lg:h-11 lg:w-11 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all duration-300 group-hover:text-green-600">
                <UserRound size={20} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
            </Link>

            {/* Mobile Menu Button with Border */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-green-50 dark:hover:bg-green-500/10 hover:border-green-500 hover:text-green-600 transition-all duration-300"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40 transition-opacity duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (unchanged) */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[300px] bg-white dark:bg-[#0B0F1A] shadow-[20px_0_60px_-15px_rgba(0,0,0,0.1)] transform transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] z-50 border-r border-slate-100 dark:border-white/5 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-50 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg">
              <Image src={"/Logo.png"} alt="Trexo logo" height={32} width={32} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Trex<span className="text-green-500">o</span>
            </h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-green-50 dark:hover:bg-green-500/5 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 group"
            >
              <item.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
              <span className="font-semibold text-[15px]">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-4 right-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center gap-4 transition-all hover:border-green-200 dark:hover:border-green-500/30">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
              <UserRound size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                Professional Plan
              </p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Active Member
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
