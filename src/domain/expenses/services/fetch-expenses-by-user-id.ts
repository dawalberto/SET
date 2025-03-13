import { supabase } from '@/lib/supabase-client'
import { handleDDBBDataError } from '@/lib/utils'

export const fetchExpensesByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
  if (error) {
    handleDDBBDataError(error)
  }
  return data
}
