import { Button } from "@/components";
import { useExpenses } from "../hooks/use-expenses";

export const Expenses = () => {
  const {
    expenses: { data, isLoading, isError },
  } = useExpenses(true);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading expenses</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Expenses</h1>
      <Button onClick={() => alert("Add Expense")}>Add Expense</Button>
      <pre>
        <code>{data}</code>
      </pre>
      {/* Render charts and sections */}
    </div>
  );
};
