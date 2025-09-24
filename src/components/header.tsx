"use client";
import Image from "next/image";
import { useState } from "react";
import Darkmode from "@/components/darkmode";
import { UserRound, Menu, X, Home, History, Wallet, Users } from "lucide-react";

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
      <header className="flex items-center justify-between mx-[5%] lg:mx-[10%] h-20 relative z-30">
        {/* Logo section */}
        <div className="flex items-center">
          <Image src={"/logo.png"} alt="logo" height={80} width={80} />
          <h1 className="text-3xl font-bold">
            Trex<span className="text-green-500">o</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-500 transition-colors duration-200"
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* User controls */}
        <div className="flex items-center gap-4">
          <Darkmode />
          <div className="bg-green-500 rounded-full h-12 w-12 items-center flex justify-center text-white">
            <UserRound />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-green-500 z-50 relative"
            aria-label="Toggle sidebar menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-gray-900 dark:bg-gray-950 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center">
            <Image src={"/logo.png"} alt="logo" height={50} width={50} />
            <h1 className="text-xl font-bold text-white ml-2">
              Trex<span className="text-green-500">o</span>
            </h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white p-2"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <div className="bg-green-500 rounded-full h-10 w-10 items-center flex justify-center text-white">
              <UserRound size={18} />
            </div>
            <div>
              <p className="text-white text-sm font-medium">User Profile</p>
              <p className="text-gray-400 text-xs">View Profile</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
