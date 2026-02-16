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
      <header className="sticky top-0  backdrop-blur-md border-b  shadow-sm z-30">
        <div className="flex items-center justify-between mx-[5%] lg:mx-[10%] h-16 lg:h-20">
          {/* Logo section */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image 
                src={"/Logo.png"} 
                alt="Trexo logo" 
                height={60} 
                width={60} 
                className="drop-shadow-sm" 
              />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Trex<span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">o</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all duration-200 font-medium"
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User controls */}
          <div className="flex items-center gap-3">
            <Darkmode />
            
            {/* User avatar with subtle animation */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:scale-105">
                <UserRound size={20} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 z-50 relative"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in-0 duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-80 dark:bg-black shadow-2xl transform transition-transform duration-300 ease-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b  ">
          <div className="flex items-center gap-3">
            <Image src={"/Logo.png"} alt="Trexo logo" height={45} width={45} />
            <h1 className="text-xl font-bold bg-clip-text text-transparent dark:text-white ">
              Trex<span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">o</span>
            </h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-500  p-2 rounded-lg transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-2 px-3">
          {navigationItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 mx-2 my-1  rounded-xl transition-all duration-200 group"
              onClick={() => setIsSidebarOpen(false)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors duration-200">
                <item.icon size={18} />
              </div>
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r  rounded-xl border shadow-sm">
            <div className="relative">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
                <UserRound size={18} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-700"></div>
            </div>
            <div className="flex-1">
              <p className=" text-sm font-semibold">User Profile</p>
              <p className="text-xs">Manage your account</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
}