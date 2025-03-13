import { useForm } from 'react-hook-form'
import { useExpenses } from '../hooks/use-expenses'

export const Expenses = () => {
  const {
    expenses: { data, isLoading, isError },
  } = useExpenses(true)
  // ! For develop purpose I'm gonna use the firsr expense
  // ! to get the fields but there should be a previous page to select the expense
  const fields = data?.[0]?.details?.fields || []
  const { register, handleSubmit } = useForm({
    defaultValues: { fields },
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading expenses</p>
  if (!data?.length) return <p>No expenses found</p>

  const onSubmit = (data) => {
    console.log('Datos guardados:', data)
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Expenses</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              {...register(`fields.${index}.value`, { valueAsNumber: true })}
            />
          </div>
        ))}
        <button type='submit'>Guardar</button>
      </form>
    </div>
  )
}
