import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CurrentExpenses } from "./domain/current-expenses/pages/page";
import { CurrentSavings } from "./domain/current-savings/pages/page";
import { Expenses } from "./domain/expenses/pages/page";
import { Groups } from "./domain/groups/pages/page";
import { Savings } from "./domain/savings/pages/page";
import { Target } from "./domain/targets/pages/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/current-expenses" element={<CurrentExpenses />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/current-savings" element={<CurrentSavings />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/target" element={<Target />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
