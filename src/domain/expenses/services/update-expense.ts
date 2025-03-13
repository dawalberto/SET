import { supabase } from "@/lib/supabase-client";
import { handleDDBBDataError } from "@/lib/utils";

// TODO - Add Expense type
export const updateExpense = async (
  expenseId: string,
  expense: any
): Promise<any> => {
  const { data, error } = await supabase
    .from("expenses")
    .update(expense)
    .eq("id", expenseId);
  if (error) {
    handleDDBBDataError(error);
  }
  return data;
};
