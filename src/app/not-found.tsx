"use client";
import { useRouter } from "next/navigation";
export default function Custom404() {
    const router = useRouter();
  
  return (
  <div className="min-h-screen flex items-center justify-center px-6 py-12">
  {/* Main Content */}
  <main className="flex flex-col items-center text-center max-w-xl w-full border p-10 border-green-500 rounded-2xl overflow-hidden">
    {/* 404 Number */}
    <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-6">
      404
    </h1>

    {/* Page Not Found */}
    <h2 className="text-2xl md:text-3xl font-bold mb-4">
      Page Not Found
    </h2>

    {/* Expense Quote */}
    <p className="text-lg md:text-xl text-green-400 mb-6 font-medium px-4">
      "Every penny saved is a penny earned, but this page seems to have gone missing from our budget!"
    </p>

    {/* Description */}
    <p className="text-gray-400 text-sm md:text-base mb-10 leading-relaxed px-4">
      The page you're looking for doesn't exist. Let's get you back to managing your expenses smarter than ever.
    </p>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
      <button
        onClick={() => router.push("/")}
        className="bg-gradient-to-r from-green-500 to-green-600 cursor-pointer px-6 py-3 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-green-500/25 transition-all text-center"
      >
        Back to Home
      </button>
      <button
        onClick={() => router.back()}
        className="border-2 border-gray-700 px-6 py-3 rounded-xl  font-semibold hover:border-green-500 hover:bg-green-500/10 transition-all cursor-pointer text-center"
      >
        ← Go Back
      </button>
    </div>
  </main>
</div>

  );
}