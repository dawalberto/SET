import { Button } from "@/components";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useExpenses } from "@/hooks/use-expenses";

export const Expenses = () => {
  const user = useAuthStore((state) => state.user);
  const { data: expenses, isLoading, isError } = useExpenses(user?.id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading expenses</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Expenses</h1>
      <Button onClick={() => alert("Add Expense")}>Add Expense</Button>
      {/* Render charts and sections */}
    </div>
  );
};
