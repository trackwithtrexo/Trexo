"use client";

import { newIncome } from "@/app/action/Dashboard-actions";
import { Button } from "@/components/ui/button";
import { Calendar22 } from "@/components/ui/DatePicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IncomeFormData } from "@/types/allTypes";
import { IncomeformSchema } from "@/validation/transactionValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlignLeft,
  Calendar as CalendarIcon,
  IndianRupee,
  Plus,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function NewIncome() {
  const [open, setOpen] = useState(false);

  const incomeForm = useForm<IncomeFormData>({
    resolver: zodResolver(IncomeformSchema),
    defaultValues: {
      amount: "",
      description: "",
      transactionDate: new Date(),
    },
  });

  const handleIncomeSubmit = async (data: IncomeFormData) => {
    const toastId = toast.loading("Adding income...");
    try {
      const response = await newIncome(data);
      if (response !== "success")
        throw new Error(response || "Income not added");

      toast.success("Income added successfully", {
        id: toastId,
        richColors: true,
        icon: "🤑",
      });

      setOpen(false);
      incomeForm.reset();
    } catch (error) {
      toast.error(`Failed to add income`, {
        id: toastId,
        richColors: true,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white transition-all duration-200 shadow-sm px-4 h-9 rounded-lg flex items-center gap-2 text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add Income
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-xl p-0 overflow-hidden bg-card border border-border">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold tracking-tight flex items-center gap-2 text-foreground">
              <div className="p-2 rounded-lg bg-muted">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              New Income
            </DialogTitle>

            <DialogDescription className="text-muted-foreground text-sm mt-1">
              Add your earnings to track your total balance.
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...incomeForm}>
          <form
            onSubmit={incomeForm.handleSubmit(handleIncomeSubmit)}
            className="p-6 space-y-5"
          >
            {/* Amount Field */}
            <FormField
              control={incomeForm.control}
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
                        className="h-11 pl-10 text-base focus-visible:ring-green-500"
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
                control={incomeForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <AlignLeft className="w-3 h-3" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Where is this income from?"
                        className="h-10 text-sm focus-visible:ring-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={incomeForm.control}
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
                          d > new Date() || d < new Date("1900-01-01")
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
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-11 rounded-lg shadow-sm transition-all"
              >
                Save Income
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
