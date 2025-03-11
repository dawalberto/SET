import { supabase } from "@/db/supabase-client";
import { useQuery } from "react-query";

const fetchTargets = async (userId: string) => {
  const { data, error } = await supabase
    .from("targets")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data;
};

export const useTargets = (userId: string) => {
  return useQuery(["targets", userId], () => fetchTargets(userId));
};
