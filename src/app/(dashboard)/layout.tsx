import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Trexo - Track with Trexo",
  description: "Track with Trexo",
  icons: {
    icon: [{ url: "/Logo.png", type: "image/svg+xml" }],
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      {children}
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
