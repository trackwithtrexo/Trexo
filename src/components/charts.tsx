"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ExpenseBreakdownChart from "@/components/ExpenseBreakdownChart";
import IncomeExpenseChart from "@/components/income_and_expense_chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Narrow union types for the selects
type TransactionChartType = "Bar Chart" | "Line Chart" | "Area Chart";
type ExpenseChartType = "Pie Chart" | "Bar Chart";

// Optional: add types for data arrays
type MonthlyDatum = { month: string; income: number; expenses: number };
type ExpensePieDatum = { name: string; value: number; color: string };
type ExpenseBarDatum = { category: string; amount: number; color: string };

export default function Charts() {
  const monthlyData: MonthlyDatum[] = [
    { month: "Apr", income: 5000, expenses: 3000 },
    { month: "May", income: 8000, expenses: 4000 },
    { month: "Jun", income: 0, expenses: 5000 },
    { month: "Sep", income: 50000, expenses: 12000 },
  ];

  const expenseData: ExpensePieDatum[] = [
    { name: "Food", value: 100000, color: "#3b82f6" },
    { name: "Shopping", value: 20000, color: "#ef4444" },
    { name: "Grocery", value: 5000, color: "#eab308" },
    { name: "Other", value: 8000, color: "#06b6d4" },
  ];

  const expenseBarData: ExpenseBarDatum[] = [
    { category: "Shopping", amount: 20000, color: "#ef4444" },
    { category: "Food", amount: 100000, color: "#3b82f6" },
    { category: "Grocery", amount: 5000, color: "#eab308" },
    { category: "Other", amount: 8000, color: "#06b6d4" },
  ];

  // Type the state as the unions so chart components receive the correct types
  const [transactionChartType, setTransactionChartType] =
    useState<TransactionChartType>("Bar Chart");
  const [expenseChartType, setExpenseChartType] =
    useState<ExpenseChartType>("Pie Chart");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Income & Expenses Chart */}
      <Card className="border border-gray-700 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold ">
            Income & Expenses
          </CardTitle>
          <Select
            value={transactionChartType}
            onValueChange={(v) => setTransactionChartType(v as TransactionChartType)}
          >
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bar Chart">Bar Chart</SelectItem>
              <SelectItem value="Line Chart">Line Chart</SelectItem>
              <SelectItem value="Area Chart">Area Chart</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <IncomeExpenseChart chartType={transactionChartType} data={monthlyData} />
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <Card className="border border-gray-700 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold ">
            Expense Breakdown
          </CardTitle>
          <Select
            value={expenseChartType}
            onValueChange={(v) => setExpenseChartType(v as ExpenseChartType)}
          >
            <SelectTrigger className="w-[120px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pie Chart">Pie Chart</SelectItem>
              <SelectItem value="Bar Chart">Bar Chart</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
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