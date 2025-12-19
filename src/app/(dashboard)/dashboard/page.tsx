import { cache } from "react";
import { headers } from "next/headers";
import { format, subMonths } from "date-fns";

import { loginUser } from "@/app/action/auth-action";
import Amount from "@/components/AmountSection";
import Charts from "@/components/charts";
import DateSelect from "@/components/DateSelect";
import NewExpense from "@/components/Newexpense";
import NewIncome from "@/components/Newincome";
import { Card, CardContent } from "@/components/ui/card";

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
        `${baseUrl}/api/v1/user/allData?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
          },
          next: { tags: ["getAllData"] },
          cache: "force-cache"
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

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  // Get headers once at top level
  const headersList = await headers();
  const cookie = headersList.get("cookie") || "";

  const sp = (await searchParams) ?? {};
  const startDate =
    sp.startDate ?? format(subMonths(new Date(), 1), "yyyy-MM-dd");
  const endDate = sp.endDate ?? format(new Date(), "yyyy-MM-dd");

  const user = await loginUser();

  // Single fetch with cookie passed in
  const total = await getAllData(user, cookie, startDate, endDate);



  return (
    <div className="min-h-screen">
      <section className="px-4 sm:px-8 lg:px-12 xl:px-20 py-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <Card className="border border-gray-700 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Date Range</h3>
                <DateSelect />
              </CardContent>
            </Card>
            <div className="space-y-3">
              <NewIncome />
              <NewExpense />
            </div>
          </div>

          <div className="lg:col-span-9 space-y-6">
            <Amount />
            <Charts />
          </div>
        </div>
      </section>
    </div>
  );
}