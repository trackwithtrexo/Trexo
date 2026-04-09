"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

type FaqItem = {
  q: string;
  a: string;
};

const faqItems: FaqItem[] = [
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
];

export default function FAQ() {
  return (
    <section id="faq" className="w-full py-20">
      <div className="mx-auto w-full max-w-7xl text-center">
        <div className="mb-12">
          <p className="inline-flex rounded-full  px-4 py-1.5 text-xs font-semibold tracking-wide bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-bold lg:text-5xl">
            Frequently Asked <span className="text-green-500">Questions</span>
          </h2>
        </div>

        <div className="space-y-6 text-left">
          {faqItems.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border/70 bg-card/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <HelpCircle className="h-5 w-5 text-green-500" />
                {item.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
