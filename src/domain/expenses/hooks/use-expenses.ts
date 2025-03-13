import { useAuthStore } from '@/domain/auth/use-auth-store'
import { queryClient } from '@/lib/query-client'
import { useMutation, useQuery } from 'react-query'
import { Expense } from '../models'
import { createExpense } from '../services/create-expense'
import { fetchExpensesByUserId } from '../services/fetch-expenses-by-user-id'
import { updateExpense } from '../services/update-expense'

export const useExpenses = (getExpenses: boolean = true) => {
  const user = useAuthStore((state) => state.user)
  const userId = user?.id || ''

  const expenses = useQuery(
    ['expenses', userId],
    () => fetchExpensesByUserId(userId),
    {
      enabled: getExpenses,
    },
  )

  const createExpenseMutation = useMutation(createExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(['expenses', userId])
    },
    onError: () => {
      // TODO - Toaster
    },
  })

  const updateExpenseMutation = useMutation(
    ({ expenseId, expense }: { expenseId: string; expense: Expense }) =>
      updateExpense(expenseId, expense),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['expenses', userId])
      },
      onError: () => {
        // TODO - Toaster
      },
    },
  )

  return {
    expenses,
    createExpense: createExpenseMutation,
    updateExpense: updateExpenseMutation,
  }
}
