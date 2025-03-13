import { QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequireAuth } from './domain/auth/components/require-auth'
import { SignIn } from './domain/auth/pages/sign-in'
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
            element={<RequireAuth children={<Expenses />} />}
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
