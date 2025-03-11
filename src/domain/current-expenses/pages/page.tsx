import { Button } from "@/components";
import { useForm } from "react-hook-form";

export const CurrentExpenses = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Current Expenses</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("amount")}
          placeholder="Amount"
          className="border p-2 rounded"
        />
        <Button type="submit">Submit</Button>
      </form>
      {/* Render chart */}
    </div>
  );
};
