import { Button } from "@/components";
import { useAuthStore } from "@/domain/auth/use-auth-store";
import { useSavings } from "../hooks/use-savings";

export const Savings = () => {
  const user = useAuthStore((state) => state.user);
  const { data: savings, isLoading, isError } = useSavings(user?.id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading savings</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Savings</h1>
      <Button onClick={() => alert("Add Saving")}>Add Saving</Button>
      {/* Render charts and sections */}
    </div>
  );
};
