import { supabase } from "@/lib/supabase-client";
import { handleDDBBDataError } from "@/lib/utils";

// TODO - Add Expense type
export const createExpense = async (expense: any) => {
  const { data, error } = await supabase.from("expenses").insert(expense);
  if (error) {
    handleDDBBDataError(error);
  }
  return data;
};
