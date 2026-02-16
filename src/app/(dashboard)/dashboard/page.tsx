import NewExpense from "@/app/(dashboard)/dashboard/components/Newexpense";
import NewIncome from "@/app/(dashboard)/dashboard/components/Newincome";
import Amount from "@/components/AmountSection";
import Charts from "@/components/charts";
import DateSelect from "@/components/DateSelect";
import { CLIENT_URL } from "@/config/config";
import { format, subMonths } from "date-fns";
import { headers } from "next/headers";
import { cache } from "react";

type FinancialData = {
  expense: Array<{
    id: string;
    userId: string;
    category: string;
    amount: string;
    date: string;
    description: string;
  }>;
  income: Array<{
    id: string;
    userId: string;
    amount: string;
    date: string;
    description: string;
  }>;
};

const getAllData = cache(
  async (
    cookie: string,
    startDate: string,
    endDate: string,
  ): Promise<FinancialData> => {
    try {
      const res = await fetch(
        `${CLIENT_URL}/api/v1/user/allData?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
          },
          next: { tags: ["getAllData"] },
          cache: "force-cache",
        },
      );

      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json();
    } catch (error) {
      console.error("Error fetching all data:", error);
      return { expense: [], income: [] };
    }
  },
);

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const headersList = await headers();
  const cookie = headersList.get("cookie") || "";

  const sp = (await searchParams) ?? {};
  const startDate =
    sp.startDate ?? format(subMonths(new Date(), 1), "yyyy-MM-dd");
  const endDate = sp.endDate ?? format(new Date(), "yyyy-MM-dd");

  // Single fetch with cookie passed in
  const total = await getAllData(cookie, startDate, endDate);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 transition-colors duration-300">
      <div className="mx-auto w-[80%] py-12 space-y-12">
        {/* ================= HEADER ================= */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Title Section */}
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Dashboard
            </h1>

            <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Live Updates
              </span>

              <span>•</span>

              <span>Overview for {format(new Date(), "MMMM yyyy")}</span>
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex flex-wrap items-center gap-4 p-3 rounded-2xl border border-border bg-card backdrop-blur-md shadow-sm">
            <div className="px-2">
              <DateSelect />
            </div>

            <div className="h-6 w-[1px] bg-border hidden sm:block" />

            <div className="flex items-center gap-2">
              <NewIncome />
              <NewExpense />
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 gap-10">
          {/* Metrics Section */}
          <section>
            <Amount />
          </section>

          {/* Charts Section */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <Charts />
          </section>
        </div>
      </div>
    </div>
  );
}
