"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  PlusCircle,
  Receipt,
  Wallet,
} from "lucide-react";

type Txn = {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string; // ISO string
};

const mockStats = [
  { label: "Total Balance", value: "₹45,320", icon: Wallet },
  { label: "This Month Spent", value: "₹12,450", icon: ArrowDownRight },
  { label: "This Month Income", value: "₹18,900", icon: ArrowUpRight },
  { label: "Savings", value: "₹6,450", icon: Receipt },
];

const mockTxns: Txn[] = [
  {
    id: "1",
    title: "Groceries",
    category: "Food",
    amount: 1450,
    type: "expense",
    date: "2025-08-25",
  },
  {
    id: "2",
    title: "Salary",
    category: "Income",
    amount: 18000,
    type: "income",
    date: "2025-08-24",
  },
  {
    id: "3",
    title: "Electricity Bill",
    category: "Utilities",
    amount: 2200,
    type: "expense",
    date: "2025-08-23",
  },
  {
    id: "4",
    title: "Coffee",
    category: "Food",
    amount: 180,
    type: "expense",
    date: "2025-08-22",
  },
];

export default function DashboardPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-400">
              Overview of your spending and recent activity
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-green-500 hover:bg-green-600 text-black">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-200 hover:text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mockStats.map((s) => (
            <Card key={s.label} className="bg-gray-900/70 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {s.label}
                </CardTitle>
                <s.icon className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{s.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-gray-900/70 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {mockTxns.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-800">
                  <p className="text-gray-400 text-sm">No transactions yet</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-800">
                  {mockTxns.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center justify-between py-3"
                    >
                      <div>
                        <p className="font-medium">{t.title}</p>
                        <p className="text-xs text-gray-400">
                          {t.category} • {new Date(t.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div
                        className={`font-semibold ${
                          t.type === "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {t.type === "income" ? "+" : "-"}₹
                        {t.amount.toLocaleString("en-IN")}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Budget/Insights */}
          <Card className="bg-gray-900/70 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start justify-between">
                <span>Food</span>
                <span className="text-gray-400">₹1,630</span>
              </div>
              <div className="flex items-start justify-between">
                <span>Utilities</span>
                <span className="text-gray-400">₹2,200</span>
              </div>
              <div className="flex items-start justify-between">
                <span>Transport</span>
                <span className="text-gray-400">₹890</span>
              </div>
              <div className="pt-2">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-black">
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
