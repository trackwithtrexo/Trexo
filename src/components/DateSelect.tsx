"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { useState, useEffect, useRef, useCallback } from "react";
import { format, parseISO } from "date-fns";
import { DatePickerWithRange } from "@/components/ui/DateRangePicker";

const DateSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Refs to prevent multiple calls
  const isInitializedRef = useRef(false);
  const isUpdatingRef = useRef(false);

  const userJoinDate = "2025-10-02T05:43:59.340Z"; // Replace with actual user data

  // Initialize only once on mount
  useEffect(() => {
    // Skip if already initialized or currently updating
    if (isInitializedRef.current || isUpdatingRef.current) return;

    // Check if URL already has dates
    const existingStart = searchParams.get("startDate");
    const existingEnd = searchParams.get("endDate");

    if (existingStart && existingEnd) {
      // URL has dates, just sync state - don't push URL
      isInitializedRef.current = true;
      setDateRange({
        from: parseISO(existingStart),
        to: parseISO(existingEnd),
      });
      return;
    }

    // No dates in URL, initialize from join date
    if (userJoinDate) {
      isInitializedRef.current = true;
      isUpdatingRef.current = true;

      const joinDate = parseISO(userJoinDate);
      const today = new Date();
      const startStr = format(joinDate, "yyyy-MM-dd");
      const endStr = format(today, "yyyy-MM-dd");

      setDateRange({ from: joinDate, to: today });

      // Use setTimeout to batch the URL update
      setTimeout(() => {
        router.replace(`?startDate=${startStr}&endDate=${endStr}`, {
          scroll: false,
        });
        isUpdatingRef.current = false;
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - run only once on mount

  // Memoized handler to prevent unnecessary re-renders
  const handleDateRangeChange = useCallback(
    (newDateRange: DateRange | undefined) => {
      // Skip if not initialized or currently updating
      if (!isInitializedRef.current || isUpdatingRef.current) return;
      if (!newDateRange?.from || !newDateRange?.to) return;

      const newStart = format(newDateRange.from, "yyyy-MM-dd");
      const newEnd = format(newDateRange.to, "yyyy-MM-dd");

      // Check if dates actually changed
      const currentStart = searchParams.get("startDate");
      const currentEnd = searchParams.get("endDate");

      if (newStart === currentStart && newEnd === currentEnd) {
        return; // No change, skip update
      }

      isUpdatingRef.current = true;
      setDateRange(newDateRange);

      // Batch the URL update
      setTimeout(() => {
        router.replace(`?startDate=${newStart}&endDate=${newEnd}`, {
          scroll: false,
        });
        isUpdatingRef.current = false;
      }, 0);
    },
    [router, searchParams]
  );

  return (
    <DatePickerWithRange
      onDateRangeChange={handleDateRangeChange}
      defaultDateRange={dateRange}
    />
  );
};

export default DateSelect;
