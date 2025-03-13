import { useAuthStore } from "@/domain/auth/use-auth-store";
import { queryClient } from "@/lib/query-client";
import { useMutation, useQuery } from "react-query";
import { createExpense } from "../services/create-expense";
import { fetchExpensesById } from "../services/fetch-expenses-by-user-id";
import { updateExpense } from "../services/update-expense";

export const useExpenses = (getExpenses: boolean = true) => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id || "";

  const expenses = useQuery(
    ["expenses", userId],
    () => fetchExpensesById(userId),
    {
      enabled: getExpenses,
    }
  );

  const createExpenseMutation = useMutation(createExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses", userId]);
    },
    onError: (error) => {
      // TODO - Toaster
    },
  });

  const updateExpenseMutation = useMutation(
    ({ expenseId, expense }: { expenseId: string; expense: any }) =>
      updateExpense(expenseId, expense),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["expenses", userId]);
      },
      onError: (error) => {
        // TODO - Toaster
      },
    }
  );

  return {
    expenses,
    createExpense: createExpenseMutation,
    updateExpense: updateExpenseMutation,
  };
};
