"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartType = "Bar Chart" | "Line Chart" | "Area Chart";
type MonthlyDatum = { month: string; income: number; expenses: number };

interface IncomeExpenseChartProps {
  chartType: ChartType;
  data: MonthlyDatum[];
}

const chartConfig: Record<string, { label: string; color: string }> = {
  income: { label: "Income", color: "#22c55e" },
  expenses: { label: "Expenses", color: "#3b82f6" },
};

export default function IncomeExpenseChart({
  chartType,
  data,
}: IncomeExpenseChartProps) {
  switch (chartType) {
    case "Line Chart":
      return (
        <ChartContainer config={chartConfig}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="stroke-muted-foreground" />
            <YAxis className="stroke-muted-foreground" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#22c55e", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      );

    case "Area Chart":
      return (
        <ChartContainer config={chartConfig}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="stroke-muted-foreground" />
            <YAxis className="stroke-muted-foreground" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="expenses"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="income"
              stackId="1"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.8}
            />
          </AreaChart>
        </ChartContainer>
      );

    default:
      return (
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="stroke-muted-foreground" />
            <YAxis className="stroke-muted-foreground" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="income" fill="#22c55e" />
            <Bar dataKey="expenses" fill="#3b82f6" />
          </BarChart>
        </ChartContainer>
      );
  }
}