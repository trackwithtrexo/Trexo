"use client";

import ExpenseBreakdownChart from "@/components/ExpenseBreakdownChart";
import IncomeExpenseChart from "@/components/income_and_expense_chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3, PieChart as PieIcon } from "lucide-react";
import { useState } from "react";

type TransactionChartType = "Bar Chart" | "Line Chart" | "Area Chart";
type ExpenseChartType = "Pie Chart" | "Bar Chart";

type MonthlyDatum = { month: string; income: number; expenses: number };
type ExpensePieDatum = { name: string; value: number; color: string };
type ExpenseBarDatum = { category: string; amount: number; color: string };

export default function Charts() {
  // Updated data with Emerald/Rose/Sky color palette
  const monthlyData: MonthlyDatum[] = [
    { month: "Apr", income: 5000, expenses: 3000 },
    { month: "May", income: 8000, expenses: 4000 },
    { month: "Jun", income: 0, expenses: 5000 },
    { month: "Sep", income: 50000, expenses: 12000 },
  ];

  const expenseData: ExpensePieDatum[] = [
    { name: "Food", value: 100000, color: "#10b981" },    // Emerald
    { name: "Shopping", value: 20000, color: "#f43f5e" }, // Rose
    { name: "Grocery", value: 5000, color: "#0ea5e9" },  // Sky
    { name: "Other", value: 8000, color: "#6366f1" },    // Indigo
  ];

  const expenseBarData: ExpenseBarDatum[] = [
    { category: "Shopping", amount: 20000, color: "#f43f5e" },
    { category: "Food", amount: 100000, color: "#10b981" },
    { category: "Grocery", amount: 5000, color: "#0ea5e9" },
    { category: "Other", amount: 8000, color: "#6366f1" },
  ];

  const [transactionChartType, setTransactionChartType] = useState<TransactionChartType>("Bar Chart");
  const [expenseChartType, setExpenseChartType] = useState<ExpenseChartType>("Pie Chart");

return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-1">

    {/* Income & Expenses Chart */}
    <Card className="bg-card border border-border shadow-sm backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Cash Flow
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Monthly income vs expenses
          </p>
        </div>

        <Select
          value={transactionChartType}
          onValueChange={(v) =>
            setTransactionChartType(v as TransactionChartType)
          }
        >
          <SelectTrigger className="w-[130px] h-8 text-xs focus:ring-primary">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Bar Chart" className="text-xs">
              Bar Chart
            </SelectItem>
            <SelectItem value="Line Chart" className="text-xs">
              Line Chart
            </SelectItem>
            <SelectItem value="Area Chart" className="text-xs">
              Area Chart
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full">
          <IncomeExpenseChart
            chartType={transactionChartType}
            data={monthlyData}
          />
        </div>
      </CardContent>
    </Card>

    {/* Expense Breakdown */}
    <Card className="bg-card border border-border shadow-sm backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-destructive" />
            Breakdown
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Expenses by category
          </p>
        </div>

        <Select
          value={expenseChartType}
          onValueChange={(v) =>
            setExpenseChartType(v as ExpenseChartType)
          }
        >
          <SelectTrigger className="w-[110px] h-8 text-xs focus:ring-primary">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Pie Chart" className="text-xs">
              Pie Chart
            </SelectItem>
            <SelectItem value="Bar Chart" className="text-xs">
              Bar Chart
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full">
          <ExpenseBreakdownChart
            chartType={expenseChartType}
            barData={expenseBarData}
            pieData={expenseData}
          />
        </div>
      </CardContent>
    </Card>

  </div>
);

}