"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { ArrowLeft, CheckCircle, RefreshCcw, XCircle } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerificationPage() {
  const router = useRouter();
  const Params = useParams();
  const token = Params.token as string;

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          "api/v1/user/auth/signup-verification",
          token,
          { withCredentials: true }
        );
        setStatus("success");
        setMessage(response.data.message);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setStatus("error");
          setMessage(error?.response?.data?.message);
        } else {
          setStatus("error");
          setMessage("Something went wrong. Please try again.");
        }
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-2 ">
      <Card className="w-full max-w-[380px] backdrop-blur-lg shadow-xl relative z-10">
        <CardHeader className="text-center space-y-1 pb-3 pt-6 px-4">
          <CardTitle className="flex items-center justify-center text-2xl font-bold">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="mr-2"
            />
            <span className="text-black dark:text-white">Trex</span>
            <span className="text-green-500">o</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center text-center space-y-4 px-4 py-4">
          {status === "verifying" && (
            <>
              <div className="animate-spin">
                <RefreshCcw className="w-16 h-16 " />
              </div>
              <h2 className="text-xl font-bold text-green-500">
                Verifying your email
              </h2>
              <p className=" text-sm">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h2 className="text-xl font-bold text-green-500">{message}</h2>
              <p className=" text-sm">
                Your email has been successfully verified. You can now use all
                features of <span className="font-semibold">Trexo</span>.
              </p>
              <button
                onClick={() => router.push("/auth/login")}
                className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-green-500/20 transition-all"
              >
                Go to Login
              </button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-16 h-16 text-red-500" />
              <h2 className="text-xl font-bold text-red-500">{message}</h2>
              <p className="text-sm">
                We couldn&apos;t verify your email. The link might be expired or
                invalid.
              </p>
              <button
                onClick={() => router.push("/auth/signup")}
                className="mt-4 flex items-center text-green-500 justify-center cursor-pointer  text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-1 text-green-500" /> Back to
                Signup
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
