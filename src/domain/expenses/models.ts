import { Tables } from '@/lib/supabase'

export type Expense = {
  details: ExpenseDetails | null
} & Omit<Tables<'expenses'>, 'details'>

export type ExpenseDetails = {
  fields: {
    name: string
    label: string
    type: 'number'
    value: number
  }[]
}
