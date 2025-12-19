"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FileMinus2 } from "lucide-react";
import { newIncome } from "@/app/action/Dashboard-actions"; // replace later with newExpense action
import { ExpenseFormData } from "@/types/transaction.Types";
import { ExpenseformSchema } from "@/validation/transactionValidation";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Calendar22 } from "@/components/ui/DatePicker";
import { CategoryTypes } from "@/generated/prisma";
import { expenseCategories } from "@/utils/enum/index";

export default function NewExpense() {
 const suggestCategory = (description: string): CategoryTypes => {
  const lowerDescription = description.toLowerCase();
  let bestMatch: { category: CategoryTypes; score: number } = {
    category: CategoryTypes.Other,
    score: 0,
  };

  for (const category of expenseCategories) {
    let categoryScore = 0;
    for (const keyword of category.keywords) {
      const keywordLower = keyword.toLowerCase();
      if (lowerDescription.includes(keywordLower)) {
        // Calculate score based on keyword length
        const keywordScore = keywordLower.length ** 2; // Square the length to give more weight to longer matches
        categoryScore += keywordScore;
      }
    }

    if (categoryScore > bestMatch.score) {
      bestMatch = {
        category: category.name as CategoryTypes,
        score: categoryScore,
      };
    }
  }

  return bestMatch.category;
};

  const [open, setOpen] = useState(false);
  const [suggestedCategory, setSuggestedCategory] = useState<CategoryTypes>(
    CategoryTypes.Other
  );

  const expenseForm = useForm<ExpenseFormData>({
    resolver: zodResolver(ExpenseformSchema),
    defaultValues: {
      amount: "",
      description: "",
      category: CategoryTypes.Other,
      transactionDate: new Date(),
    },
  });

  // Auto category suggestion
  const desc = expenseForm.watch("description");

  useEffect(() => {
    if (desc) {
      const suggested = suggestCategory(desc);
      setSuggestedCategory(suggested);
      expenseForm.setValue("category", suggested, { shouldValidate: true });
    } else {
      setSuggestedCategory(CategoryTypes.Other);
      expenseForm.setValue("category", CategoryTypes.Other, {
        shouldValidate: true,
      });
    }
  }, [desc, expenseForm]);

  const handleExpenseSubmit = async (data: ExpenseFormData) => {
    const toastId = toast.loading("Adding expense...");
    try {
      const response = await newIncome(data); // Change to newExpense function later

      if (response !== "success") throw new Error(response);

      toast.success("Expense added successfully", {
        id: toastId,
        richColors: true,
        icon: "💸",
      });

      setOpen(false);
      expenseForm.reset();
    } catch (error) {
      toast.error("Failed to add expense", {
        id: toastId,
        richColors: true,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto flex items-center justify-center text-[12px]">
          <FileMinus2 className="w-3.5 h-3.5 mr-1" />
          Add expense
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[86vw] sm:w-[350px] md:w-[390px] max-h-[84vh] overflow-y-auto rounded-md border p-4">
        <DialogHeader>
          <DialogTitle className="text-[14px] sm:text-[15px]">
            Create a new <span className="text-blue-500">expense</span>{" "}
            transaction
          </DialogTitle>
        </DialogHeader>

        <Form {...expenseForm}>
          <form
            onSubmit={expenseForm.handleSubmit(handleExpenseSubmit)}
            className="space-y-3 mt-3"
          >
            {/* Amount */}
            <FormField
              control={expenseForm.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px]">Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      className="h-8 text-[12px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={expenseForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px]">
                    Description (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter description"
                      className="h-8 text-[12px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={expenseForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px]">Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="h-8 text-[12px] w-full border rounded-md bg-white px-2"
                    >
                      {expenseCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                          {c.id === suggestedCategory && " (Suggested)"}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={expenseForm.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px]">Date</FormLabel>
                  <FormControl>
                    <Calendar22
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full cursor-pointer"
                      disabled={(d) =>
                        d > new Date() || d < new Date("1900-01-01")
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="w-full sm:w-auto border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                variant="outline"
              >
                Add new expense
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
