"use client"
import React, { useState } from 'react';
import { 
  PlusCircle, 
  MinusCircle, 
  RefreshCw, 
  Moon, 
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  RotateCcw
} from 'lucide-react';

interface MonthlyData {
  month: string;
  amount: number;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface StatCard {
  title: string;
  amount: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red';
}

type TabType = 'Dashboard' | 'History' | 'Budget' | 'Group';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Dashboard');
  const [dateRange, setDateRange] = useState<string>('Dec 25, 2024 - Sep 01, 2025');

  const formatCurrency = (amount: number): string => {
    return `₹ ${Math.abs(amount).toLocaleString()}`;
  };

  const getColorClasses = (color: StatCard['color']) => {
    const colorMap = {
      blue: {
        text: 'text-blue-400',
        icon: 'text-blue-400'
      },
      green: {
        text: 'text-green-400',
        icon: 'text-green-400'
      },
      red: {
        text: 'text-red-400',
        icon: 'text-red-400'
      }
    };
    return colorMap[color];
  };

  const handleTabClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  // Sample data with proper typing
  const monthlyData: MonthlyData[] = [
    { month: 'Jan', amount: 0 },
    { month: 'Feb', amount: 0 },
    { month: 'Mar', amount: 0 },
    { month: 'Apr', amount: 0 },
    { month: 'May', amount: 0 },
    { month: 'Jun', amount: 0 },
    { month: 'Jul', amount: 0 },
    { month: 'Aug', amount: 45000 },
    { month: 'Sep', amount: 0 },
    { month: 'Oct', amount: 0 },
    { month: 'Nov', amount: 0 },
    { month: 'Dec', amount: 0 },
  ];

  const maxAmount: number = Math.max(...monthlyData.map(d => d.amount));

  const transactions: Transaction[] = [
    { id: 1, description: 'Grocery Shopping', amount: -2500, category: 'Food', date: '2024-08-15' },
    { id: 2, description: 'Salary', amount: 50000, category: 'Income', date: '2024-08-01' },
    { id: 3, description: 'Restaurant', amount: -1200, category: 'Food', date: '2024-08-10' },
    { id: 4, description: 'Utilities', amount: -3000, category: 'Other', date: '2024-08-05' },
  ];

  const statCards: StatCard[] = [
    {
      title: 'Remaining',
      amount: 0,
      icon: <RotateCcw className="w-5 h-5" />,
      color: 'blue'
    },
    {
      title: 'Income',
      amount: 55,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'green'
    },
    {
      title: 'Expenses',
      amount: 55,
      icon: <TrendingDown className="w-5 h-5" />,
      color: 'red'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800 mx-[10%]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-semibold">
            spend<span className="text-green-400">wise</span>
          </span>
        </div>

        <nav className="flex space-x-8">
          {(['Dashboard', 'History', 'Budget', 'Group'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab 
                  ? 'text-green-400 border-b-2 border-green-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Moon className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center font-semibold">
            D
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 mx-[10%]">
        {/* Page Title and Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400">
              Welcome Back, <span className="text-blue-400">Devansh</span> 👋
            </p>
          </div>

          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
              <PlusCircle className="w-4 h-4" />
              <span>New Income</span>
              <span className="bg-orange-500 text-xs px-2 py-1 rounded-full">!</span>
            </button>
            <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
              <MinusCircle className="w-4 h-4" />
              <span>New Expense</span>
              <span className="bg-red-500 text-xs px-2 py-1 rounded-full">🔒</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>New Recurring</span>
              <span className="bg-yellow-500 text-xs px-2 py-1 rounded-full">🏆</span>
            </button>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">{dateRange}</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => {
            const colors = getColorClasses(card.color);
            return (
              <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`${colors.text} font-medium`}>{card.title}</h3>
                  <div className={colors.icon}>
                    {card.icon}
                  </div>
                </div>
                <div className={`text-3xl font-bold ${colors.text}`}>
                  {formatCurrency(card.amount)}
                </div>
                <div className="text-sm text-gray-400">All time</div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Transactions / Monthly Money Meters */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Transactions</h3>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                Monthly Money Meters
              </button>
            </div>

            {/* Bar Chart */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyData.map((data: MonthlyData, index: number) => (
                <div key={data.month} className="flex flex-col items-center space-y-2">
                  <div 
                    className={`w-8 rounded-t transition-all duration-300 ${
                      data.amount > 0 ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                    style={{
                      height: data.amount > 0 ? `${(data.amount / maxAmount) * 200}px` : '4px'
                    }}
                  ></div>
                  <span className="text-xs text-gray-400">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expenses / Category Crustview */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Expenses</h3>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                Category Crustview
              </button>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-medium">Expense Distribution</h4>
              
              {/* Pie Chart */}
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Food segment (roughly 30%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="20"
                      strokeDasharray="66 214"
                      strokeDashoffset="0"
                      className="transition-all duration-300"
                    />
                    {/* Other segment (roughly 70%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="20"
                      strokeDasharray="154 214"
                      strokeDashoffset="-66"
                      className="transition-all duration-300"
                    />
                  </svg>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-gray-300">Other</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-300">Food</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((transaction: Transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.amount > 0 ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {transaction.amount > 0 ? 
                      <TrendingUp className="w-5 h-5" /> : 
                      <TrendingDown className="w-5 h-5" />
                    }
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-400">{transaction.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatCurrency(transaction.amount)}
                  </div>
                  <div className="text-sm text-gray-400">{transaction.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;