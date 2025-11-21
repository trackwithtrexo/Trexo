"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { DatePickerWithRange } from "@/components/ui/DateRangePicker";

const DateSelect = () => {
  const router = useRouter();
  const params = useSearchParams();
  const user = "2025-10-02T05:43:59.340Z";

  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // 👉 Runs ONLY one time
  useEffect(() => {
    const currentStart = params.get("startDate");
    const currentEnd = params.get("endDate");

    // If URL already has dates -> DO NOT OVERWRITE
    if (currentStart && currentEnd) return;

    const fetchJoininDate = async () => {
      const join = user;

      if (join) {
        const start = parseISO(join);
        const end = new Date();

        setDateRange({ from: start, to: end });

        const s = format(start, "yyyy-MM-dd");
        const e = format(end, "yyyy-MM-dd");

        // 👉 Push only once
        router.replace(`?startDate=${s}&endDate=${e}`, { scroll: false });
      }
    };

    fetchJoininDate();
  }, [user, router, params]);

  const handleDateRangeChange = (newRange: DateRange | undefined) => {
    if (!newRange) return;

    if (!newRange.from) newRange.from = newRange.to;
    if (!newRange.to) newRange.to = newRange.from;

    setDateRange(newRange);

    const s = format(newRange.from!, "yyyy-MM-dd");
    const e = format(newRange.to!, "yyyy-MM-dd");

    router.replace(`?startDate=${s}&endDate=${e}`, { scroll: false });
  };

  return (
    <DatePickerWithRange
      onDateRangeChange={handleDateRangeChange}
      defaultDateRange={dateRange}
    />
  );
};

export default DateSelect;