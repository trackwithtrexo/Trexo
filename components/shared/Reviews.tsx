"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Review = {
  name: string;
  review: ReactNode;
};

const reviews: Review[] = [
  {
    name: "Keval Jasani",
    review: (
      <>
        <span className="font-semibold text-green-500">Expense tracking</span>{" "}
        has never been easier. Simple, powerful, and highly reliable!
      </>
    ),
  },
  {
    name: "Abhi Kakadiya",
    review: (
      <>
        <span className="font-semibold text-green-500">
          Group trip splitting
        </span>{" "}
        is now seamless. No more awkward calculations, it does everything for
        us.
      </>
    ),
  },
  {
    name: "Ayush Kalathiya",
    review: (
      <>
        <span className="font-semibold text-green-500">
          PDF report generation
        </span>{" "}
        is an absolute life-saver. I highly recommend Trexo for tax season!
      </>
    ),
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="w-full py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl text-center">
        <p className="inline-flex rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          What People Say
        </p>

        <h2 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Trusted by <span className="text-green-500">Thousands of Users</span>
        </h2>

        <div className="mt-12 grid w-full gap-6 md:grid-cols-3">
          {reviews.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex h-full flex-col rounded-xl border border-border/70 bg-card/60 p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <p className="text-sm italic leading-relaxed text-muted-foreground">
                &ldquo;{item.review}&rdquo;
              </p>
              <h4 className="mt-auto whitespace-nowrap pt-4 text-sm font-semibold text-black dark:text-white">
                {item.name}
              </h4>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
