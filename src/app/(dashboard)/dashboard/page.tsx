"use client";
import { CalendarForm } from "@/components/calendar-02";
import Calendar05 from "@/components/calendar-05";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scale, TrendingDown, TrendingUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

const monthlyData = [
  { month: "Apr 2025", income: 5000, expenses: 3000 },
  { month: "May 2025", income: 8000, expenses: 4000 },
  { month: "Jun 2025", income: 0, expenses: 5000 },
  { month: "Sep 2025", income: 50000, expenses: 120000 },
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

const dailyBarData = [
  { month: "Apr 2025", income: 500, expenses: 300 },
  { month: "May 2025", income: 800, expenses: 400 },
  { month: "Jun 2025", income: 0, expenses: 500 },
  { month: "Sep 2025", income: 5000, expenses: 12000 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "#22c55e",
  },
  expenses: {
    label: "Expenses",
    color: "#ef4444",
  },
};

const expenseConfig = {
  food: {
    label: "Food",
    color: "#3b82f6",
  },
  shopping: {
    label: "Shopping",
    color: "#ef4444",
  },
  grocery: {
    label: "Grocery",
    color: "#eab308",
  },
  other: {
    label: "Other",
    color: "#06b6d4",
  },
};

const expenseCategories = [
  {
    id: "food",
    name: "Food",
    icon: "🍕",
    keywords: [
      "food",
      "restaurant",
      "eat",
      "meal",
      "lunch",
      "dinner",
      "breakfast",
      "cafe",
      "pizza",
      "burger",
      "pav bhaji",
      "Dosa",
      "vada pav",
      "snack",
      "drink",
    ],
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "🛍️",
    keywords: [
      "shopping",
      "clothes",
      "fashion",
      "mall",
      "store",
      "buy",
      "purchase",
      "shirt",
      "shoes",
      "bag",
    ],
  },
  {
    id: "grocery",
    name: "Grocery",
    icon: "🛒",
    keywords: [
      "grocery",
      "supermarket",
      "vegetables",
      "fruits",
      "milk",
      "bread",
      "rice",
      "dal",
      "oil",
      "market",
    ],
  },
  {
    id: "transportation",
    name: "Transportation",
    icon: "🚗",
    keywords: [
      "uber",
      "ola",
      "taxi",
      "bus",
      "train",
      "metro",
      "fuel",
      "petrol",
      "diesel",
      "auto",
      "rickshaw",
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎬",
    keywords: [
      "movie",
      "cinema",
      "game",
      "party",
      "club",
      "bar",
      "music",
      "concert",
      "show",
      "netflix",
    ],
  },
  {
    id: "bills",
    name: "Bills",
    icon: "📄",
    keywords: [
      "electricity",
      "water",
      "gas",
      "internet",
      "mobile",
      "phone",
      "wifi",
      "bill",
      "recharge",
      "subscription",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "🏥",
    keywords: [
      "doctor",
      "medicine",
      "hospital",
      "clinic",
      "pharmacy",
      "medical",
      "health",
      "checkup",
      "treatment",
    ],
  },
  {
    id: "emi",
    name: "EMI",
    icon: "💳",
    keywords: [
      "emi",
      "loan",
      "credit",
      "installment",
      "mortgage",
      "bank",
      "payment",
      "finance",
    ],
  },
  { id: "other", name: "Other", icon: "💸", keywords: [] },
];

export default function Dashboardpage() {
  const [transactionChartType, setTransactionChartType] = useState("Bar Chart");
  const [expenseChartType, setExpenseChartType] = useState("Pie Chart");
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  // Form states
  const [incomeForm, setIncomeForm] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [expenseForm, setExpenseForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Auto-select category based on description
  const suggestCategory = (description: string) => {
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
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = ""; // restore scroll
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [expenseForm.description, showIncomeModal, showExpenseModal]);

  const handleIncomeSubmit = () => {
    console.log("Income transaction:", incomeForm);
    setIncomeForm({
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setShowIncomeModal(false);
  };

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

  const renderTransactionChart = () => {
    const data =
      transactionChartType === "Daily Bar" ? dailyBarData : monthlyData;

    switch (transactionChartType) {
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
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", r: 4 }}
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
                stroke="#ef4444"
                fill="#ef4444"
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
              <Bar dataKey="expenses" fill="#ef4444" />
            </BarChart>
          </ChartContainer>
        );
    }
  };

  const renderExpenseChart = () => {
    if (expenseChartType === "Bar Chart") {
      return (
        <ChartContainer config={expenseConfig}>
          <BarChart data={expenseBarData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="category" className="stroke-muted-foreground" />
            <YAxis className="stroke-muted-foreground" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {expenseBarData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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
            data={expenseData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    );
  };

  return (
    <div className="min-h-screen bg-background ">
      <section className="px-4 sm:px-8 lg:mx-[10%] py-8">
        {/* Welcome Section */}
        <div>
          <h1 className="font-bold text-2xl text-foreground">
            Welcome Back, <span className="text-green-600">Boss 👋</span>
          </h1>
          <p className="font-semibold mt-2 text-muted-foreground">
            Here&apos;s Your Financial Overview
          </p>
        </div>

        {/* Calendar + Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-6">
          {/* Calendar full width on mobile */}
          <div className="w-full lg:w-auto">
            <Calendar05 />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:ml-auto">
            <Button
              onClick={() => setShowIncomeModal(true)}
              className="bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto flex items-center justify-center"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Add income
            </Button>
            <Button
              onClick={() => setShowExpenseModal(true)}
              className="bg-red-500 text-white hover:bg-red-600 w-full sm:w-auto flex items-center justify-center"
            >
              <TrendingDown className="w-5 h-5 mr-2" />
              Add expense
            </Button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {/* Income Card */}
          <Card className="w-full h-25 shadow-lg rounded-2xl border border-border">
            <CardContent className="flex items-center px-6 ">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Income</p>
                  <h1 className="text-xl font-bold text-green-600">₹ 42,000</h1>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expense Card */}
          <Card className="w-full h-25 shadow-lg rounded-2xl border border-border">
            <CardContent className="flex items-center px-6 ">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expense</p>
                  <h1 className="text-xl font-bold text-red-600">₹ 33,000</h1>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Balance Card */}
          <Card className="w-full h-25 shadow-lg rounded-2xl border border-border">
            <CardContent className="flex items-center px-6 ">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <h1 className="text-xl font-bold text-blue-600">₹ 9,000</h1>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Monthly Transactions Chart */}
          <Card className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">
                Monthly Transactions
              </CardTitle>
              <Select
                value={transactionChartType}
                onValueChange={setTransactionChartType}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bar Chart">Bar Chart</SelectItem>
                  <SelectItem value="Daily Bar">Daily Bar</SelectItem>
                  <SelectItem value="Line Chart">Line Chart</SelectItem>
                  <SelectItem value="Area Chart">Area Chart</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">{renderTransactionChart()}</div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-sm text-muted-foreground">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-sm text-muted-foreground">
                    Expenses
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expense Breakdown Chart */}
          <Card className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">
                Expense Breakdown
              </CardTitle>
              <Select
                value={expenseChartType}
                onValueChange={setExpenseChartType}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pie Chart">Pie Chart</SelectItem>
                  <SelectItem value="Bar Chart">Bar Chart</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">{renderExpenseChart()}</div>
              <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    Shopping
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Food</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Grocery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Other</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Income Modal */}
      {showIncomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center  justify-center z-50 p-4">
          <Card className="w-full max-w-md border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-xl text-foreground">
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
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={incomeForm.amount}
                  onChange={(e) =>
                    setIncomeForm({ ...incomeForm, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
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
                  className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <CalendarForm />
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
          <Card className="w-full max-w-md border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-xl text-foreground">
                Create a new <span className="text-red-500">expense</span>{" "}
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
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={expenseForm.amount}
                  onChange={(e) =>
                    setExpenseForm({ ...expenseForm, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
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
                  className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
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
                <CalendarForm />
              </div>

              <Button
                onClick={handleExpenseSubmit}
                className="w-full bg-red-500 hover:bg-red-600 text-white mt-6"
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
