"use client"
import { useState } from 'react';
import { Plus, Minus, User, Home, BarChart3, Calendar, Settings, CreditCard, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function TrexoDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Sample data
  const financialOverview = {
    balance: 12450.75,
    income: 8500.00,
    expenses: 6720.25
  };

  const expenseCategories = [
    { name: 'Food & Restaurants', amount: 1245.50, color: '#FF6B9D', icon: '🍽️' },
    { name: 'Transportation', amount: 890.25, color: '#4DABF7', icon: '🚗' },
    { name: 'Entertainment', amount: 650.75, color: '#69DB7C', icon: '🎬' },
    { name: 'Shopping', amount: 1180.30, color: '#FFD43B', icon: '🛍️' },
    { name: 'Bills & Utilities', amount: 1520.45, color: '#9775FA', icon: '⚡' },
    { name: 'Healthcare', amount: 433.00, color: '#FF8787', icon: '🏥' },
    { name: 'Travel', amount: 800.00, color: '#74C0FC', icon: '✈️' }
  ];

  const weeklySpending = [
    { week: 'Week 1', amount: 1680 },
    { week: 'Week 2', amount: 1420 },
    { week: 'Week 3', amount: 1890 },
    { week: 'Week 4', amount: 1730 }
  ];

  const maxWeeklySpending = Math.max(...weeklySpending.map(w => w.amount));

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Trexo</h1>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {[
            { icon: Home, label: 'Dashboard', active: true },
            { icon: BarChart3, label: 'Analytics' },
            { icon: Calendar, label: 'Budget' },
            { icon: CreditCard, label: 'Transactions' },
            { icon: Settings, label: 'Settings' }
          ].map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                item.active 
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome Back, <span className="text-violet-400">Alex</span> 👋
            </h2>
            <p className="text-slate-400">Here's your financial overview for today</p>
          </div>
          
          {/* Profile & Period Selector */}
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-violet-500/25 transition-all">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-violet-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-violet-400" />
              </div>
              <span className="text-sm text-slate-400 font-medium">Total Balance</span>
            </div>
            <p className="text-3xl font-bold text-white mb-2">₹{financialOverview.balance.toLocaleString()}</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">+12.5% from last month</span>
            </div>
          </div>

          {/* Income */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-green-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-sm text-slate-400 font-medium">Total Income</span>
            </div>
            <p className="text-3xl font-bold text-white mb-2">₹{financialOverview.income.toLocaleString()}</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">+8.2% increase</span>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-red-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-sm text-slate-400 font-medium">Total Expenses</span>
            </div>
            <p className="text-3xl font-bold text-white mb-2">₹{financialOverview.expenses.toLocaleString()}</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-400">-3.1% from last month</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl px-8 py-4 transition-all hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105">
            <Plus className="w-5 h-5 text-white" />
            <span className="font-semibold text-white">Add Income</span>
          </button>
          
          <button className="flex items-center space-x-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 rounded-xl px-8 py-4 transition-all hover:shadow-lg hover:shadow-red-500/25 transform hover:scale-105">
            <Minus className="w-5 h-5 text-white" />
            <span className="font-semibold text-white">Add Expense</span>
          </button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Spending Chart */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Weekly Spending</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-violet-400 rounded-full"></div>
                <span className="text-sm text-slate-400">Expenses</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {weeklySpending.map((week, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">{week.week}</span>
                    <span className="text-white font-semibold">₹{week.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-violet-500/30"
                      style={{ width: `${(week.amount / maxWeeklySpending) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Categories */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Expense Categories</h3>
              <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">View All</button>
            </div>
            
            <div className="space-y-3">
              {expenseCategories.slice(0, 6).map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-all group">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <p className="text-slate-200 font-medium group-hover:text-white transition-colors">{category.name}</p>
                      <div className="w-16 bg-slate-700 rounded-full h-1.5 mt-1">
                        <div 
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{ 
                            backgroundColor: category.color,
                            width: `${(category.amount / Math.max(...expenseCategories.map(c => c.amount))) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">₹{category.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">{((category.amount / financialOverview.expenses) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Spending Trends */}
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Spending Trends</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-slate-400">Income</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-slate-400">Expenses</span>
                </div>
              </div>
            </div>

            {/* Custom Area Chart */}
            <div className="relative h-48">
              <svg className="w-full h-full" viewBox="0 0 500 200">
                {/* Grid lines */}
                {[...Array(6)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1={30 + i * 28}
                    x2="450"
                    y2={30 + i * 28}
                    stroke="#374151"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                ))}
                
                {/* Income area */}
                <path
                  d="M50 50 L150 40 L250 35 L350 45 L450 38 L450 170 L50 170 Z"
                  fill="url(#incomeGradient)"
                  opacity="0.3"
                />
                
                {/* Expense area */}
                <path
                  d="M50 80 L150 75 L250 85 L350 70 L450 72 L450 170 L50 170 Z"
                  fill="url(#expenseGradient)"
                  opacity="0.3"
                />
                
                {/* Income line */}
                <polyline
                  points="50,50 150,40 250,35 350,45 450,38"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  className="drop-shadow-lg"
                />
                
                {/* Expense line */}
                <polyline
                  points="50,80 150,75 250,85 350,70 450,72"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                  className="drop-shadow-lg"
                />

                {/* Data points */}
                {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, index) => (
                  <g key={index}>
                    <circle
                      cx={50 + index * 100}
                      cy={50 - index * 2.5}
                      r="4"
                      fill="#10B981"
                      className="drop-shadow-lg"
                    />
                    <circle
                      cx={50 + index * 100}
                      cy={80 - index * 1.5}
                      r="4"
                      fill="#EF4444"
                      className="drop-shadow-lg"
                    />
                    <text
                      x={50 + index * 100}
                      y={190}
                      textAnchor="middle"
                      className="text-xs fill-slate-400"
                    >
                      {month}
                    </text>
                  </g>
                ))}

                {/* Gradients */}
                <defs>
                  <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            {/* Savings Goal */}
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Savings Goal</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Target: ₹15,000</span>
                  <span className="text-white font-semibold">83%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full shadow-lg shadow-violet-500/30" 
                       style={{ width: '83%' }}></div>
                </div>
                <p className="text-sm text-slate-400">₹2,550 remaining</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {[
                  { type: 'expense', desc: 'Coffee Shop', amount: 125, time: '2h ago', category: 'Food' },
                  { type: 'income', desc: 'Freelance Payment', amount: 2500, time: '1d ago', category: 'Work' },
                  { type: 'expense', desc: 'Uber Ride', amount: 180, time: '2d ago', category: 'Transport' }
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/20 rounded-lg hover:bg-slate-800/40 transition-all">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {transaction.type === 'income' ? 
                          <Plus className="w-4 h-4 text-green-400" /> : 
                          <Minus className="w-4 h-4 text-red-400" />
                        }
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{transaction.desc}</p>
                        <p className="text-xs text-slate-400">{transaction.time}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-semibold ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}