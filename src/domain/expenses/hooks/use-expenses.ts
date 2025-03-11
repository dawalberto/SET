import { supabase } from "@/db/supabase-client";
import { useQuery } from "react-query";

const fetchExpenses = async (userId: string) => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    if (error.code === "PGRST401") {
      // Handle RLS restriction error
      throw new Error(
        "Access denied: You do not have permission to access these expenses."
      );
    }
    throw new Error(error.message);
  }
  return data;
};

export const useExpenses = (userId: string) => {
  return useQuery(["expenses", userId], () => fetchExpenses(userId));
};
