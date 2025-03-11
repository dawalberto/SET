import { supabase } from "@/db/supabase-client";
import { useQuery } from "react-query";

const fetchSavings = async (userId: string) => {
  const { data, error } = await supabase
    .from("savings")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data;
};

export const useSavings = (userId: string) => {
  return useQuery(["savings", userId], () => fetchSavings(userId));
};
