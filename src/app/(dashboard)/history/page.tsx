import { loginUser } from "@/app/action/auth-action";
import DatePicker from "@/components/DatePicker";
import { format, subMonths } from "date-fns";
import { headers } from "next/headers";
import { cache, Suspense } from "react";
import { columns, Payment } from "@/app/(dashboard)/history/components/colums";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FileDown, ArrowUpRight, ArrowDownLeft, CalendarDays, HistoryIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/app/(dashboard)/history/components/Datatable";

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

// Static Data for Spendwithme
const STATIC_DATA: FinancialData = {
  income: [
    { id: "s1", userId: "1", amount: "4500.00", date: format(new Date(), "yyyy-MM-dd"), description: "Freelance Project: UI Design" },
    { id: "s2", userId: "1", amount: "1200.00", date: format(subMonths(new Date(), 0), "yyyy-MM-dd"), description: "Monthly Salary Deposit" },
  ],
  expense: [
    { id: "s3", userId: "1", category: "Food", amount: "45.50", date: format(new Date(), "yyyy-MM-dd"), description: "Starbucks Coffee & Snacks" },
    { id: "s4", userId: "1", category: "Shopping", amount: "1200.00", date: format(subMonths(new Date(), 0), "yyyy-MM-dd"), description: "Apple Store: Magic Keyboard" },
    { id: "s5", userId: "1", category: "Grocery", amount: "82.30", date: format(subMonths(new Date(), 0), "yyyy-MM-dd"), description: "Whole Foods Market" },
  ]
};
export type TransactionType = "income" | "expense";

export interface BaseTransaction {
  id: string;
  userId: string;
  amount: number; // ✅ better as number (recommended)
  date: string;   // yyyy-MM-dd
  description: string;
}


const getAllData = cache(
  async (
    userId: string,
    cookie: string,
    startDate: string,
    endDate: string
  ): Promise<FinancialData> => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.BASE_URL ||
        "http://localhost:3000";

      const res = await fetch(
        `${baseUrl}/api/v1/user/allData?from=${startDate}&to=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
          },
          next: { tags: ["getAllData"] },
          cache: "force-cache",
        }
      );

      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json();
    } catch (error) {
      console.error("Error fetching all data:", error);
      return { expense: [], income: [] };
    }
  }
);

export default async function History({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const headersList = await headers();
  const cookie = headersList.get("cookie") || "";

  const sp = (await searchParams) ?? {};
  const startDate = sp.startDate ?? format(subMonths(new Date(), 1), "yyyy-MM-dd");
  const endDate = sp.endDate ?? format(new Date(), "yyyy-MM-dd");

  const user = await loginUser();
  const apiData = await getAllData(user, cookie, startDate, endDate);

  const allTransactions = [
    ...apiData.income.map((i) => ({ ...i, type: "income", category: "Revenue" })),
    ...apiData.expense.map((e) => ({ ...e, type: "expense" })),
    ...STATIC_DATA.income.map((i) => ({ ...i, type: "income", category: "Revenue" })),
    ...STATIC_DATA.expense.map((e) => ({ ...e, type: "expense" })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
  <div className="w-[80%] mx-auto py-8 space-y-10 min-h-screen max-w-none px-0">
    {/* Header Section: Added horizontal padding so text doesn't touch the 80% edge */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
      <div className="space-y-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-primary mb-1">
          <HistoryIcon size={18} />
          <span className="text-xs font-bold uppercase tracking-widest opacity-70">Activity Log</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">History</h1>
        <p className="text-muted-foreground text-sm">
          Showing records for <span className="font-medium text-foreground">{startDate}</span> to <span className="font-medium text-foreground">{endDate}</span>
        </p>
      </div>

      <div className="flex items-center gap-3 bg-card border p-2 rounded-2xl shadow-sm">
        <DatePicker />
        <Separator orientation="vertical" className="h-8" />
        <Button variant="ghost" size="sm" className="rounded-xl font-bold gap-2 text-primary hover:text-primary hover:bg-primary/10">
          <FileDown size={18} />
          <span className="hidden sm:inline">Export PDF</span>
        </Button>
      </div>
    </div>

    {/* Table Section: Removed side padding so borders hit the 80% mark */}
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden mx-0">
      {/* <DataTable columns={columns} data={allTransactions as ""} /> */}
    </div>
  </div>
);
}