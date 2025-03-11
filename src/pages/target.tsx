import { Button } from "@/components";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useTargets } from "@/hooks/use-targets";

export const Target = () => {
  const user = useAuthStore((state) => state.user);
  const { data: targets, isLoading, isError } = useTargets(user?.id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading targets</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Target</h1>
      <Button onClick={() => alert("Add Target")}>Add Target</Button>
      {/* Render targets list */}
    </div>
  );
};
