"use client";

import { DatePickerWithRange } from "@/components/ui/DateRangePicker";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { DateRange } from "react-day-picker";

const DatePicker = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDateRangeChange = useCallback(
    (newDateRange: DateRange | undefined) => {
      if (!newDateRange?.from || !newDateRange?.to) return;

      const fromStr = format(newDateRange.from, "yyyy-MM-dd");
      const toStr = format(newDateRange.to, "yyyy-MM-dd");

      const currentFrom = searchParams.get("from");
      const currentTo = searchParams.get("to");

      // If the URL already has the same range, don't navigate again
      if (fromStr === currentFrom && toStr === currentTo) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set("from", fromStr);
      params.set("to", toStr);

      router.replace(`/history?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <DatePickerWithRange
      onDateRangeChange={handleDateRangeChange}
    />
  );
};
export default DatePicker;