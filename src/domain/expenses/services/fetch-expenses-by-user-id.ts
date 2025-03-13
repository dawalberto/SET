import { supabase } from '@/lib/supabase-client'
import { handleDDBBDataError } from '@/lib/utils'
import { Expense } from '../models'

export const fetchExpensesByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
  if (error) {
    handleDDBBDataError(error)
  }
  console.log('💣🚨 data', data)
  return data as Expense[]
}
