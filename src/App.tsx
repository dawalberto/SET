import { QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequireAuth } from './domain/auth/components/require-auth'
import { SignIn } from './domain/auth/pages/sign-in'
import { ExpensesForm } from './domain/expenses/pages/expenses-form'
import { Expenses } from './domain/expenses/pages/page'
import { Target } from './domain/targets/pages/page'
import { queryClient } from './lib/query-client'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route
            path='/expenses'
            element={
              <RequireAuth>
                <Expenses />
              </RequireAuth>
            }
          />
          <Route
            path='/expenses/:expensesId'
            element={
              <RequireAuth>
                <ExpensesForm />
              </RequireAuth>
            }
          />
          <Route
            path='/target'
            element={<RequireAuth children={<Target />} />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
