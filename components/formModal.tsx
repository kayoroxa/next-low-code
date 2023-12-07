'use client'
import { useState } from 'react'
import * as z from 'zod'
import AutoForm, { AutoFormSubmit } from './ui/auto-form'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

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

  // habits: z.object({
  //   fui: z
  //     .string()
  //     .min(1, { message: 'This field has to be filled.' })
  //     .email('This is not a valid email.'),
  //   assisti: z
  //     .boolean()
  //     .describe('Accept terms and conditions.')
  //     .refine(value => value, {
  //       message: 'You must accept the terms and conditions.',
  //       path: ['acceptTerms'],
  //     }),
  //   joguei: z
  //     .boolean()
  //     .describe('Accept terms and conditions.')
  //     .refine(value => value, {
  //       message: 'You must accept the terms and conditions.',
  //       path: ['acceptTerms'],
  //     }),
  // }),
})

export default function FormModal({ onSubmit, children }: any) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <AutoForm
          onSubmit={props => {
            console.log(JSON.stringify(props, null, 2))
            setOpen(false)
            setTimeout(() => {
              onSubmit(props)
            }, 100)
          }}
          formSchema={formSchema}
          fieldConfig={{
            name: {
              description: 'Bota teu nome ai namoral.',
            },
          }}
        >
          <AutoFormSubmit>Submit</AutoFormSubmit>

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
      </DialogContent>
    </Dialog>
  )
}
