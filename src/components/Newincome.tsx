"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TrendingUp } from "lucide-react";

import { newIncome } from "@/app/action/Dashboard-actions";
import { IncomeFormData } from "@/types/transaction.Types";
import { formSchema } from "@/validation/transactionValidation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Calendar22 } from "@/components/ui/DatePicker";

export default function NewIncome() {
  const [open, setOpen] = useState(false);

  const incomeForm = useForm<IncomeFormData>({
    resolver: zodResolver(formSchema),
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
      if (response !== "success") throw new Error(response || "Income not added");

      toast.success("Income added successfully", {
        id: toastId,
        closeButton: true,
        richColors: true,
        icon: "🤑",
        duration: 4000,
      });

      setOpen(false);
      incomeForm.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      toast.error(`Failed to add income`, {
        id: toastId,
        richColors: true,
        closeButton: true,
        icon: "❌",
        duration: 4000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto flex items-center justify-center text-[12px]">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          Add income
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[86vw] sm:w-[350px] md:w-[390px] max-h-[84vh] overflow-y-auto rounded-md border p-4">
        <DialogHeader>
          <DialogTitle className="text-[14px] sm:text-[15px]">
            Create a new <span className="text-green-500">income</span> transaction
          </DialogTitle>
        </DialogHeader>

        <Form {...incomeForm}>
          <form
            onSubmit={incomeForm.handleSubmit(handleIncomeSubmit)}
            className="space-y-3 mt-3"
          >
            <FormField
              control={incomeForm.control}
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

            <FormField
              control={incomeForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px]">Description (Optional)</FormLabel>
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

            <FormField
              control={incomeForm.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px]">Date</FormLabel>
                  <FormControl>
                    <Calendar22
                      className="w-full cursor-pointer"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={(d) =>
                        d > new Date() || d < new Date("1900-01-01")
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button
                type="submit"
                variant="outline"
                className="w-full sm:w-auto border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              >
                Add new income
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
