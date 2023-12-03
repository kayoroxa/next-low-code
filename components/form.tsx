'use client'
import * as z from 'zod'
import AutoForm, { AutoFormSubmit } from './ui/auto-form'

const s = {
  string: z.string,
  number: z.coerce.number,
  date: z.coerce.date,
  boolean: z.boolean,
  select: z.enum,
  object: z.object,
}

const formSchema = s.object({
  username: s
    .string({
      required_error: 'Username is required.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),

  password: s
    .string({
      required_error: 'Password is required.',
    })
    .describe('Your secure password')
    .min(8, {
      message: 'Password must be at least 8 characters.',
    }),

  favoriteNumber: s // When using numbers and dates, you must use coerce
    .number({
      invalid_type_error: 'Favorite number must be a number.',
    })
    .min(1, {
      message: 'Favorite number must be at least 1.',
    })
    .max(10, {
      message: 'Favorite number must be at most 10.',
    })
    .default(5) // You can set a default value
    .optional(),

  birthday: s.date().optional(),

  sendMeMails: s.boolean().optional(),

  color: s.select(['red', 'green', 'blue']),
})

export default function MyForm() {
  return (
    <AutoForm
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2))
      }}
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        password: {
          // Use "inputProps" to pass props to the input component
          // You can use any props that the component accepts
          inputProps: {
            type: 'password',
            placeholder: '••••••••',
          },
        },
        favoriteNumber: {
          // Set a "description" that will be shown below the field
          description: 'Your favourite number between 1 and 10.',
        },

        birthday: {
          description: 'We need your birthday to send you a gift.',
        },

        sendMeMails: {
          // Booleans use a checkbox by default, you can use a switch instead
          fieldType: 'switch',
        },
      }}
    >
      {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
      <AutoFormSubmit>Send now</AutoFormSubmit>

      {/*
      All children passed to the form will be rendered below the form.
      */}
      <p className="text-gray-500 text-sm">
        By submitting this form, you agree to our{' '}
        <a href="#" className="text-primary underline">
          terms and conditions
        </a>
        .
      </p>
    </AutoForm>
  )
}
