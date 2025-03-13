import { PostgrestError } from '@supabase/supabase-js'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const handleDDBBDataError = (error: PostgrestError | null) => {
  if (error) {
    if (error.code === 'PGRST401') {
      // Handle RLS restriction error
      throw new Error(
        'Access denied: You do not have permission to access these expenses.',
      )
    }
    throw new Error(error.message)
  }
}
