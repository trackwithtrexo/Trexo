"use client";

import { newIncome } from "@/app/action/Dashboard-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseFormData } from "@/types/allTypes";
import { ExpenseformSchema } from "@/validation/transactionValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlignLeft, Calendar as CalendarIcon, FileMinus2, IndianRupee, Plus, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Calendar22 } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";
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
          const keywordScore = keywordLower.length ** 2;
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
      const response = await newIncome(data); 

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
      <Button
       
        className="bg-red-600 hover:bg-red-700 text-white transition-all duration-200 shadow-sm px-4 h-9 rounded-lg flex items-center gap-2 text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Expense
      </Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-[425px] rounded-xl p-0 overflow-hidden bg-card border border-border">
      
      <div className="p-6 pb-0">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight flex items-center gap-2 text-foreground">
            <div className="p-2 rounded-lg bg-muted">
              <FileMinus2 className="w-5 h-5 text-red-600" />
            </div>
            New Transaction
          </DialogTitle>

          <DialogDescription className="text-muted-foreground text-sm mt-1">
            Record a new expense to keep your tracker up to date.
          </DialogDescription>
        </DialogHeader>
      </div>

      <Form {...expenseForm}>
        <form
          onSubmit={expenseForm.handleSubmit(handleExpenseSubmit)}
          className="p-6 space-y-5"
        >
          {/* Amount Field */}
          <FormField
            control={expenseForm.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="h-11 pl-10 text-base focus-visible:ring-red-500"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4">

            {/* Description */}
            <FormField
              control={expenseForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-muted-foreground   uppercase tracking-wider flex items-center gap-1.5">
                    <AlignLeft className="w-3 h-3" />
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What was this for?"
                      className="h-10 text-sm focus-visible:ring-red-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={expenseForm.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Category
                  </FormLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10 w-full text-sm focus:ring-destructive focus-visible:ring-red-500">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {expenseCategories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          <div className="flex items-center gap-2">
                            {c.name}
                            {c.id === suggestedCategory && desc && (
                              <span className="flex items-center gap-1 text-[10px] bg-destructive/10 text-destructive px-2 py-0.5 rounded-full ml-2 animate-pulse font-semibold">
                                <Sparkles className="w-2.5 h-2.5" />
                                AUTO
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={expenseForm.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarIcon className="w-3 h-3" />
                    Date
                  </FormLabel>

                  <FormControl>
                    <Calendar22
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full h-10 bg-background border border-border rounded-md px-3 flex items-center text-sm"
                      disabled={(d) =>
                        d > new Date() ||
                        d < new Date("1900-01-01")
                      }
                    />
                  </FormControl>

                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-11 rounded-lg shadow-sm transition-all"
            >
              Save Transaction
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
);

}