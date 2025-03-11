import { JSX, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./domain/auth/pages/sign-in";
import { useAuthStore } from "./domain/auth/use-auth-store";
import { CurrentExpenses } from "./domain/current-expenses/pages/page";
import { CurrentSavings } from "./domain/current-savings/pages/page";
import { Expenses } from "./domain/expenses/pages/page";
import { Groups } from "./domain/groups/pages/page";
import { Savings } from "./domain/savings/pages/page";
import { Target } from "./domain/targets/pages/page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state) => {
      if (state.user !== null) {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/sign-in" />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/expenses"
            element={
              <RequireAuth>
                <Expenses />
              </RequireAuth>
            }
          />
          <Route
            path="/current-expenses"
            element={
              <RequireAuth>
                <CurrentExpenses />
              </RequireAuth>
            }
          />
          <Route
            path="/savings"
            element={
              <RequireAuth>
                <Savings />
              </RequireAuth>
            }
          />
          <Route
            path="/current-savings"
            element={
              <RequireAuth>
                <CurrentSavings />
              </RequireAuth>
            }
          />
          <Route
            path="/groups"
            element={
              <RequireAuth>
                <Groups />
              </RequireAuth>
            }
          />
          <Route
            path="/target"
            element={
              <RequireAuth>
                <Target />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
