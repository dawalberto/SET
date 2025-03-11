import { supabase } from "@/db/supabase-client";
import { useQuery } from "react-query";

const fetchGroups = async (userId: string) => {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data;
};

export const useGroups = (userId: string) => {
  return useQuery(["groups", userId], () => fetchGroups(userId));
};
