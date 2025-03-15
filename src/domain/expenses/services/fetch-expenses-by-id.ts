import { supabase } from '@/lib/supabase-client'
import { handleDDBBDataError } from '@/lib/utils'
import { Expense } from '../models'

export const fetchExpensesById = async (expensesId: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('id', expensesId)
  if (error) {
    handleDDBBDataError(error)
  }
  return data as Expense[]
}
