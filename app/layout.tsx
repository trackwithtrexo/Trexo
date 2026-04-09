import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/config/config";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trexo - Track with Trexo",
  description: "Track with Trexo",
  icons: {
    icon: [{ url: "/Logo.png", type: "image/svg+xml" }],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {children}
          </GoogleOAuthProvider>
        </ThemeProvider>
         <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
