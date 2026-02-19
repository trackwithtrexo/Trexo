"use client";
import {
  ArrowRight,
  BarChart3,
  FileText,
  Github,
  HelpCircle,
  History,
  Linkedin,
  PlusCircle,
  Tag,
  Target,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Darkmode from "../components/darkmode";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const developers = [
    {
      name: "Harmin Kalathiya",
      role: "Full Stack Developer",

      description:
        "Expert in Next.js, React.js and Node.js development. Focuses on creating scalable database solutions and responsive web applications.",
      social: {
        github: "https://github.com/harminK",
        linkedin: "https://www.linkedin.com/in/harmin-kalathiya-03058a297",
      },
    },
    {
      name: "Devansh Dholiya",
      role: "Frontend Developer",

      description:
        "Expert in React.js, Next.js, Tailwind CSS, and API integrations. Focused on crafting seamless user experiences, responsive layouts, and efficient web applications.",
      social: {
        github: "https://www.linkedin.com/in/devansh-dholiya-274017249/",
        linkedin: "https://github.com/DevanshDholiya",
      },
    },
  ];

  const features = [
    {
      icon: <PlusCircle className="w-8 h-8" />,
      title: "Add Income & Expense",
      description:
        "Quickly log your daily transactions with smart categorization and receipt scanning.",
      color: "text-blue-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Monthly Budget Setting",
      description:
        "Set realistic budgets and get alerts when you're close to spending limits.",
      color: "text-green-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Trip Expense Sharing",
      description:
        "Split bills with friends and track who owes what during group activities.",
      color: "text-purple-500",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "PDF Report Generation",
      description:
        "Generate detailed financial reports perfect for tax filing and analysis.",
      color: "text-orange-500",
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Person-to-Person Tracking",
      description:
        "Keep track of money lent to friends and borrowed from family members.",
      color: "text-pink-500",
    },
    {
      icon: <Tag className="w-8 h-8" />,
      title: "Automatic Categorization",
      description:
        "AI-powered smart categorization that learns from your spending patterns.",
      color: "text-cyan-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Charts & Analytics",
      description:
        "Beautiful visualizations to understand your spending trends and patterns.",
      color: "text-indigo-500",
    },
    {
      icon: <History className="w-8 h-8" />,
      title: "Transaction History",
      description:
        "Complete transaction history with powerful search and filtering options.",
      color: "text-red-500",
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* HEADER */}
      <header className="w-full flex flex-wrap items-center justify-between h-auto min-h-20 border-b px-4 sm:px-6 lg:px-[15%] py-3 gap-3">

  {/* Logo Section */}
  <div className="flex items-center gap-2">
    <Image 
      src="/Logo.png" 
      alt="Logo" 
      width={45} 
      height={20} 
      className="sm:w-[55px]"
    />
    <h1 className="text-2xl sm:text-3xl font-semibold whitespace-nowrap">
      Trex<span className="text-green-500">o</span>
    </h1>
  </div>

  {/* Right Section */}
  <div className="flex items-center gap-3 ml-auto">
    <Darkmode />

    <Button
      onClick={() => router.push("/auth/signup")}
      className="bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/40 flex items-center gap-2"
    >
      <span className="hidden sm:inline">Get Started Now</span>
      <span className="sm:hidden">Start</span>
      <ArrowRight size={18} />
    </Button>
  </div>
</header>


      {/* HERO */}
      <section className="w-full py-20 flex flex-col lg:flex-row items-center justify-center lg:px-[15%] gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <h1 className="text-5xl font-bold leading-tight">
            Track Expenses <br />
            <span className="text-green-500"> Smarter Than Ever</span>
          </h1>
          <p className="text-xl mt-6 text-gray-600 dark:text-gray-300">
            &ldquo;From chai to EMI — track it all with intelligent automation
            and beautiful insights.&rdquo;
          </p>
          <Button
            className="bg-green-500 hover:bg-green-500 hover:scale-105 hover:shadow-lg hover:shadow-green-800 text-white flex cursor-pointer items-center gap-2 mt-10"
            onClick={() => router.push("/auth/signup")}
          >
            Get Started Now
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hover:scale-105 transition-all"
        >
          <Image
            src={"/finance-app-1-67.svg"}
            alt="Illustration"
            width={600}
            height={400}
          />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="w-full min-h-screen flex items-center py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-4 py-2">
              Powerful Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Everything You Need for{" "}
              <span className="block text-green-500">
                Smart Financial Management
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-50 hover:shadow-xl transition-all transform hover:-translate-y-2">
                  <CardContent className="p-6 space-y-4">
                    <div className={`${feature.color} flex gap-2 items-center`}>
                      {feature.icon}
                      <h3 className="text-lg font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="w-full py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-4 py-2">
            What People Say
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4">
            Trusted by{" "}
            <span className="text-green-500">Thousands of Users</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                name: "Keval Jasani",
                review:
                  "This app completely changed the way I manage my expenses. Simple, powerful, and reliable!",
              },
              {
                name: "Abhi Kakadiya",
                review:
                  "I love the group trip feature. No more awkward calculations — it does everything for us.",
              },
              {
                name: "Ayush Kalathiya",
                review:
                  "The PDF report generation is a life-saver during tax season. Highly recommend Trexo!",
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Card className="p-6 shadow-md hover:shadow-xl transition">
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <h4 className="mt-4 font-semibold text-green-500">
                    {review.name}
                  </h4>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-4 py-2">
              FAQ
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">
              Frequently Asked <span className="text-green-500">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Is Trexo free to use?",
                a: "Yes! Trexo is completely free with all essential features available.",
              },
              {
                q: "Can I generate PDF reports?",
                a: "Absolutely! You can download detailed PDF reports for your expenses at any time.",
              },
              {
                q: "Does it work for group trips?",
                a: "Yes, Trexo makes it super easy to split bills and track who owes what during group trips.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-6 shadow-md hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-500" />
                    {item.q}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {item.a}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPERS */}
      <section
        id="developers"
        className="w-full min-h-screen flex items-center py-20"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 px-4 py-2">
            Meet the Team
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4">
            Built by Passionate{" "}
            <span className="block text-green-500">Developers</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-3xl mx-auto">
            {developers.map((dev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Card className="overflow-hidden h-100 hover:shadow-2xl transition">
                  <CardContent className="p-0">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-center">
                        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-500 font-bold text-2xl text-white">
                          {dev.name[0]}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold">{dev.name}</h3>
                      <p className="text-green-500 font-semibold">{dev.role}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {dev.description}
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => window.open(dev.social.github)}
                        >
                          <Github className="w-4 h-4 mr-2" /> GitHub
                        </Button>
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          size="sm"
                          onClick={() => window.open(dev.social.linkedin)}
                        >
                          <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="w-full py-16 flex items-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Card className="shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl lg:text-4xl font-bold">
                Start Tracking Your{" "}
                <span className="block text-green-500">Expenses Today</span>
              </h2>
              <p className="text-md text-gray-600 ">
                Join thousands of users who transformed their financial habits.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-green-500 text-lg px-8 py-4 hover:scale-105 cursor-pointer hover:shadow-lg hover:bg-green-500 hover:shadow-green-800 text-white"
                  onClick={() => router.push("/auth/signup")}
                >
                  <Zap className="mr-2" /> Get Started Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 cursor-pointer hover:scale-105"
                  onClick={() => router.push("/auth/signin")}
                >
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
