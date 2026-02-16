import { loginUser } from "@/app/action/auth-action";
import DatePicker from "@/components/DatePicker";
import { format, subMonths } from "date-fns";
import { headers } from "next/headers";
import { cache, Suspense } from "react";

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

// Cache the fetch - cookie is part of the cache key
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

      console.log("History Page - API")

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

  console.log("History Page - total data:");

  return (
    <div>
      <Suspense fallback={<div>Loading date picker...</div>}>
        <DatePicker />
        hii form History
      </Suspense>
    </div>
  );
}
