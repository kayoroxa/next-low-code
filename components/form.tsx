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
  name: s
    .string({
      required_error: 'Username is required.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),

  email: s
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
})

export default function MyForm({ onSubmit }: any) {
  return (
    <AutoForm
      onSubmit={onSubmit}
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        name: {
          // Set a "description" that will be shown below the field
          description: 'Bota teu nome ai namoral.',
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
