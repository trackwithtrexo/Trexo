"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  History,
  PlusCircle,
  Tag,
  Target,
  UserCheck,
  Users,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  colorClass: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    icon: <PlusCircle className="h-7 w-7" />,
    title: "Add Income & Expense",
    description:
      "Quickly log daily transactions with clean categorization and faster tracking.",
    colorClass: "text-blue-500",
  },
  {
    icon: <Target className="h-7 w-7" />,
    title: "Monthly Budget Setting",
    description:
      "Set realistic monthly limits and stay on top of every spending category.",
    colorClass: "text-green-500",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Group Expense Sharing",
    description:
      "Split bills with friends and keep balances crystal clear on every trip.",
    colorClass: "text-violet-500",
  },
  {
    icon: <FileText className="h-7 w-7" />,
    title: "PDF Reports",
    description:
      "Generate polished reports to review your financial activity whenever needed.",
    colorClass: "text-orange-500",
  },
  {
    icon: <UserCheck className="h-7 w-7" />,
    title: "Person Tracking",
    description:
      "Track lent and borrowed money person-wise without missing repayments.",
    colorClass: "text-pink-500",
  },
  {
    icon: <Tag className="h-7 w-7" />,
    title: "Smart Categories",
    description:
      "Organize transactions in meaningful categories for cleaner monthly insights.",
    colorClass: "text-cyan-500",
  },
  {
    icon: <BarChart3 className="h-7 w-7" />,
    title: "Charts & Analytics",
    description:
      "Understand your cash flow with simple visual trends and useful breakdowns.",
    colorClass: "text-indigo-500",
  },
  {
    icon: <History className="h-7 w-7" />,
    title: "History",
    description:
      "Browse complete history with quick search and timeline-friendly records.",
    colorClass: "text-red-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="w-full py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 space-y-4 text-center sm:mb-14">
          <p className="inline-flex rounded-full    px-4 py-1.5 text-xs font-semibold tracking-wide bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Powerful Features
          </p>
          <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Everything You Need for
            <span className="block text-green-500">
              Smart Financial Management
            </span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group rounded-xl border border-border/70 bg-card/60 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div
                className={`mb-3 flex items-center gap-2.5 ${feature.colorClass}`}
              >
                {feature.icon}
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
