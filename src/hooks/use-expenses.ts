import { supabase } from "@/db/supabase-client";
import { useQuery } from "react-query";

const fetchExpenses = async (userId: string) => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data;
};

export const useExpenses = (userId: string) => {
  return useQuery(["expenses", userId], () => fetchExpenses(userId));
};
