import type { Metadata } from "next";
import Providers from "@/app/providers";
import { Geist } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Trexo - Track with Trexo",
  description: "Track with Trexo",
  icons: {
    icon: [{ url: "/Logo.png", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Providers>{children}</Providers>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
