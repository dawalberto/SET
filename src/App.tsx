import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CurrentExpenses,
  CurrentSavings,
  Expenses,
  Groups,
  Savings,
  Target,
} from "./pages";

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
