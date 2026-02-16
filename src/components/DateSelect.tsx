// "use client";

// import { DatePickerWithRange } from "@/components/ui/DateRangePicker";
// import { format, parseISO } from "date-fns";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useCallback, useEffect, useRef } from "react";
// import { DateRange } from "react-day-picker";

// const DateSelect = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Control flags to prevent loops
//   const isInitializedRef = useRef(false);
//   const isUpdatingRef = useRef(false);

//   useEffect(() => {
//     // Skip if already initialized or currently updating
//     if (isInitializedRef.current || isUpdatingRef.current) return;

//     // Check if URL already has dates
//     const existingStart = searchParams.get("startDate");
//     const existingEnd = searchParams.get("endDate");

//     if (existingStart && existingEnd) {
//       // URL has dates, nothing to do - picker will sync from its own fetch
//       isInitializedRef.current = true;
//       return undefined;
//     }

//     const date = localStorage.getItem("joining");

//     if (!date) return undefined;

//     if (date) {
//       isInitializedRef.current = true;
//       isUpdatingRef.current = true;

//       const joininDate = parseISO(date);

//       const formattedStartDate = format(joininDate, "yyyy-MM-dd");
//       const formattedEndDate = format(new Date(), "yyyy-MM-dd");

//       // Batch URL update to prevent immediate re-render loop
//       setTimeout(() => {
//         router.replace(
//           `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
//           { scroll: false },
//         );
//         isUpdatingRef.current = false;
//       }, 0);
//     }
//   }, [router, searchParams]);

//   const handleDateRangeChange = useCallback(
//     (newDateRange: DateRange | undefined) => {
//       // Skip if not initialized or currently updating
//       if (!isInitializedRef.current || isUpdatingRef.current) return;
//       if (!newDateRange?.from || !newDateRange?.to) return;

//       const newStart = format(newDateRange.from, "yyyy-MM-dd");
//       const newEnd = format(newDateRange.to, "yyyy-MM-dd");

//       // Check if dates actually changed
//       const currentStart = searchParams.get("startDate");
//       const currentEnd = searchParams.get("endDate");

//       if (newStart === currentStart && newEnd === currentEnd) {
//         // No change, skip update
//         return;
//       }

//       isUpdatingRef.current = true;

//       // Batch the URL update
//       setTimeout(() => {
//         router.replace(`?startDate=${newStart}&endDate=${newEnd}`, {
//           scroll: false,
//         });
//         isUpdatingRef.current = false;
//       }, 0);
//     },
//     [router, searchParams],
//   );

//   return <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />;
// };

// export default DateSelect;

"use client";

import { DatePickerWithRange } from "@/components/ui/DateRangePicker";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { DateRange } from "react-day-picker";

const DateSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isUpdatingRef = useRef(false);

  const handleDateRangeChange = useCallback(
    (newDateRange: DateRange | undefined) => {
      if (isUpdatingRef.current) return;
      if (!newDateRange?.from || !newDateRange?.to) return;

      const newStart = format(newDateRange.from, "yyyy-MM-dd");
      const newEnd = format(newDateRange.to, "yyyy-MM-dd");

      const currentStart = searchParams.get("startDate");
      const currentEnd = searchParams.get("endDate");
      if (newStart === currentStart && newEnd === currentEnd) return;

      isUpdatingRef.current = true;
      router.replace(`?startDate=${newStart}&endDate=${newEnd}`, {
        scroll: false,
      });
      isUpdatingRef.current = false;
    },
    [router, searchParams],
  );

  return <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />;
};

export default DateSelect;
