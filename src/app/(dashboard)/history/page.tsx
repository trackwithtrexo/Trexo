import { loginUser } from "@/app/action/auth-action";
import DateSelect from "@/components/DateSelect";
import { format, subMonths } from "date-fns";
import { cache, Suspense } from "react";

const getAllData = cache(
  async (id: string, startDate: string, endDate: string) => {
    try {
      // use relative API path so it works in different environments
      const url = `/api/v1/user/allData?startDate=${encodeURIComponent(
        startDate
      )}&endDate=${encodeURIComponent(endDate)}`;

      console.log("1");

      const res = await fetch(url, {
        method: "GET",
        next: {
          tags: ["getAllData"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch all financial data");

      const data = await res.json();
      return data;
    } catch (error) {
      return { expense: [], income: [] };
    }
  }
);

export default async function History({
  searchParams,
}: {
  searchParams?:
    | Record<string, string>
    | Promise<Record<string, string> | undefined>;
}) {
  const sp = (await searchParams) ?? {};

  // normalize param names and provide defaults
  const startDate =
    sp.startDate ?? sp.from ?? format(subMonths(new Date(), 1), "yyyy-MM-dd");
  const endDate = sp.endDate ?? sp.to ?? format(new Date(), "yyyy-MM-dd");

  console.log("History Page - startDate:", startDate, "endDate:", endDate);

  const users = "2025-10-02T05:43:59.340Z";

   const user = await loginUser();

  const [total] = await Promise.all([getAllData(user, startDate, endDate)]);

  console.log("History Page - total data:");

  return (
    <div>

      hii form History
      {/* Keep your existing UI 
      <Suspense fallback={<div>Loading date picker...</div>}>
        <DateSelect />
      </Suspense>
     */ }
    </div>
  );
}
