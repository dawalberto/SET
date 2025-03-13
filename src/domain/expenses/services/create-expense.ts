import { supabase } from '@/lib/supabase-client'
import { handleDDBBDataError } from '@/lib/utils'
import { Expense } from '../models'

// TODO - Add Expense type
export const createExpense = async (expense: Expense) => {
  const { error } = await supabase.from('expenses').insert(expense)
  if (error) {
    handleDDBBDataError(error)
  }
}
