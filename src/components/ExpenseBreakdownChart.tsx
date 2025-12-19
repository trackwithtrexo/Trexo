"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartType = "Bar Chart" | "Pie Chart";

type ExpenseBarDatum = {
  category: string;
  amount: number;
  color: string;
};

type ExpensePieDatum = {
  name: string;
  value: number;
  color: string;
};

interface ExpenseBreakdownChartProps {
  chartType: ChartType;
  barData: ExpenseBarDatum[];
  pieData: ExpensePieDatum[];
}

const expenseConfig: Record<string, { label: string; color: string }> = {
  food: { label: "Food", color: "#3b82f6" },
  shopping: { label: "Shopping", color: "#ef4444" },
  grocery: { label: "Grocery", color: "#eab308" },
  other: { label: "Other", color: "#06b6d4" },
};

export default function ExpenseBreakdownChart({
  chartType,
  barData,
  pieData,
}: ExpenseBreakdownChartProps) {
  if (chartType === "Bar Chart") {
    return (
      <ChartContainer config={expenseConfig}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="category" className="stroke-muted-foreground" />
          <YAxis className="stroke-muted-foreground" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
            {barData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer
      config={expenseConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="name" hideLabel />}
        />
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          {pieData.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}