import { useAuthStore } from '@/domain/auth/use-auth-store'
import { queryClient } from '@/lib/query-client'
import { useMutation, useQuery } from 'react-query'
import { Expense } from '../models'
import { createExpense } from '../services/create-expense'
import { fetchExpensesById } from '../services/fetch-expenses-by-id'
import { fetchExpensesByUserId } from '../services/fetch-expenses-by-user-id'
import { updateExpense } from '../services/update-expense'

export const useExpenses = ({
  getExpensesByUserId = true,
  expensesId,
}: {
  getExpensesByUserId?: boolean
  expensesId?: string
}) => {
  const user = useAuthStore((state) => state.user)
  const userId = user?.id || ''

  const expensesByUser = useQuery(
    ['expensesByUser', userId],
    () => fetchExpensesByUserId(userId),
    {
      enabled: getExpensesByUserId,
    },
  )

  const expensesById = useQuery(
    ['expensesById', expensesId],
    () => fetchExpensesById(expensesId || ''),
    {
      enabled: !!expensesId,
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
    expensesByUser,
    expensesById,
    createExpense: createExpenseMutation,
    updateExpense: updateExpenseMutation,
  }
}
