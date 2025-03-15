import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Euro } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useExpenses } from '../hooks/use-expenses'

export const Expenses = () => {
  const {
    expensesByUser: { data: expenses, isLoading, isError },
  } = useExpenses({})
  const navigate = useNavigate()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading expenses</p>
  if (!expenses?.length) return <p>No expenses found</p>

  return (
    <main>
      <h1 className='text-2xl font-bold'>Expenses</h1>
      <ul className='space-y-8'>
        {expenses.map((expense) => (
          // TODO - Make it a component
          <li key={expense.id}>
            <Card
              onClick={() => navigate(`/expenses/${expense.id}`)}
              className='cursor-pointer'
            >
              <CardHeader>
                <CardTitle>{expense.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex gap-0 text-2xl font-semibold items-center justify-end'>
                  <p>{expense.amount}</p> <Euro />
                </div>
                {/* // TODO - Name of the creator and members of the Expenses */}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  )
}
