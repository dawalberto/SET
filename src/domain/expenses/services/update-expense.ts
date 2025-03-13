import { supabase } from "@/lib/supabase-client";
import { handleDDBBDataError } from "@/lib/utils";
import { Expense } from "../models";

export const updateExpense = async (expenseId: string, expense: Expense) => {
  const { error } = await supabase
    .from("expenses")
    .update(expense)
    .eq("id", expenseId);

  if (error) {
    handleDDBBDataError(error);
  }
};
