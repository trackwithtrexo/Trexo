"use client";
import Calendar05 from "@/components/calendar-05";
import NewIncome from "@/components/Newincome";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IncomeExpenseChart from '@/components/income_and_expense_chart';
import ExpenseBreakdownChart from "@/components/ExpenseBreakdownChart";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Scale, TrendingDown, TrendingUp, X } from "lucide-react";
import { useEffect, useState } from "react";

const monthlyData = [
  { month: "Apr", income: 5000, expenses: 3000 },
  { month: "May", income: 8000, expenses: 4000 },
  { month: "Jun", income: 0, expenses: 5000 },
  { month: "Sep", income: 50000, expenses: 12000 },
];

const expenseData = [
  { name: "Food", value: 100000, color: "#3b82f6" },
  { name: "Shopping", value: 20000, color: "#ef4444" },
  { name: "Grocery", value: 5000, color: "#eab308" },
  { name: "Other", value: 8000, color: "#06b6d4" },
];

const expenseBarData = [
  { category: "Shopping", amount: 20000, color: "#ef4444" },
  { category: "Food", amount: 100000, color: "#3b82f6" },
  { category: "Grocery", amount: 5000, color: "#eab308" },
  { category: "Other", amount: 8000, color: "#06b6d4" },
];

const expenseCategories = [
  { id: "food", name: "Food", icon: "🍔", keywords: ["food", "restaurant", "meal"] },
  { id: "shopping", name: "Shopping", icon: "🛍️", keywords: ["shop", "buy", "store"] },
  { id: "grocery", name: "Grocery", icon: "🛒", keywords: ["grocery", "supermarket"] },
  { id: "transport", name: "Transport", icon: "🚗", keywords: ["transport", "taxi", "bus"] },
  { id: "bills", name: "Bills", icon: "💡", keywords: ["bill", "utility", "electric"] },
  { id: "entertainment", name: "Entertainment", icon: "🎬", keywords: ["movie", "game", "fun"] },
  { id: "health", name: "Health", icon: "⚕️", keywords: ["health", "doctor", "medical"] },
  { id: "other", name: "Other", icon: "📦", keywords: [] },
];


export default function Dashboard() {
  const [transactionChartType, setTransactionChartType] = useState("Bar Chart");
  const [expenseChartType, setExpenseChartType] = useState("Pie Chart");
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [expenseForm, setExpenseForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Auto-select category based on description
  const suggestCategory = (description : string) => {
    const lowerDesc = description.toLowerCase();

    for (const category of expenseCategories) {
      if (category.keywords.some((keyword) => lowerDesc.includes(keyword))) {
        return category.id;
      }
    }
    return "other";
  };

  useEffect(() => {
    if (expenseForm.description) {
      const suggestedCategory = suggestCategory(expenseForm.description);
      setExpenseForm((prev) => ({ ...prev, category: suggestedCategory }));
    }
    if (showIncomeModal || showExpenseModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [expenseForm.description, showExpenseModal]);

  const handleExpenseSubmit = () => {
    console.log("Expense transaction:", expenseForm);
    setExpenseForm({
      amount: "",
      description: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
    setShowExpenseModal(false);
  };



  return (
    <div className="min-h-screen ">
      <section className="px-4 sm:px-8 lg:px-12 xl:px-20 py-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            {/* Date Range Card */}
            <Card className="border border-gray-700 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold  mb-4">Date Range</h3>
                
                  <Calendar05/>
                
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => setShowIncomeModal(true)}
                className="w-full bg-green-500 hover:bg-green-600 text-white shadow-lg h-12 rounded-xl flex items-center justify-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                Add Income
              </Button>
              <Button
                onClick={() => setShowExpenseModal(true)}
                className="w-full bg-red-500 hover:bg-blue-600 text-white shadow-lg h-12 rounded-xl flex items-center justify-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4" />
                </div>
                Add Expense
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Income Card */}
              <Card className="border border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm font-medium ">Income</p>
                  </div>
                  <h2 className="text-3xl font-bold text-green-600">₹42,000</h2>
                </CardContent>
              </Card>

              {/* Expense Card */}
              <Card className="border border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-sm font-medium ">Expense</p>
                  </div>
                  <h2 className="text-3xl font-bold text-red-600">₹33,000</h2>
                </CardContent>
              </Card>

              {/* Remaining Card */}
              <Card className="border border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Scale className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm font-medium ">Remaining</p>
                  </div>
                  <h2 className="text-3xl font-bold text-blue-600">₹9,000</h2>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Income & Expenses Chart */}
              <Card className="border border-gray-700 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg font-semibold ">
                    Income & Expenses
                  </CardTitle>
                  <Select
                    value={transactionChartType}
                    onValueChange={setTransactionChartType}
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
                    <IncomeExpenseChart
                      chartType={transactionChartType}
                      data={monthlyData}
                    />
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
                    onValueChange={setExpenseChartType}
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
          </div>
        </div>
      </section>

      {/* Income Modal */}
      {showIncomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-xl text-gray-900">
                Create a new <span className="text-green-500">income</span>{" "}
                transaction
              </CardTitle>
              <Button
                onClick={() => setShowIncomeModal(false)}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={incomeForm.amount}
                  onChange={(e) =>
                    setIncomeForm({ ...incomeForm, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Description (Optional)
                </label>
                <Input
                  type="text"
                  placeholder="Enter description"
                  value={incomeForm.description}
                  onChange={(e) =>
                    setIncomeForm({
                      ...incomeForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Date
                </label>
                <Input
                  type="date"
                  value={incomeForm.date}
                  onChange={(e) =>
                    setIncomeForm({ ...incomeForm, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <Button
                onClick={handleIncomeSubmit}
                className="w-full bg-green-500 hover:bg-green-600 text-white mt-6"
              >
                Add new income
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-xl text-gray-900">
                Create a new <span className="text-blue-500">expense</span>{" "}
                transaction
              </CardTitle>
              <Button
                onClick={() => setShowExpenseModal(false)}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={expenseForm.amount}
                  onChange={(e) =>
                    setExpenseForm({ ...expenseForm, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Description (Optional)
                </label>
                <Input
                  type="text"
                  placeholder="Enter description"
                  value={expenseForm.description}
                  onChange={(e) =>
                    setExpenseForm({
                      ...expenseForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Category
                </label>
                <Select
                  value={expenseForm.category}
                  onValueChange={(value) =>
                    setExpenseForm({ ...expenseForm, category: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                          {expenseForm.description &&
                            suggestCategory(expenseForm.description) ===
                              category.id && (
                              <span className="text-xs text-green-500">
                                (Suggested)
                              </span>
                            )}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">
                  Date
                </label>
                <Input
                  type="date"
                  value={expenseForm.date}
                  onChange={(e) =>
                    setExpenseForm({ ...expenseForm, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                onClick={handleExpenseSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-6"
              >
                Add new Expense
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}