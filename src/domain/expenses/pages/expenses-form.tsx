import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { useExpenses } from '../hooks/use-expenses'
import { ExpenseDetails } from '../models'

export const ExpensesForm = () => {
  const { expensesId } = useParams()
  console.log('Expense ID:', expensesId)
  // TODO - Move this logic to parent component
  const {
    expensesById: { data, isLoading, isError },
  } = useExpenses({
    expensesId,
  })
  console.log('💣🚨 data', data)

  const expenses = data?.[0]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formFields = expenses?.details?.fields || []

  const formSchema = z.object({
    fields: z.array(
      z.object({
        name: z.string(),
        label: z.string(),
        type: z.literal('number'),
        value: z.number(),
      }),
    ),
  })

  const form = useForm<ExpenseDetails>({
    resolver: zodResolver(formSchema),
    defaultValues: { fields: formFields },
  })
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'fields',
  })

  useEffect(() => {
    if (data) {
      form.reset({ fields: formFields })
    }
  }, [data, formFields, form])

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading expenses</p>
  if (!data?.length) return <p>No expenses found</p>

  const addNewField = () => {
    const label = prompt('Etiqueta del nuevo campo')

    if (!label?.trim()) {
      alert('La etiqueta no puede estar vacía')
      return
    }
    const name = label.toLowerCase().replace(' ', '_')
    if (fields.some((field) => field.name === name)) {
      alert('Ya existe un campo con esa etiqueta')
      return
    }

    const value = Number(prompt('Valor del nuevo campo'))

    if (!value) {
      alert('El valor no puede estar vacío')
      return
    }
    if (isNaN(value)) {
      alert('El valor debe ser un número')
      return
    }

    append({
      name,
      label,
      type: 'number',
      value,
    })
  }

  const onSubmit = (data: ExpenseDetails) => {
    console.log('Datos guardados:', data)
  }

  return (
    <section className='sm:max-w-96 mx-auto p-8 space-y-8'>
      <h1 className='text-2xl font-bold'>{expenses?.name}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {fields.map(({ name, label }, index) => (
            <div key={name} className='flex gap-4 items-end'>
              <div className='flex-1'>
                <FormField
                  key={name}
                  control={form.control}
                  name={`fields.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type='button'
                variant='ghost'
                className='flex-none'
                onClick={() => remove(index)}
              >
                <Trash />
              </Button>
            </div>
          ))}
          <div className='flex items-center gap-4'>
            <Button
              type='button'
              variant='outline'
              className='grow'
              onClick={addNewField}
            >
              Add field
            </Button>
            <Button className='grow' type='submit'>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
